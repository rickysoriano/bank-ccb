import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Asistencias, AsistenciasRelations} from '../models';
import {error} from 'console';

export class AsistenciasRepository extends DefaultCrudRepository<
  Asistencias,
  typeof Asistencias.prototype.id_asistencia,
  AsistenciasRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Asistencias, dataSource);
  }

  //asistencia : any []
  //id :number, fecha:string
  registrarAsistencia(id :number, fecha:string, hora:string){
    let sql : string = `select * from ccb_registrar_asistencia(
      '${id}',
      '${fecha}',
      '${hora}'
    )`
    // '${asistencia.id_alumno}',
    //   '${asistencia.fecha}'
    // '${id}',
    // '${fecha}',

    return new Promise((resolve, reject)=>{
      this.dataSource.execute(sql)
      .then(result => resolve(result))
      .catch(error => reject(error));
    })

  }

}
