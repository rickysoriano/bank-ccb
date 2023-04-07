import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pagos, PagosRelations} from '../models';

export class PagosRepository extends DefaultCrudRepository<
  Pagos,
  typeof Pagos.prototype.id_pagos,
  PagosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Pagos, dataSource);
  }
}
