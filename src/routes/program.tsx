import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Pill } from "@/components/ui";
import { PROGRAM_LABEL, faNum } from "@/lib/tata/format";
import { useTata } from "@/lib/tata/store";

export const Route = createFileRoute("/program")({ component: Program });

const ORDER = ["امروز", "فردا", "شنبه"];

function Program() {
  const programs = useTata((s) => s.data.programs);
  const registrations = useTata((s) => s.data.registrations);
  const whens = ORDER.filter((when) => programs.some((p) => p.when === when));

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="زمان‌بند و ثبت‌نام"
        title="کلاس، کارگاه، ایونت، کنسرت، کافه."
        lede="برنامهٔ اصلی هفته بدون امضای حمزه تکان نمی‌خورد. جابه‌جایی جزئی، ظرفیت و پیامک را خود ایجنت‌ها می‌بندند."
      />
      {whens.map((when) => (
        <section key={when} className="flex flex-col gap-3">
          <h2 className="font-bold">{when}</h2>
          {programs
            .filter((item) => item.when === when)
            .map((item) => (
              <article key={item.id} className="rounded-lg border border-line bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill>{PROGRAM_LABEL[item.kind]}</Pill>
                  <Pill tone={item.status === "conflict" ? "seal" : item.status === "set" ? "olive" : "muted"}>
                    {item.status === "conflict" ? "تداخل" : item.status === "set" ? "قطعی" : "منتظر امضا"}
                  </Pill>
                  <span className="num text-sm">
                    {item.start}–{item.end}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted">
                  {item.place} · {item.lead}
                  {item.kind === "cafe"
                    ? " · شیفت باز"
                    : ` · ${faNum(item.enrolled)} از ${faNum(item.capacity)}`}
                </p>
                <p className="mt-2 text-sm">{item.note}</p>
              </article>
            ))}
        </section>
      ))}
      <section className="rounded-lg border border-line bg-card p-4">
        <h2 className="font-bold">استثناهای ثبت‌نام</h2>
        <p className="mt-1 text-sm text-muted">جمعیت عادی را ثبت‌نام خودش نگه می‌دارد. اینجا فقط چیزی است که تصمیم یا پیگیری می‌خواهد.</p>
        <ul className="mt-3 flex flex-col gap-3">
          {registrations.map((item) => (
            <li key={item.id} className="border-b border-line pb-3 last:border-b-0">
              <p className="font-medium">
                {item.name}{" "}
                <span className="text-sm font-normal text-muted">
                  · {item.status === "cancelled" ? "انصراف" : item.status === "offered" ? "پیشنهاد شده" : item.status === "waitlist" ? "انتظار" : "قطعی"}
                </span>
              </p>
              <p className="text-sm text-muted">{item.agentNote}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
