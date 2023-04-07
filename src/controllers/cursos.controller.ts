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
import {Cursos} from '../models';
import {CursosRepository} from '../repositories';

export class CursosController {
  constructor(
    @repository(CursosRepository)
    public cursosRepository : CursosRepository,
  ) {}

  @post('/cursos')
  @response(200, {
    description: 'Cursos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cursos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cursos, {
            title: 'NewCursos',
            exclude: ['id_cursos'],
          }),
        },
      },
    })
    cursos: Omit<Cursos, 'id_cursos'>,
  ): Promise<Cursos> {
    return this.cursosRepository.create(cursos);
  }

  @get('/cursos/count')
  @response(200, {
    description: 'Cursos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cursos) where?: Where<Cursos>,
  ): Promise<Count> {
    return this.cursosRepository.count(where);
  }

  @get('/cursos')
  @response(200, {
    description: 'Array of Cursos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cursos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cursos) filter?: Filter<Cursos>,
  ): Promise<Cursos[]> {
    return this.cursosRepository.find(filter);
  }

  @patch('/cursos')
  @response(200, {
    description: 'Cursos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cursos, {partial: true}),
        },
      },
    })
    cursos: Cursos,
    @param.where(Cursos) where?: Where<Cursos>,
  ): Promise<Count> {
    return this.cursosRepository.updateAll(cursos, where);
  }

  @get('/cursos/{id}')
  @response(200, {
    description: 'Cursos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cursos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cursos, {exclude: 'where'}) filter?: FilterExcludingWhere<Cursos>
  ): Promise<Cursos> {
    return this.cursosRepository.findById(id, filter);
  }

  @patch('/cursos/{id}')
  @response(204, {
    description: 'Cursos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cursos, {partial: true}),
        },
      },
    })
    cursos: Cursos,
  ): Promise<void> {
    await this.cursosRepository.updateById(id, cursos);
  }

  @put('/cursos/{id}')
  @response(204, {
    description: 'Cursos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cursos: Cursos,
  ): Promise<void> {
    await this.cursosRepository.replaceById(id, cursos);
  }

  @del('/cursos/{id}')
  @response(204, {
    description: 'Cursos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cursosRepository.deleteById(id);
  }
}
