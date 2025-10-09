
import React from 'react'
import FileUploader from "../FileProcessor";

function PdfTOWord() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">PDF to WORD Converter</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Convert your PDF to WORD documents with incredible accuracy.</p>
      <FileUploader />
    </div>
  );
}





export default PdfTOWord
