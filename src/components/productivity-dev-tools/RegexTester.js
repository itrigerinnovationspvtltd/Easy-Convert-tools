import React, { useState, useMemo } from "react";

function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const re = new RegExp(pattern, flags);
      const m = [];
      let match;
      while ((match = re.exec(text)) !== null) {
        m.push({ match: match[0], index: match.index });
        if (!flags.includes("g")) break;
      }
      return { matches: m, error: "" };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flags, text]);

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Regex Tester</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Test regular expressions against text. Matches update live.
      </p>
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex gap-2 flex-wrap">
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Regex pattern"
            className="flex-1 min-w-[200px] p-3 border rounded-lg font-mono focus:ring-2 focus:ring-purple-500"
          />
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g, i, m"
            className="w-20 p-3 border rounded-lg font-mono"
          />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text to test against..."
          className="w-full h-40 p-4 border rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-purple-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!error && pattern && (
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">{matches.length} match(es)</div>
            <div className="space-y-1 max-h-48 overflow-auto">
              {matches.slice(0, 50).map((m, i) => (
                <div key={i} className="text-sm font-mono">
                  <span className="text-green-600">&quot;{m.match}&quot;</span> at index {m.index}
                </div>
              ))}
              {matches.length > 50 && <div className="text-gray-500">...and {matches.length - 50} more</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegexTester;
