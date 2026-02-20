import React from 'react'


import FileUploader from "../FileProcessor";

function JpegToPng() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Convert your JPEG to PNG in a snap.</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Convert to PNG in seconds with the Easy Convert Tools, free online JPG to PNG converter.</p>
      <FileUploader
              title="Select Jpeg Image"            
              inputAccept="image/jpeg"              
              fileTypeLabel="image"              
              downloadButtonText="Download PNG"  
            />
    </div>
  );
}

export default JpegToPng
