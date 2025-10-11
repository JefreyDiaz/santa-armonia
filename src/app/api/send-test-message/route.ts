import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppText } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { telefono } = body;

    if (!telefono) {
      return NextResponse.json({ 
        error: 'telefono es requerido' 
      }, { status: 400 });
    }

    console.log(`📱 Enviando mensaje de prueba a ${telefono}`);

    const mensajePrueba = `*Spa Santa Armonía* 🧘‍♀️

¡Hola! 👋

Queremos lo mismo que tú: *bienestar y comodidad* 💆‍♀️✨

Por eso, ahora tú mism@ puedes hacer tu reserva de manera fácil y rápida:

🌐 *Reserva aquí:* https://spa-santa-armonia.loca.lt/reservar

📱 *¿Qué puedes hacer?*
• Ver todos nuestros tratamientos
• Elegir fecha y hora disponible
• Confirmar tu cita al instante
• Recibir recordatorios automáticos

📍 *Ubicación:* Cra. XX #XX-XX, Manizales
📞 *Teléfono:* 301 536 1106

¡Te esperamos para brindarte la mejor experiencia de bienestar! 💆‍♀️✨`;

    const result = await sendWhatsAppText({
      to: telefono,
      body: mensajePrueba
    });

    console.log('✅ Mensaje de prueba enviado:', result);

    return NextResponse.json({
      success: true,
      message: `Mensaje de prueba enviado a ${telefono}`,
      result
    });

  } catch (error) {
    console.error('Error en send-test-message:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

