/**
 * Utility functions for formatting data
 */

/**
 * Format transcript string by adding spaces after commas
 * @param {string} transcript - The transcript string to format
 * @returns {string} - Formatted transcript string with spaces after commas
 */
exports.formatTranscript = (transcript) => {
  if (!transcript) return transcript;
  
  // Replace each comma with a comma followed by a space
  return transcript.replace(/,/g, ', ');
}; 