import React, { useState } from "react";

const PROXY = "https://api.allorigins.win/raw?url=";

const BrokenLinkChecker = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const extractLinks = (html, baseUrl) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const anchors = doc.querySelectorAll("a[href]");
    const seen = new Set();
    const result = [];
    try {
      const base = new URL(baseUrl);
      anchors.forEach((a) => {
        let href = a.getAttribute("href") || "";
        // eslint-disable-next-line no-script-url -- filtering out script URLs, not executing
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:")) return;
        try {
          const full = new URL(href, base).href;
          if (!seen.has(full)) {
            seen.add(full);
            result.push(full);
          }
        } catch (_) {}
      });
    } catch (_) {}
    return result;
  };

  const fetchPage = async () => {
    setLoading(true);
    setLinks([]);
    setError("");
    try {
      const encoded = encodeURIComponent(url.trim());
      const res = await fetch(PROXY + encoded);
      const html = await res.text();
      const found = extractLinks(html, url.trim()).slice(0, 25);
      setLinks(found);
      if (found.length === 0) setError("No links found.");
    } catch (err) {
      setError("Failed to fetch page. Check URL and try again.");
    }
    setLoading(false);
  };

  const [statuses, setStatuses] = useState({});
  const checkLinks = async () => {
    setChecking(true);
    const st = {};
    for (let i = 0; i < Math.min(links.length, 10); i++) {
      const link = links[i];
      try {
        const r = await fetch(PROXY + encodeURIComponent(link), { method: "HEAD" });
        st[link] = r.ok ? "ok" : r.status;
      } catch {
        st[link] = "error";
      }
    }
    setStatuses(st);
    setChecking(false);
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Broken Link Checker</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Enter a URL to extract and check links on the page.
      </p>
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button onClick={fetchPage} disabled={loading} className="btn-gradient px-6 py-2 rounded-lg text-white disabled:opacity-60">
            {loading ? "Fetching..." : "Fetch Links"}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {links.length > 0 && (
          <>
            <p className="text-sm text-gray-600">Found {links.length} links (showing up to 25)</p>
            <button onClick={checkLinks} disabled={checking} className="text-sm btn-gradient px-4 py-2 rounded text-white disabled:opacity-60">
              {checking ? "Checking..." : "Check first 10"}
            </button>
            <ul className="bg-white rounded-xl border p-4 space-y-2 max-h-64 overflow-y-auto">
              {links.map((link) => (
                <li key={link} className="text-sm truncate flex items-center gap-2">
                  <span className={`shrink-0 w-12 ${statuses[link] === "ok" ? "text-green-600" : statuses[link] ? "text-red-600" : ""}`}>
                    {statuses[link] === "ok" ? "✓" : statuses[link] || "-"}
                  </span>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default BrokenLinkChecker;
