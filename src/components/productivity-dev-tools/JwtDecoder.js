import React, { useState, useCallback } from "react";

function decodeJwt(token) {
  const trimmed = token.trim().replace(/\s/g, "");
  if (!trimmed) return null;
  const parts = trimmed.split(".");
  if (parts.length !== 3) return null;
  try {
    const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return { header, payload, raw: parts };
  } catch {
    return null;
  }
}

function formatJson(obj) {
  return JSON.stringify(obj, null, 2);
}

const JwtDecoder = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [decoded, setDecoded] = useState(null);

  const handleChange = useCallback((e) => {
    const v = e.target.value;
    setInput(v);
    setError("");
    setDecoded(null);
    if (!v.trim()) return;
    const result = decodeJwt(v);
    if (result) {
      setDecoded(result);
    } else {
      setError("Invalid JWT. Expected header.payload.signature format.");
    }
  }, []);

  const copy = useCallback((text) => {
    if (text) navigator.clipboard.writeText(text);
  }, []);

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">JWT Decoder</h1>
      <p className="tool-section-desc">
        Decode and inspect JSON Web Tokens. Paste a JWT to view header and payload. No data is sent to any server.
      </p>
      <div className="w-full max-w-2xl space-y-4">
        <div>
          <label className="input-label">JWT (paste your token)</label>
          <textarea
            value={input}
            onChange={handleChange}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            className="input-field h-24 font-mono text-sm"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {decoded && !error && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="input-label">Header</label>
                <button onClick={() => copy(formatJson(decoded.header))} type="button" className="btn-copy">
                  Copy
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-gray-900 text-green-400 text-xs sm:text-sm overflow-x-auto overflow-y-auto max-h-48 font-mono">
                {formatJson(decoded.header)}
              </pre>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="input-label">Payload</label>
                <button onClick={() => copy(formatJson(decoded.payload))} type="button" className="btn-copy">
                  Copy
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-gray-900 text-amber-200 text-xs sm:text-sm overflow-x-auto overflow-y-auto max-h-64 font-mono">
                {formatJson(decoded.payload)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JwtDecoder;
