import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'cursos'},
  },
})
export class Cursos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_curso?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_curso: string;

  @property({
    type: 'string',
  })
  tipo_curso?: string;

  @property({
    type: 'number',
    required: true,
  })
  fk_area_curso: number;

  [prop: string]: any;

  constructor(data?: Partial<Cursos>) {
    super(data);
  }
}

export interface CursosRelations {}

export type CursosWithRelations = Cursos & CursosRelations;
