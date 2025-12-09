/**
 * Dependency Injection Module
 * Exports all DI-related components and utilities
 */

export {ServiceProvider, useServices} from './ServiceProvider';
export type {IServiceContainer} from './ServiceProvider';
export {container, createContainer} from './Container';
export {TYPES} from './Types';

