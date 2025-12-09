/**
 * Dependency Injection Types
 * Symbols used for Inversify container bindings
 */

export const TYPES = {
  // Data Sources
  IMetricsLocalDataSource: Symbol.for('IMetricsLocalDataSource'),
  IMetricsRemoteDataSource: Symbol.for('IMetricsRemoteDataSource'),

  // Repositories
  IMetricsRepository: Symbol.for('IMetricsRepository'),
  IUserRepository: Symbol.for('IUserRepository'),

  // Use Cases
  GetTodayMetricsUseCase: Symbol.for('GetTodayMetricsUseCase'),
  UpdateMetricUseCase: Symbol.for('UpdateMetricUseCase'),
  RefreshMetricsUseCase: Symbol.for('RefreshMetricsUseCase'),
  GetUserProfileUseCase: Symbol.for('GetUserProfileUseCase'),
} as const;

