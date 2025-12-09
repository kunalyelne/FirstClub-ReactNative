/**
 * Health Metric Mapper
 * Transforms domain entities (DailyMetrics) to presentation interfaces (HealthMetric)
 * Adds UI-specific properties like colors and icons
 */

import {MetricType} from '../../domain/interfaces';
import {HealthMetric} from '../interfaces';
import type {DailyMetrics} from '../../domain/entities/DailyMetrics';
import {Colors, MetricIcons, DEFAULT_TARGETS} from '../../utils/constants';
import {calculateProgress} from '../../utils/formatters';

const getMetricColor = (type: MetricType): string => {
  const colorMap: Record<MetricType, string> = {
    [MetricType.STEPS]: Colors.steps,
    [MetricType.CALORIES]: Colors.calories,
    [MetricType.WATER]: Colors.water,
    [MetricType.SLEEP]: Colors.sleep,
    [MetricType.HEART_RATE]: Colors.heartRate
    };
  return colorMap[type] || Colors.primary;
};

const getMetricValue = (type: MetricType, metrics: DailyMetrics): number => {
  switch (type) {
    case MetricType.STEPS:
      return metrics.steps;
    case MetricType.CALORIES:
      return metrics.caloriesConsumed;
    case MetricType.WATER:
      return metrics.waterGlasses;
    case MetricType.SLEEP:
      return metrics.sleepHours;
    default:
      return 0;
  }
};

const getMetricTarget = (type: MetricType, metrics: DailyMetrics): number => {
  switch (type) {
    case MetricType.STEPS:
      return metrics.stepsTarget;
    case MetricType.CALORIES:
      return metrics.caloriesConsumedTarget;
    case MetricType.WATER:
      return metrics.waterTarget;
    case MetricType.SLEEP:
      return metrics.sleepTarget;
    default:
      return DEFAULT_TARGETS.STEPS;
  }
};

export const convertToHealthMetrics = (
  metrics: DailyMetrics,
): HealthMetric[] => {
  const metricTypes: MetricType[] = [
    MetricType.STEPS,
    MetricType.CALORIES,
    MetricType.WATER,
    MetricType.SLEEP,
  ];

  return metricTypes.map((type, index) => ({
    id: `metric-${type}-${index}`,
    type,
    value: getMetricValue(type, metrics),
    target: getMetricTarget(type, metrics),
    color: getMetricColor(type), // UI-specific
    icon: MetricIcons[type], // UI-specific
  }));
};
