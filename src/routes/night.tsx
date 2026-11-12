import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/ui";
import { buildNightDraft } from "@/lib/tata/insight";
import { useTata } from "@/lib/tata/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/night")({ component: Night });

function Night() {
  const data = useTata((s) => s.data);
  const [tab, setTab] = useState<"live" | "sent">("live");
  const live = buildNightDraft(data);
  const view =
    tab === "live"
      ? { title: "پیش‌نویس امشب", sentAt: "۲۲:۳۰، خودکار", ...live }
      : {
          title: data.letter.title,
          sentAt: `ارسال شد ${data.letter.sentAt}`,
          wins: data.letter.wins,
          issues: data.letter.issues,
          tomorrow: data.letter.tomorrow,
        };

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="خودارزیابی شبانه"
        title="سه پیام، سر ساعت، بی‌اجازه."
        lede="شب‌نامه هر شب ۲۲:۳۰ برای حمزه می‌رود: چه خوب پیش رفت، ضعف کجا بود، فردا دقیقاً چه باید کرد. متن از کار همان روز ساخته می‌شود، نه از جملهٔ کلی."
      />
      <div className="flex gap-2">
        {(
          [
            ["live", "پیش‌نویس امشب"],
            ["sent", "دیشب، ارسال‌شده"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={cn(
              "min-h-11 rounded-full px-4 text-sm",
              tab === id ? "bg-ink text-paper" : "border border-line bg-card",
            )}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted">
        {view.title} · {view.sentAt}. اگر امروز چیزی را امضا یا رد کنی، پیش‌نویس امشب همان لحظه عوض می‌شود.
      </p>
      <div className="grid gap-3 lg:grid-cols-3">
        <Column n="۱" title="چه خوب پیش رفت" tone="olive" items={view.wins} />
        <Column n="۲" title="ایراد و نقطهٔ ضعف" tone="seal" items={view.issues} />
        <Column n="۳" title="فردا باید چه شود" tone="ink" items={view.tomorrow} />
      </div>
    </div>
  );
}

function Column({
  n,
  title,
  tone,
  items,
}: {
  n: string;
  title: string;
  tone: "olive" | "seal" | "ink";
  items: string[];
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-line bg-card p-4 border-t-4",
        tone === "olive" && "border-t-olive",
        tone === "seal" && "border-t-seal",
        tone === "ink" && "border-t-ink",
      )}
    >
      <p className="num text-sm text-muted">{n}</p>
      <h2 className="mt-1 font-bold">{title}</h2>
      <ol className="mt-3 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-sm">
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
