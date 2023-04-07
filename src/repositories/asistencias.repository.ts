import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Asistencias, AsistenciasRelations} from '../models';

export class AsistenciasRepository extends DefaultCrudRepository<
  Asistencias,
  typeof Asistencias.prototype.id_asistencia,
  AsistenciasRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Asistencias, dataSource);
  }
}
