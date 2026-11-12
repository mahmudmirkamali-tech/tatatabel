import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ScrollText, c as LayoutDashboard, d as BookOpen, i as ShieldCheck, l as CalendarDays, n as Users, o as Moon, r as TriangleAlert, t as Wallet, u as Bot } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CCY7y-Of.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function toman(n) {
	return `${new Intl.NumberFormat("fa-IR").format(n)} تومان`;
}
function faNum(n) {
	return new Intl.NumberFormat("fa-IR").format(n);
}
function tomanShort(n) {
	if (Math.abs(n) >= 1e6) {
		const m = n / 1e6;
		return `${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(m)} میلیون`;
	}
	if (Math.abs(n) >= 1e3) return `${faNum(Math.round(n / 1e3))} هزار`;
	return faNum(n);
}
function tehranDateLabel(date = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("fa-IR", {
		timeZone: "Asia/Tehran",
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(date);
}
function tehranNowLabel(date = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("fa-IR", {
		timeZone: "Asia/Tehran",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(date);
}
function tehranWeekday(offset, now = /* @__PURE__ */ new Date()) {
	const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Tehran",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(now).split("-").map(Number);
	const utc = new Date(Date.UTC(y, m - 1, d + offset, 9, 0, 0));
	return new Intl.DateTimeFormat("fa-IR", {
		weekday: "short",
		timeZone: "UTC"
	}).format(utc);
}
var BAND_LABEL = {
	auto: "خودران",
	"until-line": "خودران تا خط قرمز",
	"content-lead": "هدایت راهبر محتوا"
};
var STATUS_LABEL = {
	running: "در حال کار",
	waiting: "منتظر انسان",
	idle: "آماده"
};
var DECISION_LABEL = {
	finance: "مالی",
	schedule: "برنامه اصلی",
	hr: "نیروی انسانی",
	brand: "هویت برند"
};
var PROGRAM_LABEL = {
	class: "کلاس",
	workshop: "کارگاه",
	event: "ایونت",
	concert: "کنسرت",
	cafe: "کافه"
};
var PRESENCE_LABEL = {
	confirmed: "تأیید شده",
	watched: "زیر نظر",
	silent: "بی‌پاسخ",
	remote: "دورکار",
	covered: "پوشش داده شد"
};
var AGENT_LABEL = {
	scheduler: "زمان‌بند",
	registrar: "ثبت‌نام",
	floor: "کف سالن",
	ledger: "دفتر",
	sentinel: "دیده‌بان",
	night: "شب‌نامه",
	brand: "روایت",
	brief: "میزنامه"
};
var REJECT_REASONS = {
	finance: [
		"بودجه زیاد است",
		"منبع دیگری پیدا کن",
		"فعلاً نه"
	],
	schedule: [
		"برنامه را دست نزن",
		"زمان دیگر پیشنهاد بده",
		"فعلاً نه"
	],
	hr: [
		"خودمان پوشش می‌دهیم",
		"شخص دیگری",
		"فعلاً نه"
	],
	brand: [
		"هویت را عوض نکن",
		"لحن را ملایم‌تر کن",
		"فعلاً نه"
	]
};
var FA = "۰۱۲۳۴۵۶۷۸۹";
var AR = "٠١٢٣٤٥٦٧٨٩";
var WORD = {
	نیم: .5,
	یک: 1,
	یه: 1,
	دو: 2,
	سه: 3,
	چهار: 4,
	پنج: 5,
	شش: 6,
	شیش: 6,
	هفت: 7,
	هشت: 8,
	نه: 9,
	ده: 10,
	یازده: 11,
	دوازده: 12,
	سیزده: 13,
	چهارده: 14,
	پانزده: 15,
	پونزده: 15,
	شانزده: 16,
	هفده: 17,
	هجده: 18,
	نوزده: 19,
	بیست: 20,
	سی: 30,
	چهل: 40,
	پنجاه: 50,
	شصت: 60,
	هفتاد: 70,
	هشتاد: 80,
	نود: 90,
	صد: 100,
	یکصد: 100,
	دویست: 200,
	سیصد: 300,
	چهارصد: 400,
	پانصد: 500,
	پونصد: 500,
	ششصد: 600,
	هفتصد: 700,
	هشتصد: 800,
	نهصد: 900
};
function normalizeFa(input) {
	return input.trim().replace(/[۰-۹]/g, (d) => String(FA.indexOf(d))).replace(/[٠-٩]/g, (d) => String(AR.indexOf(d))).replace(/[٬،,]/g, "").replace(/[٫]/g, ".").replace(/تومان|تومن|ریال/g, " ").replace(/(\d)(?=هزار|میلیون|میلیارد)/g, "$1 ").replace(/\s+/g, " ").trim();
}
function extractAmount(text) {
	const parts = normalizeFa(text).split(" ");
	let total = 0;
	let group = 0;
	let saw = false;
	const flushMult = (mult) => {
		total += (group === 0 ? 1 : group) * mult;
		group = 0;
		saw = true;
	};
	for (const raw of parts) {
		const p = raw.trim();
		if (!p || p === "و" || p === "تا") continue;
		if (p === "هزار") flushMult(1e3);
		else if (p === "میلیون") flushMult(1e6);
		else if (p === "میلیارد") flushMult(1e9);
		else if (WORD[p] != null) {
			const value = WORD[p];
			group = value < 1 && group === 0 ? value : group + value;
			saw = true;
		} else if (/^\d+(?:\.\d+)?$/.test(p)) {
			group += Number(p);
			saw = true;
		}
	}
	if (group > 0) {
		if (total >= 1e6 && group >= 1 && group < 1e3) total += group * 1e3;
		else total += group;
	}
	if (!saw || total <= 0) return null;
	return Math.round(total);
}
function categoryOf(text, kind) {
	for (const [re, label] of [
		[/قهوه|دانه|شیر|شیرینی|قند|نان|خوراک|میوه/, "مواد کافه"],
		[/اجاره|سالن|بیعانه|بلندگو|نورپردازی/, "مکان و صحنه"],
		[/حقوق|دستمزد|قرارداد|پرسنل/, "نیروی انسانی"],
		[/تبلیغ|اینستا|پوستر|محتوا|طراح/, "برند"],
		[/بلیت|کنسرت/, "رویداد"],
		[/ثبت.?نام|کارگاه|کلاس|سفال|قصه|شهریه|آموزش/, "آموزش"],
		[/کافه|صندوق|بار|فروش/, "صندوق کافه"]
	]) if (re.test(text)) return label;
	return kind === "income" ? "درآمد متفرقه" : "هزینه متفرقه";
}
function parseCommand(text, ceiling) {
	const utterance = text.trim();
	if (!utterance) return {
		ok: false,
		message: "چیزی گفته نشد. مثلاً: هزینه دانه قهوه ۴۲۰ هزار"
	};
	const norm = normalizeFa(utterance);
	const amount = extractAmount(utterance);
	if (amount == null) return {
		ok: false,
		message: "مبلغ را نشنیدم. مثلاً: درآمد کارگاه سفال ۴۰۰ هزار"
	};
	if (amount > 0xe8d4a51000) return {
		ok: false,
		message: "این مبلغ معقول نیست. یک بار دیگر بگو."
	};
	const expAt = norm.search(/هزینه|خرج|خرید|پرداخت|بیعانه|حقوق|دستمزد/);
	const incAt = norm.search(/درآمد|فروش|ثبت نام|ثبت‌نام|ورودی|بلیت|شهریه|دریافت|صندوق/);
	if (expAt < 0 && incAt < 0) return {
		ok: false,
		message: "بگو این درآمد است یا هزینه."
	};
	const kind = expAt < 0 ? "income" : incAt < 0 ? "expense" : expAt <= incAt ? "expense" : "income";
	const category = categoryOf(norm, kind);
	const named = /حقوق|دستمزد|بیعانه|قرارداد/.test(norm);
	const sensitive = kind === "expense" && (named || amount >= ceiling);
	return {
		ok: true,
		kind,
		amount,
		category,
		sensitive,
		utterance,
		because: !sensitive ? "زیر سقف خودران بود." : named ? "این نوع تعهد را دفتر خودش نمی‌بندد." : "مبلغ از سقف خودران بالاتر است."
	};
}
var seq = 0;
function nid(prefix) {
	seq += 1;
	return `${prefix}-${seq}`;
}
function clone(d) {
	return structuredClone(d);
}
function push(d, agentId, text, at, auto) {
	d.activity.unshift({
		id: nid("a"),
		agentId,
		text,
		at,
		auto
	});
	const agent = d.agents.find((a) => a.id === agentId);
	if (agent) agent.lastAction = text;
}
function book(d, entry, at) {
	d.ledger.unshift({
		...entry,
		id: nid("led"),
		at
	});
}
function resolve(d, id) {
	const alert = d.alerts.find((a) => a.id === id);
	if (alert) alert.resolved = true;
}
function refresh(d) {
	const pending = (id) => d.decisions.some((x) => x.status === "pending" && x.agentId === id);
	for (const agent of d.agents) {
		if (agent.id === "night") {
			agent.status = "idle";
			continue;
		}
		if (agent.id === "brief") {
			agent.status = "running";
			continue;
		}
		if (agent.id === "sentinel") {
			agent.status = d.alerts.some((a) => !a.resolved) ? "running" : "idle";
			continue;
		}
		if (agent.id === "brand") {
			agent.status = d.content.some((c) => c.status === "draft" || c.status === "escalate") ? "waiting" : "running";
			continue;
		}
		agent.status = pending(agent.id) ? "waiting" : "running";
	}
}
function potteryCaption(direction) {
	return `گل هنوز به دست‌هاست و کسی عجله ندارد. کارگاه سفال گاچو، حیاط، هشت نفر و دو جا خالی. جهت ثبت‌شده این است: «${direction.trim()}» پس در متن وعدهٔ تخفیف و شعار نمی‌آید.`;
}
function poetryCaption(direction) {
	return `امشب شب شعر گاچو است، سالن از ۱۹:۳۰. جهت برند: «${direction.trim()}». چهرهٔ مهمان بی‌اجازه در استوری نمی‌آید؛ فقط میکروفون، فنجان، و یک خط.`;
}
function applyHall(d, at) {
	const item = d.programs.find((p) => p.id === "rehearsal");
	if (item) {
		item.end = "۱۷:۱۵";
		item.status = "set";
		item.note = "زمان‌بند پایان را ۱۷:۱۵ کرد تا چیدمان شب شعر از ۱۷:۳۰ سالن را خالی بگیرد.";
	}
	resolve(d, "alert-hall");
	d.flags.hallFixed = true;
	push(d, "scheduler", "تمرین موسیقی ۱۷:۱۵ تمام می‌شود. شب شعر سر جایش ماند و از حمزه امضا گرفته نشد.", at, true);
}
function applyDeposit(d, at) {
	book(d, {
		kind: "expense",
		amount: 85e5,
		category: "مکان و صحنه",
		note: "بیعانهٔ سالن کنسرت فردا",
		source: "approval"
	}, at);
	const concert = d.programs.find((p) => p.id === "concert");
	if (concert) {
		concert.status = "set";
		concert.note = "بیعانه با امضای حمزه رفت. سالن قطعی است. بلیت را ثبت‌نام باز می‌کند.";
	}
	push(d, "ledger", "بیعانهٔ ۸٫۵ میلیون با امضای حمزه پرداخت و در دستهٔ مکان ثبت شد.", at, false);
	push(d, "scheduler", "سانس کنسرت فردا قطعی شد. اعلام عمومی دیگر دروغ نیست.", at, true);
}
function applySound(d, at) {
	const kian = d.staff.find((s) => s.id === "kian");
	if (kian) {
		kian.presence = "covered";
		kian.agentNote = "بی‌پاسخ ماند. پوشش صدا با پیمان است و دیگر پیگیری اضطراری نمی‌شود.";
	}
	if (!d.staff.some((s) => s.id === "peyman")) d.staff.push({
		id: "peyman",
		name: "پیمان بهمنی",
		role: "صدابردار جایگزین",
		shift: "۱۶ تا ۲۲",
		presence: "confirmed",
		score: 84,
		agentNote: "بعد از امضای حمزه اضافه شد. تجهیزات خودش را می‌آورد.",
		reminded: false
	});
	const rehearsal = d.programs.find((p) => p.id === "rehearsal");
	if (rehearsal && rehearsal.lead === "کیان پوری") rehearsal.lead = "پیمان بهمنی";
	book(d, {
		kind: "expense",
		amount: 9e5,
		category: "نیروی انسانی",
		note: "دستمزد موقت پیمان برای صدای امشب",
		source: "approval"
	}, at);
	resolve(d, "alert-kian");
	push(d, "floor", "پیمان جای کیان را گرفت. این یکی را حمزه امضا کرد؛ پیگیری بعدی با کف سالن است.", at, false);
	push(d, "ledger", "دستمزد ۹۰۰ هزار پیمان زیر سقف بود و بعد از امضای نیرو ثبت شد.", at, true);
}
function applyShift(d, at) {
	const hafez = d.programs.find((p) => p.id === "hafez");
	if (hafez) {
		hafez.when = "شنبه";
		hafez.status = "set";
		hafez.note = "با امضای حمزه به شنبه همان ساعت منتقل شد.";
	}
	push(d, "scheduler", "حافظ‌خوانی به شنبه رفت. این تغییر برنامهٔ اصلی بود و بی‌امضا انجام نشد.", at, false);
	push(d, "registrar", "خبر جابه‌جایی برای شش ثبت‌نام حافظ‌خوانی فرستاده شد.", at, true);
}
function applySign(d, at) {
	const piece = d.content.find((c) => c.id === "c-sign");
	if (piece) {
		piece.status = "sent";
		piece.draft = "سردر با امضای حمزه عوض می‌شود: «خانهٔ کودک گاچو».";
	}
	push(d, "brand", "جملهٔ سردر با امضای حمزه ثبت شد. اجرا با تیم مکان است، نه با روایت.", at, false);
}
function bookDecision(d, item, at) {
	if (!item.amount) return;
	book(d, {
		kind: "expense",
		amount: item.amount,
		category: item.category ?? (item.kind === "hr" ? "نیروی انسانی" : "متفرقه"),
		note: item.detail,
		source: "approval"
	}, at);
	if (item.id === "dec-milk") resolve(d, "alert-milk");
	push(d, "ledger", `خرج ${toman(item.amount)} بعد از امضا ثبت شد: ${item.title}.`, at, false);
}
function approveDecision(input, id, at) {
	const d = clone(input);
	const item = d.decisions.find((x) => x.id === id);
	if (!item || item.status !== "pending") return d;
	item.status = "approved";
	item.at = at;
	if (id === "dec-deposit") applyDeposit(d, at);
	else if (id === "dec-sound") applySound(d, at);
	else if (id === "dec-shift") applyShift(d, at);
	else if (id === "dec-hall") applyHall(d, at);
	else if (id === "dec-sign") applySign(d, at);
	else bookDecision(d, item, at);
	refresh(d);
	return d;
}
function rejectDecision(input, id, reason, at) {
	const d = clone(input);
	const item = d.decisions.find((x) => x.id === id);
	if (!item || item.status !== "pending") return d;
	item.status = "rejected";
	item.at = at;
	const text = `${reason} — دربارهٔ «${item.title}»`;
	d.lessons.unshift({
		id: nid("les"),
		agentId: item.agentId,
		text,
		at
	});
	push(d, item.agentId, `${AGENT_LABEL[item.agentId]} یاد گرفت: ${reason}. «${item.title}» را دوباره به همین شکل نمی‌آورد.`, at, true);
	if (id === "dec-deposit") {
		const concert = d.programs.find((p) => p.id === "concert");
		if (concert) concert.note = "بیعانه رد شد. سالن دیگری باید پیدا شود. اعلام عمومی همچنان ممنوع است.";
	}
	if (id === "dec-sound") {
		const kian = d.staff.find((s) => s.id === "kian");
		if (kian) kian.agentNote = "جایگزین بیرونی رد شد. پوشش باید با نیروی حاضر انجام شود.";
	}
	refresh(d);
	return d;
}
function peekBeat(d) {
	if (!d.flags.seatFilled) return "قدم بعد، خودران: قطعی کردن صندلی قصه برای یاسمن";
	if (!d.flags.rezaCleared) return "قدم بعد، خودران: بستن پروندهٔ تأخیر رضا";
	if (!d.flags.milkOrdered) return d.ceiling >= 48e4 ? "قدم بعد، خودران: سفارش شیر گیاهی، زیر سقف دفتر" : "قدم بعد: سفارش شیر از سقف گذشته و می‌رود برای امضا";
	if (!d.flags.hallFixed) return d.lessons.some((l) => l.text.includes("برنامه را دست نزن")) ? "قدم بعد: تداخل سالن به‌خاطر درسی که دادی امضا می‌خواهد" : "قدم بعد، خودران: کوتاه کردن تمرین تا سالن برای شب شعر خالی شود";
	if (!d.flags.captionSteered) return "قدم بعد، خودران: بازنویسی کپشن سفال با جهت ثبت‌شده";
	return "خودرانِ تازه‌ای نمانده. اگر امضایی باز است، فقط همان با توست";
}
function nextBeat(input, at) {
	const d = clone(input);
	if (!d.flags.seatFilled) {
		const reg = d.registrations.find((r) => r.id === "r-yas");
		const story = d.programs.find((p) => p.id === "story");
		if (reg) {
			reg.status = "confirmed";
			reg.agentNote = "جواب داد. صندلی قطعی است و نفر بعدی صف خبر نمی‌شود.";
		}
		if (story) story.enrolled = Math.min(story.capacity, story.enrolled + 1);
		if (story) story.note = "یاسمن جای رادین را گرفت. ظرفیت ۱۳ از ۱۴. ثبت‌نام خودش بست.";
		book(d, {
			kind: "income",
			amount: 35e4,
			category: "آموزش",
			note: "شهریهٔ قصه — یاسمن آذری",
			source: "agent"
		}, at);
		d.flags.seatFilled = true;
		push(d, "registrar", "یاسمن آذری قطعی شد. شهریهٔ ۳۵۰ هزار در دستهٔ آموزش نشست.", at, true);
		refresh(d);
		return {
			data: d,
			message: "ثبت‌نام صندلی را پر کرد و شهریه را نوشت. از تو نپرسید."
		};
	}
	if (!d.flags.rezaCleared) {
		const reza = d.staff.find((s) => s.id === "reza");
		if (reza) {
			reza.presence = "confirmed";
			reza.agentNote = "جواب داد: سر ساعت ۸ هستم. تأخیر دیروز دیگر روی میز حمزه نیست.";
		}
		d.flags.rezaCleared = true;
		push(d, "floor", "رضا رسیدن سر شیفت را تأیید کرد. پروندهٔ تأخیر بسته شد.", at, true);
		refresh(d);
		return {
			data: d,
			message: "کف سالن تأخیر رضا را با همان یادآوری صبح بست."
		};
	}
	if (!d.flags.milkOrdered) {
		d.flags.milkOrdered = true;
		if (d.ceiling >= 48e4) {
			book(d, {
				kind: "expense",
				amount: 48e4,
				category: "مواد کافه",
				note: "سفارش شیر گیاهی برای فردا",
				source: "agent"
			}, at);
			resolve(d, "alert-milk");
			push(d, "ledger", "شیر گیاهی ۴۸۰ هزار زیر سقف بود. سفارش رفت و از حمزه امضا گرفته نشد.", at, true);
			refresh(d);
			return {
				data: d,
				message: "دفتر شیر را خودش خرید. مبلغ زیر سقف خودران بود."
			};
		}
		if (!d.decisions.some((x) => x.id === "dec-milk")) d.decisions.unshift({
			id: "dec-milk",
			agentId: "ledger",
			kind: "finance",
			title: "سفارش شیر گیاهی",
			detail: "موجودی به آخر امروز رسیده. تأمین‌کننده ۴۸۰ هزار تومان می‌خواهد.",
			prepared: "دیده‌بان کمبود را دیده. دفتر به‌خاطر سقف فعلی پرداخت نکرده.",
			rule: `سقف خودران دفتر الان ${toman(d.ceiling)} است و این سفارش از آن گذشته.`,
			amount: 48e4,
			category: "مواد کافه",
			status: "pending",
			at
		});
		push(d, "ledger", "سفارش شیر از سقف خودران گذشت و روی میز امضا ماند.", at, true);
		refresh(d);
		return {
			data: d,
			message: "شیر لازم است، ولی از سقفی که تعیین کردی بالاتر است. پرداخت نکردم."
		};
	}
	if (!d.flags.hallFixed) {
		if (d.lessons.some((l) => l.text.includes("برنامه را دست نزن"))) {
			d.flags.hallFixed = true;
			if (!d.decisions.some((x) => x.id === "dec-hall" && x.status === "pending")) d.decisions.unshift({
				id: "dec-hall",
				agentId: "scheduler",
				kind: "schedule",
				title: "کوتاه کردن تمرین موسیقی",
				detail: "تمرین تا ۱۸ با چیدمان شب شعر تداخل دارد. راه‌حل، تمام کردن تمرین در ۱۷:۱۵ است.",
				prepared: "زمان‌بند معمولاً این را خودش انجام می‌دهد، ولی تو گفته‌ای برنامه دست نخورد.",
				rule: "درسی که دادی اختیار جزئی زمان‌بند را هم برای این مورد گرفت.",
				status: "pending",
				at
			});
			push(d, "scheduler", "تداخل سالن را بالا آوردم چون گفته بودی برنامه را دست نزنم.", at, true);
			refresh(d);
			return {
				data: d,
				message: "زمان‌بند می‌توانست خودش حل کند، ولی به درسی که دادی عمل کرد و پرسید."
			};
		}
		applyHall(d, at);
		refresh(d);
		return {
			data: d,
			message: "زمان‌بند تمرین را کوتاه کرد. برنامهٔ اصلی شب شعر تکان نخورد."
		};
	}
	if (!d.flags.captionSteered) {
		const piece = d.content.find((c) => c.id === "c-pottery");
		if (piece && piece.status !== "sent") {
			piece.status = "steered";
			piece.draft = potteryCaption(d.brandDirection);
		}
		d.flags.captionSteered = true;
		push(d, "brand", "کپشن سفال با جهت ثبت‌شدهٔ راهبر محتوا بازنویسی شد. انتشار هنوز با لیلاست.", at, true);
		refresh(d);
		return {
			data: d,
			message: "روایت کپشن را با جهت برند نوشت. برای حمزه نفرستاد."
		};
	}
	refresh(d);
	return {
		data: d,
		message: "چیز خودرانِ تازه‌ای نمانده. میز تو فقط همان امضاهای باز است."
	};
}
function applyVoice(input, text, at) {
	const parsed = parseCommand(text, input.ceiling);
	if (!parsed.ok) return {
		data: input,
		message: parsed.message
	};
	const d = clone(input);
	if (parsed.sensitive) {
		d.decisions.unshift({
			id: nid("dec"),
			agentId: "ledger",
			kind: parsed.category === "نیروی انسانی" ? "hr" : "finance",
			title: `خرج شنیده‌شده: ${parsed.category}`,
			detail: parsed.utterance,
			prepared: "دفتر جمله را شنید، دسته کرد، و پرداخت نکرد.",
			rule: parsed.because,
			amount: parsed.amount,
			category: parsed.category,
			status: "pending",
			at
		});
		push(d, "ledger", `شنیدم «${parsed.utterance}» و چون از خط گذشت، روی میز امضا گذاشتم.`, at, true);
		refresh(d);
		return {
			data: d,
			message: `شنیدم. ${toman(parsed.amount)} برای ${parsed.category} را نپرداختم؛ ${parsed.because}`
		};
	}
	book(d, {
		kind: parsed.kind,
		amount: parsed.amount,
		category: parsed.category,
		note: parsed.utterance,
		source: "voice"
	}, at);
	const verb = parsed.kind === "income" ? "درآمد" : "هزینه";
	push(d, "ledger", `${verb} ${toman(parsed.amount)} در «${parsed.category}» از روی صدا ثبت شد.`, at, true);
	refresh(d);
	return {
		data: d,
		message: `${verb} ${toman(parsed.amount)} در «${parsed.category}» ثبت شد. امضا نخواست.`
	};
}
function setCeiling(input, ceiling, at) {
	const d = clone(input);
	d.ceiling = ceiling;
	d.lessons = d.lessons.filter((l) => !l.text.startsWith("سقف خودران دفتر"));
	d.lessons.unshift({
		id: nid("les"),
		agentId: "ledger",
		text: `سقف خودران دفتر ${toman(ceiling)} است. بالاتر را حمزه امضا می‌کند.`,
		at
	});
	push(d, "ledger", `سقف خودران را ${toman(ceiling)} یاد گرفت.`, at, true);
	refresh(d);
	return d;
}
function completeTask(input, id, at) {
	const d = clone(input);
	const task = d.tasks.find((t) => t.id === id);
	if (!task || task.status === "done") return d;
	task.status = "done";
	if (id === "t-chairs") resolve(d, "alert-chairs");
	push(d, task.from, `${task.assignee} کار انسانی را بست: ${task.title}.`, at, false);
	refresh(d);
	return d;
}
function remindStaff(input, id, at) {
	const d = clone(input);
	const person = d.staff.find((s) => s.id === id);
	if (!person) return d;
	person.reminded = true;
	push(d, "floor", `یادآوری تازه برای ${person.name} رفت: ${person.role}، شیفت ${person.shift}.`, at, true);
	refresh(d);
	return d;
}
function saveDirection(input, text, at) {
	const d = clone(input);
	const direction = text.trim();
	if (!direction) return d;
	d.brandDirection = direction;
	const piece = d.content.find((c) => c.id === "c-pottery");
	if (piece && piece.status !== "sent") {
		piece.status = "steered";
		piece.draft = potteryCaption(direction);
	}
	d.flags.captionSteered = true;
	d.lessons.unshift({
		id: nid("les"),
		agentId: "brand",
		text: `جهت این دوره: ${direction}`,
		at
	});
	push(d, "brand", "جهت راهبر محتوا را گرفت و کپشن سفال را دوباره نوشت.", at, true);
	refresh(d);
	return d;
}
function steerPiece(input, id, at) {
	const d = clone(input);
	const piece = d.content.find((c) => c.id === id);
	if (!piece || piece.status === "sent" || piece.status === "escalate") return d;
	piece.status = "steered";
	piece.draft = id === "c-poetry" ? poetryCaption(d.brandDirection) : potteryCaption(d.brandDirection);
	if (id === "c-pottery") d.flags.captionSteered = true;
	push(d, "brand", `«${piece.title}» با جهت فعلی برند هم‌تراز شد.`, at, true);
	refresh(d);
	return d;
}
function releasePiece(input, id, at) {
	const d = clone(input);
	const piece = d.content.find((c) => c.id === id);
	if (!piece || piece.status === "escalate" || piece.status === "sent") return d;
	piece.status = "sent";
	if (id === "c-pottery") {
		const task = d.tasks.find((t) => t.id === "t-post");
		if (task) task.status = "done";
	}
	push(d, "brand", `«${piece.title}» به لیلا برای انتشار سپرده شد.`, at, true);
	refresh(d);
	return d;
}
function escalateSign(input, at) {
	const d = clone(input);
	if (d.decisions.some((x) => x.id === "dec-sign")) return d;
	const piece = d.content.find((c) => c.id === "c-sign");
	d.decisions.unshift({
		id: "dec-sign",
		agentId: "brand",
		kind: "brand",
		title: "تغییر جملهٔ سردر کافه",
		detail: piece?.draft ?? "تغییر جملهٔ سردر از «قهوه و قصه» به «خانهٔ کودک گاچو».",
		prepared: "راهبر محتوا گفت این از اختیار روایت بیرون است. روایت منتظر ماند و منتشر نکرد.",
		rule: "تغییر هویت برند را راهبر محتوا جهت می‌دهد، ولی امضایش با حمزه است.",
		status: "pending",
		at
	});
	push(d, "brand", "تغییر سردر را برای امضای حمزه فرستادم. خودم روی در ننوشتم.", at, true);
	refresh(d);
	return d;
}
function markReport(input, at) {
	const d = clone(input);
	if (d.reportRead) return d;
	d.reportRead = true;
	push(d, "brief", "حمزه گزارش صبح را دید. میزنامه نسخهٔ تازه نمی‌سازد مگر شب‌نامه برسد.", at, true);
	refresh(d);
	return d;
}
var TEMPLATE = {
	ceiling: 2e6,
	reportRead: false,
	brandDirection: "گرم و دقیق بگو. محور، تجربهٔ دست‌ساز کودک است. شعار تبلیغاتی و وعدهٔ تخفیف ننویس.",
	flags: {
		seatFilled: false,
		rezaCleared: false,
		milkOrdered: false,
		hallFixed: false,
		captionSteered: false
	},
	letter: {
		id: "letter-last",
		title: "شب‌نامهٔ دیشب",
		sentAt: "۲۲:۳۰",
		wins: [
			"صندوق کافه ۴٫۸۵ میلیون تومان بسته شد؛ بالاتر از میانگین شش روز اخیر.",
			"کارگاه سفال هفته بدون صندلی خالی ماند و دو نفر هنوز در انتظارند.",
			"یادآوری شیفت عصر، قبل از کلاس رفت و کسی پشت در نماند."
		],
		issues: [
			"رضا ۱۸ دقیقه دیر کرد و صف صبح بار را کند کرد. الگوی تأخیر است، نه یک اتفاق.",
			"کیان برای تعهد صدا دیر پاسخ می‌دهد؛ اگر امروز هم ساکت بماند صحنه می‌لنگد.",
			"حافظ‌خوانی فردا با کنسرت هم‌سالن است و هنوز جابه‌جا نشده.",
			"بیعانهٔ سالن تعهد نشده. بدون آن، اعلام کنسرت دروغ است."
		],
		tomorrow: [
			"اول وقت فقط سه چیز جلوی حمزه باشد: بیعانه، صدای کیان، انتقال حافظ‌خوانی.",
			"صندلی آزاد قصه را ثبت‌نام به یاسمن پیشنهاد بدهد، بی‌آنکه بپرسد.",
			"شیر گیاهی را تا قبل از ظهر برسان؛ موجودی به یک روز رسیده.",
			"کپشن سفال را راهبر محتوا جهت بدهد. این کار مال میز حمزه نیست."
		]
	},
	agents: [
		{
			id: "scheduler",
			name: "زمان‌بند",
			duty: "چیدن کلاس، کارگاه، ایونت و کنسرت",
			band: "until-line",
			accountable: "حمزه، فقط وقتی برنامهٔ اصلی هفته عوض شود",
			worksWith: "ثبت‌نام، کف سالن، دیده‌بان",
			autonomyNote: "کوتاه کردن تمرین و جابه‌جایی جزئی خودران است. شب شعر، کنسرت و تقویم هفته امضا می‌خواهد.",
			status: "waiting",
			lastAction: "تداخل حافظ‌خوانی با کنسرت را جدا کرد و برای امضا گذاشت؛ به خانوادهٔ کلاس‌ها پیام نزد."
		},
		{
			id: "registrar",
			name: "ثبت‌نام",
			duty: "ظرفیت، انصراف، لیست انتظار، خبررسانی",
			band: "auto",
			accountable: "هیچ‌کس؛ نتیجه را به زمان‌بند و شب‌نامه می‌دهد",
			worksWith: "زمان‌بند، روایت",
			autonomyNote: "برای پر کردن صندلی و پیامک جابه‌جایی اجازه نمی‌گیرد.",
			status: "running",
			lastAction: "انصراف رادین را ثبت کرد و صندلی قصه را به یاسمن آذری پیشنهاد داد."
		},
		{
			id: "floor",
			name: "کف سالن",
			duty: "حضور، شیفت و کیفیت نیروی کافه و صحنه",
			band: "until-line",
			accountable: "حمزه، فقط برای تغییر نیرو",
			worksWith: "دیده‌بان، زمان‌بند، دفتر",
			autonomyNote: "یادآوری و تذکر تکرار را خودش می‌فرستد. جایگزینی آدم امضا می‌خواهد.",
			status: "waiting",
			lastAction: "به رضا یادآوری شیفت داد. به کیان دو پیام زد و چون جواب نیامد، موضوع را بالا آورد."
		},
		{
			id: "ledger",
			name: "دفتر",
			duty: "شنیدن درآمد و هزینه، دسته‌بندی، ثبت زیر سقف",
			band: "until-line",
			accountable: "حمزه، برای خرج بالای سقف یا تعهد حقوق و بیعانه",
			worksWith: "دیده‌بان، میزنامه",
			autonomyNote: "مواد کافه و خرج‌های خرد را خودش می‌نویسد. پرداخت بزرگ را فقط پیش‌نویس می‌کند.",
			status: "waiting",
			lastAction: "بیعانهٔ ۸٫۵ میلیونی را شنید، دسته کرد، و پرداخت نکرد."
		},
		{
			id: "sentinel",
			name: "دیده‌بان",
			duty: "کمبود، تداخل و غیبت را قبل از وقوع می‌بیند",
			band: "auto",
			accountable: "به ایجنت صاحب کار گزارش می‌دهد، نه به حمزه، مگر خطر بماند",
			worksWith: "همه، جز میزنامه",
			autonomyNote: "خرج نمی‌کند و برنامه را عوض نمی‌کند. فقط زود خبر می‌دهد.",
			status: "running",
			lastAction: "شیر، صندلی حیاط، سکوت کیان و هم‌پوشانی سالن را قبل از باز شدن کافه علامت زد."
		},
		{
			id: "night",
			name: "شب‌نامه",
			duty: "هر شب ۲۲:۳۰ سه پیام: خوب، ضعف، کار فردا",
			band: "auto",
			accountable: "حمزه، فقط به‌عنوان گیرنده",
			worksWith: "خروجی همهٔ ایجنت‌ها",
			autonomyNote: "متن را از کار واقعی همان روز می‌سازد و بدون تأیید می‌فرستد.",
			status: "idle",
			lastAction: "دیشب سر ساعت فرستاد. پیش‌نویس امشب با هر اقدام تازه عوض می‌شود."
		},
		{
			id: "brand",
			name: "روایت",
			duty: "محتوا، آموزش و لحن برند گاچو",
			band: "content-lead",
			accountable: "راهبر محتوا؛ حمزه فقط هویت برند را امضا می‌کند",
			worksWith: "زمان‌بند، ثبت‌نام",
			autonomyNote: "کپشن و استوری را با جهت ثبت‌شده می‌نویسد. سردر، نشان و شعار اصلی را بالا می‌آورد.",
			status: "waiting",
			lastAction: "دو پیش‌نویس خام گذاشته و منتظر جهت راهبر محتواست. سردر را خودش عوض نکرد."
		},
		{
			id: "brief",
			name: "میزنامه",
			duty: "گزارش مدیریتی یک‌صفحه‌ای برای حمزه",
			band: "auto",
			accountable: "حمزه، برای خواندن نه برای تأیید ساختن",
			worksWith: "دفتر، شب‌نامه، دیده‌بان",
			autonomyNote: "هر صبح گزارش را از همان داده‌ها می‌سازد تا حمزه خام‌کاری ورق نزند.",
			status: "running",
			lastAction: "گزارش امروز آماده است: صندوق دیروز، سه امضا، چهار ریسک."
		}
	],
	decisions: [
		{
			id: "dec-deposit",
			agentId: "ledger",
			kind: "finance",
			title: "بیعانهٔ سالن برای کنسرت فردا",
			detail: "مالک سالن ۸٫۵ میلیون تومان بیعانه می‌خواهد تا فردا ظهر جا بماند. بدون پرداخت، تاریخ آزاد می‌شود.",
			prepared: "زمان‌بند سانس را نگه داشته، روایت اعلام عمومی نکرده، دفتر سند را نوشته و پول را نفرستاده.",
			rule: "خرج بالای سقف دو میلیون، و هر تعهد مکان، فقط با امضای حمزه.",
			amount: 85e5,
			status: "pending",
			at: "۰۵:۲۸"
		},
		{
			id: "dec-sound",
			agentId: "floor",
			kind: "hr",
			title: "جایگزینی کیان با پیمان برای صدا",
			detail: "کیان برای چک صدای شب شعر و کنسرت فردا جواب نداده. پیمان بهمنی آزاد است و تجهیزات خودش را می‌آورد.",
			prepared: "کف سالن دو پیام به کیان داده. دیده‌بان ریسک را قبل از شیفت آورده. دستمزد موقت پیمان ۹۰۰ هزار است؛ اگر نیرو را تأیید کنی دفتر زیر سقف خودش ثبت می‌کند.",
			rule: "عوض کردن نیروی صحنه از اختیار خودران بیرون است.",
			amount: 9e5,
			status: "pending",
			at: "۰۵:۲۶"
		},
		{
			id: "dec-shift",
			agentId: "scheduler",
			kind: "schedule",
			title: "انتقال حافظ‌خوانی فردا به شنبه",
			detail: "حافظ‌خوانی فردا ۱۸ تا ۱۹:۳۰ با کنسرت هم‌سالن است. شنبه همان ساعت خالی است و شش نفر ثبت‌نام دارند.",
			prepared: "به ثبت‌نام‌شده‌ها هنوز چیزی گفته نشده. اگر امضا کنی، ثبت‌نام خودش خبر جابه‌جایی را می‌فرستد.",
			rule: "این تغییر برنامهٔ اصلی هفته است، نه یک جابه‌جایی جزئی داخل روز.",
			status: "pending",
			at: "۰۵:۲۴"
		}
	],
	programs: [
		{
			id: "cafe",
			title: "باز بودن کافه",
			kind: "cafe",
			when: "امروز",
			start: "۰۸:۰۰",
			end: "۲۳:۰۰",
			place: "سالن کافه",
			capacity: 28,
			enrolled: 0,
			lead: "رضا مرادی",
			status: "set",
			note: "شروع شیفت به یادآوری صبح بسته است. منو عوض نمی‌شود."
		},
		{
			id: "story",
			title: "کلاس قصهٔ کودک",
			kind: "class",
			when: "امروز",
			start: "۰۹:۰۰",
			end: "۱۰:۳۰",
			place: "اتاق نارون",
			capacity: 14,
			enrolled: 12,
			lead: "سارا کیانی",
			status: "set",
			note: "رادین انصراف داد. صندلی به یاسمن پیشنهاد شده و هنوز قطعی نشده."
		},
		{
			id: "pottery",
			title: "کارگاه سفال",
			kind: "workshop",
			when: "امروز",
			start: "۱۱:۰۰",
			end: "۱۲:۳۰",
			place: "حیاط",
			capacity: 10,
			enrolled: 8,
			lead: "نازنین رفیعی",
			status: "set",
			note: "دو جا خالی. هستی در لیست انتظار است. صندلی شکسته باید قبل از ۱۱ از حیاط برود."
		},
		{
			id: "rehearsal",
			title: "تمرین موسیقی نوجوان",
			kind: "class",
			when: "امروز",
			start: "۱۶:۰۰",
			end: "۱۸:۰۰",
			place: "سالن",
			capacity: 9,
			enrolled: 9,
			lead: "کیان پوری",
			status: "conflict",
			note: "چیدمان شب شعر از ۱۷:۳۰ سالن را می‌خواهد. کوتاه کردن تمرین برنامهٔ اصلی نیست."
		},
		{
			id: "poetry",
			title: "شب شعر گاچو",
			kind: "event",
			when: "امروز",
			start: "۱۹:۳۰",
			end: "۲۱:۳۰",
			place: "سالن",
			capacity: 40,
			enrolled: 36,
			lead: "مریم احمدی",
			status: "set",
			note: "برنامهٔ اصلی امروز. جابه‌جا نمی‌شود. حضور حمزه اختیاری است."
		},
		{
			id: "hafez",
			title: "حافظ‌خوانی",
			kind: "workshop",
			when: "فردا",
			start: "۱۸:۰۰",
			end: "۱۹:۳۰",
			place: "سالن",
			capacity: 16,
			enrolled: 6,
			lead: "سارا کیانی",
			status: "proposed",
			note: "منتظر امضای انتقال به شنبه. تا امضا نیاید، ثبت‌نام سکوت می‌کند."
		},
		{
			id: "concert",
			title: "کنسرت حیاط",
			kind: "concert",
			when: "فردا",
			start: "۱۹:۰۰",
			end: "۲۲:۰۰",
			place: "سالن",
			capacity: 80,
			enrolled: 0,
			lead: "مریم احمدی",
			status: "proposed",
			note: "اعلام عمومی ممنوع تا بیعانه امضا شود. بلیت هنوز باز نشده."
		}
	],
	registrations: [
		{
			id: "r-radin",
			programId: "story",
			name: "رادین کاظمی",
			status: "cancelled",
			agentNote: "انصراف صبح ثبت شد. شهریه برنمی‌گردد؛ این قاعدهٔ آموزشگاه است."
		},
		{
			id: "r-yas",
			programId: "story",
			name: "یاسمن آذری",
			status: "offered",
			agentNote: "پیشنهاد صندلی آزاد رفته. اگر تا ۸:۴۰ جواب ندهد، نفر بعدی صف خبر می‌شود."
		},
		{
			id: "r-hesti",
			programId: "pottery",
			name: "هستی محمدی",
			status: "waitlist",
			agentNote: "نفر اول انتظار سفال. هنوز صندلی قطعی خالی نشده؛ پیام فروش عجولانه نرفته."
		}
	],
	staff: [
		{
			id: "sara",
			name: "سارا کیانی",
			role: "مربی قصه و حافظ",
			shift: "۰۹ تا ۱۳",
			presence: "confirmed",
			score: 92,
			agentNote: "حضور امروز را دیشب تأیید کرد. کلاس را خودش باز می‌کند.",
			reminded: false
		},
		{
			id: "nazanin",
			name: "نازنین رفیعی",
			role: "مربی سفال",
			shift: "۱۱ تا ۱۳",
			presence: "confirmed",
			score: 88,
			agentNote: "وسایل حیاط را خودش می‌چیند. لازم نیست حمزه سر بزند.",
			reminded: false
		},
		{
			id: "reza",
			name: "رضا مرادی",
			role: "باریستا",
			shift: "۰۸ تا ۱۶",
			presence: "watched",
			score: 74,
			agentNote: "دیروز ۱۸ دقیقه دیر کرد. یادآوری شیفت امروز رفته و هنوز پاسخ نداده.",
			reminded: true
		},
		{
			id: "maryam",
			name: "مریم احمدی",
			role: "پذیرش و اجرای ایونت",
			shift: "۱۶ تا ۲۲",
			presence: "confirmed",
			score: 90,
			agentNote: "لیست شب شعر را ساعت ۱۸ چاپ می‌کند. اگر حمزه نیاید، سلام اول با اوست.",
			reminded: false
		},
		{
			id: "kian",
			name: "کیان پوری",
			role: "صدابردار",
			shift: "۱۶ تا ۲۲",
			presence: "silent",
			score: 61,
			agentNote: "برای چک صدای امشب و کنسرت فردا بی‌پاسخ است. دو پیام رفته.",
			reminded: true
		},
		{
			id: "leila",
			name: "لیلا نوری",
			role: "انتشار محتوا",
			shift: "دورکار",
			presence: "remote",
			score: 86,
			agentNote: "منتشر نمی‌کند تا راهبر محتوا جهت بدهد. از حمزه کار نمی‌گیرد.",
			reminded: false
		}
	],
	tasks: [
		{
			id: "t-chairs",
			assignee: "رضا مرادی",
			title: "دو صندلی شکستهٔ حیاط را قبل از سفال جدا کن",
			from: "sentinel",
			status: "open"
		},
		{
			id: "t-list",
			assignee: "مریم احمدی",
			title: "لیست ۳۶ نفرهٔ شب شعر را ساعت ۱۸ چاپ کن",
			from: "registrar",
			status: "open"
		},
		{
			id: "t-post",
			assignee: "لیلا نوری",
			title: "کپشن سفال را بعد از جهت راهبر محتوا منتشر کن",
			from: "brand",
			status: "open"
		}
	],
	ledger: [],
	alerts: [
		{
			id: "alert-kian",
			title: "صدای امشب هنوز صاحب ندارد",
			detail: "کیان تأیید نکرده. اگر تا ظهر نیاید، شب شعر و کنسرت فردا هر دو بی‌صدا می‌مانند.",
			agentId: "sentinel",
			resolved: false
		},
		{
			id: "alert-hall",
			title: "سالن بین تمرین و شب شعر دو تکه است",
			detail: "تمرین تا ۱۸ طول می‌کشد و چیدمان از ۱۷:۳۰ سالن را می‌خواهد. حدود ۴۵ دقیقه درگیری.",
			agentId: "sentinel",
			resolved: false
		},
		{
			id: "alert-milk",
			title: "شیر گیاهی فقط برای امروز مانده",
			detail: "اگر تا ظهر سفارش نرود، فردا بار لاته گیاهی را خط می‌زند. مبلغ حدود ۴۸۰ هزار است.",
			agentId: "sentinel",
			resolved: false
		},
		{
			id: "alert-chairs",
			title: "دو صندلی حیاط شکسته وسط کارگاه می‌ماند",
			detail: "سفال ساعت ۱۱ در حیاط است. جدا نکردن صندلی، کلاس را ناامن می‌کند.",
			agentId: "sentinel",
			resolved: false
		}
	],
	activity: [
		{
			id: "a1",
			agentId: "night",
			text: "شب‌نامهٔ دیشب ساعت ۲۲:۳۰ برای حمزه رفت: چه خوب پیش رفت، ضعف‌ها، کار امروز.",
			at: "۲۲:۳۰",
			auto: true
		},
		{
			id: "a2",
			agentId: "floor",
			text: "به رضا یادآوری شد شیفت ۸ را به‌موقع باز کند؛ دیروز ۱۸ دقیقه تأخیر داشت.",
			at: "۰۵:۱۰",
			auto: true
		},
		{
			id: "a3",
			agentId: "registrar",
			text: "انصراف رادین از کلاس قصه ثبت شد و صندلی به یاسمن آذری پیشنهاد شد.",
			at: "۰۵:۲۲",
			auto: true
		},
		{
			id: "a4",
			agentId: "sentinel",
			text: "قبل از باز شدن کافه چهار ریسک علامت خورد: صدا، سالن، شیر، صندلی.",
			at: "۰۵:۲۶",
			auto: true
		},
		{
			id: "a5",
			agentId: "ledger",
			text: "بیعانه، نیروی صدا و انتقال حافظ‌خوانی از صف خودران جدا شد و روی میز امضا ماند.",
			at: "۰۵:۲۸",
			auto: true
		},
		{
			id: "a6",
			agentId: "brief",
			text: "گزارش مدیریتی صبح آماده است. حمزه لازم نیست خام‌دفتر را ورق بزند.",
			at: "۰۵:۳۰",
			auto: true
		}
	],
	lessons: [
		{
			id: "l-ceil",
			agentId: "ledger",
			text: "سقف خودران دفتر ۲ میلیون تومان است. بالاتر را حمزه امضا می‌کند.",
			at: "۰۵:۰۰"
		},
		{
			id: "l-floor",
			agentId: "floor",
			text: "تأخیر دیروز رضا با یادآوری بسته می‌شود و بالا نمی‌آید، مگر امروز تکرار شود.",
			at: "۰۵:۱۰"
		},
		{
			id: "l-brand",
			agentId: "brand",
			text: "تخفیف و شعار تبلیغاتی در متن گاچو نمی‌آید، حتی اگر ظرفیت خالی باشد.",
			at: "دیروز"
		}
	],
	content: [
		{
			id: "c-pottery",
			title: "کپشن کارگاه سفال",
			channel: "اینستاگرام",
			status: "draft",
			draft: "کارگاه سفال گاچو امروز در حیاط است. هشت نفر، دو جا خالی. این متن هنوز جهت نگرفته."
		},
		{
			id: "c-poetry",
			title: "استوری شب شعر",
			channel: "استوری",
			status: "draft",
			draft: "امشب شب شعر گاچو، سالن، از ۱۹:۳۰. متن خام است و چهرهٔ مهمان ندارد."
		},
		{
			id: "c-sign",
			title: "جملهٔ سردر کافه",
			channel: "هویت مکان",
			status: "escalate",
			draft: "پیشنهاد: «خانهٔ کودک گاچو» به‌جای «قهوه و قصه». این تغییر نشان است، نه یک کپشن."
		}
	]
};
function freshData() {
	return structuredClone(TEMPLATE);
}
var KEY = "tata-desk-v1";
function valid(data) {
	return Boolean(data && Array.isArray(data.decisions) && Array.isArray(data.agents) && Array.isArray(data.programs) && data.flags && typeof data.ceiling === "number");
}
var useTata = create((set) => ({
	data: freshData(),
	role: "hamzeh",
	hydrated: false,
	hydrate: () => {
		if (typeof window === "undefined") return;
		try {
			const raw = localStorage.getItem(KEY);
			if (!raw) {
				set({ hydrated: true });
				return;
			}
			const parsed = JSON.parse(raw);
			if (!valid(parsed.data)) {
				set({ hydrated: true });
				return;
			}
			set({
				data: parsed.data,
				role: parsed.role === "content" ? "content" : "hamzeh",
				hydrated: true
			});
		} catch {
			set({ hydrated: true });
		}
	},
	setRole: (role) => set({ role }),
	approve: (id) => set((s) => ({ data: approveDecision(s.data, id, tehranNowLabel()) })),
	reject: (id, reason) => set((s) => ({ data: rejectDecision(s.data, id, reason, tehranNowLabel()) })),
	beat: () => {
		let message = "";
		set((s) => {
			const result = nextBeat(s.data, tehranNowLabel());
			message = result.message;
			return { data: result.data };
		});
		return message;
	},
	voice: (text) => {
		let message = "";
		set((s) => {
			const result = applyVoice(s.data, text, tehranNowLabel());
			message = result.message;
			return { data: result.data };
		});
		return message;
	},
	setCeiling: (n) => set((s) => ({ data: setCeiling(s.data, n, tehranNowLabel()) })),
	completeTask: (id) => set((s) => ({ data: completeTask(s.data, id, tehranNowLabel()) })),
	remind: (id) => set((s) => ({ data: remindStaff(s.data, id, tehranNowLabel()) })),
	saveDirection: (text) => set((s) => ({ data: saveDirection(s.data, text, tehranNowLabel()) })),
	steer: (id) => set((s) => ({ data: steerPiece(s.data, id, tehranNowLabel()) })),
	release: (id) => set((s) => ({ data: releasePiece(s.data, id, tehranNowLabel()) })),
	escalateSign: () => set((s) => ({ data: escalateSign(s.data, tehranNowLabel()) })),
	markReport: () => set((s) => ({ data: markReport(s.data, tehranNowLabel()) })),
	reset: () => set({
		data: freshData(),
		role: "hamzeh"
	})
}));
if (typeof window !== "undefined") useTata.subscribe((state, prev) => {
	if (!state.hydrated) return;
	if (prev.hydrated && prev.data === state.data && prev.role === state.role) return;
	localStorage.setItem(KEY, JSON.stringify({
		data: state.data,
		role: state.role
	}));
});
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Btn({ tone = "seal", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50", tone === "seal" && "bg-seal text-seal-ink", tone === "ghost" && "border border-line bg-card text-ink", tone === "ink" && "bg-ink text-paper", className),
		...props
	});
}
function Pill({ children, tone = "ink" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium", tone === "ink" && "bg-ink text-paper", tone === "seal" && "bg-seal-soft text-seal", tone === "olive" && "bg-olive-soft text-olive", tone === "muted" && "bg-paper-deep text-muted"),
		children
	});
}
function PageIntro({ kicker, title, lede, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-seal",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold leading-snug sm:text-3xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted sm:text-base",
					children: lede
				})
			]
		}), action]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-card px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num mt-1 text-xl font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
function Note({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-md border border-line bg-seal-soft px-3 py-2 text-sm text-ink",
		children
	});
}
function Panel({ title, aside, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-line bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-bold",
				children: title
			}), aside]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children
		})]
	});
}
function DecisionCard({ item }) {
	const role = useTata((s) => s.role);
	const approve = useTata((s) => s.approve);
	const reject = useTata((s) => s.reject);
	const setRole = useTata((s) => s.setRole);
	const [open, setOpen] = (0, import_react.useState)(false);
	const canSign = role === "hamzeh";
	if (item.status !== "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex items-start justify-between gap-3 rounded-md border border-line bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: item.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: item.status === "approved" ? "امضا شد و ایجنت‌ها اجرا کردند" : "رد شد و به درس ایجنت بدل شد"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "num shrink-0 text-xs text-muted",
			children: item.at
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: "seal",
						children: DECISION_LABEL[item.kind]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: AGENT_LABEL[item.agentId] }),
					item.amount != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num text-sm font-medium",
						children: toman(item.amount)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-lg font-bold",
				children: item.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: item.detail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: ["آماده کرده: ", item.prepared]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-seal",
				children: ["چرا نپرسیده رد نشده: ", item.rule]
			}),
			canSign ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "flex-1",
					onClick: () => approve(item.id),
					children: "تأیید و بسپار به ایجنت"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "ghost",
					className: "flex-1",
					onClick: () => setOpen((v) => !v),
					children: "رد کن و یادش بده"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "امضا فقط با حمزه است. از این میز نمی‌توانی این را ببندی." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "ghost",
					className: "mt-2",
					onClick: () => setRole("hamzeh"),
					children: "برگشت به میز حمزه"
				})]
			}),
			open && canSign && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col gap-2",
				children: REJECT_REASONS[item.kind].map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "ghost",
					onClick: () => reject(item.id, reason),
					children: reason
				}, reason))
			})
		]
	});
}
function ActivityFeed({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex flex-col",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3 border-b border-line py-3 last:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "num w-12 shrink-0 text-xs text-muted",
				children: item.at
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [AGENT_LABEL[item.agentId], item.auto ? " · خودران" : " · با انسان"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: item.text
				})]
			})]
		}, item.id))
	});
}
function Count({ n }) {
	if (n <= 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "num rounded-sm bg-seal px-1.5 text-xs font-medium text-seal-ink",
		children: faNum(n)
	});
}
var NAV = [
	{
		to: "/",
		label: "میز",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/decisions",
		label: "امضا",
		icon: ShieldCheck
	},
	{
		to: "/program",
		label: "برنامه",
		icon: CalendarDays
	},
	{
		to: "/ledger",
		label: "دفتر",
		icon: Wallet
	},
	{
		to: "/agents",
		label: "ایجنت‌ها",
		icon: Bot
	},
	{
		to: "/night",
		label: "شب‌نامه",
		icon: Moon
	},
	{
		to: "/team",
		label: "تیم",
		icon: Users
	},
	{
		to: "/brand",
		label: "روایت",
		icon: BookOpen
	},
	{
		to: "/reports",
		label: "گزارش",
		icon: ScrollText
	}
];
var MOBILE = /* @__PURE__ */ new Set([
	"/",
	"/decisions",
	"/program",
	"/ledger"
]);
function Clock() {
	const [time, setTime] = (0, import_react.useState)("—");
	(0, import_react.useEffect)(() => {
		const tick = () => setTime(tehranNowLabel());
		tick();
		const id = setInterval(tick, 3e4);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "num",
		children: time
	});
}
function Shell({ children }) {
	const hydrate = useTata((s) => s.hydrate);
	const role = useTata((s) => s.role);
	const setRole = useTata((s) => s.setRole);
	const pending = useTata((s) => s.data.decisions.filter((d) => d.status === "pending").length);
	const drafts = useTata((s) => s.data.content.filter((c) => c.status === "draft").length);
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [more, setMore] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		setMore(false);
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:grid md:grid-cols-[15.5rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-screen flex-col border-l border-line bg-card md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-line px-4 py-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-11 items-center justify-center rounded-md bg-seal text-lg font-bold text-seal-ink",
									children: "ت"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "کافه فرهنگ گاچو"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: "میز تاتا"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-1 flex-col gap-1 p-3",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								...item,
								badge: badgeFor(item.to, pending, drafts)
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-4 pb-4 text-xs leading-relaxed text-muted",
							children: "فرهنگسرا، آموزشگاه، کافه و ایونت. ایجنت‌ها می‌برند؛ حمزه امضا می‌کند."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "sticky top-0 z-20 border-b border-line bg-paper px-4 py-3 md:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 md:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-10 items-center justify-center rounded-md bg-seal font-bold text-seal-ink md:hidden",
									children: "ت"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold md:text-base",
									children: tehranDateLabel()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										"تهران ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mx-1",
											children: "·"
										}),
										role === "hamzeh" ? "ناظر: حمزه تاتا" : "هدایت: راهبر محتوا"
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex rounded-full border border-line bg-card p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("min-h-11 rounded-full px-3 text-sm", role === "hamzeh" ? "bg-ink text-paper" : "text-muted"),
									onClick: () => setRole("hamzeh"),
									children: "حمزه"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("min-h-11 rounded-full px-3 text-sm", role === "content" ? "bg-ink text-paper" : "text-muted"),
									onClick: () => setRole("content"),
									children: "راهبر محتوا"
								})]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "mx-auto w-full max-w-6xl px-4 py-6 pb-28 md:px-8 md:pb-16",
						children
					})]
				})]
			}),
			more && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-16 z-30 border-t border-line bg-card p-3 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: NAV.filter((item) => !MOBILE.has(item.to)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						...item,
						badge: badgeFor(item.to, pending, drafts)
					}, item.to))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-card md:hidden",
				children: [NAV.filter((item) => MOBILE.has(item.to)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
					...item,
					compact: true,
					badge: badgeFor(item.to, pending, drafts)
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs", more ? "text-seal" : "text-muted"),
					onClick: () => setMore((v) => !v),
					children: ["بیشتر", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, { n: drafts })]
				})]
			})
		]
	});
}
function badgeFor(to, pending, drafts) {
	if (to === "/decisions") return pending;
	if (to === "/brand") return drafts;
	return 0;
}
function NavLink({ to, label, icon: Icon, exact, compact, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		activeOptions: { exact: Boolean(exact) },
		className: cn("flex items-center gap-2 rounded-md text-sm", compact ? "min-h-14 flex-col justify-center gap-0.5 text-xs" : "min-h-11 px-3"),
		activeProps: { className: compact ? "text-seal" : "bg-ink text-paper" },
		inactiveProps: { className: "text-muted" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1",
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, { n: badge })]
		})]
	});
}
var styles_default = "/assets/styles-DxX4dXq4.css";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "میز تاتا" },
			{
				name: "theme-color",
				content: "#f3eee6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$8 = () => import("./routes-CfJDlSLM.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./agents-BbpAr0R6.mjs");
var Route$7 = createFileRoute("/agents")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./brand-BQ-6UEcu.mjs");
var Route$6 = createFileRoute("/brand")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./decisions-BFze78Pl.mjs");
var Route$5 = createFileRoute("/decisions")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./ledger-BbDry1PJ.mjs");
var Route$4 = createFileRoute("/ledger")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./night-jMlk88N8.mjs");
var Route$3 = createFileRoute("/night")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./program-Bqfsarkf.mjs");
var Route$2 = createFileRoute("/program")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./reports-tMtD0kPU.mjs");
var Route$1 = createFileRoute("/reports")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./team-D28FOQXY.mjs");
var Route = createFileRoute("/team")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	AgentsRoute: Route$7.update({
		id: "/agents",
		path: "/agents",
		getParentRoute: () => Route$9
	}),
	BrandRoute: Route$6.update({
		id: "/brand",
		path: "/brand",
		getParentRoute: () => Route$9
	}),
	DecisionsRoute: Route$5.update({
		id: "/decisions",
		path: "/decisions",
		getParentRoute: () => Route$9
	}),
	LedgerRoute: Route$4.update({
		id: "/ledger",
		path: "/ledger",
		getParentRoute: () => Route$9
	}),
	NightRoute: Route$3.update({
		id: "/night",
		path: "/night",
		getParentRoute: () => Route$9
	}),
	ProgramRoute: Route$2.update({
		id: "/program",
		path: "/program",
		getParentRoute: () => Route$9
	}),
	ReportsRoute: Route$1.update({
		id: "/reports",
		path: "/reports",
		getParentRoute: () => Route$9
	}),
	TeamRoute: Route.update({
		id: "/team",
		path: "/team",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { tomanShort as S, STATUS_LABEL as _, Note as a, tehranWeekday as b, Pill as c, useTata as d, peekBeat as f, PROGRAM_LABEL as g, PRESENCE_LABEL as h, DecisionCard as i, Stat as l, BAND_LABEL as m, ActivityFeed as n, PageIntro as o, AGENT_LABEL as p, Btn as r, Panel as s, router_exports as t, cn as u, faNum as v, toman as x, tehranDateLabel as y };
