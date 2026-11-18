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
import {TiposPago} from '../models';
import {TiposPagoRepository} from '../repositories';

export class TiposPagoController {
  constructor(
    @repository(TiposPagoRepository)
    public tiposPagoRepository: TiposPagoRepository,
  ) {}

  @post('/tipos-pago')
  @response(200, {
    description: 'TiposPago model instance',
    content: {'application/json': {schema: getModelSchemaRef(TiposPago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposPago, {
            title: 'NewTiposPago',
            exclude: ['id_tipo_pago'],
          }),
        },
      },
    })
    tiposPago: Omit<TiposPago, 'id_tipo_pago'>,
  ): Promise<TiposPago> {
    return this.tiposPagoRepository.create(tiposPago);
  }

  @get('/tipos-pago/count')
  @response(200, {
    description: 'TiposPago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TiposPago) where?: Where<TiposPago>,
  ): Promise<Count> {
    return this.tiposPagoRepository.count(where);
  }

  @get('/tipos-pago')
  @response(200, {
    description: 'Array of TiposPago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TiposPago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TiposPago) filter?: Filter<TiposPago>,
  ): Promise<TiposPago[]> {
    return this.tiposPagoRepository.find(filter);
  }

  @patch('/tipos-pago')
  @response(200, {
    description: 'TiposPago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposPago, {partial: true}),
        },
      },
    })
    tiposPago: TiposPago,
    @param.where(TiposPago) where?: Where<TiposPago>,
  ): Promise<Count> {
    return this.tiposPagoRepository.updateAll(tiposPago, where);
  }

  @get('/tipos-pago/{id}')
  @response(200, {
    description: 'TiposPago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TiposPago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TiposPago, {exclude: 'where'})
    filter?: FilterExcludingWhere<TiposPago>,
  ): Promise<TiposPago> {
    return this.tiposPagoRepository.findById(id, filter);
  }

  @patch('/tipos-pago/{id}')
  @response(204, {
    description: 'TiposPago PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposPago, {partial: true}),
        },
      },
    })
    tiposPago: TiposPago,
  ): Promise<void> {
    await this.tiposPagoRepository.updateById(id, tiposPago);
  }

  @put('/tipos-pago/{id}')
  @response(204, {
    description: 'TiposPago PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tiposPago: TiposPago,
  ): Promise<void> {
    await this.tiposPagoRepository.replaceById(id, tiposPago);
  }

  @del('/tipos-pago/{id}')
  @response(204, {
    description: 'TiposPago DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tiposPagoRepository.deleteById(id);
  }
}
