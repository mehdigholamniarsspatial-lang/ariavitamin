import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Printer } from 'lucide-react';
import { LABS, VIT } from '../data/vitamins';
import { MEDS, RISK_FACTORS, SYMPTOMS, TRIAGE_FA, interpretLab, screen, type LabInput, type ScreenInput } from '../engine/screen';
import { PageHead, Tone } from '../components/ui';
import { loadClients, saveClients } from '../store';
import { fa, uid, useLocalState, useTitle, vitColor } from '../lib';

const STEPS = ['عوامل خطر', 'علائم', 'داروها', 'آزمایش‌ها', 'گزارش'];
const EMPTY: ScreenInput = { risks: [], symptoms: [], meds: [], labs: [] };

export default function Assessment() {
  useTitle('ارزیابی آموزشی');
  const [step, setStep] = useState(0);
  const [inp, setInp] = useLocalState<ScreenInput>('vn-screen', EMPTY);
  const [saved, setSaved] = useState('');
  const res = useMemo(() => screen(inp), [inp]);
  const toggle = (field: 'risks' | 'symptoms' | 'meds', id: string) =>
    setInp((s) => ({ ...s, [field]: s[field].includes(id) ? s[field].filter((x) => x !== id) : [...s[field], id] }));
  const groups = [...new Set(RISK_FACTORS.map((r) => r.group))];

  const setLab = (markerId: string, patch: Partial<LabInput>) => setInp((s) => {
    const cur = s.labs.find((l) => l.markerId === markerId) ?? { markerId, value: NaN, unitId: LABS[markerId].units[0].id };
    const next = { ...cur, ...patch };
    const labs = s.labs.filter((l) => l.markerId !== markerId);
    return { ...s, labs: [...labs, next] };
  });

  const clients = loadClients().filter((c) => c.consent);

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="ارزیابی آموزشی وضعیت ویتامین‌ها" crumbs={[{ to: '/assessment', label: 'ارزیابی آموزشی' }]}
        lede="این ابزار عوامل خطر، علائم، داروها و نتایج آزمایش را با اطلاعات علمی مرتبط می‌کند و نشان می‌دهد کدام ویتامین‌ها ارزش بررسی بیشتر دارند. تشخیص نمی‌دهد و دوز درمانی پیشنهاد نمی‌کند." />
      <div className="wrap">
        <div className="callout info" style={{ marginBottom: 20 }}>
          <strong>غربالگری آموزشی، نه تشخیص</strong>
          علائم کمبود ویتامین‌ها غیراختصاصی‌اند و با بسیاری از بیماری‌ها مشترک‌اند. پاسخ‌ها فقط در مرورگر شما ذخیره می‌شوند.
        </div>
        <nav className="steps no-print" aria-label="مراحل ارزیابی">
          {STEPS.map((s, i) => (
            <button key={s} className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined}>
              {fa(i + 1)}. {s}
            </button>
          ))}
        </nav>

        {step === 0 && (
          <div className="panel">
            <h2>کدام موارد درباره شما صدق می‌کند؟</h2>
            {groups.map((g) => (
              <fieldset key={g} style={{ border: 0, padding: 0, margin: '0 0 16px' }}>
                <legend className="small" style={{ fontWeight: 750, color: 'var(--muted)', marginBottom: 4 }}>{g}</legend>
                <div className="grid-2" style={{ gap: 4 }}>
                  {RISK_FACTORS.filter((r) => r.group === g).map((r) => (
                    <label key={r.id} className={`check${inp.risks.includes(r.id) ? ' on' : ''}`}>
                      <input type="checkbox" checked={inp.risks.includes(r.id)} onChange={() => toggle('risks', r.id)} />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="panel">
            <h2>علائمی که در چند هفته اخیر داشته‌اید</h2>
            <p className="small muted">هیچ‌یک از این علائم به‌تنهایی نشانه کمبود ویتامین نیست. موارد هشداردهنده در گزارش برجسته می‌شوند.</p>
            <div className="grid-2" style={{ gap: 4 }}>
              {SYMPTOMS.map((s) => (
                <label key={s.id} className={`check${inp.symptoms.includes(s.id) ? ' on' : ''}`}>
                  <input type="checkbox" checked={inp.symptoms.includes(s.id)} onChange={() => toggle('symptoms', s.id)} />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="panel">
            <h2>داروهایی که به‌طور منظم مصرف می‌کنید</h2>
            <p className="small muted">فقط داروهایی فهرست شده‌اند که تداخل شناخته‌شده با ویتامین‌ها دارند. برای بررسی کامل با داروساز مشورت کنید.</p>
            <div className="grid-2" style={{ gap: 4 }}>
              {MEDS.map((m) => (
                <label key={m.id} className={`check${inp.meds.includes(m.id) ? ' on' : ''}`}>
                  <input type="checkbox" checked={inp.meds.includes(m.id)} onChange={() => toggle('meds', m.id)} />
                  <span>{m.agentFa} <span className="en xs">{m.agentEn}</span></span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="panel">
            <h2>نتایج آزمایش (اختیاری)</h2>
            <p className="small muted">عدد و واحد را دقیقاً از برگه آزمایش وارد کنید. محدوده مرجع آزمایشگاه شما ممکن است متفاوت باشد.</p>
            <div className="stack">
              {Object.values(LABS).map((m) => {
                const cur = inp.labs.find((l) => l.markerId === m.id);
                const r = cur ? interpretLab(cur) : null;
                return (
                  <div key={m.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 1.2fr) 120px 120px minmax(160px, 1fr)', gap: 10, alignItems: 'center' }} className="lab-row">
                    <div><strong className="small">{m.nameFa}</strong><div className="en xs">{m.nameEn}</div></div>
                    <input type="number" min={0} step="any" aria-label={`مقدار ${m.nameFa}`} value={cur && Number.isFinite(cur.value) ? cur.value : ''} onChange={(e) => setLab(m.id, { value: e.target.value === '' ? NaN : +e.target.value })} />
                    <select aria-label="واحد" value={cur?.unitId ?? m.units[0].id} onChange={(e) => setLab(m.id, { unitId: e.target.value })} style={{ direction: 'ltr' }}>
                      {m.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
                    </select>
                    <div>{r ? <Tone tone={r.band.status === 'deficient' ? 'risk' : r.band.status === 'low' ? 'warn' : r.band.status === 'high' ? 'over' : 'good'}>{r.band.labelFa}</Tone> : <span className="xs muted">وارد نشده</span>}</div>
                  </div>
                );
              })}
            </div>
            <style>{`@media (max-width: 720px){ .lab-row{ grid-template-columns: 1fr 1fr !important; } .lab-row > div:first-child{ grid-column: 1 / -1; } }`}</style>
          </div>
        )}

        {step === 4 && (
          <div className="stack">
            <div className={`callout ${res.triage === 'urgent' ? 'risk' : res.triage === 'consult' ? 'warn' : res.triage === 'consider' ? 'info' : 'good'}`} style={{ fontSize: 'var(--fs-md)' }}>
              <strong style={{ fontSize: 'var(--fs-lg)' }}>{TRIAGE_FA[res.triage].label}</strong>
              {TRIAGE_FA[res.triage].desc}
            </div>
            {res.redFlags.length > 0 && (
              <div className="panel" style={{ borderColor: 'var(--risk)' }}>
                <h2 className="row" style={{ color: 'var(--risk)', gap: 8 }}><AlertTriangle size={20} />علائم هشداردهنده</h2>
                <ul className="dots">{res.redFlags.map((f) => <li key={f}>{f}</li>)}</ul>
              </div>
            )}
            <div className="panel">
              <h2>ویتامین‌هایی که ارزش بررسی دارند</h2>
              {res.signals.length === 0 && <p className="muted">موردی ثبت نشده است. به مراحل قبل برگردید یا برای ارزیابی دریافت از <Link to="/calculator">ماشین‌حساب</Link> استفاده کنید.</p>}
              {res.signals.map((s) => {
                const v = VIT[s.key];
                const level = Math.min(5, Math.ceil(s.score / 1.5));
                return (
                  <div className="signal" key={s.key}>
                    <span className="badge-sym" style={{ background: vitColor(v) }}>{v.shortFa}</span>
                    <div>
                      <div className="row" style={{ justifyContent: 'space-between' }}>
                        <Link to={`/vitamins/${v.slug}`} style={{ fontWeight: 750 }}>{v.nameFa}</Link>
                        <span className={`meter${s.score >= 6 ? ' high' : ''}`} aria-label={`شدت نسبی ${fa(level)} از ۵`}>{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= level ? 'on' : ''} />)}</span>
                      </div>
                      {s.lab && <div className="small" style={{ margin: '4px 0' }}>{s.lab.marker}: <strong>{s.lab.value}</strong> — {s.lab.label}</div>}
                      <ul className="dots small muted" style={{ marginTop: 4 }}>{[...new Set(s.reasons)].map((r) => <li key={r}>{r}</li>)}</ul>
                    </div>
                  </div>
                );
              })}
            </div>
            {res.interactions.length > 0 && (
              <div className="panel">
                <h2>تداخلات دارویی مرتبط</h2>
                {res.interactions.map((i) => (
                  <div key={i.id} style={{ padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                    <div className="row" style={{ gap: 8 }}><strong>{i.agentFa}</strong><Tone tone={i.severity === 'major' ? 'risk' : i.severity === 'moderate' ? 'warn' : 'neutral'}>{i.severity === 'major' ? 'مهم' : i.severity === 'moderate' ? 'متوسط' : 'خفیف'}</Tone></div>
                    <p className="small" style={{ margin: '4px 0' }}>{i.effect}</p>
                    <p className="small muted" style={{ margin: 0 }}>اقدام: {i.management}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="panel flat">
              <h3>گام‌های بعدی پیشنهادی</h3>
              <ul className="dots small">
                <li>دریافت غذایی و مکمل‌های خود را با <Link to="/calculator">ماشین‌حساب دریافت</Link> بسنجید.</li>
                <li>این گزارش را چاپ کنید و هنگام مراجعه به پزشک یا کارشناس تغذیه همراه داشته باشید.</li>
                <li>مکمل با دوز درمانی را بدون آزمایش و نظر پزشک شروع نکنید؛ شروع مکمل پیش از آزمایش ممکن است تشخیص را دشوار کند.</li>
              </ul>
              <div className="row no-print" style={{ marginTop: 12 }}>
                <button className="btn small" onClick={() => window.print()}><Printer size={14} />چاپ گزارش</button>
                <button className="btn ghost small" onClick={() => { setInp(EMPTY); setStep(0); }}>پاک کردن پاسخ‌ها</button>
                {clients.length > 0 && (
                  <select style={{ maxWidth: 240, height: 34 }} value="" aria-label="ذخیره در پرونده" onChange={(e) => {
                    const all = loadClients(); const c = all.find((x) => x.id === e.target.value); if (!c) return;
                    c.snapshots.unshift({ id: uid(), date: new Date().toISOString(), kind: 'screen', screen: inp, summary: `${TRIAGE_FA[res.triage].label} — ${res.signals.slice(0, 3).map((s) => VIT[s.key].shortFa).join('، ')}` });
                    saveClients(all); setSaved(c.label);
                  }}>
                    <option value="">ذخیره در پرونده مراجع…</option>
                    {clients.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                )}
                {saved && <span className="small" style={{ color: 'var(--good)' }}>در پرونده «{saved}» ذخیره شد.</span>}
              </div>
            </div>
          </div>
        )}

        <div className="row no-print" style={{ justifyContent: 'space-between', marginTop: 20 }}>
          <button className="btn ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>مرحله قبل</button>
          {step < STEPS.length - 1 && <button className="btn" onClick={() => setStep((s) => s + 1)}>{step === STEPS.length - 2 ? 'دیدن گزارش' : 'مرحله بعد'}</button>}
        </div>
      </div>
    </div>
  );
}
