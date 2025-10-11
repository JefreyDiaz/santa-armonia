import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get('fecha');
    const categoria = (searchParams.get('categoria') || '').toLowerCase(); // 'faciales' | 'masajes'

    if (!fecha) {
      return NextResponse.json(
        { error: 'Fecha es requerida' },
        { status: 400 }
      );
    }

    // Obtener todas las reservas de la fecha, con su categoria
    const db = await initDatabase();
    const rows: Array<{ horario: string; categoria: string }> = await db.all(
      `SELECT r.horario, t.categoria
       FROM reservas r
       JOIN tratamientos t ON r.tratamiento_id = t.id
       WHERE r.fecha = ? AND r.estado = 'confirmada'`,
      [fecha]
    );

    // Agrupar conteos por horario
    const byHour: Record<string, { faciales: number; masajes: number; total: number }> = {};
    for (const r of rows) {
      const key = r.horario;
      if (!byHour[key]) byHour[key] = { faciales: 0, masajes: 0, total: 0 };
      if (r.categoria === 'faciales') byHour[key].faciales += 1;
      if (r.categoria === 'masajes') byHour[key].masajes += 1;
      byHour[key].total += 1;
    }

    function isAfternoon(hhmm: string): boolean {
      const [hh] = hhmm.split(':').map(Number);
      return hh >= 14; // 14:00–18:00
    }

    const horariosOcupados: string[] = [];
    for (const [horario, counts] of Object.entries(byHour)) {
      const isTarde = isAfternoon(horario);
      let ocupado = false;
      
      if (!isTarde) {
        // Mañana: 1 cupo total (facial o corporal), nunca 2
        ocupado = counts.total >= 1;
      } else {
        // Tarde: capacidad 2 total, no 2 faciales
        if (categoria === 'faciales') {
          ocupado = counts.faciales >= 1 || counts.total >= 2;
        } else if (categoria === 'masajes') {
          ocupado = counts.masajes >= 1 || counts.total >= 2;
        } else {
          // Si no se envía categoria, consideramos ocupado cuando total >=2
          ocupado = counts.total >= 2;
        }
      }
      
      if (ocupado) {
        horariosOcupados.push(horario);
      }
    }

    return NextResponse.json({ fecha, horariosOcupados, totalOcupados: horariosOcupados.length });

  } catch (error) {
    console.error('Error al obtener horarios ocupados:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 