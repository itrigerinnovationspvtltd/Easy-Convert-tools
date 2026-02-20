
import React from 'react'
import FileUploader from "../FileProcessor";

function PdfTOWord() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">PDF to WORD Converter</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Convert your PDF to WORD documents with incredible accuracy.</p>
      <FileUploader
        title="Select PDF To Convert"
        inputAccept="application/pdf,.pdf"
        fileTypeLabel="PDF file"
        downloadButtonText="Download Word file"
        conversionType="pdf-to-word"
        hideConversionSelect
      />
    </div>
  );
}





export default PdfTOWord
