import {Entity, Model, model, property} from '@loopback/repository';

@model(
  {
    settings: {
    postgresql: {schema: 'public', table: 'alumnos'}
    }
  }
)
export class Alumnos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_alumnos?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido_paterno: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido_materno: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'number',
    required: true,
  })
  tipo_pago: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status_pago: boolean;

  @property({
    type: 'number',
    required: true,
  })
  pago_mensual: number;

  @property({
    type: 'number',
  })
  descuento?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pago: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_alumno: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  turno: string;

  

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Alumnos>) {
    super(data);
  }
}

export interface AlumnosRelations {
  // describe navigational properties here
}

export type AlumnosWithRelations = Alumnos & AlumnosRelations;
