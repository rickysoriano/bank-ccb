import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AreaCurso, AreaCursoRelations} from '../models';

export class AreaCursoRepository extends DefaultCrudRepository<
  AreaCurso,
  typeof AreaCurso.prototype.id_area_curso,
  AreaCursoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AreaCurso, dataSource);
  }
}
