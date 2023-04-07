import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tutores, TutoresRelations} from '../models';

export class TutoresRepository extends DefaultCrudRepository<
  Tutores,
  typeof Tutores.prototype.turores,
  TutoresRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tutores, dataSource);
  }
}
