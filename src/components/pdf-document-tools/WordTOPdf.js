import React from 'react'
import FileUploader from "../FileProcessor";

function WordTOPdf() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Convert WORD to PDF</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Make DOC and DOCX files easy to read by converting them to PDF.</p>
      <FileUploader
        title="Select Word File To Convert"
        inputAccept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        fileTypeLabel="Word file"
        downloadButtonText="Download PDF file"
        conversionType="word-to-pdf"
        hideConversionSelect
      />
    </div>
  );
}




export default WordTOPdf
