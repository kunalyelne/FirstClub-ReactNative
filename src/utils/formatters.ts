/**
 * Utility functions for formatting data
 * Centralized formatting logic for consistent display across the app
 */

/**
 * Formats a number with thousand separators
 * @param value - The number to format
 * @returns Formatted string (e.g., "10,000")
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US');
};

/**
 * Formats calories with unit
 * @param calories - The calorie value
 * @returns Formatted string (e.g., "1,500 cal")
 */
export const formatCalories = (calories: number): string => {
  return `${formatNumber(calories)} cal`;
};

/**
 * Formats percentage
 * @param value - The percentage value (0-100)
 * @returns Formatted string (e.g., "75%")
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Formats time duration
 * @param hours - Hours value
 * @returns Formatted string (e.g., "8h 30m")
 */
export const formatDuration = (hours: number): string => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  if (minutes === 0) {
    return `${wholeHours}h`;
  }
  return `${wholeHours}h ${minutes}m`;
};

/**
 * Calculates percentage progress
 * @param current - Current value
 * @param target - Target value
 * @returns Percentage value (0-100)
 */
export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};
