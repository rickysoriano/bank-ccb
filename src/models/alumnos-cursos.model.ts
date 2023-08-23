import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
    postgresql: {schema: 'public', table: 'alumnos-cursos'}
    }
  }
)
export class AlumnosCursos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_alumnos_cursos?: number;

  @property({
    type: 'number',
    required: true,
  })
  alumno_fk: number;

  @property({
    type: 'number',
    required: true,
  })
  materia_fk: number;

  @property({
    type: 'number',
  })
  calificion?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AlumnosCursos>) {
    super(data);
  }
}

export interface AlumnosCursosRelations {
  // describe navigational properties here
}

export type AlumnosCursosWithRelations = AlumnosCursos & AlumnosCursosRelations;
