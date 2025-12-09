/**
 * Daily Metrics Entity
 * Domain Entity - Core business object
 * Contains business rules and validation
 * 
 * In Clean Architecture, entities are the innermost layer
 * They are independent of frameworks and databases
 */

/**
 * Daily metrics entity
 * Represents the core business concept of daily health metrics
 */
export interface DailyMetrics {
  caloriesConsumed: number;
  caloriesConsumedTarget: number;
  steps: number;
  stepsTarget: number;
  waterGlasses: number;
  waterTarget: number;
  sleepHours: number;
  sleepTarget: number;
  heartRate?: number;
}

/**
 * Business rules for DailyMetrics
 */
export class DailyMetricsEntity {
  /**
   * Validates if metrics are valid
   */
  static isValid(metrics: DailyMetrics): boolean {
    return (
      metrics.caloriesConsumed >= 0 &&
      metrics.steps >= 0 &&
      metrics.waterGlasses >= 0 &&
      metrics.sleepHours >= 0
    );
  }

  /**
   * Calculates progress percentage for a metric
   */
  static calculateProgress(current: number, target: number): number {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  }

  /**
   * Checks if a metric goal is achieved
   */
  static isGoalAchieved(current: number, target: number): boolean {
    return current >= target;
  }
}
