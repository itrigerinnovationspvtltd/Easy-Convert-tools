/**
 * Global locale utilities for production-ready internationalization.
 * Uses browser language when available, falls back to sensible defaults.
 */

export const getUserLocale = () => {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "en-US";
};

/**
 * Format a number for display using the user's locale.
 * @param {number} value
 * @param {Object} options - Intl.NumberFormat options (minFractionDigits, maxFractionDigits, etc.)
 */
export const formatNumber = (value, options = {}) => {
  const locale = getUserLocale();
  const defaultOptions = { maximumFractionDigits: 2, minimumFractionDigits: 0, ...options };
  try {
    return new Intl.NumberFormat(locale, defaultOptions).format(value);
  } catch {
    return String(value);
  }
};

/**
 * Format a currency amount without symbol (for use with currency code).
 */
export const formatCurrencyAmount = (value, decimals = 2) => {
  return formatNumber(value, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format currency with symbol/code.
 */
export const formatCurrency = (value, currencyCode = "USD", options = {}) => {
  const locale = getUserLocale();
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(value);
  } catch {
    return `${formatCurrencyAmount(value)} ${currencyCode}`;
  }
};

/**
 * Get locale for date/time formatting (e.g. en-US, en-GB, de-DE).
 */
export const getDateLocale = () => getUserLocale();
