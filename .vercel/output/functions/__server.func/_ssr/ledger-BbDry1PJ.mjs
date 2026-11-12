import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Mic } from "../_libs/lucide-react.mjs";
import { a as Note, d as useTata, o as PageIntro, r as Btn, v as faNum, x as toman } from "./router-CCY7y-Of.mjs";
import { t as WeekChart } from "./week-chart-BQIE0iBz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-BbDry1PJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAMPLES = [
	"درآمد کارگاه سفال ۴۰۰ هزار",
	"هزینه دانه قهوه ۴۲۰ هزار",
	"فروش امروز کافه ۱ میلیون و دویست هزار",
	"هزینه بیعانه نور ۵ میلیون"
];
var CEILINGS = [
	1e6,
	2e6,
	5e6
];
function Ledger() {
	const data = useTata((s) => s.data);
	const role = useTata((s) => s.role);
	const voice = useTata((s) => s.voice);
	const setCeiling = useTata((s) => s.setCeiling);
	const [text, setText] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)(null);
	const [listening, setListening] = (0, import_react.useState)(false);
	const income = data.ledger.filter((e) => e.kind === "income").reduce((a, e) => a + e.amount, 0);
	const expense = data.ledger.filter((e) => e.kind === "expense").reduce((a, e) => a + e.amount, 0);
	function submit(value) {
		const said = value.trim();
		if (!said) return;
		setNote(voice(said));
		setText("");
	}
	function listen() {
		const w = window;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "دفتر",
				title: "بگو درآمد است یا هزینه.",
				lede: "دفتر جمله را می‌شنود، دسته می‌کند و اگر زیر سقف باشد خودش می‌نویسد. حقوق، بیعانه و مبلغ بالاتر می‌رود روی میز حمزه."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-lg border border-line bg-card p-4",
				onSubmit: (e) => {
					e.preventDefault();
					submit(text);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "utterance",
						className: "text-sm font-medium",
						children: "فرمان صوتی یا نوشتاری"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-col gap-2 sm:flex-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "utterance",
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: "مثلاً: هزینه دانه قهوه ۴۲۰ هزار",
								className: "min-h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								type: "submit",
								children: "ثبت"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								type: "button",
								tone: "ghost",
								onClick: listen,
								"aria-pressed": listening,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
									className: "size-4",
									"aria-hidden": true
								}), listening ? "در حال شنیدن" : "بگو"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-full border border-line px-3 text-xs",
							onClick: () => submit(sample),
							children: sample
						}, sample))
					})
				]
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: note }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-line bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "درآمد امروز"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num mt-1 text-xl font-bold",
							children: toman(income)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-line bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "هزینهٔ امروز"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num mt-1 text-xl font-bold",
							children: toman(expense)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-line bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "مانده"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num mt-1 text-xl font-bold",
							children: toman(income - expense)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold",
						children: "سقف خودران دفتر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"الان ",
							toman(data.ceiling),
							". این را فقط حمزه یاد می‌دهد. بالاتر از آن، دفتر می‌نویسد ولی پرداخت نمی‌کند."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: CEILINGS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							tone: data.ceiling === n ? "ink" : "ghost",
							disabled: role !== "hamzeh",
							onClick: () => setCeiling(n),
							children: [faNum(n / 1e6), " میلیون"]
						}, n))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekChart, { ledger: data.ledger }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold",
					children: "ثبت‌های امروز"
				}), data.ledger.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "هنوز چیزی نوشته نشده. یک جمله بگو تا دفتر دسته کند."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2",
					children: data.ledger.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 border-b border-line py-3 last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								entry.kind === "income" ? "درآمد" : "هزینه",
								" · ",
								entry.category
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: entry.note
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "num font-medium",
								children: toman(entry.amount)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									entry.source === "voice" ? "صدا" : entry.source === "agent" ? "خودران" : "بعد از امضا",
									" · ",
									entry.at
								]
							})]
						})]
					}, entry.id))
				})]
			})
		]
	});
}
//#endregion
export { Ledger as component };
