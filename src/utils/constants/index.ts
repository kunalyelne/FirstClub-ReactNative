/**
 * Application-wide constants
 * Centralized constants for easy maintenance and consistency
 */

import {MetricType, QuickActionType, SuggestionType} from '../../domain/interfaces';

/**
 * Default target values for health metrics
 */
export const DEFAULT_TARGETS = {
  CALORIES: 2000,
  STEPS: 10000,
  WATER_GLASSES: 8,
  SLEEP_HOURS: 8,
} as const;

/**
 * Color palette for the application
 */
export const Colors = {
  primary: '#FF6B35',
  secondary: '#F7931E',
  accent: '#4ECDC4',
  background: '#000000',
  surface: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  // Metric colors
  steps: '#4ECDC4',
  calories: '#FF6B35',
  water: '#2196F3',
  sleep: '#9C27B0',
  heartRate: '#F44336',
  activeMinutes: '#4CAF50',
} as const;

/**
 * Screen text constants for Home Screen
 */
export const HomeScreenText = {
  todaysProgressTitle: "Today's Progress",
  trackCaloriesTitle: 'Track Calories',
  quickActionsTitle: 'Quick Actions',
  metricsTitle: 'Metrics',
  smartSuggestionsTitle: 'Smart Suggestions',
  recentActivityTitle: 'Recent Activity',
  poweredByAI: 'Powered by AI',
  viewAllButton: 'View All',
  noMetricsAvailable: 'No metrics available',
} as const;

/**
 * Icon mappings for metric types
 */
export const MetricIcons: Record<MetricType, string> = {
  [MetricType.STEPS]: '👣',
  [MetricType.CALORIES]: '🔥',
  [MetricType.WATER]: '💧',
  [MetricType.SLEEP]: '😴',
  [MetricType.HEART_RATE]: '❤️',
};

/**
 * Icon mappings for quick actions
 */
export const QuickActionIcons: Record<QuickActionType, string> = {
  [QuickActionType.TRACK_CALORIES]: '🍽️',
  [QuickActionType.ADJUST_GOAL]: '🎯',
  [QuickActionType.WORKOUT]: '💪',
  [QuickActionType.WATER]: '💧',
  [QuickActionType.SLEEP]: '😴',
};

/**
 * Spacing constants for consistent layout
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Border radius constants
 */
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
