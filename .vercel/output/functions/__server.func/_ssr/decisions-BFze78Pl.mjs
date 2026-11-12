import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useTata, i as DecisionCard, o as PageIntro } from "./router-CCY7y-Of.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/decisions-BFze78Pl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "open",
		label: "باز"
	},
	{
		id: "finance",
		label: "مالی"
	},
	{
		id: "schedule",
		label: "برنامه"
	},
	{
		id: "hr",
		label: "نیرو"
	},
	{
		id: "brand",
		label: "برند"
	},
	{
		id: "closed",
		label: "بسته‌شده"
	}
];
function Decisions() {
	const decisions = useTata((s) => s.data.decisions);
	const ceiling = useTata((s) => s.data.ceiling);
	const [filter, setFilter] = (0, import_react.useState)("open");
	const items = decisions.filter((item) => {
		if (filter === "open") return item.status === "pending";
		if (filter === "closed") return item.status !== "pending";
		return item.kind === filter;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "صف امضا",
				title: "فقط خط قرمز اینجاست.",
				lede: `خرج بالای سقف، تغییر برنامهٔ اصلی، نیروی صحنه و هویت برند. سقف فعلی دفتر ${new Intl.NumberFormat("fa-IR").format(ceiling)} تومان است.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: filter === item.id ? "min-h-11 rounded-full bg-ink px-4 text-sm text-paper" : "min-h-11 rounded-full border border-line bg-card px-4 text-sm",
					onClick: () => setFilter(item.id),
					children: item.label
				}, item.id))
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "در این صافی چیزی نیست. یعنی ایجنت مربوطه خودش بسته یا هنوز نرسیده."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionCard, { item }, item.id))
			})
		]
	});
}
//#endregion
export { Decisions as component };
