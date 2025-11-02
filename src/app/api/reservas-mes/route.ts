import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL no está definida');
  }
  return new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });
}

export async function GET(request: NextRequest) {
  try {
    const year = request.nextUrl?.searchParams.get('year');
    const month = request.nextUrl?.searchParams.get('month'); // 1-12

    if (!year || !month) {
      return NextResponse.json(
        { error: 'year y month son requeridos' },
        { status: 400 }
      );
    }

    const pool = getPool();
    
    // Traer TODAS las reservas confirmadas del mes en UNA sola consulta
    const monthStr = String(month).padStart(2, '0');
    const fechaInicio = `${year}-${monthStr}-01`;
    const fechaFin = `${year}-${monthStr}-31`;
    
    let reservas: any[] = [];
    try {
      const result = await pool.query(
        `SELECT fecha, horario, tratamiento_categoria
         FROM reservas
         WHERE fecha >= $1 AND fecha <= $2 AND estado = 'confirmada'
         ORDER BY fecha, horario`,
        [fechaInicio, fechaFin]
      );
      reservas = result.rows;
    } catch (tableError) {
      // Si la tabla no existe, retornar vacío
    }

    return NextResponse.json({ 
      ok: true,
      reservas,
      total: reservas.length
    });

  } catch (error) {
    console.error('Error en reservas-mes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

