import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Alumnos, AlumnosRelations} from '../models';

export class AlumnosRepository extends DefaultCrudRepository<
  Alumnos,
  typeof Alumnos.prototype.id_alumnos,
  AlumnosRelations
> {

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Alumnos, dataSource);
  }

  getNombreAlumno(id: number){

    let sql : string = `select concat(a.nombre,' ',a.apellido_paterno,' ',a.apellido_materno) as "nombre"
    from alumnos a
    where id_alumnos = ${id}`

    return new Promise((resolve, reject)=>{
      this.dataSource.execute(sql)
      .then(result => resolve(result))
      .catch(error => reject(error));
    })
  }

}
