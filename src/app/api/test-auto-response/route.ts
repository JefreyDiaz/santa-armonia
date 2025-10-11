import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { telefono, mensaje } = body;

    if (!telefono || !mensaje) {
      return NextResponse.json({ 
        error: 'telefono y mensaje son requeridos' 
      }, { status: 400 });
    }

    // Simular el payload que WhatsApp enviaría para un mensaje de texto
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
                name: "Usuario de Prueba"
              },
              wa_id: telefono
            }],
            messages: [{
              from: telefono,
              id: "wamid.HBgMNTczMTEyNDA1MTk0FQIAERgS" + Date.now(),
              timestamp: Math.floor(Date.now() / 1000).toString(),
              type: "text",
              text: {
                body: mensaje
              }
            }]
          },
          field: "messages"
        }]
      }]
    };

    console.log('🧪 Simulando mensaje de texto:', { telefono, mensaje });

    // Llamar al webhook real
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://spa-santa-armonia.loca.lt';

    const webhookResponse = await fetch(`${baseUrl}/api/whatsapp/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(whatsappPayload)
    });

    const webhookResult = await webhookResponse.json();

    return NextResponse.json({
      success: true,
      message: `Mensaje de texto simulado para ${telefono}`,
      mensajeEnviado: mensaje,
      webhookResponse: webhookResult,
      payload: whatsappPayload
    });

  } catch (error) {
    console.error('Error en test-auto-response:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Endpoint GET para mostrar instrucciones
export async function GET() {
  return NextResponse.json({
    message: 'Endpoint de prueba para respuestas automáticas',
    usage: {
      method: 'POST',
      body: {
        telefono: 'Número de teléfono (ej: +573112405194)',
        mensaje: 'Mensaje de texto a simular'
      }
    },
    examples: [
      {
        telefono: '+573112405194',
        mensaje: 'Hola, quiero hacer una reserva'
      },
      {
        telefono: '+573112405194',
        mensaje: '¿Cuáles son sus servicios?'
      },
      {
        telefono: '+573112405194',
        mensaje: 'Buenos días'
      }
    ]
  });
}

