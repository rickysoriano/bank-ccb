import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AlumnosCursos, AlumnosCursosRelations} from '../models';

export class AlumnosCursosRepository extends DefaultCrudRepository<
  AlumnosCursos,
  typeof AlumnosCursos.prototype.id_alumnos,
  AlumnosCursosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AlumnosCursos, dataSource);
  }
}
