import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, saveOutgoingMessage, getPool } from '@/lib/database';
import { sendWhatsAppText, sendWhatsAppTemplate } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Envía recordatorios para reservas próximas a ocurrir.
// GET: /api/whatsapp/recordatorio?horas=2  -> envía recordatorios a reservas hoy cuya hora esté a <= 2 horas y >= 0 minutos
// POST body: { reservaId: number } -> envía recordatorio para una reserva específica

function parseTimeToMinutes(hhmm: string): number {
  const [hh, mm] = hhmm.split(':').map(Number);
  return hh * 60 + (mm || 0);
}

function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export async function GET(req: NextRequest) {
  try {
    const horas = Number(req.nextUrl.searchParams.get('horas') || '2');

    await initDatabase();
    const pool = getPool();
    const hoy = formatDateLocal(new Date());

    // Traer reservas del día con datos de contacto
    const reservasResult = await pool.query(
      `SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, r.tratamiento_nombre AS tratamiento
       FROM reservas r
       JOIN clientes c ON r.cliente_id = c.id
       WHERE r.fecha = $1 AND r.estado IN ('confirmada','pendiente')`,
      [hoy]
    );
    
    const reservas = reservasResult.rows;

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const enviados: Array<{ id: number; to: string }> = [];

    for (const r of reservas) {
      const diff = parseTimeToMinutes(r.horario) - nowMinutes; // minutos hasta la cita
      // Solo enviar si está en la ventana de recordatorio (ej: entre 2h y 1h antes)
      if (diff <= horas * 60 && diff > 60) {
        try {
          // Intentar usar plantilla si está disponible, sino usar mensaje libre
          const contentSidRecordatorio = process.env.TWILIO_CONTENT_SID_RECORDATORIO;
          let wa;
          
          if (contentSidRecordatorio) {
            // Usar Content Template (recomendado)
            console.log('📱 Usando Content Template para recordatorio:', contentSidRecordatorio);
            wa = await sendWhatsAppTemplate({
              to: r.telefono,
              templateName: 'reserva_recordatorio',
              language: 'es',
              contentSid: contentSidRecordatorio,
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: r.nombre },
                    { type: 'text', text: r.tratamiento },
                    { type: 'text', text: r.fecha },
                    { type: 'text', text: r.horario },
                  ],
                },
              ],
            });
          } else {
            // Fallback: mensaje libre (solo funciona dentro de ventana de 24h)
            console.log('⚠️ No hay ContentSid para recordatorio. Usando mensaje libre (solo funciona dentro de 24h)');
            const mensaje = `*Recordatorio* ⏰\n\nHola ${r.nombre}, te recordamos tu cita:\n\n• Tratamiento: *${r.tratamiento}*\n• Fecha: *${r.fecha}*\n• Hora: *${r.horario}*\n\n📍 Cra 9B #57D - 27 La Carolita, Manizales\n📞 315 727 4521\n\nPor favor confirma tu asistencia:\n\n1️⃣ Escribe *1* para confirmar\n2️⃣ Escribe *2* para cancelar\n\n_Nota: Si no respondes, tu reserva quedará confirmada por defecto._`;
            
            wa = await sendWhatsAppText({
              to: r.telefono,
              body: mensaje,
            });
          }

          // Guardar el messageSid para poder asociar la respuesta con la reserva
          const messageId = (wa?.messages?.[0]?.id || wa?.sid) as string | undefined;
          if (messageId) {
            await saveOutgoingMessage({ waMessageId: messageId, reservaId: r.id, purpose: 'recordatorio' });
            console.log(`✅ Recordatorio enviado a ${r.nombre} (Reserva ID: ${r.id}, MessageSid: ${messageId})`);
          }
          enviados.push({ id: r.id, to: r.telefono });
        } catch (e) {
          console.warn('No se pudo enviar recordatorio para reserva', r.id, e);
        }
      }
    }

    return NextResponse.json({ ok: true, enviados });
  } catch (e) {
    console.error('Error en recordatorio GET:', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservaId } = body || {};
    if (!reservaId) return NextResponse.json({ ok: false, error: 'reservaId requerido' }, { status: 400 });

    await initDatabase();
    const pool = getPool();
    const reservaResult = await pool.query(
      `SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, r.tratamiento_nombre AS tratamiento
       FROM reservas r
       JOIN clientes c ON r.cliente_id = c.id
       WHERE r.id = $1`,
      [reservaId]
    );
    
    const r = reservaResult.rows[0];
    if (!r) return NextResponse.json({ ok: false, error: 'Reserva no encontrada' }, { status: 404 });

    // Intentar usar plantilla si está disponible, sino usar mensaje libre
    const contentSidRecordatorio = process.env.TWILIO_CONTENT_SID_RECORDATORIO;
    let wa;
    
    if (contentSidRecordatorio) {
      // Usar Content Template (recomendado)
      console.log('📱 Usando Content Template para recordatorio:', contentSidRecordatorio);
      wa = await sendWhatsAppTemplate({
        to: r.telefono,
        templateName: 'reserva_recordatorio',
        language: 'es',
        contentSid: contentSidRecordatorio,
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: r.nombre },
              { type: 'text', text: r.tratamiento },
              { type: 'text', text: r.fecha },
              { type: 'text', text: r.horario },
            ],
          },
        ],
      });
    } else {
      // Fallback: mensaje libre (solo funciona dentro de ventana de 24h)
      console.log('⚠️ No hay ContentSid para recordatorio. Usando mensaje libre (solo funciona dentro de 24h)');
      const mensaje = `*Recordatorio* ⏰\n\nHola ${r.nombre}, te recordamos tu cita:\n\n• Tratamiento: *${r.tratamiento}*\n• Fecha: *${r.fecha}*\n• Hora: *${r.horario}*\n\n📍 Cra 9B #57D - 27 La Carolita, Manizales\n📞 315 727 4521\n\nPor favor confirma tu asistencia:\n\n1️⃣ Escribe *1* para confirmar\n2️⃣ Escribe *2* para cancelar\n\n_Nota: Si no respondes, tu reserva quedará confirmada por defecto._`;
      
      wa = await sendWhatsAppText({
        to: r.telefono,
        body: mensaje,
      });
    }
    
    // Guardar el messageSid para poder asociar la respuesta con la reserva
    const messageId = (wa?.messages?.[0]?.id || wa?.sid) as string | undefined;
    if (messageId) {
      await saveOutgoingMessage({ waMessageId: messageId, reservaId: r.id, purpose: 'recordatorio' });
      console.log(`✅ Recordatorio enviado a ${r.nombre} (Reserva ID: ${r.id}, MessageSid: ${messageId})`);
    }
    return NextResponse.json({ ok: true, sent: true, messageId });
  } catch (e) {
    console.error('Error en recordatorio POST:', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}


