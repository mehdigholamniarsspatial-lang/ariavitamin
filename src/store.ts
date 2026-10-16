import type { FoodEntry, Supplement } from './engine/calc';
import type { Profile } from './engine/lifestage';
import type { ScreenInput } from './engine/screen';

/**
 * ذخیره‌سازی نسخه اولیه فقط در مرورگر همین دستگاه (localStorage) انجام می‌شود.
 * در فاز بعد، پرونده‌ها به پایگاه داده سمت سرور با رمزنگاری، کنترل دسترسی و ثبت رضایت منتقل می‌شوند.
 */
export interface IntakeState { profile: Profile; foods: FoodEntry[]; supplements: Supplement[]; days: number }

export interface Snapshot { id: string; date: string; kind: 'intake' | 'screen'; intake?: IntakeState; screen?: ScreenInput; summary: string }

export interface Client {
  id: string;
  code: string; // کد مراجع (به‌جای نام کامل، برای حداقل‌سازی داده)
  label: string;
  birthYear?: number;
  sex: 'male' | 'female';
  consent: boolean;
  consentDate?: string;
  createdAt: string;
  notes: string;
  snapshots: Snapshot[];
}

export interface ReviewItem { id: string; vitamin: string; section: string; status: 'pending' | 'approved' | 'changes'; reviewer?: string; date?: string; comment?: string }

export const DEFAULT_INTAKE: IntakeState = {
  profile: { ageYears: 30, sex: 'female', status: 'none', smoker: false },
  foods: [],
  supplements: [],
  days: 1,
};

export const CLIENTS_KEY = 'vn-clients';
export const INTAKE_KEY = 'vn-intake';

export function loadClients(): Client[] {
  try { return JSON.parse(localStorage.getItem(CLIENTS_KEY) || '[]'); } catch { return []; }
}
export function saveClients(c: Client[]) {
  try { localStorage.setItem(CLIENTS_KEY, JSON.stringify(c)); } catch { /* ignore */ }
}
