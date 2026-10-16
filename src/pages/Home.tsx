import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VITAMINS, VIT } from '../data/vitamins';
import { DRI, recTypeFor } from '../data/dri';
import { FOODS } from '../data/foods';
import type { VitaminKey } from '../data/types';
import { Ruler } from '../components/Ruler';
import { SolChip } from '../components/ui';
import { TOOLS } from '../components/Layout';
import { fa, useTitle } from '../lib';

const DEMO: VitaminKey[] = ['D', 'C', 'B12', 'A', 'B6'];

function verdict(v: number, ear: number | null, rec: number, ul: number | null) {
  if (ul != null && v >= ul) return { text: 'بالاتر از حد بالای قابل تحمل (UL)', tone: 'var(--over)', note: 'دریافت پایدار در این سطح خطر عوارض را افزایش می‌دهد؛ این ناحیه هدف نیست.' };
  if (ear != null && v < ear) return { text: 'کمتر از نیاز متوسط (EAR)', tone: 'var(--risk)', note: 'اگر دریافت معمول شما در این سطح باشد، احتمال ناکافی بودن آن بیش از ۵۰ درصد است.' };
  if (v < rec) return { text: 'بین EAR و مقدار توصیه‌شده', tone: 'var(--warn)', note: 'احتمال کفایت متوسط است؛ رسیدن به RDA این احتمال را به حدود ۹۸ درصد می‌رساند.' };
  return { text: 'در محدوده توصیه‌شده', tone: 'var(--good)', note: 'دریافت معمول در این محدوده برای تقریباً همه افراد سالم این گروه کافی است.' };
}

export default function Home() {
  useTitle('مرجع علمی ویتامین‌ها');
  const [key, setKey] = useState<VitaminKey>('D');
  const d = DRI[key];
  const stage = 'f31' as const;
  const ear = d.ear?.[stage] ?? null;
  const rec = d.rec[stage]!;
  const ul = d.ul?.[stage] ?? null;
  const max = (ul ?? rec * 3) * 1.4;
  const [val, setVal] = useState<number>(rec * 0.6);
  const v = VIT[key];
  const ver = verdict(val, ear, rec, ul);

  const choose = (k: VitaminKey) => { setKey(k); setVal((DRI[k].rec[stage] ?? 1) * 0.6); };

  return (
    <>
      <section className="wrap hero">
        <div>
          <h1>ویتامین‌ها را با عدد و منبع بشناسید.</h1>
          <p className="lede">
            دانشنامه‌ای فارسی برای ۱۳ ویتامین ضروری، با مقادیر مرجع آمریکا و اروپا، منابع غذایی، تداخلات دارویی و ابزارهایی که دریافت شما را با گروه سنی و فیزیولوژیک خودتان مقایسه می‌کنند — همیشه با ذکر منبع و بدون تشخیص پزشکی.
          </p>
          <div className="row" style={{ marginTop: 24 }}>
            <Link className="btn" to="/calculator">دریافت امروزم را بسنجم</Link>
            <Link className="btn ghost" to="/vitamins">مرور دانشنامه</Link>
          </div>
        </div>

        <div className="hero-demo" aria-labelledby="demo-title">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 id="demo-title" style={{ fontSize: 'var(--fs-md)', margin: 0 }}>دریافت روزانه یک زن ۳۵ ساله</h2>
            <span className="xs muted">مقادیر NASEM</span>
          </div>
          <div className="row" style={{ gap: 6, margin: '12px 0 4px' }}>
            {DEMO.map((k) => (
              <button key={k} className="chip" aria-pressed={key === k} onClick={() => choose(k)} style={{ direction: 'ltr' }}>{VIT[k].shortFa}</button>
            ))}
          </div>
          <Ruler value={val} ear={ear} rec={rec} recType={recTypeFor(key, stage)} ul={ul} unit={v.unit} label={v.nameFa} />
          <label className="sr-only" htmlFor="demo-range">مقدار دریافت</label>
          <input id="demo-range" type="range" min={0} max={max} step={max / 400} value={val} onChange={(e) => setVal(+e.target.value)} />
          <p className="verdict" style={{ color: ver.tone }}>{ver.text}</p>
          <p className="small muted" style={{ marginBottom: 0 }}>{ver.note} نوار را بکشید تا ببینید هر ناحیه چه معنایی دارد. مقیاس ناحیه‌ای است، نه خطی.</p>
        </div>
      </section>

      <section className="wrap section" style={{ paddingTop: 8 }}>
        <div className="tool-list">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to}><t.icon size={22} /><strong>{t.title}</strong><span>{t.desc}</span></Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>سیزده ویتامین ضروری</h2>
          <Link to="/vitamins" className="small">همه پرونده‌ها و فیلترها</Link>
        </div>
        <div className="vit-grid">
          {VITAMINS.map((v) => (
            <Link key={v.key} to={`/vitamins/${v.slug}`} className="vit-tile" style={{ ['--h' as any]: v.hue }}>
              <span className="sym">{v.shortFa}</span>
              <span className="nm">{v.nameFa.replace(/\s*\(.*\)/, '')}{v.nameFa.includes('(') && <span className="xs muted" style={{ display: 'block', fontWeight: 500 }}>{v.nameFa.match(/\((.*)\)/)?.[1]}</span>}</span>
              <span className="meta"><SolChip v={v} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2 style={{ marginBottom: 20 }}>اصول این سامانه</h2>
        <div className="principles">
          <div>
            <h3>هر عدد، یک منبع</h3>
            <p>مقادیر مرجع از NASEM و EFSA، داده‌های غذایی از USDA FoodData Central و هر ادعا با سطح شواهد و تاریخ آخرین بازبینی نمایش داده می‌شود.</p>
          </div>
          <div>
            <h3>احتمال، نه تشخیص</h3>
            <p>ابزارها احتمال کفایت دریافت و عوامل خطر را نشان می‌دهند و میزان عدم قطعیت را صریح می‌گویند. تشخیص کمبود و دوز درمانی کار پزشک است.</p>
          </div>
          <div>
            <h3>بدون فرمول‌های دلخواه</h3>
            <p>نیاز ویتامین‌ها بر اساس سن، جنس و بارداری یا شیردهی از جداول رسمی خوانده می‌شود؛ وزن بدن جایگزین مقادیر مرجع نمی‌شود.</p>
          </div>
        </div>
        <p className="small muted" style={{ marginTop: 20 }}>
          تعداد منابع غذایی فعلی: {fa(FOODS.length)} قلم نمونه — <Link to="/research">گزارش پژوهشی و نقشه راه توسعه</Link> را ببینید.
        </p>
      </section>
    </>
  );
}
