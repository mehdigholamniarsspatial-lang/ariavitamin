import type { Interaction } from './types';
import { lpi, ods } from './sources';

const LPI_DRUG = { title: 'Drug-Nutrient Interactions', org: 'Linus Pauling Institute', url: 'https://lpi.oregonstate.edu/mic/drug-nutrient-interactions' };
const FDA_BIOTIN = { title: 'Biotin interference with laboratory tests (Safety communication)', org: 'U.S. Food and Drug Administration', url: 'https://www.fda.gov/medical-devices/safety-communications/update-fda-warns-biotin-may-interfere-lab-tests-fda-safety-communication' };

/**
 * تداخلات شناخته‌شده و بالینی‌مهم. این فهرست جامع نیست و جایگزین
 * بانک‌های اطلاعات دارویی معتبر (مانند Lexicomp یا Natural Medicines) و مشورت داروساز نیست.
 */
export const INTERACTIONS: Interaction[] = [
  {
    id: 'warfarin-k', agentFa: 'وارفارین', agentEn: 'Warfarin', kind: 'drug', vitamins: ['K'], severity: 'major',
    effect: 'تغییر ناگهانی دریافت ویتامین K (غذا یا مکمل) اثر ضدانعقادی را تغییر می‌دهد: افزایش دریافت INR را پایین می‌آورد و کاهش آن خطر خونریزی را بالا می‌برد.',
    mechanism: 'وارفارین با مهار VKOR چرخه بازیافت ویتامین K را مسدود می‌کند.',
    management: 'سبزی‌های برگ سبز را حذف نکنید؛ دریافت را روزبه‌روز ثابت نگه دارید. شروع یا قطع هر مکمل حاوی ویتامین K باید با اطلاع پزشک و پایش INR باشد.',
    source: ods('vitaminK', 'ویتامین K'), keywords: ['warfarin', 'کومادین', 'coumadin', 'ضدانعقاد', 'رقیق کننده خون'],
  },
  {
    id: 'anticoag-e', agentFa: 'ضدانعقادها و ضدپلاکت‌ها (وارفارین، آسپرین، کلوپیدوگرل)', agentEn: 'Anticoagulants / antiplatelets', kind: 'drug', vitamins: ['E'], severity: 'moderate',
    effect: 'دوزهای بالای مکمل ویتامین E ممکن است خطر خونریزی را افزایش دهد.',
    mechanism: 'مهار تجمع پلاکتی و تداخل با عملکرد ویتامین K.',
    management: 'از مصرف دوزهای بالا (مثلاً ۴۰۰ IU یا بیشتر) بدون نظر پزشک خودداری شود؛ پیش از جراحی اطلاع داده شود.',
    source: ods('VitaminE', 'ویتامین E'), keywords: ['aspirin', 'آسپرین', 'clopidogrel', 'پلاویکس', 'warfarin', 'وارفارین'],
  },
  {
    id: 'metformin-b12', agentFa: 'متفورمین', agentEn: 'Metformin', kind: 'drug', vitamins: ['B12'], severity: 'moderate',
    effect: 'مصرف طولانی‌مدت با کاهش سطح B12 و احتمال کمبود همراه است؛ نوروپاتی ناشی از کمبود ممکن است با نوروپاتی دیابتی اشتباه شود.',
    mechanism: 'اختلال جذب وابسته به کلسیم در ایلئوم.',
    management: 'پایش دوره‌ای B12، به‌ویژه پس از چند سال مصرف یا در وجود نوروپاتی یا کم‌خونی (توصیه انجمن دیابت آمریکا).',
    source: ods('VitaminB12', 'ویتامین B12'), keywords: ['metformin', 'گلوکوفاژ', 'glucophage', 'دیابت', 'قند'],
  },
  {
    id: 'ppi-b12', agentFa: 'مهارکننده‌های پمپ پروتون و آنتاگونیست‌های H2 (امپرازول، پنتوپرازول، فاموتیدین)', agentEn: 'PPIs / H2 blockers', kind: 'drug', vitamins: ['B12'], severity: 'moderate',
    effect: 'مصرف طولانی (بیش از ۲ سال) با کاهش جذب B12 پیوندی با غذا همراه است.',
    mechanism: 'کاهش اسید معده برای آزادسازی B12 از پروتئین غذا.',
    management: 'در مصرف طولانی، وضعیت B12 بررسی شود؛ B12 کریستالی مکمل یا غذاهای غنی‌شده کمتر تحت تأثیر است.',
    source: ods('VitaminB12', 'ویتامین B12'), keywords: ['omeprazole', 'امپرازول', 'pantoprazole', 'پنتوپرازول', 'esomeprazole', 'ازومپرازول', 'famotidine', 'فاموتیدین', 'ranitidine', 'رانیتیدین', 'معده', 'رفلاکس'],
  },
  {
    id: 'mtx-folate', agentFa: 'متوترکسات', agentEn: 'Methotrexate', kind: 'drug', vitamins: ['B9'], severity: 'major',
    effect: 'متوترکسات آنتاگونیست فولات است. در درمان‌های دوز پایین (آرتریت روماتوئید، پسوریازیس)، پزشک معمولاً اسید فولیک را برای کاهش عوارض تجویز می‌کند؛ در شیمی‌درمانی، مکمل خودسرانه ممکن است در درمان اختلال ایجاد کند.',
    mechanism: 'مهار دی‌هیدروفولات ردوکتاز.',
    management: 'دوز و زمان‌بندی اسید فولیک یا فولینیک اسید فقط طبق دستور پزشک معالج.',
    source: ods('Folate', 'فولات'), keywords: ['methotrexate', 'متوترکسات', 'روماتیسم', 'پسوریازیس'],
  },
  {
    id: 'phenytoin-folate', agentFa: 'فنی‌توئین', agentEn: 'Phenytoin', kind: 'drug', vitamins: ['B9', 'D', 'B7'], severity: 'major',
    effect: 'فنی‌توئین سطح فولات، ویتامین D و بیوتین را کاهش می‌دهد؛ از طرف دیگر مکمل اسید فولیک می‌تواند سطح سرمی فنی‌توئین را کم و کنترل تشنج را مختل کند.',
    mechanism: 'القای آنزیم‌های کبدی (کاتابولیسم ویتامین D) و اختلال جذب فولات؛ اثر دوطرفه با فولات.',
    management: 'مکمل‌یاری فقط با هماهنگی پزشک و پایش سطح دارو؛ ارزیابی دوره‌ای وضعیت ویتامین D و سلامت استخوان.',
    source: LPI_DRUG, keywords: ['phenytoin', 'فنی توئین', 'دیلانتین', 'صرع', 'تشنج'],
  },
  {
    id: 'aed-d', agentFa: 'سایر ضدتشنج‌های القاکننده آنزیم (کاربامازپین، فنوباربیتال، پریمیدون)', agentEn: 'Carbamazepine, phenobarbital, primidone', kind: 'drug', vitamins: ['D', 'B9', 'B7'], severity: 'moderate',
    effect: 'کاهش سطح ویتامین D، فولات و بیوتین؛ خطر استئومالاسی در مصرف طولانی.',
    mechanism: 'القای آنزیم‌های سیتوکروم P450.',
    management: 'پایش دوره‌ای ویتامین D و سلامت استخوان؛ مکمل‌یاری با نظر پزشک.',
    source: ods('VitaminD', 'ویتامین D'), keywords: ['carbamazepine', 'کاربامازپین', 'تگرتول', 'phenobarbital', 'فنوباربیتال', 'primidone', 'پریمیدون'],
  },
  {
    id: 'steroid-d', agentFa: 'گلوکوکورتیکوئیدها (پردنیزولون، دگزامتازون)', agentEn: 'Glucocorticoids', kind: 'drug', vitamins: ['D'], severity: 'moderate',
    effect: 'کاهش جذب کلسیم و اختلال متابولیسم ویتامین D؛ افزایش خطر پوکی استخوان.',
    mechanism: 'اثر مستقیم بر استخوان و روده.',
    management: 'در مصرف طولانی، ارزیابی کلسیم، ویتامین D و تراکم استخوان طبق راهنمای پزشک.',
    source: ods('VitaminD', 'ویتامین D'), keywords: ['prednisolone', 'پردنیزولون', 'prednisone', 'پردنیزون', 'dexamethasone', 'دگزامتازون', 'کورتون', 'کورتیکواستروئید'],
  },
  {
    id: 'orlistat-fat', agentFa: 'اورلیستات', agentEn: 'Orlistat', kind: 'drug', vitamins: ['A', 'D', 'E', 'K'], severity: 'moderate',
    effect: 'کاهش جذب ویتامین‌های محلول در چربی.',
    mechanism: 'مهار لیپاز روده و کاهش جذب چربی.',
    management: 'مولتی‌ویتامین حاوی A، D، E و K حداقل ۲ ساعت قبل یا بعد از اورلیستات (مثلاً هنگام خواب) مصرف شود.',
    source: ods('VitaminA', 'ویتامین A'), keywords: ['orlistat', 'اورلیستات', 'زنیکال', 'xenical', 'لاغری', 'کاهش وزن'],
  },
  {
    id: 'bas-fat', agentFa: 'رزین‌های متصل‌شونده به اسید صفراوی (کلستیرامین، کلستیپول)', agentEn: 'Bile acid sequestrants', kind: 'drug', vitamins: ['A', 'D', 'E', 'K', 'B9'], severity: 'moderate',
    effect: 'کاهش جذب ویتامین‌های محلول در چربی و فولات.',
    mechanism: 'اتصال به اسیدهای صفراوی و اختلال در تشکیل میسل.',
    management: 'مکمل‌ها حداقل ۱ ساعت قبل یا ۴ تا ۶ ساعت بعد از رزین مصرف شوند.',
    source: LPI_DRUG, keywords: ['cholestyramine', 'کلستیرامین', 'colestipol', 'کلستیپول'],
  },
  {
    id: 'isotretinoin-a', agentFa: 'رتینوئیدهای خوراکی (ایزوترتینوئین، آسیترتین)', agentEn: 'Isotretinoin, acitretin', kind: 'drug', vitamins: ['A'], severity: 'major',
    effect: 'مصرف هم‌زمان مکمل ویتامین A خطر سمیت ویتامین A را افزایش می‌دهد.',
    mechanism: 'هم‌افزایی رتینوئیدی.',
    management: 'از مکمل‌های حاوی رتینول پرهیز شود؛ بتاکاروتن غذایی مشکلی ندارد. این داروها در بارداری ممنوع‌اند.',
    source: ods('VitaminA', 'ویتامین A'), keywords: ['isotretinoin', 'ایزوترتینوئین', 'راکوتان', 'roaccutane', 'accutane', 'آکنه', 'acitretin', 'آسیترتین'],
  },
  {
    id: 'isoniazid-b6', agentFa: 'ایزونیازید', agentEn: 'Isoniazid', kind: 'drug', vitamins: ['B6', 'B3'], severity: 'moderate',
    effect: 'کاهش فعالیت B6 و خطر نوروپاتی محیطی؛ کاهش ساخت نیاسین از تریپتوفان.',
    mechanism: 'تشکیل ترکیب غیرفعال با پیریدوکسال.',
    management: 'پیریدوکسین پیشگیرانه معمولاً همراه درمان تجویز می‌شود (طبق پروتکل درمان سل).',
    source: ods('VitaminB6', 'ویتامین B6'), keywords: ['isoniazid', 'ایزونیازید', 'INH', 'سل'],
  },
  {
    id: 'levodopa-b6', agentFa: 'لوودوپا (بدون کاربیدوپا)', agentEn: 'Levodopa', kind: 'drug', vitamins: ['B6'], severity: 'moderate',
    effect: 'B6 با تسریع متابولیسم محیطی لوودوپا اثر آن را کم می‌کند. در ترکیب لوودوپا-کاربیدوپا این تداخل اهمیت کمتری دارد.',
    mechanism: 'افزایش فعالیت دکربوکسیلاز وابسته به PLP.',
    management: 'از مکمل B6 با دوز بالا بدون نظر پزشک خودداری شود.',
    source: ods('VitaminB6', 'ویتامین B6'), keywords: ['levodopa', 'لوودوپا', 'پارکینسون', 'sinemet', 'سینمت'],
  },
  {
    id: 'thiazide-d', agentFa: 'دیورتیک‌های تیازیدی (هیدروکلروتیازید)', agentEn: 'Thiazide diuretics', kind: 'drug', vitamins: ['D'], severity: 'moderate',
    effect: 'همراه با مکمل ویتامین D و کلسیم خطر هیپرکلسمی افزایش می‌یابد، به‌ویژه در سالمندان و افراد با هیپرپاراتیروئیدی.',
    mechanism: 'کاهش دفع ادراری کلسیم.',
    management: 'پایش کلسیم در مصرف هم‌زمان دوزهای بالا.',
    source: ods('VitaminD', 'ویتامین D'), keywords: ['hydrochlorothiazide', 'هیدروکلروتیازید', 'تیازید', 'فشار خون'],
  },
  {
    id: 'digoxin-d', agentFa: 'دیگوکسین', agentEn: 'Digoxin', kind: 'drug', vitamins: ['D'], severity: 'moderate',
    effect: 'هیپرکلسمی ناشی از دوز بالای ویتامین D خطر آریتمی را در مصرف‌کنندگان دیگوکسین افزایش می‌دهد.',
    mechanism: 'هیپرکلسمی سمیت گلیکوزیدهای قلبی را تشدید می‌کند.',
    management: 'از دوزهای بالای ویتامین D بدون پایش پزشکی خودداری شود.',
    source: ods('VitaminD', 'ویتامین D'), keywords: ['digoxin', 'دیگوکسین', 'لانوکسین', 'قلب'],
  },
  {
    id: 'statin-niacin', agentFa: 'استاتین‌ها (آتورواستاتین، سیمواستاتین، روزوواستاتین)', agentEn: 'Statins', kind: 'drug', vitamins: ['B3'], severity: 'moderate',
    effect: 'نیاسین با دوز دارویی همراه استاتین خطر میوپاتی و سمیت کبدی را افزایش می‌دهد و در کارآزمایی‌ها سود قلبی اضافه نداشت.',
    mechanism: 'هم‌افزایی عوارض عضلانی و کبدی.',
    management: 'مکمل نیاسین با دوز بالا فقط با نظر پزشک. نیکوتین‌آمید این اثر را ندارد.',
    source: ods('Niacin', 'نیاسین'), keywords: ['statin', 'استاتین', 'atorvastatin', 'آتورواستاتین', 'simvastatin', 'سیمواستاتین', 'rosuvastatin', 'روزوواستاتین', 'کلسترول', 'چربی خون'],
  },
  {
    id: 'chemo-antiox', agentFa: 'شیمی‌درمانی و پرتودرمانی', agentEn: 'Chemotherapy / radiotherapy', kind: 'drug', vitamins: ['C', 'E', 'A'], severity: 'moderate',
    effect: 'نگرانی نظری که مکمل‌های آنتی‌اکسیدان دوز بالا اثر درمان‌های مبتنی بر استرس اکسیداتیو را کاهش دهند.',
    mechanism: 'خنثی‌سازی گونه‌های فعال اکسیژن.',
    management: 'هر مکمل را پیش از شروع به تیم درمان سرطان اطلاع دهید.',
    source: ods('VitaminC', 'ویتامین C'), keywords: ['chemotherapy', 'شیمی درمانی', 'radiotherapy', 'پرتودرمانی', 'رادیوتراپی', 'سرطان'],
  },
  {
    id: 'loop-b1', agentFa: 'دیورتیک‌های لوپ (فوروزماید)', agentEn: 'Loop diuretics (furosemide)', kind: 'drug', vitamins: ['B1'], severity: 'minor',
    effect: 'افزایش دفع ادراری تیامین؛ اهمیت بیشتر در نارسایی قلبی و سالمندان.',
    mechanism: 'افزایش جریان ادرار.',
    management: 'در مصرف طولانی و دریافت غذایی کم، وضعیت تیامین ارزیابی شود.',
    source: ods('Thiamin', 'تیامین'), keywords: ['furosemide', 'فوروزماید', 'لازیکس', 'lasix', 'ادرارآور'],
  },
  {
    id: 'n2o-b12', agentFa: 'نیتروس‌اکسید (گاز خنده)', agentEn: 'Nitrous oxide', kind: 'drug', vitamins: ['B12'], severity: 'major',
    effect: 'غیرفعال‌سازی B12 و ایجاد آسیب عصبی حاد (دژنراسیون ترکیبی تحت‌حاد)، به‌ویژه در مصرف تفریحی یا افراد با ذخایر پایین.',
    mechanism: 'اکسیداسیون کبالت در متیل‌کوبالامین.',
    management: 'بی‌حسی یا اختلال راه رفتن پس از مواجهه نیاز به ارزیابی فوری پزشکی دارد.',
    source: ods('VitaminB12', 'ویتامین B12'), keywords: ['nitrous oxide', 'نیتروس اکسید', 'گاز خنده', 'بیهوشی'],
  },
  {
    id: 'smx-folate', agentFa: 'تری‌متوپریم و سولفاسالازین', agentEn: 'Trimethoprim, sulfasalazine', kind: 'drug', vitamins: ['B9'], severity: 'minor',
    effect: 'کاهش وضعیت فولات در مصرف طولانی.',
    mechanism: 'مهار دی‌هیدروفولات ردوکتاز (تری‌متوپریم) یا کاهش جذب (سولفاسالازین).',
    management: 'در مصرف طولانی یا بارداری، وضعیت فولات با پزشک بررسی شود.',
    source: ods('Folate', 'فولات'), keywords: ['trimethoprim', 'تری متوپریم', 'کوتریموکسازول', 'cotrimoxazole', 'sulfasalazine', 'سولفاسالازین'],
  },
  {
    id: 'antibiotic-k', agentFa: 'آنتی‌بیوتیک‌های وسیع‌الطیف (مصرف طولانی)', agentEn: 'Broad-spectrum antibiotics', kind: 'drug', vitamins: ['K'], severity: 'minor',
    effect: 'کاهش تولید باکتریایی مناکینون؛ برخی سفالوسپورین‌ها متابولیسم ویتامین K را مختل می‌کنند.',
    mechanism: 'تغییر میکروبیوتای روده.',
    management: 'معمولاً فقط در دریافت غذایی کم اهمیت بالینی دارد؛ در مصرف‌کنندگان وارفارین INR پایش شود.',
    source: ods('vitaminK', 'ویتامین K'), keywords: ['antibiotic', 'آنتی بیوتیک', 'cephalosporin', 'سفالوسپورین'],
  },
  {
    id: 'biotin-lab', agentFa: 'آزمایش‌های خون (تیروئید، تروپونین، هورمون‌ها)', agentEn: 'Laboratory immunoassays', kind: 'lab', vitamins: ['B7'], severity: 'major',
    effect: 'مکمل بیوتین با دوز بالا (مکمل‌های مو و ناخن) می‌تواند نتایج کاذب بالا یا پایین در ایمونواسی‌ها ایجاد کند؛ تروپونین کاذب پایین ممکن است تشخیص حمله قلبی را به تأخیر بیندازد.',
    mechanism: 'تداخل با سامانه سنجش استرپتاویدین-بیوتین.',
    management: 'مصرف بیوتین را به پزشک و آزمایشگاه اطلاع دهید؛ آزمایشگاه درباره فاصله توقف پیش از نمونه‌گیری راهنمایی می‌کند.',
    source: FDA_BIOTIN, keywords: ['آزمایش', 'تیروئید', 'TSH', 'تروپونین', 'troponin', 'lab', 'مو و ناخن'],
  },
  {
    id: 'vitc-glucose', agentFa: 'گلوکومترهای خانگی و برخی آزمایش‌ها', agentEn: 'Glucose meters', kind: 'lab', vitamins: ['C'], severity: 'minor',
    effect: 'ویتامین C با دوز بالا (به‌ویژه وریدی) می‌تواند قند خون اندازه‌گیری‌شده با برخی گلوکومترها را کاذب نشان دهد و نتیجه آزمایش خون مخفی مدفوع را منفی کاذب کند.',
    mechanism: 'تداخل احیاکنندگی در واکنش‌های آنزیمی.',
    management: 'در دیابت و پیش از آزمایش‌ها، مصرف دوز بالا را اطلاع دهید.',
    source: ods('VitaminC', 'ویتامین C'), keywords: ['گلوکومتر', 'قند خون', 'glucose', 'مدفوع'],
  },
  // —— تداخلات مغذی-مغذی
  {
    id: 'folate-b12-mask', agentFa: 'اسید فولیک با دوز بالا', agentEn: 'High-dose folic acid', kind: 'nutrient', vitamins: ['B12', 'B9'], severity: 'moderate',
    effect: 'اسید فولیک زیاد کم‌خونی ناشی از کمبود B12 را اصلاح و تشخیص را پنهان می‌کند، در حالی که آسیب عصبی پیشرفت می‌کند.',
    mechanism: 'دورزدن تله متیل‌فولات در خون‌سازی، نه در مسیر عصبی.',
    management: 'پیش از اسید فولیک دوز بالا، وضعیت B12 بررسی شود؛ به‌ویژه در سالمندان.',
    source: ods('Folate', 'فولات'), keywords: ['folic acid', 'اسید فولیک', 'فولات', 'b12'],
  },
  {
    id: 'vitc-iron', agentFa: 'آهن غیرهِم (منابع گیاهی و مکمل)', agentEn: 'Non-heme iron', kind: 'nutrient', vitamins: ['C'], severity: 'minor',
    effect: 'ویتامین C جذب آهن غیرهِم را افزایش می‌دهد — سودمند در کم‌خونی فقر آهن، نامطلوب در هموکروماتوز.',
    mechanism: 'احیای آهن سه‌ظرفیتی و تشکیل کمپلکس محلول.',
    management: 'در هموکروماتوز، مکمل ویتامین C همراه وعده غذایی با پزشک بررسی شود.',
    source: lpi('vitamin-C', 'ویتامین C'), keywords: ['iron', 'آهن', 'فروس', 'کم خونی', 'هموکروماتوز'],
  },
  {
    id: 'vite-k', agentFa: 'ویتامین E دوز بالا', agentEn: 'High-dose vitamin E', kind: 'nutrient', vitamins: ['K', 'E'], severity: 'minor',
    effect: 'ممکن است اثر ویتامین K را کاهش داده و خطر خونریزی را بالا ببرد.',
    mechanism: 'تداخل متابولیت‌های ویتامین E با کربوکسیلاسیون وابسته به ویتامین K.',
    management: 'در کمبود ویتامین K یا مصرف ضدانعقاد از دوز بالا پرهیز شود.',
    source: ods('VitaminE', 'ویتامین E'), keywords: ['vitamin e', 'ویتامین ای'],
  },
  {
    id: 'raw-egg-biotin', agentFa: 'سفیده تخم‌مرغ خام', agentEn: 'Raw egg white (avidin)', kind: 'nutrient', vitamins: ['B7'], severity: 'minor',
    effect: 'مصرف منظم و زیاد سفیده خام جذب بیوتین را مهار می‌کند.',
    mechanism: 'اتصال آویدین به بیوتین.',
    management: 'تخم‌مرغ پخته مشکلی ندارد.',
    source: ods('Biotin', 'بیوتین'), keywords: ['تخم مرغ خام', 'raw egg', 'آویدین'],
  },
  {
    id: 'alcohol-b', agentFa: 'مصرف زیاد الکل', agentEn: 'Heavy alcohol use', kind: 'condition', vitamins: ['B1', 'B9', 'B6', 'B3', 'A'], severity: 'major',
    effect: 'کاهش جذب و افزایش نیاز تیامین، فولات، B6 و نیاسین؛ افزایش سمیت کبدی ویتامین A.',
    mechanism: 'اختلال جذب روده‌ای، ذخیره کبدی و دریافت غذایی ناکافی.',
    management: 'ارزیابی پزشکی؛ تیامین در وابستگی به الکل جزء مراقبت استاندارد است.',
    source: ods('Thiamin', 'تیامین'), keywords: ['alcohol', 'الکل', 'مشروب'],
  },
];
