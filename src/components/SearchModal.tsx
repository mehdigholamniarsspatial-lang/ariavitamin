import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VITAMINS } from '../data/vitamins';
import { FOODS } from '../data/foods';
import { INTERACTIONS } from '../data/interactions';
import { ARTICLES } from '../data/articles';
import { norm, vitColor } from '../lib';

interface Item { to: string; title: string; sub?: string; kind: string; hay: string; badge?: string; color?: string }

const PAGES: Item[] = [
  { to: '/calculator', title: 'ماشین‌حساب دریافت روزانه', kind: 'ابزار', hay: 'ماشین حساب محاسبه دریافت غذا مکمل calculator' },
  { to: '/assessment', title: 'ارزیابی آموزشی وضعیت ویتامین‌ها', kind: 'ابزار', hay: 'ارزیابی کمبود علائم آزمایش غربالگری assessment' },
  { to: '/interactions', title: 'بررسی تداخلات', kind: 'ابزار', hay: 'تداخل دارو interaction' },
  { to: '/compare', title: 'مقایسه ویتامین‌ها و منابع غذایی', kind: 'ابزار', hay: 'مقایسه compare' },
  { to: '/standards', title: 'مقایسه استانداردهای آمریکا و اروپا', kind: 'صفحه', hay: 'استاندارد efsa nasem dri rda pri آمریکا اروپا' },
  { to: '/pro', title: 'پنل تخصصی کارشناسان', kind: 'صفحه', hay: 'پنل کارشناس متخصص پرونده مراجع' },
  { to: '/research', title: 'گزارش پژوهشی و طرح توسعه', kind: 'صفحه', hay: 'گزارش تحقیق سامانه مشابه نقشه راه معماری' },
  { to: '/about', title: 'روش‌شناسی و سلب مسئولیت', kind: 'صفحه', hay: 'روش محاسبه منبع سلب مسئولیت' },
];

export function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const [hl, setHl] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const index = useMemo<Item[]>(() => [
    ...VITAMINS.map((v) => ({ to: `/vitamins/${v.slug}`, title: v.nameFa, sub: v.nameEn, kind: 'ویتامین', badge: v.shortFa, color: vitColor(v), hay: norm([v.nameFa, v.nameEn, v.shortFa, ...v.aliases].join(' ')) })),
    ...FOODS.map((f) => ({ to: `/foods?f=${f.id}`, title: f.nameFa, sub: f.nameEn, kind: 'غذا', hay: norm(f.nameFa + ' ' + f.nameEn) })),
    ...INTERACTIONS.map((i) => ({ to: `/interactions?q=${encodeURIComponent(i.agentFa.split(' ')[0])}`, title: i.agentFa, sub: i.agentEn, kind: 'تداخل', hay: norm([i.agentFa, i.agentEn, ...i.keywords].join(' ')) })),
    ...ARTICLES.map((a) => ({ to: `/learn/${a.slug}`, title: a.title, kind: 'آموزش', hay: norm(a.title + ' ' + a.tags.join(' ')) })),
    ...PAGES.map((p) => ({ ...p, hay: norm(p.title + ' ' + p.hay) })),
  ], []);

  const results = useMemo(() => {
    const n = norm(q);
    if (!n) return index.filter((i) => i.kind === 'ویتامین' || i.kind === 'ابزار');
    const terms = n.split(' ');
    return index
      .map((i) => ({ i, s: terms.every((t) => i.hay.includes(t)) ? (i.hay.startsWith(n) ? 3 : i.kind === 'ویتامین' ? 2 : 1) : 0 }))
      .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 14).map((x) => x.i);
  }, [q, index]);

  useEffect(() => { ref.current?.focus(); const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', onEsc); return () => window.removeEventListener('keydown', onEsc); }, [onClose]);
  useEffect(() => setHl(0), [q]);

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label="جست‌وجو">
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input ref={ref} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="مثلاً: فولات، بارداری، متفورمین، اسفناج…"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setHl((h) => Math.min(h + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setHl((h) => Math.max(h - 1, 0)); }
            if (e.key === 'Enter' && results[hl]) { nav(results[hl].to); onClose(); }
          }} aria-controls="cmdk-list" />
        <ul id="cmdk-list" role="listbox">
          {results.length === 0 && <li className="muted small" style={{ padding: 16 }}>نتیجه‌ای پیدا نشد. نام فارسی، انگلیسی یا نام دیگر ویتامین را امتحان کنید.</li>}
          {results.map((r, i) => (
            <li key={r.kind + r.to + r.title} role="option" aria-selected={i === hl}>
              <Link to={r.to} className={i === hl ? 'hl' : ''} onClick={onClose} onMouseEnter={() => setHl(i)}>
                {r.badge ? <span className="chip" style={{ background: r.color, color: '#fff', border: 0, direction: 'ltr', minWidth: 38, justifyContent: 'center' }}>{r.badge}</span> : null}
                <span>{r.title}{r.sub && <span className="en" style={{ marginInlineStart: 8 }}>{r.sub}</span>}</span>
                <span className="kind">{r.kind}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
