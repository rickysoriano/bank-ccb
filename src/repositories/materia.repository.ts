import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Materia, MateriaRelations} from '../models';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.id_materia,
  MateriaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Materia, dataSource);
  }
}
