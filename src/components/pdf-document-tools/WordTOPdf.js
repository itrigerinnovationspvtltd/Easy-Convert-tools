import React from 'react'
import FileUploader from "../FileProcessor";

function WordTOPdf() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Convert WORD to PDF</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Make DOC and DOCX files easy to read by converting them to PDF.</p>
      <FileUploader />
    </div>
  );
}




export default WordTOPdf
