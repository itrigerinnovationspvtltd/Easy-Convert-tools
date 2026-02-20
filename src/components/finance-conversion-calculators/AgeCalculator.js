import React, { useState } from "react";

function AgeCalculator() {
  const [birth, setBirth] = useState("");
  const [atDate, setAtDate] = useState(new Date().toISOString().slice(0, 10));

  let result = null;
  if (birth) {
    const b = new Date(birth);
    const a = new Date(atDate);
    if (!isNaN(b.getTime())) {
      let years = a.getFullYear() - b.getFullYear();
      let months = a.getMonth() - b.getMonth();
      let days = a.getDate() - b.getDate();
      if (days < 0) {
        months--;
        days += new Date(a.getFullYear(), a.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      const totalDays = Math.floor((a - b) / (1000 * 60 * 60 * 24));
      result = { years, months, days, totalDays };
    }
  }

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Age Calculator</h1>
      <p className="tool-section-desc">Calculate your age or the age between two dates.</p>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="input-label">Birth date</label>
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="input-label">Age at date</label>
          <input type="date" value={atDate} onChange={(e) => setAtDate(e.target.value)} className="input-field" />
        </div>
        {result && (
          <div className="card-tool p-6 text-center">
            <div className="text-3xl font-bold text-gray-800">{result.years} years, {result.months} months, {result.days} days</div>
            <div className="text-gray-600 mt-2">or {result.totalDays.toLocaleString()} days total</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalculator;
