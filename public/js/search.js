/* search.js - Search & Analysis module.
   JAVA/JDBC (SalesDAO):
     Date range : SELECT * FROM sales WHERE sale_date BETWEEN ? AND ?
     + Product  : ... AND product = ?
     Month      : ... WHERE MONTH(sale_date)=? AND YEAR(sale_date)=?
     Quarter    : ... WHERE QUARTER(sale_date)=? AND YEAR(sale_date)=?
     Festival   : date window from the festival configuration table/map */

requireLogin();
initChrome();

var currentRows = [];
var activeTab = "range";

/* Populate dropdowns */
var products = productList();
["rangeProduct", "monthProduct", "quarterProduct", "festivalProduct"].forEach(
  function (id) {
    fillSelect(document.getElementById(id), products, "All Products");
  },
);
fillSelect(document.getElementById("monthSel"), MONTHS, "");

var years = [];
for (var y = 2024; y <= Number(today().slice(0, 4)) + 1; y++) {
  years.push(String(y));
}
["monthYear", "quarterYear", "festivalYear"].forEach(function (id) {
  fillSelect(document.getElementById(id), years, "");
  document.getElementById(id).value = today().slice(0, 4);
});
document.getElementById("monthSel").value =
  MONTHS[Number(today().slice(5, 7)) - 1];
document.getElementById("fromDate").value = today().slice(0, 4) + "-01-01";
document.getElementById("toDate").value = today();
updateFestivalHint();

/* Tabs */
document.querySelectorAll(".tab").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    activeTab = btn.getAttribute("data-tab");
    ["range", "month", "quarter", "festival"].forEach(function (k) {
      document.getElementById("panel-" + k).style.display =
        k === activeTab ? "block" : "none";
    });
  });
});

document
  .getElementById("festivalSel")
  .addEventListener("change", updateFestivalHint);
document
  .getElementById("festivalYear")
  .addEventListener("change", updateFestivalHint);

function updateFestivalHint() {
  var f = document.getElementById("festivalSel").value;
  var yr = document.getElementById("festivalYear").value;
  var r = festivalRange(f, yr);
  document.getElementById("festivalHint").textContent = r
    ? "Sales window for " +
      f +
      " " +
      yr +
      ": " +
      dmy(r.from) +
      " to " +
      dmy(r.to)
    : "No festival window configured for " + f + " " + yr + ".";
}

document.getElementById("searchBtn").addEventListener("click", runSearch);
document.getElementById("clearBtn").addEventListener("click", function () {
  currentRows = [];
  render([], "Select a filter and click SEARCH");
});
document.getElementById("csvBtn").addEventListener("click", function () {
  exportCSV(currentRows, "search_result.csv");
});

function runSearch() {
  var from, to, product, label;

  if (activeTab === "range") {
    from = document.getElementById("fromDate").value;
    to = document.getElementById("toDate").value;
    product = document.getElementById("rangeProduct").value;
    if (!from || !to) {
      toast("Please select both From Date and To Date.", "error");
      return;
    }
    if (from > to) {
      toast("From Date cannot be after To Date.", "error");
      return;
    }
    label = "Date range " + dmy(from) + " to " + dmy(to);
  } else if (activeTab === "month") {
    var mi = MONTHS.indexOf(document.getElementById("monthSel").value);
    var my = document.getElementById("monthYear").value;
    from = monthStart(my, mi);
    to = monthEnd(my, mi);
    product = document.getElementById("monthProduct").value;
    label = MONTHS[mi] + " " + my;
  } else if (activeTab === "quarter") {
    var qi = Number(document.getElementById("quarterSel").value);
    var qy = document.getElementById("quarterYear").value;
    from = monthStart(qy, qi * 3);
    to = monthEnd(qy, qi * 3 + 2);
    product = document.getElementById("quarterProduct").value;
    label = "Q" + (qi + 1) + " " + qy;
  } else {
    var f = document.getElementById("festivalSel").value;
    var fy = document.getElementById("festivalYear").value;
    var r = festivalRange(f, fy);
    if (!r) {
      toast("No festival window configured for " + f + " " + fy + ".", "error");
      return;
    }
    from = r.from;
    to = r.to;
    product = document.getElementById("festivalProduct").value;
    label = f + " " + fy + " (" + dmy(from) + " to " + dmy(to) + ")";
  }

  currentRows = searchSales(from, to, product);
  render(
    currentRows,
    label + (product ? " | Product: " + product : " | All products"),
  );
}

function render(rows, info) {
  var s = summarize(rows);
  document.getElementById("sumQty").textContent = num(s.quantity);
  document.getElementById("sumAmt").textContent = money(s.amount);
  document.getElementById("sumTxn").textContent = num(s.transactions);
  document.getElementById("sumAvg").textContent = money(s.average);
  document.getElementById("resultInfo").textContent = info;

  var body = document.getElementById("resultBody");
  var foot = document.getElementById("resultFoot");

  if (!rows.length) {
    body.innerHTML =
      '<tr><td colspan="5" class="empty">No sales records found.</td></tr>';
    foot.innerHTML = "";
    return;
  }

  body.innerHTML = rows
    .map(function (r) {
      return (
        "<tr><td>" +
        dmy(r.sale_date) +
        "</td><td>" +
        escapeHtml(r.product) +
        '</td><td class="num">' +
        num(r.quantity) +
        "</td><td>" +
        escapeHtml(r.person_category) +
        '</td><td class="num">' +
        money(r.amount) +
        "</td></tr>"
      );
    })
    .join("");

  foot.innerHTML =
    '<tr><td colspan="2">Total (' +
    s.transactions +
    " transactions)</td>" +
    '<td class="num">' +
    num(s.quantity) +
    "</td>" +
    "<td>Avg " +
    money(s.average) +
    "</td>" +
    '<td class="num">' +
    money(s.amount) +
    "</td></tr>";
}

render([], "Select a filter and click SEARCH");
