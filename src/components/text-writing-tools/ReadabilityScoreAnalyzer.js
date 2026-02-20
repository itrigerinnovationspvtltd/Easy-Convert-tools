import React, { useState } from "react";

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyze(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length || (text.trim() ? 1 : 0);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const w = words.length;
  const s = Math.max(1, sentences);
  const syl = syllables;
  const fleschReading = 206.835 - 1.015 * (w / s) - 84.6 * (syl / w);
  const fleschGrade = 0.39 * (w / s) + 11.8 * (syl / w) - 15.59;
  return {
    words: w,
    sentences: s,
    syllables: syl,
    fleschReading: Math.round(fleschReading * 10) / 10,
    fleschGrade: Math.round(fleschGrade * 10) / 10,
  };
}

function ReadabilityScoreAnalyzer() {
  const [text, setText] = useState("");
  const result = text.trim() ? analyze(text) : null;

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Readability Score Analyzer</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Analyze text readability with Flesch Reading Ease and Flesch-Kincaid Grade Level.</p>
      <div className="w-full max-w-2xl space-y-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500"
        />
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{result.words}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{result.sentences}</div>
              <div className="text-sm text-gray-600">Sentences</div>
            </div>
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{result.syllables}</div>
              <div className="text-sm text-gray-600">Syllables</div>
            </div>
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{result.fleschReading}</div>
              <div className="text-sm text-gray-600">Flesch Reading Ease</div>
              <p className="text-xs text-gray-500 mt-1">0-30 hard, 60-70 ok, 90+ easy</p>
            </div>
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{result.fleschGrade}</div>
              <div className="text-sm text-gray-600">Grade Level</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadabilityScoreAnalyzer;
