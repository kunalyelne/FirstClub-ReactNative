/**
 * HomeView Component
 * Dashboard screen displaying health metrics and activities
 * Delegates all logic to ViewModel hook
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHomeViewModel} from './useHomeViewModel';
import {
  CircularProgressView,
  MetricCard,
  QuickActionButton,
  CaloriesSummaryCard,
  SmartSuggestionCard,
  RecentActivityItem,
  SectionHeader,
  LoadingIndicator,
} from '../../components/common';
import {Colors, Spacing, HomeScreenText} from '../../../utils/constants';

export const HomeView: React.FC = () => {
  const {
    userName,
    greeting,
    motivationText,
    healthMetrics,
    additionalMetrics,
    quickActions,
    smartSuggestions,
    recentActivities,
    isLoading,
    isRefreshing,
    error,
    refreshData,
    handleQuickAction,
    handleSuggestion,
    dailyMetrics,
    clearError,
  } = useHomeViewModel();

  // Show error alert when error state changes
  React.useEffect(() => {
    if (error) {
      console.error('HomeView error:', error);
      Alert.alert('Error', error, [{text: 'OK', onPress: clearError}]);
    }
  }, [error, clearError]);

  // Show error screen if critical error occurs
  if (error && !isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubtext}>Pull down to refresh</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshData}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}>
        {/* Header Section - Always visible */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>{greeting || 'Hello'}</Text>
            <Text style={styles.userName}>{userName || 'User'}</Text>
          </View>
          <View style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </View>
        </View>

        {motivationText ? (
          <Text style={styles.motivationText}>{motivationText}</Text>
        ) : null}

        {/* Show loading state prominently if still loading */}
        {isLoading && healthMetrics.length === 0 ? (
          <View style={styles.fullScreenLoading}>
            <LoadingIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading your dashboard...</Text>
          </View>
        ) : null}

        {/* Progress Section */}
        <View style={[styles.section, styles.progressSection]}>
          <SectionHeader title={HomeScreenText.todaysProgressTitle} />
          {isLoading && healthMetrics.length === 0 ? (
            <View style={styles.loadingContainer}>
              <LoadingIndicator />
              <Text style={styles.loadingText}>Loading your metrics...</Text>
            </View>
          ) : healthMetrics.length === 0 ? (
            <Text style={styles.emptyText}>
              {HomeScreenText.noMetricsAvailable}
            </Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}>
              {healthMetrics.map(metric => (
                <CircularProgressView
                  key={metric.id}
                  title={metric.type}
                  value={metric.value}
                  target={metric.target}
                  color={metric.color}
                  icon={metric.icon}
                  onPress={() => {
                    // Handle metric press - navigate to detail screen
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Calories Summary Section */}
        {dailyMetrics && (
          <View style={styles.section}>
            <SectionHeader title={HomeScreenText.trackCaloriesTitle} />
            <CaloriesSummaryCard
              todayCalories={dailyMetrics.caloriesConsumed}
              targetCalories={dailyMetrics.caloriesConsumedTarget}
              onPress={() => {
                // Navigate to track calories screen
              }}
            />
          </View>
        )}

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <SectionHeader title={HomeScreenText.quickActionsTitle} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
            {quickActions.map(action => (
              <QuickActionButton
                key={action.id}
                icon={action.icon}
                title={action.title}
                subtitle={action.subtitle}
                color={action.color}
                onPress={() => handleQuickAction(action)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Additional Metrics Section */}
        <View style={styles.section}>
          <SectionHeader title={HomeScreenText.metricsTitle} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
            {additionalMetrics.map(metric => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                color={metric.color}
                trend={metric.trend}
              />
            ))}
          </ScrollView>
        </View>

        {/* Smart Suggestions Section */}
        {smartSuggestions.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title={HomeScreenText.smartSuggestionsTitle}
              rightComponent={
                <View style={styles.aiBadge}>
                  <Text style={styles.aiBadgeText}>
                    {HomeScreenText.poweredByAI}
                  </Text>
                </View>
              }
            />
            {smartSuggestions.map(suggestion => (
              <SmartSuggestionCard
                key={suggestion.id}
                type={suggestion.type}
                message={suggestion.message}
                onPress={() => handleSuggestion(suggestion)}
              />
            ))}
          </View>
        )}

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <SectionHeader
            title={HomeScreenText.recentActivityTitle}
            actionLabel={HomeScreenText.viewAllButton}
            onActionPress={() => {
              // Navigate to activities screen
            }}
          />
          {recentActivities.map(activity => (
            <RecentActivityItem
              key={activity.id}
              icon={activity.icon}
              title={activity.title}
              subtitle={activity.subtitle}
              color={activity.color}
            />
          ))}
        </View>

        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs / 2,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  motivationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  progressSection: {
    marginTop: Spacing.xs,
  },
  horizontalScroll: {
    paddingRight: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    padding: Spacing.lg,
  },
  aiBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  bottomPadding: {
    height: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.error,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  fullScreenLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    paddingVertical: Spacing.xl,
  },
});
