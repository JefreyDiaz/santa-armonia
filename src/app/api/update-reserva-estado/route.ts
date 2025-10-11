import { NextRequest, NextResponse } from 'next/server';
import { updateReservaEstado } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservaId, estado } = body;

    if (!reservaId || !estado) {
      return NextResponse.json({ 
        error: 'reservaId y estado son requeridos' 
      }, { status: 400 });
    }

    if (!['confirmada', 'cancelada', 'pendiente', 'reprogramar'].includes(estado)) {
      return NextResponse.json({ 
        error: 'estado debe ser: confirmada, cancelada, pendiente o reprogramar' 
      }, { status: 400 });
    }

    console.log(`🔄 Actualizando reserva ${reservaId} a estado: ${estado}`);

    await updateReservaEstado(reservaId, estado);

    console.log(`✅ Reserva ${reservaId} actualizada exitosamente a: ${estado}`);

    return NextResponse.json({
      success: true,
      message: `Reserva ${reservaId} actualizada a estado: ${estado}`,
      reservaId,
      nuevoEstado: estado
    });

  } catch (error) {
    console.error('Error en update-reserva-estado:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
