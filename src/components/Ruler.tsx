import { fa } from '../lib';

interface Props {
  value: number;
  ear?: number | null;
  rec?: number | null;
  recType?: 'RDA' | 'AI';
  ul?: number | null;
  unit: string;
  compact?: boolean;
  label?: string;
}

type Zone = { cls: string; from: number; to: number; w: number };

/**
 * خط‌کش دریافت: مقیاس ناحیه‌ای (نه خطی) — هر ناحیه عرض ثابت دارد و مقدار درون ناحیه خطی نگاشت می‌شود.
 * جهت: راست‌به‌چپ (صفر در راست).
 */
export function buildZones(ear: number | null | undefined, rec: number | null | undefined, ul: number | null | undefined): Zone[] {
  const z: Zone[] = [];
  const r = rec ?? 1;
  if (ear != null && rec != null) {
    z.push({ cls: 'z-low', from: 0, to: ear, w: 26 });
    z.push({ cls: 'z-mid', from: ear, to: rec, w: 14 });
    if (ul != null) {
      z.push({ cls: 'z-ok', from: rec, to: ul, w: 44 });
      z.push({ cls: 'z-over', from: ul, to: ul * 1.6, w: 16 });
    } else z.push({ cls: 'z-ok', from: rec, to: rec * 4, w: 60 });
  } else {
    z.push({ cls: 'z-ai', from: 0, to: r, w: 38 });
    if (ul != null) {
      z.push({ cls: 'z-ok', from: r, to: ul, w: 46 });
      z.push({ cls: 'z-over', from: ul, to: ul * 1.6, w: 16 });
    } else z.push({ cls: 'z-ok', from: r, to: r * 4, w: 62 });
  }
  return z;
}

export function position(v: number, zones: Zone[]): number {
  let acc = 0;
  for (const z of zones) {
    if (v <= z.to) return acc + (Math.max(0, v - z.from) / (z.to - z.from)) * z.w;
    acc += z.w;
  }
  return 100;
}

export function Ruler({ value, ear, rec, recType = 'RDA', ul, unit, compact, label }: Props) {
  const zones = buildZones(ear, rec, ul);
  const pos = Math.min(99.2, Math.max(0.8, position(value, zones)));
  const ticks: { at: number; text: string; cls?: string }[] = [];
  if (ear != null) ticks.push({ at: position(ear, zones), text: `EAR ${fa(ear)}`, cls: 't-ear' });
  if (rec != null) ticks.push({ at: position(rec, zones), text: `${recType} ${fa(rec)}` });
  if (ul != null) ticks.push({ at: position(ul, zones), text: `UL ${fa(ul)}`, cls: 't-ul' });

  return (
    <div className={`ruler${compact ? ' compact' : ''}`} role="img"
      aria-label={`${label ?? 'دریافت'}: ${fa(value)} ${unit}${rec != null ? `، مقدار توصیه‌شده ${fa(rec)}` : ''}${ul != null ? `، حد بالا ${fa(ul)}` : ''}`}>
      <div className="ruler-track">
        {zones.map((z, i) => <div key={i} className={`ruler-zone ${z.cls}`} style={{ width: `${z.w}%` }} />)}
      </div>
      {ticks.map((t) => (
        <div key={t.text} className={`ruler-tick ${t.cls ?? ''}`} style={{ right: `${t.at}%` }}>
          <span className="ltr">{t.text}</span>
        </div>
      ))}
      <div className="ruler-marker" style={{ right: `${pos}%` }}>
        <span className="val">{fa(value)} <span style={{ fontWeight: 500 }}>{unit}</span></span>
        <span className="pin" />
      </div>
    </div>
  );
}
