/**
 * Update Metric Use Case
 * Updates a health metric value with validation
 */

import {DailyMetrics, DailyMetricsEntity} from '../entities/DailyMetrics';
import {IMetricsRepository} from '../repositories/IMetricsRepository';
import {Result} from '../../types/Result';
import {AppError, ValidationError} from '../../types/errors';

export class UpdateMetricUseCase {
  constructor(private metricsRepository: IMetricsRepository) {}

  async execute(
    metricType: keyof DailyMetrics,
    value: number,
  ): Promise<Result<DailyMetrics, AppError>> {
    if (value < 0) {
      return {
        success: false,
        error: new ValidationError('Metric value cannot be negative'),
      };
    }

    const result = await this.metricsRepository.updateMetric(metricType, value);

    if (!result.success) {
      return result;
    }

    if (!DailyMetricsEntity.isValid(result.data)) {
      return {
        success: false,
        error: new ValidationError('Updated metrics are invalid'),
      };
    }

    return result;
  }
}
