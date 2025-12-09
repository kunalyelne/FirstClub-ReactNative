/**
 * Metrics Service
 * Service layer that wraps Repository pattern
 * Provides simplified API for ViewModels while maintaining clean architecture
 * 
 * Note: In larger apps, services might contain business logic.
 * For this POC, services act as facades to repositories.
 */

import type {DailyMetrics} from '../../../domain/entities/DailyMetrics';
import {MetricsRepository} from '../../../data/repositories/MetricsRepository';

/**
 * Metrics Service
 * Facade pattern - simplifies repository interface for ViewModels
 */
class MetricsService {
  constructor(private repository: MetricsRepository = new MetricsRepository()) {}

  /**
   * Fetches today's metrics
   * Uses repository's offline-first strategy
   */
  async fetchTodayMetrics(): Promise<DailyMetrics> {
    const result = await this.repository.getTodayMetrics();
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  /**
   * Updates a specific metric value
   */
  async updateMetric(
    metricType: keyof DailyMetrics,
    value: number,
  ): Promise<DailyMetrics> {
    const result = await this.repository.updateMetric(metricType, value);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  /**
   * Refreshes metrics from server
   */
  async refreshMetrics(): Promise<DailyMetrics> {
    const result = await this.repository.refreshMetrics();
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  /**
   * Saves metrics (exposed for testing)
   */
  async saveMetrics(metrics: DailyMetrics): Promise<void> {
    const result = await this.repository.saveMetrics(metrics);
    if (!result.success) {
      throw result.error;
    }
  }
}

// Export singleton instance
export const metricsService = new MetricsService();
