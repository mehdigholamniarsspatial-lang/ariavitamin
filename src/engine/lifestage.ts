import type { LifeStageKey, PhysStatus, Sex } from '../data/types';

export interface Profile {
  ageYears: number; // برای شیرخواران عدد اعشاری (مثلاً ۰٫۵)
  sex: Sex;
  status: PhysStatus;
  smoker: boolean;
  weightKg?: number;
  heightCm?: number;
}

export interface StageResult {
  stage: LifeStageKey;
  warnings: string[];
}

/** انتخاب گروه مرجع DRI بر اساس سن، جنس و وضعیت فیزیولوژیک. وزن در این انتخاب نقشی ندارد. */
export function lifeStage(p: Profile): StageResult {
  const w: string[] = [];
  const a = p.ageYears;
  if (!Number.isFinite(a) || a < 0) return { stage: 'm19', warnings: ['سن نامعتبر است.'] };
  if (a > 120) w.push('سن واردشده غیرمعمول است؛ لطفاً بررسی کنید.');

  if (p.sex === 'female' && p.status !== 'none') {
    if (a < 14 || a > 50) {
      w.push('مقادیر مرجع بارداری و شیردهی فقط برای ۱۴ تا ۵۰ سال تعریف شده‌اند؛ نزدیک‌ترین گروه به کار رفت. این شرایط نیازمند مراقبت تخصصی است.');
    }
    const base = p.status === 'pregnant' ? 'p' : 'l';
    const band = a < 19 ? '14' : a < 31 ? '19' : '31';
    return { stage: `${base}${band}` as LifeStageKey, warnings: w };
  }
  if (p.sex === 'male' && p.status !== 'none') w.push('وضعیت بارداری یا شیردهی فقط برای جنس زن در نظر گرفته می‌شود.');

  if (a < 0.5) return { stage: 'inf0', warnings: w };
  if (a < 1) return { stage: 'inf7', warnings: w };
  if (a < 4) return { stage: 'c1', warnings: w };
  if (a < 9) return { stage: 'c4', warnings: w };
  const s = p.sex === 'male' ? 'm' : 'f';
  const band = a < 14 ? '9' : a < 19 ? '14' : a < 31 ? '19' : a < 51 ? '31' : a < 71 ? '51' : '71';
  return { stage: `${s}${band}` as LifeStageKey, warnings: w };
}

export function bmi(p: Profile): number | null {
  if (!p.weightKg || !p.heightCm) return null;
  const h = p.heightCm / 100;
  return p.weightKg / (h * h);
}
