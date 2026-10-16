import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Plus, ShieldCheck, Trash2, UserRound } from 'lucide-react';
import { VITAMINS } from '../data/vitamins';
import { PageHead, Seg, Tone } from '../components/ui';
import { INTAKE_KEY, loadClients, saveClients, type Client, type ReviewItem } from '../store';
import { fa, faDate, uid, useLocalState, useTitle } from '../lib';

const REVIEW_SECTIONS = ['مقادیر مرجع', 'منابع غذایی', 'کمبود و ارزیابی', 'سمیت', 'تداخلات', 'سطح شواهد'];

export default function Pro() {
  useTitle('پنل تخصصی');
  const [tab, setTab] = useState<'clients' | 'review'>('clients');
  const [clients, setClientsState] = useState<Client[]>(loadClients);
  const [openId, setOpenId] = useState<string | null>(null);
  const setClients = (c: Client[]) => { setClientsState(c); saveClients(c); };
  const [reviews, setReviews] = useLocalState<ReviewItem[]>('vn-reviews', VITAMINS.flatMap((v) => REVIEW_SECTIONS.map((s) => ({ id: `${v.key}-${s}`, vitamin: v.key, section: s, status: 'pending' as const }))));
  const approved = reviews.filter((r) => r.status === 'approved').length;
  const snaps = clients.reduce((a, c) => a + c.snapshots.length, 0);
  const open = clients.find((c) => c.id === openId);

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="پنل تخصصی کارشناسان تغذیه" crumbs={[{ to: '/pro', label: 'پنل تخصصی' }]}
        lede="مدیریت پرونده مراجعان با رضایت آگاهانه، ذخیره نتایج محاسبه و ارزیابی، و گردش کار بازبینی علمی محتوا." />
      <div className="wrap stack">
        <div className="callout warn">
          <strong>نسخه نمایشی: ذخیره‌سازی محلی</strong>
          در این نسخه همه پرونده‌ها فقط در مرورگر همین دستگاه ذخیره می‌شوند و رمزنگاری سمت سرور، احراز هویت و ثبت دسترسی ندارند. تا راه‌اندازی بک‌اند امن (فاز ۲ نقشه راه) از کد مراجع به‌جای نام و اطلاعات شناسایی استفاده کنید.
        </div>

        <div className="grid-3">
          <Stat label="مراجعان ثبت‌شده" value={fa(clients.length)} />
          <Stat label="نتایج ذخیره‌شده" value={fa(snaps)} />
          <Stat label="بخش‌های بازبینی‌شده" value={`${fa(approved)} از ${fa(reviews.length)}`} bar={approved / reviews.length} />
        </div>

        <Seg label="بخش" value={tab} onChange={setTab} options={[{ id: 'clients', label: 'پرونده مراجعان' }, { id: 'review', label: 'بازبینی علمی محتوا' }]} />

        {tab === 'clients' && (
          <div className="pro-grid">
            <div className="stack">
              <NewClient onAdd={(c) => { setClients([c, ...clients]); setOpenId(c.id); }} />
              <div className="panel" style={{ padding: 0 }}>
                {clients.length === 0 && <p className="small muted" style={{ padding: 18, margin: 0 }}>هنوز مراجعی ثبت نشده است. با فرم بالا اولین پرونده را بسازید.</p>}
                {clients.map((c, i) => (
                  <button key={c.id} onClick={() => setOpenId(c.id)} style={{ all: 'unset', boxSizing: 'border-box', display: 'flex', gap: 12, alignItems: 'center', width: '100%', padding: '12px 18px', cursor: 'pointer', borderTop: i ? '1px solid var(--line)' : 0, background: openId === c.id ? 'var(--surface-2)' : undefined }}>
                    <UserRound size={18} />
                    <span style={{ flex: 1 }}><strong>{c.label}</strong> <span className="xs muted">{c.code}</span><div className="xs muted">{fa(c.snapshots.length)} نتیجه — ثبت {faDate(c.createdAt)}</div></span>
                    {c.consent ? <Tone tone="good">رضایت ثبت شده</Tone> : <Tone tone="risk">بدون رضایت</Tone>}
                  </button>
                ))}
              </div>
            </div>
            {open ? <ClientView c={open} onChange={(nc) => setClients(clients.map((x) => (x.id === nc.id ? nc : x)))} onDelete={() => { setClients(clients.filter((x) => x.id !== open.id)); setOpenId(null); }} />
              : <div className="panel flat"><p className="muted" style={{ margin: 0 }}>یک مراجع را از فهرست انتخاب کنید تا پرونده و نتایج ذخیره‌شده او را ببینید.</p></div>}
          </div>
        )}

        {tab === 'review' && (
          <div className="stack">
            <p className="small muted" style={{ margin: 0 }}>هر بخش از پرونده هر ویتامین پیش از انتشار عمومی باید توسط یک متخصص دارای صلاحیت تأیید شود. وضعیت را تغییر دهید و در صورت نیاز توضیح بنویسید.</p>
            <div className="table-scroll">
              <table className="data">
                <thead><tr><th>ویتامین</th>{REVIEW_SECTIONS.map((s) => <th key={s}>{s}</th>)}</tr></thead>
                <tbody>
                  {VITAMINS.map((v) => (
                    <tr key={v.key}>
                      <td><Link to={`/vitamins/${v.slug}`} style={{ fontWeight: 700 }}>{v.nameFa}</Link></td>
                      {REVIEW_SECTIONS.map((s) => {
                        const r = reviews.find((x) => x.id === `${v.key}-${s}`)!;
                        return (
                          <td key={s}>
                            <select aria-label={`${v.nameFa} — ${s}`} value={r?.status ?? 'pending'} style={{ height: 32, fontSize: 12, padding: '0 6px', color: r?.status === 'approved' ? 'var(--good)' : r?.status === 'changes' ? 'var(--risk)' : undefined }}
                              onChange={(e) => setReviews(reviews.map((x) => (x.id === r.id ? { ...x, status: e.target.value as ReviewItem['status'], date: new Date().toISOString() } : x)))}>
                              <option value="pending">در انتظار</option><option value="approved">تأیید شد</option><option value="changes">نیاز به اصلاح</option>
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, bar }: { label: string; value: string; bar?: number }) {
  return (
    <div className="panel">
      <div className="small muted">{label}</div>
      <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 850 }}>{value}</div>
      {bar != null && <div className="sources-split"><i style={{ width: `${bar * 100}%`, background: 'var(--good)' }} /></div>}
    </div>
  );
}

function NewClient({ onAdd }: { onAdd: (c: Client) => void }) {
  const [label, setLabel] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('female');
  const [birthYear, setBirthYear] = useState('');
  const [consent, setConsent] = useState(false);
  const can = label.trim() && consent;
  return (
    <form className="panel" onSubmit={(e) => {
      e.preventDefault(); if (!can) return;
      const now = new Date().toISOString();
      onAdd({ id: uid(), code: 'C-' + uid().slice(0, 5).toUpperCase(), label: label.trim(), sex, birthYear: birthYear ? +birthYear : undefined, consent: true, consentDate: now, createdAt: now, notes: '', snapshots: [] });
      setLabel(''); setBirthYear(''); setConsent(false);
    }}>
      <h3>مراجع جدید</h3>
      <div className="stack" style={{ gap: 10 }}>
        <label className="field">برچسب (ترجیحاً نام مستعار یا حروف اول)<input type="text" value={label} onChange={(e) => setLabel(e.target.value)} /></label>
        <div className="grid-2" style={{ gap: 10 }}>
          <label className="field">جنس<select value={sex} onChange={(e) => setSex(e.target.value as 'male' | 'female')}><option value="female">زن</option><option value="male">مرد</option></select></label>
          <label className="field">سال تولد (میلادی، اختیاری)<input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} /></label>
        </div>
        <label className={`check${consent ? ' on' : ''}`}><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span className="small">مراجع به‌طور آگاهانه با ثبت و نگهداری اطلاعات تغذیه‌ای خود برای ارزیابی توسط کارشناس موافقت کرده و می‌داند می‌تواند هر زمان درخواست حذف دهد.</span></label>
        <button className="btn" disabled={!can}><Plus size={16} />ساخت پرونده</button>
        {!consent && label && <p className="xs" style={{ color: 'var(--risk)', margin: 0 }}>بدون ثبت رضایت آگاهانه نمی‌توان پرونده ساخت.</p>}
      </div>
    </form>
  );
}

function ClientView({ c, onChange, onDelete }: { c: Client; onChange: (c: Client) => void; onDelete: () => void }) {
  const nav = useNavigate();
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(c, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${c.code}.json`; a.click(); URL.revokeObjectURL(a.href);
  };
  return (
    <div className="panel stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0 }}>{c.label}</h2>
          <div className="xs muted">کد {c.code} — {c.sex === 'female' ? 'زن' : 'مرد'}{c.birthYear ? ` — متولد ${fa(c.birthYear, 0).replace(/٬/g, '')}` : ''}</div>
        </div>
        <div className="row" style={{ gap: 6 }}>
          <button className="btn ghost small" onClick={exportJson}><Download size={14} />خروجی JSON</button>
          <button className="btn danger small" onClick={() => { if (confirm('پرونده و همه نتایج آن برای همیشه حذف شود؟')) onDelete(); }}><Trash2 size={14} />حذف پرونده</button>
        </div>
      </div>
      <div className="callout good"><strong className="row" style={{ gap: 6 }}><ShieldCheck size={16} />رضایت آگاهانه</strong>ثبت‌شده در {c.consentDate ? faDate(c.consentDate) : '—'}. حذف پرونده تمام داده‌های این مراجع را از این دستگاه پاک می‌کند.</div>
      <label className="field">یادداشت‌های کارشناس<textarea value={c.notes} onChange={(e) => onChange({ ...c, notes: e.target.value })} placeholder="مثلاً: سابقه جراحی چاقی ۱۴۰۲، پیگیری B12 پس از ۳ ماه…" /></label>
      <div>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0 }}>نتایج ذخیره‌شده</h3>
          <div className="row" style={{ gap: 6 }}>
            <Link className="btn ghost small" to="/calculator">محاسبه جدید</Link>
            <Link className="btn ghost small" to="/assessment">ارزیابی جدید</Link>
          </div>
        </div>
        {c.snapshots.length === 0 && <p className="small muted">هنوز نتیجه‌ای ذخیره نشده است. در ماشین‌حساب یا ارزیابی، گزینه «ذخیره در پرونده مراجع» را انتخاب کنید.</p>}
        {c.snapshots.map((s) => (
          <div key={s.id} className="entry" style={{ gridTemplateColumns: '1fr auto' }}>
            <div><strong className="small">{s.kind === 'intake' ? 'محاسبه دریافت' : 'ارزیابی آموزشی'}</strong> <span className="xs muted">{faDate(s.date)}</span><div className="xs muted">{s.summary}</div></div>
            <div className="row" style={{ gap: 4 }}>
              {s.intake && <button className="btn ghost small" onClick={() => { try { localStorage.setItem(INTAKE_KEY, JSON.stringify(s.intake)); } catch { /* */ } nav('/calculator'); }}>باز کردن</button>}
              {s.screen && <button className="btn ghost small" onClick={() => { try { localStorage.setItem('vn-screen', JSON.stringify(s.screen)); } catch { /* */ } nav('/assessment'); }}>باز کردن</button>}
              <button className="iconbtn" style={{ width: 32, height: 32 }} aria-label="حذف نتیجه" onClick={() => onChange({ ...c, snapshots: c.snapshots.filter((x) => x.id !== s.id) })}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

