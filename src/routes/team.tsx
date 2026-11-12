import { createFileRoute } from "@tanstack/react-router";
import { Btn, PageIntro, Pill } from "@/components/ui";
import { AGENT_LABEL, PRESENCE_LABEL, faNum } from "@/lib/tata/format";
import { useTata } from "@/lib/tata/store";

export const Route = createFileRoute("/team")({ component: Team });

function Team() {
  const staff = useTata((s) => s.data.staff);
  const tasks = useTata((s) => s.data.tasks);
  const remind = useTata((s) => s.remind);
  const completeTask = useTata((s) => s.completeTask);

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="کف سالن"
        title="حضور و کیفیت، بدون ایستادن پای هر پیام."
        lede="یادآوری را ایجنت خودش می‌فرستد. فقط عوض کردن نیرو به میز حمزه می‌آید. کارهایی که دست انسان می‌خواهد این پایین است."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {staff.map((person) => (
          <article key={person.id} className="rounded-lg border border-line bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold">{person.name}</h2>
                <p className="text-sm text-muted">
                  {person.role} · {person.shift}
                </p>
              </div>
              <Pill
                tone={
                  person.presence === "silent" ? "seal" : person.presence === "confirmed" || person.presence === "covered" ? "olive" : "muted"
                }
              >
                {PRESENCE_LABEL[person.presence]}
              </Pill>
            </div>
            <p className="mt-3 text-sm">{person.agentNote}</p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>کیفیت از نگاه کف سالن</span>
                <span className="num">{faNum(person.score)}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-paper-deep">
                <div
                  className={person.score >= 80 ? "h-full rounded-full bg-olive" : "h-full rounded-full bg-seal"}
                  style={{ width: `${person.score}%` }}
                />
              </div>
            </div>
            {(person.presence === "silent" || person.presence === "watched") && (
              <Btn tone="ghost" className="mt-3" onClick={() => remind(person.id)}>
                {person.reminded ? "یادآوری دوباره" : "یادآوری بفرست"}
              </Btn>
            )}
          </article>
        ))}
      </div>
      <section className="rounded-lg border border-line bg-card p-4">
        <h2 className="font-bold">کار انسانی</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex flex-col gap-2 border-b border-line pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={task.status === "done" ? "text-muted line-through" : "font-medium"}>{task.title}</p>
                <p className="text-sm text-muted">
                  {task.assignee} · از {AGENT_LABEL[task.from]}
                </p>
              </div>
              {task.status === "open" ? (
                <Btn tone="ink" onClick={() => completeTask(task.id)}>
                  انجام شد
                </Btn>
              ) : (
                <Pill tone="olive">بسته شد</Pill>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
