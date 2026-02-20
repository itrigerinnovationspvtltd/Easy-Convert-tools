import React from 'react'
import FileUploader from "../FileProcessor";

function PngToJpg() {

  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">
Convert PNG to JPG</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Transform PNG images to JPG format. Convert PNG to JPG online for free.</p>
      
      {/* Reusable FileUploader with props for PNG → JPG */}
      <FileUploader
        title="Select PNG Images"
        inputAccept="image/png,.png"
        fileTypeLabel="PNG image"
        downloadButtonText="Download JPG"
        conversionType="image-to-jpg"
        hideConversionSelect
      />
    </div>
  );
}

export default PngToJpg