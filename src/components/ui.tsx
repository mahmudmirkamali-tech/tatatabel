import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { AGENT_LABEL, DECISION_LABEL, REJECT_REASONS, faNum, toman } from "@/lib/tata/format";
import { useTata } from "@/lib/tata/store";
import type { Activity, Decision } from "@/lib/tata/types";
import { cn } from "@/lib/utils";

export function Btn({
  tone = "seal",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "seal" | "ghost" | "ink" }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        tone === "seal" && "bg-seal text-seal-ink",
        tone === "ghost" && "border border-line bg-card text-ink",
        tone === "ink" && "bg-ink text-paper",
        className,
      )}
      {...props}
    />
  );
}

export function Pill({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "seal" | "olive" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
        tone === "ink" && "bg-ink text-paper",
        tone === "seal" && "bg-seal-soft text-seal",
        tone === "olive" && "bg-olive-soft text-olive",
        tone === "muted" && "bg-paper-deep text-muted",
      )}
    >
      {children}
    </span>
  );
}

export function PageIntro({
  kicker,
  title,
  lede,
  action,
}: {
  kicker: string;
  title: string;
  lede: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-seal">{kicker}</p>
        <h1 className="mt-1 text-2xl font-bold leading-snug sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-muted sm:text-base">{lede}</p>
      </div>
      {action}
    </header>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg border border-line bg-card px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="num mt-1 text-xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-line bg-seal-soft px-3 py-2 text-sm text-ink">{children}</p>
  );
}

export function Panel({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-line bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h2 className="font-bold">{title}</h2>
        {aside}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function DecisionCard({ item }: { item: Decision }) {
  const role = useTata((s) => s.role);
  const approve = useTata((s) => s.approve);
  const reject = useTata((s) => s.reject);
  const setRole = useTata((s) => s.setRole);
  const [open, setOpen] = useState(false);
  const canSign = role === "hamzeh";

  if (item.status !== "pending") {
    return (
      <article className="flex items-start justify-between gap-3 rounded-md border border-line bg-paper px-3 py-3">
        <div>
          <p className="text-sm font-medium">{item.title}</p>
          <p className="text-xs text-muted">{item.status === "approved" ? "امضا شد و ایجنت‌ها اجرا کردند" : "رد شد و به درس ایجنت بدل شد"}</p>
        </div>
        <span className="num shrink-0 text-xs text-muted">{item.at}</span>
      </article>
    );
  }

  return (
    <article className="rounded-lg border border-line bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="seal">{DECISION_LABEL[item.kind]}</Pill>
        <Pill>{AGENT_LABEL[item.agentId]}</Pill>
        {item.amount != null && <span className="num text-sm font-medium">{toman(item.amount)}</span>}
      </div>
      <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
      <p className="mt-1 text-sm">{item.detail}</p>
      <p className="mt-3 text-sm text-muted">آماده کرده: {item.prepared}</p>
      <p className="mt-1 text-sm text-seal">چرا نپرسیده رد نشده: {item.rule}</p>
      {canSign ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Btn className="flex-1" onClick={() => approve(item.id)}>
            تأیید و بسپار به ایجنت
          </Btn>
          <Btn tone="ghost" className="flex-1" onClick={() => setOpen((v) => !v)}>
            رد کن و یادش بده
          </Btn>
        </div>
      ) : (
        <div className="mt-4">
          <Note>امضا فقط با حمزه است. از این میز نمی‌توانی این را ببندی.</Note>
          <Btn tone="ghost" className="mt-2" onClick={() => setRole("hamzeh")}>
            برگشت به میز حمزه
          </Btn>
        </div>
      )}
      {open && canSign && (
        <div className="mt-3 flex flex-col gap-2">
          {REJECT_REASONS[item.kind].map((reason) => (
            <Btn key={reason} tone="ghost" onClick={() => reject(item.id, reason)}>
              {reason}
            </Btn>
          ))}
        </div>
      )}
    </article>
  );
}

export function ActivityFeed({ items }: { items: Activity[] }) {
  return (
    <ol className="flex flex-col">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3 border-b border-line py-3 last:border-b-0">
          <span className="num w-12 shrink-0 text-xs text-muted">{item.at}</span>
          <div className="min-w-0">
            <p className="text-xs text-muted">
              {AGENT_LABEL[item.agentId]}
              {item.auto ? " · خودران" : " · با انسان"}
            </p>
            <p className="text-sm">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function EmptyLine({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted">{children}</p>;
}

export function Count({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <span className="num rounded-sm bg-seal px-1.5 text-xs font-medium text-seal-ink">{faNum(n)}</span>
  );
}
