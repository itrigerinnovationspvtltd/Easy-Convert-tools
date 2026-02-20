import React, { useState } from "react";

function checkStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  return { score, label: levels[Math.min(score, 5)] };
}

function PwdStrengthChecker() {
  const [password, setPassword] = useState("");
  const strength = checkStrength(password);

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Password Strength Checker</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">Check how strong your password is.</p>
      <div className="w-full max-w-md">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
        {password && (
          <div className="mt-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${
                    i <= strength.score ? (strength.score <= 2 ? "bg-red-500" : strength.score <= 4 ? "bg-yellow-500" : "bg-green-500") : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm font-medium">{strength.label}</p>
            <p className="text-xs text-gray-500 mt-2">{password.length} characters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PwdStrengthChecker;
