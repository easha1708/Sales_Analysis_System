import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sales Analysis System | Admin Login" },
      {
        name: "description",
        content:
          "Sales Analysis System - track sales, analyze performance by date, month, quarter and festival, and generate reports.",
      },
      { property: "og:title", content: "Sales Analysis System" },
      {
        property: "og:description",
        content:
          "Track Sales, Analyze Performance and Generate Reports. Built with HTML, CSS, JavaScript, Java, JDBC and MySQL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/**
 * The application itself is a plain HTML/CSS/JavaScript project served from
 * /public (login.html, dashboard.html, sales-entry.html, search.html,
 * reports.html, settings.html). This route simply opens the login page.
 */
function Index() {
  useEffect(() => {
    window.location.replace("/login.html");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Sales Analysis System
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track Sales &bull; Analyze Performance &bull; Generate Reports
        </p>
        <p className="mt-6 text-sm">
          <a className="text-primary underline" href="/login.html">
            Open the admin login page
          </a>
        </p>
      </div>
    </main>
  );
}
