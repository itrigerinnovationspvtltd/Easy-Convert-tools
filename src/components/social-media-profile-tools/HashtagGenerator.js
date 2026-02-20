import React, { useState } from "react";

const HashtagGenerator = () => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);

  const generate = () => {
    const words = input
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    const seen = new Set();
    const result = [];
    words.forEach((w) => {
      const tag = "#" + w.replace(/\s/g, "");
      if (!seen.has(tag)) {
        seen.add(tag);
        result.push(tag);
      }
    });
    if (words.length > 1) {
      const combined = "#" + words.join("");
      if (!seen.has(combined)) result.push(combined);
    }
    setTags(result);
  };

  const copy = () => {
    if (tags.length) navigator.clipboard.writeText(tags.join(" "));
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Hashtag Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Enter keywords to generate hashtags for social media.
      </p>
      <div className="w-full max-w-md space-y-4">
        <textarea
          placeholder="e.g. summer vacation beach"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg h-24"
        />
        <button onClick={generate} className="btn-gradient px-6 py-2 rounded-lg text-white w-full">
          Generate Hashtags
        </button>
        {tags.length > 0 && (
          <div className="bg-white rounded-xl border p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{tags.length} hashtags</span>
              <button onClick={copy} className="text-sm text-blue-600 hover:underline">Copy</button>
            </div>
            <p className="text-sm break-words">{tags.join(" ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HashtagGenerator;
