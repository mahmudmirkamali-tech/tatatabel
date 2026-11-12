import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Pill, d as useTata, m as BAND_LABEL, o as PageIntro, r as Btn, v as faNum, y as tehranDateLabel } from "./router-CCY7y-Of.mjs";
import { t as WeekChart } from "./week-chart-BQIE0iBz.mjs";
import { n as managementLines } from "./insight-ClbrrX3-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-tMtD0kPU.js
var import_jsx_runtime = require_jsx_runtime();
function Reports() {
	const data = useTata((s) => s.data);
	const role = useTata((s) => s.role);
	const markReport = useTata((s) => s.markReport);
	const lines = managementLines(data);
	const autoN = data.activity.filter((a) => a.auto).length;
	const signed = data.decisions.filter((d) => d.status === "approved").length;
	const total = autoN + signed;
	const ratio = total ? Math.round(autoN / total * 100) : 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "میزنامه",
				title: "گزارش مدیریتی برای حمزه تاتا",
				lede: `${tehranDateLabel()} · یک صفحه، از کار واقعی ایجنت‌ها. لازم نیست دفتر خام را ورق بزنی.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-lg border border-line bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-3",
						children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm sm:text-base",
							children: line
						}, line))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "num mt-4 text-sm text-olive",
						children: [
							faNum(ratio),
							"٪ از اقدام‌های ثبت‌شده خودران بوده و ",
							faNum(signed),
							" مورد با امضای تو اجرا شده."
						]
					}),
					data.reportRead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "حمزه این نسخه را دیده. نسخهٔ بعد با شب‌نامه می‌آید."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-4",
						disabled: role !== "hamzeh",
						onClick: () => markReport(),
						children: "دیدم"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekChart, { ledger: data.ledger }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-lg border border-line bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "border-b border-line px-4 py-3 font-bold",
					children: "اختیار هر ایجنت"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: data.agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: agent.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: agent.duty
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: agent.band === "auto" ? "olive" : agent.band === "content-lead" ? "seal" : "muted",
						children: BAND_LABEL[agent.band]
					})]
				}, agent.id)) })]
			})
		]
	});
}
//#endregion
export { Reports as component };
