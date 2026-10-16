import { describe, expect, it } from 'vitest';
import { DRI, STAGE_ORDER } from '../data/dri';
import { FOODS } from '../data/foods';
import { VITAMINS, LABS } from '../data/vitamins';
import { INTERACTIONS } from '../data/interactions';
import { calculate, normCdf, sumIntake } from './calc';
import { lifeStage } from './lifestage';
import { interpretLab, screen } from './screen';
import { SUP_UNITS } from './units';

const adultF = { ageYears: 32, sex: 'female' as const, status: 'none' as const, smoker: false };

describe('یکپارچگی داده‌ها', () => {
  it('هر ۱۳ ویتامین پرونده و DRI دارند', () => {
    expect(VITAMINS).toHaveLength(13);
    for (const v of VITAMINS) expect(DRI[v.key]).toBeDefined();
  });
  it('هر گروه سنی برای هر ویتامین مقدار توصیه‌شده دارد و RDA ≥ EAR و UL > RDA', () => {
    for (const d of Object.values(DRI)) {
      for (const s of STAGE_ORDER) {
        const rec = d.rec[s];
        expect(rec, `${d.key} ${s}`).toBeTypeOf('number');
        const ear = d.ear?.[s];
        if (ear != null) expect(rec!).toBeGreaterThanOrEqual(ear);
        const ul = d.ul?.[s];
        if (ul != null) expect(ul).toBeGreaterThan(rec!);
      }
    }
  });
  it('شناسه غذاها یکتا است و مقادیر منفی ندارد', () => {
    expect(new Set(FOODS.map((f) => f.id)).size).toBe(FOODS.length);
    for (const f of FOODS) for (const v of Object.values(f.per100)) expect(v).toBeGreaterThanOrEqual(0);
  });
  it('هر تداخل منبع دارد', () => {
    for (const i of INTERACTIONS) expect(i.source.url).toMatch(/^https:\/\//);
  });
  it('هر ویتامین حداقل دو منبع علمی دارد', () => {
    for (const v of VITAMINS) expect(v.sources.length).toBeGreaterThanOrEqual(2);
  });
});

describe('انتخاب گروه مرجع', () => {
  it.each([
    [{ ageYears: 0.3, sex: 'male', status: 'none' }, 'inf0'],
    [{ ageYears: 0.8, sex: 'female', status: 'none' }, 'inf7'],
    [{ ageYears: 3.9, sex: 'male', status: 'none' }, 'c1'],
    [{ ageYears: 13, sex: 'female', status: 'none' }, 'f9'],
    [{ ageYears: 18.5, sex: 'male', status: 'none' }, 'm14'],
    [{ ageYears: 50, sex: 'female', status: 'none' }, 'f31'],
    [{ ageYears: 75, sex: 'male', status: 'none' }, 'm71'],
    [{ ageYears: 17, sex: 'female', status: 'pregnant' }, 'p14'],
    [{ ageYears: 30, sex: 'female', status: 'lactating' }, 'l19'],
    [{ ageYears: 35, sex: 'female', status: 'pregnant' }, 'p31'],
  ] as const)('%o → %s', (p, stage) => {
    expect(lifeStage({ ...p, smoker: false }).stage).toBe(stage);
  });
  it('وزن بر انتخاب گروه اثر ندارد', () => {
    expect(lifeStage({ ...adultF, weightKg: 45 }).stage).toBe(lifeStage({ ...adultF, weightKg: 120 }).stage);
  });
});

describe('تبدیل واحد', () => {
  it('۵۰٬۰۰۰ IU ویتامین D = ۱۲۵۰ میکروگرم', () => {
    expect(SUP_UNITS.D[0].convert(50000).total).toBe(1250);
  });
  it('اسید فولیک: ۴۰۰ µg = ۶۸۰ DFE ولی ۴۰۰ برای UL', () => {
    const c = SUP_UNITS.B9[0].convert(400);
    expect(c.total).toBeCloseTo(680);
    expect(c.ul).toBe(400);
  });
  it('بتاکاروتن در UL ویتامین A شمرده نمی‌شود', () => {
    expect(SUP_UNITS.A.find((u) => u.id === 'iu-bc')!.convert(10000).ul).toBe(0);
  });
});

describe('محاسبه دریافت', () => {
  it('مکمل هفتگی به میانگین روزانه تبدیل می‌شود', () => {
    const r = sumIntake({ foods: [], supplements: [{ uid: '1', name: 'D3', frequency: 'weekly', items: [{ key: 'D', amount: 50000, unitId: 'iu' }] }] });
    expect(r.D.supplement).toBeCloseTo(1250 / 7);
  });
  it('ویتامین A گیاهی در UL شمرده نمی‌شود ولی جگر شمرده می‌شود', () => {
    const r = sumIntake({ foods: [{ uid: 'a', foodId: 'carrot', grams: 100 }, { uid: 'b', foodId: 'beef-liver', grams: 100 }], supplements: [] });
    expect(r.A.total).toBeCloseTo(835 + 7744);
    expect(r.A.ulRelevant).toBeCloseTo(7744);
  });
  it('جگر گاو ۱۰۰ گرمی برای زن بزرگسال از UL ویتامین A بالاتر است', () => {
    const res = calculate({ profile: adultF, foods: [{ uid: 'b', foodId: 'beef-liver', grams: 100 }], supplements: [], days: 1 });
    expect(res.results.find((x) => x.key === 'A')!.safety).toBe('above-ul');
  });
  it('دریافت صفر → احتمال ناکافی بالا', () => {
    const res = calculate({ profile: adultF, foods: [], supplements: [], days: 1 });
    const c = res.results.find((x) => x.key === 'C')!;
    expect(c.adequacy).toBe('below-ear');
    expect(c.probAdequacy!).toBeLessThan(0.05);
  });
  it('سیگار نیاز ویتامین C را ۳۵ میلی‌گرم افزایش می‌دهد', () => {
    const res = calculate({ profile: { ...adultF, smoker: true }, foods: [], supplements: [], days: 1 });
    expect(res.results.find((x) => x.key === 'C')!.rec).toBe(110);
  });
  it('ویتامین‌های فقط-AI احتمال کفایت ندارند', () => {
    const res = calculate({ profile: adultF, foods: [], supplements: [], days: 1 });
    expect(res.results.find((x) => x.key === 'K')!.probAdequacy).toBeNull();
  });
  it('normCdf دقت کافی دارد', () => {
    expect(normCdf(0)).toBeCloseTo(0.5, 6);
    expect(normCdf(1.96)).toBeCloseTo(0.975, 3);
    expect(normCdf(-1.645)).toBeCloseTo(0.05, 3);
  });
});

describe('غربالگری و آزمایش', () => {
  it('۲۵(OH)D برابر ۱۰ ng/mL در محدوده خطر کمبود است', () => {
    expect(interpretLab({ markerId: 'vitd', value: 10, unitId: 'ng' })!.band.status).toBe('deficient');
  });
  it('B12 برابر ۲۵۰ pg/mL مرزی است', () => {
    expect(interpretLab({ markerId: 'b12', value: 250, unitId: 'pg' })!.band.status).toBe('low');
  });
  it('علامت هشدار → ارجاع فوری', () => {
    expect(screen({ risks: [], symptoms: ['numbness'], meds: [], labs: [] }).triage).toBe('urgent');
  });
  it('وگان → B12 در صدر', () => {
    expect(screen({ risks: ['vegan'], symptoms: [], meds: [], labs: [] }).signals[0].key).toBe('B12');
  });
  it('همه نشانگرها باندهای صعودی دارند', () => {
    for (const m of Object.values(LABS)) {
      for (let i = 1; i < m.bands.length; i++) expect(m.bands[i].max).toBeGreaterThan(m.bands[i - 1].max);
    }
  });
});
