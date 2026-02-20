import React, { useState } from "react";
import { CURRENCY_OPTIONS, getDefaultCurrency } from "../../utils/currencyOptions";
import { formatNumber } from "../../utils/locale";

const TipAndSplitBill = () => {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("15");
  const [people, setPeople] = useState("1");
  const [currency, setCurrency] = useState(() => getDefaultCurrency());

  const curr = CURRENCY_OPTIONS.find((c) => c.code === currency) || CURRENCY_OPTIONS[0];
  const symbol = curr.symbol;

  const b = parseFloat(bill) || 0;
  const tip = parseFloat(tipPct) || 0;
  const p = parseInt(people, 10) || 1;

  const tipAmount = b * (tip / 100);
  const total = b + tipAmount;
  const perPerson = p > 0 ? total / p : 0;

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Tip & Split Bill</h1>
      <p className="tool-section-desc">
        Calculate tip and split the bill among people. Supports any currency.
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Bill amount ({symbol})</label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="50.00"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tip (%)</label>
          <select value={tipPct} onChange={(e) => setTipPct(e.target.value)} className="input-field">
            <option value="10">10%</option>
            <option value="12">12%</option>
            <option value="15">15%</option>
            <option value="18">18%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Split among (people)</label>
          <input
            type="number"
            min="1"
            placeholder="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="input-field"
          />
        </div>
        {b > 0 && (
          <div className="bg-white rounded-xl border p-6 space-y-3 card-tool">
            <div>Tip amount: <span className="font-bold">{symbol}{formatNumber(tipAmount, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            <div>Total: <span className="font-bold text-green-600">{symbol}{formatNumber(total, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            {p > 1 && <div>Per person: <span className="font-bold">{symbol}{formatNumber(perPerson, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TipAndSplitBill;
