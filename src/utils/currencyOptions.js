/**
 * Global currency options for finance tools.
 * Symbol + code for display; supports major world currencies.
 */
export const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
  { code: "PLN", symbol: "zł", name: "Polish Złoty" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
  { code: "COP", symbol: "COL$", name: "Colombian Peso" },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
];

/**
 * Suggest default currency from user locale.
 */
export const getDefaultCurrency = () => {
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";
  const map = {
    "en-US": "USD",
    "en-GB": "GBP",
    "en-AU": "AUD",
    "en-CA": "CAD",
    "en-IN": "INR",
    "de": "EUR",
    "de-DE": "EUR",
    "fr": "EUR",
    "fr-FR": "EUR",
    "es": "EUR",
    "es-ES": "EUR",
    "es-MX": "MXN",
    "es-CO": "COP",
    "pt": "BRL",
    "pt-BR": "BRL",
    "ja": "JPY",
    "zh": "CNY",
    "zh-CN": "CNY",
    "zh-TW": "TWD",
    "ko": "KRW",
    "hi": "INR",
    "ru": "RUB",
    "ar": "AED",
    "tr": "TRY",
    "id": "IDR",
    "pl": "PLN",
    "sv": "SEK",
    "no": "NOK",
    "th": "THB",
    "vi": "VND",
  };
  const region = locale.split("-")[0];
  return map[locale] || map[region] || "USD";
};

export const getCurrencyByCode = (code) =>
  CURRENCY_OPTIONS.find((c) => c.code === code) || CURRENCY_OPTIONS[0];
