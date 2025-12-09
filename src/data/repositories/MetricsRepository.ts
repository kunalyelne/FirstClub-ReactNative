/**
 * Metrics Repository
 * Implements offline-first strategy: local cache → remote fetch → cache update
 */

import {injectable, inject} from 'inversify';
import type {DailyMetrics} from '../../domain/entities/DailyMetrics';
import {Result, success, failure} from '../../types/Result';
import {AppError} from '../../types/errors';
import {IMetricsRepository} from '../../domain/repositories/IMetricsRepository';
import {IMetricsLocalDataSource} from '../../domain/datasources/ILocalDataSource';
import {IMetricsRemoteDataSource} from '../../domain/datasources/IRemoteDataSource';
import {TYPES} from '../../core/di/Types';

@injectable()
export class MetricsRepository implements IMetricsRepository {
  constructor(
    @inject(TYPES.IMetricsLocalDataSource)
    private localDataSource: IMetricsLocalDataSource,
    @inject(TYPES.IMetricsRemoteDataSource)
    private remoteDataSource: IMetricsRemoteDataSource,
  ) {}

  async getTodayMetrics(): Promise<Result<DailyMetrics, AppError>> {
    // Try local cache first (offline-first)
    const localResult = await this.localDataSource.getTodayMetrics();

    if (localResult.success && localResult.data !== null) {
      return success<DailyMetrics, AppError>(localResult.data);
    }

    if (!localResult.success) {
      console.warn('Local cache error:', localResult.error);
    }

    // Cache miss - fetch from remote
    const remoteResult = await this.remoteDataSource.fetchTodayMetrics();

    if (!remoteResult.success) {
      const appError = new AppError(
        remoteResult.error.message,
        remoteResult.error.code || 'NETWORK_ERROR',
        remoteResult.error,
      );
      return failure(appError);
    }

    // Cache fresh data (non-blocking)
    const saveResult = await this.localDataSource.saveMetrics(
      remoteResult.data,
    );
    if (!saveResult.success) {
      console.warn('Failed to cache metrics:', saveResult.error);
    }

    return success(remoteResult.data);
  }

  async updateMetric(
    metricType: keyof DailyMetrics,
    value: number,
  ): Promise<Result<DailyMetrics, AppError>> {
    const currentResult = await this.getTodayMetrics();
    if (!currentResult.success) {
      return failure(currentResult.error as AppError);
    }

    const updatedMetrics: DailyMetrics = {
      ...currentResult.data,
      [metricType]: value,
    };

    const saveResult = await this.saveMetrics(updatedMetrics);
    if (!saveResult.success) {
      return saveResult;
    }

    return success<DailyMetrics, AppError>(updatedMetrics);
  }

  // Force refresh from remote (pull-to-refresh)
  async refreshMetrics(): Promise<Result<DailyMetrics, AppError>> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const remoteResult = await this.remoteDataSource.fetchTodayMetrics();
    if (!remoteResult.success) {
      const appError = new AppError(
        remoteResult.error.message,
        remoteResult.error.code || 'NETWORK_ERROR',
        remoteResult.error,
      );
      return failure(appError);
    }

    const saveResult = await this.localDataSource.saveMetrics(
      remoteResult.data,
    );
    if (!saveResult.success) {
      console.warn('Failed to cache refreshed metrics:', saveResult.error);
    }

    return success(remoteResult.data);
  }

  async saveMetrics(
    metrics: DailyMetrics,
  ): Promise<Result<void, AppError>> {
    const result = await this.localDataSource.saveMetrics(metrics);
    if (!result.success) {
      const appError = new AppError(
        result.error.message,
        result.error.code || 'STORAGE_ERROR',
        result.error,
      );
      return failure(appError);
    }
    return success<void, AppError>(undefined);
  }
}
