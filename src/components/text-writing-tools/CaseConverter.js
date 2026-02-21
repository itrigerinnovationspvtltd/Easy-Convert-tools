import React, { useState, useCallback } from "react";

const modes = [
  { id: "upper", label: "UPPERCASE" },
  { id: "lower", label: "lowercase" },
  { id: "title", label: "Title Case" },
  { id: "sentence", label: "Sentence case" },
  { id: "capitalize", label: "Capitalize Each Word" },
];

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

function toSentenceCase(str) {
  return str.toLowerCase().replace(/(^\s*\w|\.\s*\w|!\s*\w|\?\s*\w)/g, (m) => m.toUpperCase());
}

function convertText(text, mode) {
  if (!text) return "";
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return toTitleCase(text);
    case "sentence":
      return toSentenceCase(text);
    case "capitalize":
      return text.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    default:
      return text;
  }
}

const CaseConverter = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("upper");
  const output = convertText(input, mode);

  const copy = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Case Converter</h1>
      <p className="tool-section-desc">
        Change text to UPPERCASE, lowercase, Title Case, or Sentence case. Updates live as you type.
      </p>
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
                mode === m.id ? "btn-gradient text-white" : "btn-secondary"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div>
          <label className="input-label">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            className="input-field h-32"
          />
        </div>
        {output && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="input-label">Result</label>
              <button onClick={copy} type="button" className="btn-copy">
                Copy
              </button>
            </div>
            <textarea readOnly value={output} className="input-field h-32 bg-gray-50" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseConverter;
