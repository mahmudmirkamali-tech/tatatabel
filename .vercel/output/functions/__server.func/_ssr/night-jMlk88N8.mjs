import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useTata, o as PageIntro, u as cn } from "./router-CCY7y-Of.mjs";
import { t as buildNightDraft } from "./insight-ClbrrX3-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/night-jMlk88N8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Night() {
	const data = useTata((s) => s.data);
	const [tab, setTab] = (0, import_react.useState)("live");
	const live = buildNightDraft(data);
	const view = tab === "live" ? {
		title: "پیش‌نویس امشب",
		sentAt: "۲۲:۳۰، خودکار",
		...live
	} : {
		title: data.letter.title,
		sentAt: `ارسال شد ${data.letter.sentAt}`,
		wins: data.letter.wins,
		issues: data.letter.issues,
		tomorrow: data.letter.tomorrow
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "خودارزیابی شبانه",
				title: "سه پیام، سر ساعت، بی‌اجازه.",
				lede: "شب‌نامه هر شب ۲۲:۳۰ برای حمزه می‌رود: چه خوب پیش رفت، ضعف کجا بود، فردا دقیقاً چه باید کرد. متن از کار همان روز ساخته می‌شود، نه از جملهٔ کلی."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: [["live", "پیش‌نویس امشب"], ["sent", "دیشب، ارسال‌شده"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("min-h-11 rounded-full px-4 text-sm", tab === id ? "bg-ink text-paper" : "border border-line bg-card"),
					onClick: () => setTab(id),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					view.title,
					" · ",
					view.sentAt,
					". اگر امروز چیزی را امضا یا رد کنی، پیش‌نویس امشب همان لحظه عوض می‌شود."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
						n: "۱",
						title: "چه خوب پیش رفت",
						tone: "olive",
						items: view.wins
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
						n: "۲",
						title: "ایراد و نقطهٔ ضعف",
						tone: "seal",
						items: view.issues
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
						n: "۳",
						title: "فردا باید چه شود",
						tone: "ink",
						items: view.tomorrow
					})
				]
			})
		]
	});
}
function Column({ n, title, tone, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-lg border border-line bg-card p-4 border-t-4", tone === "olive" && "border-t-olive", tone === "seal" && "border-t-seal", tone === "ink" && "border-t-ink"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num text-sm text-muted",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 flex flex-col gap-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm",
					children: item
				}, item))
			})
		]
	});
}
//#endregion
export { Night as component };
