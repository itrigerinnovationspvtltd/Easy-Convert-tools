import React, { useState } from "react";
import { CURRENCY_OPTIONS, getDefaultCurrency } from "../../utils/currencyOptions";
import { formatNumber } from "../../utils/locale";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [termType, setTermType] = useState("months");
  const [term, setTerm] = useState("36");
  const [currency, setCurrency] = useState(() => getDefaultCurrency());

  const curr = CURRENCY_OPTIONS.find((c) => c.code === currency) || CURRENCY_OPTIONS[0];
  const symbol = curr.symbol;

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const months = termType === "months" ? (parseInt(term, 10) || 0) : (parseInt(term, 10) || 0) * 12;

  let monthly = 0;
  let total = 0;
  let totalInterest = 0;
  if (p > 0 && months > 0) {
    if (r === 0) {
      monthly = p / months;
    } else {
      monthly = p * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    }
    total = monthly * months;
    totalInterest = total - p;
  }

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Loan Calculator</h1>
      <p className="tool-section-desc">
        Calculate monthly payments and total interest. Works with any currency.
      </p>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="input-field">
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Principal ({symbol})</label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="10000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual interest rate (%)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="5.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
            <select value={termType} onChange={(e) => setTermType(e.target.value)} className="input-field">
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {termType === "months" ? "Months" : "Years"}
            </label>
            <input
              type="number"
              min="1"
              placeholder={termType === "months" ? "36" : "3"}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
        {(monthly > 0 || total > 0) && (
          <div className="bg-white rounded-xl border p-6 space-y-3 card-tool">
            <div className="text-lg">Monthly payment: <span className="font-bold text-green-600">{symbol}{formatNumber(monthly, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            <div className="text-sm text-gray-600">Total payment: {symbol}{formatNumber(total, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="text-sm text-gray-600">Total interest: {symbol}{formatNumber(totalInterest, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
