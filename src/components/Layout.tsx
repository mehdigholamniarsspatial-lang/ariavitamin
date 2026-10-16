import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Calculator, ClipboardList, Menu, Moon, Pill, Scale, Search, Sun, X } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { useLocalState } from '../lib';

export function Logo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="var(--brand)" />
      <rect x="12" y="38" width="40" height="6" rx="3" fill="#2C8C6F" />
      <rect x="12" y="38" width="14" height="6" rx="3" fill="#C9A227" />
      <circle cx="34" cy="41" r="7" fill="#F4F7F5" stroke="var(--brand)" strokeWidth="3" />
      <path d="M22 18c4 8 8 12 10 12s6-4 10-12" fill="none" stroke="#F4F7F5" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export const TOOLS = [
  { to: '/calculator', icon: Calculator, title: 'ماشین‌حساب دریافت', desc: 'دریافت روزانه از غذا و مکمل را با مقادیر مرجع گروه خود مقایسه کنید.' },
  { to: '/assessment', icon: ClipboardList, title: 'ارزیابی آموزشی', desc: 'عوامل خطر، علائم، داروها و آزمایش‌ها را مرور کنید؛ بدون تشخیص.' },
  { to: '/interactions', icon: Pill, title: 'بررسی تداخلات', desc: 'تداخل ویتامین‌ها با داروها، آزمایش‌ها و مواد مغذی دیگر.' },
  { to: '/compare', icon: Scale, title: 'مقایسه', desc: 'ویتامین‌ها، منابع غذایی و استانداردهای آمریکا و اروپا.' },
];

const MAIN = [
  { to: '/vitamins', label: 'دانشنامه' },
  { to: '/foods', label: 'منابع غذایی' },
  { to: '/learn', label: 'آموزش' },
  { to: '/pro', label: 'پنل تخصصی' },
  { to: '/research', label: 'گزارش پژوهشی' },
];

export function Layout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalState<'auto' | 'light' | 'dark'>('vn-theme', 'auto');
  const [menu, setMenu] = useState(false);
  const [tools, setTools] = useState(false);
  const [search, setSearch] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  useEffect(() => { setMenu(false); setTools(false); window.scrollTo(0, 0); }, [loc.pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearch(true); }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  const toolActive = TOOLS.some((t) => loc.pathname.startsWith(t.to));

  return (
    <>
      <a href="#main" className="sr-only">رفتن به محتوای اصلی</a>
      <header className="site-header">
        <div className="wrap header-row">
          <Link to="/" className="brand" aria-label="ویتامین‌نامه — صفحه اصلی"><Logo />ویتامین‌نامه</Link>
          <nav className="nav" aria-label="ناوبری اصلی">
            <NavLink to="/vitamins">دانشنامه</NavLink>
            <div className="dropdown" onMouseLeave={() => setTools(false)}>
              <button className={`navbtn${toolActive ? ' active' : ''}`} aria-expanded={tools} onClick={() => setTools((v) => !v)} onMouseEnter={() => setTools(true)}
                style={toolActive ? { background: 'var(--brand)', color: 'var(--brand-ink)' } : undefined}>ابزارها</button>
              {tools && (
                <div className="dropdown-panel" role="menu">
                  {TOOLS.map((t) => (
                    <Link key={t.to} to={t.to} role="menuitem"><t.icon size={20} style={{ color: 'var(--accent)', flex: 'none', marginTop: 4 }} /><div><strong>{t.title}</strong><span>{t.desc}</span></div></Link>
                  ))}
                </div>
              )}
            </div>
            {MAIN.slice(1).map((m) => <NavLink key={m.to} to={m.to}>{m.label}</NavLink>)}
          </nav>
          <div className="header-tools">
            <button className="search-trigger" onClick={() => setSearch(true)} aria-label="جست‌وجو">
              <Search size={17} /><span className="label">جست‌وجوی ویتامین، غذا یا دارو</span><kbd>Ctrl K</kbd>
            </button>
            <button className="iconbtn" onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label={isDark ? 'حالت روشن' : 'حالت تیره'}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="iconbtn menu-btn" onClick={() => setMenu(true)} aria-label="باز کردن منو"><Menu size={18} /></button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="mobile-sheet" onClick={() => setMenu(false)}>
          <nav onClick={(e) => e.stopPropagation()} aria-label="منوی موبایل">
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <Link to="/" className="brand"><Logo />ویتامین‌نامه</Link>
              <button className="iconbtn" onClick={() => setMenu(false)} aria-label="بستن منو"><X size={18} /></button>
            </div>
            <NavLink to="/" end>صفحه اصلی</NavLink>
            {MAIN.map((m) => <NavLink key={m.to} to={m.to}>{m.label}</NavLink>)}
            <div className="sheet-group">ابزارها</div>
            {TOOLS.map((t) => <NavLink key={t.to} to={t.to}>{t.title}</NavLink>)}
            <NavLink to="/standards">مقایسه استانداردها</NavLink>
            <NavLink to="/about">روش‌شناسی و سلب مسئولیت</NavLink>
          </nav>
        </div>
      )}

      {search && <SearchModal onClose={() => setSearch(false)} />}

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 10 }}><Logo />ویتامین‌نامه</div>
            <p className="prose">
              محتوای این سامانه آموزشی است و جایگزین تشخیص، درمان یا تجویز پزشک و متخصص تغذیه نیست. مقادیر مرجع جمعیتی برای افراد سالم تعیین شده‌اند و دوز درمانی نیستند.
            </p>
            <p className="xs muted">مقادیر مرجع: NASEM (آمریکا) و EFSA (اروپا) — آخرین بازبینی داده‌ها ۲۴ مهر ۱۴۰۵.</p>
          </div>
          <div>
            <strong>بخش‌ها</strong>
            {MAIN.map((m) => <Link key={m.to} to={m.to}>{m.label}</Link>)}
            <Link to="/standards">مقایسه استانداردها</Link>
          </div>
          <div>
            <strong>ابزارها</strong>
            {TOOLS.map((t) => <Link key={t.to} to={t.to}>{t.title}</Link>)}
            <Link to="/about">روش‌شناسی و سلب مسئولیت</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
