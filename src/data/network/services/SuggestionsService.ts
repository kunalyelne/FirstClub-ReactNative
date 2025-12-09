/**
 * Smart Suggestions Service
 * Data Layer - Network Service
 * Generates AI-powered smart suggestions (could use ML API)
 */

import {SuggestionType} from '../../../domain/interfaces';
import {SmartSuggestion} from '../../../presentation/interfaces';
import type {DailyMetrics} from '../../../domain/entities/DailyMetrics';
import {calculateProgress} from '../../../utils/formatters';
import {DEFAULT_TARGETS} from '../../../utils/constants';

/**
 * Service class for generating smart suggestions
 */
class SuggestionsService {
  /**
   * Generates smart suggestions based on current metrics
   * In a real app, this would call an ML/AI API to generate personalized suggestions
   * @param metrics - Current daily metrics
   * @returns Array of SmartSuggestion objects
   */
  getSmartSuggestions(metrics: DailyMetrics): SmartSuggestion[] {
    const suggestions: SmartSuggestion[] = [];

    // Analyze calories progress
    const calorieProgress = calculateProgress(
      metrics.caloriesConsumed,
      metrics.caloriesConsumedTarget,
    );
    if (calorieProgress < 50) {
      suggestions.push({
        id: '1',
        type: SuggestionType.NUTRITION,
        message: 'You\'re only halfway to your calorie goal. Consider a healthy snack!',
      });
    }

    // Analyze water intake
    const waterProgress = calculateProgress(
      metrics.waterGlasses,
      metrics.waterTarget,
    );
    if (waterProgress < 60) {
      suggestions.push({
        id: '2',
        type: SuggestionType.HYDRATION,
        message: 'Stay hydrated! You\'ve had ' + metrics.waterGlasses + ' glasses today.',
      });
    }

    // Analyze steps
    const stepsProgress = calculateProgress(metrics.steps, metrics.stepsTarget);
    if (stepsProgress < 70 && new Date().getHours() < 18) {
      suggestions.push({
        id: '3',
        type: SuggestionType.WORKOUT,
        message: 'Take a walk! You\'re at ' + Math.round(stepsProgress) + '% of your daily steps.',
      });
    }

    // Analyze sleep
    if (metrics.sleepHours < DEFAULT_TARGETS.SLEEP_HOURS - 1) {
      suggestions.push({
        id: '4',
        type: SuggestionType.SLEEP,
        message: 'Aim for 8 hours of sleep tonight for better recovery!',
      });
    }

    // Limit to 3 suggestions for better UX
    return suggestions.slice(0, 3);
  }
}

// Export singleton instance
export const suggestionsService = new SuggestionsService();
