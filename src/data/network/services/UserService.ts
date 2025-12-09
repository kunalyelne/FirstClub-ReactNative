/**
 * User Service
 * Service layer that wraps User Repository
 * Provides simplified API for ViewModels
 */

import type {User} from '../../../domain/entities/User';
import {UserRepository} from '../../repositories/UserRepository';

/**
 * User Service
 * Facade pattern - simplifies repository interface
 */
class UserService {
  constructor(private repository: UserRepository = new UserRepository()) {}

  /**
   * Fetches user profile
   * Uses repository's offline-first strategy
   */
  async getUserProfile(): Promise<User> {
    const result = await this.repository.getUserProfile();
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  /**
   * Refreshes user profile from server
   */
  async refreshUserProfile(): Promise<User> {
    const result = await this.repository.refreshUserProfile();
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }
}

// Export singleton instance
export const userService = new UserService();
