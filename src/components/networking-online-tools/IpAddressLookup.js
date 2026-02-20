import React, { useState } from "react";

const IpAddressLookup = () => {
  const [ip, setIp] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async () => {
    setLoading(true);
    setData(null);
    setError("");
    const query = ip.trim() || "";
    const url = query ? `https://ip-api.com/json/${query}` : "https://ip-api.com/json/";
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.status === "fail") {
        setError(json.message || "Lookup failed");
      } else {
        setData(json);
      }
    } catch (err) {
      setError("Lookup failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">IP Address Lookup</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Look up IP address details. Leave empty to check your own IP.
      </p>
      <div className="w-full max-w-md space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. 8.8.8.8 or leave empty"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button onClick={lookup} disabled={loading} className="btn-gradient px-6 py-2 rounded-lg text-white disabled:opacity-60">
            {loading ? "..." : "Lookup"}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {data && (
          <div className="bg-white rounded-xl border p-6 space-y-2 text-sm">
            <div><span className="font-medium">IP:</span> {data.query}</div>
            <div><span className="font-medium">Country:</span> {data.country}</div>
            <div><span className="font-medium">Region:</span> {data.regionName}</div>
            <div><span className="font-medium">City:</span> {data.city}</div>
            <div><span className="font-medium">ISP:</span> {data.isp}</div>
            <div><span className="font-medium">Org:</span> {data.org}</div>
            <div><span className="font-medium">Timezone:</span> {data.timezone}</div>
            <div><span className="font-medium">Lat/Lon:</span> {data.lat}, {data.lon}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IpAddressLookup;
