import React from "react";
import FileUploader from "../FileProcessor";

function ImageToWebP() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Image to WebP</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Convert JPG, PNG or GIF to WebP format for smaller file sizes and better web performance.</p>
      <FileUploader
        title="Select Image"
        inputAccept="image/png,image/jpeg,image/jpg,image/gif,.png,.jpg,.jpeg,.gif"
        fileTypeLabel="image"
        downloadButtonText="Download WebP"
        conversionType="image-to-webp"
        hideConversionSelect
      />
    </div>
  );
}

export default ImageToWebP;
