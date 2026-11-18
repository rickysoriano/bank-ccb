-- Un registro por cada escaneo de código QR.
-- Agrega la hora del escaneo a las asistencias y deja de reutilizar una sola
-- fila por persona y día: cada escaneo se guarda como una fila independiente.
-- Migración incremental e idempotente.

ALTER TABLE asistencias
    ADD COLUMN IF NOT EXISTS hora TIME;

ALTER TABLE asistencias
    ALTER COLUMN hora SET DEFAULT CURRENT_TIME;

ALTER TABLE asistencias_maestros
    ADD COLUMN IF NOT EXISTS hora TIME;

ALTER TABLE asistencias_maestros
    ALTER COLUMN hora SET DEFAULT CURRENT_TIME;

-- Acelera el historial de escaneos por persona, fecha y hora.
CREATE INDEX IF NOT EXISTS idx_asistencias_alumno_fecha_hora
    ON asistencias (alumno_fk, fecha, hora);

CREATE INDEX IF NOT EXISTS idx_asistencias_maestros_maestro_fecha_hora
    ON asistencias_maestros (maestro_fk, fecha, hora);

COMMENT ON COLUMN asistencias.hora IS
    'Hora en la que se escaneó el código QR del alumno.';

COMMENT ON COLUMN asistencias_maestros.hora IS
    'Hora en la que se escaneó el código QR del maestro.';
