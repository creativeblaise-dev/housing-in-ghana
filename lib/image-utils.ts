// Import the static mapping - handle the case where it might not exist yet
let staticImageMapping: Record<string, string> = {};

try {
  staticImageMapping = require("../static-images-mapping.json");
} catch (error) {
  console.warn("Static image mapping not found. Images will use local paths.");
}

/**
 * Get the CDN URL for a static image, falling back to local path if not found
 */
export function getImageUrl(localPath: string): string {
  // If it's already a full URL, return as is
  if (localPath.startsWith("http")) {
    return localPath;
  }

  // Ensure the path starts with /
  const normalizedPath = localPath.startsWith("/")
    ? localPath
    : `/${localPath}`;

  // Look up in the mapping
  const cdnUrl = staticImageMapping[normalizedPath];

  // Return CDN URL if found, otherwise return original local path
  return cdnUrl || normalizedPath;
}

/**
 * Hook to get optimized image URL (for client components)
 */
export function useImageUrl(localPath: string): string {
  return getImageUrl(localPath);
}

/**
 * Get multiple image URLs at once
 */
export function getImageUrls(localPaths: string[]): string[] {
  return localPaths.map((path) => getImageUrl(path));
}

/**
 * Check if an image has a CDN URL available
 */
export function hasImageCDN(localPath: string): boolean {
  const normalizedPath = localPath.startsWith("/")
    ? localPath
    : `/${localPath}`;
  return normalizedPath in staticImageMapping;
}
