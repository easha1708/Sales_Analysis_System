import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DFBsncvY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* The application itself is a plain HTML/CSS/JavaScript project served from
* /public (login.html, dashboard.html, sales-entry.html, search.html,
* reports.html, settings.html). This route simply opens the login page.
*/
function Index() {
	(0, import_react.useEffect)(() => {
		window.location.replace("/login.html");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold text-foreground",
					children: "Sales Analysis System"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Track Sales • Analyze Performance • Generate Reports"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-primary underline",
						href: "/login.html",
						children: "Open the admin login page"
					})
				})
			]
		})
	});
}
//#endregion
export { Index as component };
