import { createFileRoute } from "@tanstack/react-router";
import { Btn, PageIntro, Pill } from "@/components/ui";
import { WeekChart } from "@/components/week-chart";
import { BAND_LABEL, faNum, tehranDateLabel } from "@/lib/tata/format";
import { managementLines } from "@/lib/tata/insight";
import { useTata } from "@/lib/tata/store";

export const Route = createFileRoute("/reports")({ component: Reports });

function Reports() {
  const data = useTata((s) => s.data);
  const role = useTata((s) => s.role);
  const markReport = useTata((s) => s.markReport);
  const lines = managementLines(data);
  const autoN = data.activity.filter((a) => a.auto).length;
  const signed = data.decisions.filter((d) => d.status === "approved").length;
  const total = autoN + signed;
  const ratio = total ? Math.round((autoN / total) * 100) : 100;

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="میزنامه"
        title="گزارش مدیریتی برای حمزه تاتا"
        lede={`${tehranDateLabel()} · یک صفحه، از کار واقعی ایجنت‌ها. لازم نیست دفتر خام را ورق بزنی.`}
      />
      <article className="rounded-lg border border-line bg-card p-5">
        <ol className="flex flex-col gap-3">
          {lines.map((line) => (
            <li key={line} className="text-sm sm:text-base">
              {line}
            </li>
          ))}
        </ol>
        <p className="num mt-4 text-sm text-olive">
          {faNum(ratio)}٪ از اقدام‌های ثبت‌شده خودران بوده و {faNum(signed)} مورد با امضای تو اجرا شده.
        </p>
        {data.reportRead ? (
          <p className="mt-4 text-sm text-muted">حمزه این نسخه را دیده. نسخهٔ بعد با شب‌نامه می‌آید.</p>
        ) : (
          <Btn className="mt-4" disabled={role !== "hamzeh"} onClick={() => markReport()}>
            دیدم
          </Btn>
        )}
      </article>
      <WeekChart ledger={data.ledger} />
      <section className="overflow-hidden rounded-lg border border-line bg-card">
        <h2 className="border-b border-line px-4 py-3 font-bold">اختیار هر ایجنت</h2>
        <ul>
          {data.agents.map((agent) => (
            <li key={agent.id} className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0">
              <div>
                <p className="font-medium">{agent.name}</p>
                <p className="text-sm text-muted">{agent.duty}</p>
              </div>
              <Pill tone={agent.band === "auto" ? "olive" : agent.band === "content-lead" ? "seal" : "muted"}>
                {BAND_LABEL[agent.band]}
              </Pill>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
