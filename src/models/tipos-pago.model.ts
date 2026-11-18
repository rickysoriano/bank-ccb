import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'tipos_pago'},
  },
})
export class TiposPago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_tipo_pago?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  frecuencia_pago: string;

  [prop: string]: any;

  constructor(data?: Partial<TiposPago>) {
    super(data);
  }
}

export interface TiposPagoRelations {}

export type TiposPagoWithRelations = TiposPago & TiposPagoRelations;
