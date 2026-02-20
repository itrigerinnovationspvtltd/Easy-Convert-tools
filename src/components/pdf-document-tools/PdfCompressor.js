import React from "react";
import FileUploader from "../FileProcessor";

function PdfCompressor() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Compress PDF file</h1>
      <p className="mb-10 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Reduce file size while optimizing for maximum PDF quality.</p>
      <FileUploader
        title="Select PDF To Compress"
        inputAccept="application/pdf"
        fileTypeLabel="pdf file"
        downloadButtonText="Download Compressed PDF"
        conversionType="pdf-compress"
        hideConversionSelect
      />
    </div>
  );
}

export default PdfCompressor;
