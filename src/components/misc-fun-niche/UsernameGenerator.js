import React, { useState } from "react";

const adjectives = ["Swift", "Cool", "Bright", "Lucky", "Silent", "Mystic", "Cosmic", "Ocean", "Sunny", "Wild", "Happy", "Quick", "Golden", "Silver", "Iron"];
const nouns = ["Wolf", "Tiger", "Eagle", "Phoenix", "Dragon", "Storm", "Shadow", "Frost", "Flame", "River", "Bear", "Lion", "Falcon", "Thunder", "Sky"];

const UsernameGenerator = () => {
  const [count, setCount] = useState(5);
  const [list, setList] = useState([]);

  const generate = () => {
    const seen = new Set();
    const result = [];
    let attempts = 0;
    while (result.length < Math.min(count, 20) && attempts < 50) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const num = Math.floor(Math.random() * 999);
      const variants = [
        adj + noun,
        adj + noun + num,
        adj + "_" + noun,
        adj.toLowerCase() + noun,
      ];
      const pick = variants[Math.floor(Math.random() * variants.length)];
      if (!seen.has(pick)) {
        seen.add(pick);
        result.push(pick);
      }
      attempts++;
    }
    setList(result);
  };

  const copy = (s) => navigator.clipboard.writeText(s);

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Username Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Generate unique usernames for your accounts.
      </p>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Count (1-20)</label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button onClick={generate} className="btn-gradient px-6 py-2 rounded-lg text-white w-full">
          Generate
        </button>
        {list.length > 0 && (
          <ul className="bg-white rounded-xl border p-4 space-y-2">
            {list.map((u, i) => (
              <li key={i} className="flex justify-between items-center">
                <span className="font-mono">{u}</span>
                <button onClick={() => copy(u)} className="text-sm text-blue-600 hover:underline">Copy</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UsernameGenerator;
