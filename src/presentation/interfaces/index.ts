/**
 * Presentation Interfaces Exports
 * Presentation Layer - Barrel export for UI models
 * 
 * These are Presentation Interfaces (UI Models), NOT DTOs
 * - DTOs: API request/response shapes (in data/dto/)
 * - Presentation Interfaces: UI display structures (here)
 * - Domain Entities: Core business objects (in domain/entities/)
 */

export type {HealthMetric} from './HealthMetric';
export type {AdditionalMetric} from './AdditionalMetric';
export type {QuickAction} from './QuickAction';
export type {SmartSuggestion} from './SmartSuggestion';
export type {RecentActivity} from './RecentActivity';
