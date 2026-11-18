import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'asistencias'},
  },
})
export class Asistencias extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_asistencia?: number;

  @property({
    type: 'number',
    required: true,
  })
  alumno_fk: number;

  @property({
    type: 'string',
    jsonSchema: {format: 'date'},
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  hora?: string;

  @property({
    type: 'boolean',
  })
  presente?: boolean;

  @property({
    type: 'number',
    default: 1,
  })
  veces_registrado?: number;

  [prop: string]: any;

  constructor(data?: Partial<Asistencias>) {
    super(data);
  }
}

export interface AsistenciasRelations {}

export type AsistenciasWithRelations = Asistencias & AsistenciasRelations;
