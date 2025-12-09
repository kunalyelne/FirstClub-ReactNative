/**
 * Quick Action Interface
 * Presentation Layer - UI Model
 */

import {QuickActionType} from '../../domain/interfaces/QuickActionType';

/**
 * Quick action button data for UI display
 */
export interface QuickAction {
  id: string;
  type: QuickActionType;
  icon: string;      // UI-specific
  title: string;
  subtitle: string;
  color: string;    // UI-specific
}
