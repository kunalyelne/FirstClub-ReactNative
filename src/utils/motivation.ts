/**
 * Utility functions for generating motivational messages
 * Provides dynamic motivational text based on user progress
 */

/**
 * Motivational messages pool
 */
const MOTIVATIONAL_MESSAGES = [
  "You're doing great! Keep pushing forward! 💪",
  'Every step counts towards your goal! 🎯',
  "You've got this! Stay consistent! ✨",
  'Small progress is still progress! 🌟',
  'Your future self will thank you! 🙏',
  'Believe in yourself and keep going! 💫',
  'Consistency beats perfection! 🏆',
  'You are stronger than you think! 💪',
];

/**
 * Gets a random motivational message
 * @returns A motivational string
 */
export const getMotivationalText = (): string => {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  return MOTIVATIONAL_MESSAGES[randomIndex];
};
