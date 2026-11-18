import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'area_curso'},
  },
})
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

  [prop: string]: any;

  constructor(data?: Partial<AreaCurso>) {
    super(data);
  }
}

export interface AreaCursoRelations {}

export type AreaCursoWithRelations = AreaCurso & AreaCursoRelations;
