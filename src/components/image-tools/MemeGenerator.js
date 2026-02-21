import React, { useState, useRef } from "react";
import { getProductionFilename } from "../../utils/downloadFilename";

const DEFAULT_IMG = "https://i.imgflip.com/1g8my4.jpg"; // Drake meme template

function MemeGenerator() {
  const [imgUrl, setImgUrl] = useState(DEFAULT_IMG);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [imgError, setImgError] = useState(false);
  const canvasRef = useRef(null);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      ctx.font = "bold 48px Impact";
      ctx.lineWidth = 2;
      const maxW = img.width - 20;
      const wrap = (txt, x) => {
        const words = txt.split(" ");
        let line = "";
        const lines = [];
        for (const w of words) {
          const test = line + w + " ";
          const m = ctx.measureText(test);
          if (m.width > maxW && line) {
            lines.push(line);
            line = w + " ";
          } else line = test;
        }
        if (line) lines.push(line);
        return lines;
      };
      const topLines = wrap(topText, img.width / 2);
      topLines.forEach((line, i) => {
        const y = 60 + i * 55;
        ctx.strokeText(line, img.width / 2, y);
        ctx.fillText(line, img.width / 2, y);
      });
      const botLines = wrap(bottomText, img.width / 2);
      botLines.forEach((line, i) => {
        const y = img.height - 60 - (botLines.length - 1 - i) * 55;
        ctx.strokeText(line, img.width / 2, y);
        ctx.fillText(line, img.width / 2, y);
      });
    };
    img.onerror = () => setImgError(true);
    img.src = imgUrl;
    setImgError(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      ctx.font = "bold 48px Impact";
      ctx.lineWidth = 2;
      const maxW = img.width - 20;
      const wrap = (txt) => {
        const words = txt.split(" ");
        let line = "";
        const lines = [];
        for (const w of words) {
          const test = line + w + " ";
          const m = ctx.measureText(test);
          if (m.width > maxW && line) { lines.push(line); line = w + " "; } else line = test;
        }
        if (line) lines.push(line);
        return lines;
      };
      wrap(topText).forEach((line, i) => {
        const y = 60 + i * 55;
        ctx.strokeText(line, img.width / 2, y);
        ctx.fillText(line, img.width / 2, y);
      });
      const botLines = wrap(bottomText);
      botLines.forEach((line, i) => {
        const y = img.height - 60 - (botLines.length - 1 - i) * 55;
        ctx.strokeText(line, img.width / 2, y);
        ctx.fillText(line, img.width / 2, y);
      });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = getProductionFilename("png");
      a.click();
    };
    img.onerror = () => setImgError(true);
    img.src = imgUrl;
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Meme Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Add top and bottom text to create memes.</p>
      <div className="w-full max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Paste image URL (e.g. from imgflip.com)"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top text</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Top text"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bottom text</label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Bottom text"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={drawMeme} className="btn-gradient px-6 py-2 rounded-lg">Preview</button>
          <button onClick={handleDownload} className="btn-secondary px-6 py-2 rounded-lg">Download PNG</button>
        </div>
        {imgError && <p className="text-red-500 text-sm">Could not load image. Try another URL.</p>}
        <canvas ref={canvasRef} className="max-w-full border rounded-lg bg-gray-100" style={{ maxHeight: 400 }} />
      </div>
    </div>
  );
}

export default MemeGenerator;
