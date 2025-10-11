import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservaId, action, telefono } = body;

    if (!reservaId || !action || !telefono) {
      return NextResponse.json({ 
        error: 'reservaId, action y telefono son requeridos' 
      }, { status: 400 });
    }

    // Simular exactamente el payload que WhatsApp enviaría
    const whatsappPayload = {
      object: "whatsapp_business_account",
      entry: [{
        id: "ENTRY_ID",
        changes: [{
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15551906119",
              phone_number_id: process.env.WHATSAPP_PHONE_ID
            },
            contacts: [{
              profile: {
                name: "Will Tamarindo"
              },
              wa_id: telefono
            }],
            messages: [{
              from: telefono,
              id: "wamid.HBgMNTczMTEyNDA1MTk0FQIAERgS" + Date.now(),
              timestamp: Math.floor(Date.now() / 1000).toString(),
              type: "interactive",
              interactive: {
                type: "button_reply",
                button_reply: {
                  id: action,
                  title: action === 'CONFIRMAR' ? '✅ Confirmar' : '❌ Cancelar'
                }
              },
              context: {
                id: "wamid.HBgMNTczMTEyNDA1MTk0FQIAERgSODkwQzFEMzY5QUMxNzVGNjdGAA==" // ID del mensaje original
              }
            }]
          },
          field: "messages"
        }]
      }]
    };

    console.log('🎭 Simulando respuesta de WhatsApp:', JSON.stringify(whatsappPayload, null, 2));

    // Llamar al webhook real
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';

    const webhookResponse = await fetch(`${baseUrl}/api/whatsapp/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(whatsappPayload)
    });

    const webhookResult = await webhookResponse.json();

    return NextResponse.json({
      success: true,
      message: `Respuesta de WhatsApp simulada para reserva ${reservaId}`,
      action,
      telefono,
      webhookResponse: webhookResult,
      payload: whatsappPayload
    });

  } catch (error) {
    console.error('Error en simulate-whatsapp-response:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
