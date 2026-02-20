import React, { useState, useEffect } from "react";

const QUOTABLE_API = "https://api.quotable.io/random";

function DailyQuoteWidget() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(QUOTABLE_API);
      const data = await res.json();
      setQuote({ text: data.content, author: data.author });
    } catch {
      setError("Failed to load quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyQuote = () => {
    if (quote) navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Daily Quote</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Get inspired with a random quote.</p>
      <div className="w-full max-w-2xl">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {quote && !loading && (
          <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
            <blockquote className="text-xl sm:text-2xl text-gray-800 italic mb-4">"{quote.text}"</blockquote>
            <cite className="block text-gray-600">- {quote.author}</cite>
            <div className="flex gap-3 justify-center mt-6">
              <button onClick={fetchQuote} className="btn-gradient px-6 py-2 rounded-lg">New Quote</button>
              <button onClick={copyQuote} className="btn-secondary px-6 py-2 rounded-lg">Copy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyQuoteWidget;
