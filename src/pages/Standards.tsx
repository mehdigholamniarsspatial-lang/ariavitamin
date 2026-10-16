import { Link } from 'react-router-dom';
import { VITAMINS } from '../data/vitamins';
import { DRI, EFSA_ADULT } from '../data/dri';
import { PageHead, SourceList } from '../components/ui';
import { EFSA_DRV, ODS_RECS, USDA_DRI_CALC } from '../data/sources';
import { fa, useTitle } from '../lib';

function diff(us: number | null | undefined, eu: number | null | undefined) {
  if (us == null || eu == null) return null;
  return ((eu - us) / us) * 100;
}

export default function Standards() {
  useTitle('مقایسه استانداردها');
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="مقایسه استانداردهای آمریکا (NASEM) و اروپا (EFSA)" crumbs={[{ to: '/standards', label: 'استانداردها' }]}
        lede="مقادیر بزرگسالان کنار هم. اختلاف‌ها معمولاً از انتخاب شاخص کفایت، مطالعات پایه و ضریب اطمینان متفاوت ناشی می‌شود، نه از خطا." />
      <div className="wrap stack">
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th rowSpan={2}>ویتامین</th><th rowSpan={2}>واحد</th>
                <th colSpan={3} style={{ textAlign: 'center' }}>زن بزرگسال</th>
                <th colSpan={3} style={{ textAlign: 'center' }}>مرد بزرگسال</th>
                <th colSpan={2} style={{ textAlign: 'center' }}>UL بزرگسال</th>
              </tr>
              <tr>
                <th className="num">NASEM</th><th className="num">EFSA</th><th className="num">اختلاف</th>
                <th className="num">NASEM</th><th className="num">EFSA</th><th className="num">اختلاف</th>
                <th className="num">NASEM</th><th className="num">EFSA</th>
              </tr>
            </thead>
            <tbody>
              {VITAMINS.map((v) => {
                const d = DRI[v.key]; const e = EFSA_ADULT[v.key];
                const df = diff(d.rec.f19, e.female); const dm = diff(d.rec.m19, e.male);
                const tag = (x: number | null) => x == null ? <span className="muted">—</span> : <span style={{ color: Math.abs(x) >= 20 ? 'var(--warn)' : 'var(--muted)', fontWeight: Math.abs(x) >= 20 ? 750 : 400 }}>{x > 0 ? '+' : ''}{fa(Math.round(x))}٪</span>;
                return (
                  <tr key={v.key}>
                    <td><Link to={`/vitamins/${v.slug}`} style={{ fontWeight: 700 }}>{v.nameFa}</Link>{e.noteFa && <div className="xs muted" style={{ maxWidth: 240 }}>EFSA: {e.noteFa}</div>}</td>
                    <td className="xs"><span className="ltr">{v.unit}</span></td>
                    <td className="num">{fa(d.rec.f19)} <span className="xs muted">{d.allAI ? 'AI' : 'RDA'}</span></td>
                    <td className="num">{e.female != null ? fa(e.female) : '—'} <span className="xs muted">{e.type}</span></td>
                    <td className="num">{tag(df)}</td>
                    <td className="num">{fa(d.rec.m19)}</td>
                    <td className="num">{e.male != null ? fa(e.male) : '—'}</td>
                    <td className="num">{tag(dm)}</td>
                    <td className="num">{d.ul?.m19 ? fa(d.ul.m19) : '—'}</td>
                    <td className="num">{e.ul ? fa(e.ul) : '—'}{e.ulNoteFa && <div className="xs muted" style={{ direction: 'rtl', textAlign: 'right' }}>{e.ulNoteFa}</div>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="grid-2">
          <div className="panel flat">
            <h3>معادل اصطلاحات</h3>
            <dl className="kv">
              <dt>RDA ↔ PRI</dt><dd>مقدار توصیه‌شده برای تقریباً همه افراد سالم (Population Reference Intake در EFSA).</dd>
              <dt>EAR ↔ AR</dt><dd>نیاز متوسط (Average Requirement در EFSA).</dd>
              <dt>AI ↔ AI</dt><dd>دریافت کافی، وقتی داده برای نیاز متوسط کافی نیست.</dd>
              <dt>UL ↔ UL</dt><dd>حد بالای قابل تحمل؛ دامنه شمول ممکن است متفاوت باشد.</dd>
            </dl>
          </div>
          <div className="panel flat">
            <h3>کدام را به کار ببریم؟</h3>
            <p className="small">سامانه به‌طور پیش‌فرض از NASEM استفاده می‌کند، چون برای همه گروه‌های سنی جدول کامل دارد و پایه برچسب‌گذاری بسیاری از محصولات است. در پنل تخصصی و ماشین‌حساب می‌توانید EFSA را برای بزرگسالان کنار آن ببینید. در بررسی انجام‌شده، جدول ملی مقادیر مرجع ایران به شکل دیجیتال و قابل استفاده یافت نشد؛ ساختار داده امکان افزودن آن را به‌عنوان استاندارد سوم دارد.</p>
          </div>
        </div>
        <div className="panel flat"><h3>منابع</h3><SourceList sources={[ODS_RECS, EFSA_DRV, USDA_DRI_CALC]} /></div>
      </div>
    </div>
  );
}
