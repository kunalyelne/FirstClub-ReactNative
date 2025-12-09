/**
 * Recent Activities Service
 * Data Layer - Network Service
 * Fetches recent user activities (would call API in production)
 */

import {MetricType} from '../../../domain/interfaces';
import {RecentActivity} from '../../../presentation/interfaces';
import {Colors, MetricIcons} from '../../../utils/constants';

/**
 * Service class for recent activities
 */
class ActivitiesService {
  /**
   * Gets recent activities
   * In a real app, this would fetch from an API endpoint
   * @returns Array of RecentActivity objects
   */
  getRecentActivities(): RecentActivity[] {
    // Mock data - in real app, fetch from API
    return [
      {
        id: '1',
        icon: MetricIcons[MetricType.CALORIES],
        title: 'Logged Breakfast',
        subtitle: '450 calories',
        color: Colors.calories,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: '2',
        icon: MetricIcons[MetricType.WATER],
        title: 'Logged Water',
        subtitle: '2 glasses',
        color: Colors.water,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      }
    ];
  }
}

// Export singleton instance
export const activitiesService = new ActivitiesService();
