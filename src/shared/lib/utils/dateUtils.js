/**
 * Format a date string into a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return '';

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString(undefined, options);
}

/**
 * Format a date string as relative time (e.g. "3h ago", "2d ago", "Just now")
 * Falls back to formatDate if the date is invalid
 * @param {string} dateString - The date string to format
 * @returns {string} - Relative time string
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return formatDate(dateString);

  const diffMs = Date.now() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) return 'Just now';

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;

  return formatDate(dateString);
}