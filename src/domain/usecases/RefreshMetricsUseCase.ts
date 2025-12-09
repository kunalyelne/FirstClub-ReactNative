/**
 * Refresh Metrics Use Case
 * Forces refresh from remote source (pull-to-refresh)
 */

import {injectable, inject} from 'inversify';
import {DailyMetrics, DailyMetricsEntity} from '../entities/DailyMetrics';
import {IMetricsRepository} from '../repositories/IMetricsRepository';
import {Result} from '../../types/Result';
import {AppError, ValidationError} from '../../types/errors';
import {TYPES} from '../../core/di/Types';

@injectable()
export class RefreshMetricsUseCase {
  constructor(
    @inject(TYPES.IMetricsRepository)
    private metricsRepository: IMetricsRepository,
  ) {}

  async execute(): Promise<Result<DailyMetrics, AppError>> {
    const result = await this.metricsRepository.refreshMetrics();

    if (!result.success) {
      return result;
    }

    if (!DailyMetricsEntity.isValid(result.data)) {
      return {
        success: false,
        error: new ValidationError('Refreshed metrics are invalid'),
      };
    }

    return result;
  }
}
