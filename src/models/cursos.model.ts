import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Cursos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_cursos?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_curso: string;

  @property({
    type: 'number',
    required: true,
  })
  fk_area_curso: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cursos>) {
    super(data);
  }
}

export interface CursosRelations {
  // describe navigational properties here
}

export type CursosWithRelations = Cursos & CursosRelations;
