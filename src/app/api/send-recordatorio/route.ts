import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, saveOutgoingMessage } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservaId } = body;

    if (!reservaId) {
      return NextResponse.json({ 
        error: 'reservaId es requerido' 
      }, { status: 400 });
    }

    console.log(`📱 Enviando recordatorio forzado para reserva ID: ${reservaId}`);

    const db = await initDatabase();
    
    // Buscar la reserva específica
    const reserva = await db.get(
      `SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, t.nombre AS tratamiento
       FROM reservas r
       JOIN clientes c ON r.cliente_id = c.id
       JOIN tratamientos t ON r.tratamiento_id = t.id
       WHERE r.id = ?`,
      [reservaId]
    );

    if (!reserva) {
      return NextResponse.json({ 
        error: 'Reserva no encontrada' 
      }, { status: 404 });
    }

    console.log(`📋 Reserva encontrada:`, {
      id: reserva.id,
      cliente: reserva.nombre,
      telefono: reserva.telefono,
      tratamiento: reserva.tratamiento,
      fecha: reserva.fecha,
      horario: reserva.horario,
      estado: reserva.estado
    });

    // Mensaje con botones
    const mensaje = `*Spa Santa Armonía* 🧘‍♀️\n\nHola ${reserva.nombre} 👋\n\nTe recordamos tu cita:\n\n• Tratamiento: *${reserva.tratamiento}*\n• Fecha: *${reserva.fecha}*\n• Hora: *${reserva.horario}*\n\n📍 Cra. XX #XX-XX, Manizales\n📞 301 536 1106\n\n_Nota: Si llegas con hasta 10 min de retraso, ese tiempo se descontará de tu sesión. Si llegas 15 min después de la hora agendada, no podremos atenderte ese día._\n\nPor favor confirma tu asistencia:\n\n✅ Escribe "CONFIRMAR" para confirmar\n❌ Escribe "CANCELAR" para cancelar`;

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';

    // Intentar primero con botones interactivos
    let waResponse;
    let messageId;
    
    try {
      console.log('🔄 Intentando enviar con botones interactivos...');
      waResponse = await fetch(`${baseUrl}/api/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: reserva.telefono,
          text: mensaje,
          buttons: [
            {
              type: "reply",
              reply: {
                id: "CONFIRMAR",
                title: "✅ Confirmar"
              }
            },
            {
              type: "reply", 
              reply: {
                id: "CANCELAR",
                title: "❌ Cancelar"
              }
            }
          ]
        })
      });

      if (waResponse.ok) {
        const waData = await waResponse.json();
        // Con Twilio, el ID está en data.messages[0].id o data.sid
        messageId = waData?.data?.messages?.[0]?.id || waData?.data?.sid;
        console.log('✅ Mensaje con botones enviado exitosamente:', messageId);
      } else {
        throw new Error(`Error ${waResponse.status}: ${await waResponse.text()}`);
      }
    } catch (error) {
      console.log('❌ Error con botones interactivos, enviando mensaje de texto simple:', error);
      
      // Fallback a mensaje de texto simple
      waResponse = await fetch(`${baseUrl}/api/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: reserva.telefono,
          text: mensaje
        })
      });

      if (waResponse.ok) {
        const waData = await waResponse.json();
        // Con Twilio, el ID está en data.messages[0].id o data.sid
        messageId = waData?.data?.messages?.[0]?.id || waData?.data?.sid;
        console.log('✅ Mensaje de texto enviado exitosamente:', messageId);
      } else {
        throw new Error(`Error ${waResponse.status}: ${await waResponse.text()}`);
      }
    }

    // Guardar el mensaje enviado
    if (messageId) {
      await saveOutgoingMessage({ 
        waMessageId: messageId, 
        reservaId: reserva.id, 
        purpose: 'recordatorio' 
      });
      console.log('💾 Mensaje guardado en wa_outgoing');
    }

    return NextResponse.json({
      success: true,
      message: `Recordatorio enviado a ${reserva.nombre}`,
      reserva: {
        id: reserva.id,
        nombre: reserva.nombre,
        telefono: reserva.telefono,
        tratamiento: reserva.tratamiento,
        fecha: reserva.fecha,
        horario: reserva.horario
      },
      messageId
    });

  } catch (error) {
    console.error('Error en send-recordatorio:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
