/**
 * Domain Interfaces Exports
 * Domain Layer - Barrel export for domain enums and contracts
 * 
 * Note: Presentation interfaces (UI models) are in presentation/interfaces/
 * This file only contains domain enums and domain contracts
 */

// Domain Enums (business concepts)
export {MetricType} from './MetricType';
export {TrendDirection} from './TrendDirection';
export {QuickActionType} from './QuickActionType';
export {SuggestionType} from './SuggestionType';

// Note: Presentation interfaces (HealthMetric, RecentActivity, etc.) 
// have been moved to presentation/interfaces/
