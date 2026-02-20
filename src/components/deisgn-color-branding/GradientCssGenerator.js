import React, { useState } from "react";

const directions = [
  { label: "To Right", value: "to right" },
  { label: "To Bottom", value: "to bottom" },
  { label: "To Bottom Right", value: "to bottom right" },
  { label: "135deg", value: "135deg" },
  { label: "To Left", value: "to left" },
  { label: "To Top", value: "to top" },
];

const GradientCssGenerator = () => {
  const [direction, setDirection] = useState("to right");
  const [colors, setColors] = useState(["#3b82f6", "#ec4899"]);
  const [stops, setStops] = useState(["0%", "100%"]);

  const addColor = () => {
    setColors([...colors, "#10b981"]);
    setStops([...stops, `${Math.round((stops.length / (stops.length + 1)) * 100)}%`]);
  };

  const removeColor = (i) => {
    if (colors.length <= 2) return;
    setColors(colors.filter((_, j) => j !== i));
    setStops(stops.filter((_, j) => j !== i));
  };

  const updateColor = (i, v) => {
    const c = [...colors];
    c[i] = v;
    setColors(c);
  };

  const updateStop = (i, v) => {
    const s = [...stops];
    s[i] = v;
    setStops(s);
  };

  const gradientValue = `linear-gradient(${direction}, ${colors.map((c, i) => `${c} ${stops[i]}`).join(", ")})`;
  const cssString = `background: ${gradientValue};`;

  const copy = () => {
    navigator.clipboard.writeText(cssString);
    alert("Copied to clipboard!");
  };

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Gradient CSS Generator</h1>
      <p className="tool-section-desc">Create CSS gradients and copy the code.</p>
      <div className="w-full max-w-lg space-y-6">
        <div>
          <label className="input-label">Direction</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)} className="input-field">
            {directions.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Colors</label>
            <button onClick={addColor} className="btn-copy">+ Add color</button>
          </div>
          <div className="space-y-2">
            {colors.map((c, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="color" value={c} onChange={(e) => updateColor(i, e.target.value)} className="w-10 h-10 cursor-pointer rounded border" />
                <input type="text" value={c} onChange={(e) => updateColor(i, e.target.value)} className="input-field flex-1 w-24 text-sm font-mono" />
                <input type="text" value={stops[i]} onChange={(e) => updateStop(i, e.target.value)} placeholder="0%" className="input-field w-16 text-sm" />
                {colors.length > 2 && (
                  <button onClick={() => removeColor(i)} className="text-red-500 hover:text-red-700 text-sm">×</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="h-24 rounded-xl border-2" style={{ background: gradientValue }} />

        <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code>{cssString}</code>
        </div>
        <button onClick={copy} className="btn-gradient px-6 py-2.5 rounded-xl w-full">
          Copy CSS
        </button>
      </div>
    </div>
  );
};

export default GradientCssGenerator;
