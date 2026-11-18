-- Contador diario de veces que se registra una persona.
-- Cada escaneo o registro rápido del mismo alumno/maestro y fecha incrementa
-- `veces_registrado`; se conserva una sola fila por día.
-- Migración incremental e idempotente.

ALTER TABLE asistencias
    ADD COLUMN IF NOT EXISTS veces_registrado INTEGER NOT NULL DEFAULT 1;

ALTER TABLE asistencias_maestros
    ADD COLUMN IF NOT EXISTS veces_registrado INTEGER NOT NULL DEFAULT 1;

ALTER TABLE asistencias
    DROP CONSTRAINT IF EXISTS asistencias_veces_registrado_check;

ALTER TABLE asistencias
    ADD CONSTRAINT asistencias_veces_registrado_check
    CHECK (veces_registrado >= 1);

ALTER TABLE asistencias_maestros
    DROP CONSTRAINT IF EXISTS asistencias_maestros_veces_registrado_check;

ALTER TABLE asistencias_maestros
    ADD CONSTRAINT asistencias_maestros_veces_registrado_check
    CHECK (veces_registrado >= 1);

-- Acelera el upsert por persona y fecha.
CREATE INDEX IF NOT EXISTS idx_asistencias_alumno_fecha
    ON asistencias (alumno_fk, fecha);

CREATE INDEX IF NOT EXISTS idx_asistencias_maestros_maestro_fecha
    ON asistencias_maestros (maestro_fk, fecha);

COMMENT ON COLUMN asistencias.veces_registrado IS
    'Veces que el alumno fue registrado en esta fecha; cada escaneo o registro incrementa el valor.';

COMMENT ON COLUMN asistencias_maestros.veces_registrado IS
    'Veces que el maestro fue registrado en esta fecha; cada escaneo o registro incrementa el valor.';
