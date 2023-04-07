import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class AreaCurso extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_area_curso?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_area: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AreaCurso>) {
    super(data);
  }
}

export interface AreaCursoRelations {
  // describe navigational properties here
}

export type AreaCursoWithRelations = AreaCurso & AreaCursoRelations;
