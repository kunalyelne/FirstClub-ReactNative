/**
 * Additional Metrics Service
 * Data Layer - Network Service
 * Provides additional metric cards beyond primary health metrics
 */

import {TrendDirection} from '../../../domain/interfaces';
import {AdditionalMetric} from '../../../presentation/interfaces';
import type {DailyMetrics} from '../../../domain/entities/DailyMetrics';
import {Colors} from '../../../utils/constants';
import {formatNumber, formatDuration} from '../../../utils/formatters';

/**
 * Service class for additional metrics
 */
class AdditionalMetricsService {
  /**
   * Gets additional metrics based on daily metrics
   * In a real app, this might fetch from API or calculate from historical data
   * @param metrics - Current daily metrics
   * @returns Array of AdditionalMetric objects
   */
  getAdditionalMetrics(metrics: DailyMetrics): AdditionalMetric[] {
    return [
      {
        id: '1',
        title: 'Heart Rate',
        value: metrics.heartRate ? `${metrics.heartRate} bpm` : '--',
        subtitle: 'Resting',
        icon: '❤️',
        color: Colors.heartRate,
        trend: TrendDirection.UP,
      },
      {
        id: '2',
        title: 'Calories Burned',
        value: formatNumber(metrics.steps * 0.04), // Rough estimate
        subtitle: 'Estimated',
        icon: '🔥',
        color: Colors.calories,
        trend: TrendDirection.UP,
      },
    ];
  }
}

// Export singleton instance
export const additionalMetricsService = new AdditionalMetricsService();
