/**
 * Generate an SVG avatar with initials
 * @param initials - The initials to display (e.g., "SJ")
 * @param color - The background color (default: #667eea)
 * @returns Data URL for the SVG image
 */
export function generateAvatarDataUrl(initials: string, color: string = '#667eea'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <rect fill="${color}" width="300" height="300"/>
    <text fill="#fff" font-size="100" font-family="Arial" x="50%" y="50%" text-anchor="middle" dy=".3em">${initials}</text>
  </svg>`;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Validate and sanitize image URL
 * @param url - The image URL to validate
 * @returns The validated URL or undefined if invalid
 */
export function validateImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  
  // Allow data URLs and http(s) URLs only
  const isValid = url.startsWith('data:image/') || 
                  url.startsWith('http://') || 
                  url.startsWith('https://');
  
  return isValid ? url : undefined;
}
