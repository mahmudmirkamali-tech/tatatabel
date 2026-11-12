import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Btn, Note, PageIntro, Pill } from "@/components/ui";
import { useTata } from "@/lib/tata/store";

export const Route = createFileRoute("/brand")({ component: Brand });

const STATUS: Record<string, string> = {
  draft: "خام",
  steered: "هم‌تراز با جهت",
  sent: "سپرده به لیلا",
  escalate: "بالاتر از این میز",
};

function Brand() {
  const data = useTata((s) => s.data);
  const role = useTata((s) => s.role);
  const setRole = useTata((s) => s.setRole);
  const saveDirection = useTata((s) => s.saveDirection);
  const steer = useTata((s) => s.steer);
  const release = useTata((s) => s.release);
  const escalateSign = useTata((s) => s.escalateSign);
  const [text, setText] = useState(data.brandDirection);
  const canSteer = role === "content";
  const signSent = data.decisions.some((d) => d.id === "dec-sign");

  useEffect(() => {
    setText(data.brandDirection);
  }, [data.brandDirection]);

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        kicker="میز راهبر محتوا"
        title="لحن، آموزش، برند. نه صندوق و نه شیفت."
        lede="روایت از این جهت پیروی می‌کند. حمزه اشراف دارد ولی کپشن را امضا نمی‌کند. فقط اگر هویت مکان عوض شود، کار به میز او می‌رود."
      />
      {!canSteer && (
        <Note>
          الان به‌جای حمزه تماشا می‌کنی. هدایت روایت با راهبر محتواست.{" "}
          <button type="button" className="font-medium text-seal" onClick={() => setRole("content")}>
            برو به آن میز
          </button>
        </Note>
      )}
      <form
        className="rounded-lg border border-line bg-card p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSteer) saveDirection(text);
        }}
      >
        <label htmlFor="direction" className="font-bold">
          جهت این دوره
        </label>
        <textarea
          id="direction"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          disabled={!canSteer}
          className="mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none disabled:opacity-70"
        />
        <Btn className="mt-3" type="submit" disabled={!canSteer}>
          این جهت را به روایت بده
        </Btn>
      </form>
      <div className="flex flex-col gap-3">
        {data.content.map((piece) => (
          <article key={piece.id} className="rounded-lg border border-line bg-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold">{piece.title}</h2>
              <Pill tone={piece.status === "escalate" ? "seal" : piece.status === "sent" ? "olive" : "muted"}>
                {STATUS[piece.status]}
              </Pill>
              <span className="text-xs text-muted">{piece.channel}</span>
            </div>
            <p className="mt-3 text-sm">{piece.draft}</p>
            {piece.status === "escalate" ? (
              <div className="mt-3">
                {signSent ? (
                  <p className="text-sm text-muted">برای امضای حمزه رفته. روایت تا جواب او سردر را دست نمی‌زند.</p>
                ) : (
                  <Btn tone="ghost" disabled={!canSteer} onClick={() => escalateSign()}>
                    این تصمیم حمزه است
                  </Btn>
                )}
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Btn tone="ghost" disabled={!canSteer || piece.status === "sent"} onClick={() => steer(piece.id)}>
                  با جهت فعلی بنویس
                </Btn>
                <Btn tone="ink" disabled={!canSteer || piece.status === "draft"} onClick={() => release(piece.id)}>
                  بسپار به لیلا
                </Btn>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
