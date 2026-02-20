import React, { useState } from "react";

const UNITS = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 },
  weight: { kg: 1, g: 1000, lb: 2.20462, oz: 35.274 },
  temperature: { celsius: "c", fahrenheit: "f", kelvin: "k" },
};

function convertLength(val, from, to) {
  const v = val / UNITS.length[from];
  return v * UNITS.length[to];
}

function convertWeight(val, from, to) {
  const v = val / UNITS.weight[from];
  return v * UNITS.weight[to];
}

function convertTemp(val, from, to) {
  let c;
  if (from === "celsius") c = val;
  else if (from === "fahrenheit") c = (val - 32) * (5 / 9);
  else c = val - 273.15;
  if (to === "celsius") return c;
  if (to === "fahrenheit") return c * (9 / 5) + 32;
  return c + 273.15;
}

function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [input, setInput] = useState("");

  const val = parseFloat(input);
  let result = "";
  if (!isNaN(val)) {
    if (category === "length") result = convertLength(val, from, to).toFixed(6);
    else if (category === "weight") result = convertWeight(val, from, to).toFixed(6);
    else if (category === "temperature") result = convertTemp(val, from, to).toFixed(2);
  }

  const opts = Object.keys(UNITS[category]);

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Unit Converter</h1>
      <p className="tool-section-desc">Convert length, weight, and temperature.</p>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="input-label">Category</label>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setFrom(Object.keys(UNITS[e.target.value])[0]); setTo(Object.keys(UNITS[e.target.value])[1]); }} className="input-field capitalize">
            {Object.keys(UNITS).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} placeholder="From" className="input-field" step="any" />
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field capitalize">
              {opts.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="text-gray-400 pb-2">→</div>
          <div className="flex-1 space-y-2">
            <input readOnly value={result} className="input-field bg-gray-50" />
            <select value={to} onChange={(e) => setTo(e.target.value)} className="input-field capitalize">
              {opts.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitConverter;
