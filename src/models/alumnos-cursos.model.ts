import {Entity, model, property} from '@loopback/repository';

// The API historically calls this resource "alumnos-cursos". It maps to the
// `alumnos_materias` table in the current database schema.
@model({
  settings: {
    postgresql: {schema: 'public', table: 'alumnos_materias'},
  },
})
export class AlumnosCursos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_alumno_materia?: number;

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
    jsonSchema: {nullable: true},
  })
  calificacion?: number | null;

  [prop: string]: any;

  constructor(data?: Partial<AlumnosCursos>) {
    super(data);
  }
}

export interface AlumnosCursosRelations {}

export type AlumnosCursosWithRelations = AlumnosCursos &
  AlumnosCursosRelations;
