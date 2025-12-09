/**
 * SectionHeader Component
 * Reusable component for section headers
 * Displays title with optional action button
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Spacing} from '../../../utils/constants';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  rightComponent?: React.ReactNode;
}

/**
 * SectionHeader Component
 * Displays a section header with optional action
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onActionPress,
  rightComponent,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {rightComponent || (
        actionLabel && (
          <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
            <Text style={styles.actionLabel}>{actionLabel}</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
