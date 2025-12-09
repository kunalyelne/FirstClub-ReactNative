/**
 * Utility functions for generating user greetings
 * Provides time-based personalized greetings
 */

/**
 * Gets a time-appropriate greeting based on current hour
 * @returns A greeting string (e.g., "Good Morning", "Good Afternoon", "Good Evening")
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};
