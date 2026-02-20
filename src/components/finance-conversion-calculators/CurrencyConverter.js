import React, { useState, useEffect } from "react";
import { formatCurrencyAmount } from "../../utils/locale";

// Extended global currency list for production
const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CNY", "INR", "AUD", "CAD", "CHF", "MXN",
  "BRL", "ZAR", "KRW", "SGD", "HKD", "THB", "PLN", "SEK", "NOK", "AED",
  "SAR", "TRY", "RUB", "IDR", "NGN", "EGP", "COP", "TWD", "CLP", "ARS",
];
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

// Suggest default from/to based on user locale
const getDefaults = () => {
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";
  const region = locale.split("-")[0];
  const map = {
    "en-US": { from: "USD", to: "EUR" },
    "en-GB": { from: "GBP", to: "EUR" },
    "en-AU": { from: "AUD", to: "USD" },
    "en-IN": { from: "INR", to: "USD" },
    "de": { from: "EUR", to: "USD" },
    "fr": { from: "EUR", to: "GBP" },
    "es": { from: "EUR", to: "USD" },
    "pt": { from: "BRL", to: "USD" },
    "ja": { from: "JPY", to: "USD" },
    "zh": { from: "CNY", to: "USD" },
    "ko": { from: "KRW", to: "USD" },
    "hi": { from: "INR", to: "USD" },
    "ar": { from: "AED", to: "USD" },
    "ru": { from: "RUB", to: "USD" },
    "tr": { from: "TRY", to: "EUR" },
  };
  return map[locale] || map[region] || { from: "USD", to: "EUR" };
};

const CurrencyConverter = () => {
  const defaults = getDefaults();
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates || {});
        setError("");
      })
      .catch(() => setError("Could not fetch rates. Please check your connection and try again."))
      .finally(() => setLoading(false));
  }, []);

  const val = parseFloat(amount) || 0;
  let result = "";
  if (rates && !loading) {
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 1;
    result = ((val / fromRate) * toRate).toFixed(2);
  }

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Currency Converter</h1>
      <p className="tool-section-desc">
        Convert currencies with live exchange rates. Supports 30+ major world currencies.
      </p>
      <div className="w-full max-w-md space-y-4">
        {loading && <p className="text-gray-500">Loading rates...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {rates && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field">
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <select value={to} onChange={(e) => setTo(e.target.value)} className="input-field">
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            {result && (
              <div className="bg-white rounded-xl border p-6 text-center card-tool">
                <div className="text-2xl font-bold text-green-600">{formatCurrencyAmount(parseFloat(result))} {to}</div>
                <div className="text-sm text-gray-500 mt-1">≈ {formatCurrencyAmount(val)} {from}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
