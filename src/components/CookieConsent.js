import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "easyconvert_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ essential: true, analytics: true, timestamp: Date.now() }));
    setVisible(false);
  };

  const essentialOnly = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ essential: true, analytics: false, timestamp: Date.now() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 shadow-lg"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h2 id="cookie-consent-title" className="text-white font-semibold text-sm sm:text-base mb-1">
            We use cookies
          </h2>
          <p id="cookie-consent-desc" className="text-slate-400 text-xs sm:text-sm">
            We use essential cookies to run the site and optional analytics to improve your experience. 
            By continuing, you accept our use of cookies.{" "}
            <Link to="/privacy" className="text-brand-400 hover:text-brand-300 underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={essentialOnly}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 transition-colors"
          >
            Essential only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 rounded-lg text-sm font-medium btn-gradient"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
