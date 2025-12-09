/**
 * Remote Data Source Interface
 * Domain Layer - Data Source Contract
 * 
 * Defines contract for API/network calls
 * Implementation is in Data layer (data/network/datasources)
 */

import type {DailyMetrics} from '../entities/DailyMetrics';
import type {User} from '../entities/User';
import {Result} from '../../types/Result';
import {NetworkError} from '../../types/errors';

/**
 * Remote data source interface for metrics
 * Defines contract for API communication
 */
export interface IMetricsRemoteDataSource {
  /**
   * Fetches today's metrics from API
   * @returns Result containing DailyMetrics or NetworkError
   */
  fetchTodayMetrics(): Promise<Result<DailyMetrics, NetworkError>>;

  /**
   * Syncs metrics with server
   */
  syncMetrics(metrics: DailyMetrics): Promise<Result<DailyMetrics, NetworkError>>;
}

/**
 * Remote data source interface for user data
 */
export interface IUserRemoteDataSource {
  /**
   * Fetches user profile from API
   */
  fetchUserProfile(): Promise<Result<User, NetworkError>>;

  /**
   * Updates user profile on server
   */
  updateUserProfile(profile: User): Promise<Result<User, NetworkError>>;
}
