-- Esquema de la base de datos de backend-ccb.
-- Este archivo documenta el esquema aplicado en PostgreSQL/Neon.
-- No ejecutar sobre una base que ya tenga estas tablas.

CREATE TABLE area_curso (
    id_area_curso SERIAL PRIMARY KEY,
    nombre_area VARCHAR(100) NOT NULL
);

CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    nombre_curso VARCHAR(100) NOT NULL,
    fk_area_curso INTEGER NOT NULL,
    CONSTRAINT fk_curso_area
        FOREIGN KEY (fk_area_curso)
        REFERENCES area_curso(id_area_curso)
);

CREATE TABLE materia (
    id_materia SERIAL PRIMARY KEY,
    nombre_materia VARCHAR(100) NOT NULL,
    fk_curso INTEGER NOT NULL,
    CONSTRAINT fk_materia_curso
        FOREIGN KEY (fk_curso)
        REFERENCES cursos(id_curso)
);

CREATE TABLE tutores (
    id_tutor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE alumnos (
    id_alumno SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE,
    direccion TEXT,
    correo VARCHAR(150),
    telefono VARCHAR(20),
    turno VARCHAR(30),
    tipo_alumno VARCHAR(50),
    tutor_fk INTEGER,
    CONSTRAINT fk_alumno_tutor
        FOREIGN KEY (tutor_fk)
        REFERENCES tutores(id_tutor)
);

CREATE TABLE tipos_pago (
    id_tipo_pago SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    frecuencia_pago VARCHAR(50) NOT NULL
);

CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    alumno_fk INTEGER NOT NULL,
    tipo_pago_fk INTEGER NOT NULL,
    fecha_pago DATE NOT NULL,
    monto NUMERIC(10,2) NOT NULL,
    descuento NUMERIC(10,2) DEFAULT 0,
    estado VARCHAR(30) DEFAULT 'Pendiente',
    CONSTRAINT fk_pago_alumno
        FOREIGN KEY (alumno_fk)
        REFERENCES alumnos(id_alumno),
    CONSTRAINT fk_pago_tipo
        FOREIGN KEY (tipo_pago_fk)
        REFERENCES tipos_pago(id_tipo_pago)
);

CREATE TABLE alumnos_materias (
    id_alumno_materia SERIAL PRIMARY KEY,
    alumno_fk INTEGER NOT NULL,
    materia_fk INTEGER NOT NULL,
    calificacion NUMERIC(5,2),
    CONSTRAINT fk_am_alumno
        FOREIGN KEY (alumno_fk)
        REFERENCES alumnos(id_alumno),
    CONSTRAINT fk_am_materia
        FOREIGN KEY (materia_fk)
        REFERENCES materia(id_materia)
);

CREATE TABLE asistencias (
    id_asistencia SERIAL PRIMARY KEY,
    alumno_fk INTEGER NOT NULL,
    fecha DATE NOT NULL,
    hora TIME DEFAULT CURRENT_TIME,
    presente BOOLEAN DEFAULT TRUE,
    veces_registrado INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT fk_asistencia_alumno
        FOREIGN KEY (alumno_fk)
        REFERENCES alumnos(id_alumno)
);

CREATE TABLE maestros (
    id_maestro SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    correo VARCHAR(150),
    telefono VARCHAR(20),
    turno VARCHAR(30)
);

CREATE TABLE asistencias_maestros (
    id_asistencia_maestro SERIAL PRIMARY KEY,
    maestro_fk INTEGER NOT NULL,
    fecha DATE NOT NULL,
    hora TIME DEFAULT CURRENT_TIME,
    presente BOOLEAN DEFAULT TRUE,
    veces_registrado INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT fk_asistencia_maestro
        FOREIGN KEY (maestro_fk)
        REFERENCES maestros(id_maestro)
);
