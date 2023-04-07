import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Materia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_materia?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_Materia: string;

  @property({
    type: 'number',
    required: true,
  })
  fk_curso: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {
  // describe navigational properties here
}

export type MateriaWithRelations = Materia & MateriaRelations;
