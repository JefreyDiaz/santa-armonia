/**
 * Franjas horarias posibles según el día (misma lógica que la reserva pública histórica).
 * L–V: 07:00–19:00; sábado: 07:00–14:00; domingo: sin horarios.
 */

export const SLOT_MINUTOS = 30;

/**
 * Por encima de esto se asume que `duracion` son minutos totales de un paquete (mal uso en agenda),
 * no la duración de una sola cita. En solapes se trata como sesión estándar de 60 min.
 */
export const DURACION_MAX_SESION_SOLAPES_MIN = 180;

export function normalizarDuracionSolapes(minutos: number, slotMin = SLOT_MINUTOS): number {
  const d = Math.max(slotMin, Number(minutos) || slotMin);
  if (d > DURACION_MAX_SESION_SOLAPES_MIN) return 60;
  return d;
}

export function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function minutesToHhmm(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Formatea "HH:MM" (24h) a "h:mm AM/PM" para mostrar en UI.
 * Importante: la BD y las APIs siguen usando 24h para evitar ambigüedades.
 */
export function formatHoraAmPm(hhmm: string): string {
  if (!hhmm) return hhmm;
  const [rawH, rawM] = hhmm.split(':');
  const h24 = Number(rawH);
  const m = Number(rawM);
  if (!Number.isFinite(h24) || !Number.isFinite(m)) return hhmm;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = ((h24 % 12) || 12);
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function generarRango(inicio: string, fin: string, pasoMin = SLOT_MINUTOS): string[] {
  const [hIni, mIni] = inicio.split(':').map(Number);
  const [hFin, mFin] = fin.split(':').map(Number);
  const res: string[] = [];
  let t = new Date();
  t.setHours(hIni, mIni, 0, 0);
  const end = new Date();
  end.setHours(hFin, mFin, 0, 0);
  while (t.getTime() < end.getTime()) {
    const h = String(t.getHours()).padStart(2, '0');
    const m = String(t.getMinutes()).padStart(2, '0');
    res.push(`${h}:${m}`);
    t = new Date(t.getTime() + pasoMin * 60000);
  }
  return res;
}

export function obtenerHorariosPorFecha(fecha: string): string[] {
  if (!fecha) return [];
  const d = new Date(`${fecha}T12:00:00`);
  const dia = d.getDay();
  if (dia === 0) return [];
  if (dia >= 1 && dia <= 5) {
    // Jornada continua (incluye 12:00–14:00 para excepciones)
    return generarRango('07:00', '19:00');
  }
  return generarRango('07:00', '14:00');
}

/**
 * Horarios del día + "buffer" al final.
 * Sirve para permitir que una cita de 60 min iniciando en el último slot válido (p.ej. 18:30)
 * pueda ocupar el slot siguiente (19:00) para validación de solapes, sin mostrar 19:00 como opción de inicio.
 */
export function obtenerHorariosPorFechaConBuffer(fecha: string, bufferSlots = 1): string[] {
  const base = obtenerHorariosPorFecha(fecha);
  const extra = Math.max(0, Number(bufferSlots) || 0);
  if (base.length === 0 || extra === 0) return base;

  const last = base[base.length - 1];
  const lastMin = hhmmToMinutes(last);
  const out = new Set<string>(base);
  for (let i = 1; i <= extra; i++) {
    out.add(minutesToHhmm(lastMin + i * SLOT_MINUTOS));
  }
  return Array.from(out);
}

export function obtenerSlotsOcupadosParaRango(inicioHhmm: string, duracionMin: number, slotMin = SLOT_MINUTOS): string[] {
  const start = hhmmToMinutes(inicioHhmm);
  const dur = Math.max(0, Number(duracionMin) || 0);
  const slots = Math.max(1, Math.ceil(dur / slotMin));
  const out: string[] = [];
  for (let i = 0; i < slots; i++) {
    out.push(minutesToHhmm(start + i * slotMin));
  }
  return out;
}
