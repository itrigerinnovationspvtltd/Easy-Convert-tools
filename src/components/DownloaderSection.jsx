import { useState } from "react";

const DownloaderSection = ({
  title,
  description,
  placeholder,
  buttonText,
  apiEndpoint,
}) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const validateURL = (input) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleDownload = async () => {
    setError("");
    setDownloadUrl("");

    if (!validateURL(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setDownloadUrl(data.download);
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="h-[560px] sm:h-[800px] flex flex-col items-center py-32 bg-gray-100">
      <h1 className="text-xl sm:text-5xl font-extrabold mb-6 text-gray-800">
        {title}
      </h1>

      <p className="mb-6 text-xs px-4 sm:text-2xl text-center">{description}</p>

      <div className="w-full max-w-xl flex flex-col items-center">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Error UI */}
        {error && (
          <p className="text-red-500 mt-2 text-sm">{error}</p>
        )}

        {/* Loading state */}
        <button
          onClick={handleDownload}
          className={`mt-4 px-8 py-3 text-white rounded-lg text-lg transition ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : buttonText}
        </button>

        {/* Download Link */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="mt-4 text-blue-600 underline text-lg"
          >
            Click here to download
          </a>
        )}
      </div>
    </div>
  );
};

export default DownloaderSection;
