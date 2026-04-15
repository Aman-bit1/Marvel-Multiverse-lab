// Environment Configuration Map
export const ENV = {
  // Safe to expose to client
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ASSET_BASE_URL: process.env.NEXT_PUBLIC_ASSET_BASE_URL || "",
  CHARACTER_ASSET_BASE_URL: process.env.NEXT_PUBLIC_CHARACTER_ASSET_BASE_URL || "",
  
  // Note: Server-side only variables (like GEMINI_API_KEY) should be accessed directly
  // via process.env in server components/routes to prevent accidental bundling to the client.
};
