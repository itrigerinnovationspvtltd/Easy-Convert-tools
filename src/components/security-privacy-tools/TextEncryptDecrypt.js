import React, { useState } from "react";

async function encryptText(text, password) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    await crypto.subtle.digest("SHA-256", enc.encode(password)),
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...combined));
}

async function decryptText(encoded, password) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const key = await crypto.subtle.importKey(
    "raw",
    await crypto.subtle.digest("SHA-256", enc.encode(password)),
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const combined = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  return dec.decode(decrypted);
}

const TextEncryptDecrypt = () => {
  const [mode, setMode] = useState("encrypt");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setError("");
    setOutput("");
    if (!password) {
      setError("Enter a password");
      return;
    }
    setLoading(true);
    try {
      if (mode === "encrypt") {
        setOutput(await encryptText(input, password));
      } else {
        setOutput(await decryptText(input, password));
      }
    } catch (e) {
      setError(mode === "encrypt" ? "Encryption failed" : "Decryption failed. Wrong password or invalid data.");
    }
    setLoading(false);
  };

  const copy = () => output && navigator.clipboard.writeText(output);

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Text Encrypt / Decrypt</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Encrypt or decrypt text with AES-256. Your data never leaves your device.
      </p>
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("encrypt"); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg font-medium ${mode === "encrypt" ? "btn-gradient text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Encrypt
          </button>
          <button
            onClick={() => { setMode("decrypt"); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg font-medium ${mode === "decrypt" ? "btn-gradient text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Decrypt
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {mode === "encrypt" ? "Text to encrypt" : "Encrypted text (Base64)"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encrypt" ? "Enter plain text..." : "Paste encrypted Base64..."}
            className="w-full h-32 p-4 border rounded-lg font-mono text-sm resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button onClick={run} disabled={loading} className="btn-gradient w-full py-3 rounded-lg text-white disabled:opacity-60">
          {loading ? "Processing..." : mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {output && (
          <div className="bg-white rounded-xl border p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Result</label>
              <button onClick={copy} className="text-sm text-purple-600 hover:underline">Copy</button>
            </div>
            <pre className="p-3 bg-gray-100 rounded text-sm overflow-auto max-h-32 break-all">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEncryptDecrypt;
