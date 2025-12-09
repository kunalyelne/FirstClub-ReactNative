/**
 * CaloriesSummaryCard Component
 * Reusable card component for displaying calorie summary
 * Shows today's calories vs target with progress bar
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Spacing, BorderRadius} from '../../../utils/constants';
import {formatCalories, calculateProgress} from '../../../utils/formatters';

interface CaloriesSummaryCardProps {
  todayCalories: number;
  targetCalories: number;
  onPress?: () => void;
}

/**
 * CaloriesSummaryCard Component
 * Displays calorie summary with progress visualization
 */
export const CaloriesSummaryCard: React.FC<CaloriesSummaryCardProps> = ({
  todayCalories,
  targetCalories,
  onPress,
}) => {
  const progress = calculateProgress(todayCalories, targetCalories);
  const remaining = Math.max(0, targetCalories - todayCalories);

  const Content = (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calories Today</Text>
        <Text style={styles.icon}>🔥</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.mainValue}>
          <Text style={styles.value}>{formatCalories(todayCalories)}</Text>
          <Text style={styles.target}>/ {formatCalories(targetCalories)}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(progress, 100)}%`,
                backgroundColor:
                  progress >= 100 ? Colors.error : Colors.primary,
              },
            ]}
          />
        </View>

        <Text style={styles.remaining}>
          {remaining > 0
            ? `${remaining} calories remaining`
            : 'Goal achieved! 🎉'}
        </Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {Content}
      </TouchableOpacity>
    );
  }

  return Content;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    gap: Spacing.sm,
  },
  mainValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  target: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginVertical: Spacing.sm,
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  remaining: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
