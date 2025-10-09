import React from 'react'

import FileUploader from "../FileProcessor";

function PngTransparentBackgroundRemover() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">
Remove the background from your image for free.</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Easily remove the background from images in Easy Convert Tools, the quick and easy create-anything app. Continue editing your image in Easy Convert Tools to quickly change the background, add graphics, and more.</p>
      <FileUploader />
    </div>
  );
}


export default PngTransparentBackgroundRemover