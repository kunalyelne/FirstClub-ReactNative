/**
 * User Repository Interface
 * Domain Layer - Repository interface
 */

import {User} from '../entities/User';
import {Result} from '../../types/Result';
import {AppError} from '../../types/errors';

/**
 * Repository interface for user data
 */
export interface IUserRepository {
  /**
   * Gets user profile
   */
  getUserProfile(): Promise<Result<User, AppError>>;

  /**
   * Refreshes user profile from remote source
   */
  refreshUserProfile(): Promise<Result<User, AppError>>;
}
