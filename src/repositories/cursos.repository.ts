import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cursos, CursosRelations} from '../models';

export class CursosRepository extends DefaultCrudRepository<
  Cursos,
  typeof Cursos.prototype.id_cursos,
  CursosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cursos, dataSource);
  }
}
