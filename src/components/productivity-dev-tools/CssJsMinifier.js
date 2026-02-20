import React, { useState } from "react";

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
}

function minifyJs(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,:=[\]<>!&|])\s*/g, "$1")
    .trim();
}

const CssJsMinifier = () => {
  const [mode, setMode] = useState("css");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const minify = () => {
    setError("");
    try {
      setOutput(mode === "css" ? minifyCss(input) : minifyJs(input));
    } catch (e) {
      setError(e.message || "Minification failed");
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
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">CSS / JS Minifier</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Minify CSS or JavaScript. Removes comments and extra whitespace.
      </p>
      <div className="w-full max-w-3xl space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("css"); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg font-medium ${mode === "css" ? "btn-gradient text-white" : "bg-gray-200 text-gray-700"}`}
          >
            CSS
          </button>
          <button
            onClick={() => { setMode("js"); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg font-medium ${mode === "js" ? "btn-gradient text-white" : "bg-gray-200 text-gray-700"}`}
          >
            JavaScript
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "css" ? "/* Your CSS */" : "// Your JavaScript"}
            className="w-full h-40 p-4 border rounded-lg font-mono text-sm resize-none"
          />
        </div>
        <button onClick={minify} className="btn-gradient px-6 py-2 rounded-lg text-white">
          Minify
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {output && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Output ({output.length} chars)</label>
              <button onClick={copy} className="text-sm text-purple-600 hover:underline">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto max-h-48 text-sm whitespace-pre-wrap break-all">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CssJsMinifier;
