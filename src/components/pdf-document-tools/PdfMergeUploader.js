import React, { useState, useRef } from "react";
import { API_BASE_URL } from "../../config/api";
import { HiDocument, HiXMark } from "react-icons/hi2";
import { FaCloudUploadAlt } from "react-icons/fa";

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function PdfMergeUploader() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const inputId = useRef("pdf-merge-input").current;

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    const pdfs = selected.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs].slice(0, 20));
    setMessage("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const dt = e.dataTransfer;
    if (dt?.files?.length) {
      const pdfs = Array.from(dt.files).filter((f) => f.type === "application/pdf");
      setFiles((prev) => [...prev, ...pdfs].slice(0, 20));
      setMessage("");
    }
  };

  const removeFile = (i) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setMessage("Please add at least 2 PDF files.");
      return;
    }
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    try {
      const res = await fetch(`${API_BASE_URL}/process-merge`, {
        method: "POST",
        body: formData,
      });
      const ct = res.headers.get("Content-Type") || "";
      if (ct.includes("application/json")) {
        const data = await res.json();
        setMessage(data.result || data.error || "Merge failed.");
      } else {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setMessage("Connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[520px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 gradient-mesh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Merge PDF Files</h1>
      <p className="mb-8 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Combine PDFs in the order you want. Add at least 2 files.</p>

      <div className="w-full max-w-2xl mx-auto space-y-6">
        <input
          type="file"
          id={inputId}
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onClick={() => !loading && document.getElementById(inputId)?.click()}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`
            min-h-[280px] rounded-2xl border-2 border-dashed cursor-pointer
            flex flex-col items-center justify-center gap-4 px-6 py-10
            transition-all duration-300
            ${isDragOver ? "border-brand-500 bg-brand-50/50" : "border-gray-300 hover:border-brand-400 hover:bg-gray-50/80"}
            ${loading ? "pointer-events-none opacity-70" : ""}
          `}
        >
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDragOver ? "bg-brand-100" : "bg-gray-100"}`}>
            <FaCloudUploadAlt className={`w-8 h-8 ${isDragOver ? "text-brand-600" : "text-gray-500"}`} />
          </div>
          <p className="text-lg font-semibold text-gray-800">
            {isDragOver ? "Drop PDF files here" : "Drag & drop PDFs or click to add"}
          </p>
          <label htmlFor={inputId} onClick={(e) => e.stopPropagation()} className="btn-gradient py-3 px-8 rounded-xl cursor-pointer">
            Add PDF Files
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-sm font-medium text-gray-700">Files (order matters):</p>
            <div className="max-h-56 overflow-y-auto space-y-2 rounded-xl border border-gray-200 bg-white p-3">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <HiDocument className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate text-sm">{f.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(f.size)}</p>
                  </div>
                  <button type="button" onClick={() => removeFile(i)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                    <HiXMark className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleMerge}
              disabled={loading || files.length < 2}
              className="btn-gradient w-full py-4 px-8 rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Merging PDFs..." : "Merge PDFs"}
            </button>
          </div>
        )}

        {loading && (
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-soft animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-brand-500 animate-spin" />
              <p className="font-semibold text-gray-800">Merging {files.length} files...</p>
              <div className="w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full animate-processing-bar" />
              </div>
            </div>
          </div>
        )}

        {message && <p className="text-red-500 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}

export default PdfMergeUploader;
