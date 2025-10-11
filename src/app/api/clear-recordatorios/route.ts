import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservaId, fecha } = body;

    console.log(`🧹 Limpiando recordatorios...`);

    const db = await initDatabase();
    
    let result;
    
    if (reservaId) {
      // Limpiar recordatorio de una reserva específica
      result = await db.run(
        `DELETE FROM wa_outgoing 
         WHERE reserva_id = ? AND purpose = 'recordatorio'`,
        [reservaId]
      );
      console.log(`🗑️ Recordatorio eliminado para reserva ${reservaId}`);
    } else if (fecha) {
      // Limpiar recordatorios de una fecha específica
      result = await db.run(
        `DELETE FROM wa_outgoing 
         WHERE purpose = 'recordatorio' 
         AND DATE(created_at) = ?`,
        [fecha]
      );
      console.log(`🗑️ Recordatorios eliminados para fecha ${fecha}`);
    } else {
      // Limpiar todos los recordatorios de hoy
      result = await db.run(
        `DELETE FROM wa_outgoing 
         WHERE purpose = 'recordatorio' 
         AND DATE(created_at) = DATE('now')`
      );
      console.log(`🗑️ Todos los recordatorios de hoy eliminados`);
    }

    return NextResponse.json({
      success: true,
      message: 'Recordatorios eliminados exitosamente',
      changes: result.changes
    });

  } catch (error) {
    console.error('Error en clear-recordatorios:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
