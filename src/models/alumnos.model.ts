import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'alumnos'},
  },
})
export class Alumnos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_alumno?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  apellido_paterno?: string;

  @property({
    type: 'string',
  })
  apellido_materno?: string;

  @property({
    type: 'string',
    jsonSchema: {format: 'date'},
  })
  fecha_nacimiento?: string;

  @property({
    type: 'string',
    jsonSchema: {format: 'date'},
  })
  fecha_ingreso?: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'string',
  })
  correo?: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
  })
  turno?: string;

  @property({
    type: 'string',
  })
  tipo_alumno?: string;

  @property({
    type: 'number',
  })
  tutor_fk?: number;

  [prop: string]: any;

  constructor(data?: Partial<Alumnos>) {
    super(data);
  }
}

export interface AlumnosRelations {}

export type AlumnosWithRelations = Alumnos & AlumnosRelations;
