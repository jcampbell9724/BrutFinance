/**
 * Calculate monthly payment if not provided.
 * Uses the amortization formula:
 *   PMT = r * PV / (1 − (1+r)^−n)
 *
 * @param {number} principal  – loan amount
 * @param {number} annualRate – e.g. 0.05 for 5%
 * @param {number} nMonths    – total term in months
 */
export function calcMonthlyPayment(principal, annualRate, nMonths) {
  if (nMonths === 0 || annualRate === 0) {
    return principal / nMonths || 0;
  }
  const r = annualRate / 12;
  return (r * principal) / (1 - Math.pow(1 + r, -nMonths));
}

/**
 * Build an amortization schedule and summary stats.
 *
 * Returns:
 *   {
 *     schedule: [ { month, balance, principalPaid, interestPaid }… ],
 *     totals: { totalPaid, totalInterest, totalPrincipal },
 *     yearly: [ { year, principal, interest, total }… ]
 *   }
 */
export function buildAmortization(principal, annualRate, nMonths, pmt) {
  const schedule = [];
  let balance = principal;
  let totalInterest = 0;
  let totalPrincipal = 0;

  for (let i = 1; i <= nMonths; i++) {
    const interestPaid = balance * (annualRate / 12);
    const principalPaid = pmt - interestPaid;
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interestPaid;
    totalPrincipal += principalPaid;

    schedule.push({
      month: i,
      balance,
      principalPaid,
      interestPaid,
    });
  }

  // Aggregate yearly
  const yearly = [];
  for (let year = 1; year <= Math.ceil(nMonths / 12); year++) {
    const start = (year - 1) * 12;
    const slice = schedule.slice(start, start + 12);
    const yearPrincipal = slice.reduce((s, m) => s + m.principalPaid, 0);
    const yearInterest = slice.reduce((s, m) => s + m.interestPaid, 0);
    yearly.push({
      year,
      principal: yearPrincipal,
      interest: yearInterest,
      total: yearPrincipal + yearInterest,
    });
  }

  return {
    schedule,
    totals: {
      totalPrincipal,
      totalInterest,
      totalPaid: totalPrincipal + totalInterest,
    },
    yearly,
  };
}
