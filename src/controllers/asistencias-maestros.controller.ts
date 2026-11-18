import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {AsistenciasMaestros} from '../models';
import {AsistenciasMaestrosRepository} from '../repositories';

export class AsistenciasMaestrosController {
  constructor(
    @repository(AsistenciasMaestrosRepository)
    public asistenciasMaestrosRepository: AsistenciasMaestrosRepository,
  ) {}

  @post('/asistencias-maestros')
  @response(200, {
    description: 'AsistenciasMaestros model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(AsistenciasMaestros)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenciasMaestros, {
            title: 'NewAsistenciasMaestros',
            exclude: ['id_asistencia_maestro'],
          }),
        },
      },
    })
    asistenciasMaestros: Omit<AsistenciasMaestros, 'id_asistencia_maestro'>,
  ): Promise<AsistenciasMaestros> {
    return this.asistenciasMaestrosRepository.create(asistenciasMaestros);
  }

  @get('/asistencias-maestros/count')
  @response(200, {
    description: 'AsistenciasMaestros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsistenciasMaestros) where?: Where<AsistenciasMaestros>,
  ): Promise<Count> {
    return this.asistenciasMaestrosRepository.count(where);
  }

  @get('/asistencias-maestros')
  @response(200, {
    description: 'Array of AsistenciasMaestros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsistenciasMaestros, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(AsistenciasMaestros)
    filter?: Filter<AsistenciasMaestros>,
  ): Promise<AsistenciasMaestros[]> {
    return this.asistenciasMaestrosRepository.find(filter);
  }

  @patch('/asistencias-maestros')
  @response(200, {
    description: 'AsistenciasMaestros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenciasMaestros, {partial: true}),
        },
      },
    })
    asistenciasMaestros: AsistenciasMaestros,
    @param.where(AsistenciasMaestros)
    where?: Where<AsistenciasMaestros>,
  ): Promise<Count> {
    return this.asistenciasMaestrosRepository.updateAll(
      asistenciasMaestros,
      where,
    );
  }

  @get('/asistencias-maestros/{id}')
  @response(200, {
    description: 'AsistenciasMaestros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsistenciasMaestros, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AsistenciasMaestros, {exclude: 'where'})
    filter?: FilterExcludingWhere<AsistenciasMaestros>,
  ): Promise<AsistenciasMaestros> {
    return this.asistenciasMaestrosRepository.findById(id, filter);
  }

  @patch('/asistencias-maestros/{id}')
  @response(204, {
    description: 'AsistenciasMaestros PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenciasMaestros, {partial: true}),
        },
      },
    })
    asistenciasMaestros: AsistenciasMaestros,
  ): Promise<void> {
    await this.asistenciasMaestrosRepository.updateById(
      id,
      asistenciasMaestros,
    );
  }

  @put('/asistencias-maestros/{id}')
  @response(204, {
    description: 'AsistenciasMaestros PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() asistenciasMaestros: AsistenciasMaestros,
  ): Promise<void> {
    await this.asistenciasMaestrosRepository.replaceById(
      id,
      asistenciasMaestros,
    );
  }

  @del('/asistencias-maestros/{id}')
  @response(204, {
    description: 'AsistenciasMaestros DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.asistenciasMaestrosRepository.deleteById(id);
  }

  @get('/asistencias-maestros/registrar-asistencia/{id}/{fecha}/{hora}')
  @response(200, {
    description: 'AsistenciasMaestros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsistenciasMaestros, {
          includeRelations: true,
        }),
      },
    },
  })
  async registrarAsistencia(
    @param.path.number('id') id: number,
    @param.path.string('fecha') fecha: string,
    @param.path.string('hora') hora: string,
  ): Promise<AsistenciasMaestros> {
    return this.asistenciasMaestrosRepository.registrarAsistencia(
      id,
      fecha,
      hora,
    );
  }
}
