import { getState, setState } from "../stateManager.js";
import { calcMonthlyPayment, buildAmortization } from "../debtUtils.js";

const CONTAINER_ID = "debtOverviewContainer";

export function init() {
  if (!document.getElementById(CONTAINER_ID)) return;

  // 1) Load saved debts (or start empty)
  const { debts = [] } = getState("debtOverview");
  renderDebtTable(debts);

  // 2) Hook form for add/edit
  const form = document.getElementById("debtForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const debt = readForm(form);

    // auto‑calc payment & payoff date if missing
    if (!debt.pmt) {
      debt.pmt = calcMonthlyPayment(debt.amount, debt.annualRate, debt.termMonths);
    }
    debt.payoffDate = calcPayoffDate(debt.startDate, debt.termMonths);

    // 3) add / replace in array
    const idx = debts.findIndex(d => d.id === debt.id);
    if (idx > -1) debts[idx] = debt;
    else debts.push(debt);

    // 4) persist + rerender
    setState("debtOverview", { debts });
    renderDebtTable(debts);
    form.reset();
  });
}

function readForm(form) {
  const fd = new FormData(form);
  return {
    id: fd.get("debtId") || crypto.randomUUID(),
    name: fd.get("name"),
    type: fd.get("type"),
    annualRate: parseFloat(fd.get("rate")) / 100,
    amount: parseFloat(fd.get("amount")),
    pmt: fd.get("pmt") ? parseFloat(fd.get("pmt")) : null,
    termMonths: parseInt(fd.get("termMonths"), 10),
    startDate: fd.get("startDate"),
  };
}

function calcPayoffDate(startDate, termMonths) {
  const d = new Date(startDate);
  d.setMonth(d.getMonth() + termMonths);
  return d.toISOString().slice(0,10); // YYYY‑MM‑DD
}

function renderDebtTable(debts) {
  const root = document.getElementById("debtTableBody");
  root.innerHTML = "";

  debts.forEach(debt => {
    const { totals, yearly } =
      buildAmortization(debt.amount, debt.annualRate, debt.termMonths, debt.pmt);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${debt.name}</td>
      <td>${debt.type}</td>
      <td>${(debt.annualRate*100).toFixed(2)}%</td>
      <td>${debt.pmt.toFixed(2)}</td>
      <td>${debt.startDate}</td>
      <td>${debt.payoffDate}</td>
      <td>${totals.totalPrincipal.toFixed(2)}</td>
      <td>${totals.totalInterest.toFixed(2)}</td>
      <td>${totals.totalPaid.toFixed(2)}</td>
      <td>
        <button class="edit" data-id="${debt.id}">✎</button>
        <button class="delete" data-id="${debt.id}">🗑</button>
      </td>
    `;
    root.append(tr);
  });

  // edit / delete handlers
  document.querySelectorAll(".edit").forEach(btn =>
    btn.addEventListener("click", e => prefillForm(e.target.dataset.id, debts))
  );
  document.querySelectorAll(".delete").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      const filtered = debts.filter(d=>d.id!==id);
      setState("debtOverview", { debts: filtered });
      renderDebtTable(filtered);
    })
  );
}

function prefillForm(id, debts) {
  const debt = debts.find(d=>d.id===id);
  const form = document.getElementById("debtForm");
  form.elements.debtId.value      = debt.id;
  form.elements.name.value        = debt.name;
  form.elements.type.value        = debt.type;
  form.elements.rate.value        = debt.annualRate * 100;
  form.elements.amount.value      = debt.amount;
  form.elements.pmt.value         = debt.pmt;
  form.elements.termMonths.value  = debt.termMonths;
  form.elements.startDate.value   = debt.startDate;
}