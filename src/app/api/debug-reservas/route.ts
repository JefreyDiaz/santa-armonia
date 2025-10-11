import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fecha = searchParams.get('fecha') || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    console.log(`🔍 Debugging reservas para fecha: ${fecha}`);
    
    const db = await initDatabase();
    
    // 1. Ver todas las reservas del día
    const todasReservas = await db.all(`
      SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, t.nombre AS tratamiento
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      JOIN tratamientos t ON r.tratamiento_id = t.id
      WHERE r.fecha = ?
      ORDER BY r.horario
    `, [fecha]);
    
    console.log(`📊 Total reservas para ${fecha}:`, todasReservas.length);
    
    // 2. Ver reservas con estado correcto
    const reservasEstadoCorrecto = await db.all(`
      SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, t.nombre AS tratamiento
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      JOIN tratamientos t ON r.tratamiento_id = t.id
      WHERE r.fecha = ? 
      AND r.estado IN ('confirmada','pendiente')
      ORDER BY r.horario
    `, [fecha]);
    
    console.log(`✅ Reservas con estado correcto:`, reservasEstadoCorrecto.length);
    
    // 3. Ver mensajes ya enviados hoy
    const mensajesEnviados = await db.all(`
      SELECT wo.reserva_id, wo.purpose, wo.created_at, r.fecha, r.horario, c.nombre
      FROM wa_outgoing wo
      JOIN reservas r ON wo.reserva_id = r.id
      JOIN clientes c ON r.cliente_id = c.id
      WHERE DATE(wo.created_at) = DATE('now')
      AND wo.purpose = 'recordatorio'
    `);
    
    console.log(`📱 Mensajes ya enviados hoy:`, mensajesEnviados.length);
    
    // 4. Ver reservas que NO tienen mensaje enviado hoy
    const reservasSinMensaje = await db.all(`
      SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, t.nombre AS tratamiento
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      JOIN tratamientos t ON r.tratamiento_id = t.id
      WHERE r.fecha = ? 
      AND r.estado IN ('confirmada','pendiente')
      AND NOT EXISTS (
        SELECT 1 FROM wa_outgoing wo 
        WHERE wo.reserva_id = r.id 
        AND wo.purpose = 'recordatorio'
        AND DATE(wo.created_at) = DATE('now')
      )
      ORDER BY r.horario
    `, [fecha]);
    
    console.log(`🎯 Reservas candidatas para recordatorio:`, reservasSinMensaje.length);
    
    // 5. Verificar la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];
    const horaActual = new Date().toLocaleTimeString('es-CO', { 
      timeZone: 'America/Bogota',
      hour12: false 
    });
    
    return NextResponse.json({
      debug: {
        fechaConsultada: fecha,
        fechaActual,
        horaActual,
        totalReservas: todasReservas.length,
        reservasEstadoCorrecto: reservasEstadoCorrecto.length,
        mensajesEnviadosHoy: mensajesEnviados.length,
        reservasCandidatas: reservasSinMensaje.length
      },
      todasReservas,
      reservasEstadoCorrecto,
      mensajesEnviados,
      reservasCandidatas: reservasSinMensaje
    });
    
  } catch (error) {
    console.error('Error en debug-reservas:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
