import React, { useState } from "react";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = (indent = 2) => {
    setError("");
    setOutput("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    }
  };

  const minify = () => {
    setError("");
    setOutput("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    }
  };

  const copy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">JSON Formatter</h1>
      <p className="tool-section-desc">
        Format or minify JSON for readability. Paste your JSON and format it.
      </p>
      <div className="w-full max-w-3xl space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="input-field h-48 font-mono text-sm"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => format(2)} className="btn-gradient px-4 py-2.5 rounded-xl">Format (2 spaces)</button>
          <button onClick={() => format(4)} className="btn-gradient px-4 py-2.5 rounded-xl">Format (4 spaces)</button>
          <button onClick={minify} className="btn-gradient px-4 py-2.5 rounded-xl">Minify</button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {output && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Result</label>
              <button onClick={copy} className="btn-copy">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-xl overflow-auto max-h-64 text-sm font-mono">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default JsonFormatter;
