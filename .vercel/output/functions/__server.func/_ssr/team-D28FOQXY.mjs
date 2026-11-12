import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Pill, d as useTata, h as PRESENCE_LABEL, o as PageIntro, p as AGENT_LABEL, r as Btn, v as faNum } from "./router-CCY7y-Of.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-D28FOQXY.js
var import_jsx_runtime = require_jsx_runtime();
function Team() {
	const staff = useTata((s) => s.data.staff);
	const tasks = useTata((s) => s.data.tasks);
	const remind = useTata((s) => s.remind);
	const completeTask = useTata((s) => s.completeTask);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "کف سالن",
				title: "حضور و کیفیت، بدون ایستادن پای هر پیام.",
				lede: "یادآوری را ایجنت خودش می‌فرستد. فقط عوض کردن نیرو به میز حمزه می‌آید. کارهایی که دست انسان می‌خواهد این پایین است."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: staff.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold",
								children: person.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									person.role,
									" · ",
									person.shift
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: person.presence === "silent" ? "seal" : person.presence === "confirmed" || person.presence === "covered" ? "olive" : "muted",
								children: PRESENCE_LABEL[person.presence]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: person.agentNote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "کیفیت از نگاه کف سالن" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num",
									children: faNum(person.score)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1.5 rounded-full bg-paper-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: person.score >= 80 ? "h-full rounded-full bg-olive" : "h-full rounded-full bg-seal",
									style: { width: `${person.score}%` }
								})
							})]
						}),
						(person.presence === "silent" || person.presence === "watched") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "ghost",
							className: "mt-3",
							onClick: () => remind(person.id),
							children: person.reminded ? "یادآوری دوباره" : "یادآوری بفرست"
						})
					]
				}, person.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold",
					children: "کار انسانی"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-2 border-b border-line pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: task.status === "done" ? "text-muted line-through" : "font-medium",
							children: task.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								task.assignee,
								" · از ",
								AGENT_LABEL[task.from]
							]
						})] }), task.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "ink",
							onClick: () => completeTask(task.id),
							children: "انجام شد"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							tone: "olive",
							children: "بسته شد"
						})]
					}, task.id))
				})]
			})
		]
	});
}
//#endregion
export { Team as component };
