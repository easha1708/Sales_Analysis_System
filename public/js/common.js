/* =========================================================
   Sales Analysis System - common.js
   Shared helpers: session, demo data store, formatting,
   festival configuration, toasts, modal, CSV export.

   NOTE FOR VIVA:
   In the browser-only demo, sales are kept in localStorage.
   In the final Java version every function marked with
   "JAVA/JDBC" is replaced by a servlet call that runs the
   matching SQL statement through SalesDAO / AdminDAO.
   ========================================================= */

/* ---------- Session (demo) ---------- */
var USERS = [
  {
    username: "admin",
    password: "admin123",
    name: "System Administrator",
    email: "admin@salesanalysis.com",
  },
  {
    username: "user1",
    password: "user123",
    name: "Sales User 1",
    email: "user1@salesanalysis.com",
  },
  {
    username: "user2",
    password: "user123",
    name: "Sales User 2",
    email: "user2@salesanalysis.com",
  },
  {
    username: "user3",
    password: "user123",
    name: "Sales User 3",
    email: "user3@salesanalysis.com",
  },
  {
    username: "user4",
    password: "user123",
    name: "Sales User 4",
    email: "user4@salesanalysis.com",
  },
];
var DEMO_PASS = "admin123";

function getCurrentUsername() {
  return (
    sessionStorage.getItem("sas_current_user") ||
    localStorage.getItem("sas_current_user") ||
    "admin"
  );
}

function getUser(username) {
  for (var i = 0; i < USERS.length; i++) {
    if (USERS[i].username === username) {
      return USERS[i];
    }
  }
  return null;
}

function userKey(prefix) {
  return prefix + "_" + getCurrentUsername();
}

function isLoggedIn() {
  return (
    sessionStorage.getItem("sas_login") === "1" ||
    localStorage.getItem("sas_login") === "1"
  );
}

/* Every protected page calls this first. */
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

function logout() {
  sessionStorage.removeItem("sas_login");
  localStorage.removeItem("sas_login");
  sessionStorage.removeItem("sas_current_user");
  localStorage.removeItem("sas_current_user");
  window.location.href = "login.html";
}

/* ---------- Admin profile (Settings page) ---------- */
function getAdmin() {
  var raw = localStorage.getItem(userKey("sas_admin"));
  if (raw) {
    return JSON.parse(raw);
  }
  var user = getUser(getCurrentUsername()) || USERS[0];
  return { name: user.name, email: user.email, username: user.username };
}
function saveAdmin(a) {
  localStorage.setItem(userKey("sas_admin"), JSON.stringify(a));
}

/* ---------- Master data ---------- */
var PERSON_CATEGORIES = ["Boy", "Girl", "Man", "Woman", "Child", "Old Age"];
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* Festival configuration kept simple and maintainable:
   festival -> year -> [startDate, endDate] (sales window) */
var FESTIVALS = {
  Holi: {
    2025: ["2025-03-11", "2025-03-15"],
    2026: ["2026-03-01", "2026-03-05"],
  },
  Eid: {
    2025: ["2025-03-28", "2025-04-01"],
    2026: ["2026-03-18", "2026-03-22"],
  },
  Diwali: {
    2025: ["2025-10-17", "2025-10-23"],
    2026: ["2026-11-06", "2026-11-12"],
  },
  Christmas: {
    2025: ["2025-12-20", "2025-12-26"],
    2026: ["2026-12-20", "2026-12-26"],
  },
};

function festivalRange(name, year) {
  var f = FESTIVALS[name];
  if (!f || !f[year]) {
    return null;
  }
  return { from: f[year][0], to: f[year][1] };
}

/* ---------- Sales store (JAVA/JDBC: SalesDAO) ---------- */
function getSalesKey() {
  return userKey("sas_sales");
}

function getSales() {
  var key = getSalesKey();
  var raw = localStorage.getItem(key);
  if (!raw) {
    var seed = buildDemoSales();
    var legacy =
      getCurrentUsername() === "admin"
        ? localStorage.getItem("sas_sales")
        : null;
    if (legacy) {
      seed = JSON.parse(legacy);
    }
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

function setSales(list) {
  localStorage.setItem(getSalesKey(), JSON.stringify(list));
}

/* INSERT INTO sales(...) VALUES(?,?,?,?,?) */
function addSale(sale) {
  var list = getSales();
  var id = 1;
  for (var i = 0; i < list.length; i++) {
    if (list[i].id >= id) {
      id = list[i].id + 1;
    }
  }
  sale.id = id;
  list.push(sale);
  setSales(list);
  return sale;
}

/* UPDATE sales SET ... WHERE id=? */
function updateSale(id, data) {
  var list = getSales();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i] = {
        id: id,
        sale_date: data.sale_date,
        product: data.product,
        quantity: data.quantity,
        amount: data.amount,
        person_category: data.person_category,
      };
    }
  }
  setSales(list);
}

/* DELETE FROM sales WHERE id=? */
function deleteSale(id) {
  var list = getSales().filter(function (s) {
    return s.id !== id;
  });
  setSales(list);
}

function getSaleById(id) {
  var list = getSales();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
}

/* SELECT * FROM sales WHERE sale_date BETWEEN ? AND ? [AND product=?] */
function searchSales(from, to, product) {
  var p = (product || "").trim().toLowerCase();
  return getSales()
    .filter(function (s) {
      if (from && s.sale_date < from) {
        return false;
      }
      if (to && s.sale_date > to) {
        return false;
      }
      if (p && s.product.toLowerCase().indexOf(p) === -1) {
        return false;
      }
      return true;
    })
    .sort(function (a, b) {
      return a.sale_date < b.sale_date ? -1 : 1;
    });
}

function summarize(rows) {
  var qty = 0,
    amt = 0;
  for (var i = 0; i < rows.length; i++) {
    qty += Number(rows[i].quantity);
    amt += Number(rows[i].amount);
  }
  return {
    quantity: qty,
    amount: amt,
    transactions: rows.length,
    average: rows.length ? amt / rows.length : 0,
  };
}

function productList() {
  var seen = {},
    out = [];
  getSales().forEach(function (s) {
    if (!seen[s.product]) {
      seen[s.product] = true;
      out.push(s.product);
    }
  });
  return out.sort();
}

/* ---------- Formatting ---------- */
function money(n) {
  return (
    "\u20B9" +
    Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })
  );
}
function num(n) {
  return Number(n || 0).toLocaleString("en-IN");
}
function today() {
  return new Date().toISOString().slice(0, 10);
}
function dmy(iso) {
  if (!iso) {
    return "";
  }
  var p = iso.split("-");
  return p[2] + "-" + p[1] + "-" + p[0];
}
function monthStart(year, monthIndex) {
  return year + "-" + String(monthIndex + 1).padStart(2, "0") + "-01";
}
function monthEnd(year, monthIndex) {
  var d = new Date(Number(year), Number(monthIndex) + 1, 0);
  return d.toISOString().slice(0, 10);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c];
  });
}

/* ---------- Toast ---------- */
function toast(message, type) {
  var box = document.getElementById("toasts");
  if (!box) {
    box = document.createElement("div");
    box.id = "toasts";
    document.body.appendChild(box);
  }
  var t = document.createElement("div");
  t.className = "toast " + (type || "success");
  t.textContent = message;
  box.appendChild(t);
  setTimeout(function () {
    t.remove();
  }, 3200);
}

/* ---------- Confirm modal ---------- */
function confirmModal(title, text, onYes) {
  var bg = document.getElementById("confirmModal");
  if (!bg) {
    if (window.confirm(text)) {
      onYes();
    }
    return;
  }
  bg.querySelector(".m-title").textContent = title;
  bg.querySelector(".m-text").textContent = text;
  bg.classList.add("open");
  var yes = bg.querySelector(".m-yes");
  var no = bg.querySelector(".m-no");
  function close() {
    bg.classList.remove("open");
    yes.onclick = null;
    no.onclick = null;
  }
  yes.onclick = function () {
    close();
    onYes();
  };
  no.onclick = close;
}

/* ---------- CSV export ---------- */
function exportCSV(rows, filename) {
  if (!rows.length) {
    toast("Nothing to export.", "error");
    return;
  }
  var lines = ["Date,Product,Quantity,Person Category,Amount"];
  rows.forEach(function (r) {
    lines.push(
      [
        dmy(r.sale_date),
        '"' + r.product + '"',
        r.quantity,
        '"' + r.person_category + '"',
        r.amount,
      ].join(","),
    );
  });
  var blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename || "sales_report.csv";
  a.click();
  URL.revokeObjectURL(a.href);
  toast("CSV file exported.");
}

/* ---------- Shared page chrome ---------- */
function fillSelect(select, values, placeholder) {
  if (!select) {
    return;
  }
  var html = placeholder ? '<option value="">' + placeholder + "</option>" : "";
  values.forEach(function (v) {
    html +=
      '<option value="' + escapeHtml(v) + '">' + escapeHtml(v) + "</option>";
  });
  select.innerHTML = html;
}

function initChrome() {
  var a = getAdmin();
  document.querySelectorAll("[data-admin-name]").forEach(function (el) {
    el.textContent = a.name;
  });
  document.querySelectorAll("[data-admin-initial]").forEach(function (el) {
    el.textContent = a.name.charAt(0).toUpperCase();
  });
  document.querySelectorAll("[data-logout]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      confirmModal(
        "Confirm logout",
        "Do you want to end this admin session?",
        logout,
      );
    });
  });
}

/* ---------- Demo data (frontend testing only) ---------- */
function buildDemoSales() {
  var products = ["Shoes", "T-Shirt", "Jeans", "Watch", "Bag", "Jacket"];
  var dates = [
    "2026-01-08",
    "2026-01-19",
    "2026-02-04",
    "2026-02-14",
    "2026-02-27",
    "2026-03-03",
    "2026-03-04",
    "2026-03-19",
    "2026-03-21",
    "2026-03-30",
    "2026-04-11",
    "2026-05-06",
    "2026-06-17",
    "2026-07-09",
    "2026-08-15",
    "2026-09-05",
    "2026-10-12",
    "2026-11-07",
    "2026-11-09",
    "2026-12-22",
    "2026-12-24",
    /* a few records dated today so the dashboard cards are not empty */
    today(),
    today(),
    today(),
  ];
  var out = [],
    id = 1;
  for (var i = 0; i < dates.length; i++) {
    var p = products[i % products.length];
    var qty = 2 + ((i * 3) % 9);
    var rate = 480 + ((i * 137) % 1600);
    out.push({
      id: id++,
      sale_date: dates[i],
      product: p,
      quantity: qty,
      amount: qty * rate,
      person_category: PERSON_CATEGORIES[i % PERSON_CATEGORIES.length],
    });
  }
  return out;
}
