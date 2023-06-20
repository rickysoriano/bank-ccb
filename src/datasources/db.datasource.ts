import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'db',
//   connector: 'postgresql',
//   url: '',
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: '12345',
//   database: 'SistemaCCB1'
// };

const config = {
  name: 'mfzmzdoq',
  connector: 'postgresql',
  host: 'kashin.db.elephantsql.com',
  port: 5432,
  user: 'mfzmzdoq',
  password: 'CsSqbXiU6OKPz0RVAlfe1s0FtqWTDD63',
  database: 'mfzmzdoq'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
