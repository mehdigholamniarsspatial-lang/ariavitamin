import type { DriSet, EfsaAdult, LifeStageKey, StageTable, VitaminKey } from './types';

/**
 * مقادیر مرجع دریافت (DRI) — آکادمی‌های ملی علوم، مهندسی و پزشکی آمریکا (NASEM / IOM)
 * گزارش‌های 1997، 1998، 2000، 2001 و برای ویتامین D به‌روزرسانی 2011.
 * جداول خلاصه: https://www.ncbi.nlm.nih.gov/books/NBK545442/  و برگه‌های NIH ODS.
 * تاریخ آخرین بازبینی داده در این پروژه: 2026-10-16
 */

export const STAGE_ORDER: LifeStageKey[] = [
  'inf0', 'inf7', 'c1', 'c4',
  'm9', 'm14', 'm19', 'm31', 'm51', 'm71',
  'f9', 'f14', 'f19', 'f31', 'f51', 'f71',
  'p14', 'p19', 'p31',
  'l14', 'l19', 'l31',
];

export const STAGE_LABELS: Record<LifeStageKey, string> = {
  inf0: 'شیرخوار ۰ تا ۶ ماه',
  inf7: 'شیرخوار ۷ تا ۱۲ ماه',
  c1: 'کودک ۱ تا ۳ سال',
  c4: 'کودک ۴ تا ۸ سال',
  m9: 'پسر ۹ تا ۱۳ سال',
  m14: 'پسر ۱۴ تا ۱۸ سال',
  m19: 'مرد ۱۹ تا ۳۰ سال',
  m31: 'مرد ۳۱ تا ۵۰ سال',
  m51: 'مرد ۵۱ تا ۷۰ سال',
  m71: 'مرد بالای ۷۰ سال',
  f9: 'دختر ۹ تا ۱۳ سال',
  f14: 'دختر ۱۴ تا ۱۸ سال',
  f19: 'زن ۱۹ تا ۳۰ سال',
  f31: 'زن ۳۱ تا ۵۰ سال',
  f51: 'زن ۵۱ تا ۷۰ سال',
  f71: 'زن بالای ۷۰ سال',
  p14: 'بارداری، ۱۸ سال و کمتر',
  p19: 'بارداری، ۱۹ تا ۳۰ سال',
  p31: 'بارداری، ۳۱ تا ۵۰ سال',
  l14: 'شیردهی، ۱۸ سال و کمتر',
  l19: 'شیردهی، ۱۹ تا ۳۰ سال',
  l31: 'شیردهی، ۳۱ تا ۵۰ سال',
};

export const STAGE_GROUPS: { label: string; keys: LifeStageKey[] }[] = [
  { label: 'شیرخواران و کودکان', keys: ['inf0', 'inf7', 'c1', 'c4'] },
  { label: 'مردان', keys: ['m9', 'm14', 'm19', 'm31', 'm51', 'm71'] },
  { label: 'زنان', keys: ['f9', 'f14', 'f19', 'f31', 'f51', 'f71'] },
  { label: 'بارداری', keys: ['p14', 'p19', 'p31'] },
  { label: 'شیردهی', keys: ['l14', 'l19', 'l31'] },
];

type N = number | null;
/** ترتیب: inf0 inf7 c1 c4 | m9 m14 m19 m31 m51 m71 | f9 f14 f19 f31 f51 f71 | p14 p19 p31 | l14 l19 l31 */
function row(...v: N[]): StageTable {
  if (v.length !== STAGE_ORDER.length) throw new Error('DRI row length mismatch: ' + v.length);
  const t: StageTable = {};
  STAGE_ORDER.forEach((k, i) => (t[k] = v[i]));
  return t;
}
const _ = null;

export const DRI: Record<VitaminKey, DriSet> = {
  A: {
    key: 'A',
    rec: row(400, 500, 300, 400, 600, 900, 900, 900, 900, 900, 600, 700, 700, 700, 700, 700, 750, 770, 770, 1200, 1300, 1300),
    ear: row(_, _, 210, 275, 445, 630, 625, 625, 625, 625, 420, 485, 500, 500, 500, 500, 530, 550, 550, 880, 900, 900),
    ul: row(600, 600, 600, 900, 1700, 2800, 3000, 3000, 3000, 3000, 1700, 2800, 3000, 3000, 3000, 3000, 2800, 3000, 3000, 2800, 3000, 3000),
    ulScope: 'preformed', cvRequirement: 0.2, cvWithin: 0.9,
  },
  D: {
    key: 'D',
    rec: row(10, 10, 15, 15, 15, 15, 15, 15, 15, 20, 15, 15, 15, 15, 15, 20, 15, 15, 15, 15, 15, 15),
    ear: row(_, _, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10),
    ul: row(25, 38, 63, 75, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100),
    ulScope: 'total', cvRequirement: 0.1, cvWithin: 0.8,
  },
  E: {
    key: 'E',
    rec: row(4, 5, 6, 7, 11, 15, 15, 15, 15, 15, 11, 15, 15, 15, 15, 15, 15, 15, 15, 19, 19, 19),
    ear: row(_, _, 5, 6, 9, 12, 12, 12, 12, 12, 9, 12, 12, 12, 12, 12, 12, 12, 12, 16, 16, 16),
    ul: row(_, _, 200, 300, 600, 800, 1000, 1000, 1000, 1000, 600, 800, 1000, 1000, 1000, 1000, 800, 1000, 1000, 800, 1000, 1000),
    ulScope: 'supplemental', cvRequirement: 0.1, cvWithin: 0.5,
  },
  K: {
    key: 'K',
    rec: row(2, 2.5, 30, 55, 60, 75, 120, 120, 120, 120, 60, 75, 90, 90, 90, 90, 75, 90, 90, 75, 90, 90),
    allAI: true, ulScope: 'none', cvRequirement: 0.1, cvWithin: 0.9,
  },
  C: {
    key: 'C',
    rec: row(40, 50, 15, 25, 45, 75, 90, 90, 90, 90, 45, 65, 75, 75, 75, 75, 80, 85, 85, 115, 120, 120),
    ear: row(_, _, 13, 22, 39, 63, 75, 75, 75, 75, 39, 56, 60, 60, 60, 60, 66, 70, 70, 96, 100, 100),
    ul: row(_, _, 400, 650, 1200, 1800, 2000, 2000, 2000, 2000, 1200, 1800, 2000, 2000, 2000, 2000, 1800, 2000, 2000, 1800, 2000, 2000),
    ulScope: 'total', cvRequirement: 0.1, cvWithin: 0.6,
  },
  B1: {
    key: 'B1',
    rec: row(0.2, 0.3, 0.5, 0.6, 0.9, 1.2, 1.2, 1.2, 1.2, 1.2, 0.9, 1.0, 1.1, 1.1, 1.1, 1.1, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4),
    ear: row(_, _, 0.4, 0.5, 0.7, 1.0, 1.0, 1.0, 1.0, 1.0, 0.7, 0.9, 0.9, 0.9, 0.9, 0.9, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2),
    ulScope: 'none', cvRequirement: 0.1, cvWithin: 0.4,
  },
  B2: {
    key: 'B2',
    rec: row(0.3, 0.4, 0.5, 0.6, 0.9, 1.3, 1.3, 1.3, 1.3, 1.3, 0.9, 1.0, 1.1, 1.1, 1.1, 1.1, 1.4, 1.4, 1.4, 1.6, 1.6, 1.6),
    ear: row(_, _, 0.4, 0.5, 0.8, 1.1, 1.1, 1.1, 1.1, 1.1, 0.8, 0.9, 0.9, 0.9, 0.9, 0.9, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3),
    ulScope: 'none', cvRequirement: 0.1, cvWithin: 0.4,
  },
  B3: {
    key: 'B3',
    rec: row(2, 4, 6, 8, 12, 16, 16, 16, 16, 16, 12, 14, 14, 14, 14, 14, 18, 18, 18, 17, 17, 17),
    ear: row(_, _, 5, 6, 9, 12, 12, 12, 12, 12, 9, 11, 11, 11, 11, 11, 14, 14, 14, 13, 13, 13),
    ul: row(_, _, 10, 15, 20, 30, 35, 35, 35, 35, 20, 30, 35, 35, 35, 35, 30, 35, 35, 30, 35, 35),
    ulScope: 'synthetic', cvRequirement: 0.15, cvWithin: 0.4,
  },
  B5: {
    key: 'B5',
    rec: row(1.7, 1.8, 2, 3, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7),
    allAI: true, ulScope: 'none', cvRequirement: 0.1, cvWithin: 0.4,
  },
  B6: {
    key: 'B6',
    rec: row(0.1, 0.3, 0.5, 0.6, 1.0, 1.3, 1.3, 1.3, 1.7, 1.7, 1.0, 1.2, 1.3, 1.3, 1.5, 1.5, 1.9, 1.9, 1.9, 2.0, 2.0, 2.0),
    ear: row(_, _, 0.4, 0.5, 0.8, 1.1, 1.1, 1.1, 1.4, 1.4, 0.8, 1.0, 1.1, 1.1, 1.3, 1.3, 1.6, 1.6, 1.6, 1.7, 1.7, 1.7),
    ul: row(_, _, 30, 40, 60, 80, 100, 100, 100, 100, 60, 80, 100, 100, 100, 100, 80, 100, 100, 80, 100, 100),
    ulScope: 'total', cvRequirement: 0.1, cvWithin: 0.4,
  },
  B7: {
    key: 'B7',
    rec: row(5, 6, 8, 12, 20, 25, 30, 30, 30, 30, 20, 25, 30, 30, 30, 30, 30, 30, 30, 35, 35, 35),
    allAI: true, ulScope: 'none', cvRequirement: 0.1, cvWithin: 0.5,
  },
  B9: {
    key: 'B9',
    rec: row(65, 80, 150, 200, 300, 400, 400, 400, 400, 400, 300, 400, 400, 400, 400, 400, 600, 600, 600, 500, 500, 500),
    ear: row(_, _, 120, 160, 250, 330, 320, 320, 320, 320, 250, 330, 320, 320, 320, 320, 520, 520, 520, 450, 450, 450),
    ul: row(_, _, 300, 400, 600, 800, 1000, 1000, 1000, 1000, 600, 800, 1000, 1000, 1000, 1000, 800, 1000, 1000, 800, 1000, 1000),
    ulScope: 'synthetic', cvRequirement: 0.1, cvWithin: 0.5,
  },
  B12: {
    key: 'B12',
    rec: row(0.4, 0.5, 0.9, 1.2, 1.8, 2.4, 2.4, 2.4, 2.4, 2.4, 1.8, 2.4, 2.4, 2.4, 2.4, 2.4, 2.6, 2.6, 2.6, 2.8, 2.8, 2.8),
    ear: row(_, _, 0.7, 1.0, 1.5, 2.0, 2.0, 2.0, 2.0, 2.0, 1.5, 2.0, 2.0, 2.0, 2.0, 2.0, 2.2, 2.2, 2.2, 2.4, 2.4, 2.4),
    ulScope: 'none', cvRequirement: 0.1, cvWithin: 0.8,
  },
};

/** در DRI آمریکا مقادیر شیرخواران همیشه AI است. */
export function recTypeFor(key: VitaminKey, stage: LifeStageKey): 'RDA' | 'AI' {
  if (DRI[key].allAI) return 'AI';
  if (stage === 'inf0' || stage === 'inf7') return 'AI';
  return 'RDA';
}

export const UL_SCOPE_FA: Record<DriSet['ulScope'], string> = {
  total: 'مجموع دریافت از غذا، غذاهای غنی‌شده و مکمل‌ها',
  preformed: 'فقط ویتامین A از پیش ساخته (رتینول و استرهای آن) از غذاهای حیوانی، غذاهای غنی‌شده و مکمل‌ها؛ بتاکاروتن شامل نمی‌شود',
  supplemental: 'فقط آلفاتوکوفرول دریافتی از مکمل‌ها و غذاهای غنی‌شده (هر شکل)',
  synthetic: 'فقط شکل سنتتیک دریافتی از مکمل‌ها و غذاهای غنی‌شده (اسید فولیک / نیاسین افزوده)',
  none: 'حد بالای قابل تحمل تعیین نشده است؛ این به معنی بی‌خطری دوزهای بالا نیست',
};

/**
 * EFSA — مقادیر مرجع رژیمی (DRV) برای بزرگسالان ۱۸ سال به بالا.
 * DRV Finder: https://multimedia.efsa.europa.eu/drvs/index.htm
 */
export const EFSA_ADULT: Record<VitaminKey, EfsaAdult> = {
  A: { key: 'A', type: 'PRI', male: 750, female: 650, pregnant: 700, lactating: 1300, ul: 3000, ulNoteFa: 'رتینول از پیش ساخته (SCF 2002)', year: '2015' },
  D: { key: 'D', type: 'AI', male: 15, female: 15, pregnant: 15, lactating: 15, ul: 100, ulNoteFa: 'بازبینی ۲۰۲۳', year: '2016' },
  E: { key: 'E', type: 'AI', male: 13, female: 11, pregnant: 11, lactating: 11, ul: 300, ulNoteFa: 'آلفاتوکوفرول؛ بازبینی ۲۰۲۴', year: '2015' },
  K: { key: 'K', type: 'AI', male: 70, female: 70, pregnant: 70, lactating: 70, ul: null, noteFa: 'معادل ۱ میکروگرم فیلوکینون به ازای هر کیلوگرم وزن بدن', year: '2017' },
  C: { key: 'C', type: 'PRI', male: 110, female: 95, pregnant: 105, lactating: 155, ul: null, year: '2013' },
  B1: { key: 'B1', type: 'PRI', male: null, female: null, pregnant: null, lactating: null, ul: null, noteFa: '۰٫۱ میلی‌گرم به ازای هر مگاژول انرژی دریافتی (برای ۲۰۰۰ کیلوکالری حدود ۰٫۸۴ میلی‌گرم)', year: '2016' },
  B2: { key: 'B2', type: 'PRI', male: 1.6, female: 1.6, pregnant: 1.9, lactating: 2.0, ul: null, year: '2017' },
  B3: { key: 'B3', type: 'PRI', male: null, female: null, pregnant: null, lactating: null, ul: 10, ulNoteFa: 'اسید نیکوتینیک ۱۰ میلی‌گرم؛ نیکوتین‌آمید ۹۰۰ میلی‌گرم', noteFa: '۱٫۶ میلی‌گرم معادل نیاسین به ازای هر مگاژول', year: '2014' },
  B5: { key: 'B5', type: 'AI', male: 5, female: 5, pregnant: 5, lactating: 7, ul: null, year: '2014' },
  B6: { key: 'B6', type: 'PRI', male: 1.7, female: 1.6, pregnant: 1.8, lactating: 1.7, ul: 12, ulNoteFa: 'بازبینی ۲۰۲۳ — بسیار کمتر از UL آمریکا', year: '2016' },
  B7: { key: 'B7', type: 'AI', male: 40, female: 40, pregnant: 40, lactating: 45, ul: null, year: '2014' },
  B9: { key: 'B9', type: 'PRI', male: 330, female: 330, pregnant: 600, lactating: 500, ul: 1000, ulNoteFa: 'فقط اسید فولیک سنتتیک', noteFa: 'برای بارداری و شیردهی AI تعیین شده است', year: '2014' },
  B12: { key: 'B12', type: 'AI', male: 4, female: 4, pregnant: 4.5, lactating: 5, ul: null, year: '2015' },
};
