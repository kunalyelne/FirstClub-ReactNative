/**
 * SmartSuggestionCard Component
 * Reusable card component for displaying AI-powered smart suggestions
 * Shows suggestion message with action button
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SuggestionType} from '../../../domain/interfaces';
import {SmartSuggestion} from '../../interfaces';
import {Colors, Spacing, BorderRadius} from '../../../utils/constants';

interface SmartSuggestionCardProps {
  type: SuggestionType;
  message: string;
  onPress?: () => void;
}

/**
 * Gets icon for suggestion type
 */
const getSuggestionIcon = (type: SuggestionType): string => {
  const iconMap: Record<SuggestionType, string> = {
    [SuggestionType.WORKOUT]: '💪',
    [SuggestionType.HYDRATION]: '💧',
    [SuggestionType.NUTRITION]: '🍎',
    [SuggestionType.SLEEP]: '😴',
    [SuggestionType.MINDFULNESS]: '🧘',
  };
  return iconMap[type] || '✨';
};

/**
 * Gets color for suggestion type
 */
const getSuggestionColor = (type: SuggestionType): string => {
  const colorMap: Record<SuggestionType, string> = {
    [SuggestionType.WORKOUT]: Colors.primary,
    [SuggestionType.HYDRATION]: Colors.water,
    [SuggestionType.NUTRITION]: Colors.calories,
    [SuggestionType.SLEEP]: Colors.sleep,
    [SuggestionType.MINDFULNESS]: Colors.accent,
  };
  return colorMap[type] || Colors.primary;
};

/**
 * SmartSuggestionCard Component
 * Displays a smart suggestion with action capability
 */
export const SmartSuggestionCard: React.FC<SmartSuggestionCardProps> = ({
  type,
  message,
  onPress,
}) => {
  const icon = getSuggestionIcon(type);
  const color = getSuggestionColor(type);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, {borderLeftColor: color}]}>
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    padding: Spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});
