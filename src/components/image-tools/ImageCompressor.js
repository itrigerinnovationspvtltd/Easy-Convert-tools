import React from 'react'
import FileUploader from "../FileProcessor";

function ImageCompressor() {
  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Image Compressor</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Compress JPG, PNG, SVG or GIF with the best quality and compression. Reduce the filesize of your images at once.</p>
      <FileUploader
        title="Select Image to Compress"
        inputAccept="image/png,image/jpeg,image/jpg,image/gif,.png,.jpg,.jpeg,.gif"
        fileTypeLabel="image"
        downloadButtonText="Download Compressed Image"
        conversionType="image-compress"
        hideConversionSelect
      />
    </div>
  );
}


export default ImageCompressor
