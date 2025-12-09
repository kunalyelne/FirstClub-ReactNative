/**
 * RecentActivityItem Component
 * Reusable component for displaying recent activity items
 * Shows activity icon, title, and subtitle
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {RecentActivity} from '../../interfaces';
import {Colors, Spacing, BorderRadius} from '../../../utils/constants';

interface RecentActivityItemProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
}

/**
 * RecentActivityItem Component
 * Displays a single recent activity entry
 */
export const RecentActivityItem: React.FC<RecentActivityItemProps> = ({
  icon,
  title,
  subtitle,
  color,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, {backgroundColor: color + '20'}]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
