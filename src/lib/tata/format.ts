import type { AgentBand, AgentId, AgentStatus, DecisionKind, Presence, ProgramKind } from "./types";

export function toman(n: number): string {
  return `${new Intl.NumberFormat("fa-IR").format(n)} تومان`;
}

export function faNum(n: number): string {
  return new Intl.NumberFormat("fa-IR").format(n);
}

export function tomanShort(n: number): string {
  if (Math.abs(n) >= 1_000_000) {
    const m = n / 1_000_000;
    const digits = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(m);
    return `${digits} میلیون`;
  }
  if (Math.abs(n) >= 1000) return `${faNum(Math.round(n / 1000))} هزار`;
  return faNum(n);
}

export function tehranDateLabel(date = new Date()): string {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function tehranNowLabel(date = new Date()): string {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function tehranWeekday(offset: number, now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const [y, m, d] = parts.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d + offset, 9, 0, 0));
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "short",
    timeZone: "UTC",
  }).format(utc);
}

export const BAND_LABEL: Record<AgentBand, string> = {
  auto: "خودران",
  "until-line": "خودران تا خط قرمز",
  "content-lead": "هدایت راهبر محتوا",
};

export const STATUS_LABEL: Record<AgentStatus, string> = {
  running: "در حال کار",
  waiting: "منتظر انسان",
  idle: "آماده",
};

export const DECISION_LABEL: Record<DecisionKind, string> = {
  finance: "مالی",
  schedule: "برنامه اصلی",
  hr: "نیروی انسانی",
  brand: "هویت برند",
};

export const PROGRAM_LABEL: Record<ProgramKind, string> = {
  class: "کلاس",
  workshop: "کارگاه",
  event: "ایونت",
  concert: "کنسرت",
  cafe: "کافه",
};

export const PRESENCE_LABEL: Record<Presence, string> = {
  confirmed: "تأیید شده",
  watched: "زیر نظر",
  silent: "بی‌پاسخ",
  remote: "دورکار",
  covered: "پوشش داده شد",
};

export const AGENT_LABEL: Record<AgentId, string> = {
  scheduler: "زمان‌بند",
  registrar: "ثبت‌نام",
  floor: "کف سالن",
  ledger: "دفتر",
  sentinel: "دیده‌بان",
  night: "شب‌نامه",
  brand: "روایت",
  brief: "میزنامه",
};

export const REJECT_REASONS: Record<DecisionKind, string[]> = {
  finance: ["بودجه زیاد است", "منبع دیگری پیدا کن", "فعلاً نه"],
  schedule: ["برنامه را دست نزن", "زمان دیگر پیشنهاد بده", "فعلاً نه"],
  hr: ["خودمان پوشش می‌دهیم", "شخص دیگری", "فعلاً نه"],
  brand: ["هویت را عوض نکن", "لحن را ملایم‌تر کن", "فعلاً نه"],
};
