export type Parsed =
  | { ok: false; message: string }
  | {
      ok: true;
      kind: "income" | "expense";
      amount: number;
      category: string;
      sensitive: boolean;
      utterance: string;
      because: string;
    };

const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";

const WORD: Record<string, number> = {
  نیم: 0.5,
  یک: 1,
  یه: 1,
  دو: 2,
  سه: 3,
  چهار: 4,
  پنج: 5,
  شش: 6,
  شیش: 6,
  هفت: 7,
  هشت: 8,
  نه: 9,
  ده: 10,
  یازده: 11,
  دوازده: 12,
  سیزده: 13,
  چهارده: 14,
  پانزده: 15,
  پونزده: 15,
  شانزده: 16,
  هفده: 17,
  هجده: 18,
  نوزده: 19,
  بیست: 20,
  سی: 30,
  چهل: 40,
  پنجاه: 50,
  شصت: 60,
  هفتاد: 70,
  هشتاد: 80,
  نود: 90,
  صد: 100,
  یکصد: 100,
  دویست: 200,
  سیصد: 300,
  چهارصد: 400,
  پانصد: 500,
  پونصد: 500,
  ششصد: 600,
  هفتصد: 700,
  هشتصد: 800,
  نهصد: 900,
};

export function normalizeFa(input: string): string {
  return input
    .trim()
    .replace(/[۰-۹]/g, (d) => String(FA.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)))
    .replace(/[٬،,]/g, "")
    .replace(/[٫]/g, ".")
    .replace(/تومان|تومن|ریال/g, " ")
    .replace(/(\d)(?=هزار|میلیون|میلیارد)/g, "$1 ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractAmount(text: string): number | null {
  const n = normalizeFa(text);
  const parts = n.split(" ");
  let total = 0;
  let group = 0;
  let saw = false;

  const flushMult = (mult: number) => {
    const base = group === 0 ? 1 : group;
    total += base * mult;
    group = 0;
    saw = true;
  };

  for (const raw of parts) {
    const p = raw.trim();
    if (!p || p === "و" || p === "تا") continue;
    if (p === "هزار") flushMult(1000);
    else if (p === "میلیون") flushMult(1_000_000);
    else if (p === "میلیارد") flushMult(1_000_000_000);
    else if (WORD[p] != null) {
      const value = WORD[p];
      group = value < 1 && group === 0 ? value : group + value;
      saw = true;
    } else if (/^\d+(?:\.\d+)?$/.test(p)) {
      group += Number(p);
      saw = true;
    }
  }

  if (group > 0) {
    if (total >= 1_000_000 && group >= 1 && group < 1000) total += group * 1000;
    else total += group;
  }

  if (!saw || total <= 0) return null;
  return Math.round(total);
}

function categoryOf(text: string, kind: "income" | "expense"): string {
  const rules: [RegExp, string][] = [
    [/قهوه|دانه|شیر|شیرینی|قند|نان|خوراک|میوه/, "مواد کافه"],
    [/اجاره|سالن|بیعانه|بلندگو|نورپردازی/, "مکان و صحنه"],
    [/حقوق|دستمزد|قرارداد|پرسنل/, "نیروی انسانی"],
    [/تبلیغ|اینستا|پوستر|محتوا|طراح/, "برند"],
    [/بلیت|کنسرت/, "رویداد"],
    [/ثبت.?نام|کارگاه|کلاس|سفال|قصه|شهریه|آموزش/, "آموزش"],
    [/کافه|صندوق|بار|فروش/, "صندوق کافه"],
  ];
  for (const [re, label] of rules) if (re.test(text)) return label;
  return kind === "income" ? "درآمد متفرقه" : "هزینه متفرقه";
}

export function parseCommand(text: string, ceiling: number): Parsed {
  const utterance = text.trim();
  if (!utterance) {
    return { ok: false, message: "چیزی گفته نشد. مثلاً: هزینه دانه قهوه ۴۲۰ هزار" };
  }
  const norm = normalizeFa(utterance);
  const amount = extractAmount(utterance);
  if (amount == null) {
    return {
      ok: false,
      message: "مبلغ را نشنیدم. مثلاً: درآمد کارگاه سفال ۴۰۰ هزار",
    };
  }
  if (amount > 1_000_000_000_000) {
    return { ok: false, message: "این مبلغ معقول نیست. یک بار دیگر بگو." };
  }

  const expAt = norm.search(/هزینه|خرج|خرید|پرداخت|بیعانه|حقوق|دستمزد/);
  const incAt = norm.search(/درآمد|فروش|ثبت نام|ثبت‌نام|ورودی|بلیت|شهریه|دریافت|صندوق/);
  if (expAt < 0 && incAt < 0) {
    return { ok: false, message: "بگو این درآمد است یا هزینه." };
  }
  const kind: "income" | "expense" =
    expAt < 0 ? "income" : incAt < 0 ? "expense" : expAt <= incAt ? "expense" : "income";

  const category = categoryOf(norm, kind);
  const named = /حقوق|دستمزد|بیعانه|قرارداد/.test(norm);
  const sensitive = kind === "expense" && (named || amount >= ceiling);
  const because = !sensitive
    ? "زیر سقف خودران بود."
    : named
      ? "این نوع تعهد را دفتر خودش نمی‌بندد."
      : "مبلغ از سقف خودران بالاتر است.";

  return { ok: true, kind, amount, category, sensitive, utterance, because };
}
