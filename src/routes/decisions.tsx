import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DecisionCard, PageIntro } from "@/components/ui";
import { useTata } from "@/lib/tata/store";
import type { DecisionKind } from "@/lib/tata/types";

export const Route = createFileRoute("/decisions")({ component: Decisions });

const FILTERS: { id: "open" | "closed" | DecisionKind; label: string }[] = [
  { id: "open", label: "باز" },
  { id: "finance", label: "مالی" },
  { id: "schedule", label: "برنامه" },
  { id: "hr", label: "نیرو" },
  { id: "brand", label: "برند" },
  { id: "closed", label: "بسته‌شده" },
];

function Decisions() {
  const decisions = useTata((s) => s.data.decisions);
  const ceiling = useTata((s) => s.data.ceiling);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("open");
  const items = decisions.filter((item) => {
    if (filter === "open") return item.status === "pending";
    if (filter === "closed") return item.status !== "pending";
    return item.kind === filter;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="صف امضا"
        title="فقط خط قرمز اینجاست."
        lede={`خرج بالای سقف، تغییر برنامهٔ اصلی، نیروی صحنه و هویت برند. سقف فعلی دفتر ${new Intl.NumberFormat("fa-IR").format(ceiling)} تومان است.`}
      />
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              filter === item.id
                ? "min-h-11 rounded-full bg-ink px-4 text-sm text-paper"
                : "min-h-11 rounded-full border border-line bg-card px-4 text-sm"
            }
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted">در این صافی چیزی نیست. یعنی ایجنت مربوطه خودش بسته یا هنوز نرسیده.</p>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {items.map((item) => (
            <DecisionCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
