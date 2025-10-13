import React, { useState } from "react";

function FileUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);
    setLoading(true);
    setReady(false);

    setTimeout(() => {
      setLoading(false);
      setReady(true);
    }, 2000);
  };

  const handleDownload = () => {
    alert("Your file is ready to download!");
  };

  return (
    <div className=" py-8 text-center">
      {/* Upload button */}
      {!file && (
        <div>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="bg-red-600 hover:bg-red-700 text-base sm:text-3xl text-white  py-4 px-14 rounded-2xl cursor-pointer"
          >
           Select  File
          </label>
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex flex-col items-center mt-4">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-gray-700 mt-3">Processing your file...</p>
        </div>
      )}

      {/* Download button */}
      {ready && (
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-800 font-medium mb-2">
            File ready: {file.name}
          </p>
          <button
            onClick={handleDownload}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-14 rounded-2xl"
          >
            Download File
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
