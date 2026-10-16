import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { INTERACTIONS } from '../data/interactions';
import { VIT, VITAMINS } from '../data/vitamins';
import type { VitaminKey } from '../data/types';
import { PageHead, Seg, Tone } from '../components/ui';
import { fa, norm, useTitle, vitColor } from '../lib';

const SEV = { major: { t: 'مهم', tone: 'risk' as const }, moderate: { t: 'متوسط', tone: 'warn' as const }, minor: { t: 'خفیف', tone: 'neutral' as const } };
const KIND = { drug: 'دارو', nutrient: 'ماده مغذی', lab: 'آزمایش', condition: 'شرایط' };

export default function Interactions() {
  useTitle('بررسی تداخلات');
  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') ?? '';
  const [vit, setVit] = useState<VitaminKey | 'all'>('all');
  const [kind, setKind] = useState<'all' | 'drug' | 'nutrient' | 'lab' | 'condition'>('all');
  const [sev, setSev] = useState<'all' | 'major'>('all');

  const list = useMemo(() => {
    const n = norm(q);
    const terms = n ? n.split(' ') : [];
    return INTERACTIONS.filter((i) => {
      if (vit !== 'all' && !i.vitamins.includes(vit)) return false;
      if (kind !== 'all' && i.kind !== kind) return false;
      if (sev === 'major' && i.severity !== 'major') return false;
      const hay = norm([i.agentFa, i.agentEn, ...i.keywords, ...i.vitamins.map((k) => VIT[k].nameFa)].join(' '));
      return terms.every((t) => hay.includes(t));
    }).sort((a, b) => ['major', 'moderate', 'minor'].indexOf(a.severity) - ['major', 'moderate', 'minor'].indexOf(b.severity));
  }, [q, vit, kind, sev]);

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="تداخلات ویتامین‌ها با داروها، آزمایش‌ها و مواد مغذی" crumbs={[{ to: '/interactions', label: 'تداخلات' }]}
        lede="نام دارو (فارسی، انگلیسی یا نام تجاری رایج) یا ویتامین را جست‌وجو کنید. هر مورد سازوکار، اقدام پیشنهادی و منبع دارد." />
      <div className="wrap stack">
        <div className="callout warn"><strong>این فهرست جامع نیست</strong>فقط تداخلات شناخته‌شده و بالینی‌مهم آمده است. پیش از شروع یا قطع هر مکمل یا دارو با پزشک یا داروساز مشورت کنید.</div>
        <div className="row" style={{ gap: 12 }}>
          <input type="search" value={q} onChange={(e) => setSp(e.target.value ? { q: e.target.value } : {}, { replace: true })} placeholder="مثلاً: وارفارین، متفورمین، امپرازول، آزمایش تیروئید…" style={{ maxWidth: 420 }} aria-label="جست‌وجوی تداخل" />
          <select value={vit} onChange={(e) => setVit(e.target.value as VitaminKey | 'all')} style={{ maxWidth: 200 }} aria-label="ویتامین">
            <option value="all">همه ویتامین‌ها</option>
            {VITAMINS.map((v) => <option key={v.key} value={v.key}>{v.nameFa}</option>)}
          </select>
          <Seg label="نوع" value={kind} onChange={setKind} options={[{ id: 'all', label: 'همه' }, { id: 'drug', label: 'دارو' }, { id: 'lab', label: 'آزمایش' }, { id: 'nutrient', label: 'مغذی' }, { id: 'condition', label: 'شرایط' }]} />
          <label className="check"><input type="checkbox" checked={sev === 'major'} onChange={(e) => setSev(e.target.checked ? 'major' : 'all')} />فقط تداخلات مهم</label>
        </div>
        <p className="small muted" style={{ margin: 0 }}>{fa(list.length)} مورد</p>
        {list.length === 0 && <div className="panel"><p className="muted" style={{ margin: 0 }}>موردی پیدا نشد. نام ژنریک دارو را امتحان کنید یا فیلترها را بردارید. نبودن یک دارو در این فهرست به معنی نبودن تداخل نیست.</p></div>}
        {list.map((i) => (
          <article key={i.id} className="panel">
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: 'var(--fs-lg)', margin: 0 }}>{i.agentFa}</h2>
                <div className="en small">{i.agentEn}</div>
              </div>
              <div className="row" style={{ gap: 6 }}>
                <Tone tone={SEV[i.severity].tone}>اهمیت: {SEV[i.severity].t}</Tone>
                <span className="chip">{KIND[i.kind]}</span>
                {i.vitamins.map((k) => <Link key={k} to={`/vitamins/${VIT[k].slug}`} className="chip" style={{ background: vitColor(VIT[k]), color: '#fff', border: 0, textDecoration: 'none', direction: 'ltr' }}>{VIT[k].shortFa}</Link>)}
              </div>
            </div>
            <dl className="kv" style={{ marginTop: 14 }}>
              <dt>اثر</dt><dd>{i.effect}</dd>
              <dt>سازوکار</dt><dd>{i.mechanism}</dd>
              <dt>اقدام پیشنهادی</dt><dd>{i.management}</dd>
              <dt>منبع</dt><dd><a href={i.source.url} target="_blank" rel="noopener noreferrer">{i.source.title} <ExternalLink size={12} style={{ verticalAlign: -1 }} /></a> <span className="xs muted">{i.source.org}</span></dd>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
