import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AlumnosCursos, AlumnosCursosRelations} from '../models';

export class AlumnosCursosRepository extends DefaultCrudRepository<
  AlumnosCursos,
  typeof AlumnosCursos.prototype.id_alumnos,
  AlumnosCursosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AlumnosCursos, dataSource);
  }

  getAlumnosPorCurso(id_curso: number ,ciclo_escolar : string){

    let sql : string = `select distinct(a.id_alumnos) ,
    CONCAT(a.nombre,' ',a.apellido_paterno,' ',a.apellido_materno) as nombre
    from "alumnos-cursos" ac
    join alumnos a on a.id_alumnos = ac.alumno_fk
    join materia m on m.id_materia  = ac.materia_fk
    where m.fk_curso = ${id_curso}
    and ac.ciclo_escolar='${ciclo_escolar}';`


    return new Promise((resolve, reject)=>{
      this.dataSource.execute(sql)
      .then(result => resolve(result))
      .catch(error => reject(error));
    })

  }

  getCalificacionesAlumnos(id_alumno: number ,ciclo_escolar : string){

    let sql : string = `
    select m."nombre_Materia",
    ac.calificion
    from "alumnos-cursos" ac
    join materia m  on ac.materia_fk = m.id_materia
    where ac.alumno_fk  = ${id_alumno}
    and ac.ciclo_escolar = '${ciclo_escolar}';`

    return new Promise((resolve, reject)=>{
      this.dataSource.execute(sql)
      .then(result => resolve(result))
      .catch(error => reject(error));
    })

  }




}
