globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/dashboard.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"122f-k1HjlgrvooeSdpXF1FwYq58BzmA\"",
		"mtime": "2026-08-21T12:24:12.734Z",
		"size": 4655,
		"path": "../public/dashboard.html"
	},
	"/id and pass": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"5d-5j9PBs20N3CfBSf6XeOokELgHVI\"",
		"mtime": "2026-08-21T12:55:52.039Z",
		"size": 93,
		"path": "../public/id and pass"
	},
	"/login.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"a8d-RCGB/foDJMyt2DUNOrNJAC/F52I\"",
		"mtime": "2026-08-21T12:22:09.652Z",
		"size": 2701,
		"path": "../public/login.html"
	},
	"/reports.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"19db-3Aj227FLPBatTfmlj638TCWxqWo\"",
		"mtime": "2026-08-21T12:24:12.734Z",
		"size": 6619,
		"path": "../public/reports.html"
	},
	"/sales-entry.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"1623-QeSuaomdrjxE0Tcn70Ua0Hj/z68\"",
		"mtime": "2026-08-21T12:59:12.408Z",
		"size": 5667,
		"path": "../public/sales-entry.html"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-21T11:09:55.129Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/README.md": {
		"type": "text/markdown; charset=utf-8",
		"etag": "\"ec3-TvZwI0UhnKlbGcl9StprJSYNXwQ\"",
		"mtime": "2026-08-21T12:31:35.591Z",
		"size": 3779,
		"path": "../public/README.md"
	},
	"/settings.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"11fd-RTzDFmQAFqUAHqfwNxItfKHBkpI\"",
		"mtime": "2026-08-21T12:39:52.981Z",
		"size": 4605,
		"path": "../public/settings.html"
	},
	"/search.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"1f50-kdHUfEnB711pvs4+xqGjtHDmZHo\"",
		"mtime": "2026-08-21T12:24:12.737Z",
		"size": 8016,
		"path": "../public/search.html"
	},
	"/assets/routes-BkdwLN1e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2de-cPJYtn67z/mm7/H89wPBg2I4URY\"",
		"mtime": "2026-08-21T12:59:30.800Z",
		"size": 734,
		"path": "../public/assets/routes-BkdwLN1e.js"
	},
	"/css/app.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3be8-hb3mlSQNjcpr/KHmQqdFQjvkL0A\"",
		"mtime": "2026-08-21T12:28:29.752Z",
		"size": 15336,
		"path": "../public/css/app.css"
	},
	"/assets/styles-B_4oBSTT.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"116a1-6J/KCwwwaC5Ye83J/UTpNJG9ZKc\"",
		"mtime": "2026-08-21T12:59:30.801Z",
		"size": 71329,
		"path": "../public/assets/styles-B_4oBSTT.css"
	},
	"/css/dashboard.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"55-dKWsWogXgWmikVpWSTBSKa9wzww\"",
		"mtime": "2026-08-21T11:48:21.655Z",
		"size": 85,
		"path": "../public/css/dashboard.css"
	},
	"/css/login.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"8ba-xRIxadcyFywelJhbpNv6Sr6iYXk\"",
		"mtime": "2026-08-21T12:22:39.181Z",
		"size": 2234,
		"path": "../public/css/login.css"
	},
	"/css/sales-entry.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"57-DsR9veIW9zMV/7XXXqmXxp+MrHQ\"",
		"mtime": "2026-08-21T11:48:21.674Z",
		"size": 87,
		"path": "../public/css/sales-entry.css"
	},
	"/js/common.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ab7-YInOZY2vacdjjU+DWE3uSCcB4MM\"",
		"mtime": "2026-08-21T12:43:07.545Z",
		"size": 10935,
		"path": "../public/js/common.js"
	},
	"/css/reports.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"53-rvUGqwRHK4hlbnbIn2FN3qKaMa8\"",
		"mtime": "2026-08-21T11:48:21.668Z",
		"size": 83,
		"path": "../public/css/reports.css"
	},
	"/js/dashboard.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f41-2Gyp4gbo482uPYRr8G2hjiWPBZ4\"",
		"mtime": "2026-08-21T11:48:21.780Z",
		"size": 3905,
		"path": "../public/js/dashboard.js"
	},
	"/css/search.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"5d-G20qcRrtmWzt+VwVrbHpL2cRr90\"",
		"mtime": "2026-08-21T11:48:21.679Z",
		"size": 93,
		"path": "../public/css/search.css"
	},
	"/assets/index-BfbWywC7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"549dd-08BIAOuvQh43MT4CWbtKuxxM734\"",
		"mtime": "2026-08-21T12:59:30.799Z",
		"size": 346589,
		"path": "../public/assets/index-BfbWywC7.js"
	},
	"/js/sales.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b6-Fc1FM1K2cT4s+fUSG+/89gLbb3M\"",
		"mtime": "2026-08-21T12:59:12.411Z",
		"size": 6070,
		"path": "../public/js/sales.js"
	},
	"/js/login.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2d-651FcXHhV/YSQETpQHWOBiO8L4s\"",
		"mtime": "2026-08-21T12:43:46.445Z",
		"size": 2605,
		"path": "../public/js/login.js"
	},
	"/js/reports.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"176e-JVUPFvtBQMznsz27Y/XWYy1Vnz4\"",
		"mtime": "2026-08-21T11:48:21.806Z",
		"size": 5998,
		"path": "../public/js/reports.js"
	},
	"/js/search.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1729-Ucv4Agmez44NHDNvmLzJNkUJKTY\"",
		"mtime": "2026-08-21T11:48:21.831Z",
		"size": 5929,
		"path": "../public/js/search.js"
	},
	"/js/settings.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b5-nwQzNryXCBymfCKGW3gZJtEK+4w\"",
		"mtime": "2026-08-21T12:43:46.443Z",
		"size": 2485,
		"path": "../public/js/settings.js"
	},
	"/sql/sales_analysis.sql": {
		"type": "application/sql",
		"etag": "\"a58-krkkO8f5QpPXo4ga0VwTaGlwMds\"",
		"mtime": "2026-08-21T11:08:04.051Z",
		"size": 2648,
		"path": "../public/sql/sales_analysis.sql"
	},
	"/java/com/sales/app/Login.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"3f2-YT09xwb3WJ+Oqb5l8on/Ouub9Tc\"",
		"mtime": "2026-08-21T11:02:17.239Z",
		"size": 1010,
		"path": "../public/java/com/sales/app/Login.java"
	},
	"/java/com/sales/dao/AdminDAO.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"746-ha3MM5dgMzwrwhJ6gBHOIGZsTEk\"",
		"mtime": "2026-08-21T11:02:03.829Z",
		"size": 1862,
		"path": "../public/java/com/sales/dao/AdminDAO.java"
	},
	"/java/com/sales/app/SalesManager.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"1b98-CjA/+zF7XOhz3GdSDdWRkY7mWx8\"",
		"mtime": "2026-08-21T11:02:32.662Z",
		"size": 7064,
		"path": "../public/java/com/sales/app/SalesManager.java"
	},
	"/java/com/sales/dao/FestivalConfig.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"550-ouK/PDxTdYhWyhOD8UOtvm7C8EY\"",
		"mtime": "2026-08-21T11:02:12.259Z",
		"size": 1360,
		"path": "../public/java/com/sales/dao/FestivalConfig.java"
	},
	"/java/com/sales/model/Admin.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"2c3-UTngNsfOugatquWfT4O6YawUNDc\"",
		"mtime": "2026-08-21T11:01:58.945Z",
		"size": 707,
		"path": "../public/java/com/sales/model/Admin.java"
	},
	"/java/com/sales/db/DBConnection.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"4bb-aD4Am+rcjWi8jbUjMlNYufxg/LM\"",
		"mtime": "2026-08-21T11:02:07.966Z",
		"size": 1211,
		"path": "../public/java/com/sales/db/DBConnection.java"
	},
	"/java/com/sales/dao/SalesDAO.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"22f7-HTmfu723i0AgTz/ityndofUPNtk\"",
		"mtime": "2026-08-21T11:02:27.754Z",
		"size": 8951,
		"path": "../public/java/com/sales/dao/SalesDAO.java"
	},
	"/java/com/sales/model/Sales.java": {
		"type": "text/x-java-source; charset=utf-8",
		"etag": "\"621-F/RcRsiAXF+AiYU8PlqTMPduBJg\"",
		"mtime": "2026-08-21T11:02:22.010Z",
		"size": 1569,
		"path": "../public/java/com/sales/model/Sales.java"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_zaIsfe = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_zaIsfe
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
