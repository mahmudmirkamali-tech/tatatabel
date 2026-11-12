import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as STATUS_LABEL, c as Pill, d as useTata, m as BAND_LABEL, o as PageIntro, p as AGENT_LABEL, r as Btn } from "./router-CCY7y-Of.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents-BbpAr0R6.js
var import_jsx_runtime = require_jsx_runtime();
function Agents() {
	const data = useTata((s) => s.data);
	const reset = useTata((s) => s.reset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "معماری اختیار",
				title: "هشت ایجنت، یک ناظر.",
				lede: "خودران‌ها نمی‌پرسند. تا خط قرمزها کار را می‌برند و فقط استثنا را بالا می‌آورند. روایت به راهبر محتوا جواب می‌دهد و حمزه بر همه اشراف دارد."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-line bg-olive-soft p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-olive",
							children: "خودران"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: "ثبت‌نام، دیده‌بان، شب‌نامه، میزنامه. حتی برای اطلاع هم معطل نمی‌مانند."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-line bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold",
							children: "خودران تا خط"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: "زمان‌بند، کف سالن، دفتر. کار جزئی را می‌بندند. برنامهٔ اصلی، نیرو و خرج بزرگ می‌ماند برای امضا."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-line bg-seal-soft p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-seal",
							children: "راهبر محتوا"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: "روایت لحن و آموزش را از تو می‌گیرد. نشان و سردر را بدون حمزه عوض نمی‌کند."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: data.agents.map((agent) => {
					const learned = data.lessons.filter((l) => l.agentId === agent.id).slice(0, 3);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-line bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-bold",
										children: agent.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: agent.band === "content-lead" ? "seal" : agent.band === "auto" ? "olive" : "muted",
										children: BAND_LABEL[agent.band]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: agent.status === "waiting" ? "seal" : "ink",
										children: STATUS_LABEL[agent.status]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: agent.duty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-3 grid gap-2 text-sm md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "پاسخ‌گو به"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: agent.accountable })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "همکار"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: agent.worksWith })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: agent.autonomyNote
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 border-t border-line pt-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "آخرین کار: "
								}), agent.lastAction]
							}),
							learned.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex flex-col gap-1 text-sm text-olive",
								children: learned.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["یاد گرفته: ", lesson.text] }, lesson.id))
							})
						]
					}, agent.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold",
						children: "چه چیزی را دیگر نمی‌پرسند"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-2 text-sm",
						children: data.lessons.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-line pb-2 last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [AGENT_LABEL[lesson.agentId], " · "]
							}), lesson.text]
						}, lesson.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						className: "mt-4",
						onClick: () => reset(),
						children: "بازگشت به صبح امروز"
					})
				]
			})
		]
	});
}
//#endregion
export { Agents as component };
