# Fitlane React Native - Home Screen Dashboard

A React Native POC demonstrating clean architecture, component reusability, and MVVM pattern implementation.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn
- iOS Simulator (for iOS) or Android Emulator (for Android)
- Expo Go app (optional, for physical device testing)

### Installation

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Run on Web
npm run web
```

## 📁 Project Structure

```
ReactNative/
├── src/
│   ├── domain/               # Domain Layer (Core Business Logic)
│   │   ├── entities/         # Business entities with rules
│   │   │   ├── DailyMetrics.ts
│   │   │   ├── User.ts
│   │   │   └── index.ts                  # Barrel export
│   │   ├── interfaces/       # Domain enums & contracts
│   │   │   ├── MetricType.ts
│   │   │   ├── TrendDirection.ts
│   │   │   ├── QuickActionType.ts
│   │   │   ├── SuggestionType.ts
│   │   │   └── index.ts                  # Barrel export
│   │   ├── repositories/     # Repository interfaces (contracts)
│   │   │   ├── IMetricsRepository.ts
│   │   │   ├── IUserRepository.ts
│   │   │   └── index.ts                  # Barrel export
│   │   ├── datasources/      # Data source interfaces (contracts)
│   │   │   ├── ILocalDataSource.ts
│   │   │   ├── IRemoteDataSource.ts
│   │   │   └── index.ts                  # Barrel export
│   │   └── usecases/         # Use Cases/Interactors (business operations)
│   │       ├── GetTodayMetricsUseCase.ts
│   │       ├── UpdateMetricUseCase.ts
│   │       ├── RefreshMetricsUseCase.ts
│   │       ├── GetUserProfileUseCase.ts
│   │       └── index.ts                  # Barrel export
│   │
│   ├── data/                 # Data Layer (Implementation)
│   │   ├── repositories/     # Repository implementations
│   │   │   ├── MetricsRepository.ts
│   │   │   ├── UserRepository.ts
│   │   │   └── index.ts                  # Barrel export
│   │   ├── sources/          # Local data sources
│   │   │   ├── MetricsLocalDataSource.ts
│   │   │   └── index.ts                  # Barrel export
│   │   └── network/          # Network layer
│   │       ├── datasources/  # Remote data sources (API calls)
│   │       │   ├── MetricsRemoteDataSource.ts
│   │       │   └── index.ts              # Barrel export
│   │       └── services/     # Network services
│   │           ├── MetricsService.ts
│   │           ├── UserService.ts
│   │           ├── QuickActionsService.ts
│   │           ├── SuggestionsService.ts
│   │           ├── ActivitiesService.ts
│   │           ├── AdditionalMetricsService.ts
│   │           └── index.ts              # Barrel export
│   │
│   ├── presentation/         # Presentation Layer (UI)
│   │   ├── screens/          # Screen components
│   │   │   └── Home/         # Home screen module (feature-based)
│   │   │       ├── HomeView.tsx          # View (UI only)
│   │   │       ├── useHomeViewModel.ts    # ViewModel (state & logic)
│   │   │       └── index.ts              # Barrel export
│   │   ├── components/      # Reusable UI components
│   │   │   └── common/       # Common components
│   │   │       ├── CircularProgressView.tsx
│   │   │       ├── CaloriesSummaryCard.tsx
│   │   │       ├── QuickActionButton.tsx
│   │   │       ├── MetricCard.tsx
│   │   │       ├── RecentActivityItem.tsx
│   │   │       ├── SmartSuggestionCard.tsx
│   │   │       ├── SectionHeader.tsx
│   │   │       ├── LoadingIndicator.tsx
│   │   │       ├── ErrorBoundary.tsx
│   │   │       └── index.ts              # Barrel export
│   │   ├── interfaces/       # Presentation interfaces (UI models)
│   │   │   ├── HealthMetric.ts
│   │   │   ├── QuickAction.ts
│   │   │   ├── RecentActivity.ts
│   │   │   ├── SmartSuggestion.ts
│   │   │   ├── AdditionalMetric.ts
│   │   │   └── index.ts                  # Barrel export
│   │   └── mappers/          # Presentation mappers/transformers
│   │       └── HealthMetricMapper.ts      # Domain → Presentation mapping
│   ├── types/                # Infrastructure types (not domain)
│   │   ├── Result.ts         # Functional error handling
│   │   ├── errors.ts         # Error types
│   │   └── index.ts          # Barrel export
│   └── utils/                # Utility functions
│       ├── constants/        # App-wide constants
│       │   └── index.ts
│       ├── formatters.ts
│       ├── greeting.ts
│       └── motivation.ts
├── App.tsx                   # Root component
├── index.js                  # Entry point
└── package.json
```

## 🏗️ Architecture

### Clean Architecture with MVVM Pattern

This project follows **Clean Architecture** principles with **MVVM** pattern, implementing industry best practices used by companies like Google, Microsoft, and Uber.

#### Architecture Layers (Strict Clean Architecture)

```
┌─────────────────────────────────────────┐
│  PRESENTATION LAYER                     │
│  - Views (React Components)             │
│  - ViewModels (State & UI Logic)        │
│  - Presentation Models                  │
└─────────────────────────────────────────┘
              ↕ (uses Use Cases)
┌─────────────────────────────────────────┐
│  DOMAIN LAYER (Core Business Logic)     │
│  - Entities (Business Objects)          │
│  - Use Cases/Interactors                │
│  - Repository Interfaces (Contracts)    │
└─────────────────────────────────────────┘
              ↕ (implements)
┌─────────────────────────────────────────┐
│  DATA LAYER (Implementation)            │
│  - Repository Implementations           │
│  - Data Sources (Local/Remote)          │
│  - Data Models                          │
└─────────────────────────────────────────┘
```

#### Dependency Rule (Clean Architecture Core Principle)
- **Inner layers don't know about outer layers**
- **Domain layer is independent** - no dependencies on frameworks
- **Dependencies point inward** - Presentation → Data → Domain
- **Use Cases orchestrate** - Business logic lives here

#### Screen Organization Pattern
Each screen follows a **feature-based module structure**:
```
presentation/screens/
└── Home/                    # Screen module
    ├── HomeView.tsx         # View (UI rendering only)
    ├── useHomeViewModel.ts  # ViewModel (state & presentation logic)
    └── index.ts             # Barrel export
```

**Benefits:**
- **Co-location**: View and ViewModel are together (easy to find)
- **Feature-based**: Each screen is self-contained
- **Scalable**: Easy to add new screens following the same pattern
- **Clear separation**: View handles UI, ViewModel handles logic

### Key Design Patterns

#### 1. **Use Case Pattern (Interactor Pattern)**
- **Domain Layer**: `GetTodayMetricsUseCase`, `UpdateMetricUseCase`, etc.
- **Single Responsibility**: Each use case = one business operation
- **Benefits**: 
  - Business logic is isolated and testable
  - Easy to understand what the app does
  - Independent of UI and data sources
- **Example**: `GetTodayMetricsUseCase` orchestrates fetching and validation

#### 2. **Repository Pattern**
- **Domain Layer**: Repository interfaces (`IMetricsRepository`, `IUserRepository`)
- **Data Layer**: Repository implementations (`MetricsRepository`, `UserRepository`)
- **Benefits**: 
  - Domain defines contracts, Data implements them
  - Easy testing (mock repositories)
  - Swappable data sources

#### 3. **Entity Pattern**
- **Domain Layer**: `DailyMetrics`, `User` entities with business rules
- **Business Rules**: Validation, calculations in entities
- **Benefits**: 
  - Core business logic in one place
  - Framework-independent
  - Reusable across layers

#### 4. **Presentation Interfaces vs DTOs vs Domain Entities**
Understanding the distinction is crucial for Clean Architecture:

**Domain Entities** (`domain/entities/`):
- Core business objects with business logic
- Example: `DailyMetrics`, `User`
- Framework-independent, pure business logic

**Presentation Interfaces** (`presentation/interfaces/`):
- UI display structures (NOT DTOs)
- Contains UI-specific properties (`color`, `icon`)
- Example: `HealthMetric`, `RecentActivity`, `QuickAction`
- Used for transforming domain entities to UI-ready data

**DTOs (Data Transfer Objects)**:
- Would be in `data/dto/` if we had API responses
- Used for API request/response serialization
- Raw network data structures
- Not present in this POC (using mock data)

**Key Point**: `RecentActivity`, `HealthMetric`, etc. are **Presentation Interfaces** (UI models), not DTOs. They're constructed in the app, not received from APIs.

#### 5. **Data Source Abstraction**
- **Local Data Sources**: `MetricsLocalDataSource` (AsyncStorage)
- **Remote Data Sources**: `MetricsRemoteDataSource` (API calls)
- **Benefits**: Easy to mock, swap implementations, offline-first support

#### 6. **Result Type Pattern**
- Functional error handling (inspired by Rust, Swift, Kotlin)
- Type-safe error handling without exceptions
- `Result<T, E>` pattern for all operations

#### 7. **Offline-First Strategy**
- Try local cache first (fast, works offline)
- Fallback to remote if cache miss/stale
- Cache remote data locally
- Industry best practice for mobile apps

### Key Principles

#### Clean Architecture Principles
- **Dependency Rule**: Dependencies point inward (Presentation → Domain → Data)
- **Independence**: Domain layer has no dependencies on frameworks
- **Testability**: Each layer can be tested independently
- **Framework Independence**: Business logic doesn't depend on React/React Native

#### SOLID Principles
- **Single Responsibility**: Each class/function has one job
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes must be substitutable for base types
- **Interface Segregation**: Clients depend on interfaces, not implementations
- **Dependency Inversion**: High-level modules depend on abstractions

#### Code Quality
- **Separation of Concerns**: Clear boundaries between layers
- **Component Reusability**: Modular, configurable UI components
- **Type Safety**: Full TypeScript implementation with strict mode
- **Business Logic Isolation**: Use Cases contain all business rules

## ✨ Features

- **Today's Progress**: Circular progress indicators for health metrics
- **Calories Summary**: Card with progress bar showing calories consumed vs target
- **Quick Actions**: Horizontal scrollable action buttons
- **Additional Metrics**: Expandable metric cards
- **Smart Suggestions**: AI-powered health recommendations
- **Recent Activity**: List of recent health activities

## 🛠️ Tech Stack

- **React Native** 0.73.2
- **Expo** ~50.0.0
- **TypeScript** 5.2.2
- **React Native Reanimated** - Animations
- **React Native SVG** - Custom graphics
- **AsyncStorage** - Local data persistence

## 🎯 Key Features & Best Practices

### Architecture Patterns
- ✅ **Clean Architecture** - Strict 3-layer architecture (Presentation, Domain, Data)
- ✅ **Use Case Pattern** - Business logic in Use Cases/Interactors
- ✅ **Entity Pattern** - Business entities with validation rules
- ✅ **Repository Pattern** - Clean data access abstraction
- ✅ **Data Source Abstraction** - Separate Local/Remote implementations
- ✅ **Result Type Pattern** - Functional error handling (Rust/Swift/Kotlin style)
- ✅ **Offline-First Strategy** - Cache-first, network fallback
- ✅ **Dependency Inversion** - High-level modules depend on abstractions
- ✅ **Interface Segregation** - Clients depend on interfaces, not implementations
- ✅ **MVVM Pattern** - ViewModels orchestrate Use Cases for UI

### Code Quality
- ✅ **Full TypeScript** - Strict mode, type safety throughout
- ✅ **Error Handling** - Custom error types with Result pattern
- ✅ **Separation of Concerns** - Clear layer boundaries
- ✅ **Testability** - Easy to mock repositories and data sources
- ✅ **Scalability** - Easy to add new data sources or repositories

### Industry Standards
- ✅ **Clean Architecture** - 3-layer architecture (Presentation, Domain, Data)
- ✅ **MVVM Pattern** - ViewModels as custom hooks
- ✅ **SOLID Principles** - Applied throughout the codebase
- ✅ **Co-located Styles** - React Native best practice
- ✅ **Barrel Exports** - Clean import structure

## 📝 Notes

- This is a POC focused on demonstrating enterprise-level architecture and code organization
- Data is simulated using mock services with AsyncStorage for persistence
- Components follow React Native best practices (co-located styles, TypeScript)
- MVVM pattern implemented using custom React hooks for ViewModels
- Repository pattern allows easy swapping of data sources (local storage, API, mock data)
- Result type pattern provides type-safe error handling without exceptions
