import React from 'react'
import FileUploader from "../FileProcessor";

function ImageCompressor() {
  return (
    <div className="h-[550px] sm:h-[700px] flex flex-col items-center py-28  bg-gray-100">
      <h1 className="text-xl sm:text-5xl font-extrabold sm:font-bold mb-6 text-gray-800">Image Compressor</h1>
      <p className="mb-6 text-xs px-4 sm:text-2xl  text-center">Compress JPG, PNG, SVG or GIF with the best quality and compression. Reduce the filesize of your images at once.</p>
      <FileUploader />
    </div>
  );
}


export default ImageCompressor
