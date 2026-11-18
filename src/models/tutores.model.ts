import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'tutores'},
  },
})
export class Tutores extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_tutor?: number;

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
  })
  telefono?: string;

  [prop: string]: any;

  constructor(data?: Partial<Tutores>) {
    super(data);
  }
}

export interface TutoresRelations {}

export type TutoresWithRelations = Tutores & TutoresRelations;
