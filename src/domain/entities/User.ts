/**
 * User Entity
 * Domain Entity - Core business object
 */

export interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

/**
 * Business rules for User entity
 */
export class UserEntity {
  /**
   * Validates if user data is valid
   */
  static isValid(user: User): boolean {
    return !!user.id && !!user.name && user.name.length > 0;
  }

  /**
   * Gets display name for user
   */
  static getDisplayName(user: User): string {
    return user.name || 'User';
  }
}
