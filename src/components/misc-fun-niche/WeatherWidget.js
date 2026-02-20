import React, { useState } from "react";

// Open-Meteo is free, no API key required
const API = "https://api.open-meteo.com/v1/forecast";

function WeatherWidget() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      const geoData = await geoRes.json();
      const loc = geoData.results?.[0];
      if (!loc) {
        setError("City not found.");
        return;
      }
      const res = await fetch(
        `${API}?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
      );
      const json = await res.json();
      const codes = { 0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Foggy", 61: "Rain", 80: "Rain showers", 95: "Thunderstorm" };
      setData({
        temp: json.current?.temperature_2m ?? 0,
        unit: json.current_units?.temperature_2m ?? "°C",
        humidity: json.current?.relative_humidity_2m ?? 0,
        code: codes[json.current?.weather_code] ?? "Unknown",
        city: loc.name,
      });
    } catch {
      setError("Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Weather Widget</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Search weather by city. Uses free Open-Meteo API.</p>
      <div className="w-full max-w-md space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Enter city name"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button onClick={search} disabled={loading} className="btn-gradient px-6 py-2 rounded-lg disabled:opacity-60">
            {loading ? "..." : "Search"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {data && (
          <div className="bg-white rounded-2xl border p-6 text-center">
            <div className="text-2xl font-bold text-gray-800">{data.city}</div>
            <div className="text-5xl font-bold text-gray-800 mt-2">{data.temp}{data.unit}</div>
            <div className="text-gray-600 mt-1">{data.code}</div>
            <div className="text-sm text-gray-500 mt-2">Humidity: {data.humidity}%</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherWidget;
