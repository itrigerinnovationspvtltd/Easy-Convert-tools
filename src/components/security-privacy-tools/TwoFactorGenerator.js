import React, { useState } from "react";

function randomBase32(len = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let s = "";
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) s += chars[arr[i] % 32];
  return s;
}

function TwoFactorGenerator() {
  const [secret, setSecret] = useState("");
  const [copied, setCopied] = useState(false);

  const gen = () => {
    setSecret(randomBase32());
    setCopied(false);
  };

  const copy = () => {
    if (secret) {
      navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">2FA Secret Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Generate a random Base32 secret for 2FA. Add it to Google Authenticator, Authy, or any TOTP app.
      </p>
      <div className="w-full max-w-md space-y-4">
        <button onClick={gen} className="btn-gradient w-full py-3 rounded-lg text-white">
          Generate Secret
        </button>
        {secret && (
          <div className="bg-white rounded-xl border p-6 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Secret (Base32)</label>
              <button onClick={copy} className="text-sm text-purple-600 hover:underline">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <code className="block p-3 bg-gray-100 rounded break-all text-sm font-mono">{secret}</code>
            <p className="text-xs text-gray-500">
              In your authenticator app, choose &quot;Enter a setup key&quot; and paste this secret. The app will generate time-based codes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TwoFactorGenerator;
