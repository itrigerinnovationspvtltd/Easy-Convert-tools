import React, { useState } from "react";

function RandomPwdGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });

  const generate = () => {
    let chars = "";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let pwd = "";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) {
      pwd += chars[arr[i] % chars.length];
    }
    setPassword(pwd);
  };

  const copy = () => navigator.clipboard.writeText(password);

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Random Password Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Generate strong, random passwords.</p>
      <div className="w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <input
            readOnly
            value={password}
            className="flex-1 p-3 border rounded-lg bg-gray-50 font-mono"
          />
          <button onClick={copy} disabled={!password} className="btn-gradient px-4 py-2 rounded-lg">Copy</button>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          {["uppercase", "lowercase", "numbers", "symbols"].map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) => setOptions((o) => ({ ...o, [key]: e.target.checked }))}
              />
              <span className="text-sm capitalize">{key}</span>
            </label>
          ))}
        </div>
        <button onClick={generate} className="btn-gradient w-full py-3 rounded-lg shadow-btn-gradient">Generate Password</button>
      </div>
    </div>
  );
}

export default RandomPwdGenerator;
