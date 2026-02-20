import React, { useState } from "react";
import FileUploader from "../FileProcessor";

function ImageResizer() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  return (
    <div className="min-h-[580px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Resize Image</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Resize JPG, PNG or GIF by defining max width and height. Image keeps aspect ratio.</p>
      <FileUploader
        title="Select Image"
        inputAccept="image/png,image/jpeg,image/jpg,image/gif,.png,.jpg,.jpeg,.gif"
        fileTypeLabel="image"
        downloadButtonText="Download Resized Image"
        conversionType="image-resize"
        hideConversionSelect
        conversionTypeResolver={() => `image-resize|${width}|${height}`}
        renderExtraOptions={
          <div className="flex gap-4 mb-4 flex-wrap justify-center">
            <label className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Max Width:</span>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 100))}
                className="input-field w-24 text-center"
                min={1}
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Max Height:</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 100))}
                className="input-field w-24 text-center"
                min={1}
              />
            </label>
          </div>
        }
      />
    </div>
  );
}


export default ImageResizer
