import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Printer, RotateCcw, Save, Trash2 } from 'lucide-react';
import { VIT, VITAMINS } from '../data/vitamins';
import { FOOD_BY_ID } from '../data/foods';
import { STAGE_LABELS } from '../data/dri';
import { SUPPLEMENT_PRESETS } from '../data/presets';
import type { VitaminKey } from '../data/types';
import { ADEQUACY_FA, SAFETY_FA, calculate, type Supplement, type VitaminResult } from '../engine/calc';
import { bmi } from '../engine/lifestage';
import { FREQUENCIES, SUP_UNITS } from '../engine/units';
import { Ruler } from '../components/Ruler';
import { FoodPicker, PageHead, Seg, Tone } from '../components/ui';
import { DEFAULT_INTAKE, INTAKE_KEY, loadClients, saveClients, type IntakeState } from '../store';
import { fa, uid, useLocalState, useTitle, vitColor } from '../lib';

export default function Calculator() {
  useTitle('ماشین‌حساب دریافت روزانه');
  const [st, setSt] = useLocalState<IntakeState>(INTAKE_KEY, DEFAULT_INTAKE);
  const [filter, setFilter] = useState<'all' | 'attention'>('all');
  const [showEfsa, setShowEfsa] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const p = st.profile;
  const set = (patch: Partial<IntakeState>) => setSt((s) => ({ ...s, ...patch }));
  const setP = (patch: Partial<IntakeState['profile']>) => setSt((s) => ({ ...s, profile: { ...s.profile, ...patch } }));

  const res = useMemo(() => calculate(st), [st]);
  const b = bmi(p);
  const attention = res.results.filter((r) => r.adequacy === 'below-ear' || r.adequacy === 'ear-rda' || r.safety === 'above-ul' || r.safety === 'near-ul');
  const shown = filter === 'all' ? res.results : attention;
  const empty = st.foods.length === 0 && st.supplements.length === 0;

  const addFood = (id: string) => set({ foods: [...st.foods, { uid: uid(), foodId: id, grams: FOOD_BY_ID[id].serving.g }] });
  const addSup = (s: Omit<Supplement, 'uid'>) => set({ supplements: [...st.supplements, { ...s, uid: uid(), items: s.items.map((i) => ({ ...i })) }] });
  const updSup = (u: string, patch: Partial<Supplement>) => set({ supplements: st.supplements.map((s) => (s.uid === u ? { ...s, ...patch } : s)) });

  const clients = loadClients();
  const saveTo = (cid: string) => {
    const all = loadClients();
    const c = all.find((x) => x.id === cid);
    if (!c) return;
    c.snapshots.unshift({ id: uid(), date: new Date().toISOString(), kind: 'intake', intake: st, summary: `${fa(attention.length)} مورد نیازمند توجه از ۱۳ ویتامین — ${STAGE_LABELS[res.stage]}` });
    saveClients(all);
    setSaved(c.label);
  };

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="ماشین‌حساب دریافت روزانه ویتامین‌ها" crumbs={[{ to: '/calculator', label: 'ماشین‌حساب' }]}
        lede="غذاها و مکمل‌های یک روز معمول (یا میانگین چند روز) را وارد کنید. نتیجه با مقادیر مرجع گروه سنی و فیزیولوژیک شما مقایسه می‌شود و احتمال کفایت و خطر دریافت بیش از حد را نشان می‌دهد." />
      <div className="wrap calc-layout">
        <aside className="calc-side">
          <a href="#results" className="btn small ghost mobile-only">رفتن به نتیجه</a>
          <div className="panel">
            <h2 style={{ fontSize: 'var(--fs-lg)' }}>مشخصات</h2>
            <div className="stack" style={{ gap: 12 }}>
              <div className="grid-2" style={{ gap: 10 }}>
                <label className="field">سن (سال)
                  <input type="number" min={0} max={120} step={0.1} value={p.ageYears} onChange={(e) => setP({ ageYears: +e.target.value })} />
                </label>
                <label className="field">جنس
                  <select value={p.sex} onChange={(e) => setP({ sex: e.target.value as 'male' | 'female', status: e.target.value === 'male' ? 'none' : p.status })}>
                    <option value="female">زن</option><option value="male">مرد</option>
                  </select>
                </label>
              </div>
              {p.sex === 'female' && p.ageYears >= 12 && (
                <div>
                  <div className="small" style={{ fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>وضعیت</div>
                  <Seg label="وضعیت فیزیولوژیک" value={p.status} onChange={(v) => setP({ status: v })} options={[{ id: 'none', label: 'هیچ‌کدام' }, { id: 'pregnant', label: 'بارداری' }, { id: 'lactating', label: 'شیردهی' }]} />
                </div>
              )}
              <label className="check"><input type="checkbox" checked={p.smoker} onChange={(e) => setP({ smoker: e.target.checked })} />سیگار می‌کشم</label>
              <label className="field">داده‌ها میانگین چند روز است؟
                <select value={st.days} onChange={(e) => set({ days: +e.target.value })}>
                  <option value={1}>یک روز (یادآمد ۲۴ ساعته)</option>
                  <option value={2}>میانگین ۲ روز</option><option value={3}>میانگین ۳ روز</option>
                  <option value={7}>میانگین ۷ روز</option>
                </select>
              </label>
              <details className="disclosure">
                <summary>قد و وزن (اختیاری)</summary>
                <div className="stack" style={{ gap: 10 }}>
                  <div className="grid-2" style={{ gap: 10 }}>
                    <label className="field">وزن (کیلوگرم)<input type="number" min={0} value={p.weightKg ?? ''} onChange={(e) => setP({ weightKg: e.target.value ? +e.target.value : undefined })} /></label>
                    <label className="field">قد (سانتی‌متر)<input type="number" min={0} value={p.heightCm ?? ''} onChange={(e) => setP({ heightCm: e.target.value ? +e.target.value : undefined })} /></label>
                  </div>
                  {b && <p className="small" style={{ margin: 0 }}>BMI: <strong>{fa(b)}</strong>{b >= 30 && ' — چاقی با سطح پایین‌تر ویتامین D همراه است؛ در ارزیابی آموزشی لحاظ می‌شود.'}</p>}
                  <p className="xs muted" style={{ margin: 0 }}>وزن در انتخاب مقادیر مرجع ویتامین‌ها نقشی ندارد؛ فقط برای شاخص‌های کمکی نمایش داده می‌شود.</p>
                </div>
              </details>
              <div className="callout info"><strong>گروه مرجع شما</strong>{STAGE_LABELS[res.stage]} — NASEM</div>
              {res.warnings.map((w) => <div key={w} className="callout warn">{w}</div>)}
            </div>
          </div>

          <div className="panel">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 'var(--fs-lg)', margin: 0 }}>غذاها</h2>
              <span className="xs muted">{fa(st.foods.length)} قلم</span>
            </div>
            <div style={{ margin: '12px 0' }}><FoodPicker onPick={(f) => addFood(f.id)} /></div>
            {st.foods.length === 0 && <p className="small muted" style={{ margin: 0 }}>غذایی اضافه نشده است. نام غذا را جست‌وجو کنید؛ مقدار پیش‌فرض یک واحد مصرف است و قابل تغییر است.</p>}
            {st.foods.map((fe) => {
              const f = FOOD_BY_ID[fe.foodId];
              if (!f) return null;
              return (
                <div className="entry" key={fe.uid}>
                  <div><div>{f.nameFa}</div><div className="xs muted">{f.serving.labelFa}</div></div>
                  <label className="sr-only" htmlFor={`g-${fe.uid}`}>گرم</label>
                  <div className="row" style={{ gap: 4, flexWrap: 'nowrap' }}>
                    <input id={`g-${fe.uid}`} type="number" min={0} value={fe.grams} onChange={(e) => set({ foods: st.foods.map((x) => (x.uid === fe.uid ? { ...x, grams: +e.target.value } : x)) })} style={{ height: 34, padding: '0 8px' }} />
                    <span className="xs muted">گرم</span>
                  </div>
                  <button className="iconbtn" style={{ width: 32, height: 32 }} onClick={() => set({ foods: st.foods.filter((x) => x.uid !== fe.uid) })} aria-label={`حذف ${f.nameFa}`}><Trash2 size={15} /></button>
                </div>
              );
            })}
          </div>

          <div className="panel">
            <h2 style={{ fontSize: 'var(--fs-lg)' }}>مکمل‌ها</h2>
            <label className="field">افزودن از نمونه‌ها
              <select value="" onChange={(e) => { const p = SUPPLEMENT_PRESETS[+e.target.value]; if (p) addSup(p); }}>
                <option value="">انتخاب کنید…</option>
                {SUPPLEMENT_PRESETS.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
              </select>
            </label>
            <button className="btn ghost small" style={{ marginTop: 10 }} onClick={() => addSup({ name: 'مکمل من', frequency: 'daily', items: [{ key: 'D', amount: 0, unitId: 'iu' }] })}><Plus size={15} />مکمل دلخواه از روی برچسب</button>
            <div className="stack" style={{ gap: 12, marginTop: 14 }}>
              {st.supplements.map((s) => (
                <div key={s.uid} className="panel flat" style={{ padding: 14, background: 'var(--surface-2)' }}>
                  <div className="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
                    <input type="text" value={s.name} onChange={(e) => updSup(s.uid, { name: e.target.value })} aria-label="نام مکمل" style={{ height: 34 }} />
                    <button className="iconbtn" style={{ width: 32, height: 32, flex: 'none' }} onClick={() => set({ supplements: st.supplements.filter((x) => x.uid !== s.uid) })} aria-label="حذف مکمل"><Trash2 size={15} /></button>
                  </div>
                  <select value={s.frequency} onChange={(e) => updSup(s.uid, { frequency: e.target.value as Supplement['frequency'] })} style={{ height: 34, marginTop: 8 }} aria-label="دفعات مصرف">
                    {FREQUENCIES.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
                  </select>
                  {s.items.map((it, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1.4fr 28px', gap: 6, marginTop: 8, alignItems: 'center' }}>
                      <select value={it.key} aria-label="ویتامین" style={{ height: 34, padding: '0 6px', direction: 'ltr' }}
                        onChange={(e) => { const k = e.target.value as VitaminKey; const items = [...s.items]; items[i] = { key: k, amount: it.amount, unitId: SUP_UNITS[k][0].id }; updSup(s.uid, { items }); }}>
                        {VITAMINS.map((v) => <option key={v.key} value={v.key}>{v.shortFa}</option>)}
                      </select>
                      <input type="number" min={0} value={it.amount} aria-label="مقدار" style={{ height: 34, padding: '0 8px' }}
                        onChange={(e) => { const items = [...s.items]; items[i] = { ...it, amount: +e.target.value }; updSup(s.uid, { items }); }} />
                      <select value={it.unitId} aria-label="واحد" style={{ height: 34, padding: '0 6px', fontSize: 12 }}
                        onChange={(e) => { const items = [...s.items]; items[i] = { ...it, unitId: e.target.value }; updSup(s.uid, { items }); }}>
                        {SUP_UNITS[it.key].map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
                      </select>
                      <button className="iconbtn" style={{ width: 28, height: 28 }} aria-label="حذف ردیف" onClick={() => updSup(s.uid, { items: s.items.filter((_, j) => j !== i) })}>×</button>
                    </div>
                  ))}
                  <button className="btn ghost small" style={{ marginTop: 8 }} onClick={() => updSup(s.uid, { items: [...s.items, { key: 'C', amount: 0, unitId: 'mg' }] })}><Plus size={14} />ردیف ویتامین</button>
                </div>
              ))}
            </div>
          </div>
          <div className="row no-print">
            <button className="btn ghost small" onClick={() => setSt(DEFAULT_INTAKE)}><RotateCcw size={14} />شروع دوباره</button>
            <button className="btn ghost small" onClick={() => window.print()}><Printer size={14} />چاپ گزارش</button>
          </div>
        </aside>

        <section aria-live="polite" id="results" style={{ scrollMarginTop: 80 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h2 style={{ margin: 0 }}>نتیجه</h2>
              <p className="small muted" style={{ margin: 0 }}>
                {empty ? 'غذا یا مکملی وارد نشده است.' : `${fa(attention.length)} مورد از ۱۳ ویتامین نیازمند توجه است.`}
              </p>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <Seg label="فیلتر نتایج" value={filter} onChange={setFilter} options={[{ id: 'all', label: 'همه' }, { id: 'attention', label: `نیازمند توجه (${fa(attention.length)})` }]} />
              {p.ageYears >= 18 && <label className="check" style={{ padding: '4px 8px' }}><input type="checkbox" checked={showEfsa} onChange={(e) => setShowEfsa(e.target.checked)} />نمایش EFSA</label>}
            </div>
          </div>

          <div className="legend" style={{ marginBottom: 10 }}>
            <span><i style={{ background: 'var(--risk-bg)', border: '1px solid var(--risk)' }} />کمتر از EAR</span>
            <span><i style={{ background: 'var(--warn-bg)' }} />بین EAR و RDA</span>
            <span><i style={{ background: 'var(--good-bg)' }} />محدوده توصیه‌شده</span>
            <span><i style={{ background: 'var(--neutral-bg)' }} />کمتر از AI</span>
            <span><i style={{ background: 'var(--over-bg)', border: '1px solid var(--over)' }} />بالاتر از UL</span>
          </div>

          {empty ? (
            <div className="panel empty-state">
              <h3 style={{ margin: 0 }}>هنوز چیزی برای سنجش وارد نشده است</h3>
              <p>از ستون کناری غذاهای یک روز معمول و مکمل‌هایتان را اضافه کنید. برای دیدن نمونه، یک روز غذایی نمونه را بارگذاری کنید.</p>
              <button className="btn" onClick={() => set({ foods: SAMPLE_DAY.map(([id, g]) => ({ uid: uid(), foodId: id, grams: g })) })}>بارگذاری روز نمونه</button>
            </div>
          ) : (
          <div className="panel" style={{ padding: 0 }}>
            {shown.length === 0 && <p className="muted" style={{ padding: 18, margin: 0 }}>موردی نیازمند توجه نیست.</p>}
            {shown.map((r) => <ResultRow key={r.key} r={r} showEfsa={showEfsa} />)}
          </div>
          )}

          {clients.length > 0 && (
            <div className="panel flat no-print" style={{ marginTop: 16 }}>
              <div className="row">
                <Save size={18} />
                <span className="small">ذخیره این محاسبه در پرونده مراجع:</span>
                <select style={{ maxWidth: 260 }} value="" onChange={(e) => e.target.value && saveTo(e.target.value)} aria-label="انتخاب مراجع">
                  <option value="">انتخاب مراجع…</option>
                  {clients.filter((c) => c.consent).map((c) => <option key={c.id} value={c.id}>{c.label} ({c.code})</option>)}
                </select>
                {saved && <span className="small" style={{ color: 'var(--good)' }}>در پرونده «{saved}» ذخیره شد.</span>}
              </div>
            </div>
          )}

          <details className="disclosure" style={{ marginTop: 16 }}>
            <summary>روش محاسبه و محدودیت‌ها</summary>
            <div className="prose">
              <ol>
                <li>گروه مرجع از روی سن، جنس و بارداری یا شیردهی از جداول NASEM انتخاب می‌شود. وزن در این انتخاب نقشی ندارد.</li>
                <li>دریافت هر ویتامین = مجموع (مقدار در ۱۰۰ گرم × گرم مصرفی ÷ ۱۰۰) برای غذاها + میانگین روزانه مکمل‌ها پس از تبدیل واحد (IU به میکروگرم، اسید فولیک به DFE و…).</li>
                <li>برای مقایسه با UL فقط منابعی شمرده می‌شوند که UL برای آن‌ها تعریف شده است (مثلاً فقط رتینول برای ویتامین A، فقط اسید فولیک برای فولات).</li>
                <li>«احتمال کفایت» با روش پیشنهادی IOM (۲۰۰۰) برآورد می‌شود: <span className="ltr">z = (دریافت − EAR) ÷ √(SD نیاز² + SD درون‌فردی² ÷ n)</span>. ضریب تغییرات نیاز ۱۰٪ (ویتامین A ۲۰٪ و نیاسین ۱۵٪) و تغییرات روزبه‌روز با ضرایب فرضی تقریبی لحاظ شده‌اند. این عدد برآوردی است و با افزایش روزهای ثبت دقیق‌تر می‌شود.</li>
                <li>برای ویتامین‌هایی که فقط AI دارند، دریافت کمتر از AI قابل تفسیر به کمبود نیست.</li>
                <li>داده‌های غذایی نسخه فعلی نمونه و تقریبی‌اند؛ دریافت یک روز نماینده دریافت معمول نیست.</li>
              </ol>
              <p>این نتایج تشخیص پزشکی نیستند. برای ارزیابی بالینی <Link to="/assessment">ارزیابی آموزشی</Link> را ببینید یا با متخصص مشورت کنید.</p>
            </div>
          </details>
        </section>
      </div>
    </div>
  );
}

const SAMPLE_DAY: [string, number][] = [
  ['egg', 100], ['ww-bread', 64], ['feta', 30], ['tomato', 123], ['chicken-breast', 120], ['rice', 158],
  ['parsley', 15], ['yogurt', 170], ['orange', 140], ['lentils', 99], ['walnut', 14], ['milk', 244],
];

const confFa = { low: 'اطمینان پایین (یک روز)', moderate: 'اطمینان متوسط', higher: 'اطمینان بالاتر' };

function ResultRow({ r, showEfsa }: { r: VitaminResult; showEfsa: boolean }) {
  const v = VIT[r.key];
  const a = ADEQUACY_FA[r.adequacy];
  const s = SAFETY_FA[r.safety];
  const t = r.intake.total || 1;
  return (
    <div className="result-row">
      <div>
        <Link to={`/vitamins/${v.slug}`} className="name" style={{ textDecoration: 'none' }}>
          <span aria-hidden style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: vitColor(v), marginInlineEnd: 8 }} />
          {v.nameFa}
        </Link>
        <div className="xs muted">{fa(r.intake.total)} <span className="ltr">{v.unit}</span> {r.pctRec != null && `— ${fa(r.pctRec)}٪ ${r.recType}`}</div>
        <div className="sources-split" title="سهم غذا / غنی‌شده / مکمل">
          <i style={{ width: `${(r.intake.food / t) * 100}%`, background: 'var(--good)' }} />
          <i style={{ width: `${(r.intake.fortified / t) * 100}%`, background: 'var(--water)' }} />
          <i style={{ width: `${(r.intake.supplement / t) * 100}%`, background: 'var(--accent)' }} />
        </div>
      </div>
      <Ruler compact value={r.intake.total} ear={r.ear} rec={r.rec} recType={r.recType} ul={r.ul} unit={v.unit} label={v.nameFa} />
      <div className="verdicts">
        <Tone tone={a.tone}>{a.label}</Tone>
        {r.safety !== 'no-ul' && r.safety !== 'ok' && <Tone tone={r.safety === 'above-ul' ? 'over' : 'warn'}>{s.label}{r.pctUl != null && ` (${fa(r.pctUl)}٪)`}</Tone>}
        {r.probAdequacy != null && <span className="xs muted">احتمال کفایت ≈ {fa(Math.round(r.probAdequacy * 100))}٪ — {confFa[r.confidence]}</span>}
        {showEfsa && r.efsa && <span className="xs muted">EFSA: {r.efsa.value != null ? `${r.efsa.type} ${fa(r.efsa.value)}` : r.efsa.note}{r.efsa.ul != null ? ` / UL ${fa(r.efsa.ul)}` : ''}</span>}
      </div>
      {r.notes.length > 0 && (
        <div style={{ gridColumn: '1 / -1' }} className="xs muted">
          {r.intake.supplement > 0 && <span>غذا {fa(r.intake.food + r.intake.fortified)} + مکمل {fa(r.intake.supplement)} (میانگین روزانه). </span>}
          {r.notes.join(' ')}
        </div>
      )}
    </div>
  );
}
