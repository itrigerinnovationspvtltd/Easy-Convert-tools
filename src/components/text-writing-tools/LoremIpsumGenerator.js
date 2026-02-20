import React, { useState } from "react";

const LOREM = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function LoremIpsumGenerator() {
  const [count, setCount] = useState(5);
  const [type, setType] = useState("paragraphs");
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    if (type === "paragraphs") {
      const paras = [];
      for (let p = 0; p < count; p++) {
        const words = [];
        const len = 40 + Math.floor(Math.random() * 30);
        for (let i = 0; i < len; i++) {
          words.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
        }
        paras.push(words.join(" "));
      }
      setOutput(paras.join("\n\n"));
    } else if (type === "words") {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
      }
      setOutput(words.join(" "));
    } else {
      const sents = [];
      for (let i = 0; i < count; i++) {
        const len = 5 + Math.floor(Math.random() * 10);
        const words = [];
        for (let j = 0; j < len; j++) words.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
        sents.push(words.join(" ").replace(/^./, (c) => c.toUpperCase()) + ".");
      }
      setOutput(sents.join(" "));
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
      <h1 className="tool-section-title">Lorem Ipsum Generator</h1>
      <p className="tool-section-desc">Generate placeholder text for your designs.</p>
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex gap-4 flex-wrap items-end">
          <div>
            <label className="input-label">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="input-field min-w-[140px]">
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div>
            <label className="input-label">Count</label>
            <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="input-field w-24" />
          </div>
          <button onClick={generate} className="btn-gradient px-6 py-2.5 rounded-xl">Generate</button>
        </div>
        {output && (
          <div>
            <div className="flex justify-end mb-2">
              <button onClick={copy} className="btn-copy">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <textarea readOnly value={output} className="input-field h-64 text-sm" />
          </div>
        )}
      </div>
    </div>
  );
}

export { LoremIpsumGenerator };
export default LoremIpsumGenerator;
