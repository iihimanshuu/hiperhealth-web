// Simple API base for the frontend. Use Vite env var VITE_API_URL to override.
export const API_BASE = import.meta.env.VITE_API_URL || '';

export function api(path){
  return `${API_BASE}${path}`;
}
