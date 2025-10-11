import { NextRequest, NextResponse } from 'next/server';
import { getReservas } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    console.log('Obteniendo fechas ocupadas para el spa...');
    
    const reservas = await getReservas();
    
    // Para el spa, simplemente devolvemos las fechas con reservas confirmadas
    const fechasOcupadas: { [fecha: string]: number } = {};
    const fechasConfirmadas: { [fecha: string]: boolean } = {};
    
    reservas.forEach((reserva: any) => {
      const fecha = reserva.fecha;
      
      // Contar reservas por fecha
      if (fechasOcupadas[fecha]) {
        fechasOcupadas[fecha] += 1;
      } else {
        fechasOcupadas[fecha] = 1;
      }
      
      // Si hay al menos una reserva confirmada, marcar la fecha como confirmada
      if (reserva.estado === 'confirmada') {
        fechasConfirmadas[fecha] = true;
      }
    });
    
    console.log('Fechas ocupadas procesadas:', fechasOcupadas);
    console.log('Fechas confirmadas:', fechasConfirmadas);
    
    return NextResponse.json({ 
      success: true, 
      fechasOcupadas,
      fechasConfirmadas,
      totalReservas: reservas.length
    });
    
  } catch (err: any) {
    console.error('Error obteniendo fechas ocupadas:', err);
    return NextResponse.json({ 
      success: false,
      error: err.message || String(err) 
    }, { status: 500 });
  }
} 