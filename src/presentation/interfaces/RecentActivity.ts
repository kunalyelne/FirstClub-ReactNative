/**
 * Recent Activity Interface
 * Presentation Layer - UI Model
 * 
 * Contains UI-specific properties (icon, color)
 */

/**
 * Recent activity data for UI display
 */
export interface RecentActivity {
  id: string;
  icon: string;      // UI-specific
  title: string;
  subtitle: string;
  color: string;    // UI-specific
  timestamp: Date;
}
