import { NextRequest, NextResponse } from 'next/server';
import { findReservaIdByMessageId, updateReservaEstado } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get('hub.mode');
  const token = req.nextUrl.searchParams.get('hub.verify_token');
  const challenge = req.nextUrl.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge || '', { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    // Logs detallados para debugging
    console.log('🔔 WA webhook recibido:', JSON.stringify(payload, null, 2));

    const changes = payload?.entry?.[0]?.changes?.[0]?.value;
    const message = changes?.messages?.[0];

    if (message) {
      console.log('📱 Mensaje recibido:', {
        type: message.type,
        from: message.from,
        context: message.context,
        interactive: message.interactive,
        button: message.button,
        text: message.text
      });

      const from = message.from; // número cliente
      let action: 'CONFIRMAR' | 'CANCELAR' | undefined;

      if (message.type === 'interactive') {
        const id = message.interactive?.button_reply?.id as string | undefined;
        console.log('🔘 Botón interactivo presionado:', { id, title: message.interactive?.button_reply?.title });
        if (id === 'CONFIRMAR' || id === 'CANCELAR') action = id;
      } else if (message.type === 'button') {
        const text = message.button?.text as string | undefined;
        console.log('🔘 Botón presionado:', { text });
        if (text === 'CONFIRMAR' || text === 'CANCELAR') action = text;
      } else if (message.text?.body) {
        const t = (message.text.body as string).trim().toUpperCase();
        console.log('💬 Texto recibido:', { text: t });
        if (['CONFIRMAR', 'CANCELAR'].includes(t)) action = t as any;
      }

      console.log('🎯 Acción detectada:', action);

      if (action) {
        const contextId = (message.context?.id as string | undefined) || undefined;
        console.log('🔗 Context ID:', contextId);
        
        let reservaId: number | null = null;
        if (contextId) {
          try {
            reservaId = await findReservaIdByMessageId(contextId);
            console.log('🔍 Reserva encontrada por context ID:', reservaId);
          } catch (e) {
            console.warn('❌ Error buscando reserva por context.id', e);
          }
        }

        if (reservaId) {
          let nuevoEstado: 'confirmada' | 'cancelada' = 'confirmada';
          if (action === 'CANCELAR') nuevoEstado = 'cancelada';
          await updateReservaEstado(reservaId, nuevoEstado);
          console.log('✅ Reserva actualizada por webhook:', { reservaId, nuevoEstado, action });
        } else {
          // Fallback: buscar por número de teléfono si no encontramos por context.id
          console.log('🔍 No se encontró por context.id, buscando por número de teléfono...');
          try {
            const db = await initDatabase();
            const reservaPorTelefono = await db.get(`
              SELECT r.id FROM reservas r
              JOIN clientes c ON r.cliente_id = c.id
              WHERE c.telefono = ? 
              AND r.estado IN ('confirmada', 'pendiente')
              AND r.fecha >= DATE('now')
              ORDER BY r.fecha DESC, r.horario DESC
              LIMIT 1
            `, [from]);
            
            if (reservaPorTelefono) {
              let nuevoEstado: 'confirmada' | 'cancelada' = 'confirmada';
              if (action === 'CANCELAR') nuevoEstado = 'cancelada';
              await updateReservaEstado(reservaPorTelefono.id, nuevoEstado);
              console.log('✅ Reserva actualizada por webhook (fallback por teléfono):', { 
                reservaId: reservaPorTelefono.id, 
                nuevoEstado, 
                action,
                telefono: from 
              });
            } else {
              console.log('❌ No se pudo asociar la respuesta a una reserva por teléfono tampoco.', { from, action, contextId });
            }
          } catch (e) {
            console.error('❌ Error en fallback por teléfono:', e);
          }
        }
      } else {
        console.log('ℹ️ No se detectó acción válida en el mensaje');
      }
    } else {
      console.log('ℹ️ No se encontró mensaje en el payload');
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('❌ Error webhook:', e);
    return NextResponse.json({ ok: true }); // responder 200 siempre para evitar reintentos excesivos
  }
}


