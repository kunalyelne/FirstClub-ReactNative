/**
 * Type definitions for the application
 * Infrastructure types (Result, Errors) - not domain interfaces
 * 
 * Note: Domain interfaces are in domain/interfaces/
 * This file only contains infrastructure-level types
 */

// Re-export Result type and errors for convenience
export type {Result} from './Result';
export {success, failure} from './Result';
export {
  AppError,
  NetworkError,
  StorageError,
  ValidationError,
} from './errors';

/**
 * Re-export domain interfaces for convenience
 * Domain interfaces are the source of truth
 */
// Domain enums and contracts
export * from '../domain/interfaces';

// Presentation interfaces (UI models)
export * from '../presentation/interfaces';

/**
 * Re-export domain entities for convenience
 * Domain entities are the source of truth
 */
export type {User as UserProfile} from '../domain/entities/User';
export type {DailyMetrics} from '../domain/entities/DailyMetrics';
