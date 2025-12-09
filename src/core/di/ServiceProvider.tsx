import React, {createContext, useContext, ReactNode, useMemo} from 'react';
import {Container} from 'inversify';
import {container as defaultContainer} from './Container';
import {TYPES} from './Types';
import {IMetricsRepository} from '../../domain/repositories/IMetricsRepository';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {GetTodayMetricsUseCase} from '../../domain/usecases/GetTodayMetricsUseCase';
import {UpdateMetricUseCase} from '../../domain/usecases/UpdateMetricUseCase';
import {RefreshMetricsUseCase} from '../../domain/usecases/RefreshMetricsUseCase';
import {GetUserProfileUseCase} from '../../domain/usecases/GetUserProfileUseCase';

export interface IServiceContainer {
  getMetricsRepository(): IMetricsRepository;
  getUserRepository(): IUserRepository;
  getGetTodayMetricsUseCase(): GetTodayMetricsUseCase;
  getUpdateMetricUseCase(): UpdateMetricUseCase;
  getRefreshMetricsUseCase(): RefreshMetricsUseCase;
  getGetUserProfileUseCase(): GetUserProfileUseCase;
}

class ServiceContainer implements IServiceContainer {
  constructor(private container: Container) {}

  getMetricsRepository(): IMetricsRepository {
    return this.container.get<IMetricsRepository>(TYPES.IMetricsRepository);
  }

  getUserRepository(): IUserRepository {
    return this.container.get<IUserRepository>(TYPES.IUserRepository);
  }

  getGetTodayMetricsUseCase(): GetTodayMetricsUseCase {
    return this.container.get<GetTodayMetricsUseCase>(
      TYPES.GetTodayMetricsUseCase,
    );
  }

  getUpdateMetricUseCase(): UpdateMetricUseCase {
    return this.container.get<UpdateMetricUseCase>(TYPES.UpdateMetricUseCase);
  }

  getRefreshMetricsUseCase(): RefreshMetricsUseCase {
    return this.container.get<RefreshMetricsUseCase>(
      TYPES.RefreshMetricsUseCase,
    );
  }

  getGetUserProfileUseCase(): GetUserProfileUseCase {
    return this.container.get<GetUserProfileUseCase>(
      TYPES.GetUserProfileUseCase,
    );
  }
}

const ServiceContext = createContext<IServiceContainer | null>(null);

interface ServiceProviderProps {
  children: ReactNode;
  container?: Container;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
  container = defaultContainer,
}) => {
  const serviceContainer = useMemo(
    () => new ServiceContainer(container),
    [container],
  );

  return (
    <ServiceContext.Provider value={serviceContainer}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = (): IServiceContainer => {
  const serviceContainer = useContext(ServiceContext);

  if (!serviceContainer) {
    throw new Error(
      'useServices must be used within a ServiceProvider. ' +
        'Wrap your app with <ServiceProvider> in App.tsx',
    );
  }

  return serviceContainer;
};

