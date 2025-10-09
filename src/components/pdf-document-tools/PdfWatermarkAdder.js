import React from 'react'
import FileUploader from "../FileProcessor";

function PdfWatermarkAdder() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Add watermark into a PDF</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.</p>
      <FileUploader />
    </div>
  );
}

export default PdfWatermarkAdder
