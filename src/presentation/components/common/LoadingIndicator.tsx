/**
 * LoadingIndicator Component
 * Reusable loading indicator component
 * Displays a simple loading spinner
 */

import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../../utils/constants';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

/**
 * LoadingIndicator Component
 * Displays a loading spinner
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'large',
  color = Colors.primary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
