import React, { useState } from "react";

function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");

  const calc = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return null;
    let bmi;
    if (unit === "metric") {
      bmi = w / (h / 100) ** 2;
    } else {
      bmi = (w / (h * h)) * 703;
    }
    return bmi.toFixed(1);
  };

  const bmi = calc();
  let category = "";
  if (bmi) {
    const n = parseFloat(bmi);
    if (n < 18.5) category = "Underweight";
    else if (n < 25) category = "Normal";
    else if (n < 30) category = "Overweight";
    else category = "Obese";
  }

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">BMI Calculator</h1>
      <p className="tool-section-desc">Calculate your Body Mass Index.</p>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="input-label">Unit system</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="input-field">
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, in)</option>
          </select>
        </div>
        <div>
          <label className="input-label">{unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}</label>
          <input type="number" placeholder="0" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-field" step="any" />
        </div>
        <div>
          <label className="input-label">{unit === "metric" ? "Height (cm)" : "Height (inches)"}</label>
          <input type="number" placeholder="0" value={height} onChange={(e) => setHeight(e.target.value)} className="input-field" step="any" />
        </div>
        {bmi && (
          <div className="card-tool p-6 text-center">
            <div className="text-4xl font-bold text-gray-800">{bmi}</div>
            <div className="text-lg text-gray-600 mt-2">{category}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BmiCalculator;
