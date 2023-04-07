import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
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
  fk_alumno: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Asistencias>) {
    super(data);
  }
}

export interface AsistenciasRelations {
  // describe navigational properties here
}

export type AsistenciasWithRelations = Asistencias & AsistenciasRelations;
