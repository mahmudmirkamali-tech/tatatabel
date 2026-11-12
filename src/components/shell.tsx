import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Bot,
  CalendarDays,
  LayoutDashboard,
  Moon,
  ScrollText,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Count } from "@/components/ui";
import { tehranDateLabel, tehranNowLabel } from "@/lib/tata/format";
import { useTata } from "@/lib/tata/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "میز", icon: LayoutDashboard, exact: true },
  { to: "/decisions", label: "امضا", icon: ShieldCheck },
  { to: "/program", label: "برنامه", icon: CalendarDays },
  { to: "/ledger", label: "دفتر", icon: Wallet },
  { to: "/agents", label: "ایجنت‌ها", icon: Bot },
  { to: "/night", label: "شب‌نامه", icon: Moon },
  { to: "/team", label: "تیم", icon: Users },
  { to: "/brand", label: "روایت", icon: BookOpen },
  { to: "/reports", label: "گزارش", icon: ScrollText },
] as const;

const MOBILE = new Set(["/", "/decisions", "/program", "/ledger"]);

function Clock() {
  const [time, setTime] = useState("—");
  useEffect(() => {
    const tick = () => setTime(tehranNowLabel());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="num">{time}</span>;
}

export function Shell({ children }: { children: ReactNode }) {
  const hydrate = useTata((s) => s.hydrate);
  const role = useTata((s) => s.role);
  const setRole = useTata((s) => s.setRole);
  const pending = useTata((s) => s.data.decisions.filter((d) => d.status === "pending").length);
  const drafts = useTata((s) => s.data.content.filter((c) => c.status === "draft").length);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [more, setMore] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    setMore(false);
  }, [path]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="md:grid md:grid-cols-[15.5rem_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-l border-line bg-card md:flex">
          <div className="border-b border-line px-4 py-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-md bg-seal text-lg font-bold text-seal-ink">
                ت
              </span>
              <div>
                <p className="text-xs text-muted">کافه فرهنگ گاچو</p>
                <p className="font-bold">میز تاتا</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {NAV.map((item) => (
              <NavLink key={item.to} {...item} badge={badgeFor(item.to, pending, drafts)} />
            ))}
          </nav>
          <p className="px-4 pb-4 text-xs leading-relaxed text-muted">
            فرهنگسرا، آموزشگاه، کافه و ایونت. ایجنت‌ها می‌برند؛ حمزه امضا می‌کند.
          </p>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-line bg-paper px-4 py-3 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:block">
                <span className="flex size-10 items-center justify-center rounded-md bg-seal font-bold text-seal-ink md:hidden">
                  ت
                </span>
                <div>
                  <p className="text-sm font-bold md:text-base">{tehranDateLabel()}</p>
                  <p className="text-xs text-muted">
                    تهران <Clock />
                    <span className="mx-1">·</span>
                    {role === "hamzeh" ? "ناظر: حمزه تاتا" : "هدایت: راهبر محتوا"}
                  </p>
                </div>
              </div>
              <div className="flex rounded-full border border-line bg-card p-1">
                <button
                  type="button"
                  className={cn(
                    "min-h-11 rounded-full px-3 text-sm",
                    role === "hamzeh" ? "bg-ink text-paper" : "text-muted",
                  )}
                  onClick={() => setRole("hamzeh")}
                >
                  حمزه
                </button>
                <button
                  type="button"
                  className={cn(
                    "min-h-11 rounded-full px-3 text-sm",
                    role === "content" ? "bg-ink text-paper" : "text-muted",
                  )}
                  onClick={() => setRole("content")}
                >
                  راهبر محتوا
                </button>
              </div>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 md:px-8 md:pb-16">{children}</main>
        </div>
      </div>

      {more && (
        <div className="fixed inset-x-0 bottom-16 z-30 border-t border-line bg-card p-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {NAV.filter((item) => !MOBILE.has(item.to)).map((item) => (
              <NavLink key={item.to} {...item} badge={badgeFor(item.to, pending, drafts)} />
            ))}
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-card md:hidden">
        {NAV.filter((item) => MOBILE.has(item.to)).map((item) => (
          <NavLink key={item.to} {...item} compact badge={badgeFor(item.to, pending, drafts)} />
        ))}
        <button
          type="button"
          className={cn(
            "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs",
            more ? "text-seal" : "text-muted",
          )}
          onClick={() => setMore((v) => !v)}
        >
          بیشتر
          <Count n={drafts} />
        </button>
      </nav>
    </div>
  );
}

function badgeFor(to: string, pending: number, drafts: number) {
  if (to === "/decisions") return pending;
  if (to === "/brand") return drafts;
  return 0;
}

function NavLink({
  to,
  label,
  icon: Icon,
  exact,
  compact,
  badge,
}: {
  to: "/" | "/decisions" | "/program" | "/ledger" | "/agents" | "/night" | "/team" | "/brand" | "/reports";
  label: string;
  icon: typeof Bot;
  exact?: boolean;
  compact?: boolean;
  badge: number;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: Boolean(exact) }}
      className={cn(
        "flex items-center gap-2 rounded-md text-sm",
        compact ? "min-h-14 flex-col justify-center gap-0.5 text-xs" : "min-h-11 px-3",
      )}
      activeProps={{ className: compact ? "text-seal" : "bg-ink text-paper" }}
      inactiveProps={{ className: "text-muted" }}
    >
      <Icon className="size-4" aria-hidden />
      <span className="inline-flex items-center gap-1">
        {label}
        <Count n={badge} />
      </span>
    </Link>
  );
}
