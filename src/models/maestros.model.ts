import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'maestros'},
  },
})
export class Maestros extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_maestro?: number;

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
  correo?: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
  })
  turno?: string;

  [prop: string]: any;

  constructor(data?: Partial<Maestros>) {
    super(data);
  }
}

export interface MaestrosRelations {}

export type MaestrosWithRelations = Maestros & MaestrosRelations;
