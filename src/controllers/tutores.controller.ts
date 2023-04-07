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
import {Tutores} from '../models';
import {TutoresRepository} from '../repositories';

export class TutoresController {
  constructor(
    @repository(TutoresRepository)
    public tutoresRepository : TutoresRepository,
  ) {}

  @post('/tutores')
  @response(200, {
    description: 'Tutores model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tutores)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutores, {
            title: 'NewTutores',
            exclude: ['tutores'],
          }),
        },
      },
    })
    tutores: Omit<Tutores, 'tutores'>,
  ): Promise<Tutores> {
    return this.tutoresRepository.create(tutores);
  }

  @get('/tutores/count')
  @response(200, {
    description: 'Tutores model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tutores) where?: Where<Tutores>,
  ): Promise<Count> {
    return this.tutoresRepository.count(where);
  }

  @get('/tutores')
  @response(200, {
    description: 'Array of Tutores model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tutores, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tutores) filter?: Filter<Tutores>,
  ): Promise<Tutores[]> {
    return this.tutoresRepository.find(filter);
  }

  @patch('/tutores')
  @response(200, {
    description: 'Tutores PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutores, {partial: true}),
        },
      },
    })
    tutores: Tutores,
    @param.where(Tutores) where?: Where<Tutores>,
  ): Promise<Count> {
    return this.tutoresRepository.updateAll(tutores, where);
  }

  @get('/tutores/{id}')
  @response(200, {
    description: 'Tutores model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tutores, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tutores, {exclude: 'where'}) filter?: FilterExcludingWhere<Tutores>
  ): Promise<Tutores> {
    return this.tutoresRepository.findById(id, filter);
  }

  @patch('/tutores/{id}')
  @response(204, {
    description: 'Tutores PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutores, {partial: true}),
        },
      },
    })
    tutores: Tutores,
  ): Promise<void> {
    await this.tutoresRepository.updateById(id, tutores);
  }

  @put('/tutores/{id}')
  @response(204, {
    description: 'Tutores PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tutores: Tutores,
  ): Promise<void> {
    await this.tutoresRepository.replaceById(id, tutores);
  }

  @del('/tutores/{id}')
  @response(204, {
    description: 'Tutores DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tutoresRepository.deleteById(id);
  }
}
