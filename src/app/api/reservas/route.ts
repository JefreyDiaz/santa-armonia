import { NextRequest, NextResponse } from 'next/server';
import { getReservas, initDatabase } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    console.log('Obteniendo todas las reservas...');
    const reservas = await getReservas();
    
    console.log(`Reservas encontradas: ${reservas.length}`);
    
    return NextResponse.json({ 
      success: true, 
      reservas 
    });
    
  } catch (err: any) {
    console.error('Error obteniendo reservas:', err);
    return NextResponse.json({ 
      success: false,
      error: err.message || String(err) 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, estado } = await req.json();
    console.log('Actualizando estado de reserva:', { id, estado });
    
    const db = await initDatabase();
    
    const result = await db.run(`
      UPDATE reservas 
      SET estado = ? 
      WHERE id = ?
    `, [estado, id]);
    
    console.log('Resultado de actualización:', result);
    
    if (result.changes === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'Reserva no encontrada' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Estado de reserva actualizado',
      changes: result.changes
    });
    
  } catch (err: any) {
    console.error('Error actualizando reserva:', err);
    return NextResponse.json({ 
      success: false,
      error: err.message || String(err) 
    }, { status: 500 });
  }
} 