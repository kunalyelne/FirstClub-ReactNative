/**
 * Metrics Repository Interface
 * Domain Layer - Repository interfaces belong here
 * 
 * In Clean Architecture:
 * - Domain layer defines WHAT we need (interfaces)
 * - Data layer implements HOW we get it (implementations)
 * 
 * This follows Dependency Inversion Principle:
 * - High-level (Domain) doesn't depend on low-level (Data)
 * - Both depend on abstractions (this interface)
 */

import {DailyMetrics} from '../entities/DailyMetrics';
import {Result} from '../../types/Result';
import {AppError} from '../../types/errors';

/**
 * Repository interface for health metrics
 * Defines the contract for data access
 * Implementation is in Data layer
 */
export interface IMetricsRepository {
  /**
   * Gets today's metrics
   * Strategy: Try local first, fallback to remote, cache result
   */
  getTodayMetrics(): Promise<Result<DailyMetrics, AppError>>;

  /**
   * Updates a specific metric value
   */
  updateMetric(
    metricType: keyof DailyMetrics,
    value: number,
  ): Promise<Result<DailyMetrics, AppError>>;

  /**
   * Refreshes metrics from remote source
   */
  refreshMetrics(): Promise<Result<DailyMetrics, AppError>>;

  /**
   * Saves metrics (used internally)
   */
  saveMetrics(metrics: DailyMetrics): Promise<Result<void, AppError>>;
}
