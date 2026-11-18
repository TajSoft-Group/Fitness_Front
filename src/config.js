// Single place for the backend address.
// Set VITE_API_URL in .env / .env.local (see .env.example); falls back to production.
export const API_URL = (import.meta.env.VITE_API_URL || 'https://api.mubingym.com').replace(/\/+$/, '');
