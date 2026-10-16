import type { VitaminKey } from '../data/types';
import { LABS } from '../data/vitamins';
import { INTERACTIONS } from '../data/interactions';

/** عوامل خطر — هر عامل با ویتامین‌های مرتبط و وزن نسبی (۱ = کمکی، ۲ = متوسط، ۳ = مهم) */
export interface RiskFactor { id: string; label: string; group: string; affects: Partial<Record<VitaminKey, 1 | 2 | 3>>; why: string }

export const RISK_FACTORS: RiskFactor[] = [
  { id: 'vegan', group: 'الگوی غذایی', label: 'گیاه‌خوار مطلق (وگان) هستم', affects: { B12: 3, D: 2, B2: 1 }, why: 'B12 تقریباً فقط در غذاهای حیوانی و غنی‌شده وجود دارد.' },
  { id: 'vegetarian', group: 'الگوی غذایی', label: 'گیاه‌خوار هستم (لبنیات و تخم‌مرغ می‌خورم)', affects: { B12: 2 }, why: 'دریافت B12 معمولاً کمتر از افراد همه‌چیزخوار است.' },
  { id: 'low-fv', group: 'الگوی غذایی', label: 'کمتر از ۲ واحد میوه و سبزی در روز می‌خورم', affects: { C: 2, B9: 2, K: 1 }, why: 'میوه و سبزی منبع اصلی ویتامین C، فولات و K است.' },
  { id: 'low-dairy', group: 'الگوی غذایی', label: 'لبنیات بسیار کم یا هیچ مصرف نمی‌کنم', affects: { B2: 2, D: 1, B12: 1 }, why: 'لبنیات منبع مهم ریبوفلاوین و در برخی کشورها ویتامین D است.' },
  { id: 'low-fat-diet', group: 'الگوی غذایی', label: 'رژیم بسیار کم‌چرب دارم', affects: { E: 1, A: 1 }, why: 'جذب ویتامین‌های محلول در چربی به چربی وعده وابسته است.' },
  { id: 'low-sun', group: 'سبک زندگی', label: 'بیشتر روز در فضای بسته‌ام یا پوشش کامل دارم', affects: { D: 3 }, why: 'ساخت پوستی ویتامین D به تابش UVB نیاز دارد.' },
  { id: 'dark-skin', group: 'سبک زندگی', label: 'پوست تیره دارم', affects: { D: 2 }, why: 'ملانین ساخت پوستی ویتامین D را کاهش می‌دهد.' },
  { id: 'smoker', group: 'سبک زندگی', label: 'سیگار می‌کشم', affects: { C: 3 }, why: 'استرس اکسیداتیو نیاز به ویتامین C را ۳۵ میلی‌گرم در روز افزایش می‌دهد.' },
  { id: 'alcohol', group: 'سبک زندگی', label: 'به‌طور منظم الکل زیاد مصرف می‌کنم', affects: { B1: 3, B9: 2, B6: 2, B3: 1 }, why: 'الکل جذب و ذخیره ویتامین‌های گروه B را مختل می‌کند.' },
  { id: 'obesity', group: 'وضعیت بدنی', label: 'BMI برابر ۳۰ یا بیشتر', affects: { D: 2 }, why: 'ویتامین D در بافت چربی رقیق می‌شود.' },
  { id: 'age50', group: 'وضعیت بدنی', label: 'بالای ۵۰ سال سن دارم', affects: { B12: 2, D: 1 }, why: 'گاستریت آتروفیک جذب B12 غذایی را کاهش می‌دهد.' },
  { id: 'plan-preg', group: 'وضعیت بدنی', label: 'قصد بارداری دارم یا ممکن است باردار شوم', affects: { B9: 3 }, why: '۴۰۰ میکروگرم اسید فولیک پیش از بارداری خطر نقص لوله عصبی را کاهش می‌دهد.' },
  { id: 'breastfed-infant', group: 'وضعیت بدنی', label: 'شیرخوار با تغذیه انحصاری با شیر مادر', affects: { D: 3 }, why: 'شیر مادر ویتامین D کمی دارد؛ مکمل شیرخوار طبق برنامه کشوری توصیه می‌شود.' },
  { id: 'malabsorption', group: 'بیماری‌ها', label: 'سلیاک، کرون، کولیت یا نارسایی پانکراس', affects: { D: 3, A: 2, E: 2, K: 2, B12: 2, B9: 2 }, why: 'سوءجذب، به‌ویژه سوءجذب چربی، ویتامین‌های محلول در چربی و B12 را متأثر می‌کند.' },
  { id: 'bariatric', group: 'بیماری‌ها', label: 'جراحی چاقی یا جراحی معده یا روده', affects: { B12: 3, B1: 3, D: 3, B9: 2, A: 2, E: 1, K: 1 }, why: 'کاهش سطح جذب و فاکتور داخلی معده.' },
  { id: 'liver', group: 'بیماری‌ها', label: 'بیماری مزمن کبد یا کلستاز', affects: { A: 2, D: 2, E: 2, K: 2 }, why: 'صفرا برای جذب ویتامین‌های محلول در چربی لازم است.' },
  { id: 'ckd', group: 'بیماری‌ها', label: 'بیماری مزمن کلیه یا دیالیز', affects: { D: 3, B6: 2, C: 1, B9: 1 }, why: 'کلیه ویتامین D را فعال می‌کند؛ دیالیز ویتامین‌های محلول در آب را خارج می‌کند.' },
  { id: 'pernicious', group: 'بیماری‌ها', label: 'کم‌خونی پرنیشیوز یا گاستریت آتروفیک', affects: { B12: 3 }, why: 'فقدان فاکتور داخلی جذب B12 را مختل می‌کند.' },
  { id: 'vomiting', group: 'بیماری‌ها', label: 'استفراغ مداوم یا تغذیه بسیار ناکافی اخیر', affects: { B1: 3 }, why: 'ذخیره تیامین فقط چند هفته کفایت می‌کند.' },
];

export const MEDS = INTERACTIONS.filter((i) => i.kind === 'drug');

/** علائم — آموزشی؛ هیچ علامتی به‌تنهایی برای تشخیص کمبود کافی نیست */
export interface Symptom { id: string; label: string; vitamins: VitaminKey[]; redFlag?: string }
export const SYMPTOMS: Symptom[] = [
  { id: 'night-blind', label: 'دید ضعیف در نور کم (شب‌کوری)', vitamins: ['A'] },
  { id: 'bleeding-gums', label: 'خونریزی یا التهاب لثه', vitamins: ['C', 'K'] },
  { id: 'bruising', label: 'کبودی آسان یا خونریزی غیرمعمول', vitamins: ['K', 'C'], redFlag: 'خونریزی غیرمعمول، خون در ادرار یا مدفوع، یا کبودی گسترده نیاز به ارزیابی فوری پزشکی دارد.' },
  { id: 'mouth', label: 'زخم گوشه لب، زبان قرمز و دردناک', vitamins: ['B2', 'B3', 'B6', 'B9', 'B12'] },
  { id: 'fatigue-pale', label: 'خستگی مداوم همراه رنگ‌پریدگی یا تنگی نفس', vitamins: ['B12', 'B9'], redFlag: 'خستگی شدید با تنگی نفس یا تپش قلب ممکن است نشانه کم‌خونی شدید باشد؛ به پزشک مراجعه کنید.' },
  { id: 'numbness', label: 'بی‌حسی یا گزگز دست و پا', vitamins: ['B12', 'B1', 'B6', 'E'], redFlag: 'بی‌حسی پیشرونده، اختلال تعادل یا راه رفتن باید به‌سرعت توسط پزشک بررسی شود؛ کمبود B12 درمان‌نشده آسیب عصبی دائمی ایجاد می‌کند. توجه: مصرف زیاد B6 نیز ممکن است علت باشد.' },
  { id: 'confusion', label: 'گیجی، اختلال حافظه یا تعادل', vitamins: ['B1', 'B12', 'B3'], redFlag: 'گیجی همراه با اختلال تعادل یا حرکات چشم (به‌ویژه با مصرف الکل یا استفراغ طولانی) ممکن است انسفالوپاتی ورنیکه باشد — اورژانس پزشکی.' },
  { id: 'bone-pain', label: 'درد استخوان یا ضعف عضلات ران و شانه', vitamins: ['D'] },
  { id: 'skin-rash', label: 'بثورات پوستی پوسته‌دار یا التهاب پوست در نواحی آفتاب‌خورده', vitamins: ['B3', 'B7', 'B2'] },
  { id: 'hair-loss', label: 'ریزش مو', vitamins: ['B7'] },
  { id: 'poor-healing', label: 'ترمیم کند زخم', vitamins: ['C'] },
  { id: 'hypercalc', label: 'تشنگی شدید، پرادراری، تهوع و یبوست همراه با مصرف مکمل D', vitamins: ['D'], redFlag: 'این علائم همراه با مصرف دوز بالای ویتامین D ممکن است نشانه هیپرکلسمی باشد؛ مکمل را متوقف و فوراً با پزشک تماس بگیرید.' },
  { id: 'headache-a', label: 'سردرد شدید و تاری دید همراه با مصرف مکمل A', vitamins: ['A'], redFlag: 'سردرد شدید و تاری دید با مصرف رتینول می‌تواند نشانه افزایش فشار داخل جمجمه باشد؛ ارزیابی فوری لازم است.' },
];

export type Triage = 'education' | 'consider' | 'consult' | 'urgent';
export const TRIAGE_FA: Record<Triage, { label: string; desc: string }> = {
  education: { label: 'اطلاعات آموزشی', desc: 'بر اساس پاسخ‌ها، نشانه‌ای از نیاز به اقدام فوری دیده نشد. برای بهبود دریافت از منابع غذایی استفاده کنید.' },
  consider: { label: 'گفت‌وگو با متخصص تغذیه سودمند است', desc: 'یک یا چند عامل خطر وجود دارد. در مراجعه بعدی با پزشک یا کارشناس تغذیه درباره آن صحبت کنید.' },
  consult: { label: 'مشورت با پزشک توصیه می‌شود', desc: 'عوامل خطر قابل‌توجه، تداخل دارویی مهم یا نتیجه آزمایش غیرطبیعی وجود دارد.' },
  urgent: { label: 'ارزیابی فوری پزشکی', desc: 'علائم هشداردهنده‌ای گزارش شده است. منتظر نمانید و با پزشک یا مرکز درمانی تماس بگیرید.' },
};

export interface LabInput { markerId: string; value: number; unitId: string }

export interface ScreenInput {
  risks: string[];
  symptoms: string[];
  meds: string[]; // interaction ids
  labs: LabInput[];
}

export interface VitaminSignal {
  key: VitaminKey;
  score: number;
  reasons: string[];
  lab?: { marker: string; status: string; label: string; value: string };
}

export interface ScreenResult {
  triage: Triage;
  signals: VitaminSignal[];
  redFlags: string[];
  interactions: typeof INTERACTIONS;
}

export function interpretLab(l: LabInput) {
  const m = LABS[l.markerId];
  if (!m || !Number.isFinite(l.value)) return null;
  const u = m.units.find((x) => x.id === l.unitId) ?? m.units[0];
  const canonical = l.value * u.toCanonical;
  const band = m.bands.find((b) => canonical < b.max) ?? m.bands[m.bands.length - 1];
  return { marker: m, canonical, band, unitLabel: m.units[0].label };
}

export function screen(input: ScreenInput): ScreenResult {
  const map = new Map<VitaminKey, VitaminSignal>();
  const get = (k: VitaminKey) => {
    if (!map.has(k)) map.set(k, { key: k, score: 0, reasons: [] });
    return map.get(k)!;
  };
  const redFlags: string[] = [];
  let triage: Triage = 'education';
  const bump = (t: Triage) => {
    const order: Triage[] = ['education', 'consider', 'consult', 'urgent'];
    if (order.indexOf(t) > order.indexOf(triage)) triage = t;
  };

  for (const id of input.risks) {
    const rf = RISK_FACTORS.find((r) => r.id === id);
    if (!rf) continue;
    const top = Math.max(...Object.values(rf.affects) as number[]);
    for (const [k, w] of Object.entries(rf.affects) as [VitaminKey, number][]) {
      const s = get(k);
      s.score += w;
      // توضیح «چرا» فقط برای ویتامین اصلی هر عامل خطر نوشته شده است
      s.reasons.push(w === top ? `عامل خطر: ${rf.label} — ${rf.why}` : `عامل خطر: ${rf.label}`);
    }
  }
  for (const id of input.symptoms) {
    const sy = SYMPTOMS.find((s) => s.id === id);
    if (!sy) continue;
    for (const k of sy.vitamins) {
      const s = get(k);
      s.score += 1;
      s.reasons.push(`علامت گزارش‌شده (غیراختصاصی): ${sy.label}`);
    }
    if (sy.redFlag) { redFlags.push(sy.redFlag); bump('urgent'); }
  }
  const interactions = INTERACTIONS.filter((i) => input.meds.includes(i.id));
  for (const it of interactions) {
    for (const k of it.vitamins) {
      const s = get(k);
      s.score += it.severity === 'major' ? 2 : 1;
      s.reasons.push(`دارو: ${it.agentFa}`);
    }
    bump(it.severity === 'major' ? 'consult' : 'consider');
  }
  for (const l of input.labs) {
    const r = interpretLab(l);
    if (!r) continue;
    const s = get(r.marker.vitamin);
    s.lab = { marker: r.marker.nameFa, status: r.band.status, label: r.band.labelFa, value: `${r.canonical.toLocaleString('fa-IR', { maximumFractionDigits: 2 })} ${r.unitLabel}` };
    if (r.band.status === 'deficient') { s.score += 4; bump('consult'); }
    else if (r.band.status === 'low') { s.score += 2; bump('consider'); }
    else if (r.band.status === 'high') { s.score += 2; bump('consult'); }
    s.reasons.push(`آزمایش: ${r.marker.nameFa} — ${r.band.labelFa}`);
  }

  const signals = [...map.values()].sort((a, b) => b.score - a.score);
  if ((triage as Triage) === 'education' && signals.some((s) => s.score >= 3)) triage = 'consider';
  if ((triage as Triage) !== 'urgent' && signals.some((s) => s.score >= 6)) bump('consult');

  return { triage, signals, redFlags: [...new Set(redFlags)], interactions };
}
