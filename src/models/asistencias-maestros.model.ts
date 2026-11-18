import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'asistencias_maestros'},
  },
})
export class AsistenciasMaestros extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_asistencia_maestro?: number;

  @property({
    type: 'number',
    required: true,
  })
  maestro_fk: number;

  @property({
    type: 'string',
    jsonSchema: {format: 'date'},
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  hora?: string;

  @property({
    type: 'boolean',
  })
  presente?: boolean;

  @property({
    type: 'number',
    default: 1,
  })
  veces_registrado?: number;

  [prop: string]: any;

  constructor(data?: Partial<AsistenciasMaestros>) {
    super(data);
  }
}

export interface AsistenciasMaestrosRelations {}

export type AsistenciasMaestrosWithRelations = AsistenciasMaestros &
  AsistenciasMaestrosRelations;
