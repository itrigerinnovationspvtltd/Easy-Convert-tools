import React, { useState } from "react";

async function hashText(text, algo) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({});

  const generate = async () => {
    if (!input.trim()) return;
    try {
      const [sha256, sha384, sha512] = await Promise.all([
        hashText(input, "SHA-256"),
        hashText(input, "SHA-384"),
        hashText(input, "SHA-512"),
      ]);
      setHashes({ "SHA-256": sha256, "SHA-384": sha384, "SHA-512": sha512 });
    } catch (e) {
      setHashes({ error: e.message });
    }
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Hash Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Generate SHA-256, SHA-384, SHA-512 hashes. (Browser crypto API does not support MD5/SHA-1 for security.)</p>
      <div className="w-full max-w-2xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500"
        />
        <button onClick={generate} className="btn-gradient mt-4 px-6 py-2 rounded-lg shadow-btn-gradient">Generate Hash</button>
        {Object.keys(hashes).length > 0 && (
          <div className="mt-6 space-y-3">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="bg-white rounded-lg border p-3">
                <div className="text-sm font-medium text-gray-600 mb-1">{algo}</div>
                <code className="text-sm break-all block">{hash}</code>
                <button onClick={() => navigator.clipboard.writeText(hash)} className="text-purple-600 text-xs mt-1 hover:underline">Copy</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HashGenerator;
