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
import {AlumnosCursos, Materia} from '../models';
import {AlumnosCursosRepository} from '../repositories';

export class AlumnosCursosController {
  constructor(
    @repository(AlumnosCursosRepository)
    public alumnosCursosRepository : AlumnosCursosRepository,
  ) {}

  @post('/alumnos-cursos')
  @response(200, {
    description: 'AlumnosCursos model instance',
    content: {'application/json': {schema: getModelSchemaRef(AlumnosCursos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnosCursos, {
            title: 'NewAlumnosCursos',
            exclude: ['id_alumnos-cursos'],
          }),
        },
      },
    })
    alumnosCursos: Omit<AlumnosCursos, 'id_alumnos-cursos'>,
  ): Promise<AlumnosCursos> {
    return this.alumnosCursosRepository.create(alumnosCursos);
  }

  @get('/alumnos-cursos/count')
  @response(200, {
    description: 'AlumnosCursos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AlumnosCursos) where?: Where<AlumnosCursos>,
  ): Promise<Count> {
    return this.alumnosCursosRepository.count(where);
  }

  @get('/alumnos-cursos')
  @response(200, {
    description: 'Array of AlumnosCursos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AlumnosCursos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AlumnosCursos) filter?: Filter<AlumnosCursos>,
  ): Promise<AlumnosCursos[]> {
    return this.alumnosCursosRepository.find(filter);
  }

  @patch('/alumnos-cursos')
  @response(200, {
    description: 'AlumnosCursos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnosCursos, {partial: true}),
        },
      },
    })
    alumnosCursos: AlumnosCursos,
    @param.where(AlumnosCursos) where?: Where<AlumnosCursos>,
  ): Promise<Count> {
    return this.alumnosCursosRepository.updateAll(alumnosCursos, where);
  }

  @get('/alumnos-cursos/{id}')
  @response(200, {
    description: 'AlumnosCursos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlumnosCursos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AlumnosCursos, {exclude: 'where'}) filter?: FilterExcludingWhere<AlumnosCursos>
  ): Promise<AlumnosCursos> {
    return this.alumnosCursosRepository.findById(id, filter);
  }

  @patch('/alumnos-cursos/{id}')
  @response(204, {
    description: 'AlumnosCursos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnosCursos, {partial: true}),
        },
      },
    })
    alumnosCursos: AlumnosCursos,
  ): Promise<void> {
    await this.alumnosCursosRepository.updateById(id, alumnosCursos);
  }

  @put('/alumnos-cursos/{id}')
  @response(204, {
    description: 'AlumnosCursos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() alumnosCursos: AlumnosCursos,
  ): Promise<void> {
    await this.alumnosCursosRepository.replaceById(id, alumnosCursos);
  }

  @del('/alumnos-cursos/{id}')
  @response(204, {
    description: 'AlumnosCursos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alumnosCursosRepository.deleteById(id);
  }

  //Alumnos cursos

  @get('/alumnos-cursos/alumnos/{id}/{ciclo_escolar}')
  @response(200, {
    description: 'Asistencias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlumnosCursos, {includeRelations: true}),
      },
    },
  })
  async getAlumnosPorCurso(
    @param.path.number('id') id_curso: number,
    @param.path.string('ciclo_escolar') ciclo_escolar: string,
  ): Promise<any> {
    return this.alumnosCursosRepository.getAlumnosPorCurso(id_curso, ciclo_escolar);
  }

  //Calificacines Alumnos

  @get('/alumnos-cursos/calificaciones/{id}/{ciclo_escolar}')
  @response(200, {
    description: 'Asistencias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlumnosCursos, {includeRelations: true}),
      },
    },
  })
  async getCalificacionesAlumnos(
    @param.path.number('id') id_alumno: number,
    @param.path.string('ciclo_escolar') ciclo_escolar: string,
  ): Promise<any> {
    return this.alumnosCursosRepository.getCalificacionesAlumnos(id_alumno, ciclo_escolar);
  }

  //asignar calificaciones

  @get('/alumnos-cursos/asignar-calificaciones/{alumno}/{materia}/{calificacion}')
  @response(200, {
    description: 'Asistencias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlumnosCursos, {includeRelations: true}),
      },
    },
  })
  async asignarCalificaciones(
    @param.path.number('alumno') alumno: number,
    @param.path.number('materia') materia: number,
    @param.path.number('calificacion') calificacion: number,
  ): Promise<any> {
    return this.alumnosCursosRepository.asignarCalificaciones(alumno,materia,calificacion);
  }



}
