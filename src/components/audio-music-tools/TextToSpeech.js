import React, { useState } from "react";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text.trim()) return;
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Text to Speech</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Convert text to speech using your browser. Uses the built-in Web Speech API.</p>
      <div className="w-full max-w-2xl space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak..."
          className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-3">
          <button
            onClick={speak}
            disabled={!text.trim() || speaking}
            className="btn-gradient px-6 py-2 rounded-lg disabled:opacity-60"
          >
            {speaking ? "Speaking..." : "Speak"}
          </button>
          <button onClick={stop} className="btn-secondary px-6 py-2 rounded-lg">
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeech;
