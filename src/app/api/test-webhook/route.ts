import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Endpoint para probar el webhook manualmente
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservaId, action } = body;

    if (!reservaId || !action) {
      return NextResponse.json({ 
        error: 'reservaId y action son requeridos' 
      }, { status: 400 });
    }

    if (!['CONFIRMAR', 'CANCELAR'].includes(action)) {
      return NextResponse.json({ 
        error: 'action debe ser CONFIRMAR o CANCELAR' 
      }, { status: 400 });
    }

    // Simular el payload que enviaría WhatsApp
    const mockPayload = {
      entry: [{
        changes: [{
          value: {
            messages: [{
              type: 'interactive',
              from: '+573112405194', // Número de prueba
              context: {
                id: 'mock-message-id-' + Date.now()
              },
              interactive: {
                button_reply: {
                  id: action,
                  title: action === 'CONFIRMAR' ? '✅ Confirmar' : '❌ Cancelar'
                }
              }
            }]
          }
        }]
      }]
    };

    console.log('🧪 Simulando webhook con payload:', JSON.stringify(mockPayload, null, 2));

    // Llamar al webhook real
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';

    const webhookResponse = await fetch(`${baseUrl}/api/whatsapp/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockPayload)
    });

    const webhookResult = await webhookResponse.json();

    return NextResponse.json({
      success: true,
      message: `Webhook simulado para reserva ${reservaId} con acción ${action}`,
      webhookResponse: webhookResult,
      mockPayload
    });

  } catch (error) {
    console.error('Error en test-webhook:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Endpoint GET para mostrar instrucciones
export async function GET() {
  return NextResponse.json({
    message: 'Endpoint de prueba para webhook de WhatsApp',
    usage: {
      method: 'POST',
      body: {
        reservaId: 'ID de la reserva a probar',
        action: 'CONFIRMAR o CANCELAR'
      }
    },
    example: {
      reservaId: 1,
      action: 'CANCELAR'
    }
  });
}
