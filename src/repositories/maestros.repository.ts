import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Maestros, MaestrosRelations} from '../models';

export class MaestrosRepository extends DefaultCrudRepository<
  Maestros,
  typeof Maestros.prototype.id_maestro,
  MaestrosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Maestros, dataSource);
  }
}
