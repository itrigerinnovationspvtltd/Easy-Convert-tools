import React, { useState } from "react";

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu;

function EmojiCounter() {
  const [text, setText] = useState("");
  const matches = text.match(emojiRegex) || [];
  const unique = [...new Set(matches)];

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Emoji Counter</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Count emojis in your text.</p>
      <div className="w-full max-w-2xl">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type text with emojis..." className="w-full h-40 p-4 border rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{matches.length}</div>
            <div className="text-sm text-gray-600">Total emojis</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{unique.length}</div>
            <div className="text-sm text-gray-600">Unique emojis</div>
          </div>
          {unique.length > 0 && (
            <div className="col-span-2 sm:col-span-1 bg-white rounded-lg border p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Found emojis</div>
              <div className="flex flex-wrap gap-1 text-2xl">{unique.slice(0, 20).map((e, i) => <span key={i}>{e}</span>)}{unique.length > 20 && "..."}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmojiCounter;
