import React from "react";
import FileUploader from "../FileProcessor";

function BackgroundBlur() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Background Blur Tool</h1>
      <p className="mb-10 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Apply a blur effect to your images. Choose blur intensity and download the result.</p>
      <FileUploader
        title="Select Image"
        inputAccept="image/png,image/jpeg,image/jpg,.png,.jpg,.jpeg"
        fileTypeLabel="image"
        downloadButtonText="Download Blurred Image"
        conversionType="image-blur"
        hideConversionSelect
      />
    </div>
  );
}


export default BackgroundBlur