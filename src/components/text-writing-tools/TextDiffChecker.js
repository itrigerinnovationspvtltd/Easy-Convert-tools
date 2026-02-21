import React, { useState, useMemo } from "react";

function computeLineDiff(a, b) {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const result = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    const la = linesA[i] ?? "";
    const lb = linesB[i] ?? "";
    if (la === lb) {
      result.push({ type: "same", a: la, b: lb });
    } else {
      result.push({ type: "diff", a: la, b: lb });
    }
  }
  return result;
}

function highlightCharDiff(a, b) {
  if (a === b) return { aElem: a, bElem: b };
  const aParts = [];
  const bParts = [];
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const ca = a[i];
    const cb = b[i];
    if (ca === cb) {
      if (ca) {
        aParts.push(<span key={`a-${i}`} className="text-gray-800">{ca}</span>);
        bParts.push(<span key={`b-${i}`} className="text-gray-800">{cb}</span>);
      }
    } else {
      if (ca) aParts.push(<span key={`a-${i}`} className="bg-red-200 text-red-900">{ca}</span>);
      if (cb) bParts.push(<span key={`b-${i}`} className="bg-green-200 text-green-900">{cb}</span>);
    }
  }
  return { aElem: aParts.length ? aParts : "(empty)", bElem: bParts.length ? bParts : "(empty)" };
}

const TextDiffChecker = () => {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [viewMode, setViewMode] = useState("line"); // "line" | "inline"

  const diff = useMemo(() => computeLineDiff(textA, textB), [textA, textB]);
  const hasDiffs = useMemo(() => diff.some((d) => d.type === "diff"), [diff]);

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Text Diff Checker</h1>
      <p className="tool-section-desc">
        Compare two texts side by side. See exactly what changed between versions.
      </p>
      <div className="w-full max-w-5xl space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("line")}
            className={`px-4 py-2.5 rounded-xl font-medium ${viewMode === "line" ? "btn-gradient text-white" : "btn-secondary"}`}
          >
            Line by line
          </button>
          <button
            onClick={() => setViewMode("inline")}
            className={`px-4 py-2.5 rounded-xl font-medium ${viewMode === "inline" ? "btn-gradient text-white" : "btn-secondary"}`}
          >
            Inline chars
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Text 1 (original)</label>
            <textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder="Paste first version..."
              className="input-field h-48 font-mono text-sm"
            />
          </div>
          <div>
            <label className="input-label">Text 2 (to compare)</label>
            <textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="Paste second version..."
              className="input-field h-48 font-mono text-sm"
            />
          </div>
        </div>
        {diff.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-soft">
            <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Comparison result</span>
              {hasDiffs && <span className="text-sm text-amber-600">Differences found</span>}
            </div>
            <div className="max-h-80 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left font-medium text-gray-600 w-12">#</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600 border-l border-gray-200">Text 1</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600 border-l border-gray-200">Text 2</th>
                  </tr>
                </thead>
                <tbody>
                  {diff.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t border-gray-100 ${
                        row.type === "diff" ? "bg-red-50/50" : ""
                      }`}
                    >
                      <td className="px-3 py-1.5 text-gray-400 font-mono text-xs">{i + 1}</td>
                      <td className="px-3 py-1.5 font-mono break-all border-l border-gray-100">
                        {viewMode === "inline" && row.type === "diff"
                          ? highlightCharDiff(row.a, row.b).aElem
                          : row.a || <span className="text-gray-400">(empty)</span>}
                      </td>
                      <td className="px-3 py-1.5 font-mono break-all border-l border-gray-100">
                        {viewMode === "inline" && row.type === "diff"
                          ? highlightCharDiff(row.a, row.b).bElem
                          : row.b || <span className="text-gray-400">(empty)</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextDiffChecker;
