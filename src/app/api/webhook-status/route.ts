import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const db = await initDatabase();
    
    // Obtener los últimos mensajes recibidos en wa_outgoing
    const ultimosMensajes = await db.all(`
      SELECT wo.*, r.fecha, r.horario, c.nombre, c.telefono
      FROM wa_outgoing wo
      JOIN reservas r ON wo.reserva_id = r.id
      JOIN clientes c ON r.cliente_id = c.id
      ORDER BY wo.created_at DESC
      LIMIT 10
    `);
    
    // Obtener estadísticas de webhook
    const estadisticas = await db.get(`
      SELECT 
        COUNT(*) as total_mensajes,
        COUNT(CASE WHEN DATE(created_at) = DATE('now') THEN 1 END) as mensajes_hoy,
        COUNT(CASE WHEN purpose = 'recordatorio' THEN 1 END) as recordatorios,
        MAX(created_at) as ultimo_mensaje
      FROM wa_outgoing
    `);
    
    return NextResponse.json({
      status: 'webhook_activo',
      timestamp: new Date().toISOString(),
      estadisticas,
      ultimosMensajes,
      configuracion: {
        verifyToken: process.env.WHATSAPP_VERIFY_TOKEN ? 'Configurado' : 'NO CONFIGURADO',
        phoneId: process.env.WHATSAPP_PHONE_ID ? 'Configurado' : 'NO CONFIGURADO',
        token: process.env.WHATSAPP_TOKEN ? 'Configurado' : 'NO CONFIGURADO'
      }
    });
    
  } catch (error) {
    console.error('Error en webhook-status:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
