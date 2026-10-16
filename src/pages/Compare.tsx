import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { VIT, VITAMINS } from '../data/vitamins';
import { DRI, EFSA_ADULT, UL_SCOPE_FA } from '../data/dri';
import { FOODS } from '../data/foods';
import type { VitaminKey } from '../data/types';
import { Bars, PageHead, Seg, SolChip, VitBadge } from '../components/ui';
import { fa, useTitle, vitColor } from '../lib';

export default function Compare() {
  useTitle('مقایسه');
  const [mode, setMode] = useState<'vit' | 'food'>('vit');
  const [picked, setPicked] = useState<VitaminKey[]>(['D', 'B12', 'B9']);
  const [foodVit, setFoodVit] = useState<VitaminKey>('B9');
  const toggle = (k: VitaminKey) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : p.length >= 3 ? [...p.slice(1), k] : [...p, k]));

  const foodRank = useMemo(() => FOODS.filter((f) => (f.per100[foodVit] ?? 0) > 0)
    .map((f) => ({ f, s: (f.per100[foodVit]! * f.serving.g) / 100 })).sort((a, b) => b.s - a.s).slice(0, 15), [foodVit]);
  const fv = VIT[foodVit];
  const rec = DRI[foodVit].rec.f19 ?? 1;

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="مقایسه ویتامین‌ها و منابع غذایی" crumbs={[{ to: '/compare', label: 'مقایسه' }]} lede="تا سه ویتامین را کنار هم ببینید یا بهترین منابع غذایی یک ویتامین را بر اساس واحد مصرف رتبه‌بندی کنید.">
        <Seg label="نوع مقایسه" value={mode} onChange={setMode} options={[{ id: 'vit', label: 'ویتامین با ویتامین' }, { id: 'food', label: 'منابع غذایی یک ویتامین' }]} />
      </PageHead>
      <div className="wrap stack">
        {mode === 'vit' ? (
          <>
            <div className="row" style={{ gap: 6 }}>
              {VITAMINS.map((v) => <button key={v.key} className="chip" aria-pressed={picked.includes(v.key)} onClick={() => toggle(v.key)} style={{ direction: 'ltr', minWidth: 44, justifyContent: 'center' }}>{v.shortFa}</button>)}
              <span className="xs muted">حداکثر سه مورد</span>
            </div>
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr><th style={{ width: 170 }}>ویژگی</th>{picked.map((k) => <th key={k}><span className="row" style={{ gap: 8, flexWrap: 'nowrap' }}><VitBadge v={VIT[k]} size={30} />{VIT[k].nameFa}</span></th>)}</tr>
                </thead>
                <tbody>
                  <Row label="حلالیت">{picked.map((k) => <td key={k}><SolChip v={VIT[k]} /></td>)}</Row>
                  <Row label="RDA/AI زن ۱۹–۵۰">{picked.map((k) => <td key={k}>{fa(DRI[k].rec.f19)} <span className="ltr xs">{VIT[k].unit}</span></td>)}</Row>
                  <Row label="RDA/AI مرد ۱۹–۵۰">{picked.map((k) => <td key={k}>{fa(DRI[k].rec.m19)} <span className="ltr xs">{VIT[k].unit}</span></td>)}</Row>
                  <Row label="بارداری">{picked.map((k) => <td key={k}>{fa(DRI[k].rec.p19)}</td>)}</Row>
                  <Row label="UL بزرگسال">{picked.map((k) => <td key={k}>{DRI[k].ul?.m19 ? fa(DRI[k].ul!.m19) : 'تعیین نشده'}<div className="xs muted">{UL_SCOPE_FA[DRI[k].ulScope]}</div></td>)}</Row>
                  <Row label="EFSA بزرگسال (زن)">{picked.map((k) => <td key={k}>{EFSA_ADULT[k].female != null ? `${EFSA_ADULT[k].type} ${fa(EFSA_ADULT[k].female)}` : EFSA_ADULT[k].noteFa}</td>)}</Row>
                  <Row label="نقش‌های اصلی">{picked.map((k) => <td key={k}><ul className="dots small">{VIT[k].functions.slice(0, 3).map((x) => <li key={x}>{x}</li>)}</ul></td>)}</Row>
                  <Row label="گروه‌های پرخطر کمبود">{picked.map((k) => <td key={k}><ul className="dots small">{VIT[k].deficiency.riskGroups.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul></td>)}</Row>
                  <Row label="علائم کمبود">{picked.map((k) => <td key={k}><ul className="dots small">{VIT[k].deficiency.signs.slice(0, 3).map((x) => <li key={x}>{x}</li>)}</ul></td>)}</Row>
                  <Row label="خطر دریافت زیاد">{picked.map((k) => <td key={k} className="small">{VIT[k].toxicity.summary}</td>)}</Row>
                  <Row label="پرونده کامل">{picked.map((k) => <td key={k}><Link to={`/vitamins/${VIT[k].slug}`}>مشاهده پرونده</Link></td>)}</Row>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="panel">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <label className="field" style={{ maxWidth: 260 }}>ویتامین
                <select value={foodVit} onChange={(e) => setFoodVit(e.target.value as VitaminKey)}>
                  {VITAMINS.map((v) => <option key={v.key} value={v.key}>{v.nameFa}</option>)}
                </select>
              </label>
              <p className="small muted" style={{ maxWidth: 420, margin: 0 }}>بر اساس یک واحد مصرف معمول. خط مرجع: مقدار توصیه‌شده زن ۱۹ تا ۵۰ سال = {fa(rec)} {fv.unit}.</p>
            </div>
            <div style={{ marginTop: 16 }}>
              <Bars unit={fv.unit} max={Math.max(rec, ...foodRank.map((x) => x.s))} rows={foodRank.map(({ f, s }) => ({ label: `${f.nameFa} — ${f.serving.labelFa}`, value: s, color: vitColor(fv), to: `/foods?f=${f.id}` }))} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <tr><th scope="row" style={{ position: 'static' }}>{label}</th>{children}</tr>;
}
