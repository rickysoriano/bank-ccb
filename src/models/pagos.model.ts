import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Pagos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_pagos?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  frecuenciapago: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {
  // describe navigational properties here
}

export type PagosWithRelations = Pagos & PagosRelations;
