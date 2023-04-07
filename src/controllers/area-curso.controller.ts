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
import {AreaCurso} from '../models';
import {AreaCursoRepository} from '../repositories';

export class AreaCursoController {
  constructor(
    @repository(AreaCursoRepository)
    public areaCursoRepository : AreaCursoRepository,
  ) {}

  @post('/area-cursos')
  @response(200, {
    description: 'AreaCurso model instance',
    content: {'application/json': {schema: getModelSchemaRef(AreaCurso)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaCurso, {
            title: 'NewAreaCurso',
            exclude: ['id_area_curso'],
          }),
        },
      },
    })
    areaCurso: Omit<AreaCurso, 'id_area_curso'>,
  ): Promise<AreaCurso> {
    return this.areaCursoRepository.create(areaCurso);
  }

  @get('/area-cursos/count')
  @response(200, {
    description: 'AreaCurso model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AreaCurso) where?: Where<AreaCurso>,
  ): Promise<Count> {
    return this.areaCursoRepository.count(where);
  }

  @get('/area-cursos')
  @response(200, {
    description: 'Array of AreaCurso model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AreaCurso, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AreaCurso) filter?: Filter<AreaCurso>,
  ): Promise<AreaCurso[]> {
    return this.areaCursoRepository.find(filter);
  }

  @patch('/area-cursos')
  @response(200, {
    description: 'AreaCurso PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaCurso, {partial: true}),
        },
      },
    })
    areaCurso: AreaCurso,
    @param.where(AreaCurso) where?: Where<AreaCurso>,
  ): Promise<Count> {
    return this.areaCursoRepository.updateAll(areaCurso, where);
  }

  @get('/area-cursos/{id}')
  @response(200, {
    description: 'AreaCurso model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AreaCurso, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AreaCurso, {exclude: 'where'}) filter?: FilterExcludingWhere<AreaCurso>
  ): Promise<AreaCurso> {
    return this.areaCursoRepository.findById(id, filter);
  }

  @patch('/area-cursos/{id}')
  @response(204, {
    description: 'AreaCurso PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaCurso, {partial: true}),
        },
      },
    })
    areaCurso: AreaCurso,
  ): Promise<void> {
    await this.areaCursoRepository.updateById(id, areaCurso);
  }

  @put('/area-cursos/{id}')
  @response(204, {
    description: 'AreaCurso PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() areaCurso: AreaCurso,
  ): Promise<void> {
    await this.areaCursoRepository.replaceById(id, areaCurso);
  }

  @del('/area-cursos/{id}')
  @response(204, {
    description: 'AreaCurso DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.areaCursoRepository.deleteById(id);
  }
}
