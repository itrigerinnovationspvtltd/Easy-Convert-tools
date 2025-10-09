import React from 'react'
import FileUploader from "../FileProcessor";

function PngToJpg() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">
Convert PNG to JPG</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Transform PNG images to JPG format.
Convert multiple PNG to JPG online at once.</p>
      <FileUploader />
    </div>
  );
}

export default PngToJpg