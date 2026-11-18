-- Descuento por porcentaje en pagos y tipos de pago iniciales.
-- Migración incremental para bases que ya tienen el esquema original.
-- Se puede ejecutar varias veces (usa IF NOT EXISTS / WHERE NOT EXISTS).

ALTER TABLE pagos
    ADD COLUMN IF NOT EXISTS descuento_porcentaje NUMERIC(5, 2) DEFAULT 0;

-- Conserva el porcentaje de los pagos capturados antes de este cambio.
UPDATE pagos
   SET descuento_porcentaje = CASE
        WHEN monto > 0 THEN ROUND((COALESCE(descuento, 0) / monto) * 100, 2)
        ELSE 0
       END
 WHERE COALESCE(descuento, 0) > 0
   AND COALESCE(descuento_porcentaje, 0) = 0;

ALTER TABLE pagos
    DROP CONSTRAINT IF EXISTS pagos_descuento_porcentaje_check;

ALTER TABLE pagos
    ADD CONSTRAINT pagos_descuento_porcentaje_check
    CHECK (
        descuento_porcentaje IS NULL
        OR (descuento_porcentaje >= 0 AND descuento_porcentaje <= 100)
    );

COMMENT ON COLUMN pagos.descuento_porcentaje IS
    'Porcentaje de descuento aplicado al pago (0 a 100).';

-- Tipos de pago base para que el selector de Pagos tenga opciones desde el inicio.
INSERT INTO tipos_pago (tipo, frecuencia_pago)
SELECT v.tipo, v.frecuencia_pago
  FROM (VALUES
        ('Mensualidad', 'Mensual'),
        ('Inscripción', 'Otra'),
        ('Curso', 'Mensual'),
        ('Material', 'Otra')
       ) AS v(tipo, frecuencia_pago)
 WHERE NOT EXISTS (
        SELECT 1
          FROM tipos_pago t
         WHERE LOWER(t.tipo) = LOWER(v.tipo)
       );
