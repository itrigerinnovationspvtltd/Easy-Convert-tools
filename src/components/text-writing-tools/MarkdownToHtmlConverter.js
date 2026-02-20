import React, { useState, useMemo } from "react";

function mdToHtml(md) {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  const lines = html.split("\n");
  const result = [];
  let inList = false;
  let inOrdered = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^-\s+/.test(line)) {
      if (!inList) { result.push("<ul>"); inList = true; }
      result.push("<li>" + line.replace(/^-\s+/, "") + "</li>");
    } else if (/^\d+\.\s+/.test(line)) {
      if (!inOrdered) { result.push("<ol>"); inOrdered = true; }
      result.push("<li>" + line.replace(/^\d+\.\s+/, "") + "</li>");
    } else {
      if (inList) { result.push("</ul>"); inList = false; }
      if (inOrdered) { result.push("</ol>"); inOrdered = false; }
      result.push(line ? "<p>" + line + "</p>" : "<br>");
    }
  }
  if (inList) result.push("</ul>");
  if (inOrdered) result.push("</ol>");
  return result.join("\n").replace(/<p><\/p>/g, "");
}

function MarkdownToHtmlConverter() {
  const [input, setInput] = useState("# Hello\n**bold** *italic*");
  const [copied, setCopied] = useState(false);
  const output = useMemo(() => mdToHtml(input), [input]);

  const copy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Markdown to HTML</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Convert Markdown to HTML with live preview.
      </p>
      <div className="w-full max-w-5xl space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Markdown</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="# Hello\n**bold** *italic*\n- list"
              className="w-full h-64 p-4 border rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">HTML</label>
              <button onClick={copy} className="text-sm text-purple-600 hover:underline">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <textarea
              readOnly
              value={output}
              className="w-full h-64 p-4 border rounded-lg bg-gray-50 font-mono text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
            <div
              className="w-full h-64 p-4 border rounded-lg bg-white overflow-auto text-sm [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_strong]:font-bold [&_em]:italic [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded"
              dangerouslySetInnerHTML={{ __html: output || "<p class='text-gray-400'>Type Markdown to see preview</p>" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkdownToHtmlConverter;
