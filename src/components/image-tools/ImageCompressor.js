import React from 'react'
import FileUploader from "../FileProcessor";

function ImageCompressor() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Image Compressor</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Compress JPG, PNG, SVG or GIF with the best quality and compression. Reduce the filesize of your images at once.</p>
      <FileUploader />
    </div>
  );
}


export default ImageCompressor
