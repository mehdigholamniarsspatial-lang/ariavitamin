import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FOODS, FOOD_BY_ID, FOOD_GROUPS } from '../data/foods';
import { VIT, VITAMINS } from '../data/vitamins';
import { DRI } from '../data/dri';
import type { Food, VitaminKey } from '../data/types';
import { Bars, PageHead, Seg } from '../components/ui';
import { fa, norm, useTitle, vitColor } from '../lib';

export default function Foods() {
  useTitle('منابع غذایی');
  const [sp, setSp] = useSearchParams();
  const sel = sp.get('f') ? FOOD_BY_ID[sp.get('f')!] : undefined;
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<Food['group'] | 'all'>('all');
  const [sortKey, setSortKey] = useState<VitaminKey>('C');
  const [basis, setBasis] = useState<'serving' | '100'>('serving');

  const val = (f: Food, k: VitaminKey) => {
    const v = f.per100[k];
    if (v === undefined) return undefined;
    return basis === 'serving' ? (v * f.serving.g) / 100 : v;
  };

  const list = useMemo(() => {
    const n = norm(q);
    return FOODS.filter((f) => (group === 'all' || f.group === group) && (!n || norm(f.nameFa + ' ' + f.nameEn).includes(n)))
      .sort((a, b) => (val(b, sortKey) ?? -1) - (val(a, sortKey) ?? -1));
  }, [q, group, sortKey, basis]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="منابع غذایی ویتامین‌ها" crumbs={[{ to: '/foods', label: 'منابع غذایی' }]}
        lede="محتوای ویتامین مواد غذایی رایج را بر اساس واحد مصرف یا ۱۰۰ گرم مقایسه کنید. روی ستون هر ویتامین بزنید تا مرتب شود و روی نام غذا بزنید تا جزئیات آن را ببینید." />
      <div className="wrap stack">
        {sel && <FoodDetail f={sel} onClose={() => setSp({})} />}
        <div className="row" style={{ gap: 12 }}>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="جست‌وجوی غذا" style={{ maxWidth: 260 }} aria-label="جست‌وجوی غذا" />
          <select value={group} onChange={(e) => setGroup(e.target.value as Food['group'] | 'all')} style={{ maxWidth: 220 }} aria-label="گروه غذایی">
            <option value="all">همه گروه‌ها</option>
            {Object.entries(FOOD_GROUPS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <Seg label="مبنا" value={basis} onChange={setBasis} options={[{ id: 'serving', label: 'هر واحد مصرف' }, { id: '100', label: 'هر ۱۰۰ گرم' }]} />
        </div>
        <div className="table-scroll" style={{ maxHeight: '70vh' }}>
          <table className="data">
            <thead>
              <tr>
                <th style={{ minWidth: 190 }}>غذا</th>
                {VITAMINS.map((v) => (
                  <th key={v.key} className="num" style={{ cursor: 'pointer', color: sortKey === v.key ? vitColor(v) : undefined }} onClick={() => setSortKey(v.key)} aria-sort={sortKey === v.key ? 'descending' : 'none'}>
                    <button onClick={() => setSortKey(v.key)} style={{ all: 'unset', cursor: 'pointer' }} aria-label={`مرتب‌سازی بر اساس ${v.nameFa}`}>{v.shortFa}</button>
                    <div className="xs muted" style={{ fontWeight: 400 }}>{v.unit}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((f) => (
                <tr key={f.id}>
                  <td>
                    <button onClick={() => { setSp({ f: f.id }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ all: 'unset', cursor: 'pointer', fontWeight: 650 }}>{f.nameFa}</button>
                    <div className="xs muted">{basis === 'serving' ? f.serving.labelFa : FOOD_GROUPS[f.group]}</div>
                  </td>
                  {VITAMINS.map((v) => {
                    const x = val(f, v.key);
                    return <td key={v.key} className="num" style={{ fontWeight: sortKey === v.key ? 750 : 400, color: x === undefined ? 'var(--muted)' : undefined }}>{x === undefined ? '·' : fa(x, x < 1 ? 2 : 1)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="xs muted">نقطه: داده موجود نیست (با صفر متفاوت است). مقادیر تقریبی‌اند و از USDA FoodData Central (SR Legacy) گرفته شده‌اند؛ محتوای غذاهای غنی‌شده به برند بستگی دارد. نسخه بعدی باید با جدول ترکیبات مواد غذایی ایران تکمیل شود.</p>
      </div>
    </div>
  );
}

function FoodDetail({ f, onClose }: { f: Food; onClose: () => void }) {
  const rows = VITAMINS.filter((v) => f.per100[v.key] !== undefined).map((v) => {
    const amt = (f.per100[v.key]! * f.serving.g) / 100;
    const rec = Math.max(DRI[v.key].rec.m19 ?? 0, DRI[v.key].rec.f19 ?? 0);
    return { v, amt, pct: rec ? (amt / rec) * 100 : 0 };
  });
  return (
    <div className="panel raised">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0 }}>{f.nameFa}</h2>
          <div className="en small">{f.nameEn}</div>
        </div>
        <button className="btn ghost small" onClick={onClose}>بستن</button>
      </div>
      <p className="small muted">یک واحد مصرف: {f.serving.labelFa}. درصدها نسبت به بیشترین مقدار توصیه‌شده بزرگسالان ۱۹ تا ۵۰ سال (زن یا مرد).</p>
      {f.noteFa && <div className="callout warn" style={{ marginBottom: 12 }}>{f.noteFa}</div>}
      <Bars unit="٪" max={100} rows={rows.map((r) => ({ label: <span><Link to={`/vitamins/${r.v.slug}`}>{VIT[r.v.key].nameFa}</Link> <span className="xs muted">{fa(r.amt, r.amt < 1 ? 2 : 1)} {r.v.unit}</span></span>, value: Math.round(r.pct), color: vitColor(r.v) }))} />
    </div>
  );
}
