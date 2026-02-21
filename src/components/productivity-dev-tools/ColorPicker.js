import React, { useState, useRef, useCallback } from "react";
import { FiCopy } from "react-icons/fi";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s: s * 100, v: v * 100 };
}

function hsvToRgb(h, s, v) {
  h /= 360; s /= 100; v /= 100;
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q;
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = Math.round(((1 - r - k) / (1 - k)) * 100);
  const m = Math.round(((1 - g - k) / (1 - k)) * 100);
  const y = Math.round(((1 - b - k) / (1 - k)) * 100);
  return { c, m, y, k: Math.round(k * 100) };
}

function rgbToXyz(r, g, b) {
  let rr = r / 255, gg = g / 255, bb = b / 255;
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;
  const x = rr * 0.4124 + gg * 0.3576 + bb * 0.1805;
  const y = rr * 0.2126 + gg * 0.7152 + bb * 0.0722;
  const z = rr * 0.0193 + gg * 0.1192 + bb * 0.9505;
  return { x: Math.round(x * 100), y: Math.round(y * 100), z: Math.round(z * 100) };
}

function rgbToLab(r, g, b) {
  let rr = r / 255, gg = g / 255, bb = b / 255;
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;
  let x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) / 0.95047;
  let y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) / 1.0;
  let z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) / 1.08883;
  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  const L = (116 * y) - 16;
  const a = 500 * (x - y);
  const b_ = 200 * (y - z);
  return { L: Math.round(L), a: Math.round(a), b: Math.round(b_) };
}

function rgbToHwb(r, g, b) {
  const hsl = rgbToHsl(r, g, b);
  const w = ((255 - Math.max(r, g, b)) / 255) * 100;
  const bl = (Math.min(r, g, b) / 255) * 100;
  return { h: hsl.h, w: Math.round(w), b: Math.round(bl) };
}

const COLOR_NAMES = [
  { hex: "#2596be", name: "Fjord Signal" },
  { hex: "#3b82f6", name: "Blue" },
  { hex: "#ef4444", name: "Red" },
  { hex: "#22c55e", name: "Green" },
  { hex: "#eab308", name: "Yellow" },
  { hex: "#a855f7", name: "Purple" },
  { hex: "#ec4899", name: "Pink" },
  { hex: "#000000", name: "Black" },
  { hex: "#ffffff", name: "White" },
  { hex: "#64748b", name: "Slate" },
  { hex: "#06b6d4", name: "Cyan" },
  { hex: "#f97316", name: "Orange" },
];

function getColorName(hex) {
  const target = hexToRgb(hex);
  if (!target) return "";
  let minDist = Infinity;
  let name = "";
  for (const { hex: h, name: n } of COLOR_NAMES) {
    const c = hexToRgb(h);
    const d = Math.sqrt(
      Math.pow(target.r - c.r, 2) + Math.pow(target.g - c.g, 2) + Math.pow(target.b - c.b, 2)
    );
    if (d < minDist) {
      minDist = d;
      name = n;
    }
  }
  return minDist < 80 ? name : "";
}

function ColorPicker() {
  const [hex, setHex] = useState("#2596be");
  const squareRef = useRef(null);
  const hueRef = useRef(null);

  const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const xyz = rgbToXyz(rgb.r, rgb.g, rgb.b);
  const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
  const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
  const colorName = getColorName(hex);

  const updateFromHsv = useCallback((h, s, v) => {
    const { r, g, b } = hsvToRgb(h, s, v);
    setHex(rgbToHex(r, g, b));
  }, []);

  const handleSquareClick = (e) => {
    const rect = squareRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const s = x * 100;
    const v = (1 - y) * 100;
    updateFromHsv(hsv.h, s, v);
  };

  const handleHueClick = (e) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const h = x * 360;
    updateFromHsv(h, hsv.s, hsv.v);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatHex = hex.toUpperCase();
  const formatHsl = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
  const formatRgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const formatCmyk = `${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%`;
  const formatXyz = `${xyz.x}, ${xyz.y}, ${xyz.z}`;
  const formatLab = `${lab.L}, ${lab.a}, ${lab.b}`;
  const formatHwb = `${hwb.h}, ${hwb.w}%, ${hwb.b}%`;

  const conversions = [
    { label: "HEX", value: formatHex },
    { label: "HSL", value: formatHsl },
    { label: "RGB", value: formatRgb },
    { label: "XYZ", value: formatXyz },
    { label: "CMYK", value: formatCmyk },
    { label: "LAB", value: formatLab },
    { label: "HWB", value: formatHwb },
  ];

  const handleHexChange = (e) => {
    let v = e.target.value;
    if (!v.startsWith("#") && v.length > 0) v = "#" + v;
    if (v.length <= 7) setHex(v);
    if (/^#([a-f\d]{6})$/i.test(v)) setHex(v);
  };

  const handleHexBlur = () => {
    if (!/^#([a-f\d]{6})$/i.test(hex)) setHex("#2596be");
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Color Picker</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Pick a color and see conversions in HEX, RGB, HSL, CMYK, LAB, and more.
      </p>
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Color picker */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Color Picker</h2>
          <div
            ref={squareRef}
            onClick={handleSquareClick}
            className="relative w-full aspect-square max-w-[280px] rounded-xl cursor-crosshair border border-gray-200 shadow-md overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h}, 100%, 50%))`,
              }}
            />
            <div
              className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none"
              style={{
                left: `${hsv.s}%`,
                top: `${100 - hsv.v}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: hex,
                boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <div
            ref={hueRef}
            onClick={handleHueClick}
            className="relative w-full h-4 rounded-full cursor-pointer overflow-visible border border-gray-200 max-w-[280px]"
            style={{
              background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
            }}
          >
            <div
              className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none"
              style={{
                left: `${(hsv.h / 360) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              HEX
              <button onClick={() => copyToClipboard(formatHex)} className="text-gray-400 hover:text-purple-600">
                <FiCopy className="w-4 h-4" />
              </button>
            </label>
            <input
              type="text"
              value={hex}
              onChange={handleHexChange}
              onBlur={handleHexBlur}
              placeholder="#2596be"
              className="w-full px-3 py-2 border rounded-lg font-mono uppercase focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right: Color info */}
        <div className="space-y-4">
          <div
            className="relative rounded-xl p-6 min-h-[120px] flex flex-col justify-end"
            style={{ backgroundColor: hex }}
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => copyToClipboard(formatHex)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            </div>
            <div className="text-white drop-shadow-md">
              <div className="text-2xl font-bold">{formatHex}</div>
              {colorName && <div className="text-sm opacity-90">{colorName}</div>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conversions.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
              >
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-gray-800 truncate max-w-[140px]">{value}</span>
                  <button
                    onClick={() => copyToClipboard(value)}
                    className="text-gray-400 hover:text-purple-600 shrink-0"
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
