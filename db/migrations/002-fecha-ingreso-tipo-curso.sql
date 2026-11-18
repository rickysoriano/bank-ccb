-- Fecha de ingreso del alumno y clasificación de los cursos.
-- Migración incremental para bases que ya tienen el esquema original.
-- Se puede ejecutar varias veces (usa IF NOT EXISTS).

ALTER TABLE alumnos
    ADD COLUMN IF NOT EXISTS fecha_ingreso DATE;

ALTER TABLE cursos
    ADD COLUMN IF NOT EXISTS tipo_curso VARCHAR(30);

-- El curso existente "REGULARIZACION MATUTINO" se clasifica automáticamente.
UPDATE cursos
   SET tipo_curso = 'Regularización'
 WHERE tipo_curso IS NULL
   AND (
        UPPER(nombre_curso) LIKE '%REGULARIZACION%'
        OR UPPER(nombre_curso) LIKE '%REGULARIZACIÓN%'
   );

COMMENT ON COLUMN alumnos.fecha_ingreso IS
    'Fecha en la que el alumno ingresó; base para calcular su próximo pago mensual.';

COMMENT ON COLUMN cursos.tipo_curso IS
    'Tipo de curso: Regularización o Universidad.';
