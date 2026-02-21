import React, { useState, useCallback } from "react";

function unixToHuman(unix, isMs) {
  const val = parseInt(unix, 10);
  if (Number.isNaN(val)) return null;
  const ms = isMs ? val : val * 1000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  });
}

function humanToUnix(str) {
  const d = new Date(str);
  if (Number.isNaN(d.getTime())) return null;
  return { seconds: Math.floor(d.getTime() / 1000), ms: d.getTime() };
}

const TimestampConverter = () => {
  const [unixInput, setUnixInput] = useState("");
  const [unixIsMs, setUnixIsMs] = useState(false);
  const [humanInput, setHumanInput] = useState("");
  const [humanResult, setHumanResult] = useState(null);
  const [unixResult, setUnixResult] = useState(null);
  const [error, setError] = useState("");

  const handleUnixChange = useCallback((e) => {
    const v = e.target.value;
    setUnixInput(v);
    setError("");
    setHumanResult(null);
    if (!v.trim()) return;
    const out = unixToHuman(v, unixIsMs);
    if (out) setHumanResult(out);
    else setError("Invalid Unix timestamp.");
  }, [unixIsMs]);

  const handleUnixIsMsChange = useCallback((e) => {
    const checked = e.target.checked;
    setUnixIsMs(checked);
    setHumanResult(null);
    if (unixInput.trim()) {
      const out = unixToHuman(unixInput, checked);
      if (out) setHumanResult(out);
    }
  }, [unixInput]);

  const handleHumanChange = useCallback((e) => {
    const v = e.target.value;
    setHumanInput(v);
    setError("");
    setUnixResult(null);
    if (!v.trim()) return;
    const out = humanToUnix(v);
    if (out) setUnixResult(out);
    else setError("Invalid date/time.");
  }, []);

  const setNow = useCallback(() => {
    const now = Date.now();
    setUnixInput(String(now));
    setUnixIsMs(true);
    setHumanResult(unixToHuman(String(now), true));
  }, []);

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Timestamp Converter</h1>
      <p className="tool-section-desc">
        Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds.
      </p>
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex justify-end">
          <button onClick={setNow} type="button" className="btn-secondary text-sm">
            Use current time
          </button>
        </div>
        <div>
          <label className="input-label">Unix Timestamp</label>
          <div className="flex gap-2 flex-wrap items-center">
            <input
              type="text"
              value={unixInput}
              onChange={handleUnixChange}
              placeholder="e.g. 1704067200 or 1704067200000"
              className="input-field flex-1 min-w-[180px]"
            />
            <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
              <input type="checkbox" checked={unixIsMs} onChange={handleUnixIsMsChange} className="rounded" />
              Milliseconds
            </label>
          </div>
          {humanResult && (
            <p className="mt-2 p-3 rounded-xl bg-gray-50 text-gray-800 text-sm">{humanResult}</p>
          )}
        </div>
        <div>
          <label className="input-label">Date & Time (human)</label>
          <input
            type="text"
            value={humanInput}
            onChange={handleHumanChange}
            placeholder="e.g. 2024-01-01 12:00 or Jan 1, 2024"
            className="input-field"
          />
          {unixResult && (
            <div className="mt-2 p-3 rounded-xl bg-gray-50 text-sm space-y-1">
              <p className="text-gray-800">Seconds: {unixResult.seconds}</p>
              <p className="text-gray-800">Milliseconds: {unixResult.ms}</p>
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default TimestampConverter;
