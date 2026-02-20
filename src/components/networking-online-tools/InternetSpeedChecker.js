import React, { useState } from "react";

const TEST_URL = "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"; // ~30KB

const InternetSpeedChecker = () => {
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const runTest = async () => {
    setDownloading(true);
    setResult(null);
    setError("");
    const start = performance.now();
    try {
      const res = await fetch(TEST_URL, { cache: "no-store" });
      const blob = await res.blob();
      const end = performance.now();
      const durationSec = (end - start) / 1000;
      const sizeBytes = blob.size;
      const speedMbps = (sizeBytes * 8) / (durationSec * 1000000);
      setResult({
        latency: Math.round(end - start),
        sizeKb: (sizeBytes / 1024).toFixed(2),
        speedMbps: speedMbps.toFixed(2),
        durationSec: durationSec.toFixed(2),
      });
    } catch (err) {
      setError("Speed test failed. Check your connection or try again.");
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Internet Speed Test</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Measure your approximate download speed. Results may vary.
      </p>
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={runTest}
          disabled={downloading}
          className="btn-gradient px-8 py-3 rounded-lg text-white w-full disabled:opacity-60"
        >
          {downloading ? "Testing..." : "Start Speed Test"}
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {result && (
          <div className="bg-white rounded-xl border p-6 space-y-3">
            <div className="text-2xl font-bold text-green-600">{result.speedMbps} Mbps</div>
            <div className="text-sm text-gray-600">Download speed</div>
            <hr />
            <div>Latency: {result.latency} ms</div>
            <div>Data: {result.sizeKb} KB</div>
            <div>Duration: {result.durationSec} s</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternetSpeedChecker;
