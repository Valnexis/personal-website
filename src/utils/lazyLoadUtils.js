/**
 * Utility function to add lazy loading to images in HTML content
 * @param {string} htmlContent - The HTML content to process
 * @returns {string} - The processed HTML content with lazy loading added to images
 */
export const addLazyLoadingToImages = (htmlContent) => {
  if (!htmlContent) return htmlContent;
  
  // Simple regex to add loading="lazy" to img tags that don't already have it
  return htmlContent.replace(/<img(?!\s+[^>]*\sloading=)[^>]*>/gi, (match) => {
    return match.replace(/<img/, '<img loading="lazy"');
  });
};