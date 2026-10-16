import type { Supplement } from '../engine/calc';

/** نمونه‌های رایج مکمل — مقادیر نمونه‌اند؛ کاربر باید با برچسب محصول خود تطبیق دهد. */
export const SUPPLEMENT_PRESETS: Omit<Supplement, 'uid'>[] = [
  { name: 'مولتی‌ویتامین بزرگسال (نمونه)', frequency: 'daily', items: [
    { key: 'A', amount: 450, unitId: 'rae-retinol' }, { key: 'A', amount: 450, unitId: 'rae-bc' }, { key: 'D', amount: 1000, unitId: 'iu' },
    { key: 'E', amount: 15, unitId: 'mg' }, { key: 'K', amount: 80, unitId: 'ug' }, { key: 'C', amount: 90, unitId: 'mg' },
    { key: 'B1', amount: 1.2, unitId: 'mg' }, { key: 'B2', amount: 1.3, unitId: 'mg' }, { key: 'B3', amount: 16, unitId: 'mg' },
    { key: 'B5', amount: 5, unitId: 'mg' }, { key: 'B6', amount: 1.7, unitId: 'mg' }, { key: 'B7', amount: 30, unitId: 'ug' },
    { key: 'B9', amount: 400, unitId: 'folic' }, { key: 'B12', amount: 6, unitId: 'ug' },
  ] },
  { name: 'ویتامین D3 هزار واحدی', frequency: 'daily', items: [{ key: 'D', amount: 1000, unitId: 'iu' }] },
  { name: 'پرل ویتامین D ۵۰٬۰۰۰ واحدی — ماهانه', frequency: 'monthly', items: [{ key: 'D', amount: 50000, unitId: 'iu' }] },
  { name: 'پرل ویتامین D ۵۰٬۰۰۰ واحدی — هفتگی', frequency: 'weekly', items: [{ key: 'D', amount: 50000, unitId: 'iu' }] },
  { name: 'اسید فولیک ۴۰۰ میکروگرم', frequency: 'daily', items: [{ key: 'B9', amount: 400, unitId: 'folic' }] },
  { name: 'ب‌کمپلکس پردوز (نمونه)', frequency: 'daily', items: [
    { key: 'B1', amount: 50, unitId: 'mg' }, { key: 'B2', amount: 50, unitId: 'mg' }, { key: 'B3', amount: 50, unitId: 'mg' },
    { key: 'B5', amount: 50, unitId: 'mg' }, { key: 'B6', amount: 50, unitId: 'mg' }, { key: 'B7', amount: 50, unitId: 'ug' },
    { key: 'B9', amount: 400, unitId: 'folic' }, { key: 'B12', amount: 50, unitId: 'ug' },
  ] },
  { name: 'ویتامین B12 هزار میکروگرمی', frequency: 'daily', items: [{ key: 'B12', amount: 1000, unitId: 'ug' }] },
  { name: 'ویتامین C پانصد میلی‌گرمی', frequency: 'daily', items: [{ key: 'C', amount: 500, unitId: 'mg' }] },
  { name: 'ویتامین E چهارصد واحدی (طبیعی)', frequency: 'daily', items: [{ key: 'E', amount: 400, unitId: 'iu-nat' }] },
  { name: 'مکمل مو و ناخن (بیوتین ۵ میلی‌گرم)', frequency: 'daily', items: [{ key: 'B7', amount: 5, unitId: 'mg' }] },
];
