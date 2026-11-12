import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { tehranWeekday, toman, tomanShort } from "@/lib/tata/format";
import type { LedgerEntry } from "@/lib/tata/types";

const PAST = [
  { offset: -6, income: 3_200_000, expense: 1_100_000 },
  { offset: -5, income: 4_100_000, expense: 900_000 },
  { offset: -4, income: 2_800_000, expense: 1_400_000 },
  { offset: -3, income: 5_000_000, expense: 2_200_000 },
  { offset: -2, income: 3_600_000, expense: 800_000 },
  { offset: -1, income: 4_850_000, expense: 1_150_000 },
];

export function WeekChart({ ledger }: { ledger: LedgerEntry[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const income = ledger.filter((e) => e.kind === "income").reduce((a, e) => a + e.amount, 0);
  const expense = ledger.filter((e) => e.kind === "expense").reduce((a, e) => a + e.amount, 0);
  const data = [
    ...PAST.map((day) => ({
      label: tehranWeekday(day.offset),
      income: day.income,
      expense: day.expense,
    })),
    { label: "امروز", income, expense },
  ];

  return (
    <section className="rounded-lg border border-line bg-card p-4">
      <h2 className="font-bold">هفت روز صندوق</h2>
      <p className="mt-1 text-sm text-muted">ستون تیره درآمد است و ستون سبز هزینه. امروز با ثبت‌های زنده عوض می‌شود.</p>
      <div className="mt-4 h-52 w-full min-w-0" dir="ltr">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={2}>
              <XAxis dataKey="label" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(value, name) => [toman(Number(value ?? 0)), name === "income" ? "درآمد" : "هزینه"]}
                labelFormatter={(label) => String(label)}
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-line)",
                  borderRadius: 8,
                  direction: "rtl",
                  fontFamily: "Vazirmatn, sans-serif",
                }}
              />
              <Bar dataKey="income" name="income" fill="var(--color-seal)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="expense" name="expense" fill="var(--color-olive)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : null}
      </div>
      <p className="sr-only">
        {data.map((d) => `${d.label}: درآمد ${tomanShort(d.income)}، هزینه ${tomanShort(d.expense)}`).join("؛ ")}
      </p>
    </section>
  );
}
