import React from 'react'
import FileUploader from "../FileProcessor";

function BackgroundBlur() {
  return (
    <div className="h-[640px] flex flex-col items-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">
Free blur background tool</h1>
      <p className="mb-6 text-2xl w-1/2 text-center">Blur the background of your photos in seconds with the power of AI. Use our free online background blur tool and make your subject stand out!</p>
      <FileUploader />
    </div>
  );
}


export default BackgroundBlur