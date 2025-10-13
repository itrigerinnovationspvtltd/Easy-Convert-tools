import React from 'react'
import FileUploader from "../FileProcessor";

function WordTOPdf() {
  return (
    <div className="h-[550px] sm:h-[700px] flex flex-col items-center py-28  bg-gray-100">
      <h1 className="text-xl sm:text-5xl font-extrabold sm:font-bold mb-6 text-gray-800">Convert WORD to PDF</h1>
      <p className="mb-6 text-xs px-4 sm:text-2xl  text-center">Make DOC and DOCX files easy to read by converting them to PDF.</p>
      <FileUploader />
    </div>
  );
}




export default WordTOPdf
