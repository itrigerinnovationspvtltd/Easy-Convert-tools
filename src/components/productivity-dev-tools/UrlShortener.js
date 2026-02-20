import React, { useState } from "react";

const TINYURL_API = "https://tinyurl.com/api-create.php";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const shorten = async () => {
    const u = url.trim();
    if (!u) {
      setError("Enter a URL");
      return;
    }
    if (!/^https?:\/\//i.test(u)) {
      setError("URL must start with http:// or https://");
      return;
    }
    setLoading(true);
    setError("");
    setShort("");
    try {
      const res = await fetch(`${TINYURL_API}?url=${encodeURIComponent(u)}`);
      const text = await res.text();
      if (res.ok && text.startsWith("http")) {
        setShort(text.trim());
      } else {
        setError("Shortening failed. Try again.");
      }
    } catch (e) {
      setError("Network error. Check your connection.");
    }
    setLoading(false);
  };

  const copy = () => {
    if (short) {
      navigator.clipboard.writeText(short);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">URL Shortener</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Shorten long URLs using TinyURL. Free and instant.
      </p>
      <div className="w-full max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={shorten}
          disabled={loading}
          className="btn-gradient w-full py-3 rounded-lg text-white disabled:opacity-60"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {short && (
          <div className="bg-white rounded-xl border p-4">
            <div className="text-sm text-gray-600 mb-1">Short URL</div>
            <div className="flex gap-2">
              <input readOnly value={short} className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 font-mono text-sm" />
              <button onClick={copy} className="btn-gradient px-4 py-2 rounded-lg text-white shrink-0">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
