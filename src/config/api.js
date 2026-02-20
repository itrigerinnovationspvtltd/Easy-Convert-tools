/**
 * API configuration - uses REACT_APP_API_URL from environment
 * Falls back to localhost:5000 in development if not set
 */
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
