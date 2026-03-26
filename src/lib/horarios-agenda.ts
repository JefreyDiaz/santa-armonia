/**
 * Franjas horarias posibles según el día (misma lógica que la reserva pública histórica).
 * L–V: 07:00–12:00 y 14:00–18:00; sábado: 07:00–14:00; domingo: sin horarios.
 */

function generarRango(inicio: string, fin: string, pasoMin = 60): string[] {
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
    return [...generarRango('07:00', '12:00'), ...generarRango('14:00', '19:00')];
  }
  return generarRango('07:00', '14:00');
}
