import React from "react";
import FileUploader from "../FileProcessor";

function PdfMerge() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Merge PDF Files</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Combine PDFs in the order you want with the easiest PDF merger available.</p>
      <FileUploader />
    </div>
  );
}

export default PdfMerge;
