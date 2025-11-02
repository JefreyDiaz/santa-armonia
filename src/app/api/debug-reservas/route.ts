import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

export async function GET(req: NextRequest) {
  const pool = getPool();
  try {
    const fecha = req.nextUrl.searchParams.get('fecha') || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    console.log(`🔍 Debugging reservas para fecha: ${fecha}`);
    
    // 1. Ver todas las reservas del día
    const todasReservas = await pool.query(`
      SELECT r.id, r.fecha, r.horario, r.estado, r.tratamiento_nombre as tratamiento,
             c.nombre, c.telefono
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      WHERE r.fecha = $1
      ORDER BY r.horario
    `, [fecha]);
    
    console.log(`📊 Total reservas para ${fecha}:`, todasReservas.rows.length);
    
    // 2. Ver reservas con estado correcto
    const reservasEstadoCorrecto = await pool.query(`
      SELECT r.id, r.fecha, r.horario, r.estado, r.tratamiento_nombre as tratamiento,
             c.nombre, c.telefono
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      WHERE r.fecha = $1 
      AND r.estado IN ('confirmada','pendiente')
      ORDER BY r.horario
    `, [fecha]);
    
    console.log(`✅ Reservas con estado correcto:`, reservasEstadoCorrecto.rows.length);
    
    // 3. Ver mensajes ya enviados hoy
    const mensajesEnviados = await pool.query(`
      SELECT wo.reserva_id, wo.purpose, wo.created_at, r.fecha, r.horario, c.nombre
      FROM wa_outgoing wo
      JOIN reservas r ON wo.reserva_id = r.id
      JOIN clientes c ON r.cliente_id = c.id
      WHERE DATE(wo.created_at) = CURRENT_DATE
      AND wo.purpose = 'recordatorio'
    `);
    
    console.log(`📱 Mensajes ya enviados hoy:`, mensajesEnviados.rows.length);
    
    // 4. Ver reservas que NO tienen mensaje enviado hoy
    const reservasSinMensaje = await pool.query(`
      SELECT r.id, r.fecha, r.horario, r.estado, r.tratamiento_nombre as tratamiento,
             c.nombre, c.telefono
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      WHERE r.fecha = $1 
      AND r.estado IN ('confirmada','pendiente')
      AND NOT EXISTS (
        SELECT 1 FROM wa_outgoing wo 
        WHERE wo.reserva_id = r.id 
        AND wo.purpose = 'recordatorio'
        AND DATE(wo.created_at) = CURRENT_DATE
      )
      ORDER BY r.horario
    `, [fecha]);
    
    console.log(`🎯 Reservas candidatas para recordatorio:`, reservasSinMensaje.rows.length);
    
    // 5. Verificar la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];
    const horaActual = new Date().toLocaleTimeString('es-CO', { 
      timeZone: 'America/Bogota',
      hour12: false 
    });
    
    // NO cerrar el pool en serverless
    return NextResponse.json({
      debug: {
        fechaConsultada: fecha,
        fechaActual,
        horaActual,
        totalReservas: todasReservas.rows.length,
        reservasEstadoCorrecto: reservasEstadoCorrecto.rows.length,
        mensajesEnviadosHoy: mensajesEnviados.rows.length,
        reservasCandidatas: reservasSinMensaje.rows.length
      },
      todasReservas: todasReservas.rows,
      reservasEstadoCorrecto: reservasEstadoCorrecto.rows,
      mensajesEnviados: mensajesEnviados.rows,
      reservasCandidatas: reservasSinMensaje.rows
    });
    
  } catch (error) {
    console.error('Error en debug-reservas:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
