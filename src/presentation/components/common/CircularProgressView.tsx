/**
 * CircularProgressView Component
 * Circular progress indicator for health metrics
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import type {HealthMetric} from '../../interfaces';
import {Colors, Spacing, BorderRadius} from '../../../utils/constants';
import {formatNumber, calculateProgress} from '../../../utils/formatters';

interface CircularProgressViewProps {
  title: string;
  value: number;
  target: number;
  color: string;
  icon: string;
  onPress?: () => void;
}

export const CircularProgressView: React.FC<CircularProgressViewProps> = ({
  title,
  value,
  target,
  color,
  icon,
  onPress,
}) => {
  const progress = calculateProgress(value, target);
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const Content = (
    <View style={styles.container}>
      {/* Circular Progress SVG */}
      <View style={styles.progressContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.surface}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        {/* Center content */}
        <View style={styles.centerContent}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.value}>{formatNumber(value)}</Text>
          <Text style={styles.target}>/ {formatNumber(target)}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {Content}
      </TouchableOpacity>
    );
  }

  return Content;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 120,
    paddingVertical: Spacing.xs,
    marginHorizontal: Spacing.xs,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm + 2,
    width: 100,
    height: 100,
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  target: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xs,
    lineHeight: 16,
  },
});
