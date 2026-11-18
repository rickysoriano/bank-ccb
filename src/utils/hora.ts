/**
 * Normaliza la hora recibida por la API a un formato aceptado por
 * PostgreSQL (`HH:MM:SS`). Acepta valores como `9:05`, `09:05:30` o una
 * fecha/hora completa (`2026-11-17T09:05:30`). Si no se reconoce la hora,
 * devuelve `undefined` para que la base use `CURRENT_TIME`.
 */
export function normalizarHora(hora?: string): string | undefined {
  if (!hora) return undefined;

  const coincidencia = hora.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!coincidencia) return undefined;

  const [, horas, minutos, segundos] = coincidencia;
  return `${horas.padStart(2, '0')}:${minutos}:${segundos ?? '00'}`;
}
