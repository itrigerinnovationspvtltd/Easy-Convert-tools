import React, { useState, useEffect, useRef } from "react";

function SpeechToText() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setSupported(false);
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (e) => {
      let transcript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setText((prev) => prev + transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
      recognitionRef.current = null;
    }
    setListening(false);
  };

  if (!supported) {
    return (
      <div className="min-h-[420px] flex flex-col items-center justify-center pt-24 px-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Speech to Text</h1>
        <p className="text-gray-600 text-center">Speech recognition is not supported in your browser. Try Chrome or Edge.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Speech to Text</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Convert speech to text using your browser's built-in recognition.</p>
      <div className="w-full max-w-2xl space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Click Speak and start talking..."
          className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-3">
          <button
            onClick={listening ? stopListening : startListening}
            className={listening ? "btn-secondary px-6 py-2 rounded-lg" : "btn-gradient px-6 py-2 rounded-lg"}
          >
            {listening ? "Stop" : "Speak"}
          </button>
          <button onClick={() => setText("")} className="btn-secondary px-6 py-2 rounded-lg">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpeechToText;
