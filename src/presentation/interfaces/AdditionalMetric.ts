/**
 * Additional Metric Interface
 * Presentation Layer - UI Model
 */

import {TrendDirection} from '../../domain/interfaces/TrendDirection';

/**
 * Additional metric card data for UI display
 */
export interface AdditionalMetric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: string;      // UI-specific
  color: string;    // UI-specific
  trend: TrendDirection;
}
