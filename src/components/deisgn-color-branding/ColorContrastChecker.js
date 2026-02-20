import React, { useState } from "react";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagPass(ratio, level) {
  if (level === "AA") return { normal: ratio >= 4.5, large: ratio >= 3 };
  if (level === "AAA") return { normal: ratio >= 7, large: ratio >= 4.5 };
  return {};
}

const ColorContrastChecker = () => {
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");

  const rgbFg = hexToRgb(fg) || { r: 0, g: 0, b: 0 };
  const rgbBg = hexToRgb(bg) || { r: 255, g: 255, b: 255 };

  const lumFg = getLuminance(rgbFg.r, rgbFg.g, rgbFg.b);
  const lumBg = getLuminance(rgbBg.r, rgbBg.g, rgbBg.b);
  const ratio = getContrastRatio(lumFg, lumBg);
  const aa = wcagPass(ratio, "AA");
  const aaa = wcagPass(ratio, "AAA");

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Color Contrast Checker</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Check WCAG contrast ratios for text readability.
      </p>
      <div className="w-full max-w-lg space-y-6">
        <div className="flex flex-wrap gap-6 justify-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foreground</label>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-14 h-14 cursor-pointer rounded border" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="mt-1 w-full px-2 py-1 text-sm font-mono border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-14 h-14 cursor-pointer rounded border" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="mt-1 w-full px-2 py-1 text-sm font-mono border rounded" />
          </div>
        </div>

        <div
          className="rounded-xl p-8 text-center border-2"
          style={{ backgroundColor: bg, color: fg }}
        >
          <p className="text-lg font-medium">Sample text at different sizes</p>
          <p className="text-3xl font-bold mt-2">Large heading</p>
          <p className="text-sm mt-2">Body text for readability test</p>
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div className="text-2xl font-bold text-gray-800">
            Contrast ratio: <span className="text-blue-600">{ratio.toFixed(2)}:1</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded bg-gray-50">
              <div className="font-semibold text-gray-800">WCAG AA</div>
              <div>Normal: {aa.normal ? "✓ Pass" : "✗ Fail"}</div>
              <div>Large: {aa.large ? "✓ Pass" : "✗ Fail"}</div>
            </div>
            <div className="p-3 rounded bg-gray-50">
              <div className="font-semibold text-gray-800">WCAG AAA</div>
              <div>Normal: {aaa.normal ? "✓ Pass" : "✗ Fail"}</div>
              <div>Large: {aaa.large ? "✓ Pass" : "✗ Fail"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorContrastChecker;
