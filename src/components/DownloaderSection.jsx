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
    <div className="min-h-[420px] flex flex-col items-center justify-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">
        {title}
      </h1>

      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">{description}</p>

      <div className="w-full max-w-xl flex flex-col items-center">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-shadow"
        />

        {/* Error UI */}
        {error && (
          <p className="text-red-500 mt-2 text-sm">{error}</p>
        )}

        {/* Loading state */}
        <button
          onClick={handleDownload}
          className={`mt-4 px-8 py-3 rounded-lg shadow-btn-gradient flex items-center justify-center gap-2 min-w-[140px] ${
            loading ? "bg-gray-400 cursor-not-allowed opacity-80" : "btn-gradient"
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            buttonText
          )}
        </button>

        {/* Download Link */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            download
            className="btn-gradient mt-4 inline-block px-6 py-2 rounded-lg text-base font-medium no-underline"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default DownloaderSection;
