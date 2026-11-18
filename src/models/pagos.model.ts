import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'pagos'},
  },
})
export class Pagos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_pago?: number;

  @property({
    type: 'number',
    required: true,
  })
  alumno_fk: number;

  @property({
    type: 'number',
    required: true,
  })
  tipo_pago_fk: number;

  @property({
    type: 'string',
    jsonSchema: {format: 'date'},
    required: true,
  })
  fecha_pago: string;

  @property({
    type: 'number',
    required: true,
  })
  monto: number;

  @property({
    type: 'number',
  })
  descuento?: number;

  @property({
    type: 'number',
  })
  descuento_porcentaje?: number;

  @property({
    type: 'string',
  })
  estado?: string;

  [prop: string]: any;

  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {}

export type PagosWithRelations = Pagos & PagosRelations;
