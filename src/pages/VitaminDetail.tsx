import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bySlug, LABS, VITAMINS } from '../data/vitamins';
import { DRI, EFSA_ADULT, STAGE_GROUPS, STAGE_LABELS, UL_SCOPE_FA, recTypeFor } from '../data/dri';
import { FOODS } from '../data/foods';
import { INTERACTIONS } from '../data/interactions';
import { Bars, EvidenceChip, SolChip, SourceList, Tone } from '../components/ui';
import { fa, faDate, useTitle, vitColor } from '../lib';
import NotFound from './NotFound';

const SECTIONS = [
  ['intro', 'معرفی و اشکال'], ['function', 'نقش در بدن'], ['metabolism', 'جذب و متابولیسم'], ['foods', 'منابع غذایی'],
  ['dri', 'مقادیر مرجع'], ['deficiency', 'کمبود و ارزیابی'], ['toxicity', 'دریافت بیش از حد'], ['clinical', 'شرایط بالینی'],
  ['interactions', 'تداخلات'], ['supply', 'تأمین نیاز و مکمل‌ها'], ['evidence', 'سطح شواهد'], ['sources', 'منابع و بازبینی'],
] as const;

const CONF = { high: { t: 'اطمینان بالا', tone: 'good' as const }, moderate: { t: 'اطمینان متوسط', tone: 'warn' as const }, low: { t: 'اطمینان پایین', tone: 'risk' as const } };

export default function VitaminDetail() {
  const { slug = '' } = useParams();
  const v = bySlug(slug);
  useTitle(v?.nameFa ?? 'یافت نشد');
  const [active, setActive] = useState('intro');
  const [per, setPer] = useState<'serving' | '100'>('serving');

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      const vis = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: '-90px 0px -65% 0px' });
    document.querySelectorAll('.dossier section[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [slug]);

  const foods = useMemo(() => {
    if (!v) return [];
    return FOODS.filter((f) => (f.per100[v.key] ?? 0) > 0)
      .map((f) => ({ f, value: per === 'serving' ? (f.per100[v.key]! * f.serving.g) / 100 : f.per100[v.key]! }))
      .sort((a, b) => b.value - a.value).slice(0, 12);
  }, [v, per]);

  if (!v) return <NotFound />;
  const d = DRI[v.key];
  const e = EFSA_ADULT[v.key];
  const color = vitColor(v);
  const inter = INTERACTIONS.filter((i) => i.vitamins.includes(v.key));
  const idx = VITAMINS.findIndex((x) => x.key === v.key);
  const prev = VITAMINS[idx - 1], next = VITAMINS[idx + 1];

  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <nav className="crumbs" style={{ paddingTop: 28 }} aria-label="مسیر"><Link to="/">خانه</Link> / <Link to="/vitamins">دانشنامه</Link> / <span>{v.nameFa}</span></nav>
      <header className="dossier-head">
        <div className="big-sym" style={{ background: color }}>{v.shortFa}</div>
        <div>
          <h1 style={{ fontSize: 'var(--fs-2xl)', marginBottom: 4 }}>{v.nameFa}</h1>
          <div className="en" style={{ fontSize: 'var(--fs-md)' }}>{v.nameEn}</div>
          <div className="row" style={{ marginTop: 10, gap: 8 }}>
            <SolChip v={v} />
            <span className="chip">واحد مرجع: <span className="ltr">{v.unit}</span></span>
            <Tone tone={CONF[v.confidence].tone}>{CONF[v.confidence].t}</Tone>
            <span className="chip">بازبینی: {faDate(v.lastReviewed)}</span>
          </div>
        </div>
      </header>
      <p className="prose" style={{ fontSize: 'var(--fs-lg)', color: 'var(--ink-2)' }}>{v.summary}</p>

      <div className="dossier" style={{ marginTop: 24 }}>
        <nav className="toc" aria-label="فهرست بخش‌ها">
          {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={(ev) => { ev.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}>{label}</a>)}
          <hr className="divider" style={{ margin: '12px 0' }} />
          <Link to={`/calculator`} className="btn small ghost">محاسبه دریافت من</Link>
        </nav>

        <article>
          <section id="intro">
            <h2>معرفی و اشکال</h2>
            <dl className="kv">
              <dt>طبقه‌بندی</dt><dd>{v.classification}</dd>
              <dt>نام‌های دیگر</dt><dd>{v.aliases.join('، ')}</dd>
              {v.unitNote && (<><dt>واحد و تبدیل</dt><dd>{v.unitNote}</dd></>)}
            </dl>
            <h3 style={{ marginTop: 20 }}>اشکال شیمیایی و زیست‌فعال</h3>
            <ul className="clean">{v.forms.map((f) => <li key={f.name}><strong>{f.name}</strong><div className="small muted">{f.note}</div></li>)}</ul>
          </section>

          <section id="function">
            <h2>نقش در بدن</h2>
            <ul className="dots prose">{v.functions.map((x) => <li key={x}>{x}</li>)}</ul>
          </section>

          <section id="metabolism">
            <h2>جذب، انتقال، ذخیره و دفع</h2>
            <dl className="kv">
              <dt>جذب</dt><dd>{v.metabolism.absorption}</dd>
              <dt>انتقال</dt><dd>{v.metabolism.transport}</dd>
              <dt>ذخیره</dt><dd>{v.metabolism.storage}</dd>
              <dt>دفع</dt><dd>{v.metabolism.excretion}</dd>
            </dl>
          </section>

          <section id="foods">
            <div className="section-head">
              <h2>منابع غذایی</h2>
              <div className="seg" role="group" aria-label="مبنای مقایسه">
                <button aria-pressed={per === 'serving'} onClick={() => setPer('serving')}>هر واحد مصرف</button>
                <button aria-pressed={per === '100'} onClick={() => setPer('100')}>هر ۱۰۰ گرم</button>
              </div>
            </div>
            {foods.length ? (
              <Bars unit={v.unit} rows={foods.map(({ f, value }) => ({ label: per === 'serving' ? `${f.nameFa} — ${f.serving.labelFa}` : f.nameFa, value, color, to: `/foods?f=${f.id}` }))} />
            ) : <p className="muted">داده غذایی برای این ویتامین در مجموعه فعلی کافی نیست.</p>}
            {d.rec.f19 != null && <p className="xs muted" style={{ marginTop: 10 }}>برای مقایسه: مقدار توصیه‌شده برای زن بزرگسال {fa(d.rec.f19)} و مرد بزرگسال {fa(d.rec.m19)} {v.unit} است. داده‌ها تقریبی و از USDA FoodData Central.</p>}
            <h3 style={{ marginTop: 20 }}>عوامل مؤثر بر فراهمی زیستی</h3>
            <ul className="dots">{v.bioavailability.map((x) => <li key={x}>{x}</li>)}</ul>
          </section>

          <section id="dri">
            <h2>مقادیر مرجع دریافت</h2>
            <p className="small muted">منبع: NASEM (آمریکا). مقادیر برای افراد سالم‌اند و جایگزین دوز درمانی نیستند. واحد: <span className="ltr">{v.unit}</span> در روز.</p>
            <div className="table-scroll">
              <table className="data">
                <thead><tr><th>گروه</th><th className="num">EAR</th><th className="num">RDA / AI</th><th className="num">UL</th></tr></thead>
                <tbody>
                  {STAGE_GROUPS.map((g) => (
                    <FragmentRows key={g.label} label={g.label} rows={g.keys.map((k) => ({
                      label: STAGE_LABELS[k],
                      ear: d.ear?.[k] ?? null,
                      rec: d.rec[k] ?? null,
                      type: recTypeFor(v.key, k),
                      ul: d.ul?.[k] ?? null,
                    }))} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="callout info" style={{ marginTop: 14 }}><strong>دامنه حد بالا (UL)</strong>{UL_SCOPE_FA[d.ulScope]}.</div>
            <h3 style={{ marginTop: 22 }}>مقایسه با اروپا (EFSA، بزرگسالان)</h3>
            <div className="table-scroll">
              <table className="data">
                <thead><tr><th>نوع</th><th className="num">مرد</th><th className="num">زن</th><th className="num">بارداری</th><th className="num">شیردهی</th><th className="num">UL</th></tr></thead>
                <tbody><tr>
                  <td>{e.type}</td><td className="num">{fa(e.male)}</td><td className="num">{fa(e.female)}</td><td className="num">{fa(e.pregnant)}</td><td className="num">{fa(e.lactating)}</td><td className="num">{e.ul ? fa(e.ul) : '—'}</td>
                </tr></tbody>
              </table>
            </div>
            {(e.noteFa || e.ulNoteFa) && <p className="small muted" style={{ marginTop: 8 }}>{[e.noteFa, e.ulNoteFa && `UL: ${e.ulNoteFa}`].filter(Boolean).join(' — ')}</p>}
            <p className="small"><Link to="/standards">مقایسه کامل استانداردها برای همه ویتامین‌ها</Link></p>
          </section>

          <section id="deficiency">
            <h2>کمبود: عوامل خطر، علائم و ارزیابی</h2>
            <div className="grid-2">
              <div><h3>گروه‌های در معرض خطر</h3><ul className="dots">{v.deficiency.riskGroups.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><h3>علائم و پیامدها</h3><ul className="dots">{v.deficiency.signs.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
            <h3 style={{ marginTop: 16 }}>روش‌های ارزیابی</h3>
            <ul className="dots">{v.deficiency.assessment.map((x) => <li key={x}>{x}</li>)}</ul>
            {v.labs?.map((id) => {
              const m = LABS[id];
              return (
                <div key={id} className="panel flat" style={{ marginTop: 12 }}>
                  <strong>{m.nameFa}</strong> <span className="en">{m.nameEn}</span>
                  <div className="row" style={{ gap: 6, marginTop: 8 }}>
                    {m.bands.map((b, i) => (
                      <Tone key={i} tone={b.status === 'deficient' ? 'risk' : b.status === 'low' ? 'warn' : b.status === 'high' ? 'over' : 'good'}>
                        {i === 0 ? `کمتر از ${fa(b.max)}` : b.max === Infinity ? `${fa(m.bands[i - 1].max)} و بیشتر` : `${fa(m.bands[i - 1].max)} تا ${fa(b.max)}`}: {b.labelFa}
                      </Tone>
                    ))}
                  </div>
                  <p className="xs muted" style={{ margin: '8px 0 0' }}>واحد: <span className="ltr">{m.units[0].label}</span>. {m.caveats.join(' ')}</p>
                </div>
              );
            })}
            <p className="small" style={{ marginTop: 12 }}><Link to="/assessment">ارزیابی آموزشی عوامل خطر و نتایج آزمایش</Link></p>
          </section>

          <section id="toxicity">
            <h2>دریافت بیش از حد و سمیت</h2>
            <p className="prose">{v.toxicity.summary}</p>
            {v.toxicity.signs.length > 0 && <><h3>علائم و عوارض</h3><ul className="dots">{v.toxicity.signs.map((x) => <li key={x}>{x}</li>)}</ul></>}
            {v.toxicity.riskFactors.length > 0 && <><h3>عوامل افزایش‌دهنده خطر</h3><ul className="dots">{v.toxicity.riskFactors.map((x) => <li key={x}>{x}</li>)}</ul></>}
          </section>

          <section id="clinical">
            <h2>ارتباط با بیماری‌ها و شرایط بالینی</h2>
            <ul className="dots prose">{v.clinical.map((x) => <li key={x}>{x}</li>)}</ul>
          </section>

          <section id="interactions">
            <h2>تداخلات</h2>
            <ul className="dots prose">{v.interactionsSummary.map((x) => <li key={x}>{x}</li>)}</ul>
            {inter.length > 0 && (
              <div className="row" style={{ gap: 6, marginTop: 10 }}>
                {inter.map((i) => <Link key={i.id} to={`/interactions?q=${encodeURIComponent(i.agentFa.split(' ')[0])}`} className={`chip tone-${i.severity === 'major' ? 'risk' : i.severity === 'moderate' ? 'warn' : 'neutral'}`} style={{ textDecoration: 'none' }}>{i.agentFa}</Link>)}
              </div>
            )}
          </section>

          <section id="supply">
            <h2>تأمین نیاز: غذا، غنی‌سازی و مکمل</h2>
            <ul className="dots">{v.intakeStrategies.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="grid-2" style={{ marginTop: 16 }}>
              <div className="panel flat"><h3>اشکال مکمل</h3><ul className="dots small">{v.supplements.forms.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div className="panel flat"><h3>خواندن برچسب</h3><ul className="dots small">{(v.supplements.labelNotes.length ? v.supplements.labelNotes : ['نکته ویژه‌ای ثبت نشده است.']).map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
            {v.supplements.cautions.length > 0 && <div className="callout warn" style={{ marginTop: 14 }}><strong>احتیاط‌ها</strong><ul className="dots" style={{ marginTop: 4 }}>{v.supplements.cautions.map((x) => <li key={x}>{x}</li>)}</ul></div>}
          </section>

          <section id="evidence">
            <h2>سطح شواهد ادعاهای رایج</h2>
            <div>
              {v.evidence.map((ev) => (
                <div className="evidence-item" key={ev.claim}>
                  <div><EvidenceChip level={ev.level} /></div>
                  <div><strong>{ev.claim}</strong><div className="small muted">{ev.note}</div></div>
                </div>
              ))}
            </div>
            <p className="xs muted"><Link to="/learn/evidence-levels">معنای سطوح شواهد</Link></p>
          </section>

          <section id="sources">
            <h2>منابع علمی و بازبینی</h2>
            <SourceList sources={v.sources} />
            <p className="xs muted" style={{ marginTop: 14 }}>آخرین بازبینی محتوا: {faDate(v.lastReviewed)}. محتوای این پرونده باید پیش از انتشار عمومی توسط متخصص تغذیه بازبینی و تأیید شود (گردش کار بازبینی در پنل تخصصی).</p>
          </section>

          <nav className="row" style={{ justifyContent: 'space-between' }} aria-label="ویتامین قبلی و بعدی">
            {prev ? <Link className="btn ghost small" to={`/vitamins/${prev.slug}`}>قبلی: {prev.nameFa}</Link> : <span />}
            {next ? <Link className="btn ghost small" to={`/vitamins/${next.slug}`}>بعدی: {next.nameFa}</Link> : <span />}
          </nav>
        </article>
      </div>
    </div>
  );
}

function FragmentRows({ label, rows }: { label: string; rows: { label: string; ear: number | null; rec: number | null; type: string; ul: number | null }[] }) {
  return (
    <>
      <tr><td colSpan={4} style={{ fontWeight: 750, background: 'var(--surface-2)' }}>{label}</td></tr>
      {rows.map((r) => (
        <tr key={r.label}>
          <td>{r.label}</td>
          <td className="num">{fa(r.ear)}</td>
          <td className="num">{fa(r.rec)} <span className="xs muted">{r.type}</span></td>
          <td className="num">{r.ul != null ? fa(r.ul) : 'تعیین نشده'}</td>
        </tr>
      ))}
    </>
  );
}
