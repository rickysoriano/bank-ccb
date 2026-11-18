-- Módulo de maestros: catálogo y asistencia por QR.
-- Migración incremental para bases que ya tienen el esquema original.
-- Se puede ejecutar varias veces (usa IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS maestros (
    id_maestro SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    correo VARCHAR(150),
    telefono VARCHAR(20),
    turno VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS asistencias_maestros (
    id_asistencia_maestro SERIAL PRIMARY KEY,
    maestro_fk INTEGER NOT NULL,
    fecha DATE NOT NULL,
    presente BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_asistencia_maestro
        FOREIGN KEY (maestro_fk)
        REFERENCES maestros(id_maestro)
);

CREATE INDEX IF NOT EXISTS idx_asistencias_maestros_fecha
    ON asistencias_maestros (fecha);

CREATE INDEX IF NOT EXISTS idx_asistencias_maestros_maestro
    ON asistencias_maestros (maestro_fk);
