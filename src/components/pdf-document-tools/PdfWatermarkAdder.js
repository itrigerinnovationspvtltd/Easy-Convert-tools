import React, { useState } from "react";
import FileUploader from "../FileProcessor";

function PdfWatermarkAdder() {
  const [watermark, setWatermark] = useState("CONFIDENTIAL");

  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Add watermark into a PDF</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Stamp text over your PDF. Enter watermark text below.</p>
      <div className="w-full max-w-2xl mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Watermark text</label>
        <input
          type="text"
          value={watermark}
          onChange={(e) => setWatermark(e.target.value)}
          placeholder="e.g. CONFIDENTIAL, DRAFT"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <FileUploader
        title="Select PDF File"
        inputAccept="application/pdf"
        fileTypeLabel="pdf file"
        downloadButtonText="Download watermarked PDF"
        conversionType="pdf-watermark"
        hideConversionSelect
        getAdditionalFormData={() => ({ watermarkText: watermark })}
      />
    </div>
  );
}

export default PdfWatermarkAdder;
