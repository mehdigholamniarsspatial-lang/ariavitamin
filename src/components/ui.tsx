import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import type { EvidenceLevel, Food, SourceRef, VitaminProfile } from '../data/types';
import { EVIDENCE_LABELS } from '../data/vitamins';
import { FOODS, FOOD_GROUPS } from '../data/foods';
import type { Block } from '../data/articles';
import { fa, norm, vitColor } from '../lib';

export function PageHead({ title, lede, crumbs, children }: { title: string; lede?: ReactNode; crumbs?: { to: string; label: string }[]; children?: ReactNode }) {
  return (
    <div className="page-head wrap">
      {crumbs && (
        <nav className="crumbs" aria-label="مسیر">
          <Link to="/">خانه</Link>
          {crumbs.map((c) => <span key={c.to}> / <Link to={c.to}>{c.label}</Link></span>)}
        </nav>
      )}
      <h1 style={{ fontSize: 'var(--fs-2xl)', maxWidth: '28ch' }}>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </div>
  );
}

export function Tone({ tone, children }: { tone: 'risk' | 'warn' | 'good' | 'over' | 'neutral'; children: ReactNode }) {
  return <span className={`chip tone-${tone}`}>{children}</span>;
}

const EV_TONE: Record<EvidenceLevel, 'good' | 'warn' | 'neutral' | 'over' | 'risk'> = {
  strong: 'good', moderate: 'warn', limited: 'neutral', conflicting: 'over', unproven: 'risk',
};
export function EvidenceChip({ level }: { level: EvidenceLevel }) {
  return <span className={`chip tone-${EV_TONE[level]}`} title={EVIDENCE_LABELS[level].desc}>{EVIDENCE_LABELS[level].fa}</span>;
}

export function SolChip({ v }: { v: VitaminProfile }) {
  return <span className={`chip ${v.solubility}`}>{v.solubility === 'fat' ? 'محلول در چربی' : 'محلول در آب'}</span>;
}

export function VitBadge({ v, size = 40 }: { v: VitaminProfile; size?: number }) {
  return (
    <span aria-hidden style={{ width: size, height: size, borderRadius: size / 3.2, background: vitColor(v), color: '#fff', display: 'inline-grid', placeItems: 'center', fontWeight: 900, fontSize: size * 0.38, direction: 'ltr', flex: 'none' }}>
      {v.shortFa}
    </span>
  );
}

export function SourceList({ sources }: { sources: SourceRef[] }) {
  return (
    <ul className="clean">
      {sources.map((s) => (
        <li key={s.url} className="small">
          <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 650 }}>{s.title} <ExternalLink size={13} style={{ verticalAlign: -2 }} /></a>
          <div className="xs muted">{s.org}</div>
        </li>
      ))}
    </ul>
  );
}

export function Bars({ rows, unit, max }: { rows: { label: ReactNode; value: number; color?: string; to?: string }[]; unit: string; max?: number }) {
  const m = max ?? Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="bars">
      {rows.map((r, i) => (
        <div className="bar-row" key={i}>
          <span className="lbl">{r.to ? <Link to={r.to}>{r.label}</Link> : r.label}</span>
          <span className="track"><span className="fill" style={{ width: `${Math.min(100, (r.value / m) * 100)}%`, background: r.color ?? 'var(--brand)' }} /></span>
          <span className="v">{fa(r.value)} <span className="xs muted">{unit}</span></span>
        </div>
      ))}
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        if (b.t === 'h') return <h2 key={i} style={{ fontSize: 'var(--fs-lg)', marginTop: '1.4em' }}>{b.text}</h2>;
        if (b.t === 'p') return <p key={i}>{b.text}</p>;
        if (b.t === 'list') return <ul key={i} className="dots">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
        if (b.t === 'callout') return <div key={i} className={`callout ${b.tone}`} style={{ margin: '16px 0' }}><strong>{b.title}</strong>{b.text}</div>;
        return (
          <div key={i} className="table-scroll" style={{ margin: '16px 0' }}>
            <table className="data"><thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody></table>
          </div>
        );
      })}
    </div>
  );
}

/** انتخابگر غذا با جست‌وجو و پیمایش صفحه‌کلید */
export function FoodPicker({ onPick, placeholder = 'نام غذا را بنویسید…' }: { onPick: (f: Food) => void; placeholder?: string }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hl, setHl] = useState(0);
  const list = useMemo(() => {
    const n = norm(q);
    return FOODS.filter((f) => !n || norm(f.nameFa + ' ' + f.nameEn + ' ' + FOOD_GROUPS[f.group]).includes(n)).slice(0, 30);
  }, [q]);
  const pick = (f: Food) => { onPick(f); setQ(''); setOpen(false); };
  return (
    <div className="combo">
      <input type="search" value={q} placeholder={placeholder} aria-label="جست‌وجوی غذا"
        onChange={(e) => { setQ(e.target.value); setOpen(true); setHl(0); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setHl((h) => Math.min(h + 1, list.length - 1)); }
          if (e.key === 'ArrowUp') { e.preventDefault(); setHl((h) => Math.max(h - 1, 0)); }
          if (e.key === 'Enter' && list[hl]) { e.preventDefault(); pick(list[hl]); }
        }} />
      {open && list.length > 0 && (
        <div className="combo-list" role="listbox">
          {list.map((f, i) => (
            <button key={f.id} type="button" className={i === hl ? 'hl' : ''} onMouseDown={(e) => { e.preventDefault(); pick(f); }}>
              <span>{f.nameFa}</span><span className="xs muted">{FOOD_GROUPS[f.group]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Seg<T extends string>({ value, options, onChange, label }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>{o.label}</button>)}
    </div>
  );
}
