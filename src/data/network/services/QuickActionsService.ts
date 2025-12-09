/**
 * Quick Actions Service
 * Data Layer - Network Service
 * Provides quick action configurations (could be fetched from API)
 */

import {QuickActionType} from '../../../domain/interfaces';
import {QuickAction} from '../../../presentation/interfaces';
import {Colors, QuickActionIcons} from '../../../utils/constants';

/**
 * Service class for quick actions
 */
class QuickActionsService {
  /**
   * Gets available quick actions
   * In a real app, this might be fetched from API based on user preferences
   * @returns Array of QuickAction objects
   */
  getQuickActions(): QuickAction[] {
    return [
      {
        id: '1',
        type: QuickActionType.TRACK_CALORIES,
        icon: QuickActionIcons[QuickActionType.TRACK_CALORIES],
        title: 'Log Food',
        subtitle: 'Track calories',
        color: Colors.calories,
      },
      {
        id: '2',
        type: QuickActionType.WORKOUT,
        icon: QuickActionIcons[QuickActionType.WORKOUT],
        title: 'Start Workout',
        subtitle: 'Begin exercise',
        color: Colors.primary,
      },
      {
        id: '3',
        type: QuickActionType.WATER,
        icon: QuickActionIcons[QuickActionType.WATER],
        title: 'Log Water',
        subtitle: 'Add glass',
        color: Colors.water,
      },
      {
        id: '4',
        type: QuickActionType.SLEEP,
        icon: QuickActionIcons[QuickActionType.SLEEP],
        title: 'Log Sleep',
        subtitle: 'Record rest',
        color: Colors.sleep,
      },
    ];
  }
}

// Export singleton instance
export const quickActionsService = new QuickActionsService();
