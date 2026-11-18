import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'materia'},
  },
})
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
  nombre_materia: string;

  @property({
    type: 'number',
    required: true,
  })
  fk_curso: number;

  [prop: string]: any;

  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {}

export type MateriaWithRelations = Materia & MateriaRelations;
