import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FaPlus, FaSyncAlt, FaExchangeAlt, FaCog, FaCalendarAlt } from "react-icons/fa";
import { getUserLocale } from "../../utils/locale";

// Get all IANA timezones (with fallback for older browsers)
const getAllTimezones = () => {
  try {
    if (typeof Intl !== "undefined" && Intl.supportedValuesOf) {
      return Intl.supportedValuesOf("timeZone");
    }
  } catch (_) {}
  return [
    "UTC", "America/New_York", "America/Los_Angeles", "America/Chicago",
    "America/Denver", "Europe/London", "Europe/Paris", "Europe/Berlin",
    "Europe/Moscow", "Asia/Tokyo", "Asia/Shanghai", "Asia/Dubai",
    "Asia/Kolkata", "Australia/Sydney", "Pacific/Auckland", "Africa/Cairo",
  ];
};

const DEFAULT_ZONES = ["America/Los_Angeles", "America/New_York", "Europe/London"];
const TIMEZONES = getAllTimezones();

// Parse URL params for shareable links
const parseUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const zonesParam = params.get("zones");
  const hour24 = params.get("hour24") === "1";
  const zones = zonesParam
    ? zonesParam.split(",").filter((z) => TIMEZONES.includes(z))
    : null;
  return { zones, hour24 };
};

// Get timezone abbreviation (e.g. PST, EST)
const getTzAbbrev = (date, tz) => {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "short",
    });
    const parts = fmt.formatToParts(date);
    const p = parts.find((x) => x.type === "timeZoneName");
    return p ? p.value : tz.split("/").pop();
  } catch (_) {
    return tz.split("/").pop();
  }
};

// Get GMT offset string (e.g. GMT-8, GMT+5:30)
const getGmtOffset = (date, tz) => {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "longOffset",
    });
    const parts = fmt.formatToParts(date);
    const p = parts.find((x) => x.type === "timeZoneName");
    return p ? p.value.replace("GMT", "GMT ") : "";
  } catch (_) {
    return "";
  }
};

// Get full timezone name (e.g. Pacific Standard Time)
const getTzLongName = (date, tz) => {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "long",
    });
    const parts = fmt.formatToParts(date);
    const p = parts.find((x) => x.type === "timeZoneName");
    return p ? p.value : tz;
  } catch (_) {
    return tz;
  }
};

// Format time for display (locale-aware)
const formatTime = (date, tz, hour24) => {
  const locale = getUserLocale();
  return date.toLocaleString(locale, {
    timeZone: tz,
    hour12: !hour24,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Format weekday + date (locale-aware)
const formatDay = (date, tz) => {
  const locale = getUserLocale();
  return date.toLocaleString(locale, {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Get hour as 0-24 for slider (decimal for minutes)
const getHourDecimal = (date, tz) => {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts = fmt.formatToParts(date);
  const h = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
  const m = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
  return h + m / 60;
};

// 24-hour Time Slider with day/night visualization
const TimeSlider = ({ date, tz, onChange }) => {
  const hourDecimal = getHourDecimal(date, tz);
  const percent = (hourDecimal / 24) * 100;

  const handleMouseDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const update = (clientX) => {
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const h = Math.floor(x * 24);
      const m = Math.round((x * 24 - h) * 60);
      onChange(h, m);
    };
    update(e.clientX);
    const move = (ev) => update(ev.clientX);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handleTouchStart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const h = Math.floor(x * 24);
    const m = Math.round((x * 24 - h) * 60);
    onChange(h, m);
  };

  return (
    <div className="mt-4">
      <div
        className="relative h-10 rounded-lg overflow-hidden cursor-pointer select-none bg-gradient-to-r from-indigo-900 via-sky-200 to-indigo-900"
        style={{
          background: "linear-gradient(to right, #1e3a5f 0%, #7dd3fc 25%, #fef08a 50%, #fcd34d 75%, #1e3a5f 100%)",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Day/night gradient: 6am-6pm = day (lighter), rest = night (darker) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #1e293b 0%, #1e293b 25%, #93c5fd 37.5%, #fef08a 50%, #93c5fd 62.5%, #1e293b 75%, #1e293b 100%)",
            opacity: 0.85,
          }}
        />
        {/* Enhanced draggable handle - sleek pill with grip */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-10 cursor-grab active:cursor-grabbing transition-transform active:scale-95"
          style={{ left: `calc(${percent}% - 12px)` }}
        >
          <div
            className="w-6 h-10 rounded-xl flex flex-col items-center justify-center gap-1"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #e2e8f0 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex flex-col gap-1">
              <div className="w-3 h-0.5 rounded-full bg-slate-400/80" />
              <div className="w-3 h-0.5 rounded-full bg-slate-400/80" />
              <div className="w-3 h-0.5 rounded-full bg-slate-400/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimezoneConverter = () => {
  const initial = useMemo(() => parseUrlParams(), []);
  const [zones, setZones] = useState(initial.zones || DEFAULT_ZONES);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);
  const [hour24, setHour24] = useState(initial.hour24 ?? false);
  const [baseDate, setBaseDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [baseTime, setBaseTime] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  });
  const [baseZone, setBaseZone] = useState(zones[0] || "UTC");
  const [copied, setCopied] = useState(null);

  // Base moment in UTC
  const baseMoment = useMemo(() => {
    const [h, m] = baseTime.split(":").map(Number);
    const hour = isNaN(h) ? 0 : h;
    const minute = isNaN(m) ? 0 : m;
    let utc = new Date(`${baseDate}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00.000Z`);
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: baseZone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const parts = fmt.formatToParts(utc);
    const get = (t) => parseInt(parts.find((p) => p.type === t)?.value || "0", 10);
    const ch = get("hour");
    const cm = get("minute");
    const diffMs = ((hour - ch) * 60 + (minute - cm)) * 60 * 1000;
    return new Date(utc.getTime() + diffMs);
  }, [baseDate, baseTime, baseZone]);

  const filteredZones = useMemo(() => {
    if (!search.trim()) return TIMEZONES.slice(0, 80);
    const q = search.toLowerCase();
    return TIMEZONES.filter((z) => z.toLowerCase().includes(q)).slice(0, 80);
  }, [search]);

  const addZone = (tz) => {
    if (!zones.includes(tz)) setZones([...zones, tz]);
    setSearch("");
    setShowDropdown(false);
  };

  const addFirstMatch = () => {
    if (filteredZones.length > 0) addZone(filteredZones[0]);
    else if (search.trim()) {
      const q = search.toLowerCase();
      const found = TIMEZONES.find((z) => z.toLowerCase().includes(q));
      if (found) addZone(found);
    }
  };

  const removeZone = (tz) => {
    setZones(zones.filter((z) => z !== tz));
    if (baseZone === tz && zones.length > 1) setBaseZone(zones[1] || "UTC");
  };

  const swapOrder = () => {
    if (zones.length >= 2) {
      const [a, b, ...rest] = zones;
      setZones([b, a, ...rest]);
      if (baseZone === a) setBaseZone(b);
      else if (baseZone === b) setBaseZone(a);
    }
  };

  const resetToNow = () => {
    const d = new Date();
    setBaseDate(d.toISOString().slice(0, 10));
    setBaseTime(
      `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
    );
  };

  const updateBaseFromZone = (tz, h, m) => {
    if (h !== undefined && m !== undefined) {
      setBaseTime(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      setBaseZone(tz);
      return;
    }
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const parts = fmt.formatToParts(baseMoment);
    const get = (t) => parts.find((p) => p.type === t)?.value || "0";
    setBaseDate(`${get("year")}-${get("month")}-${get("day")}`);
    setBaseTime(`${get("hour")}:${get("minute")}`);
    setBaseZone(tz);
  };

  const handleSliderChange = useCallback((tz, h, m) => {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = fmt.formatToParts(baseMoment);
    const get = (t) => parts.find((p) => p.type === t)?.value || "0";
    setBaseDate(`${get("year")}-${get("month")}-${get("day")}`);
    setBaseTime(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    setBaseZone(tz);
  }, [baseMoment]);

  const copyText = (format) => {
    const locale = getUserLocale();
    const fn = format === "short"
      ? (d, tz) => d.toLocaleString(locale, { timeZone: tz, hour12: false, hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" })
      : (d, tz) => d.toLocaleString(locale, { timeZone: tz, hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long", month: "long", day: "numeric", year: "numeric" });
    const lines = zones.map((tz) => `${tz}: ${fn(baseMoment, tz)}`);
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(format);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const shareLink = () => {
    const params = new URLSearchParams();
    params.set("zones", zones.join(","));
    if (hour24) params.set("hour24", "1");
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied("share");
      setTimeout(() => setCopied(null), 1500);
    });
  };

  useEffect(() => {
    if (zones.length > 0 && !zones.includes(baseZone)) setBaseZone(zones[0]);
  }, [zones, baseZone]);

  useEffect(() => {
    const fn = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setShowSettings(false);
    };
    if (showSettings) document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, [showSettings]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("zones", zones.join(","));
    if (hour24) params.set("hour24", "1");
    else params.delete("hour24");
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  }, [zones, hour24]);

  return (
    <div className="tool-section">
      <div className="w-full max-w-4xl">
        {/* Top bar: title + icon buttons */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="tool-section-title !mb-0">Time Zone Converter</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetToNow}
              className="btn-secondary p-2"
              title="Reset to current time"
            >
              <FaSyncAlt className="text-gray-600" />
            </button>
            <button
              type="button"
              onClick={swapOrder}
              className="btn-secondary p-2"
              title="Swap order"
            >
              <FaExchangeAlt className="text-gray-600" />
            </button>
            <div className="relative" ref={settingsRef}>
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
                title="Settings"
              >
                <FaCog className="text-gray-600" />
              </button>
              {showSettings && (
                <div className="absolute right-0 top-full mt-1 py-2 px-3 bg-white rounded-lg border shadow-lg z-20 min-w-[140px]">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={hour24}
                      onChange={(e) => setHour24(e.target.checked)}
                    />
                    24-hour format
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search + Date row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Time zone or city"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && addFirstMatch()}
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={addFirstMatch}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2 shrink-0"
              >
                <FaPlus /> Add
              </button>
            </div>
            {showDropdown && filteredZones.length > 0 && (
              <div className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto bg-white rounded-xl border shadow-lg">
                {filteredZones.map((tz) => (
                  <button
                    key={tz}
                    type="button"
                    onClick={() => addZone(tz)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-800 text-sm"
                  >
                    {tz}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="input-field max-w-[180px]"
            />
          </div>
        </div>

        {/* Timezone cards with 24h slider */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((tz) => (
            <div
              key={tz}
              className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 hover:shadow-card-hover transition-shadow"
            >
              <button
                type="button"
                onClick={() => updateBaseFromZone(tz)}
                className="text-left w-full"
              >
                <div className="text-xl font-bold text-gray-900">
                  {getTzAbbrev(baseMoment, tz)}
                </div>
                <div className="text-sm text-gray-500 -mt-0.5">
                  {getTzLongName(baseMoment, tz)}
                </div>
              </button>
              <div className="mt-3 text-2xl font-semibold text-gray-800">
                {formatTime(baseMoment, tz, hour24)}
              </div>
              <div className="text-sm text-gray-500">
                {getGmtOffset(baseMoment, tz)} · {formatDay(baseMoment, tz)}
              </div>
              <TimeSlider
                date={baseMoment}
                tz={tz}
                onChange={(h, m) => handleSliderChange(tz, h, m)}
              />
              <button
                type="button"
                onClick={() => removeZone(tz)}
                className="mt-3 text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {zones.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Search and add a time zone above to get started.
          </p>
        )}

        {/* Copy / Share */}
        {zones.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              type="button"
              onClick={() => copyText("short")}
              className="btn-secondary text-sm"
            >
              {copied === "short" ? "Copied!" : "Copy short"}
            </button>
            <button
              type="button"
              onClick={() => copyText("extended")}
              className="btn-secondary text-sm"
            >
              {copied === "extended" ? "Copied!" : "Copy extended"}
            </button>
            <button
              type="button"
              onClick={shareLink}
              className="btn-secondary text-sm"
            >
              {copied === "share" ? "Link copied!" : "Share link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimezoneConverter;
