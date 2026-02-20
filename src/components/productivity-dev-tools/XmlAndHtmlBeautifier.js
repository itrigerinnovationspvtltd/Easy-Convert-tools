import React, { useState } from "react";

function formatXmlOrHtml(input, indentSize = 2) {
  const INDENT = " ".repeat(indentSize);
  let formatted = "";
  let depth = 0;
  const tokens = input.replace(/>\s*</g, "><").replace(/^\s+|\s+$/g, "").split(/(<[^>]+>)/g).filter(Boolean);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith("</")) {
      depth = Math.max(0, depth - 1);
      formatted += "\n" + INDENT.repeat(depth) + token;
    } else if (token.startsWith("<") && !token.match(/\/\s*>$/)) {
      formatted += (formatted ? "\n" : "") + INDENT.repeat(depth) + token;
      if (!token.match(/\/\s*>$/) && !token.startsWith("<!") && !token.startsWith("<?")) {
        depth++;
      }
    } else if (token.trim()) {
      formatted += token.replace(/^\s+|\s+$/g, "");
    }
  }
  return formatted.trim();
}

const XmlAndHtmlBeautifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const beautify = () => {
    setError("");
    try {
      setOutput(formatXmlOrHtml(input, indent));
    } catch (e) {
      setError(e.message || "Formatting failed");
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
      <h1 className="tool-section-title">XML / HTML Beautifier</h1>
      <p className="tool-section-desc">Format XML or HTML for readability.</p>
      <div className="w-full max-w-4xl space-y-4">
        <div>
          <label className="input-label">Indent</label>
          <select value={indent} onChange={(e) => setIndent(parseInt(e.target.value))} className="input-field w-32">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="<root><item>value</item></root>"
              className="input-field h-64 font-mono text-sm"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Output</label>
              <button onClick={copy} className="btn-copy">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <textarea
              readOnly
              value={output}
              className="input-field h-64 bg-gray-50 font-mono text-sm"
            />
          </div>
        </div>
        <button onClick={beautify} className="btn-gradient px-6 py-2.5 rounded-xl">
          Beautify
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default XmlAndHtmlBeautifier;
