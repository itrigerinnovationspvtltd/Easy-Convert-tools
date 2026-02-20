import React, { useState } from "react";
import { CURRENCY_OPTIONS, getDefaultCurrency } from "../../utils/currencyOptions";
import { formatNumber } from "../../utils/locale";

const VatGstCalculator = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("20");
  const [mode, setMode] = useState("add");
  const [currency, setCurrency] = useState(() => getDefaultCurrency());

  const curr = CURRENCY_OPTIONS.find((c) => c.code === currency) || CURRENCY_OPTIONS[0];
  const symbol = curr.symbol;

  const a = parseFloat(amount) || 0;
  const r = parseFloat(rate) || 0;

  let vatAmount = 0;
  let netAmount = 0;
  let grossAmount = 0;

  if (a > 0 && r >= 0) {
    if (mode === "add") {
      vatAmount = a * (r / 100);
      grossAmount = a + vatAmount;
      netAmount = a;
    } else {
      grossAmount = a;
      netAmount = a / (1 + r / 100);
      vatAmount = grossAmount - netAmount;
    }
  }

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">VAT / GST Calculator</h1>
      <p className="tool-section-desc">
        Add or extract VAT/GST from amounts. Works worldwide with any currency.
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="input-field">
            <option value="add">Add VAT to net amount</option>
            <option value="extract">Extract VAT from gross amount</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {mode === "add" ? `Net amount (${symbol})` : `Gross amount (${symbol})`}
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="100.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">VAT / GST rate (%)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="20"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="input-field"
          />
        </div>
        {a > 0 && (
          <div className="bg-white rounded-xl border p-6 space-y-3 card-tool">
            <div>VAT amount: <span className="font-bold">{symbol}{formatNumber(vatAmount, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            <div>Net amount: <span className="font-bold">{symbol}{formatNumber(netAmount, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            <div>Gross amount: <span className="font-bold text-green-600">{symbol}{formatNumber(grossAmount, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VatGstCalculator;
