import type { LabMarker, VitaminKey, VitaminProfile } from './types';
import { FAT_SOLUBLE } from './vitamins-fat';
import { WATER_SOLUBLE } from './vitamins-water';
import { WHO_FOLATE, WHO_RETINOL, ods, lpi } from './sources';

export const VITAMINS: VitaminProfile[] = [...FAT_SOLUBLE, ...WATER_SOLUBLE];
export const VITAMIN_KEYS: VitaminKey[] = VITAMINS.map((v) => v.key);
export const VIT = Object.fromEntries(VITAMINS.map((v) => [v.key, v])) as Record<VitaminKey, VitaminProfile>;
export const bySlug = (slug: string) => VITAMINS.find((v) => v.slug === slug);

export const EVIDENCE_LABELS = {
  strong: { fa: 'شواهد قوی', desc: 'کارآزمایی‌های تصادفی همسو یا مرور نظام‌مند با کیفیت بالا؛ مورد پذیرش راهنماهای معتبر.' },
  moderate: { fa: 'شواهد متوسط', desc: 'کارآزمایی‌های محدود یا ناهمگن با جهت اثر همسو؛ در برخی راهنماها مطرح.' },
  limited: { fa: 'شواهد محدود', desc: 'مطالعات کوچک، مشاهده‌ای یا مقدماتی؛ نتیجه‌گیری قطعی ممکن نیست.' },
  conflicting: { fa: 'شواهد متناقض', desc: 'مطالعات معتبر نتایج ناهمسو دارند.' },
  unproven: { fa: 'اثبات‌نشده یا رد شده', desc: 'کارآزمایی‌های مناسب اثری نشان نداده‌اند یا شواهد کافی وجود ندارد.' },
} as const;

/**
 * نشانگرهای آزمایشگاهی — آستانه‌ها در واحد canonical (اولین واحد).
 * محدوده‌های مرجع آزمایشگاه‌ها متفاوت است؛ این آستانه‌ها برای آموزش و غربالگری‌اند، نه تشخیص.
 */
export const LABS: Record<string, LabMarker & { vitamin: VitaminKey }> = {
  vitd: {
    id: 'vitd', vitamin: 'D', nameFa: '۲۵-هیدروکسی‌ویتامین D سرم', nameEn: '25(OH)D',
    units: [{ id: 'nmol', label: 'nmol/L', toCanonical: 1 }, { id: 'ng', label: 'ng/mL', toCanonical: 2.496 }],
    bands: [
      { max: 30, status: 'deficient', labelFa: 'در معرض خطر کمبود' },
      { max: 50, status: 'low', labelFa: 'احتمالاً ناکافی برای برخی افراد' },
      { max: 125, status: 'adequate', labelFa: 'کافی برای تقریباً همه افراد' },
      { max: Infinity, status: 'high', labelFa: 'بالا؛ احتمال عوارض در سطوح پایدار بیش از ۱۲۵' },
    ],
    caveats: ['آستانه‌ها بر اساس NASEM و NIH ODS است؛ برخی انجمن‌ها آستانه ۷۵ نانومول (۳۰ نانوگرم) را به کار می‌برند.', 'روش اندازه‌گیری (ایمونواسی یا LC-MS/MS) و فصل نمونه‌گیری بر نتیجه اثر دارند.'],
    source: ods('VitaminD', 'ویتامین D'),
  },
  b12: {
    id: 'b12', vitamin: 'B12', nameFa: 'ویتامین B12 سرم', nameEn: 'Serum cobalamin',
    units: [{ id: 'pmol', label: 'pmol/L', toCanonical: 1 }, { id: 'pg', label: 'pg/mL', toCanonical: 0.738 }],
    bands: [
      { max: 148, status: 'deficient', labelFa: 'کمبود محتمل' },
      { max: 221, status: 'low', labelFa: 'مرزی؛ بررسی MMA یا هموسیستئین' },
      { max: Infinity, status: 'adequate', labelFa: 'کمبود بعید است' },
    ],
    caveats: ['B12 سرم حساسیت و ویژگی محدودی دارد؛ علائم عصبی با سطح طبیعی نیز ممکن است رخ دهد.', 'سطح بسیار بالا بدون مکمل نیاز به بررسی پزشکی دارد.'],
    source: ods('VitaminB12', 'ویتامین B12'),
  },
  folate_serum: {
    id: 'folate_serum', vitamin: 'B9', nameFa: 'فولات سرم', nameEn: 'Serum folate',
    units: [{ id: 'nmol', label: 'nmol/L', toCanonical: 1 }, { id: 'ng', label: 'ng/mL', toCanonical: 2.266 }],
    bands: [
      { max: 10, status: 'deficient', labelFa: 'کمبود احتمالی (بر پایه افزایش هموسیستئین)' },
      { max: Infinity, status: 'adequate', labelFa: 'در محدوده مطلوب' },
    ],
    caveats: ['فولات سرم بازتاب دریافت اخیر است؛ یک وعده غذایی می‌تواند آن را تغییر دهد.', 'آستانه WHO برای ارزیابی جمعیتی تعیین شده است.'],
    source: WHO_FOLATE,
  },
  folate_rbc: {
    id: 'folate_rbc', vitamin: 'B9', nameFa: 'فولات گلبول قرمز', nameEn: 'RBC folate',
    units: [{ id: 'nmol', label: 'nmol/L', toCanonical: 1 }, { id: 'ng', label: 'ng/mL', toCanonical: 2.266 }],
    bands: [
      { max: 340, status: 'deficient', labelFa: 'کمبود (بر پایه شاخص‌های خونی)' },
      { max: 906, status: 'low', labelFa: 'ناکافی برای پیشگیری بهینه از نقص لوله عصبی در زنان سن باروری' },
      { max: Infinity, status: 'adequate', labelFa: 'مطلوب' },
    ],
    caveats: ['روش آزمایش و کالیبراسیون (میکروبیولوژیک یا ایمونواسی) بر مقایسه با آستانه‌ها اثر جدی دارد.', 'آستانه ۹۰۶ فقط برای زنان در سن باروری تعریف شده است.'],
    source: WHO_FOLATE,
  },
  retinol: {
    id: 'retinol', vitamin: 'A', nameFa: 'رتینول سرم', nameEn: 'Serum retinol',
    units: [{ id: 'umol', label: 'µmol/L', toCanonical: 1 }, { id: 'ugdl', label: 'µg/dL', toCanonical: 0.0349 }],
    bands: [
      { max: 0.35, status: 'deficient', labelFa: 'کمبود شدید' },
      { max: 0.7, status: 'low', labelFa: 'کمبود (آستانه جمعیتی WHO)' },
      { max: Infinity, status: 'adequate', labelFa: 'بالاتر از آستانه کمبود' },
    ],
    caveats: ['التهاب و عفونت حاد رتینول سرم را به‌طور کاذب کاهش می‌دهد.', 'رتینول سرم تا زمانی که ذخایر کبدی بسیار پایین نیامده‌اند ثابت می‌ماند و نشانگر حساسی برای ذخایر نیست.'],
    source: WHO_RETINOL,
  },
  vitc: {
    id: 'vitc', vitamin: 'C', nameFa: 'ویتامین C پلاسما', nameEn: 'Plasma ascorbate',
    units: [{ id: 'umol', label: 'µmol/L', toCanonical: 1 }, { id: 'mgdl', label: 'mg/dL', toCanonical: 56.78 }],
    bands: [
      { max: 11, status: 'deficient', labelFa: 'کمبود' },
      { max: 23, status: 'low', labelFa: 'حاشیه‌ای' },
      { max: Infinity, status: 'adequate', labelFa: 'کافی' },
    ],
    caveats: ['تحت تأثیر شدید دریافت اخیر و نحوه نگهداری نمونه است.'],
    source: lpi('vitamin-C', 'ویتامین C'),
  },
  plp: {
    id: 'plp', vitamin: 'B6', nameFa: 'پیریدوکسال-۵-فسفات پلاسما', nameEn: 'Plasma PLP',
    units: [{ id: 'nmol', label: 'nmol/L', toCanonical: 1 }, { id: 'ugl', label: 'µg/L', toCanonical: 4.046 }],
    bands: [
      { max: 20, status: 'deficient', labelFa: 'کمبود' },
      { max: 30, status: 'low', labelFa: 'حاشیه‌ای' },
      { max: Infinity, status: 'adequate', labelFa: 'کافی' },
    ],
    caveats: ['التهاب، آلبومین پایین و بارداری PLP را کاهش می‌دهند.'],
    source: ods('VitaminB6', 'ویتامین B6'),
  },
  vite: {
    id: 'vite', vitamin: 'E', nameFa: 'آلفاتوکوفرول سرم', nameEn: 'Serum α-tocopherol',
    units: [{ id: 'umol', label: 'µmol/L', toCanonical: 1 }, { id: 'mgdl', label: 'mg/dL', toCanonical: 23.22 }],
    bands: [
      { max: 12, status: 'deficient', labelFa: 'کمبود' },
      { max: Infinity, status: 'adequate', labelFa: 'کافی' },
    ],
    caveats: ['در هیپرلیپیدمی به‌طور کاذب بالاست؛ نسبت به لیپیدهای سرم تفسیر شود.'],
    source: ods('VitaminE', 'ویتامین E'),
  },
};
