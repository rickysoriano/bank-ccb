import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {
  AsistenciasMaestros,
  AsistenciasMaestrosRelations,
} from '../models';
import {normalizarHora} from '../utils/hora';

export class AsistenciasMaestrosRepository extends DefaultCrudRepository<
  AsistenciasMaestros,
  typeof AsistenciasMaestros.prototype.id_asistencia_maestro,
  AsistenciasMaestrosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AsistenciasMaestros, dataSource);
  }

  /**
   * Registra un escaneo de código QR como una fila nueva. Aunque el mismo
   * maestro se escanee varias veces en la misma fecha, cada escaneo queda
   * guardado con su hora.
   */
  async registrarAsistencia(
    id: number,
    fecha: string,
    hora?: string,
    presente = true,
  ): Promise<AsistenciasMaestros> {
    const horaEscaneo = normalizarHora(hora);

    return this.create({
      maestro_fk: id,
      fecha,
      presente,
      veces_registrado: 1,
      ...(horaEscaneo ? {hora: horaEscaneo} : {}),
    });
  }
}
