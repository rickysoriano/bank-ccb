import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Alumnos, AlumnosRelations} from '../models';

export class AlumnosRepository extends DefaultCrudRepository<
  Alumnos,
  typeof Alumnos.prototype.id_alumno,
  AlumnosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Alumnos, dataSource);
  }

  async getNombreAlumno(id: number) {
    const sql = `
      select concat_ws(' ', a.nombre, a.apellido_paterno, a.apellido_materno) as nombre
      from alumnos a
      where a.id_alumno = $1`;
    return this.dataSource.execute(sql, [id]);
  }

  async getAlumnobyNombreCompleto(
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    fecha_nacimiento: string,
  ) {
    const sql = `
      select *
      from alumnos
      where nombre = $1
        and apellido_paterno = $2
        and apellido_materno = $3
        and fecha_nacimiento = $4`;
    return this.dataSource.execute(sql, [
      nombre,
      apellido_paterno,
      apellido_materno,
      fecha_nacimiento,
    ]);
  }
}
