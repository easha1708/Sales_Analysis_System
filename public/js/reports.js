/* reports.js - reports module (all totals computed in plain JavaScript).
   JAVA/JDBC: same figures come from GROUP BY queries in SalesDAO, e.g.
     SELECT product, SUM(quantity), SUM(amount) FROM sales GROUP BY product ORDER BY SUM(amount) DESC;
     SELECT person_category, SUM(quantity), SUM(amount) FROM sales GROUP BY person_category; */

requireLogin();
initChrome();

var yearSel = document.getElementById("reportYear");
var prodSel = document.getElementById("reportProduct");

var years = [];
for (var y = 2024; y <= Number(today().slice(0, 4)) + 1; y++) {
  years.push(String(y));
}
fillSelect(yearSel, years, "");
yearSel.value = today().slice(0, 4);
fillSelect(prodSel, productList(), "All Products");

yearSel.addEventListener("change", build);
prodSel.addEventListener("change", build);
document.getElementById("csvBtn").addEventListener("click", function () {
  exportCSV(yearRows(), "report_" + yearSel.value + ".csv");
});

function yearRows() {
  return searchSales(
    yearSel.value + "-01-01",
    yearSel.value + "-12-31",
    prodSel.value,
  );
}

function bars(items, alt) {
  if (!items.length) {
    return '<p class="empty">No sales records found.</p>';
  }
  var max = Math.max.apply(
    null,
    items
      .map(function (i) {
        return i.amount;
      })
      .concat([1]),
  );
  return items
    .map(function (i) {
      var pct = Math.round((i.amount / max) * 100);
      return (
        '<div class="bar-row"><div>' +
        escapeHtml(i.name) +
        " <small>(" +
        num(i.quantity) +
        ")</small></div>" +
        '<div class="bar"><span class="' +
        (alt ? "alt" : "") +
        '" style="width:' +
        pct +
        '%"></span></div>' +
        '<div class="bar-val">' +
        money(i.amount) +
        "</div></div>"
      );
    })
    .join("");
}

function groupBy(rows, key) {
  var map = {};
  rows.forEach(function (r) {
    var k = r[key];
    if (!map[k]) {
      map[k] = { name: k, quantity: 0, amount: 0, transactions: 0 };
    }
    map[k].quantity += Number(r.quantity);
    map[k].amount += Number(r.amount);
    map[k].transactions += 1;
  });
  return Object.keys(map)
    .map(function (k) {
      return map[k];
    })
    .sort(function (a, b) {
      return b.amount - a.amount;
    });
}

function build() {
  var yr = yearSel.value;
  var product = prodSel.value;
  var rows = yearRows();

  /* Summary cards */
  document.getElementById("repDaily").textContent = money(
    summarize(searchSales(today(), today(), product)).amount,
  );
  var mi = Number(today().slice(5, 7)) - 1;
  document.getElementById("repMonthly").textContent = money(
    summarize(searchSales(monthStart(yr, mi), monthEnd(yr, mi), product))
      .amount,
  );
  var ys = summarize(rows);
  document.getElementById("repYearly").textContent = money(ys.amount);
  document.getElementById("repTxn").textContent = num(ys.transactions);

  /* Monthly summary */
  document.getElementById("monthlyBody").innerHTML = MONTHS.map(
    function (m, i) {
      var s = summarize(
        searchSales(monthStart(yr, i), monthEnd(yr, i), product),
      );
      return (
        "<tr><td>" +
        m +
        '</td><td class="num">' +
        num(s.quantity) +
        '</td><td class="num">' +
        num(s.transactions) +
        '</td><td class="num">' +
        money(s.amount) +
        "</td></tr>"
      );
    },
  ).join("");

  /* Quarterly summary */
  var qs = [
    ["Q1", "January - March"],
    ["Q2", "April - June"],
    ["Q3", "July - September"],
    ["Q4", "October - December"],
  ];
  document.getElementById("quarterlyBody").innerHTML = qs
    .map(function (q, i) {
      var s = summarize(
        searchSales(monthStart(yr, i * 3), monthEnd(yr, i * 3 + 2), product),
      );
      return (
        '<tr><td><span class="tag">' +
        q[0] +
        "</span> " +
        q[1] +
        '</td><td class="num">' +
        num(s.quantity) +
        '</td><td class="num">' +
        num(s.transactions) +
        '</td><td class="num">' +
        money(s.amount) +
        "</td></tr>"
      );
    })
    .join("");

  /* Festival sales */
  document.getElementById("festivalBody").innerHTML = Object.keys(FESTIVALS)
    .map(function (f) {
      var r = festivalRange(f, yr);
      if (!r) {
        return (
          "<tr><td>" +
          f +
          '</td><td colspan="4" class="empty">Not configured for ' +
          yr +
          "</td></tr>"
        );
      }
      var s = summarize(searchSales(r.from, r.to, product));
      return (
        "<tr><td>" +
        f +
        "</td><td>" +
        dmy(r.from) +
        " to " +
        dmy(r.to) +
        '</td><td class="num">' +
        num(s.quantity) +
        '</td><td class="num">' +
        num(s.transactions) +
        '</td><td class="num">' +
        money(s.amount) +
        "</td></tr>"
      );
    })
    .join("");

  /* Product performance */
  var byProduct = groupBy(rows, "product");
  document.getElementById("productBars").innerHTML = bars(byProduct, false);
  document.getElementById("productBody").innerHTML = byProduct.length
    ? byProduct
        .map(function (p) {
          return (
            "<tr><td>" +
            escapeHtml(p.name) +
            '</td><td class="num">' +
            num(p.quantity) +
            '</td><td class="num">' +
            money(p.amount) +
            "</td></tr>"
          );
        })
        .join("")
    : '<tr><td colspan="3" class="empty">No sales records found.</td></tr>';

  /* Person category performance - always list all six categories */
  var byCat = groupBy(rows, "person_category");
  var catItems = PERSON_CATEGORIES.map(function (c) {
    var found = byCat.filter(function (b) {
      return b.name === c;
    })[0];
    return found || { name: c, quantity: 0, amount: 0, transactions: 0 };
  }).sort(function (a, b) {
    return b.amount - a.amount;
  });
  document.getElementById("categoryBars").innerHTML = bars(catItems, true);
}

build();
