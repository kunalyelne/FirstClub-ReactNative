import {Container} from 'inversify';
import {TYPES} from './Types';

import {IMetricsLocalDataSource} from '../../domain/datasources/ILocalDataSource';
import {IMetricsRemoteDataSource} from '../../domain/datasources/IRemoteDataSource';
import {IMetricsRepository} from '../../domain/repositories/IMetricsRepository';
import {IUserRepository} from '../../domain/repositories/IUserRepository';

import {MetricsLocalDataSource} from '../../data/sources/MetricsLocalDataSource';
import {MetricsRemoteDataSource} from '../../data/network/datasources/MetricsRemoteDataSource';
import {MetricsRepository} from '../../data/repositories/MetricsRepository';
import {UserRepository} from '../../data/repositories/UserRepository';

import {GetTodayMetricsUseCase} from '../../domain/usecases/GetTodayMetricsUseCase';
import {UpdateMetricUseCase} from '../../domain/usecases/UpdateMetricUseCase';
import {RefreshMetricsUseCase} from '../../domain/usecases/RefreshMetricsUseCase';
import {GetUserProfileUseCase} from '../../domain/usecases/GetUserProfileUseCase';

export const createContainer = (): Container => {
  const container = new Container();

  container
    .bind<IMetricsLocalDataSource>(TYPES.IMetricsLocalDataSource)
    .to(MetricsLocalDataSource)
    .inSingletonScope();

  container
    .bind<IMetricsRemoteDataSource>(TYPES.IMetricsRemoteDataSource)
    .to(MetricsRemoteDataSource)
    .inSingletonScope();

  container
    .bind<IMetricsRepository>(TYPES.IMetricsRepository)
    .to(MetricsRepository)
    .inSingletonScope();

  container
    .bind<IUserRepository>(TYPES.IUserRepository)
    .to(UserRepository)
    .inSingletonScope();

  container
    .bind<GetTodayMetricsUseCase>(TYPES.GetTodayMetricsUseCase)
    .to(GetTodayMetricsUseCase)
    .inSingletonScope();

  container
    .bind<UpdateMetricUseCase>(TYPES.UpdateMetricUseCase)
    .to(UpdateMetricUseCase)
    .inSingletonScope();

  container
    .bind<RefreshMetricsUseCase>(TYPES.RefreshMetricsUseCase)
    .to(RefreshMetricsUseCase)
    .inSingletonScope();

  container
    .bind<GetUserProfileUseCase>(TYPES.GetUserProfileUseCase)
    .to(GetUserProfileUseCase)
    .inSingletonScope();

  return container;
};

export const container = createContainer();

