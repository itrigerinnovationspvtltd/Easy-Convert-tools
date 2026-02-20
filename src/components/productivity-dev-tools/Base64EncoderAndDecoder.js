import React, { useState, useEffect } from "react";

function Base64EncoderAndDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (!input) {
      setOutput("");
      return;
    }
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.replace(/\s/g, "")))));
      }
    } catch (e) {
      setError(mode === "encode" ? "Invalid input" : "Invalid Base64 string");
      setOutput("");
    }
  }, [input, mode]);

  const handleModeChange = (m) => {
    setMode(m);
    setOutput("");
    setError("");
  };

  const copy = () => output && navigator.clipboard.writeText(output);

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Base64 Encoder & Decoder</h1>
      <p className="tool-section-desc">
        Encode text to Base64 or decode Base64 to text. Updates live as you type.
      </p>
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleModeChange("encode")}
            className={`px-4 py-2.5 rounded-xl font-medium ${mode === "encode" ? "btn-gradient text-white" : "btn-secondary"}`}
          >
            Encode
          </button>
          <button
            onClick={() => handleModeChange("decode")}
            className={`px-4 py-2.5 rounded-xl font-medium ${mode === "decode" ? "btn-gradient text-white" : "btn-secondary"}`}
          >
            Decode
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{mode === "encode" ? "Input (text)" : "Input (Base64)"}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="input-field h-32"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {output && !error && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Result</label>
              <button onClick={copy} className="btn-copy">Copy</button>
            </div>
            <textarea readOnly value={output} className="input-field h-32 bg-gray-50 font-mono text-sm" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Base64EncoderAndDecoder;
