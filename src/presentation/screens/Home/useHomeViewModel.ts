/**
 * Home ViewModel Hook
 * Orchestrates use cases and manages UI state for the Home screen
 */

import {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  HealthMetric,
  QuickAction,
  SmartSuggestion,
  RecentActivity,
  AdditionalMetric,
} from '../../interfaces';
import {DailyMetrics} from '../../../domain/entities/DailyMetrics';
import {User} from '../../../domain/entities/User';
import {
  quickActionsService,
  suggestionsService,
  activitiesService,
  additionalMetricsService,
} from '../../../data/network/services';
import {convertToHealthMetrics} from '../../../presentation/mappers/HealthMetricMapper';
import {getGreeting} from '../../../utils/greeting';
import {getMotivationalText} from '../../../utils/motivation';
import {useServices} from '../../../core/di';

/**
 * ViewModel state interface
 */
interface HomeViewModelState {
  // User data
  userName: string;
  greeting: string;
  motivationText: string;
  userProfile: User | null;

  // Metrics data
  dailyMetrics: DailyMetrics | null;
  healthMetrics: HealthMetric[];
  additionalMetrics: AdditionalMetric[];

  // UI data
  quickActions: QuickAction[];
  smartSuggestions: SmartSuggestion[];
  recentActivities: RecentActivity[];

  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

/**
 * ViewModel return interface
 */
interface UseHomeViewModelReturn extends HomeViewModelState {
  // Actions
  refreshData: () => Promise<void>;
  updateMetric: (type: keyof DailyMetrics, value: number) => Promise<void>;
  handleQuickAction: (action: QuickAction) => void;
  handleSuggestion: (suggestion: SmartSuggestion) => void;
  clearError: () => void;
}

/**
 * Home screen ViewModel hook
 * Manages state and coordinates use cases for the dashboard
 */
export const useHomeViewModel = (): UseHomeViewModelReturn => {
  // Get services from DI container
  const services = useServices();

  // Memoize use cases to ensure stable references for useCallback dependencies
  const useCases = useMemo(() => {
    return {
      getTodayMetricsUseCase: services.getGetTodayMetricsUseCase(),
      updateMetricUseCase: services.getUpdateMetricUseCase(),
      refreshMetricsUseCase: services.getRefreshMetricsUseCase(),
      getUserProfileUseCase: services.getGetUserProfileUseCase(),
    };
  }, [services]);

  const {
    getTodayMetricsUseCase,
    updateMetricUseCase,
    refreshMetricsUseCase,
    getUserProfileUseCase,
  } = useCases;

  // Ref to access current state in callbacks without dependency on state
  const stateRef = useRef<HomeViewModelState | null>(null);
  const [state, setState] = useState<HomeViewModelState>({
    userName: '',
    greeting: '',
    motivationText: '',
    userProfile: null,
    dailyMetrics: null,
    healthMetrics: [],
    additionalMetrics: [],
    quickActions: [],
    smartSuggestions: [],
    recentActivities: [],
    isLoading: true,
    isRefreshing: false,
    error: null,
  });

  // Load static UI data (greeting, quick actions, etc.)
  const loadInitialUIData = useCallback(() => {
    const greeting = getGreeting();
    const motivationText = getMotivationalText();
    const quickActions = quickActionsService.getQuickActions();
    const recentActivities = activitiesService.getRecentActivities();

    setState(prev => ({
      ...prev,
      greeting,
      motivationText,
      quickActions,
      recentActivities,
    }));
  }, []);

  // Fetch user profile via use case
  const loadUserProfile = useCallback(async () => {
    const result = await getUserProfileUseCase.execute();
    if (result.success) {
      setState(prev => ({
        ...prev,
        userName: result.data.name,
        userProfile: result.data,
      }));
    } else {
      setState(prev => ({
        ...prev,
        error: result.error.message,
      }));
    }
  }, [getUserProfileUseCase]);

  // Fetch today's metrics and transform for UI
  const loadMetrics = useCallback(async () => {
    try {
      const result = await getTodayMetricsUseCase.execute();
      if (result.success) {
        const healthMetrics = convertToHealthMetrics(result.data);
        const additionalMetrics =
          additionalMetricsService.getAdditionalMetrics(result.data);
        const smartSuggestions =
          suggestionsService.getSmartSuggestions(result.data);

        setState(prev => ({
          ...prev,
          dailyMetrics: result.data,
          healthMetrics,
          additionalMetrics,
          smartSuggestions,
          isLoading: false,
          error: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error.message,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load metrics',
      }));
    }
  }, [getTodayMetricsUseCase]);

  // Load initial data on mount with cleanup to prevent state updates after unmount
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      loadInitialUIData();
      if (isMounted) {
        await Promise.all([loadUserProfile(), loadMetrics()]);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh all data (pull-to-refresh)
  const refreshData = useCallback(async () => {
    setState(prev => ({...prev, isRefreshing: true, error: null}));

    try {
      const metricsResult = await refreshMetricsUseCase.execute();
      if (metricsResult.success) {
        const healthMetrics = convertToHealthMetrics(metricsResult.data);
        const additionalMetrics =
          additionalMetricsService.getAdditionalMetrics(metricsResult.data);
        const smartSuggestions =
          suggestionsService.getSmartSuggestions(metricsResult.data);

        setState(prev => ({
          ...prev,
          dailyMetrics: metricsResult.data,
          healthMetrics,
          additionalMetrics,
          smartSuggestions,
          isRefreshing: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isRefreshing: false,
          error: metricsResult.error.message,
        }));
      }

      await loadUserProfile();
    } catch (error) {
      setState(prev => ({
        ...prev,
        isRefreshing: false,
        error: error instanceof Error ? error.message : 'Failed to refresh',
      }));
    }
  }, [refreshMetricsUseCase, loadUserProfile]);

  // Update a specific metric and refresh UI data
  const updateMetric = useCallback(
    async (type: keyof DailyMetrics, value: number) => {
      try {
        const result = await updateMetricUseCase.execute(type, value);
        if (result.success) {
          const healthMetrics = convertToHealthMetrics(result.data);
          const additionalMetrics =
            additionalMetricsService.getAdditionalMetrics(result.data);
          const smartSuggestions =
            suggestionsService.getSmartSuggestions(result.data);

          setState(prev => ({
            ...prev,
            dailyMetrics: result.data,
            healthMetrics,
            additionalMetrics,
            smartSuggestions,
            error: null,
          }));
        } else {
          setState(prev => ({
            ...prev,
            error: result.error.message,
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to update',
        }));
      }
    },
    [updateMetricUseCase],
  );

  // Handle quick action button taps (e.g., add water glass)
  const handleQuickAction = useCallback((action: QuickAction) => {
    switch (action.type) {
      case 'water':
        const currentWater = stateRef.current?.dailyMetrics?.waterGlasses || 0;
        updateMetric('waterGlasses', currentWater + 1);
        break;
      default:
        break;
    }
  }, [updateMetric]);

  const handleSuggestion = useCallback((suggestion: SmartSuggestion) => {
    // Handle suggestion tap - can be extended to navigate or trigger actions
    console.log('Suggestion tapped:', suggestion);
  }, []);

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({...prev, error: null}));
  }, []);

  // Keep ref in sync with state for callback access
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return {
    ...state,
    refreshData,
    updateMetric,
    handleQuickAction,
    handleSuggestion,
    clearError,
  };
};
