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
  apellidoPaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoMaterno: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaDeNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  tipoPago: number;

  @property({
    type: 'boolean',
    required: true,
  })
  statusPago: boolean;

  @property({
    type: 'number',
    required: true,
  })
  pagoMensual: number;

  @property({
    type: 'number',
  })
  descuento?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoAlumno: string;

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
