import { createFileRoute } from "@tanstack/react-router";
import { Btn, PageIntro, Pill } from "@/components/ui";
import { AGENT_LABEL, BAND_LABEL, STATUS_LABEL } from "@/lib/tata/format";
import { useTata } from "@/lib/tata/store";

export const Route = createFileRoute("/agents")({ component: Agents });

function Agents() {
  const data = useTata((s) => s.data);
  const reset = useTata((s) => s.reset);

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="معماری اختیار"
        title="هشت ایجنت، یک ناظر."
        lede="خودران‌ها نمی‌پرسند. تا خط قرمزها کار را می‌برند و فقط استثنا را بالا می‌آورند. روایت به راهبر محتوا جواب می‌دهد و حمزه بر همه اشراف دارد."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-lg border border-line bg-olive-soft p-4">
          <h2 className="font-bold text-olive">خودران</h2>
          <p className="mt-2 text-sm">ثبت‌نام، دیده‌بان، شب‌نامه، میزنامه. حتی برای اطلاع هم معطل نمی‌مانند.</p>
        </article>
        <article className="rounded-lg border border-line bg-card p-4">
          <h2 className="font-bold">خودران تا خط</h2>
          <p className="mt-2 text-sm">زمان‌بند، کف سالن، دفتر. کار جزئی را می‌بندند. برنامهٔ اصلی، نیرو و خرج بزرگ می‌ماند برای امضا.</p>
        </article>
        <article className="rounded-lg border border-line bg-seal-soft p-4">
          <h2 className="font-bold text-seal">راهبر محتوا</h2>
          <p className="mt-2 text-sm">روایت لحن و آموزش را از تو می‌گیرد. نشان و سردر را بدون حمزه عوض نمی‌کند.</p>
        </article>
      </div>

      <div className="flex flex-col gap-3">
        {data.agents.map((agent) => {
          const learned = data.lessons.filter((l) => l.agentId === agent.id).slice(0, 3);
          return (
            <article key={agent.id} className="rounded-lg border border-line bg-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold">{agent.name}</h2>
                <Pill tone={agent.band === "content-lead" ? "seal" : agent.band === "auto" ? "olive" : "muted"}>
                  {BAND_LABEL[agent.band]}
                </Pill>
                <Pill tone={agent.status === "waiting" ? "seal" : "ink"}>{STATUS_LABEL[agent.status]}</Pill>
              </div>
              <p className="mt-2 text-sm">{agent.duty}</p>
              <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-muted">پاسخ‌گو به</dt>
                  <dd>{agent.accountable}</dd>
                </div>
                <div>
                  <dt className="text-muted">همکار</dt>
                  <dd>{agent.worksWith}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm">{agent.autonomyNote}</p>
              <p className="mt-3 border-t border-line pt-3 text-sm">
                <span className="text-muted">آخرین کار: </span>
                {agent.lastAction}
              </p>
              {learned.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1 text-sm text-olive">
                  {learned.map((lesson) => (
                    <li key={lesson.id}>یاد گرفته: {lesson.text}</li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>

      <section className="rounded-lg border border-line bg-card p-4">
        <h2 className="font-bold">چه چیزی را دیگر نمی‌پرسند</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {data.lessons.map((lesson) => (
            <li key={lesson.id} className="border-b border-line pb-2 last:border-b-0">
              <span className="text-muted">{AGENT_LABEL[lesson.agentId]} · </span>
              {lesson.text}
            </li>
          ))}
        </ul>
        <Btn tone="ghost" className="mt-4" onClick={() => reset()}>
          بازگشت به صبح امروز
        </Btn>
      </section>
    </div>
  );
}
