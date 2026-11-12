import { faNum, toman } from "./format";
import type { Data } from "./types";

export type NightDraft = { wins: string[]; issues: string[]; tomorrow: string[] };

function sum(data: Data, kind: "income" | "expense"): number {
  return data.ledger.filter((e) => e.kind === kind).reduce((acc, e) => acc + e.amount, 0);
}

export function buildNightDraft(d: Data): NightDraft {
  const wins: string[] = [];
  const issues: string[] = [];
  const tomorrow: string[] = [];
  const income = sum(d, "income");
  const expense = sum(d, "expense");
  const autoN = d.activity.filter((a) => a.auto).length;
  const pending = d.decisions.filter((x) => x.status === "pending");
  const story = d.programs.find((p) => p.id === "story");
  const poetry = d.programs.find((p) => p.id === "poetry");

  wins.push(
    `${faNum(autoN)} کار اجرایی بی‌امضای حمزه بسته شد؛ از یادآوری شیفت و ثبت‌نام تا جدا کردن تصمیم حساس.`,
  );
  if (income > 0 || expense > 0) {
    wins.push(
      `دفتر امروز ${income ? toman(income) + " درآمد" : "هنوز درآمدی"}${expense ? ` و ${toman(expense)} هزینه` : ""} را خودش دسته کرده.`,
    );
  } else {
    wins.push("صندوق امروز هنوز باز نشده؛ درآمد دیروز ۴٫۸۵ میلیون بوده و دسته‌ها بسته است.");
  }
  if (story && story.enrolled / story.capacity >= 0.85) {
    wins.push(
      `قصه ${faNum(story.enrolled)} از ${faNum(story.capacity)} نفر است. انصراف صبح بدون دخالت حمزه در جریان جایگزین است.`,
    );
  }
  if (d.flags.hallFixed) {
    wins.push("تداخل سالن حل شد، بی‌آنکه شب شعر به‌عنوان برنامهٔ اصلی جابه‌جا شود.");
  } else if (poetry) {
    wins.push(`شب شعر با ${faNum(poetry.enrolled)} از ${faNum(poetry.capacity)} نفر سر جایش مانده و اعلامش دست نخورده.`);
  }

  for (const alert of d.alerts.filter((a) => !a.resolved)) {
    issues.push(`${alert.title}. ${alert.detail}`);
  }
  const rejected = d.decisions.filter((x) => x.status === "rejected");
  if (rejected.length) {
    issues.push(
      `رد شد و نباید دوباره همان‌طور بیاید: ${rejected.map((r) => r.title).join("؛ ")}.`,
    );
  }
  if (pending.length && issues.length < 3) {
    issues.push(`${faNum(pending.length)} تصمیم حساس هنوز باز است. ایجنت حق ندارد از رویش رد شود.`);
  }
  if (issues.length === 0) {
    issues.push("ریسک فوری باز نمانده. دیده‌بان هنوز موجودی، سالن و نیروی صحنه را تا آخر شب نگاه می‌کند.");
  }

  const deposit = d.decisions.find((x) => x.id === "dec-deposit");
  if (deposit?.status === "pending") {
    tomorrow.push("بیعانهٔ سالن را حمزه تکلیف کند. تا آن لحظه کنسرت اعلام نمی‌شود.");
  } else if (deposit?.status === "approved") {
    tomorrow.push("بیعانه رفته؛ زمان‌بند سالن را قطعی نگه دارد و روایت فقط بعد از آن خبر بدهد.");
  } else if (deposit?.status === "rejected") {
    tomorrow.push("بیعانه رد شده. زمان‌بند سالن ارزان‌تر را پیدا کند و همان مسیر ۸٫۵ میلیونی را تکرار نکند.");
  }

  const sound = d.decisions.find((x) => x.id === "dec-sound");
  if (sound?.status === "pending") {
    tomorrow.push("اگر کیان تا ظهر جواب نداد، امضای پیمان لازم است وگرنه چک صدای شب شعر می‌لنگد.");
  } else if (sound?.status === "approved") {
    tomorrow.push("پیمان صدا را پوشش می‌دهد. کف سالن فقط رسیدنش را تأیید کند، نه اینکه دوباره بپرسد.");
  } else {
    tomorrow.push("جایگزین بیرونی رد شده. کف سالن با نیروی حاضر صدا را ببندد و پیمان را پیشنهاد نکند.");
  }

  if (!d.flags.hallFixed && d.programs.some((p) => p.id === "rehearsal" && p.status === "conflict")) {
    tomorrow.push("تداخل تمرین با چیدمان را زمان‌بند کوتاه کند. این یکی امضای حمزه نمی‌خواهد.");
  } else {
    tomorrow.push("چیدمان شب شعر از ۱۷:۳۰ سالن را خالی تحویل بگیرد و مریم لیست را ساعت ۱۸ چاپ کند.");
  }

  const drafts = d.content.filter((c) => c.status === "draft");
  if (drafts.length) {
    tomorrow.push(`راهبر محتوا ${faNum(drafts.length)} پیش‌نویس روایت را جهت بدهد. این کار روی میز حمزه نیست.`);
  } else {
    tomorrow.push("روایت با جهت محتوا هم‌تراز است. انتشار با لیلاست، نه با حمزه.");
  }

  const openTask = d.tasks.find((t) => t.status === "open");
  if (openTask) {
    tomorrow.push(`کار انسانی باز بماند اگر بسته نشد: ${openTask.assignee} — ${openTask.title}.`);
  }

  return {
    wins: wins.slice(0, 4),
    issues: issues.slice(0, 4),
    tomorrow: tomorrow.slice(0, 4),
  };
}

export function managementLines(d: Data): string[] {
  const pending = d.decisions.filter((x) => x.status === "pending");
  const income = sum(d, "income");
  const expense = sum(d, "expense");
  const openAlerts = d.alerts.filter((a) => !a.resolved).length;
  const autoN = d.activity.filter((a) => a.auto).length;
  const fill = d.programs.filter((p) => p.kind !== "cafe" && p.capacity > 0);
  const avg =
    fill.reduce((acc, p) => acc + p.enrolled / p.capacity, 0) / Math.max(1, fill.length);

  return [
    `حمزه لازم نیست امروز اپراتور باشد. ${faNum(autoN)} اقدام را ایجنت‌ها بسته‌اند و ${faNum(pending.length)} مورد هنوز امضا می‌خواهد.`,
    income || expense
      ? `صندوق امروز ${toman(income)} درآمد و ${toman(expense)} هزینهٔ ثبت‌شده دارد. درآمد دیروز کافه ۴٫۸۵ میلیون بوده.`
      : "صندوق امروز هنوز حرکتی ندارد. معیار صبح، درآمد دیروز کافه است: ۴٫۸۵ میلیون.",
    `پرشدگی برنامه‌های آموزشی و ایونت حدود ${faNum(Math.round(avg * 100))} درصد است. شب شعر نزدیک ظرفیت است و سفال هنوز جا دارد.`,
    openAlerts
      ? `${faNum(openAlerts)} ریسک باز مانده. دیده‌بان آن‌ها را قبل از وقوع آورده؛ صاحب هر کدام مشخص است.`
      : "ریسک باز فوری نمانده. نظارت حمزه می‌تواند به گزارش شب برگردد.",
  ];
}
