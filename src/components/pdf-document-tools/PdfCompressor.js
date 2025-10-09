import React from "react";
import FileUploader from "../FileProcessor";

function PdfCompressor() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Compress PDF file</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Reduce file size while optimizing for maximum PDF quality.</p>
      <FileUploader />
    </div>
  );
}

export default PdfCompressor;
