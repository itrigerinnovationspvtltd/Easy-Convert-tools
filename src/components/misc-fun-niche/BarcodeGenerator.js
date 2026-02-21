import React, { useState } from "react";
import { getProductionFilename } from "../../utils/downloadFilename";

// Use free barcode image API - no npm dependency
const BARCODE_API = "https://barcode.tec-it.com/barcode.ashx";

const BarcodeGenerator = () => {
  const [value, setValue] = useState("123456789");
  const [format, setFormat] = useState("Code128");

  const url = value.trim()
    ? `${BARCODE_API}?data=${encodeURIComponent(value)}&code=${format}&dpi=96`
    : null;

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Barcode Generator</h1>
      <p className="tool-section-desc">Create barcodes from text or numbers.</p>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="input-label">Data</label>
          <input type="text" placeholder="123456789" value={value} onChange={(e) => setValue(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="input-label">Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="input-field">
            <option value="Code128">Code 128</option>
            <option value="Code39">Code 39</option>
            <option value="EAN13">EAN-13</option>
            <option value="EAN8">EAN-8</option>
            <option value="UPCA">UPC-A</option>
          </select>
        </div>
        {url && (
          <div className="card-tool p-6 flex flex-col items-center">
            <img src={url} alt="Barcode" className="max-w-full h-auto" />
            <a href={url} download={getProductionFilename("png")} className="mt-4 btn-gradient px-6 py-2.5 rounded-xl text-white inline-block">
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeGenerator;
