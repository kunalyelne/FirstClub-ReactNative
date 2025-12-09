/**
 * Metrics Local Data Source Implementation
 * Concrete implementation using AsyncStorage
 * Follows Single Responsibility Principle - only handles local persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type {DailyMetrics} from '../../domain/entities/DailyMetrics';
import {Result, success, failure} from '../../types/Result';
import {StorageError} from '../../types/errors';
import {IMetricsLocalDataSource} from '../../domain/datasources/ILocalDataSource';

const STORAGE_KEY = '@fitlane:daily_metrics';

/**
 * Local data source implementation for metrics
 * Handles AsyncStorage operations with proper error handling
 */
export class MetricsLocalDataSource implements IMetricsLocalDataSource {
  async getTodayMetrics(): Promise<Result<DailyMetrics | null, StorageError>> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return success(null);
      }

      const parsed = JSON.parse(stored);
      const today = new Date().toDateString();

      // Return cached data if it's from today
      if (parsed.date === today) {
        return success(parsed.metrics as DailyMetrics);
      }

      // Data is stale, return null
      return success(null);
    } catch (error) {
      return failure(
        new StorageError(
          'Failed to retrieve metrics from storage',
          error as Error,
        ),
      );
    }
  }

  async saveMetrics(
    metrics: DailyMetrics,
  ): Promise<Result<void, StorageError>> {
    try {
      const data = {
        date: new Date().toDateString(),
        metrics,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return success(undefined);
    } catch (error) {
      return failure(
        new StorageError('Failed to save metrics to storage', error as Error),
      );
    }
  }

  async clearMetrics(): Promise<Result<void, StorageError>> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return success(undefined);
    } catch (error) {
      return failure(
        new StorageError('Failed to clear metrics from storage', error as Error),
      );
    }
  }
}
