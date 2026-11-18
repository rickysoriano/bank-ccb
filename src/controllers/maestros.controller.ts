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
import {Maestros} from '../models';
import {MaestrosRepository} from '../repositories';

export class MaestrosController {
  constructor(
    @repository(MaestrosRepository)
    public maestrosRepository: MaestrosRepository,
  ) {}

  @post('/maestros')
  @response(200, {
    description: 'Maestros model instance',
    content: {'application/json': {schema: getModelSchemaRef(Maestros)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maestros, {
            title: 'NewMaestros',
            exclude: ['id_maestro'],
          }),
        },
      },
    })
    maestros: Omit<Maestros, 'id_maestro'>,
  ): Promise<Maestros> {
    return this.maestrosRepository.create(maestros);
  }

  @get('/maestros/count')
  @response(200, {
    description: 'Maestros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Maestros) where?: Where<Maestros>,
  ): Promise<Count> {
    return this.maestrosRepository.count(where);
  }

  @get('/maestros')
  @response(200, {
    description: 'Array of Maestros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Maestros, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Maestros) filter?: Filter<Maestros>,
  ): Promise<Maestros[]> {
    return this.maestrosRepository.find(filter);
  }

  @patch('/maestros')
  @response(200, {
    description: 'Maestros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maestros, {partial: true}),
        },
      },
    })
    maestros: Maestros,
    @param.where(Maestros) where?: Where<Maestros>,
  ): Promise<Count> {
    return this.maestrosRepository.updateAll(maestros, where);
  }

  @get('/maestros/{id}')
  @response(200, {
    description: 'Maestros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Maestros, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Maestros, {exclude: 'where'})
    filter?: FilterExcludingWhere<Maestros>,
  ): Promise<Maestros> {
    return this.maestrosRepository.findById(id, filter);
  }

  @patch('/maestros/{id}')
  @response(204, {
    description: 'Maestros PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maestros, {partial: true}),
        },
      },
    })
    maestros: Maestros,
  ): Promise<void> {
    await this.maestrosRepository.updateById(id, maestros);
  }

  @put('/maestros/{id}')
  @response(204, {
    description: 'Maestros PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() maestros: Maestros,
  ): Promise<void> {
    await this.maestrosRepository.replaceById(id, maestros);
  }

  @del('/maestros/{id}')
  @response(204, {
    description: 'Maestros DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.maestrosRepository.deleteById(id);
  }
}
