/**
 * QuickActionButton Component
 * Reusable button component for quick actions
 * Displays icon, title, and subtitle in a compact button format
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import type {QuickAction} from '../../interfaces';
import {Colors, Spacing, BorderRadius} from '../../../utils/constants';

interface QuickActionButtonProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

/**
 * QuickActionButton Component
 * Displays a quick action button with icon and text
 */
export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  title,
  subtitle,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, {backgroundColor: color + '20'}]}>
      <View style={[styles.iconContainer, {backgroundColor: color + '30'}]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    width: 120,
    marginRight: Spacing.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
