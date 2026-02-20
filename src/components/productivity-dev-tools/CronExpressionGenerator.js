import React, { useState } from "react";

const PRESETS = {
  "Every minute": "* * * * *",
  "Every 5 minutes": "*/5 * * * *",
  "Every 15 minutes": "*/15 * * * *",
  "Every 30 minutes": "*/30 * * * *",
  "Every hour": "0 * * * *",
  "Every day at midnight": "0 0 * * *",
  "Every day at noon": "0 12 * * *",
  "Every Monday at 9am": "0 9 * * 1",
  "Every month on 1st": "0 0 1 * *",
};

const CronExpressionGenerator = () => {
  const [expression, setExpression] = useState("*/5 * * * *");
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);

  const display = custom.trim() || expression;

  const copy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Cron Expression Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Pick a preset or enter a custom cron expression. Format: minute hour day month weekday.
      </p>
      <div className="w-full max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Presets</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(PRESETS).map(([label, expr]) => (
              <button
                key={expr}
                onClick={() => { setExpression(expr); setCustom(""); }}
                className={`p-3 rounded-lg border text-left transition ${
                  expression === expr && !custom ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-gray-800 text-sm">{label}</div>
                <code className="text-xs text-gray-600">{expr}</code>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom expression</label>
          <input
            type="text"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="e.g. 0 9 * * 1-5"
            className="w-full px-3 py-2 border rounded-lg font-mono"
          />
        </div>
        <div className="bg-white rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4">
          <code className="text-lg font-mono text-gray-800 break-all">{display || "(empty)"}</code>
          <button onClick={copy} className="btn-gradient px-4 py-2 rounded-lg text-white shrink-0">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Format: minute (0-59) hour (0-23) day (1-31) month (1-12) weekday (0-7, 0 and 7 = Sunday). Use * for any, */n for every n.
        </p>
      </div>
    </div>
  );
};

export default CronExpressionGenerator;
