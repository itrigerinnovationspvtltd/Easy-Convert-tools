import React from 'react'


import FileUploader from "../FileProcessor";

function JpegToPng() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Convert your JPEG to PNG in a snap.</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Convert to PNG in seconds with the Easy Convert Tools, free online JPG to PNG converter..</p>
      <FileUploader />
    </div>
  );
}

export default JpegToPng
