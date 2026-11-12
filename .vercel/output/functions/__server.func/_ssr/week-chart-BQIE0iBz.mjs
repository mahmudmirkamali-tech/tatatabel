import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as tomanShort, b as tehranWeekday, x as toman } from "./router-CCY7y-Of.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/week-chart-BQIE0iBz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAST = [
	{
		offset: -6,
		income: 32e5,
		expense: 11e5
	},
	{
		offset: -5,
		income: 41e5,
		expense: 9e5
	},
	{
		offset: -4,
		income: 28e5,
		expense: 14e5
	},
	{
		offset: -3,
		income: 5e6,
		expense: 22e5
	},
	{
		offset: -2,
		income: 36e5,
		expense: 8e5
	},
	{
		offset: -1,
		income: 485e4,
		expense: 115e4
	}
];
function WeekChart({ ledger }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const income = ledger.filter((e) => e.kind === "income").reduce((a, e) => a + e.amount, 0);
	const expense = ledger.filter((e) => e.kind === "expense").reduce((a, e) => a + e.amount, 0);
	const data = [...PAST.map((day) => ({
		label: tehranWeekday(day.offset),
		income: day.income,
		expense: day.expense
	})), {
		label: "امروز",
		income,
		expense
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-bold",
				children: "هفت روز صندوق"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "ستون تیره درآمد است و ستون سبز هزینه. امروز با ثبت‌های زنده عوض می‌شود."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-52 w-full min-w-0",
				dir: "ltr",
				children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data,
						barGap: 2,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (value, name) => [toman(Number(value ?? 0)), name === "income" ? "درآمد" : "هزینه"],
								labelFormatter: (label) => String(label),
								contentStyle: {
									background: "var(--color-card)",
									border: "1px solid var(--color-line)",
									borderRadius: 8,
									direction: "rtl",
									fontFamily: "Vazirmatn, sans-serif"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "income",
								name: "income",
								fill: "var(--color-seal)",
								radius: [
									3,
									3,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "expense",
								name: "expense",
								fill: "var(--color-olive)",
								radius: [
									3,
									3,
									0,
									0
								]
							})
						]
					})
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				children: data.map((d) => `${d.label}: درآمد ${tomanShort(d.income)}، هزینه ${tomanShort(d.expense)}`).join("؛ ")
			})
		]
	});
}
//#endregion
export { WeekChart as t };
