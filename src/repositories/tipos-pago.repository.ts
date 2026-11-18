import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TiposPago, TiposPagoRelations} from '../models';

export class TiposPagoRepository extends DefaultCrudRepository<
  TiposPago,
  typeof TiposPago.prototype.id_tipo_pago,
  TiposPagoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TiposPago, dataSource);
  }
}
