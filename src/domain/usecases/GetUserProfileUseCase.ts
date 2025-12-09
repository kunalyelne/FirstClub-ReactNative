/**
 * Get User Profile Use Case
 * Fetches and validates user profile data
 */

import {injectable, inject} from 'inversify';
import {User, UserEntity} from '../entities/User';
import {IUserRepository} from '../repositories/IUserRepository';
import {Result} from '../../types/Result';
import {AppError, ValidationError} from '../../types/errors';
import {TYPES} from '../../core/di/Types';

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<Result<User, AppError>> {
    const result = await this.userRepository.getUserProfile();

    if (!result.success) {
      return result;
    }

    if (!UserEntity.isValid(result.data)) {
      return {
        success: false,
        error: new ValidationError('Invalid user data'),
      };
    }

    return result;
  }
}
