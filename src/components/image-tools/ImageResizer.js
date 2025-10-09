import React from 'react'

import FileUploader from "../FileProcessor";

function ImageResizer() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Resize IMAGE</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Resize JPG, PNG, SVG or GIF by defining new height and width pixels.Change image dimensions in bulk.</p>
      <FileUploader />
      
    </div>
  );
}


export default ImageResizer
