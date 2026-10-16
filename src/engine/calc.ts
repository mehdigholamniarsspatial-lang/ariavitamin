import { DRI, EFSA_ADULT, recTypeFor } from '../data/dri';
import { FOOD_BY_ID } from '../data/foods';
import type { LifeStageKey, VitaminKey } from '../data/types';
import { VITAMIN_KEYS } from '../data/vitamins';
import { lifeStage, type Profile } from './lifestage';
import { FREQUENCIES, findUnit, type FrequencyId } from './units';

export interface FoodEntry { uid: string; foodId: string; grams: number }
export interface SupItem { key: VitaminKey; amount: number; unitId: string }
export interface Supplement { uid: string; name: string; frequency: FrequencyId; items: SupItem[] }

export interface IntakeInput {
  profile: Profile;
  foods: FoodEntry[];
  supplements: Supplement[];
  /** تعداد روزهای ثبت دریافت که میانگین آن‌ها وارد شده است (۱ = یادآمد یک‌روزه) */
  days: number;
}

export interface VitaminIntake {
  food: number;            // از غذاهای معمولی
  fortified: number;       // از غذاهای غنی‌شده
  supplement: number;      // از مکمل‌ها (میانگین روزانه)
  total: number;
  ulRelevant: number;      // مقداری که با UL مقایسه می‌شود (طبق دامنه UL)
  missingFoods: string[];  // غذاهایی که برای این ویتامین داده ندارند
}

export type Adequacy = 'below-ear' | 'ear-rda' | 'meets-rda' | 'meets-ai' | 'below-ai' | 'no-reference';
export type Safety = 'above-ul' | 'near-ul' | 'ok' | 'no-ul';

export interface VitaminResult {
  key: VitaminKey;
  intake: VitaminIntake;
  recType: 'RDA' | 'AI';
  rec: number | null;
  ear: number | null;
  ul: number | null;
  pctRec: number | null;
  pctUl: number | null;
  adequacy: Adequacy;
  safety: Safety;
  /** احتمال تقریبی کفایت دریافت معمول (روش IOM 2000) — فقط وقتی EAR وجود دارد */
  probAdequacy: number | null;
  confidence: 'low' | 'moderate' | 'higher';
  notes: string[];
  efsa?: { value: number | null; type: string; ul: number | null; note?: string };
}

export interface CalcResult {
  stage: LifeStageKey;
  warnings: string[];
  results: VitaminResult[];
}

const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

/** تابع توزیع تجمعی نرمال استاندارد (تقریب Abramowitz–Stegun 7.1.26) */
export function normCdf(z: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

export function sumIntake(input: Pick<IntakeInput, 'foods' | 'supplements'>): Record<VitaminKey, VitaminIntake> {
  const out = {} as Record<VitaminKey, VitaminIntake>;
  for (const k of VITAMIN_KEYS) out[k] = { food: 0, fortified: 0, supplement: 0, total: 0, ulRelevant: 0, missingFoods: [] };

  for (const fe of input.foods) {
    const f = FOOD_BY_ID[fe.foodId];
    if (!f || !(fe.grams > 0)) continue;
    const factor = fe.grams / 100;
    for (const k of VITAMIN_KEYS) {
      const v = f.per100[k];
      if (v === undefined) { out[k].missingFoods.push(f.nameFa); continue; }
      const amt = v * factor;
      if (f.fortified) out[k].fortified += amt; else out[k].food += amt;
      const scope = DRI[k].ulScope;
      if (scope === 'total') out[k].ulRelevant += amt;
      else if (scope === 'preformed' && (f.animal || f.fortified)) out[k].ulRelevant += amt;
      else if (scope === 'synthetic' && f.fortified) {
        if (k === 'B9') out[k].ulRelevant += (f.folicAcid ?? 0) * factor;
        else out[k].ulRelevant += amt; // نیاسین افزوده در غذای غنی‌شده (فرض محافظه‌کارانه)
      }
    }
  }

  for (const s of input.supplements) {
    const perDay = FREQUENCIES.find((f) => f.id === s.frequency)?.perDay ?? 1;
    for (const it of s.items) {
      if (!(it.amount > 0)) continue;
      const c = findUnit(it.key, it.unitId).convert(it.amount);
      out[it.key].supplement += c.total * perDay;
      if (DRI[it.key].ulScope !== 'none') out[it.key].ulRelevant += c.ul * perDay;
    }
  }

  for (const k of VITAMIN_KEYS) {
    const o = out[k];
    o.total = o.food + o.fortified + o.supplement;
  }
  return out;
}

export function calculate(input: IntakeInput): CalcResult {
  const { stage, warnings } = lifeStage(input.profile);
  const intakes = sumIntake(input);
  const days = Math.max(1, Math.round(input.days || 1));
  const isAdult = input.profile.ageYears >= 18;

  const results = VITAMIN_KEYS.map((key): VitaminResult => {
    const d = DRI[key];
    const intake = intakes[key];
    const recType = recTypeFor(key, stage);
    let rec = d.rec[stage] ?? null;
    let ear = recType === 'RDA' ? d.ear?.[stage] ?? null : null;
    const ul = d.ul?.[stage] ?? null;
    const notes: string[] = [];

    // سیگاری‌ها: +۳۵ میلی‌گرم ویتامین C (IOM 2000)
    if (key === 'C' && input.profile.smoker && !stage.startsWith('inf') && !stage.startsWith('c')) {
      if (rec != null) rec += 35;
      if (ear != null) ear += 35;
      notes.push('به دلیل مصرف سیگار، ۳۵ میلی‌گرم به نیاز روزانه افزوده شد.');
    }

    const total = intake.total;
    const pctRec = rec ? (total / rec) * 100 : null;
    const pctUl = ul ? (intake.ulRelevant / ul) * 100 : null;

    let adequacy: Adequacy = 'no-reference';
    let probAdequacy: number | null = null;
    if (rec != null) {
      if (recType === 'RDA' && ear != null) {
        adequacy = total < ear ? 'below-ear' : total < rec ? 'ear-rda' : 'meets-rda';
        const sdReq = d.cvRequirement * ear;
        const sdWithin = (d.cvWithin * Math.max(total, ear * 0.25)) / Math.sqrt(days);
        const z = (total - ear) / Math.sqrt(sdReq ** 2 + sdWithin ** 2);
        probAdequacy = normCdf(z);
      } else {
        adequacy = total >= rec ? 'meets-ai' : 'below-ai';
      }
    }

    let safety: Safety = 'no-ul';
    if (ul != null) {
      safety = intake.ulRelevant >= ul ? 'above-ul' : intake.ulRelevant >= ul * 0.8 ? 'near-ul' : 'ok';
    }

    if (intake.missingFoods.length) {
      notes.push(`برای ${intake.missingFoods.length.toLocaleString('fa-IR')} قلم غذا داده این ویتامین موجود نیست؛ دریافت واقعی احتمالاً بیشتر است.`);
    }
    if (key === 'B3') notes.push('سهم تریپتوفان غذا (معادل نیاسین) در داده‌ها لحاظ نشده است؛ دریافت واقعی NE بیشتر است.');
    if (adequacy === 'below-ai') notes.push('دریافت کمتر از AI به معنی ناکافی بودن نیست؛ AI برای ارزیابی احتمال کمبود فردی طراحی نشده است.');
    if (safety === 'above-ul' && intake.supplement > 0) notes.push('میانگین روزانه از UL بالاتر است. اگر این دوز درمانی و تحت نظر پزشک است، ادامه آن نیازمند پایش است؛ در غیر این صورت با متخصص مشورت کنید.');

    const confidence: VitaminResult['confidence'] = days >= 4 ? 'higher' : days >= 2 ? 'moderate' : 'low';

    let efsa: VitaminResult['efsa'];
    if (isAdult) {
      const e = EFSA_ADULT[key];
      const st = input.profile.sex === 'female' ? (input.profile.status === 'pregnant' ? e.pregnant : input.profile.status === 'lactating' ? e.lactating : e.female) : e.male;
      efsa = { value: st ?? null, type: e.type, ul: e.ul ?? null, note: e.noteFa };
    }

    return {
      key, intake: { ...intake, food: round(intake.food), fortified: round(intake.fortified), supplement: round(intake.supplement), total: round(total), ulRelevant: round(intake.ulRelevant) },
      recType, rec, ear, ul,
      pctRec: pctRec == null ? null : round(pctRec, 0),
      pctUl: pctUl == null ? null : round(pctUl, 0),
      adequacy, safety, probAdequacy, confidence, notes, efsa,
    };
  });

  return { stage, warnings, results };
}

export const ADEQUACY_FA: Record<Adequacy, { label: string; tone: 'risk' | 'warn' | 'good' | 'neutral' }> = {
  'below-ear': { label: 'احتمال ناکافی بودن بالا', tone: 'risk' },
  'ear-rda': { label: 'احتمالاً ناکافی', tone: 'warn' },
  'meets-rda': { label: 'احتمال کفایت بالا', tone: 'good' },
  'meets-ai': { label: 'احتمالاً کافی', tone: 'good' },
  'below-ai': { label: 'قابل قضاوت قطعی نیست', tone: 'neutral' },
  'no-reference': { label: 'مقدار مرجع ندارد', tone: 'neutral' },
};

export const SAFETY_FA: Record<Safety, { label: string; tone: 'risk' | 'warn' | 'good' | 'neutral' }> = {
  'above-ul': { label: 'بالاتر از حد بالای قابل تحمل', tone: 'risk' },
  'near-ul': { label: 'نزدیک به حد بالا', tone: 'warn' },
  ok: { label: 'کمتر از حد بالا', tone: 'good' },
  'no-ul': { label: 'UL تعیین نشده', tone: 'neutral' },
};
