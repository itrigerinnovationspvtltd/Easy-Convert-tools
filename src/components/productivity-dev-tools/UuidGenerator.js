import React, { useState } from "react";

function UuidGenerator() {
  const [uuids, setUuids] = useState([]);

  const generate = (count = 1) => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids((prev) => [...newUuids, ...prev]);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">UUID Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Generate UUIDs (Universally Unique Identifiers) for your projects.</p>
      <div className="flex gap-2">
        <button onClick={() => generate(1)} className="btn-gradient px-6 py-2 rounded-lg shadow-btn-gradient">Generate 1</button>
        <button onClick={() => generate(5)} className="btn-gradient px-6 py-2 rounded-lg shadow-btn-gradient">Generate 5</button>
        <button onClick={() => generate(10)} className="btn-gradient px-6 py-2 rounded-lg shadow-btn-gradient">Generate 10</button>
      </div>
      {uuids.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">{uuids.length} UUID(s) generated</span>
            <button onClick={copyAll} className="text-sm btn-gradient px-3 py-1 rounded">Copy all</button>
          </div>
          <div className="bg-white border rounded-lg p-4 max-h-64 overflow-auto">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex justify-between items-center py-1 font-mono text-sm">
                <code>{uuid}</code>
                <button onClick={() => navigator.clipboard.writeText(uuid)} className="text-purple-600 hover:underline text-xs">Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UuidGenerator;
