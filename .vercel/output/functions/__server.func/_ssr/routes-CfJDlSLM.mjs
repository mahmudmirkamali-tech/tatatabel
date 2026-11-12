import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Note, c as Pill, d as useTata, f as peekBeat, i as DecisionCard, l as Stat, n as ActivityFeed, o as PageIntro, r as Btn, s as Panel, v as faNum, x as toman } from "./router-CCY7y-Of.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CfJDlSLM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function money(data, kind) {
	return data.ledger.filter((e) => e.kind === kind).reduce((acc, e) => acc + e.amount, 0);
}
function Home() {
	const data = useTata((s) => s.data);
	const beat = useTata((s) => s.beat);
	const [note, setNote] = (0, import_react.useState)(null);
	const pending = data.decisions.filter((d) => d.status === "pending");
	const done = data.decisions.filter((d) => d.status !== "pending");
	const income = money(data, "income");
	const openAlerts = data.alerts.filter((a) => !a.resolved);
	const autoN = data.activity.filter((a) => a.auto).length;
	const drafts = data.content.filter((c) => c.status === "draft").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "میز فرمان حمزه",
				title: pending.length ? `${faNum(pending.length)} تصمیم روی میز توست.` : "میز امضا خالی است.",
				lede: "کار تکراری را هشت ایجنت بی‌اجازه جلو می‌برند: برنامهٔ جزئی، ثبت‌نام، یادآوری، خرج زیر سقف. تو ناظری، نه اپراتور.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-col gap-2 sm:max-w-xs sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "w-full",
						onClick: () => setNote(beat()),
						children: "یک قدم خودران"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: peekBeat(data)
					})]
				})
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: note }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "خودران تا الآن",
						value: faNum(autoN),
						hint: "بی‌امضای حمزه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "منتظر امضا",
						value: faNum(pending.length),
						hint: "مالی، نیرو، برنامهٔ اصلی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "صندوق امروز",
						value: income ? toman(income) : "صفر",
						hint: "دفتر خودش دسته می‌کند"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "ریسک باز",
						value: faNum(openAlerts.length),
						hint: "دیده‌بان، قبل از وقوع"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "فقط این‌ها امضا می‌خواهند"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/decisions",
							className: "text-sm text-seal",
							children: "همهٔ امضاها"
						})]
					}),
					pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "چیزی برای امضا نمانده. ایجنت‌ها طبق سقف اختیار کار می‌کنند و شب‌نامه ۲۲:۳۰ می‌رود." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 lg:grid-cols-2",
						children: pending.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionCard, { item }, item.id))
					}),
					done.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: done.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionCard, { item }, item.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "برنامهٔ امروز",
					aside: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/program",
						className: "text-sm text-seal",
						children: "تقویم"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-3",
						children: data.programs.filter((p) => p.when === "امروز").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-line pb-3 last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "num text-sm font-medium",
										children: [
											item.start,
											"–",
											item.end
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: item.status === "conflict" ? "seal" : item.status === "set" ? "olive" : "muted",
										children: item.status === "conflict" ? "تداخل" : item.status === "set" ? "قطعی" : "معلق"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										item.place,
										" · ",
										item.lead,
										item.kind !== "cafe" ? ` · ${faNum(item.enrolled)} از ${faNum(item.capacity)}` : ""
									]
								})
							]
						}, item.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "دیده‌بان",
						children: openAlerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "ریسک بازی نمانده."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-3",
							children: openAlerts.map((alert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-r-2 border-seal pr-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: alert.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: alert.detail
								})]
							}, alert.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Agenda, {
						data,
						pending
					})]
				})]
			}),
			drafts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, { children: [
				"روایت ",
				faNum(drafts),
				" پیش‌نویس دارد. این کار میز حمزه نیست.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/brand",
					className: "font-medium text-seal",
					children: "میز راهبر محتوا"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "ایجنت‌ها بی‌صدا کار کرده‌اند",
				aside: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/agents",
					className: "text-sm text-seal",
					children: "معماری"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, { items: data.activity.slice(0, 6) })
			})
		]
	});
}
function Agenda({ data, pending }) {
	const deposit = data.decisions.find((d) => d.id === "dec-deposit");
	const rows = [
		{
			time: "قبل از ۸",
			title: "امضاهای روی میز",
			need: pending.length ? "لازم" : "تمام",
			detail: pending.length ? `${faNum(pending.length)} مورد از خط اختیار گذشته. بقیه را خودشان می‌برند.` : "چیزی نمانده که فقط تو بتوانی ببندی."
		},
		{
			time: "ظهر",
			title: "سر زدن به سفال",
			need: "لازم نیست",
			detail: "نازنین کلاس را می‌چیند و ثبت‌نام ظرفیت را نگه می‌دارد."
		},
		{
			time: "۱۸:۱۰",
			title: "سلام کوتاه شب شعر",
			need: "اختیاری",
			detail: "اگر نروی، مریم پذیرش را می‌بندد. برنامهٔ اصلی جابه‌جا نمی‌شود."
		},
		{
			time: "فردا ۱۹",
			title: "کنسرت",
			need: deposit?.status === "approved" ? "نمادین" : "معلق",
			detail: deposit?.status === "approved" ? "بیعانه خورده. لازم نیست جزئیات را خودت پیگیری کنی." : "تا بیعانه امضا نشود، روایت حق اعلام عمومی ندارد."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "حضور تو",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-3",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "num w-16 shrink-0 text-sm text-muted",
					children: row.time
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium",
					children: [
						row.title,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: row.need === "لازم" || row.need === "معلق" ? "text-seal" : "text-muted",
							children: ["· ", row.need]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: row.detail
				})] })]
			}, row.time))
		})
	});
}
//#endregion
export { Home as component };
