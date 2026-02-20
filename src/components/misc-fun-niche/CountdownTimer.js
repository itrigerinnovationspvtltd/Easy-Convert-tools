import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [target, setTarget] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);

  const targetMs = target ? new Date(target).getTime() : 0;
  const diff = targetMs - now;
  let days = 0, hours = 0, mins = 0, secs = 0;
  if (diff > 0) {
    days = Math.floor(diff / 86400000);
    hours = Math.floor((diff % 86400000) / 3600000);
    mins = Math.floor((diff % 3600000) / 60000);
    secs = Math.floor((diff % 60000) / 1000);
  } else if (target && diff <= 0) {
    days = hours = mins = secs = 0;
  }

  const expired = target && diff <= 0;

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Countdown Timer</h1>
      <p className="tool-section-desc">Count down to any date and time.</p>
      <div className="w-full max-w-md space-y-6">
        <div>
          <label className="input-label">Target date & time</label>
          <input
            type="datetime-local"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="input-field"
          />
        </div>
        {target && (
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="card-tool p-5 w-24 text-center">
              <div className="text-2xl font-bold text-gray-800">{days}</div>
              <div className="text-xs text-gray-500 mt-1">Days</div>
            </div>
            <div className="card-tool p-5 w-24 text-center">
              <div className="text-2xl font-bold text-gray-800">{hours}</div>
              <div className="text-xs text-gray-500 mt-1">Hours</div>
            </div>
            <div className="card-tool p-5 w-24 text-center">
              <div className="text-2xl font-bold text-gray-800">{mins}</div>
              <div className="text-xs text-gray-500 mt-1">Mins</div>
            </div>
            <div className="card-tool p-5 w-24 text-center">
              <div className="text-2xl font-bold text-gray-800">{secs}</div>
              <div className="text-xs text-gray-500 mt-1">Secs</div>
            </div>
          </div>
        )}
        {expired && <p className="text-lg font-medium text-green-600 text-center">Time's up!</p>}
      </div>
    </div>
  );
};

export default CountdownTimer;
