import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AlumnosCursos, AlumnosCursosRelations} from '../models';

export class AlumnosCursosRepository extends DefaultCrudRepository<
  AlumnosCursos,
  typeof AlumnosCursos.prototype.id_alumno_materia,
  AlumnosCursosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AlumnosCursos, dataSource);
  }

  async getAlumnosPorCurso(id_curso: number, _ciclo_escolar?: string) {
    const sql = `
      select distinct a.id_alumno,
        concat_ws(' ', a.nombre, a.apellido_paterno, a.apellido_materno) as nombre
      from alumnos_materias am
      join alumnos a on a.id_alumno = am.alumno_fk
      join materia m on m.id_materia = am.materia_fk
      where m.fk_curso = $1
      order by a.id_alumno`;
    return this.dataSource.execute(sql, [id_curso]);
  }

  async getCalificacionesAlumnos(id_alumno: number, _ciclo_escolar?: string) {
    const sql = `
      select m.nombre_materia, m.id_materia, am.calificacion
      from alumnos_materias am
      join materia m on m.id_materia = am.materia_fk
      where am.alumno_fk = $1
      order by m.nombre_materia`;
    return this.dataSource.execute(sql, [id_alumno]);
  }

  async asignarCalificaciones(
    alumno: number,
    materia: number,
    calificacion: number,
  ): Promise<AlumnosCursos> {
    const existing = await this.findOne({
      where: {alumno_fk: alumno, materia_fk: materia},
    });

    if (existing) {
      await this.updateById(existing.id_alumno_materia!, {calificacion});
      return this.findById(existing.id_alumno_materia!);
    }

    return this.create({
      alumno_fk: alumno,
      materia_fk: materia,
      calificacion,
    });
  }
}
