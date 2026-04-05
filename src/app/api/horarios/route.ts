import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, listarHorariosOcupadosParaCategoria } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const fecha = request.nextUrl?.searchParams.get('fecha') || null;
    const categoria = (request.nextUrl?.searchParams.get('categoria') || '').toLowerCase();
    const durRaw = request.nextUrl?.searchParams.get('duracionMinutos');
    const durParsed = durRaw != null ? Number(durRaw) : NaN;
    const duracionMinutos =
      Number.isFinite(durParsed) && durParsed > 0 ? Math.max(30, Math.round(durParsed)) : 60;

    if (!fecha) {
      return NextResponse.json({ error: 'Fecha es requerida' }, { status: 400 });
    }

    await initDatabase();

    try {
      const horariosOcupados = await listarHorariosOcupadosParaCategoria(
        fecha,
        categoria,
        duracionMinutos
      );
      return NextResponse.json({
        fecha,
        horariosOcupados,
        totalOcupados: horariosOcupados.length,
        duracionMinutos,
      });
    } catch (tableError: unknown) {
      console.error('Error al listar horarios ocupados:', tableError);
      return NextResponse.json({
        fecha,
        horariosOcupados: [],
        totalOcupados: 0,
        duracionMinutos,
      });
    }
  } catch (error) {
    console.error('Error al obtener horarios ocupados:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
