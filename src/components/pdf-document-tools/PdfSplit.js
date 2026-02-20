import React from "react";
import FileUploader from "../FileProcessor";

function PdfSplit() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Split PDF file</h1>
      <p className="mb-10 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Separate each page into its own PDF file. Download as a ZIP.</p>
      <FileUploader
        title="Select PDF To Split"
        inputAccept="application/pdf"
        fileTypeLabel="pdf file"
        downloadButtonText="Download Split PDFs (ZIP)"
        conversionType="pdf-split"
        hideConversionSelect
      />
    </div>
  );
}

export default PdfSplit;
