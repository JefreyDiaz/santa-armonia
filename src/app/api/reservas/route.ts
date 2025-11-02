import { NextRequest, NextResponse } from 'next/server';
import { getReservas, updateReservaEstado } from '@/lib/database';

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
    
    // Validar estado
    if (!['confirmada', 'cancelada', 'reprogramar', 'pendiente'].includes(estado)) {
      return NextResponse.json({ 
        success: false,
        error: 'Estado inválido' 
      }, { status: 400 });
    }
    
    await updateReservaEstado(id, estado);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Estado de reserva actualizado'
    });
    
  } catch (err: any) {
    console.error('Error actualizando reserva:', err);
    return NextResponse.json({ 
      success: false,
      error: err.message || String(err) 
    }, { status: 500 });
  }
} 