import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Asistencias, AsistenciasRelations} from '../models';
import {normalizarHora} from '../utils/hora';

export interface ConteoAsistenciasAlumno {
  alumno_fk: number;
  total: number;
  presentes: number;
}

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

  /**
   * Total histórico de escaneos por alumno. Cada escaneo se guarda en su
   * propia fila, por lo que también se suma `veces_registrado` para seguir
   * contando los registros creados antes de este cambio.
   */
  async contarPorAlumno(): Promise<ConteoAsistenciasAlumno[]> {
    const registros = await this.find({
      fields: {alumno_fk: true, presente: true, veces_registrado: true},
    });
    const conteos = new Map<number, {total: number; presentes: number}>();

    for (const registro of registros) {
      const conteo = conteos.get(registro.alumno_fk) ?? {
        total: 0,
        presentes: 0,
      };
      const veces = Number(registro.veces_registrado ?? 1);
      const vecesValidas = veces > 0 ? veces : 1;
      conteo.total += vecesValidas;
      if (registro.presente !== false) {
        conteo.presentes += vecesValidas;
      }
      conteos.set(registro.alumno_fk, conteo);
    }

    return [...conteos.entries()]
      .map(([alumno_fk, conteo]) => ({alumno_fk, ...conteo}))
      .sort((a, b) => a.alumno_fk - b.alumno_fk);
  }

  /**
   * Registra un escaneo de código QR como una fila nueva. Aunque el mismo
   * alumno se escanee varias veces en la misma fecha, cada escaneo queda
   * guardado con su hora.
   */
  async registrarAsistencia(
    id: number,
    fecha: string,
    hora?: string,
    presente = true,
  ): Promise<Asistencias> {
    const horaEscaneo = normalizarHora(hora);

    return this.create({
      alumno_fk: id,
      fecha,
      presente,
      veces_registrado: 1,
      ...(horaEscaneo ? {hora: horaEscaneo} : {}),
    });
  }
}
