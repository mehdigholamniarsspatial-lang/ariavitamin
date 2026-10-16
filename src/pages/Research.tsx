import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, FEATURES, INNOVATIONS, MATRIX, ROADMAP } from '../data/research';
import { PageHead, Tone } from '../components/ui';
import { useTitle } from '../lib';

const TOC = [
  'خلاصه مدیریتی', 'فهرست دسته‌بندی‌شده منابع', 'جدول مقایسه قابلیت‌ها', 'شکاف‌ها و فرصت‌های نوآوری', 'ساختار علمی و محتوایی',
  'موتور شخصی‌سازی و ماژول ایمنی', 'معماری رابط کاربری', 'معماری فنی و مدل داده', 'راهبرد منابع علمی و کنترل کیفیت',
  'هوش مصنوعی و محدودیت‌ها', 'نقشه راه اجرایی', 'پیشنهاد نهایی',
];

const Mark = ({ v }: { v: number }) => v === 2 ? <span className="yes" aria-label="کامل">●</span> : v === 1 ? <span className="part" aria-label="جزئی">◐</span> : <span className="no" aria-label="ندارد">○</span>;
const StatusTag = ({ s }: { s: 'verified' | 'known' }) => s === 'verified'
  ? <span className="status-tag tone-good">تأییدشده در این بررسی</span>
  : <span className="status-tag tone-neutral">برداشت از شناخت پیشین</span>;

export default function Research() {
  useTitle('گزارش پژوهشی و طرح توسعه');
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="گزارش پژوهشی و طرح توسعه پلتفرم ویتامین‌نامه" crumbs={[{ to: '/research', label: 'گزارش پژوهشی' }]}
        lede="بررسی سامانه‌های مشابه، تحلیل شکاف‌ها و طرح علمی، فنی و اجرایی پلتفرم. تاریخ بررسی منابع: ۲۴ مهر ۱۴۰۵ (۱۶ اکتبر ۲۰۲۶)." />
      <div className="wrap report">
        <div className="row" style={{ gap: 8, marginBottom: 16 }}>
          <span className="status-tag tone-good">تأییدشده در این بررسی</span><span className="small muted">صفحه یا سند سامانه در تاریخ بررسی باز و قابلیت بررسی شد.</span>
        </div>
        <div className="row" style={{ gap: 8, marginBottom: 16 }}>
          <span className="status-tag tone-neutral">برداشت از شناخت پیشین</span><span className="small muted">بر پایه شناخت تیم؛ پیش از استناد رسمی باید دوباره بررسی شود.</span>
        </div>
        <div className="row" style={{ gap: 8, marginBottom: 24 }}>
          <span className="status-tag tone-warn">پیشنهاد آینده</span><span className="small muted">طرح پیشنهادی که هنوز پیاده‌سازی نشده است.</span>
        </div>

        <nav className="panel flat no-print" aria-label="فهرست گزارش">
          <ol style={{ columns: 2, margin: 0, paddingInlineStart: '1.2em' }} className="small">
            {TOC.map((t, i) => <li key={t}><a href={`#s${i + 1}`}>{t}</a></li>)}
          </ol>
        </nav>

        <h2 id="s1">۱. خلاصه مدیریتی</h2>
        <div className="prose">
          <p>منابع رسمی بین‌المللی (NIH ODS، EFSA، NASEM، LPI) محتوای علمی معتبر و رایگان دارند ولی ابزار محاسبه دریافت فردی ارائه نمی‌دهند. ابزارهای محاسباتی رسمی (USDA DRI Calculator و EFSA DRV Finder) فقط مقدار مرجع گروه را نشان می‌دهند و دریافت واقعی را نمی‌سنجند. ردیاب‌های تجاری مانند Cronometer دریافت را می‌سنجند اما درصد RDA را بدون تفسیر احتمالی، بدون رعایت دامنه UL و بدون سطح شواهد گزارش می‌کنند. در فضای فارسی، محتوای موجود عمدتاً مقالات عمومی یا تجاری بدون منبع و بدون ابزار است و دستورالعمل‌های کشوری به‌صورت PDF پراکنده‌اند.</p>
          <p><strong>نتیجه:</strong> فرصت روشنی برای یک پلتفرم فارسی وجود دارد که سه چیز را یکجا ارائه دهد: محتوای ساختاریافته و مستند، محاسبه یکپارچه دریافت از غذا و مکمل با تفسیر علمی درست (احتمال کفایت و دامنه صحیح UL)، و گردش کار حرفه‌ای با بازبینی علمی. نسخه فعلی ویتامین‌نامه این هسته را پیاده کرده است و مهم‌ترین گام بعدی، اعتبارسنجی محتوا توسط متخصصان و افزودن بانک غذاهای ایرانی است.</p>
        </div>

        <h2 id="s2">۲. فهرست دسته‌بندی‌شده سامانه‌ها و منابع</h2>
        {CATEGORIES.map((c) => (
          <Fragment key={c.id}>
            <h3 style={{ marginTop: 24 }}>{c.title}</h3>
            <div className="stack">
              {c.systems.map((s) => (
                <details key={s.name} className="disclosure">
                  <summary>
                    <span style={{ flex: 1 }}>{s.name} <span className="xs muted">— {s.org}</span></span>
                    <span className="chip">{s.kind}</span><StatusTag s={s.status} />
                  </summary>
                  <div>
                    <dl className="kv">
                      <dt>لینک</dt><dd><a href={s.url} target="_blank" rel="noopener noreferrer" className="ltr" style={{ wordBreak: 'break-all' }}>{s.url}</a></dd>
                      <dt>مخاطب</dt><dd>{s.audience}</dd>
                      <dt>قابلیت‌های کلیدی</dt><dd>{s.features}</dd>
                      <dt>نحوه ارائه اطلاعات</dt><dd>{s.presentation}</dd>
                      <dt>شخصی‌سازی</dt><dd>{s.personalization}</dd>
                      <dt>مکمل‌ها و تداخلات</dt><dd>{s.supplements}</dd>
                      <dt>کیفیت و اعتبار</dt><dd>{s.quality}</dd>
                      <dt>هزینه</dt><dd>{s.cost}</dd>
                      <dt>نقاط قوت</dt><dd>{s.strengths}</dd>
                      <dt>نقاط ضعف</dt><dd>{s.weaknesses}</dd>
                      <dt>قابل الگوبرداری</dt><dd>{s.borrow}</dd>
                    </dl>
                  </div>
                </details>
              ))}
            </div>
          </Fragment>
        ))}

        <h2 id="s3">۳. جدول مقایسه قابلیت‌ها</h2>
        <p className="small muted">● کامل — ◐ جزئی — ○ ندارد. ستون‌هایی که با ستاره مشخص شده‌اند برداشت تحلیلی از شناخت پیشین‌اند.</p>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>قابلیت</th>{MATRIX.map((m) => <th key={m.name} style={{ textAlign: 'center', minWidth: 90 }}>{m.name}{!m.verified && '*'}</th>)}</tr></thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={f}><td>{f}</td>{MATRIX.map((m) => <td key={m.name} style={{ textAlign: 'center', background: m.name.startsWith('ویتامین‌نامه') ? 'var(--good-bg)' : undefined }}><Mark v={m.v[i]} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="prose">
          <p><strong>به‌خوبی پوشش داده شده:</strong> مقادیر مرجع و محتوای علمی انگلیسی؛ داده‌های ترکیب غذای آمریکا و اروپا.</p>
          <p><strong>محدود:</strong> تفسیر احتمالی دریافت، دامنه صحیح UL، سطح شواهد به زبان ساده، مقایسه استانداردها، و هرگونه ابزار علمی فارسی.</p>
        </div>

        <h2 id="s4">۴. تحلیل شکاف‌ها و فرصت‌های نوآوری</h2>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>نوآوری</th><th>ارزش برای کاربر</th><th>مزیت نسبت به موجود</th><th>پیچیدگی</th><th>اولویت</th><th>وضعیت</th></tr></thead>
            <tbody>{INNOVATIONS.map((n) => (
              <tr key={n.name}><td style={{ fontWeight: 650 }}>{n.name}</td><td>{n.value}</td><td>{n.adv}</td><td>{n.cx}</td><td>{n.pr}</td>
                <td><Tone tone={n.st.startsWith('پیاده') ? 'good' : n.st.startsWith('آینده') ? 'warn' : 'neutral'}>{n.st}</Tone></td></tr>
            ))}</tbody>
          </table>
        </div>
        <p className="small muted">قابلیت‌هایی که فقط جذابیت ظاهری داشتند (مانند امتیازدهی بازی‌گونه یا «نمره سلامت» واحد) کنار گذاشته شدند، چون تفسیر علمی روشنی ندارند و ممکن است گمراه‌کننده باشند.</p>

        <h2 id="s5">۵. ساختار علمی و محتوایی</h2>
        <div className="prose">
          <p>هر ویتامین یک پرونده ساختاریافته با ۱۴ بخش دارد که همه به‌صورت داده (نه متن آزاد) ذخیره می‌شوند تا در صفحات، مقایسه‌ها و ابزارها دوباره استفاده شوند. نمونه کامل: <Link to="/vitamins/vitamin-d">پرونده ویتامین D</Link>.</p>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>بخش</th><th>فیلدهای داده</th><th>کاربرد در سامانه</th></tr></thead>
            <tbody>
              {[
                ['نام‌ها و اشکال', 'nameFa، nameEn، aliases، forms[name, note]', 'جست‌وجوی چندزبانه و نام‌های جایگزین'],
                ['تعریف و طبقه‌بندی', 'classification، solubility، unit، unitNote', 'فیلتر، تبدیل واحد'],
                ['نقش و متابولیسم', 'functions[]، metabolism{absorption, transport, storage, excretion}', 'صفحه پرونده'],
                ['منابع غذایی', 'جدول foods با per100 و serving؛ bioavailability[]', 'نمودار منابع، ماشین‌حساب'],
                ['مقادیر مرجع', 'dri: rec، ear، ul برای ۲۲ گروه؛ ulScope؛ efsa', 'موتور محاسبه، مقایسه استانداردها'],
                ['گروه‌های خاص', 'کلید گروه‌های بارداری و شیردهی؛ تعدیل سیگار', 'انتخاب خودکار گروه'],
                ['کمبود', 'riskGroups، signs، assessment، labs[]', 'ارزیابی آموزشی'],
                ['دریافت بیش از حد', 'toxicity{summary, signs, riskFactors}', 'هشدارهای UL'],
                ['بیماری‌ها', 'clinical[]', 'صفحه پرونده'],
                ['تداخلات', 'جدول interactions با شدت، سازوکار، اقدام و منبع', 'ابزار تداخلات'],
                ['تأمین نیاز و مکمل', 'intakeStrategies، supplements{forms, labelNotes, cautions}', 'راهنمای مکمل'],
                ['سطح شواهد', 'evidence[claim, level, note]', 'برچسب شواهد'],
                ['منابع و بازبینی', 'sources[]، lastReviewed، confidence', 'شفافیت و چرخه بازبینی'],
              ].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={i === 1 ? 'small' : undefined}>{i === 1 ? <span className="ltr" style={{ display: 'inline' }}>{c}</span> : c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>

        <h2 id="s6">۶. موتور شخصی‌سازی و ماژول ایمنی</h2>
        <h3>متغیرهای مؤثر و کمکی</h3>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>متغیر</th><th>نقش</th><th>توضیح</th></tr></thead>
            <tbody>
              <tr><td>سن، جنس، بارداری و شیردهی</td><td><Tone tone="good">تعیین‌کننده</Tone></td><td>کلید انتخاب گروه مرجع در هر دو استاندارد.</td></tr>
              <tr><td>مصرف سیگار</td><td><Tone tone="good">تعیین‌کننده (فقط ویتامین C)</Tone></td><td>+۳۵ میلی‌گرم به EAR و RDA طبق IOM.</td></tr>
              <tr><td>دریافت غذا، غذای غنی‌شده و مکمل</td><td><Tone tone="good">ورودی اصلی</Tone></td><td>مقایسه با مقادیر مرجع و UL.</td></tr>
              <tr><td>تعداد روزهای ثبت</td><td><Tone tone="warn">تعدیل‌کننده عدم قطعیت</Tone></td><td>در فرمول احتمال کفایت و سطح اطمینان.</td></tr>
              <tr><td>بیماری‌ها، سوءجذب، داروها، الگوی غذایی، تابش آفتاب</td><td><Tone tone="warn">عامل خطر</Tone></td><td>نیاز مرجع را تغییر نمی‌دهند؛ احتمال کمبود و نیاز به ارزیابی را بالا می‌برند.</td></tr>
              <tr><td>نتایج آزمایش</td><td><Tone tone="warn">شاهد وضعیت</Tone></td><td>با آستانه‌های منتشرشده و هشدارهای تفسیر مقایسه می‌شوند.</td></tr>
              <tr><td>وزن، قد و BMI</td><td><Tone tone="neutral">کمکی</Tone></td><td>فقط برای عامل خطر ویتامین D (چاقی) و انرژی؛ جایگزین مقادیر مرجع نمی‌شوند.</td></tr>
              <tr><td>سطح فعالیت بدنی</td><td><Tone tone="neutral">کمکی</Tone></td><td>بر نیاز انرژی اثر دارد؛ برای ویتامین‌ها در DRI مقدار جداگانه تعریف نشده است.</td></tr>
            </tbody>
          </table>
        </div>
        <h3>الگوریتم محاسبه</h3>
        <ol className="prose">
          <li>انتخاب گروه: <span className="ltr">lifeStage(age, sex, status)</span> ← یکی از ۲۲ گروه NASEM؛ برای بزرگسالان مقدار EFSA نیز بازیابی می‌شود.</li>
          <li>جمع دریافت: غذاها (مقدار در ۱۰۰ گرم × گرم) + مکمل‌ها پس از تبدیل واحد و تبدیل به میانگین روزانه (هفتگی ÷ ۷ و ماهانه ÷ ۳۰).</li>
          <li>جمع جداگانه «دریافت مشمول UL» بر اساس دامنه هر UL.</li>
          <li>طبقه‌بندی کفایت: کمتر از EAR، بین EAR و RDA، یا بیشتر از RDA؛ برای AI فقط «احتمالاً کافی» یا «قابل قضاوت نیست».</li>
          <li>احتمال کفایت با روش IOM ۲۰۰۰ و نمایش سطح اطمینان بر اساس تعداد روزهای ثبت.</li>
          <li>ایمنی: بیشتر از UL، نزدیک به UL (۸۰٪ و بیشتر) یا کمتر؛ با پیام ویژه برای دوزهای درمانی تحت نظر.</li>
          <li>هر نتیجه با واحد، روش، منبع و یادداشت‌های محدودیت (داده ناموجود، سهم تریپتوفان) نمایش داده می‌شود.</li>
        </ol>
        <h3>ماژول غربالگری و ایمنی</h3>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>سطح</th><th>کاربرد</th><th>آنچه انجام می‌دهد</th><th>آنچه انجام نمی‌دهد</th></tr></thead>
            <tbody>
              <tr><td>آموزش عمومی</td><td>دانشنامه</td><td>ارائه اطلاعات مستند</td><td>توصیه فردی</td></tr>
              <tr><td>غربالگری</td><td>ارزیابی آموزشی</td><td>امتیازدهی شفاف عوامل خطر و نشان دادن دلایل؛ چهار سطح ارجاع</td><td>نتیجه‌گیری از علائم به‌تنهایی</td></tr>
              <tr><td>تفسیر اطلاعات</td><td>ماشین‌حساب و آزمایش</td><td>مقایسه با مقادیر مرجع و آستانه‌ها همراه با هشدارهای تفسیر</td><td>تشخیص بالینی</td></tr>
              <tr><td>تشخیص و درمان</td><td>—</td><td>ارجاع به پزشک؛ هشدار فوری برای علائم خطر (ورنیکه، علائم عصبی B12، هیپرکلسمی)</td><td>پیشنهاد دوز درمانی</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="s7">۷. معماری رابط کاربری و صفحات اصلی</h2>
        <div className="grid-2">
          <div className="panel flat">
            <h3>بخش عمومی</h3>
            <ul className="dots small">
              <li><Link to="/">خانه</Link>: خط‌کش تعاملی EAR، RDA و UL، دسترسی به ابزارها و ۱۳ ویتامین.</li>
              <li><Link to="/vitamins">دانشنامه</Link>: جدول قابل فیلتر و پرونده ۱۲‌بخشی با فهرست چسبان.</li>
              <li><Link to="/compare">مقایسه</Link>: ویتامین با ویتامین و رتبه‌بندی منابع غذایی.</li>
              <li><Link to="/calculator">ماشین‌حساب</Link>: پروفایل، غذا، مکمل و نتایج زنده.</li>
              <li><Link to="/assessment">ارزیابی آموزشی</Link>: ویزارد پنج‌مرحله‌ای با گزارش قابل چاپ.</li>
              <li><Link to="/interactions">تداخلات</Link> و <Link to="/learn">آموزش</Link>.</li>
              <li>جست‌وجوی سراسری با Ctrl K و پشتیبانی از نام‌های فارسی، انگلیسی و جایگزین.</li>
            </ul>
          </div>
          <div className="panel flat">
            <h3>بخش تخصصی</h3>
            <ul className="dots small">
              <li><Link to="/pro">داشبورد کارشناس</Link>: آمار پرونده‌ها و پیشرفت بازبینی.</li>
              <li>پرونده مراجع با ثبت رضایت آگاهانه، یادداشت، نتایج ذخیره‌شده و خروجی JSON.</li>
              <li><Link to="/standards">مقایسه استانداردها</Link> آمریکا و اروپا.</li>
              <li>گردش کار بازبینی علمی: ۱۳ ویتامین × ۶ بخش با وضعیت تأیید.</li>
              <li>گزارش‌های قابل چاپ برای ماشین‌حساب و ارزیابی.</li>
            </ul>
          </div>
        </div>
        <p className="small">اصول تعامل: توضیح لایه‌ای (خلاصه، سپس جزئیات در بخش‌های بازشونده)، نمایش منبع کنار عدد، فیلترهای بخش‌بندی‌شده، نمودارهای ساده میله‌ای با مبنای «واحد مصرف»، و خط‌کش ناحیه‌ای که مقیاس غیرخطی خود را صریحاً اعلام می‌کند.</p>

        <h2 id="s8">۸. معماری فنی و مدل داده</h2>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>لایه</th><th>انتخاب فعلی</th><th>دلیل</th><th>محدودیت و مسیر ارتقا</th></tr></thead>
            <tbody>
              <tr><td>فرانت‌اند</td><td>React 18 + TypeScript + Vite</td><td>ساده، سریع، تایپ‌امن؛ خروجی ایستا</td><td>سئوی محدود SPA؛ در فاز ۶ پیش‌رندر صفحات دانشنامه یا مهاجرت به Next.js یا Astro</td></tr>
              <tr><td>استایل</td><td>CSS با توکن‌ها و ویژگی‌های منطقی (inline-start)</td><td>پشتیبانی طبیعی RTL و LTR؛ بدون وابستگی سنگین</td><td>—</td></tr>
              <tr><td>فونت</td><td>Vazirmatn میزبانی‌شده در خود سایت</td><td>بدون وابستگی به Google Fonts (مهم برای دسترسی از ایران)</td><td>—</td></tr>
              <tr><td>داده علمی</td><td>فایل‌های TypeScript نسخه‌دار در Git</td><td>هر تغییر از طریق Pull Request بازبینی و ثبت می‌شود</td><td>فاز ۶: PostgreSQL با جداول نسخه‌دار</td></tr>
              <tr><td>موتور محاسبه</td><td>توابع خالص TypeScript با آزمون واحد (Vitest)</td><td>قطعی، قابل آزمون، اجرا در مرورگر بدون ارسال داده سلامت</td><td>همان کد در سرور قابل استفاده است</td></tr>
              <tr><td>جست‌وجو</td><td>شاخص سمت کاربر با نرمال‌سازی فارسی</td><td>کافی برای چند صد مدخل</td><td>Postgres FTS و سپس pgvector برای جست‌وجوی معنایی</td></tr>
              <tr><td>ذخیره کاربر</td><td>localStorage</td><td>بدون سرور و بدون جمع‌آوری داده</td><td>فاز ۶: Supabase یا Postgres مدیریت‌شده با Auth، RLS و رمزنگاری</td></tr>
              <tr><td>میزبانی</td><td>Vercel (پیکربندی در vercel.json)</td><td>استقرار خودکار از Git و هدرهای امنیتی</td><td>پلن رایگان Hobby فقط برای استفاده غیرتجاری است؛ پلن Pro هر عضو ۲۰ دلار در ماه. خروجی ایستاست و روی هر میزبان داخلی نیز قابل استقرار است.</td></tr>
            </tbody>
          </table>
        </div>
        <h3>مدل داده پیشنهادی (فاز ۶)</h3>
        <pre className="panel flat ltr" style={{ display: 'block', overflowX: 'auto', fontSize: 12, lineHeight: 1.7, textAlign: 'left' }}>{`vitamins(id, key, name_fa, name_en, solubility, unit, unit_note, version)
life_stages(key, label_fa, sex, age_min, age_max, status)
dri_values(vitamin_id, standard['NASEM'|'EFSA'|'IR'], life_stage, type['EAR'|'RDA'|'AI'|'UL'|'PRI'|'AR'],
           value, unit, ul_scope, source_id, valid_from, version, reviewed_by)
foods(id, name_fa, name_en, group, origin['FDC'|'IR'|'label'], external_id, fortified, version)
food_nutrients(food_id, vitamin_id, per100, quality_code, source_id)
supplement_products(id, brand, name_fa, irc_code, form)  ·  supplement_ingredients(product_id, vitamin_id, chem_form, amount, unit)
drugs(id, atc_code, name_fa, name_en, brands[])
interactions(id, agent_type, agent_id, vitamin_id, severity, effect, mechanism, management, evidence_level, source_id)
evidence_claims(id, vitamin_id, claim_fa, level, note, source_ids[])
sources(id, title, org, url, accessed_at, license, citation)
reviews(entity_type, entity_id, section, status, reviewer_id, comment, created_at)
users(id, role['public'|'user'|'nutritionist'|'reviewer'|'admin'])  ·  clients(id, owner_id, code, ...)
consents(client_id, version, granted_at, revoked_at)  ·  intake_records / lab_results (encrypted JSONB)
audit_log(actor_id, action, entity, entity_id, at)`}</pre>
        <h3>طراحی API (فاز ۶)</h3>
        <pre className="panel flat ltr" style={{ display: 'block', overflowX: 'auto', fontSize: 12, lineHeight: 1.7, textAlign: 'left' }}>{`GET  /api/v1/vitamins                 → list (with version, last_reviewed)
GET  /api/v1/vitamins/{key}           → full dossier + sources
GET  /api/v1/dri?vitamin=D&stage=f31&standard=NASEM,EFSA
GET  /api/v1/foods?q=&group=&vitamin=
GET  /api/v1/interactions?agent=metformin
POST /api/v1/calc/intake              → same pure engine; returns method + sources per result
POST /api/v1/screen                   → triage + reasons (no diagnosis)
/api/v1/clients/**                    → auth + RLS + audit log`}</pre>
        <p className="small">هر پاسخ شامل <span className="ltr">source_id</span>، نسخه داده و تاریخ بازبینی است. امنیت: HTTPS، هدرهای امنیتی (در vercel.json اعمال شده)، رمزنگاری در حالت سکون، حداقل‌سازی داده (کد به‌جای نام)، حق حذف، ثبت رضایت نسخه‌دار، و لاگ دسترسی. برای کاربران اروپایی رعایت GDPR لازم است.</p>
        <h3>هزینه تقریبی <span className="status-tag tone-warn">برآورد تحلیلی</span></h3>
        <ul className="dots small prose">
          <li>میزبانی نسخه فعلی: رایگان (Hobby، غیرتجاری) یا ۲۰ دلار در ماه برای هر عضو (Pro) در Vercel.</li>
          <li>بک‌اند مدیریت‌شده (Postgres و Auth): معمولاً ده‌ها دلار در ماه در مقیاس اولیه؛ پیش از انتخاب، قیمت روز بررسی شود.</li>
          <li>بیشترین هزینه انسانی است: بازبینی علمی محتوا (چند هفته کار متخصص تغذیه) و ساخت بانک غذاهای ایرانی (چند ماه).</li>
          <li>هوش مصنوعی: هزینه مصرفی API؛ با کش و محدودیت طول پاسخ قابل کنترل.</li>
        </ul>

        <h2 id="s9">۹. راهبرد منابع علمی و کنترل کیفیت داده</h2>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>منبع</th><th>نوع داده</th><th>اعتبار</th><th>محدودیت</th><th>دسترسی و API</th><th>مجوز و انتساب</th></tr></thead>
            <tbody>
              <tr><td>NIH ODS</td><td>برگه‌ها، جداول DRI</td><td>بسیار بالا</td><td>متمرکز بر آمریکا</td><td>وب؛ DSLD دارای API</td><td>محتوای دولتی آمریکا؛ ذکر منبع</td></tr>
              <tr><td>NASEM DRI</td><td>مقادیر مرجع و روش ارزیابی</td><td>مرجع</td><td>برخی گزارش‌ها قدیمی</td><td>مطالعه رایگان در NAP</td><td>اعداد با ارجاع؛ متن کپی نشود</td></tr>
              <tr><td>EFSA</td><td>DRV و UL</td><td>بسیار بالا</td><td>بیشتر برای اروپا</td><td>DRV Finder وب؛ EFSA Journal آزاد</td><td>ذکر منبع</td></tr>
              <tr><td>WHO</td><td>آستانه‌های جمعیتی، راهنماها</td><td>بالا</td><td>سطح جمعیت</td><td>رایگان</td><td>معمولاً CC BY-NC-SA 3.0 IGO</td></tr>
              <tr><td>NHS و MedlinePlus</td><td>محتوای عمومی</td><td>بالا</td><td>ساده‌شده</td><td>MedlinePlus Connect و API محتوای NHS</td><td>طبق شرایط هر سرویس</td></tr>
              <tr><td>USDA FoodData Central</td><td>ترکیب مواد غذایی</td><td>بالا</td><td>غذاهای آمریکایی</td><td>API با کلید data.gov، ۱۰۰۰ درخواست در ساعت</td><td>CC0؛ درخواست ذکر منبع (تأییدشده)</td></tr>
              <tr><td>PubMed و Cochrane</td><td>شواهد پژوهشی</td><td>متغیر</td><td>نیاز به ارزیابی نقادانه</td><td>E-utilities رایگان</td><td>چکیده‌ها متعلق به ناشر؛ فقط لینک و نقل‌قول کوتاه</td></tr>
              <tr><td>جدول ترکیبات ایران</td><td>غذاهای ایرانی</td><td>متوسط تا بالا</td><td>دسترسی دیجیتال محدود</td><td>نیازمند همکاری</td><td>نیازمند مجوز کتبی</td></tr>
            </tbody>
          </table>
        </div>
        <h3>کنترل کیفیت</h3>
        <ul className="dots prose">
          <li><strong>ورود دوگانه:</strong> هر عدد مرجع توسط دو نفر مستقل وارد و مغایرت‌ها خودکار گزارش می‌شود.</li>
          <li><strong>آزمون‌های ثابت:</strong> EAR ≤ RDA &lt; UL، یکتایی شناسه‌ها، نبود مقدار منفی، وجود منبع برای هر مدخل (۳۱ آزمون در نسخه فعلی).</li>
          <li><strong>مدیریت اختلاف استانداردها:</strong> هیچ‌گاه میانگین‌گیری نمی‌شود؛ هر استاندارد جداگانه با برچسب نمایش داده و پیش‌فرض به‌صراحت اعلام می‌شود.</li>
          <li><strong>بازبینی دوره‌ای:</strong> بازبینی فصلی پرونده‌ها، پایش صفحات تغییرات ODS و انتشارات EFSA، و انقضای خودکار برچسب «بازبینی‌شده» پس از ۱۲ ماه.</li>
          <li><strong>ردیابی:</strong> هر تغییر داده با کامیت Git یا رکورد بازبینی، نام بازبین و تاریخ ثبت می‌شود.</li>
        </ul>

        <h2 id="s10">۱۰. کاربردهای هوش مصنوعی و محدودیت‌ها</h2>
        <div className="grid-2">
          <div className="panel flat">
            <h3>فقط با قواعد قطعی و جداول</h3>
            <ul className="dots small">
              <li>مقادیر مرجع، UL و دامنه شمول</li><li>تبدیل واحدها و میانگین دوز</li><li>جمع دریافت و احتمال کفایت</li>
              <li>تفسیر آستانه‌های آزمایش</li><li>جست‌وجوی تداخلات</li><li>تشخیص علائم هشدار و ارجاع فوری</li>
            </ul>
          </div>
          <div className="panel flat">
            <h3>مناسب برای مدل زبانی، با محدودیت</h3>
            <ul className="dots small">
              <li>پاسخ به پرسش آزاد با RAG فقط روی پیکره بازبینی‌شده و استناد اجباری</li>
              <li>جست‌وجوی معنایی در دانشنامه</li>
              <li>خلاصه‌سازی مقالات برای بازبین انسانی</li>
              <li>استخراج داده از راهنماها به صف بازبینی، بدون انتشار خودکار</li>
              <li>شناسایی اختلاف میان منابع برای بررسی متخصص</li>
              <li>بازنویسی ساده نتایج قطعی با اعداد قفل‌شده</li>
              <li>خلاصه پرونده برای کارشناس، بدون توصیه درمانی</li>
            </ul>
          </div>
        </div>
        <div className="callout risk" style={{ marginTop: 16 }}><strong>خط قرمزها</strong>مدل زبانی هیچ عدد مرجع، دوز، تشخیص یا منبعی تولید نمی‌کند؛ هر استناد باید به شناسه‌ای موجود در پیکره اشاره کند و به‌طور خودکار اعتبارسنجی شود؛ پرسش‌های تشخیصی و دوز درمانی به متخصص ارجاع می‌شوند؛ همه پاسخ‌ها با نسخه پیکره و زمان ثبت می‌شوند و پیش از انتشار با مجموعه آزمون فارسی ارزیابی می‌شوند.</div>

        <h2 id="s11">۱۱. نقشه راه اجرایی</h2>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>مرحله</th><th>خروجی</th><th>ضروریات</th><th>پیش‌نیاز</th><th>ریسک</th><th>معیار موفقیت</th><th>اولویت</th><th>وضعیت</th></tr></thead>
            <tbody>{ROADMAP.map((r, i) => (
              <tr key={r.phase}><td style={{ fontWeight: 650 }}>{(i + 1).toLocaleString('fa-IR')}. {r.phase}</td><td>{r.out}</td><td>{r.must}</td><td>{r.pre}</td><td>{r.risk}</td><td>{r.kpi}</td><td className="ltr">{r.pri}</td>
                <td><Tone tone={r.st.startsWith('انجام شد') ? 'good' : r.st.startsWith('آینده') ? 'warn' : 'neutral'}>{r.st}</Tone></td></tr>
            ))}</tbody>
          </table>
        </div>

        <h2 id="s12">۱۲. پیشنهاد نهایی</h2>
        <div className="prose">
          <p>هسته متمایز پلتفرم — موتور محاسبه علمی با دامنه صحیح UL و احتمال کفایت، محتوای ساختاریافته مستند و رابط فارسی بومی — در این نسخه ساخته و آزمون شده است. توسعه عملی از این پس باید به این ترتیب ادامه یابد:</p>
          <ol>
            <li><strong>اعتبارسنجی علمی (فوری):</strong> بازبینی همه ۷۸ بخش پرونده‌ها در پنل تخصصی توسط حداقل دو متخصص تغذیه و تطبیق مقادیر غذایی با FoodData Central از طریق اسکریپت واردسازی.</li>
            <li><strong>بانک غذاهای ایرانی:</strong> همکاری با انستیتو تحقیقات تغذیه‌ای برای غذاهای پایه و ساخت دستور غذاهای مرکب رایج (خورش‌ها، نان‌ها، لبنیات محلی).</li>
            <li><strong>بک‌اند امن برای پنل تخصصی:</strong> احراز هویت، نقش‌ها، رمزنگاری و ثبت رضایت پیش از ورود هر داده واقعی بیمار.</li>
            <li><strong>آزمون کاربردپذیری و دسترسی از ایران:</strong> در صورت محدودیت دسترسی به Vercel، استقرار نسخه آینه روی میزبان داخلی.</li>
            <li><strong>هوش مصنوعی:</strong> فقط پس از تکمیل مراحل بالا و ساخت مجموعه ارزیابی.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
