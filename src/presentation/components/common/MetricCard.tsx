/**
 * MetricCard Component
 * Reusable card component for displaying additional metrics
 * Shows metric value with trend indicator
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TrendDirection} from '../../../domain/interfaces';
import {AdditionalMetric} from '../../interfaces';
import {Colors, Spacing, BorderRadius} from '../../../utils/constants';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
  trend: TrendDirection;
}

/**
 * MetricCard Component
 * Displays an additional metric with trend indicator
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case TrendDirection.UP:
        return '↑';
      case TrendDirection.DOWN:
        return '↓';
      case TrendDirection.STABLE:
        return '→';
      default:
        return '→';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case TrendDirection.UP:
        return Colors.success;
      case TrendDirection.DOWN:
        return Colors.error;
      case TrendDirection.STABLE:
        return Colors.textSecondary;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: Colors.surface}]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={[styles.trendBadge, {backgroundColor: color + '20'}]}>
          <Text style={[styles.trendIcon, {color: getTrendColor()}]}>
            {getTrendIcon()}
          </Text>
        </View>
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    minWidth: 140,
    marginRight: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
  trendBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendIcon: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
