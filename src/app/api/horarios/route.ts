import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Helper para obtener el pool
function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL no está definida en las variables de entorno');
  }
  return new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });
}

export async function GET(request: NextRequest) {
  try {
    const fecha = request.nextUrl?.searchParams.get('fecha') || null;
    const categoria = (request.nextUrl?.searchParams.get('categoria') || '').toLowerCase();

    if (!fecha) {
      return NextResponse.json(
        { error: 'Fecha es requerida' },
        { status: 400 }
      );
    }

    const pool = getPool();
    
    // Verificar si la tabla reservas existe, si no, retornar vacío
    let result;
    try {
      result = await pool.query(
        `SELECT horario, tratamiento_categoria as categoria
         FROM reservas
         WHERE fecha = $1 AND estado = 'confirmada'`,
        [fecha]
      );
    } catch (tableError: any) {
      // Si la tabla no existe, retornar array vacío (primera vez que se usa)
      result = { rows: [] };
    }
    const rows: Array<{ horario: string; categoria: string }> = result.rows;

    // Agrupar conteos por horario
    const byHour: Record<string, { faciales: number; corporales: number; otros: number; total: number }> = {};
    for (const r of rows) {
      const key = r.horario;
      if (!byHour[key]) byHour[key] = { faciales: 0, corporales: 0, otros: 0, total: 0 };
      if (r.categoria === 'faciales') byHour[key].faciales += 1;
      if (r.categoria === 'corporales') byHour[key].corporales += 1;
      if (r.categoria === 'otros') byHour[key].otros += 1;
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
        } else if (categoria === 'corporales' || categoria === 'otros') {
          ocupado = counts.total >= 2;
        } else {
          // Si no se envía categoria, consideramos ocupado cuando total >=2
          ocupado = counts.total >= 2;
        }
      }
      
      if (ocupado) {
        horariosOcupados.push(horario);
      }
    }

    // NO cerrar el pool en serverless - se reutiliza entre peticiones
    return NextResponse.json({ fecha, horariosOcupados, totalOcupados: horariosOcupados.length });

  } catch (error) {
    console.error('Error al obtener horarios ocupados:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 