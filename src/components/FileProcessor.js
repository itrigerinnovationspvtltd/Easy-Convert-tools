import React, { useState, useRef } from "react";

function FileUploader({
  title = "Select File",
  inputAccept = "image/*", // Only images
  downloadButtonText = "Download File",
  fileTypeLabel = "image",
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [convertedFileURL, setConvertedFileURL] = useState(null);
  const [message, setMessage] = useState("");
  const dropRef = useRef(null);

  const handleFileChange = (input) => {
    let selectedFile;
    if (input?.target?.files) selectedFile = input.target.files[0];
    else selectedFile = input;

    if (!selectedFile) return;
    setFile(selectedFile);
    setReady(false);
    setConvertedFileURL(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e.dataTransfer.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    setMessage("");
    setReady(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/process-image", {
        method: "POST",
        body: formData,
      });

      if (res.headers.get("Content-Type")?.includes("application/json")) {
        // Python returned JSON output
        const data = await res.json();
        setMessage(data.result || "No message from Python");
      } else {
        // Python returned a file → convert it to blob for download
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setConvertedFileURL(url);
        setReady(true);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error occurred while processing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFileURL) return;
    const a = document.createElement("a");
    a.href = convertedFileURL;
    a.download = `converted_${file.name.replace(/\.[^/.]+$/, "")}.jpg`;
    a.click();
  };

  return (
    <div className="py-8 text-center">
      {/* Upload button */}
      {!file && (
        <>
          <input
            type="file"
            id="fileInput"
            accept={inputAccept}
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="bg-red-600 hover:bg-red-700 text-base sm:text-3xl text-white py-4 px-14 rounded-2xl cursor-pointer"
          >
            {title}
          </label>

          {/* Drag & Drop Zone */}
          <div
            ref={dropRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="mt-6 border-4 border-dashed border-gray-300 hover:border-red-500 rounded-xl py-16 bg-gray-50 text-gray-500 font-medium text-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
          >
            Drag & Drop your {fileTypeLabel} here
          </div>
        </>
      )}

      {/* Show selected file */}
      {file && (
        <div className="mt-6">
          <p className="text-gray-700 font-medium mb-4">
            Selected file: {file.name}
          </p>
          <button
            onClick={handleConvert}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded-lg"
          >
            Convert Now
          </button>
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex flex-col items-center mt-4">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-gray-700 mt-3">
            Processing your {fileTypeLabel}...
          </p>
        </div>
      )}

      {/* Download button */}
      {ready && (
        <div className="mt-6">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-10 rounded-lg"
          >
            {downloadButtonText}
          </button>
        </div>
      )}

      {/* Python message */}
      {message && <p className="mt-6 text-gray-700">{message}</p>}
    </div>
  );
}

export default FileUploader;
