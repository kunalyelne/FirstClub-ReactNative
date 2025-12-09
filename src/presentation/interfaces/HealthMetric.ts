/**
 * Health Metric Interface
 * Presentation Layer - UI Model
 * 
 * Represents a health metric for UI display
 * Contains UI-specific properties (color, icon)
 */

import {MetricType} from '../../domain/interfaces/MetricType';

/**
 * Health metric data model for presentation
 */
export interface HealthMetric {
  id: string;
  type: MetricType;
  value: number;
  target: number;
  color: string; // UI-specific
  icon: string;  // UI-specific
}
