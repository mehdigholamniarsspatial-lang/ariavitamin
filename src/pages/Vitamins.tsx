import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { VITAMINS } from '../data/vitamins';
import { DRI } from '../data/dri';
import { PageHead, Seg, SolChip } from '../components/ui';
import { fa, norm, useTitle } from '../lib';

export default function Vitamins() {
  useTitle('دانشنامه ویتامین‌ها');
  const [sol, setSol] = useState<'all' | 'fat' | 'water'>('all');
  const [hasUl, setHasUl] = useState<'all' | 'ul' | 'noul'>('all');
  const [q, setQ] = useState('');
  const list = useMemo(() => VITAMINS.filter((v) => {
    if (sol !== 'all' && v.solubility !== sol) return false;
    const ul = DRI[v.key].ulScope !== 'none';
    if (hasUl === 'ul' && !ul) return false;
    if (hasUl === 'noul' && ul) return false;
    const n = norm(q);
    return !n || norm([v.nameFa, v.nameEn, v.shortFa, ...v.aliases].join(' ')).includes(n);
  }), [sol, hasUl, q]);

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="دانشنامه ویتامین‌ها" lede="برای هر ویتامین یک پرونده علمی ساختاریافته: اشکال شیمیایی، عملکرد، متابولیسم، منابع غذایی، مقادیر مرجع همه گروه‌های سنی، کمبود، سمیت، تداخلات، مکمل‌ها و سطح شواهد." crumbs={[{ to: '/vitamins', label: 'دانشنامه' }]} />
      <div className="wrap stack">
        <div className="row" style={{ gap: 16 }}>
          <input type="search" placeholder="جست‌وجو با نام فارسی، انگلیسی یا نام دیگر (مثلاً کوبالامین)" value={q} onChange={(e) => setQ(e.target.value)} style={{ maxWidth: 380 }} aria-label="جست‌وجو در ویتامین‌ها" />
          <Seg label="حلالیت" value={sol} onChange={setSol} options={[{ id: 'all', label: 'همه' }, { id: 'fat', label: 'محلول در چربی' }, { id: 'water', label: 'محلول در آب' }]} />
          <Seg label="حد بالا" value={hasUl} onChange={setHasUl} options={[{ id: 'all', label: 'همه' }, { id: 'ul', label: 'دارای UL' }, { id: 'noul', label: 'بدون UL' }]} />
        </div>

        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>ویتامین</th><th>حلالیت</th>
                <th className="num">مرد ۱۹–۵۰</th><th className="num">زن ۱۹–۵۰</th><th className="num">بارداری</th><th className="num">UL بزرگسال</th>
                <th>واحد</th><th>خلاصه</th>
              </tr>
            </thead>
            <tbody>
              {list.map((v) => {
                const d = DRI[v.key];
                return (
                  <tr key={v.key}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Link to={`/vitamins/${v.slug}`} style={{ fontWeight: 750 }}>{v.nameFa}</Link>
                      <div className="en xs">{v.nameEn}</div>
                    </td>
                    <td><SolChip v={v} /></td>
                    <td className="num">{fa(d.rec.m19)}{d.allAI && '*'}</td>
                    <td className="num">{fa(d.rec.f19)}{d.allAI && '*'}</td>
                    <td className="num">{fa(d.rec.p19)}</td>
                    <td className="num">{d.ul?.m19 ? fa(d.ul.m19) : '—'}</td>
                    <td className="xs"><span className="ltr">{v.unit}</span></td>
                    <td className="small" style={{ minWidth: 280 }}>{v.summary.split('.')[0]}.</td>
                  </tr>
                );
              })}
              {list.length === 0 && <tr><td colSpan={8} className="muted">با این فیلترها ویتامینی پیدا نشد. فیلترها را تغییر دهید.</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="xs muted">مقادیر بر اساس DRI آمریکا (NASEM). ستاره: مقدار از نوع AI است. «—» یعنی UL تعیین نشده که به معنی بی‌خطری دوزهای بالا نیست.</p>
      </div>
    </div>
  );
}
