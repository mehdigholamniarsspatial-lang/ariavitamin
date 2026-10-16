import { useEffect, useState } from 'react';
import type { VitaminProfile } from './data/types';

const nf = new Map<number, Intl.NumberFormat>();
/** قالب‌بندی عدد با ارقام فارسی */
export function fa(n: number | null | undefined, digits = 1): string {
  if (n == null || !Number.isFinite(n)) return '—';
  const d = Math.abs(n) >= 100 ? 0 : digits;
  if (!nf.has(d)) nf.set(d, new Intl.NumberFormat('fa-IR', { maximumFractionDigits: d }));
  return nf.get(d)!.format(n);
}

export function faDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export const uid = () => Math.random().toString(36).slice(2, 10);

/** state ماندگار در localStorage — با try/catch برای حالت خصوصی مرورگر */
export function useLocalState<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ }
  }, [key, v]);
  return [v, setV] as const;
}

export const vitColor = (v: VitaminProfile, l = 42) => `hsl(${v.hue} 52% ${l}%)`;

/** نرمال‌سازی متن فارسی برای جست‌وجو (ی/ک عربی، نیم‌فاصله، ارقام) */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, ' ')
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function useTitle(t: string) {
  useEffect(() => { document.title = `${t} — ویتامین‌نامه`; }, [t]);
}
