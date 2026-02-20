import React, { useState } from "react";

const AVG_WPM = 200;

function WordCharacterCounter() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length || (text.trim() ? 1 : 0);
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0);
  const readingMinutes = Math.ceil(words.length / AVG_WPM) || 0;

  const copy = () => {
    if (text) navigator.clipboard.writeText(text);
  };

  const clear = () => setText("");

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Word & Character Counter</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Count words, characters, sentences, paragraphs, and reading time.
      </p>
      <div className="w-full max-w-2xl space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={copy} className="text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Copy</button>
            <button onClick={clear} className="text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Clear</button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{words.length}</div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{chars}</div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{charsNoSpaces}</div>
            <div className="text-sm text-gray-600">No spaces</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{sentences}</div>
            <div className="text-sm text-gray-600">Sentences</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{paragraphs}</div>
            <div className="text-sm text-gray-600">Paragraphs</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{readingMinutes}</div>
            <div className="text-sm text-gray-600">~Read (min)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordCharacterCounter;
