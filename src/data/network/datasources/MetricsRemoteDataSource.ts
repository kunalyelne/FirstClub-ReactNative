/**
 * Metrics Remote Data Source Implementation
 * Data Layer - Network Data Source
 * 
 * Handles API calls for metrics data
 * In production, would use fetch/axios with proper error handling
 */

import type {DailyMetrics} from '../../../domain/entities/DailyMetrics';
import {DEFAULT_TARGETS} from '../../../utils/constants';
import {Result, success, failure} from '../../../types/Result';
import {NetworkError} from '../../../types/errors';
import {IMetricsRemoteDataSource} from '../../../domain/datasources/IRemoteDataSource';

/**
 * Remote data source implementation for metrics
 * Handles network calls with proper error handling
 */
export class MetricsRemoteDataSource implements IMetricsRemoteDataSource {
  async fetchTodayMetrics(): Promise<Result<DailyMetrics, NetworkError>> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, this would be:
      // const response = await fetch('/api/metrics/today');
      // if (!response.ok) throw new Error('API error');
      // return success(await response.json());

      // Mock data for POC
      const mockMetrics: DailyMetrics = {
        caloriesConsumed: 1450,
        caloriesConsumedTarget: DEFAULT_TARGETS.CALORIES,
        steps: 8234,
        stepsTarget: DEFAULT_TARGETS.STEPS,
        waterGlasses: 5,
        waterTarget: DEFAULT_TARGETS.WATER_GLASSES,
        sleepHours: 7.5,
        sleepTarget: DEFAULT_TARGETS.SLEEP_HOURS,
        heartRate: 72,
      };

      return success(mockMetrics);
    } catch (error) {
      return failure(
        new NetworkError('Failed to fetch metrics from server', error as Error),
      );
    }
  }

  async syncMetrics(
    metrics: DailyMetrics,
  ): Promise<Result<DailyMetrics, NetworkError>> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In production, this would sync with server
      // const response = await fetch('/api/metrics/sync', {
      //   method: 'POST',
      //   body: JSON.stringify(metrics),
      // });

      return success(metrics);
    } catch (error) {
      return failure(
        new NetworkError('Failed to sync metrics with server', error as Error),
      );
    }
  }
}
