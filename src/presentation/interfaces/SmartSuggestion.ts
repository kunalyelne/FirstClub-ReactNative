/**
 * Smart Suggestion Interface
 * Presentation Layer - UI Model
 */

import {SuggestionType} from '../../domain/interfaces/SuggestionType';

/**
 * Smart suggestion data for UI display
 */
export interface SmartSuggestion {
  id: string;
  type: SuggestionType;
  message: string;
}
