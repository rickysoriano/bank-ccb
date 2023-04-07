import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Tutores extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  turores?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoPaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoMaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tutores>) {
    super(data);
  }
}

export interface TutoresRelations {
  // describe navigational properties here
}

export type TutoresWithRelations = Tutores & TutoresRelations;
