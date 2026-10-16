/**
 * داده‌های گزارش پژوهشی — بررسی سامانه‌ها در تاریخ ۲۴ مهر ۱۴۰۵ (16 Oct 2026).
 * status: verified = صفحه اصلی سامانه در این بررسی باز و قابلیت‌ها تأیید شد
 *         known = بر پایه شناخت پیشین تیم؛ پیش از استناد رسمی باید دوباره بررسی شود
 */
export type Status = 'verified' | 'known';
export type Kind = 'رسمی علمی' | 'ابزار محاسباتی' | 'آموزشی' | 'تجاری' | 'پایگاه داده';

export interface SystemEntry {
  name: string;
  url: string;
  org: string;
  kind: Kind;
  status: Status;
  audience: string;
  features: string;
  presentation: string;
  personalization: string;
  supplements: string;
  quality: string;
  cost: string;
  strengths: string;
  weaknesses: string;
  borrow: string;
}

export interface Category { id: number; title: string; systems: SystemEntry[] }

export const CATEGORIES: Category[] = [
  {
    id: 1, title: 'وب‌سایت‌های تخصصی ویتامین‌ها و مواد مغذی', systems: [
      { name: 'NIH ODS — Dietary Supplement Fact Sheets', url: 'https://ods.od.nih.gov/factsheets/list-all/', org: 'دفتر مکمل‌های غذایی، مؤسسه ملی سلامت آمریکا', kind: 'رسمی علمی', status: 'verified',
        audience: 'متخصصان سلامت و عموم (نسخه‌های جداگانه متخصص، عمومی و اسپانیایی)',
        features: 'برگه جامع برای هر ویتامین A، B1 تا B12، C، D، E و K؛ لینک به پایگاه برچسب مکمل‌ها (DSLD)',
        presentation: 'جداول RDA/AI و UL، جدول منابع غذایی با درصد DV، بخش‌های کمبود، سمیت، گروه‌های پرخطر و تداخلات دارویی',
        personalization: 'ندارد', supplements: 'بخش تداخل با داروها در هر برگه؛ پوشش خوب', quality: 'بسیار بالا؛ با ارجاع کامل و تاریخ بازبینی', cost: 'رایگان',
        strengths: 'معتبرترین مرجع خلاصه؛ ساختار یکسان برای همه ویتامین‌ها', weaknesses: 'متمرکز بر آمریکا؛ بدون ابزار محاسبه؛ بدون فارسی', borrow: 'ساختار ثابت پرونده هر ویتامین و جدول منابع غذایی بر اساس واحد مصرف' },
      { name: 'Linus Pauling Institute — Micronutrient Information Center', url: 'https://lpi.oregonstate.edu/mic', org: 'مؤسسه لینوس پاولینگ، دانشگاه ایالتی اورگان', kind: 'رسمی علمی', status: 'verified',
        audience: 'عموم و متخصصان (دوره‌های آموزش مداوم)',
        features: 'مقالات ویتامین‌ها و مواد معدنی، نمایه بیماری‌ها، تداخلات دارو و مغذی، دوره‌های زندگی؛ ترجمه اسپانیایی و ژاپنی',
        presentation: 'مرور عمیق شواهد با بحث درباره کارآزمایی‌ها؛ بخش توصیه‌های خود مؤسسه',
        personalization: 'ندارد', supplements: 'صفحه مستقل تداخلات دارو و مغذی', quality: 'بالا؛ صفحه اصلی در مهر ۱۴۰۵ به‌روز شده است', cost: 'رایگان',
        strengths: 'عمق علمی و بحث شواهد', weaknesses: 'توصیه‌های مؤسسه گاهی از DRI بالاترند و باید جدا نمایش داده شوند؛ بدون ابزار', borrow: 'تفکیک «شواهد» از «توصیه»؛ نمایه بیماری‌ها' },
      { name: 'MedlinePlus — Vitamins', url: 'https://medlineplus.gov/vitamins.html', org: 'کتابخانه ملی پزشکی آمریکا', kind: 'آموزشی', status: 'known',
        audience: 'عموم', features: 'صفحات ساده آموزشی و دانشنامه داروها و مکمل‌ها', presentation: 'متن ساده با لینک به منابع', personalization: 'ندارد',
        supplements: 'تک‌نگاره‌های مکمل‌ها و گیاهان', quality: 'بالا', cost: 'رایگان؛ وب‌سرویس MedlinePlus Connect', strengths: 'زبان ساده و قابل اعتماد', weaknesses: 'عمق کم برای متخصص', borrow: 'لایه توضیح ساده برای عموم' },
      { name: 'NHS — Vitamins and minerals', url: 'https://www.nhs.uk/conditions/vitamins-and-minerals/', org: 'سرویس سلامت ملی بریتانیا', kind: 'آموزشی', status: 'known',
        audience: 'عموم', features: 'برای هر ویتامین: نقش، منابع، مقدار لازم و پیامد دریافت بیش از حد', presentation: 'بسیار خلاصه و عملی', personalization: 'ندارد',
        supplements: 'توصیه‌های جمعیتی بریتانیا (مثلاً ویتامین D در پاییز و زمستان)', quality: 'بالا', cost: 'رایگان', strengths: 'پیام‌های ساده و قابل اجرا', weaknesses: 'بدون جزئیات علمی و مقادیر برای همه گروه‌ها', borrow: 'الگوی «چقدر لازم است و اگر زیاد مصرف کنم چه می‌شود»' },
    ],
  },
  {
    id: 2, title: 'پایگاه‌های اطلاعاتی دانشگاهی، پزشکی و علمی', systems: [
      { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/', org: 'NCBI / NLM', kind: 'پایگاه داده', status: 'known', audience: 'پژوهشگران و متخصصان',
        features: 'نمایه مقالات زیست‌پزشکی؛ فیلتر مرور نظام‌مند و کارآزمایی', presentation: 'چکیده و فراداده', personalization: '—', supplements: '—',
        quality: 'به کیفیت هر مقاله بستگی دارد', cost: 'رایگان؛ API رایگان E-utilities', strengths: 'پوشش جامع', weaknesses: 'نیاز به ارزیابی نقادانه', borrow: 'اتصال هر ادعا به PMID' },
      { name: 'Cochrane Library', url: 'https://www.cochranelibrary.com/', org: 'Cochrane', kind: 'رسمی علمی', status: 'known', audience: 'متخصصان',
        features: 'مرورهای نظام‌مند (مثلاً ویتامین C و سرماخوردگی، ویتامین A در کودکان)', presentation: 'نتایج با سطح اطمینان GRADE', personalization: '—', supplements: '—',
        quality: 'بسیار بالا', cost: 'چکیده‌ها رایگان؛ متن کامل در برخی کشورها پولی', strengths: 'استاندارد طلایی سنتز شواهد', weaknesses: 'همه موضوعات پوشش داده نشده‌اند', borrow: 'مدل درجه‌بندی شواهد' },
      { name: 'EFSA — Dietary Reference Values (نظرات علمی NDA)', url: 'https://www.efsa.europa.eu/en/topics/topic/dietary-reference-values', org: 'سازمان ایمنی غذای اروپا', kind: 'رسمی علمی', status: 'known', audience: 'متخصصان و سیاست‌گذاران',
        features: 'نظرات علمی مقادیر مرجع و حدهای بالا (از جمله UL جدید B6 در ۲۰۲۳)', presentation: 'گزارش‌های کامل در EFSA Journal', personalization: '—', supplements: 'ارزیابی ایمنی',
        quality: 'بسیار بالا', cost: 'رایگان و دسترسی آزاد', strengths: 'به‌روزتر از DRI آمریکا در برخی ویتامین‌ها', weaknesses: 'گزارش‌های فنی و طولانی', borrow: 'استاندارد دوم کنار NASEM' },
      { name: 'National Academies — Dietary Reference Intakes', url: 'https://nap.nationalacademies.org/catalog/9956', org: 'آکادمی‌های ملی علوم، مهندسی و پزشکی آمریکا', kind: 'رسمی علمی', status: 'known', audience: 'متخصصان',
        features: 'گزارش‌های مرجع DRI و راهنمای کاربرد آن در ارزیابی رژیم غذایی', presentation: 'کتاب‌های کامل؛ مطالعه آنلاین رایگان', personalization: '—', supplements: '—',
        quality: 'مرجع اصلی', cost: 'مطالعه رایگان', strengths: 'روش‌شناسی ارزیابی احتمال کفایت', weaknesses: 'برخی گزارش‌ها مربوط به ۱۹۹۷ تا ۲۰۰۱ هستند', borrow: 'روش z-score برای ارزیابی کفایت فردی' },
      { name: 'WHO — eLENA و VMNIS', url: 'https://www.who.int/tools/elena', org: 'سازمان جهانی بهداشت', kind: 'رسمی علمی', status: 'known', audience: 'سیاست‌گذاران و متخصصان',
        features: 'راهنماهای مداخلات تغذیه‌ای و آستانه‌های جمعیتی شاخص‌های ریزمغذی', presentation: 'راهنما و شواهد', personalization: '—', supplements: 'برنامه‌های مکمل‌یاری جمعیتی',
        quality: 'بالا', cost: 'رایگان', strengths: 'آستانه‌های بین‌المللی رتینول و فولات', weaknesses: 'سطح جمعیتی، نه فردی', borrow: 'آستانه‌های آزمایشگاهی با برچسب «جمعیتی»' },
    ],
  },
  {
    id: 3, title: 'سامانه‌های محاسبه نیاز روزانه و مقادیر مرجع', systems: [
      { name: 'USDA DRI Calculator for Healthcare Professionals', url: 'https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator', org: 'کتابخانه ملی کشاورزی آمریکا', kind: 'ابزار محاسباتی', status: 'verified',
        audience: 'متخصصان سلامت', features: 'ورودی: واحد، جنس، سن، بارداری یا شیردهی، قد، وزن، سطح فعالیت؛ خروجی: BMI، انرژی، درشت‌مغذی‌ها، آب، ویتامین‌ها و مواد معدنی',
        presentation: 'گزارش مقادیر DRI برای گروه فرد', personalization: 'بر اساس گروه سنی و فیزیولوژیک', supplements: 'ندارد',
        quality: 'بالا؛ تاریخ به‌روزرسانی در صفحه درج نشده', cost: 'رایگان', strengths: 'ساده و رسمی', weaknesses: 'دریافت واقعی را نمی‌سنجد؛ بدون مقایسه با UL', borrow: 'فرم ورودی حداقلی' },
      { name: 'EFSA DRV Finder', url: 'https://multimedia.efsa.europa.eu/drvs/index.htm', org: 'سازمان ایمنی غذای اروپا', kind: 'ابزار محاسباتی', status: 'verified',
        audience: 'متخصصان تغذیه و سلامت', features: 'جست‌وجو بر اساس گروه جمعیتی یا ماده مغذی؛ ۱۴ ویتامین و ۱۳ ماده معدنی از ۳۲ نظر علمی EFSA',
        presentation: 'PRI، AR، AI، LTI و RI؛ به‌روزرسانی دسامبر ۲۰۲۵ برای UL فلوراید', personalization: 'بر اساس گروه جمعیتی', supplements: 'ندارد',
        quality: 'بسیار بالا', cost: 'رایگان', strengths: 'منبع رسمی اروپا', weaknesses: 'بدون محاسبه دریافت؛ رابط کاربری قدیمی', borrow: 'نمایش هم‌زمان چند نوع مقدار مرجع' },
      { name: 'Health Canada — DRI tables', url: 'https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html', org: 'وزارت سلامت کانادا', kind: 'رسمی علمی', status: 'known',
        audience: 'متخصصان', features: 'جداول DRI مشترک آمریکا و کانادا', presentation: 'جداول', personalization: 'ندارد', supplements: '—', quality: 'بالا', cost: 'رایگان', strengths: 'جداول خوانا', weaknesses: 'ایستا', borrow: '—' },
    ],
  },
  {
    id: 4, title: 'ابزارهای ارزیابی وضعیت تغذیه‌ای و دریافت', systems: [
      { name: 'ASA24', url: 'https://epi.grants.cancer.gov/asa24/', org: 'مؤسسه ملی سرطان آمریکا', kind: 'ابزار محاسباتی', status: 'known', audience: 'پژوهشگران',
        features: 'یادآمد ۲۴ ساعته خودگزارش و ثبت غذایی با خروجی مواد مغذی', presentation: 'فایل‌های داده برای تحلیل', personalization: 'ندارد', supplements: 'ثبت مکمل‌ها',
        quality: 'بالا؛ روش‌شناسی معتبر', cost: 'رایگان برای پژوهش', strengths: 'روش استاندارد ثبت دریافت', weaknesses: 'برای پژوهش طراحی شده؛ بازخورد کاربر محدود', borrow: 'مراحل یادآمد چندگذره' },
      { name: 'Intake24', url: 'https://intake24.org/', org: 'دانشگاه نیوکاسل (بریتانیا) — متن‌باز', kind: 'ابزار محاسباتی', status: 'known', audience: 'پژوهشگران و برنامه‌های ملی',
        features: 'یادآمد ۲۴ ساعته با تصویر اندازه سهم؛ چندزبانه و قابل بومی‌سازی', presentation: 'داده برای پژوهشگر', personalization: 'ندارد', supplements: 'محدود',
        quality: 'بالا', cost: 'متن‌باز', strengths: 'تصاویر اندازه سهم و قابلیت بومی‌سازی', weaknesses: 'نیاز به بانک غذای محلی', borrow: 'تصاویر اندازه سهم برای غذاهای ایرانی' },
    ],
  },
  {
    id: 5, title: 'سامانه‌های مکمل‌ها، دوز، ایمنی و تداخلات', systems: [
      { name: 'Dietary Supplement Label Database (DSLD)', url: 'https://dsld.od.nih.gov/', org: 'NIH ODS', kind: 'پایگاه داده', status: 'known', audience: 'پژوهشگران و متخصصان',
        features: 'برچسب کامل مکمل‌های بازار آمریکا با API', presentation: 'ترکیبات و مقادیر برچسب', personalization: '—', supplements: 'هسته اصلی', quality: 'داده برچسب (نه آزمون آزمایشگاهی)', cost: 'رایگان',
        strengths: 'ساختار داده‌ای قابل استفاده', weaknesses: 'محصولات ایرانی را پوشش نمی‌دهد', borrow: 'مدل داده محصول، ماده مؤثره، شکل شیمیایی و واحد' },
      { name: 'Natural Medicines (TRC)', url: 'https://naturalmedicines.therapeuticresearch.com/', org: 'Therapeutic Research Center', kind: 'تجاری', status: 'known', audience: 'متخصصان',
        features: 'تک‌نگاره‌های مکمل، درجه‌بندی اثربخشی و ایمنی، بررسی تداخل', presentation: 'درجه‌بندی شواهد', personalization: 'ندارد', supplements: 'جامع',
        quality: 'بالا', cost: 'اشتراکی', strengths: 'درجه‌بندی شواهد و تداخلات', weaknesses: 'پولی و انگلیسی', borrow: 'برچسب سطح شواهد برای هر ادعا' },
      { name: 'Drugs.com Interaction Checker', url: 'https://www.drugs.com/drug_interactions.html', org: 'Drugs.com', kind: 'تجاری', status: 'known', audience: 'عموم و متخصصان',
        features: 'بررسی تداخل چند دارو و برخی مکمل‌ها', presentation: 'سطح اهمیت و توضیح', personalization: 'فهرست داروهای فرد', supplements: 'پوشش جزئی مکمل‌ها',
        quality: 'متوسط تا بالا', cost: 'رایگان با تبلیغات', strengths: 'تجربه کاربری ساده', weaknesses: 'تمرکز بر دارو؛ منبع هر مورد کمتر شفاف', borrow: 'جست‌وجو با نام تجاری و ژنریک' },
    ],
  },
  {
    id: 6, title: 'پایگاه‌های ترکیبات غذایی', systems: [
      { name: 'USDA FoodData Central', url: 'https://fdc.nal.usda.gov/', org: 'وزارت کشاورزی آمریکا (ARS)', kind: 'پایگاه داده', status: 'verified', audience: 'پژوهشگران، توسعه‌دهندگان و متخصصان',
        features: 'Foundation Foods، SR Legacy، FNDDS و Branded Foods؛ API با OpenAPI', presentation: 'مقادیر در ۱۰۰ گرم و واحدهای مصرف', personalization: '—', supplements: '—',
        quality: 'بالا', cost: 'رایگان؛ کلید data.gov؛ ۱۰۰۰ درخواست در ساعت؛ مجوز CC0 با درخواست ذکر منبع', strengths: 'API آزاد و مجوز باز', weaknesses: 'غذاهای آمریکایی؛ غنی‌سازی متفاوت با ایران', borrow: 'منبع اولیه داده و اسکریپت واردسازی' },
      { name: 'CoFID — McCance and Widdowson', url: 'https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid', org: 'دولت بریتانیا', kind: 'پایگاه داده', status: 'known', audience: 'متخصصان',
        features: 'جدول ترکیبات مواد غذایی بریتانیا', presentation: 'فایل اکسل', personalization: '—', supplements: '—', quality: 'بالا', cost: 'رایگان', strengths: 'داده اروپایی', weaknesses: 'بدون API', borrow: 'مقایسه داده‌های اروپایی' },
      { name: 'ANSES Ciqual', url: 'https://ciqual.anses.fr/', org: 'آژانس ایمنی غذای فرانسه', kind: 'پایگاه داده', status: 'known', audience: 'متخصصان و عموم',
        features: 'ترکیبات غذاهای فرانسه با کد کیفیت داده', presentation: 'وب و داده باز', personalization: '—', supplements: '—', quality: 'بالا', cost: 'داده باز', strengths: 'کد اطمینان برای هر مقدار', weaknesses: 'غذاهای فرانسوی', borrow: 'نمایش کیفیت داده هر مقدار' },
      { name: 'FAO/INFOODS', url: 'https://www.fao.org/infoods/infoods/en/', org: 'سازمان خواربار و کشاورزی ملل متحد', kind: 'پایگاه داده', status: 'known', audience: 'متخصصان',
        features: 'شبکه جهانی جداول ترکیبات و استانداردهای تبادل داده', presentation: 'فهرست جداول و راهنماها', personalization: '—', supplements: '—', quality: 'بالا', cost: 'رایگان', strengths: 'استانداردهای نام‌گذاری مواد مغذی (Tagnames)', weaknesses: 'داده یکپارچه ندارد', borrow: 'کدگذاری استاندارد مواد مغذی' },
      { name: 'جدول ترکیبات مواد غذایی ایران', url: 'https://nnftri.ac.ir/', org: 'انستیتو تحقیقات تغذیه‌ای و صنایع غذایی کشور', kind: 'پایگاه داده', status: 'known', audience: 'متخصصان و پژوهشگران',
        features: 'ترکیب غذاهای ایرانی', presentation: 'عمدتاً چاپی یا فایل', personalization: '—', supplements: '—', quality: 'متوسط تا بالا؛ برخی داده‌ها قدیمی', cost: 'نیازمند مجوز',
        strengths: 'تنها منبع جامع غذاهای ایرانی', weaknesses: 'نبود دسترسی دیجیتال و API در این بررسی', borrow: 'مهم‌ترین منبع برای نسخه بومی' },
    ],
  },
  {
    id: 7, title: 'سامانه‌های تغذیه شخصی‌سازی‌شده', systems: [
      { name: 'Cronometer', url: 'https://cronometer.com/', org: 'Cronometer Software (کانادا)', kind: 'تجاری', status: 'known', audience: 'عموم و نسخه حرفه‌ای برای متخصصان',
        features: 'ثبت روزانه غذا و مکمل با گزارش ده‌ها ریزمغذی و هدف‌های DRI', presentation: 'نوار پیشرفت درصد هدف', personalization: 'هدف‌ها بر اساس سن، جنس و تنظیمات کاربر', supplements: 'ثبت مکمل؛ تحلیل تداخل ندارد',
        quality: 'داده غذایی با منبع مشخص', cost: 'رایگان پایه، اشتراک Gold و نسخه Pro', strengths: 'بهترین ردیاب ریزمغذی عمومی', weaknesses: 'درصد RDA را بدون احتمال کفایت و بدون دامنه صحیح UL نشان می‌دهد؛ بدون فارسی', borrow: 'تجربه ثبت سریع غذا' },
      { name: 'Nutritics', url: 'https://www.nutritics.com/', org: 'Nutritics (ایرلند)', kind: 'تجاری', status: 'known', audience: 'متخصصان تغذیه و صنایع غذایی',
        features: 'تحلیل رژیم، برنامه‌ریزی وعده، پرونده مراجع، چند بانک ملی ترکیبات', presentation: 'گزارش حرفه‌ای', personalization: 'کامل', supplements: 'محدود', quality: 'بالا', cost: 'اشتراکی',
        strengths: 'گردش کار حرفه‌ای و چند استاندارد', weaknesses: 'پولی، بدون فارسی', borrow: 'پرونده مراجع و گزارش قابل چاپ' },
      { name: 'Nutrium', url: 'https://nutrium.com/', org: 'Nutrium (پرتغال)', kind: 'تجاری', status: 'known', audience: 'متخصصان تغذیه',
        features: 'مدیریت مراجع، برنامه غذایی، اپ مراجع', presentation: 'داشبورد', personalization: 'کامل', supplements: 'محدود', quality: 'متوسط تا بالا', cost: 'اشتراکی',
        strengths: 'تجربه کاربری مدرن', weaknesses: 'تمرکز بر برنامه‌ریزی، نه شواهد ریزمغذی', borrow: 'مسیر کار کارشناس' },
    ],
  },
  {
    id: 8, title: 'منابع و ابزارهای فارسی', systems: [
      { name: 'دستورالعمل‌های کشوری مکمل‌یاری (دفتر بهبود تغذیه جامعه)', url: 'https://health.fums.ac.ir/', org: 'وزارت بهداشت؛ منتشرشده در سایت دانشگاه‌های علوم پزشکی', kind: 'رسمی علمی', status: 'verified',
        audience: 'کارکنان بهداشت', features: 'برای نمونه دستورالعمل مکمل‌یاری با مگادوز ویتامین D در جوانان (فایل PDF در سایت‌های علوم پزشکی فسا و لرستان)', presentation: 'PDF', personalization: 'ندارد', supplements: 'برنامه‌های جمعیتی',
        quality: 'رسمی', cost: 'رایگان', strengths: 'مبنای برنامه‌های ملی', weaknesses: 'پراکنده، بدون نسخه ساختاریافته', borrow: 'نمایش برنامه‌های کشوری کنار مقادیر بین‌المللی' },
      { name: 'سازمان غذا و دارو', url: 'https://fda.gov.ir/', org: 'وزارت بهداشت', kind: 'رسمی علمی', status: 'known', audience: 'عموم و صنعت', features: 'استعلام و مقررات فرآورده‌ها و مکمل‌ها', presentation: 'وب', personalization: '—',
        supplements: 'ثبت فرآورده', quality: 'رسمی', cost: 'رایگان', strengths: 'مرجع قانونی', weaknesses: 'محتوای علمی تغذیه‌ای ندارد', borrow: 'ارتباط با کد فرآورده‌های ثبت‌شده در آینده' },
      { name: 'مجلات سلامت و فروشگاه‌های آنلاین فارسی', url: 'https://www.digikala.com/mag/how-to-increase-vitamin-absorption/', org: 'رسانه‌ها و فروشگاه‌ها (نمونه: دیجی‌کالا مگ، خبرگزاری‌ها)', kind: 'تجاری', status: 'verified',
        audience: 'عموم', features: 'مقالات عمومی درباره ویتامین‌ها و مصرف مکمل', presentation: 'متن آزاد، معمولاً بدون جدول مقادیر مرجع', personalization: 'ندارد', supplements: 'اغلب با هدف فروش',
        quality: 'متغیر؛ ارجاع علمی کم', cost: 'رایگان', strengths: 'دسترسی و زبان فارسی', weaknesses: 'نبود منبع، تاریخ بازبینی و ابزار', borrow: 'نیاز کاربر فارسی‌زبان به پاسخ‌های عملی' },
    ],
  },
];

export const FEATURES = [
  'مقادیر مرجع همه گروه‌های سنی', 'مقایسه آمریکا و اروپا', 'منابع غذایی کمّی', 'محاسبه دریافت از غذا و مکمل', 'بررسی UL با دامنه صحیح',
  'تداخلات دارویی', 'سطح شواهد', 'احتمال کفایت و عدم قطعیت', 'پنل متخصص', 'زبان فارسی', 'رایگان',
];

/** ۲ = کامل، ۱ = جزئی، ۰ = ندارد */
export const MATRIX: { name: string; verified: boolean; v: number[] }[] = [
  { name: 'NIH ODS', verified: true, v: [2, 0, 1, 0, 1, 2, 1, 0, 0, 0, 2] },
  { name: 'LPI MIC', verified: true, v: [2, 1, 1, 0, 1, 2, 2, 0, 0, 0, 2] },
  { name: 'EFSA DRV Finder', verified: true, v: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2] },
  { name: 'USDA DRI Calculator', verified: true, v: [2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2] },
  { name: 'FoodData Central', verified: true, v: [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2] },
  { name: 'Cronometer', verified: false, v: [2, 0, 2, 2, 1, 0, 0, 0, 1, 0, 1] },
  { name: 'Natural Medicines', verified: false, v: [1, 0, 0, 0, 1, 2, 2, 0, 2, 0, 0] },
  { name: 'منابع فارسی موجود', verified: true, v: [1, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2] },
  { name: 'ویتامین‌نامه (نسخه فعلی)', verified: true, v: [2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2] },
];

export const INNOVATIONS = [
  { name: 'یکپارچه‌سازی دریافت از غذا، غذای غنی‌شده و مکمل', value: 'تصویر واقعی دریافت کل؛ پیش‌نیاز هر ارزیابی ایمنی', adv: 'منابع رسمی ابزار ندارند و ردیاب‌های تجاری مکمل را ساده‌انگارانه جمع می‌زنند', cx: 'متوسط', pr: 'بسیار بالا', st: 'پیاده‌سازی شد' },
  { name: 'مقایسه با مقادیر مرجع گروه هدف', value: 'جلوگیری از توصیه‌های عمومی و فرمول‌های وزنی نادرست', adv: '۲۲ گروه سنی و فیزیولوژیک و افزایش نیاز ویتامین C در سیگاری‌ها', cx: 'کم', pr: 'بسیار بالا', st: 'پیاده‌سازی شد' },
  { name: 'خطر دریافت بیش از حد از چند منبع با دامنه صحیح UL', value: 'شناسایی خطرهای واقعی (B6، ویتامین A از پیش ساخته، پرل‌های D)', adv: 'تفکیک رتینول از بتاکاروتن و اسید فولیک از فولات غذایی', cx: 'متوسط', pr: 'بسیار بالا', st: 'پیاده‌سازی شد' },
  { name: 'احتمال کفایت به‌جای «درصد RDA»', value: 'تفسیر علمی مطابق راهنمای IOM و نمایش عدم قطعیت', adv: 'در ابزارهای عمومی بررسی‌شده دیده نشد', cx: 'متوسط', pr: 'بالا', st: 'پیاده‌سازی شد' },
  { name: 'بررسی تداخلات دارویی و آزمایشگاهی', value: 'ایمنی مصرف‌کنندگان دارو؛ تداخل بیوتین با آزمایش‌ها', adv: 'به زبان فارسی و با اقدام عملی و منبع', cx: 'متوسط (نگهداری داده)', pr: 'بالا', st: 'بخشی (۲۸ مورد)' },
  { name: 'مقایسه استانداردهای آمریکا و اروپا', value: 'شفافیت درباره اختلاف‌های علمی', adv: 'هیچ ابزار رایگانی هر دو را کنار هم ندارد', cx: 'کم', pr: 'متوسط', st: 'پیاده‌سازی شد (بزرگسالان)' },
  { name: 'توضیح لایه‌ای هر نتیجه با استناد', value: 'اعتماد و یادگیری کاربر', adv: 'روش محاسبه و منبع کنار هر عدد', cx: 'کم', pr: 'بالا', st: 'پیاده‌سازی شد' },
  { name: 'پنل کارشناس با رضایت آگاهانه و بازبینی علمی', value: 'کاربرد حرفه‌ای و کنترل کیفیت محتوا', adv: 'گردش کار تأیید محتوا که در منابع عمومی دیده نمی‌شود', cx: 'بالا (بک‌اند امن)', pr: 'بالا', st: 'بخشی (ذخیره محلی)' },
  { name: 'بانک غذاهای ایرانی و غذاهای مرکب', value: 'دقت محاسبه برای کاربر ایرانی', adv: 'بزرگ‌ترین شکاف بازار فارسی', cx: 'بالا (داده و مجوز)', pr: 'بسیار بالا', st: 'آینده' },
  { name: 'رابط دوزبانه فارسی و انگلیسی (RTL و LTR)', value: 'استفاده متخصصان و انتشار بین‌المللی', adv: 'رابط فارسی بومی با اعداد فارسی', cx: 'متوسط', pr: 'متوسط', st: 'فارسی کامل؛ انگلیسی آینده' },
  { name: 'دستیار پرسش و پاسخ مبتنی بر منابع (RAG)', value: 'پاسخ به پرسش‌های آزاد با استناد', adv: 'محدود به پیکره بازبینی‌شده؛ بدون تولید عدد', cx: 'بالا', pr: 'متوسط (پس از اعتبارسنجی)', st: 'آینده' },
];

export const ROADMAP = [
  { phase: 'تحقیق بازار و تعریف نیازمندی‌ها', out: 'گزارش سامانه‌ها، شکاف‌ها و نیازمندی‌ها (همین گزارش)', must: 'فهرست کاربران، سناریوها، معیارهای ایمنی', pre: '—', risk: 'تغییر سریع ابزارهای تجاری', kpi: 'تأیید نیازمندی‌ها توسط ۳ تا ۵ کارشناس تغذیه', pri: 'P0', st: 'انجام شد' },
  { phase: 'مدل داده و ساختار علمی', out: 'نوع‌داده‌ها، جداول DRI، ۱۳ پرونده، تداخلات، آزمون‌های یکپارچگی', must: 'منبع و تاریخ برای هر عدد', pre: 'فاز ۱', risk: 'خطای ورود داده', kpi: 'صفر خطا در آزمون‌های ثابت (EAR ≤ RDA < UL)', pri: 'P0', st: 'انجام شد' },
  { phase: 'طراحی تجربه کاربری و نمونه اولیه', out: 'سیستم طراحی، خط‌کش دریافت، صفحات اصلی', must: 'راست‌چین، واکنش‌گرا، دسترس‌پذیر', pre: 'فاز ۲', risk: 'پیچیدگی برای عموم', kpi: 'آزمون کاربردپذیری با ۵ کاربر عمومی و ۵ متخصص', pri: 'P0', st: 'انجام شد؛ آزمون کاربر باقی است' },
  { phase: 'نسخه اولیه قابل استفاده (MVP)', out: 'وب‌اپ ایستا روی Vercel', must: 'دانشنامه، جست‌وجو، ابزارها', pre: 'فاز ۳', risk: 'محدودیت دسترسی از داخل ایران به میزبان خارجی', kpi: 'Lighthouse بالای ۹۰، زمان بارگذاری زیر ۲ ثانیه', pri: 'P0', st: 'انجام شد' },
  { phase: 'ماشین‌حساب‌ها و قواعد ایمنی', out: 'موتور محاسبه، UL، احتمال کفایت، غربالگری و ارجاع', must: 'آزمون واحد، علائم هشدار', pre: 'فاز ۲', risk: 'تفسیر نادرست نتایج توسط کاربر', kpi: 'تأیید موارد آزمون توسط متخصص؛ پوشش آزمون موتور', pri: 'P0', st: 'انجام شد؛ اعتبارسنجی بالینی باقی است' },
  { phase: 'منابع علمی، جست‌وجوی پیشرفته و امکانات تخصصی', out: 'بک‌اند، احراز هویت، پرونده رمزنگاری‌شده، بانک غذای ایرانی', must: 'RLS، ثبت رضایت، لاگ دسترسی', pre: 'فاز ۴', risk: 'حریم خصوصی و هزینه نگهداری', kpi: 'آزمون نفوذ بدون آسیب‌پذیری بحرانی', pri: 'P1', st: 'آینده' },
  { phase: 'قابلیت‌های هوش مصنوعی پس از اعتبارسنجی', out: 'جست‌وجوی معنایی و دستیار RAG با استناد', must: 'مجموعه ارزیابی، محدودسازی پاسخ', pre: 'فاز ۶ و پیکره بازبینی‌شده', risk: 'توهم و پاسخ نادرست', kpi: 'بیش از ۹۵٪ پاسخ‌ها با استناد صحیح در مجموعه آزمون', pri: 'P2', st: 'آینده' },
  { phase: 'آزمایش علمی، امنیتی، فنی و کاربردپذیری', out: 'گزارش بازبینی متخصصان، آزمون نفوذ، آزمون دسترس‌پذیری', must: 'پنل بازبینی تکمیل‌شده', pre: 'فازهای ۴ تا ۶', risk: 'کمبود وقت متخصصان', kpi: '۱۰۰٪ بخش‌ها تأییدشده پیش از انتشار عمومی', pri: 'P0', st: 'آغاز شده (آزمون‌های واحد)' },
  { phase: 'انتشار، پایش و به‌روزرسانی مستمر', out: 'انتشار عمومی، پایش منابع، بازبینی دوره‌ای', must: 'تقویم بازبینی فصلی، ثبت تغییرات', pre: 'فاز ۸', risk: 'کهنه شدن داده', kpi: 'هیچ پرونده‌ای قدیمی‌تر از ۱۲ ماه بدون بازبینی', pri: 'P1', st: 'آینده' },
];
