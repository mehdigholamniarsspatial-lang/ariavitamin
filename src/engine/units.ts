import type { VitaminKey } from '../data/types';

/**
 * تبدیل واحد مقادیر مکمل به واحد مرجع هر ویتامین.
 * خروجی: total = سهم در کفایت (به واحد مرجع) | ul = سهم در مقایسه با UL (به واحد UL)
 * منبع ضرایب: NIH ODS (برگه‌های ویتامین A، D، E و فولات).
 */
export interface SupUnit {
  id: string;
  label: string;
  convert: (amount: number) => { total: number; ul: number };
  hint?: string;
}

const same = (id: string, label: string): SupUnit => ({ id, label, convert: (a) => ({ total: a, ul: a }) });

export const SUP_UNITS: Record<VitaminKey, SupUnit[]> = {
  A: [
    { id: 'rae-retinol', label: 'µg RAE — رتینول', convert: (a) => ({ total: a, ul: a }) },
    { id: 'iu-retinol', label: 'IU — رتینول / استر رتینیل', convert: (a) => ({ total: a * 0.3, ul: a * 0.3 }) },
    { id: 'rae-bc', label: 'µg RAE — بتاکاروتن', convert: (a) => ({ total: a, ul: 0 }), hint: 'بتاکاروتن در UL شمرده نمی‌شود' },
    { id: 'iu-bc', label: 'IU — بتاکاروتن مکمل', convert: (a) => ({ total: a * 0.3, ul: 0 }), hint: 'بتاکاروتن در UL شمرده نمی‌شود' },
  ],
  D: [
    { id: 'iu', label: 'IU (واحد بین‌المللی)', convert: (a) => ({ total: a / 40, ul: a / 40 }) },
    same('ug', 'میکروگرم'),
  ],
  E: [
    same('mg', 'میلی‌گرم آلفاتوکوفرول'),
    { id: 'iu-nat', label: 'IU — طبیعی (d-alpha)', convert: (a) => ({ total: a * 0.67, ul: a * 0.67 }) },
    { id: 'iu-syn', label: 'IU — سنتتیک (dl-alpha)', convert: (a) => ({ total: a * 0.45, ul: a * 0.45 }) },
  ],
  K: [same('ug', 'میکروگرم')],
  C: [same('mg', 'میلی‌گرم'), { id: 'g', label: 'گرم', convert: (a) => ({ total: a * 1000, ul: a * 1000 }) }],
  B1: [same('mg', 'میلی‌گرم')],
  B2: [same('mg', 'میلی‌گرم')],
  B3: [same('mg', 'میلی‌گرم (نیاسین یا نیکوتین‌آمید)')],
  B5: [same('mg', 'میلی‌گرم')],
  B6: [same('mg', 'میلی‌گرم')],
  B7: [same('ug', 'میکروگرم'), { id: 'mg', label: 'میلی‌گرم', convert: (a) => ({ total: a * 1000, ul: a * 1000 }) }],
  B9: [
    { id: 'folic', label: 'µg اسید فولیک', convert: (a) => ({ total: a * 1.7, ul: a }), hint: 'برای کفایت ×۱٫۷ به DFE؛ برای UL خود مقدار' },
    { id: 'folic-mg', label: 'mg اسید فولیک', convert: (a) => ({ total: a * 1000 * 1.7, ul: a * 1000 }) },
    { id: 'dfe', label: 'µg DFE (از برچسب جدید)', convert: (a) => ({ total: a, ul: a / 1.7 }), hint: 'فرض: تمام مقدار از اسید فولیک است' },
    { id: 'mthf', label: 'µg متیل‌فولات (5-MTHF)', convert: (a) => ({ total: a * 1.7, ul: 0 }), hint: 'UL آمریکا فقط برای اسید فولیک است' },
  ],
  B12: [same('ug', 'میکروگرم')],
};

export const FREQUENCIES = [
  { id: 'daily', label: 'هر روز', perDay: 1 },
  { id: 'eod', label: 'یک روز در میان', perDay: 1 / 2 },
  { id: 'weekly', label: 'هفته‌ای یک بار', perDay: 1 / 7 },
  { id: 'biweekly', label: 'دو هفته یک بار', perDay: 1 / 14 },
  { id: 'monthly', label: 'ماهی یک بار', perDay: 1 / 30 },
] as const;
export type FrequencyId = (typeof FREQUENCIES)[number]['id'];

export function findUnit(key: VitaminKey, id: string): SupUnit {
  return SUP_UNITS[key].find((u) => u.id === id) ?? SUP_UNITS[key][0];
}
