import React from "react";
import FileUploader from "../FileProcessor";

function PngTransparentBackgroundRemover() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Remove the background from your image</h1>
      <p className="mb-10 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Remove white/light backgrounds to create transparent PNG. Works best on images with clear subject and light background.</p>
      <FileUploader
        title="Select Image"
        inputAccept="image/png,image/jpeg,image/jpg,.png,.jpg,.jpeg"
        fileTypeLabel="image"
        downloadButtonText="Download image without background"
        conversionType="png-remove-bg"
        hideConversionSelect
      />
    </div>
  );
}

export default PngTransparentBackgroundRemover;