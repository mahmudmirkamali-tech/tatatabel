import { AGENT_LABEL, toman } from "./format";
import { parseCommand } from "./parse";
import type { AgentId, Data, Decision, LedgerEntry } from "./types";

let seq = 0;
function nid(prefix: string): string {
  seq += 1;
  return `${prefix}-${seq}`;
}

function clone(d: Data): Data {
  return structuredClone(d);
}

function push(d: Data, agentId: AgentId, text: string, at: string, auto: boolean) {
  d.activity.unshift({ id: nid("a"), agentId, text, at, auto });
  const agent = d.agents.find((a) => a.id === agentId);
  if (agent) agent.lastAction = text;
}

function book(d: Data, entry: Omit<LedgerEntry, "id" | "at">, at: string) {
  d.ledger.unshift({ ...entry, id: nid("led"), at });
}

function resolve(d: Data, id: string) {
  const alert = d.alerts.find((a) => a.id === id);
  if (alert) alert.resolved = true;
}

function refresh(d: Data) {
  const pending = (id: AgentId) => d.decisions.some((x) => x.status === "pending" && x.agentId === id);
  for (const agent of d.agents) {
    if (agent.id === "night") {
      agent.status = "idle";
      continue;
    }
    if (agent.id === "brief") {
      agent.status = "running";
      continue;
    }
    if (agent.id === "sentinel") {
      agent.status = d.alerts.some((a) => !a.resolved) ? "running" : "idle";
      continue;
    }
    if (agent.id === "brand") {
      agent.status = d.content.some((c) => c.status === "draft" || c.status === "escalate")
        ? "waiting"
        : "running";
      continue;
    }
    agent.status = pending(agent.id) ? "waiting" : "running";
  }
}

function potteryCaption(direction: string): string {
  return `گل هنوز به دست‌هاست و کسی عجله ندارد. کارگاه سفال گاچو، حیاط، هشت نفر و دو جا خالی. جهت ثبت‌شده این است: «${direction.trim()}» پس در متن وعدهٔ تخفیف و شعار نمی‌آید.`;
}

function poetryCaption(direction: string): string {
  return `امشب شب شعر گاچو است، سالن از ۱۹:۳۰. جهت برند: «${direction.trim()}». چهرهٔ مهمان بی‌اجازه در استوری نمی‌آید؛ فقط میکروفون، فنجان، و یک خط.`;
}

function applyHall(d: Data, at: string) {
  const item = d.programs.find((p) => p.id === "rehearsal");
  if (item) {
    item.end = "۱۷:۱۵";
    item.status = "set";
    item.note = "زمان‌بند پایان را ۱۷:۱۵ کرد تا چیدمان شب شعر از ۱۷:۳۰ سالن را خالی بگیرد.";
  }
  resolve(d, "alert-hall");
  d.flags.hallFixed = true;
  push(
    d,
    "scheduler",
    "تمرین موسیقی ۱۷:۱۵ تمام می‌شود. شب شعر سر جایش ماند و از حمزه امضا گرفته نشد.",
    at,
    true,
  );
}

function applyDeposit(d: Data, at: string) {
  book(
    d,
    {
      kind: "expense",
      amount: 8_500_000,
      category: "مکان و صحنه",
      note: "بیعانهٔ سالن کنسرت فردا",
      source: "approval",
    },
    at,
  );
  const concert = d.programs.find((p) => p.id === "concert");
  if (concert) {
    concert.status = "set";
    concert.note = "بیعانه با امضای حمزه رفت. سالن قطعی است. بلیت را ثبت‌نام باز می‌کند.";
  }
  push(d, "ledger", "بیعانهٔ ۸٫۵ میلیون با امضای حمزه پرداخت و در دستهٔ مکان ثبت شد.", at, false);
  push(d, "scheduler", "سانس کنسرت فردا قطعی شد. اعلام عمومی دیگر دروغ نیست.", at, true);
}

function applySound(d: Data, at: string) {
  const kian = d.staff.find((s) => s.id === "kian");
  if (kian) {
    kian.presence = "covered";
    kian.agentNote = "بی‌پاسخ ماند. پوشش صدا با پیمان است و دیگر پیگیری اضطراری نمی‌شود.";
  }
  if (!d.staff.some((s) => s.id === "peyman")) {
    d.staff.push({
      id: "peyman",
      name: "پیمان بهمنی",
      role: "صدابردار جایگزین",
      shift: "۱۶ تا ۲۲",
      presence: "confirmed",
      score: 84,
      agentNote: "بعد از امضای حمزه اضافه شد. تجهیزات خودش را می‌آورد.",
      reminded: false,
    });
  }
  const rehearsal = d.programs.find((p) => p.id === "rehearsal");
  if (rehearsal && rehearsal.lead === "کیان پوری") rehearsal.lead = "پیمان بهمنی";
  book(
    d,
    {
      kind: "expense",
      amount: 900_000,
      category: "نیروی انسانی",
      note: "دستمزد موقت پیمان برای صدای امشب",
      source: "approval",
    },
    at,
  );
  resolve(d, "alert-kian");
  push(d, "floor", "پیمان جای کیان را گرفت. این یکی را حمزه امضا کرد؛ پیگیری بعدی با کف سالن است.", at, false);
  push(d, "ledger", "دستمزد ۹۰۰ هزار پیمان زیر سقف بود و بعد از امضای نیرو ثبت شد.", at, true);
}

function applyShift(d: Data, at: string) {
  const hafez = d.programs.find((p) => p.id === "hafez");
  if (hafez) {
    hafez.when = "شنبه";
    hafez.status = "set";
    hafez.note = "با امضای حمزه به شنبه همان ساعت منتقل شد.";
  }
  push(d, "scheduler", "حافظ‌خوانی به شنبه رفت. این تغییر برنامهٔ اصلی بود و بی‌امضا انجام نشد.", at, false);
  push(d, "registrar", "خبر جابه‌جایی برای شش ثبت‌نام حافظ‌خوانی فرستاده شد.", at, true);
}

function applySign(d: Data, at: string) {
  const piece = d.content.find((c) => c.id === "c-sign");
  if (piece) {
    piece.status = "sent";
    piece.draft = "سردر با امضای حمزه عوض می‌شود: «خانهٔ کودک گاچو».";
  }
  push(d, "brand", "جملهٔ سردر با امضای حمزه ثبت شد. اجرا با تیم مکان است، نه با روایت.", at, false);
}

function bookDecision(d: Data, item: Decision, at: string) {
  if (!item.amount) return;
  book(
    d,
    {
      kind: "expense",
      amount: item.amount,
      category: item.category ?? (item.kind === "hr" ? "نیروی انسانی" : "متفرقه"),
      note: item.detail,
      source: "approval",
    },
    at,
  );
  if (item.id === "dec-milk") resolve(d, "alert-milk");
  push(d, "ledger", `خرج ${toman(item.amount)} بعد از امضا ثبت شد: ${item.title}.`, at, false);
}

export function approveDecision(input: Data, id: string, at: string): Data {
  const d = clone(input);
  const item = d.decisions.find((x) => x.id === id);
  if (!item || item.status !== "pending") return d;
  item.status = "approved";
  item.at = at;
  if (id === "dec-deposit") applyDeposit(d, at);
  else if (id === "dec-sound") applySound(d, at);
  else if (id === "dec-shift") applyShift(d, at);
  else if (id === "dec-hall") applyHall(d, at);
  else if (id === "dec-sign") applySign(d, at);
  else bookDecision(d, item, at);
  refresh(d);
  return d;
}

export function rejectDecision(input: Data, id: string, reason: string, at: string): Data {
  const d = clone(input);
  const item = d.decisions.find((x) => x.id === id);
  if (!item || item.status !== "pending") return d;
  item.status = "rejected";
  item.at = at;
  const text = `${reason} — دربارهٔ «${item.title}»`;
  d.lessons.unshift({ id: nid("les"), agentId: item.agentId, text, at });
  push(
    d,
    item.agentId,
    `${AGENT_LABEL[item.agentId]} یاد گرفت: ${reason}. «${item.title}» را دوباره به همین شکل نمی‌آورد.`,
    at,
    true,
  );
  if (id === "dec-deposit") {
    const concert = d.programs.find((p) => p.id === "concert");
    if (concert) concert.note = "بیعانه رد شد. سالن دیگری باید پیدا شود. اعلام عمومی همچنان ممنوع است.";
  }
  if (id === "dec-sound") {
    const kian = d.staff.find((s) => s.id === "kian");
    if (kian) kian.agentNote = "جایگزین بیرونی رد شد. پوشش باید با نیروی حاضر انجام شود.";
  }
  refresh(d);
  return d;
}

export function peekBeat(d: Data): string {
  if (!d.flags.seatFilled) return "قدم بعد، خودران: قطعی کردن صندلی قصه برای یاسمن";
  if (!d.flags.rezaCleared) return "قدم بعد، خودران: بستن پروندهٔ تأخیر رضا";
  if (!d.flags.milkOrdered) {
    return d.ceiling >= 480_000
      ? "قدم بعد، خودران: سفارش شیر گیاهی، زیر سقف دفتر"
      : "قدم بعد: سفارش شیر از سقف گذشته و می‌رود برای امضا";
  }
  if (!d.flags.hallFixed) {
    const blocked = d.lessons.some((l) => l.text.includes("برنامه را دست نزن"));
    return blocked
      ? "قدم بعد: تداخل سالن به‌خاطر درسی که دادی امضا می‌خواهد"
      : "قدم بعد، خودران: کوتاه کردن تمرین تا سالن برای شب شعر خالی شود";
  }
  if (!d.flags.captionSteered) return "قدم بعد، خودران: بازنویسی کپشن سفال با جهت ثبت‌شده";
  return "خودرانِ تازه‌ای نمانده. اگر امضایی باز است، فقط همان با توست";
}

export function nextBeat(input: Data, at: string): { data: Data; message: string } {
  const d = clone(input);

  if (!d.flags.seatFilled) {
    const reg = d.registrations.find((r) => r.id === "r-yas");
    const story = d.programs.find((p) => p.id === "story");
    if (reg) {
      reg.status = "confirmed";
      reg.agentNote = "جواب داد. صندلی قطعی است و نفر بعدی صف خبر نمی‌شود.";
    }
    if (story) story.enrolled = Math.min(story.capacity, story.enrolled + 1);
    if (story) story.note = "یاسمن جای رادین را گرفت. ظرفیت ۱۳ از ۱۴. ثبت‌نام خودش بست.";
    book(
      d,
      {
        kind: "income",
        amount: 350_000,
        category: "آموزش",
        note: "شهریهٔ قصه — یاسمن آذری",
        source: "agent",
      },
      at,
    );
    d.flags.seatFilled = true;
    push(d, "registrar", "یاسمن آذری قطعی شد. شهریهٔ ۳۵۰ هزار در دستهٔ آموزش نشست.", at, true);
    refresh(d);
    return { data: d, message: "ثبت‌نام صندلی را پر کرد و شهریه را نوشت. از تو نپرسید." };
  }

  if (!d.flags.rezaCleared) {
    const reza = d.staff.find((s) => s.id === "reza");
    if (reza) {
      reza.presence = "confirmed";
      reza.agentNote = "جواب داد: سر ساعت ۸ هستم. تأخیر دیروز دیگر روی میز حمزه نیست.";
    }
    d.flags.rezaCleared = true;
    push(d, "floor", "رضا رسیدن سر شیفت را تأیید کرد. پروندهٔ تأخیر بسته شد.", at, true);
    refresh(d);
    return { data: d, message: "کف سالن تأخیر رضا را با همان یادآوری صبح بست." };
  }

  if (!d.flags.milkOrdered) {
    d.flags.milkOrdered = true;
    if (d.ceiling >= 480_000) {
      book(
        d,
        {
          kind: "expense",
          amount: 480_000,
          category: "مواد کافه",
          note: "سفارش شیر گیاهی برای فردا",
          source: "agent",
        },
        at,
      );
      resolve(d, "alert-milk");
      push(d, "ledger", "شیر گیاهی ۴۸۰ هزار زیر سقف بود. سفارش رفت و از حمزه امضا گرفته نشد.", at, true);
      refresh(d);
      return { data: d, message: "دفتر شیر را خودش خرید. مبلغ زیر سقف خودران بود." };
    }
    if (!d.decisions.some((x) => x.id === "dec-milk")) {
      d.decisions.unshift({
        id: "dec-milk",
        agentId: "ledger",
        kind: "finance",
        title: "سفارش شیر گیاهی",
        detail: "موجودی به آخر امروز رسیده. تأمین‌کننده ۴۸۰ هزار تومان می‌خواهد.",
        prepared: "دیده‌بان کمبود را دیده. دفتر به‌خاطر سقف فعلی پرداخت نکرده.",
        rule: `سقف خودران دفتر الان ${toman(d.ceiling)} است و این سفارش از آن گذشته.`,
        amount: 480_000,
        category: "مواد کافه",
        status: "pending",
        at,
      });
    }
    push(d, "ledger", "سفارش شیر از سقف خودران گذشت و روی میز امضا ماند.", at, true);
    refresh(d);
    return { data: d, message: "شیر لازم است، ولی از سقفی که تعیین کردی بالاتر است. پرداخت نکردم." };
  }

  if (!d.flags.hallFixed) {
    const blocked = d.lessons.some((l) => l.text.includes("برنامه را دست نزن"));
    if (blocked) {
      d.flags.hallFixed = true;
      if (!d.decisions.some((x) => x.id === "dec-hall" && x.status === "pending")) {
        d.decisions.unshift({
          id: "dec-hall",
          agentId: "scheduler",
          kind: "schedule",
          title: "کوتاه کردن تمرین موسیقی",
          detail: "تمرین تا ۱۸ با چیدمان شب شعر تداخل دارد. راه‌حل، تمام کردن تمرین در ۱۷:۱۵ است.",
          prepared: "زمان‌بند معمولاً این را خودش انجام می‌دهد، ولی تو گفته‌ای برنامه دست نخورد.",
          rule: "درسی که دادی اختیار جزئی زمان‌بند را هم برای این مورد گرفت.",
          status: "pending",
          at,
        });
      }
      push(d, "scheduler", "تداخل سالن را بالا آوردم چون گفته بودی برنامه را دست نزنم.", at, true);
      refresh(d);
      return { data: d, message: "زمان‌بند می‌توانست خودش حل کند، ولی به درسی که دادی عمل کرد و پرسید." };
    }
    applyHall(d, at);
    refresh(d);
    return { data: d, message: "زمان‌بند تمرین را کوتاه کرد. برنامهٔ اصلی شب شعر تکان نخورد." };
  }

  if (!d.flags.captionSteered) {
    const piece = d.content.find((c) => c.id === "c-pottery");
    if (piece && piece.status !== "sent") {
      piece.status = "steered";
      piece.draft = potteryCaption(d.brandDirection);
    }
    d.flags.captionSteered = true;
    push(d, "brand", "کپشن سفال با جهت ثبت‌شدهٔ راهبر محتوا بازنویسی شد. انتشار هنوز با لیلاست.", at, true);
    refresh(d);
    return { data: d, message: "روایت کپشن را با جهت برند نوشت. برای حمزه نفرستاد." };
  }

  refresh(d);
  return {
    data: d,
    message: "چیز خودرانِ تازه‌ای نمانده. میز تو فقط همان امضاهای باز است.",
  };
}

export function applyVoice(input: Data, text: string, at: string): { data: Data; message: string } {
  const parsed = parseCommand(text, input.ceiling);
  if (!parsed.ok) return { data: input, message: parsed.message };
  const d = clone(input);
  if (parsed.sensitive) {
    d.decisions.unshift({
      id: nid("dec"),
      agentId: "ledger",
      kind: parsed.category === "نیروی انسانی" ? "hr" : "finance",
      title: `خرج شنیده‌شده: ${parsed.category}`,
      detail: parsed.utterance,
      prepared: "دفتر جمله را شنید، دسته کرد، و پرداخت نکرد.",
      rule: parsed.because,
      amount: parsed.amount,
      category: parsed.category,
      status: "pending",
      at,
    });
    push(d, "ledger", `شنیدم «${parsed.utterance}» و چون از خط گذشت، روی میز امضا گذاشتم.`, at, true);
    refresh(d);
    return {
      data: d,
      message: `شنیدم. ${toman(parsed.amount)} برای ${parsed.category} را نپرداختم؛ ${parsed.because}`,
    };
  }
  book(
    d,
    {
      kind: parsed.kind,
      amount: parsed.amount,
      category: parsed.category,
      note: parsed.utterance,
      source: "voice",
    },
    at,
  );
  const verb = parsed.kind === "income" ? "درآمد" : "هزینه";
  push(d, "ledger", `${verb} ${toman(parsed.amount)} در «${parsed.category}» از روی صدا ثبت شد.`, at, true);
  refresh(d);
  return {
    data: d,
    message: `${verb} ${toman(parsed.amount)} در «${parsed.category}» ثبت شد. امضا نخواست.`,
  };
}

export function setCeiling(input: Data, ceiling: number, at: string): Data {
  const d = clone(input);
  d.ceiling = ceiling;
  d.lessons = d.lessons.filter((l) => !l.text.startsWith("سقف خودران دفتر"));
  d.lessons.unshift({
    id: nid("les"),
    agentId: "ledger",
    text: `سقف خودران دفتر ${toman(ceiling)} است. بالاتر را حمزه امضا می‌کند.`,
    at,
  });
  push(d, "ledger", `سقف خودران را ${toman(ceiling)} یاد گرفت.`, at, true);
  refresh(d);
  return d;
}

export function completeTask(input: Data, id: string, at: string): Data {
  const d = clone(input);
  const task = d.tasks.find((t) => t.id === id);
  if (!task || task.status === "done") return d;
  task.status = "done";
  if (id === "t-chairs") resolve(d, "alert-chairs");
  push(d, task.from, `${task.assignee} کار انسانی را بست: ${task.title}.`, at, false);
  refresh(d);
  return d;
}

export function remindStaff(input: Data, id: string, at: string): Data {
  const d = clone(input);
  const person = d.staff.find((s) => s.id === id);
  if (!person) return d;
  person.reminded = true;
  push(d, "floor", `یادآوری تازه برای ${person.name} رفت: ${person.role}، شیفت ${person.shift}.`, at, true);
  refresh(d);
  return d;
}

export function saveDirection(input: Data, text: string, at: string): Data {
  const d = clone(input);
  const direction = text.trim();
  if (!direction) return d;
  d.brandDirection = direction;
  const piece = d.content.find((c) => c.id === "c-pottery");
  if (piece && piece.status !== "sent") {
    piece.status = "steered";
    piece.draft = potteryCaption(direction);
  }
  d.flags.captionSteered = true;
  d.lessons.unshift({
    id: nid("les"),
    agentId: "brand",
    text: `جهت این دوره: ${direction}`,
    at,
  });
  push(d, "brand", "جهت راهبر محتوا را گرفت و کپشن سفال را دوباره نوشت.", at, true);
  refresh(d);
  return d;
}

export function steerPiece(input: Data, id: string, at: string): Data {
  const d = clone(input);
  const piece = d.content.find((c) => c.id === id);
  if (!piece || piece.status === "sent" || piece.status === "escalate") return d;
  piece.status = "steered";
  piece.draft = id === "c-poetry" ? poetryCaption(d.brandDirection) : potteryCaption(d.brandDirection);
  if (id === "c-pottery") d.flags.captionSteered = true;
  push(d, "brand", `«${piece.title}» با جهت فعلی برند هم‌تراز شد.`, at, true);
  refresh(d);
  return d;
}

export function releasePiece(input: Data, id: string, at: string): Data {
  const d = clone(input);
  const piece = d.content.find((c) => c.id === id);
  if (!piece || piece.status === "escalate" || piece.status === "sent") return d;
  piece.status = "sent";
  if (id === "c-pottery") {
    const task = d.tasks.find((t) => t.id === "t-post");
    if (task) task.status = "done";
  }
  push(d, "brand", `«${piece.title}» به لیلا برای انتشار سپرده شد.`, at, true);
  refresh(d);
  return d;
}

export function escalateSign(input: Data, at: string): Data {
  const d = clone(input);
  if (d.decisions.some((x) => x.id === "dec-sign")) return d;
  const piece = d.content.find((c) => c.id === "c-sign");
  d.decisions.unshift({
    id: "dec-sign",
    agentId: "brand",
    kind: "brand",
    title: "تغییر جملهٔ سردر کافه",
    detail: piece?.draft ?? "تغییر جملهٔ سردر از «قهوه و قصه» به «خانهٔ کودک گاچو».",
    prepared: "راهبر محتوا گفت این از اختیار روایت بیرون است. روایت منتظر ماند و منتشر نکرد.",
    rule: "تغییر هویت برند را راهبر محتوا جهت می‌دهد، ولی امضایش با حمزه است.",
    status: "pending",
    at,
  });
  push(d, "brand", "تغییر سردر را برای امضای حمزه فرستادم. خودم روی در ننوشتم.", at, true);
  refresh(d);
  return d;
}

export function markReport(input: Data, at: string): Data {
  const d = clone(input);
  if (d.reportRead) return d;
  d.reportRead = true;
  push(d, "brief", "حمزه گزارش صبح را دید. میزنامه نسخهٔ تازه نمی‌سازد مگر شب‌نامه برسد.", at, true);
  refresh(d);
  return d;
}
