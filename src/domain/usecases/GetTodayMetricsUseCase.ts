/**
 * Get Today Metrics Use Case
 * Fetches and validates today's health metrics
 */

import {DailyMetrics, DailyMetricsEntity} from '../entities/DailyMetrics';
import {IMetricsRepository} from '../repositories/IMetricsRepository';
import {Result} from '../../types/Result';
import {AppError, ValidationError} from '../../types/errors';

export class GetTodayMetricsUseCase {
  constructor(private metricsRepository: IMetricsRepository) {}

  async execute(): Promise<Result<DailyMetrics, AppError>> {
    const result = await this.metricsRepository.getTodayMetrics();

    if (!result.success) {
      return result;
    }

    // Validate business rules before returning
    if (!DailyMetricsEntity.isValid(result.data)) {
      return {
        success: false,
        error: new ValidationError('Invalid metrics data'),
      };
    }

    return result;
  }
}
