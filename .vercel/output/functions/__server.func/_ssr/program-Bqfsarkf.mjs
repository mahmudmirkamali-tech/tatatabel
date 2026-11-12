import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Pill, d as useTata, g as PROGRAM_LABEL, o as PageIntro, v as faNum } from "./router-CCY7y-Of.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/program-Bqfsarkf.js
var import_jsx_runtime = require_jsx_runtime();
var ORDER = [
	"امروز",
	"فردا",
	"شنبه"
];
function Program() {
	const programs = useTata((s) => s.data.programs);
	const registrations = useTata((s) => s.data.registrations);
	const whens = ORDER.filter((when) => programs.some((p) => p.when === when));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "زمان‌بند و ثبت‌نام",
				title: "کلاس، کارگاه، ایونت، کنسرت، کافه.",
				lede: "برنامهٔ اصلی هفته بدون امضای حمزه تکان نمی‌خورد. جابه‌جایی جزئی، ظرفیت و پیامک را خود ایجنت‌ها می‌بندند."
			}),
			whens.map((when) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold",
					children: when
				}), programs.filter((item) => item.when === when).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: PROGRAM_LABEL[item.kind] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: item.status === "conflict" ? "seal" : item.status === "set" ? "olive" : "muted",
									children: item.status === "conflict" ? "تداخل" : item.status === "set" ? "قطعی" : "منتظر امضا"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "num text-sm",
									children: [
										item.start,
										"–",
										item.end
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-lg font-bold",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								item.place,
								" · ",
								item.lead,
								item.kind === "cafe" ? " · شیفت باز" : ` · ${faNum(item.enrolled)} از ${faNum(item.capacity)}`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: item.note
						})
					]
				}, item.id))]
			}, when)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold",
						children: "استثناهای ثبت‌نام"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "جمعیت عادی را ثبت‌نام خودش نگه می‌دارد. اینجا فقط چیزی است که تصمیم یا پیگیری می‌خواهد."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-3",
						children: registrations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-line pb-3 last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									item.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-normal text-muted",
										children: ["· ", item.status === "cancelled" ? "انصراف" : item.status === "offered" ? "پیشنهاد شده" : item.status === "waitlist" ? "انتظار" : "قطعی"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: item.agentNote
							})]
						}, item.id))
					})
				]
			})
		]
	});
}
//#endregion
export { Program as component };
