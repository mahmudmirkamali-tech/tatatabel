import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { Btn, Note, PageIntro } from "@/components/ui";
import { WeekChart } from "@/components/week-chart";
import { faNum, toman } from "@/lib/tata/format";
import { useTata } from "@/lib/tata/store";

export const Route = createFileRoute("/ledger")({ component: Ledger });

const SAMPLES = [
  "درآمد کارگاه سفال ۴۰۰ هزار",
  "هزینه دانه قهوه ۴۲۰ هزار",
  "فروش امروز کافه ۱ میلیون و دویست هزار",
  "هزینه بیعانه نور ۵ میلیون",
];

const CEILINGS = [1_000_000, 2_000_000, 5_000_000];

type Rec = {
  lang: string;
  start: () => void;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
};

function Ledger() {
  const data = useTata((s) => s.data);
  const role = useTata((s) => s.role);
  const voice = useTata((s) => s.voice);
  const setCeiling = useTata((s) => s.setCeiling);
  const [text, setText] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const income = data.ledger.filter((e) => e.kind === "income").reduce((a, e) => a + e.amount, 0);
  const expense = data.ledger.filter((e) => e.kind === "expense").reduce((a, e) => a + e.amount, 0);

  function submit(value: string) {
    const said = value.trim();
    if (!said) return;
    setNote(voice(said));
    setText("");
  }

  function listen() {
    const w = window as unknown as {
      SpeechRecognition?: new () => Rec;
      webkitSpeechRecognition?: new () => Rec;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setNote("میکروفون در این مرورگر نیست. همان جمله را بنویس.");
      return;
    }
    const rec = new Ctor();
    rec.lang = "fa-IR";
    rec.onresult = (ev) => {
      const said = ev.results[0]?.[0]?.transcript ?? "";
      setListening(false);
      if (said) submit(said);
    };
    rec.onerror = () => {
      setListening(false);
      setNote("صدا قطع شد. جمله را بنویس.");
    };
    setListening(true);
    rec.start();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="دفتر"
        title="بگو درآمد است یا هزینه."
        lede="دفتر جمله را می‌شنود، دسته می‌کند و اگر زیر سقف باشد خودش می‌نویسد. حقوق، بیعانه و مبلغ بالاتر می‌رود روی میز حمزه."
      />
      <form
        className="rounded-lg border border-line bg-card p-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit(text);
        }}
      >
        <label htmlFor="utterance" className="text-sm font-medium">
          فرمان صوتی یا نوشتاری
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="utterance"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="مثلاً: هزینه دانه قهوه ۴۲۰ هزار"
            className="min-h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none"
          />
          <Btn type="submit">ثبت</Btn>
          <Btn type="button" tone="ghost" onClick={listen} aria-pressed={listening}>
            <Mic className="size-4" aria-hidden />
            {listening ? "در حال شنیدن" : "بگو"}
          </Btn>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SAMPLES.map((sample) => (
            <button
              key={sample}
              type="button"
              className="min-h-11 rounded-full border border-line px-3 text-xs"
              onClick={() => submit(sample)}
            >
              {sample}
            </button>
          ))}
        </div>
      </form>
      {note && <Note>{note}</Note>}

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-card p-4">
          <p className="text-xs text-muted">درآمد امروز</p>
          <p className="num mt-1 text-xl font-bold">{toman(income)}</p>
        </div>
        <div className="rounded-lg border border-line bg-card p-4">
          <p className="text-xs text-muted">هزینهٔ امروز</p>
          <p className="num mt-1 text-xl font-bold">{toman(expense)}</p>
        </div>
        <div className="rounded-lg border border-line bg-card p-4">
          <p className="text-xs text-muted">مانده</p>
          <p className="num mt-1 text-xl font-bold">{toman(income - expense)}</p>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-card p-4">
        <h2 className="font-bold">سقف خودران دفتر</h2>
        <p className="mt-1 text-sm text-muted">
          الان {toman(data.ceiling)}. این را فقط حمزه یاد می‌دهد. بالاتر از آن، دفتر می‌نویسد ولی پرداخت نمی‌کند.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CEILINGS.map((n) => (
            <Btn
              key={n}
              tone={data.ceiling === n ? "ink" : "ghost"}
              disabled={role !== "hamzeh"}
              onClick={() => setCeiling(n)}
            >
              {faNum(n / 1_000_000)} میلیون
            </Btn>
          ))}
        </div>
      </section>

      <WeekChart ledger={data.ledger} />

      <section className="rounded-lg border border-line bg-card p-4">
        <h2 className="font-bold">ثبت‌های امروز</h2>
        {data.ledger.length === 0 ? (
          <p className="mt-2 text-sm text-muted">هنوز چیزی نوشته نشده. یک جمله بگو تا دفتر دسته کند.</p>
        ) : (
          <ul className="mt-2">
            {data.ledger.map((entry) => (
              <li key={entry.id} className="flex items-start justify-between gap-3 border-b border-line py-3 last:border-b-0">
                <div>
                  <p className="font-medium">
                    {entry.kind === "income" ? "درآمد" : "هزینه"} · {entry.category}
                  </p>
                  <p className="text-sm text-muted">{entry.note}</p>
                </div>
                <div className="text-left">
                  <p className="num font-medium">{toman(entry.amount)}</p>
                  <p className="text-xs text-muted">
                    {entry.source === "voice" ? "صدا" : entry.source === "agent" ? "خودران" : "بعد از امضا"} · {entry.at}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
