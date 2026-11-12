import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ActivityFeed, Btn, DecisionCard, Note, PageIntro, Panel, Pill, Stat } from "@/components/ui";
import { faNum, toman } from "@/lib/tata/format";
import { peekBeat } from "@/lib/tata/engine";
import { useTata } from "@/lib/tata/store";
import type { Data, Decision } from "@/lib/tata/types";

export const Route = createFileRoute("/")({ component: Home });

function money(data: Data, kind: "income" | "expense") {
  return data.ledger.filter((e) => e.kind === kind).reduce((acc, e) => acc + e.amount, 0);
}

function Home() {
  const data = useTata((s) => s.data);
  const beat = useTata((s) => s.beat);
  const [note, setNote] = useState<string | null>(null);
  const pending = data.decisions.filter((d) => d.status === "pending");
  const done = data.decisions.filter((d) => d.status !== "pending");
  const income = money(data, "income");
  const openAlerts = data.alerts.filter((a) => !a.resolved);
  const autoN = data.activity.filter((a) => a.auto).length;
  const drafts = data.content.filter((c) => c.status === "draft").length;

  return (
    <div className="flex flex-col gap-8">
      <PageIntro
        kicker="میز فرمان حمزه"
        title={pending.length ? `${faNum(pending.length)} تصمیم روی میز توست.` : "میز امضا خالی است."}
        lede="کار تکراری را هشت ایجنت بی‌اجازه جلو می‌برند: برنامهٔ جزئی، ثبت‌نام، یادآوری، خرج زیر سقف. تو ناظری، نه اپراتور."
        action={
          <div className="flex w-full flex-col gap-2 sm:max-w-xs sm:items-end">
            <Btn className="w-full" onClick={() => setNote(beat())}>
              یک قدم خودران
            </Btn>
            <p className="text-xs text-muted">{peekBeat(data)}</p>
          </div>
        }
      />
      {note && <Note>{note}</Note>}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="خودران تا الآن" value={faNum(autoN)} hint="بی‌امضای حمزه" />
        <Stat label="منتظر امضا" value={faNum(pending.length)} hint="مالی، نیرو، برنامهٔ اصلی" />
        <Stat label="صندوق امروز" value={income ? toman(income) : "صفر"} hint="دفتر خودش دسته می‌کند" />
        <Stat label="ریسک باز" value={faNum(openAlerts.length)} hint="دیده‌بان، قبل از وقوع" />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-bold">فقط این‌ها امضا می‌خواهند</h2>
          <Link to="/decisions" className="text-sm text-seal">
            همهٔ امضاها
          </Link>
        </div>
        {pending.length === 0 ? (
          <Note>چیزی برای امضا نمانده. ایجنت‌ها طبق سقف اختیار کار می‌کنند و شب‌نامه ۲۲:۳۰ می‌رود.</Note>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            {pending.map((item) => (
              <DecisionCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {done.length > 0 && (
          <div className="grid gap-2">
            {done.slice(0, 3).map((item) => (
              <DecisionCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="برنامهٔ امروز" aside={<Link to="/program" className="text-sm text-seal">تقویم</Link>}>
          <ol className="flex flex-col gap-3">
            {data.programs
              .filter((p) => p.when === "امروز")
              .map((item) => (
                <li key={item.id} className="border-b border-line pb-3 last:border-b-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="num text-sm font-medium">
                      {item.start}–{item.end}
                    </span>
                    <Pill tone={item.status === "conflict" ? "seal" : item.status === "set" ? "olive" : "muted"}>
                      {item.status === "conflict" ? "تداخل" : item.status === "set" ? "قطعی" : "معلق"}
                    </Pill>
                  </div>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="text-sm text-muted">
                    {item.place} · {item.lead}
                    {item.kind !== "cafe" ? ` · ${faNum(item.enrolled)} از ${faNum(item.capacity)}` : ""}
                  </p>
                </li>
              ))}
          </ol>
        </Panel>
        <div className="flex flex-col gap-4">
          <Panel title="دیده‌بان">
            {openAlerts.length === 0 ? (
              <p className="text-sm text-muted">ریسک بازی نمانده.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {openAlerts.map((alert) => (
                  <li key={alert.id} className="border-r-2 border-seal pr-3">
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-muted">{alert.detail}</p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Agenda data={data} pending={pending} />
        </div>
      </div>

      {drafts > 0 && (
        <Note>
          روایت {faNum(drafts)} پیش‌نویس دارد. این کار میز حمزه نیست.{" "}
          <Link to="/brand" className="font-medium text-seal">
            میز راهبر محتوا
          </Link>
        </Note>
      )}

      <Panel title="ایجنت‌ها بی‌صدا کار کرده‌اند" aside={<Link to="/agents" className="text-sm text-seal">معماری</Link>}>
        <ActivityFeed items={data.activity.slice(0, 6)} />
      </Panel>
    </div>
  );
}

function Agenda({ data, pending }: { data: Data; pending: Decision[] }) {
  const deposit = data.decisions.find((d) => d.id === "dec-deposit");
  const rows = [
    {
      time: "قبل از ۸",
      title: "امضاهای روی میز",
      need: pending.length ? "لازم" : "تمام",
      detail: pending.length
        ? `${faNum(pending.length)} مورد از خط اختیار گذشته. بقیه را خودشان می‌برند.`
        : "چیزی نمانده که فقط تو بتوانی ببندی.",
    },
    {
      time: "ظهر",
      title: "سر زدن به سفال",
      need: "لازم نیست",
      detail: "نازنین کلاس را می‌چیند و ثبت‌نام ظرفیت را نگه می‌دارد.",
    },
    {
      time: "۱۸:۱۰",
      title: "سلام کوتاه شب شعر",
      need: "اختیاری",
      detail: "اگر نروی، مریم پذیرش را می‌بندد. برنامهٔ اصلی جابه‌جا نمی‌شود.",
    },
    {
      time: "فردا ۱۹",
      title: "کنسرت",
      need: deposit?.status === "approved" ? "نمادین" : "معلق",
      detail:
        deposit?.status === "approved"
          ? "بیعانه خورده. لازم نیست جزئیات را خودت پیگیری کنی."
          : "تا بیعانه امضا نشود، روایت حق اعلام عمومی ندارد.",
    },
  ];
  return (
    <Panel title="حضور تو">
      <ul className="flex flex-col gap-3">
        {rows.map((row) => (
          <li key={row.time} className="flex gap-3">
            <span className="num w-16 shrink-0 text-sm text-muted">{row.time}</span>
            <div>
              <p className="font-medium">
                {row.title}{" "}
                <span className={row.need === "لازم" || row.need === "معلق" ? "text-seal" : "text-muted"}>
                  · {row.need}
                </span>
              </p>
              <p className="text-sm text-muted">{row.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
