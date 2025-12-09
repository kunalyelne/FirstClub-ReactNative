/**
 * Update Metric Use Case
 * Updates a health metric value with validation
 */

import {injectable, inject} from 'inversify';
import {DailyMetrics, DailyMetricsEntity} from '../entities/DailyMetrics';
import {IMetricsRepository} from '../repositories/IMetricsRepository';
import {Result} from '../../types/Result';
import {AppError, ValidationError} from '../../types/errors';
import {TYPES} from '../../core/di/Types';

@injectable()
export class UpdateMetricUseCase {
  constructor(
    @inject(TYPES.IMetricsRepository)
    private metricsRepository: IMetricsRepository,
  ) {}

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
