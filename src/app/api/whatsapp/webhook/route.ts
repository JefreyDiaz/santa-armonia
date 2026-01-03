import { NextRequest, NextResponse } from 'next/server';
import { findReservaIdByMessageId, updateReservaEstado, initDatabase, getPool } from '@/lib/database';
import { sendWhatsAppText } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Twilio webhook verification (GET) - no es necesario para Twilio, pero lo mantenemos por compatibilidad
export async function GET(req: NextRequest) {
  // Twilio no usa verificación GET como Meta, pero mantenemos el endpoint por compatibilidad
  return new NextResponse('OK', { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    // Twilio envía los webhooks como form-data, no JSON
    const formData = await req.formData();
    
    // Logs detallados para debugging
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    console.log('🔔 Twilio webhook recibido:', JSON.stringify(formDataObj, null, 2));

    // Extraer datos del mensaje de Twilio
    const messageSid = formData.get('MessageSid')?.toString();
    const from = formData.get('From')?.toString(); // formato: whatsapp:+573157274521
    const body = formData.get('Body')?.toString();
    const to = formData.get('To')?.toString();
    const numMedia = formData.get('NumMedia')?.toString();

    // Limpiar el número de teléfono (quitar prefijo whatsapp:)
    const cleanFrom = from?.replace(/^whatsapp:/, '') || '';
    
      console.log('📱 Mensaje recibido:', {
      messageSid,
      from: cleanFrom,
      body,
      to,
      numMedia
    });

    if (!body || !cleanFrom) {
      console.log('ℹ️ No hay body o from, ignorando mensaje');
      return NextResponse.json({ ok: true });
    }

    // Detectar acción (CONFIRMAR o CANCELAR)
    // Acepta: "1", "CONFIRMAR", o variaciones para confirmar
    // Acepta: "2", "CANCELAR", o variaciones para cancelar
    let action: 'CONFIRMAR' | 'CANCELAR' | undefined;
    const bodyTrimmed = body.trim();
    const bodyUpper = bodyTrimmed.toUpperCase();
    
    // Detectar por número (prioridad) o texto
    if (bodyTrimmed === '1' || bodyUpper === 'CONFIRMAR' || bodyUpper.includes('CONFIRMAR') || bodyUpper === 'SI' || bodyUpper === 'SÍ') {
      action = 'CONFIRMAR';
    } else if (bodyTrimmed === '2' || bodyUpper === 'CANCELAR' || bodyUpper.includes('CANCELAR') || bodyUpper === 'NO') {
      action = 'CANCELAR';
    }

      console.log('🎯 Acción detectada:', action);

      if (action) {
      // Intentar encontrar la reserva por messageSid (si guardamos el SID al enviar)
        let reservaId: number | null = null;
      
      if (messageSid) {
          try {
          // Buscar si guardamos el messageSid al enviar el mensaje
          // Nota: Necesitarías guardar el messageSid cuando envías mensajes
          reservaId = await findReservaIdByMessageId(messageSid);
          console.log('🔍 Reserva encontrada por messageSid:', reservaId);
          } catch (e) {
          console.warn('❌ Error buscando reserva por messageSid', e);
          }
        }

      if (!reservaId) {
        // Fallback: buscar por número de teléfono (buscar la reserva más reciente del día)
        console.log('🔍 Buscando reserva por número de teléfono...');
        try {
          await initDatabase();
          const pool = getPool();
          const hoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
          
          // Buscar reserva más reciente del día con ese teléfono
          const reservaResult = await pool.query(
            `SELECT r.id FROM reservas r
             JOIN clientes c ON r.cliente_id = c.id
             WHERE (c.telefono = $1 OR c.telefono = $2)
               AND r.estado IN ('confirmada', 'pendiente')
               AND r.fecha >= $3
             ORDER BY r.fecha DESC, r.horario DESC
             LIMIT 1`,
            [cleanFrom, cleanFrom.replace(/^\+/, ''), hoy]
          );
          
          if (reservaResult.rows.length > 0) {
            reservaId = reservaResult.rows[0].id;
            console.log('🔍 Reserva encontrada por teléfono:', reservaId);
          }
        } catch (e) {
          console.error('❌ Error en fallback por teléfono:', e);
        }
      }

      if (reservaId) {
        let nuevoEstado: 'confirmada' | 'cancelada' = 'confirmada';
        if (action === 'CANCELAR') nuevoEstado = 'cancelada';
        await updateReservaEstado(reservaId, nuevoEstado);
        console.log('✅ Reserva actualizada por webhook:', { 
          reservaId, 
          nuevoEstado, 
          action,
          messageSid,
          telefono: cleanFrom
        });

        // Enviar respuesta automática al usuario
        try {
          let mensajeRespuesta = '';
          if (action === 'CONFIRMAR') {
            mensajeRespuesta = '✅ Recibimos tu confirmación. ¡Te esperamos! ✨';
          } else if (action === 'CANCELAR') {
            mensajeRespuesta = '✅ Recibimos tu cancelación. Si deseas reagendar, escríbenos al 315 727 4521 o ingresa a santaarmonia.com.';
          }

          if (mensajeRespuesta) {
            await sendWhatsAppText({
              to: cleanFrom,
              body: mensajeRespuesta,
            });
            console.log('✅ Respuesta automática enviada:', mensajeRespuesta);
          }
        } catch (errorRespuesta) {
          console.error('❌ Error enviando respuesta automática:', errorRespuesta);
          // No fallar el webhook si falla el envío de respuesta
        }
      } else {
        console.log('❌ No se pudo asociar la respuesta a una reserva.', { 
          from: cleanFrom, 
          action, 
          messageSid 
        });
      }
    } else {
      console.log('ℹ️ No se detectó acción válida en el mensaje');
    }

    // Twilio espera una respuesta TwiML o 200 OK
    // Respondemos con TwiML vacío para indicar que procesamos el mensaje
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (e) {
    console.error('❌ Error webhook:', e);
    // Siempre responder 200 para evitar reintentos excesivos de Twilio
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}


