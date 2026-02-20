import React, { useState, useRef } from "react";
import { API_BASE_URL } from "../config/api";
import { HiDocument, HiXMark } from "react-icons/hi2";
import { FaFileImage, FaCloudUploadAlt } from "react-icons/fa";

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function FileUploader({
  title = "Select File",
  fileTypeLabel = "file",
  inputAccept = ".png,.jpg,.jpeg,.pdf,.docx",
  downloadButtonText = "Download Converted File",
  conversionType: initialConversionType,
  hideConversionSelect = false,
  getAdditionalFormData,
  conversionTypeResolver,
  renderExtraOptions,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [convertedFileURL, setConvertedFileURL] = useState(null);
  const [message, setMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [conversionType, setConversionType] = useState(initialConversionType || "image-to-png");
  const inputId = useRef(`file-input-${Math.random().toString(36).slice(2)}`).current;

  const handleFileChange = (input) => {
    const selectedFile = input?.target?.files?.[0] || input;
    if (!selectedFile) return;
    setFile(selectedFile);
    setMessage("");
    setReady(false);
    setConvertedFileURL(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer?.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }
    setLoading(true);
    setMessage("");
    setReady(false);

    const formData = new FormData();
    formData.append("file", file);
    const resolvedType = conversionTypeResolver ? conversionTypeResolver() : conversionType;
    formData.append("conversionType", resolvedType);
    const extra = getAdditionalFormData?.();
    if (extra && typeof extra === "object") {
      Object.entries(extra).forEach(([k, v]) => formData.append(k, String(v)));
    }

    try {
      const res = await fetch(`${API_BASE_URL}/process-file`, {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        setMessage(data.result || data.error || "Server error. Try again.");
      } else {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setConvertedFileURL(url);
        setReady(true);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFileURL || !file) return;
    const extMap = {
      "pdf-to-word": ".docx",
      "word-to-pdf": ".pdf",
      "image-to-png": ".png",
      "image-to-jpg": ".jpg",
      "pdf-compress": ".pdf",
      "image-compress": ".jpg",
      "image-blur": ".jpg",
      "image-to-webp": ".webp",
      "pdf-split": ".zip",
      "pdf-watermark": ".pdf",
      "png-remove-bg": ".png",
    };
    const ct = conversionTypeResolver ? conversionTypeResolver() : conversionType;
    const ext = extMap[ct?.split("|")[0]] || extMap[ct] || ".jpg";
    const a = document.createElement("a");
    a.href = convertedFileURL;
    a.download = `converted_${file.name.replace(/\.[^/.]+$/, "")}${ext}`;
    a.click();
  };

  const clearFile = () => {
    setFile(null);
    setReady(false);
    setConvertedFileURL(null);
    setMessage("");
  };

  const isImage = inputAccept.toLowerCase().includes("image");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="file"
        id={inputId}
        accept={inputAccept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drop zone - visible when no file or when file but not loading/ready */}
      {(!file || (!loading && !ready)) && (
        <div
          onClick={() => !loading && document.getElementById(inputId)?.click()}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`
            relative min-h-[320px] sm:min-h-[360px] rounded-2xl border-2 border-dashed cursor-pointer
            flex flex-col items-center justify-center gap-4 px-6 py-12
            transition-all duration-300 select-none
            ${isDragOver
              ? "border-brand-500 bg-brand-50/50 scale-[1.01]"
              : "border-gray-300 hover:border-brand-400 hover:bg-gray-50/80"
            }
            ${loading ? "pointer-events-none opacity-70" : ""}
          `}
        >
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${isDragOver ? "bg-brand-100" : "bg-gray-100"}`}>
            <FaCloudUploadAlt className={`w-10 h-10 ${isDragOver ? "text-brand-600" : "text-gray-500"}`} />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              {isDragOver ? "Drop your file here" : `Drag & drop your ${fileTypeLabel} here`}
            </p>
            <p className="text-sm text-gray-500 mt-1">or click to browse</p>
          </div>
          <label
            htmlFor={inputId}
            onClick={(e) => e.stopPropagation()}
            className="btn-gradient py-3 px-8 rounded-xl text-sm font-medium cursor-pointer shadow-sm"
          >
            {title}
          </label>
          {message && !file && (
            <p className="text-red-500 text-sm mt-2">{message}</p>
          )}
        </div>
      )}

      {/* File selected - actions */}
      {file && !loading && !ready && (
        <div className="mt-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-soft">
            <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
              {isImage ? (
                <FaFileImage className="w-7 h-7 text-brand-600" />
              ) : (
                <HiDocument className="w-7 h-7 text-brand-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
            <button
              onClick={clearFile}
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="Remove file"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {renderExtraOptions}
          {!hideConversionSelect && (
            <div>
              <label className="input-label">Output format</label>
              <select
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
                className="input-field max-w-xs"
              >
                <option value="image-to-png">Convert to PNG</option>
                <option value="image-to-jpg">Convert to JPG</option>
                <option value="pdf-to-word">PDF → Word</option>
                <option value="word-to-pdf">Word → PDF</option>
              </select>
            </div>
          )}

          <button
            onClick={handleConvert}
            className="btn-gradient w-full sm:w-auto py-4 px-10 rounded-xl text-base font-semibold shadow-btn-gradient"
          >
            Convert Now
          </button>
        </div>
      )}

      {/* Loading / Processing */}
      {loading && (
        <div className="mt-6 p-8 rounded-2xl bg-white border border-gray-200 shadow-soft animate-fade-in">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-brand-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-brand-600">...</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">Processing your {fileTypeLabel}</p>
              <p className="text-sm text-gray-500 mt-1">This usually takes a few seconds</p>
            </div>
            <div className="w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full animate-processing-bar" />
            </div>
          </div>
        </div>
      )}

      {/* Success - Download */}
      {ready && (
        <div className="mt-6 p-8 rounded-2xl bg-white border border-green-200 bg-green-50/30 shadow-soft animate-fade-in">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">Conversion complete</p>
              <p className="text-sm text-gray-500 mt-1">Your file is ready to download</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-gradient py-4 px-8 rounded-xl text-base font-semibold shadow-btn-gradient"
              >
                {downloadButtonText}
              </button>
              <button
                onClick={clearFile}
                className="btn-secondary py-4 px-6 rounded-xl"
              >
                Convert another file
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (file || loading) && (
        <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
      )}
    </div>
  );
}

export default FileUploader;
