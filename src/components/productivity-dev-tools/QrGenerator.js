import React, { useState } from "react";
import { getProductionFilename } from "../../utils/downloadFilename";

const QR_API = "https://api.qrserver.com/v1/create-qr-code/";

const QrGenerator = () => {
  const [input, setInput] = useState("");
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(input.trim());
  const qrUrl = input.trim() ? `${QR_API}?size=${size}x${size}&data=${encoded}` : null;

  const copyImageUrl = () => {
    if (qrUrl) {
      navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = getProductionFilename("png");
    a.click();
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">QR Code Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Create QR codes for URLs, text, or any data. Works entirely in your browser.
      </p>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (URL or text)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com or any text"
            className="w-full px-3 py-2 border rounded-lg h-24 resize-none"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size: {size}px</label>
          <input
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        {qrUrl && (
          <div className="bg-white rounded-xl border p-6 flex flex-col items-center">
            <img src={qrUrl} alt="QR Code" className="w-full max-w-[256px] h-auto" />
            <div className="flex gap-2 mt-4">
              <button onClick={download} className="btn-gradient px-6 py-2 rounded-lg text-white">
                Download
              </button>
              <button onClick={copyImageUrl} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                {copied ? "Copied!" : "Copy image URL"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
