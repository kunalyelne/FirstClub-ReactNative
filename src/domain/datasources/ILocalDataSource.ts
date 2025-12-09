/**
 * Local Data Source Interface
 * Domain Layer - Data Source Contract
 * 
 * In Clean Architecture:
 * - Domain layer defines WHAT we need (interfaces/contracts)
 * - Data layer implements HOW we get it (implementations)
 * 
 * This follows Dependency Inversion Principle:
 * - Domain defines the contract
 * - Data implements the contract
 * - Repositories (Domain) depend on this interface, not implementations
 */

import type {DailyMetrics} from '../entities/DailyMetrics';
import type {User} from '../entities/User';
import {Result} from '../../types/Result';
import {StorageError} from '../../types/errors';

/**
 * Local data source interface for metrics
 * Defines contract for local data persistence (AsyncStorage, SQLite, etc.)
 * Implementation is in Data layer
 */
export interface IMetricsLocalDataSource {
  /**
   * Retrieves cached metrics for today
   * @returns Result containing DailyMetrics or StorageError
   */
  getTodayMetrics(): Promise<Result<DailyMetrics | null, StorageError>>;

  /**
   * Saves metrics to local storage
   * @param metrics - Metrics to persist
   */
  saveMetrics(metrics: DailyMetrics): Promise<Result<void, StorageError>>;

  /**
   * Clears cached metrics
   */
  clearMetrics(): Promise<Result<void, StorageError>>;
}

/**
 * Local data source interface for user data
 * Defines contract for local user data persistence
 */
export interface IUserLocalDataSource {
  /**
   * Retrieves cached user profile
   */
  getUserProfile(): Promise<Result<User | null, StorageError>>;

  /**
   * Saves user profile to local storage
   */
  saveUserProfile(profile: User): Promise<Result<void, StorageError>>;

  /**
   * Clears cached user data
   */
  clearUserProfile(): Promise<Result<void, StorageError>>;
}
