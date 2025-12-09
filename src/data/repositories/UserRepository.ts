/**
 * User Repository
 * Manages user profile data with offline-first caching
 */

import {injectable} from 'inversify';
import {User} from '../../domain/entities/User';
import {Result, success, failure} from '../../types/Result';
import {AppError} from '../../types/errors';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageError} from '../../types/errors';

const STORAGE_KEY = '@fitlane:user_profile';

@injectable()
export class UserRepository implements IUserRepository {
  async getUserProfile(): Promise<Result<User, AppError>> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        return success(JSON.parse(stored) as User);
      }

      // Mock data for POC
      const mockProfile: User = {
        id: '1',
        name: 'Kunal',
        email: 'kunal@fitlane.com',
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockProfile));
      return success(mockProfile);
    } catch (error) {
      return failure(
        new StorageError('Failed to get user profile', error as Error),
      );
    }
  }

  async refreshUserProfile(): Promise<Result<User, AppError>> {
    return this.getUserProfile();
  }
}
