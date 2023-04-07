import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Asistencias} from '../models';
import {AsistenciasRepository} from '../repositories';

export class AsistenciasController {
  constructor(
    @repository(AsistenciasRepository)
    public asistenciasRepository : AsistenciasRepository,
  ) {}

  @post('/asistencias')
  @response(200, {
    description: 'Asistencias model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asistencias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencias, {
            title: 'NewAsistencias',
            exclude: ['id_asistencia'],
          }),
        },
      },
    })
    asistencias: Omit<Asistencias, 'id_asistencia'>,
  ): Promise<Asistencias> {
    return this.asistenciasRepository.create(asistencias);
  }

  @get('/asistencias/count')
  @response(200, {
    description: 'Asistencias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asistencias) where?: Where<Asistencias>,
  ): Promise<Count> {
    return this.asistenciasRepository.count(where);
  }

  @get('/asistencias')
  @response(200, {
    description: 'Array of Asistencias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asistencias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asistencias) filter?: Filter<Asistencias>,
  ): Promise<Asistencias[]> {
    return this.asistenciasRepository.find(filter);
  }

  @patch('/asistencias')
  @response(200, {
    description: 'Asistencias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencias, {partial: true}),
        },
      },
    })
    asistencias: Asistencias,
    @param.where(Asistencias) where?: Where<Asistencias>,
  ): Promise<Count> {
    return this.asistenciasRepository.updateAll(asistencias, where);
  }

  @get('/asistencias/{id}')
  @response(200, {
    description: 'Asistencias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asistencias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Asistencias, {exclude: 'where'}) filter?: FilterExcludingWhere<Asistencias>
  ): Promise<Asistencias> {
    return this.asistenciasRepository.findById(id, filter);
  }

  @patch('/asistencias/{id}')
  @response(204, {
    description: 'Asistencias PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencias, {partial: true}),
        },
      },
    })
    asistencias: Asistencias,
  ): Promise<void> {
    await this.asistenciasRepository.updateById(id, asistencias);
  }

  @put('/asistencias/{id}')
  @response(204, {
    description: 'Asistencias PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() asistencias: Asistencias,
  ): Promise<void> {
    await this.asistenciasRepository.replaceById(id, asistencias);
  }

  @del('/asistencias/{id}')
  @response(204, {
    description: 'Asistencias DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.asistenciasRepository.deleteById(id);
  }
}
