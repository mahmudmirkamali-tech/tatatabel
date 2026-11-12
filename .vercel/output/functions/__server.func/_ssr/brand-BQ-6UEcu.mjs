import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Note, c as Pill, d as useTata, o as PageIntro, r as Btn } from "./router-CCY7y-Of.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-BQ-6UEcu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS = {
	draft: "خام",
	steered: "هم‌تراز با جهت",
	sent: "سپرده به لیلا",
	escalate: "بالاتر از این میز"
};
function Brand() {
	const data = useTata((s) => s.data);
	const role = useTata((s) => s.role);
	const setRole = useTata((s) => s.setRole);
	const saveDirection = useTata((s) => s.saveDirection);
	const steer = useTata((s) => s.steer);
	const release = useTata((s) => s.release);
	const escalateSign = useTata((s) => s.escalateSign);
	const [text, setText] = (0, import_react.useState)(data.brandDirection);
	const canSteer = role === "content";
	const signSent = data.decisions.some((d) => d.id === "dec-sign");
	(0, import_react.useEffect)(() => {
		setText(data.brandDirection);
	}, [data.brandDirection]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "میز راهبر محتوا",
				title: "لحن، آموزش، برند. نه صندوق و نه شیفت.",
				lede: "روایت از این جهت پیروی می‌کند. حمزه اشراف دارد ولی کپشن را امضا نمی‌کند. فقط اگر هویت مکان عوض شود، کار به میز او می‌رود."
			}),
			!canSteer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, { children: [
				"الان به‌جای حمزه تماشا می‌کنی. هدایت روایت با راهبر محتواست.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-medium text-seal",
					onClick: () => setRole("content"),
					children: "برو به آن میز"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-lg border border-line bg-card p-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (canSteer) saveDirection(text);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "direction",
						className: "font-bold",
						children: "جهت این دوره"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "direction",
						value: text,
						onChange: (e) => setText(e.target.value),
						rows: 3,
						disabled: !canSteer,
						className: "mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none disabled:opacity-70"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-3",
						type: "submit",
						disabled: !canSteer,
						children: "این جهت را به روایت بده"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: data.content.map((piece) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-bold",
									children: piece.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: piece.status === "escalate" ? "seal" : piece.status === "sent" ? "olive" : "muted",
									children: STATUS[piece.status]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: piece.channel
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: piece.draft
						}),
						piece.status === "escalate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: signSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "برای امضای حمزه رفته. روایت تا جواب او سردر را دست نمی‌زند."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								tone: "ghost",
								disabled: !canSteer,
								onClick: () => escalateSign(),
								children: "این تصمیم حمزه است"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								tone: "ghost",
								disabled: !canSteer || piece.status === "sent",
								onClick: () => steer(piece.id),
								children: "با جهت فعلی بنویس"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								tone: "ink",
								disabled: !canSteer || piece.status === "draft",
								onClick: () => release(piece.id),
								children: "بسپار به لیلا"
							})]
						})
					]
				}, piece.id))
			})
		]
	});
}
//#endregion
export { Brand as component };
