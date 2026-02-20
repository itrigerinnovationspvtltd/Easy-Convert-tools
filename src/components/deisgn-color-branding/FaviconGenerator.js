import React, { useState } from "react";

const FaviconGenerator = () => {
  const [text, setText] = useState("EC");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [fgColor, setFgColor] = useState("#ffffff");
  const sizes = [16, 32, 48];

  const generateFavicon = (favSize) => {
    const canvas = document.createElement("canvas");
    canvas.width = favSize;
    canvas.height = favSize;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, favSize, favSize);
    ctx.fillStyle = fgColor;
    ctx.font = `bold ${Math.floor(favSize * 0.55)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const displayText = text.slice(0, 2).toUpperCase() || "?";
    ctx.fillText(displayText, favSize / 2, favSize / 2);
    return canvas.toDataURL("image/png");
  };

  const download = (favSize) => {
    const data = generateFavicon(favSize);
    const a = document.createElement("a");
    a.href = data;
    a.download = `favicon-${favSize}x${favSize}.png`;
    a.click();
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Favicon Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Create simple favicons from text. Max 2 characters.
      </p>
      <div className="w-full max-w-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text (2 chars max)</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 2))}
            maxLength={2}
            placeholder="EC"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
            <div className="flex gap-2">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 cursor-pointer rounded border" />
              <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 px-2 py-1 text-sm font-mono border rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text color</label>
            <div className="flex gap-2">
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 cursor-pointer rounded border" />
              <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1 px-2 py-1 text-sm font-mono border rounded" />
            </div>
          </div>
        </div>

        <div className="flex gap-6 justify-center items-end">
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className="border rounded-lg p-2 bg-white shadow"
                style={{ width: Math.min(s * 2, 96), height: Math.min(s * 2, 96) }}
              >
                <img src={generateFavicon(s)} alt={`${s}x${s}`} width={s} height={s} />
              </div>
              <span className="text-xs text-gray-500 mt-1">{s}×{s}</span>
              <button
                onClick={() => download(s)}
                className="mt-2 px-3 py-1 text-sm btn-gradient rounded text-white"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaviconGenerator;
