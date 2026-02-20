import React, { useState } from "react";

const PROXY = "https://api.allorigins.win/raw?url=";

const WebsiteSpeedTest = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runTest = async () => {
    setLoading(true);
    setResult(null);
    setError("");
    const start = performance.now();
    try {
      const encoded = encodeURIComponent(url.trim());
      const res = await fetch(PROXY + encoded);
      const text = await res.text();
      const end = performance.now();
      const sizeBytes = new Blob([text]).size;
      setResult({
        time: Math.round(end - start),
        sizeKb: (sizeBytes / 1024).toFixed(2),
      });
    } catch (err) {
      setError("Failed to fetch URL. Check the address and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Website Speed Test</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Measure response time and size for a URL.
      </p>
      <div className="w-full max-w-md space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button onClick={runTest} disabled={loading} className="btn-gradient px-6 py-2 rounded-lg text-white disabled:opacity-60">
            {loading ? "Testing..." : "Test"}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {result && (
          <div className="bg-white rounded-xl border p-6 space-y-2">
            <div className="text-xl font-bold text-green-600">{result.time} ms</div>
            <div className="text-sm text-gray-600">Response time</div>
            <div>Size: {result.sizeKb} KB</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteSpeedTest;
