import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, saveOutgoingMessage } from '@/lib/database';
import { sendWhatsAppTemplate } from '@/lib/whatsapp';

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

    const db = await initDatabase();
    const hoy = formatDateLocal(new Date());

    // Traer reservas del día con datos de contacto
    const reservas = await db.all(
      `SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, t.nombre AS tratamiento
       FROM reservas r
       JOIN clientes c ON r.cliente_id = c.id
       JOIN tratamientos t ON r.tratamiento_id = t.id
       WHERE r.fecha = ? AND r.estado IN ('confirmada','pendiente')`,
      [hoy]
    );

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const enviados: Array<{ id: number; to: string }> = [];

    for (const r of reservas) {
      const diff = parseTimeToMinutes(r.horario) - nowMinutes; // minutos hasta la cita
      // Solo enviar si está en la ventana de recordatorio (ej: entre 2h y 1h antes)
      if (diff <= horas * 60 && diff > 60) {
        try {
          const wa = await sendWhatsAppTemplate({
            to: r.telefono,
            templateName: 'reserva_recordatorio', // crea y aprueba esta plantilla en Meta
            language: 'es',
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

          const messageId = wa?.messages?.[0]?.id as string | undefined;
          if (messageId) {
            await saveOutgoingMessage({ waMessageId: messageId, reservaId: r.id, purpose: 'recordatorio' });
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

    const db = await initDatabase();
    const r = await db.get(
      `SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, t.nombre AS tratamiento
       FROM reservas r
       JOIN clientes c ON r.cliente_id = c.id
       JOIN tratamientos t ON r.tratamiento_id = t.id
       WHERE r.id = ?`,
      [reservaId]
    );
    if (!r) return NextResponse.json({ ok: false, error: 'Reserva no encontrada' }, { status: 404 });

    const wa = await sendWhatsAppTemplate({
      to: r.telefono,
      templateName: 'reserva_recordatorio',
      language: 'es',
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
    const messageId = wa?.messages?.[0]?.id as string | undefined;
    if (messageId) {
      await saveOutgoingMessage({ waMessageId: messageId, reservaId: r.id, purpose: 'recordatorio' });
    }
    return NextResponse.json({ ok: true, sent: true, messageId });
  } catch (e) {
    console.error('Error en recordatorio POST:', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}


