import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppText } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Endpoint para probar el envío de WhatsApp
 * POST /api/whatsapp/test-send
 * Body: { to: "+573112405194", message: "Mensaje de prueba" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, message } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'El campo "to" (número de teléfono) es requerido' },
        { status: 400 }
      );
    }

    const mensaje = message || `🧪 *Mensaje de Prueba*\n\nEste es un mensaje de prueba desde Santa Armonía.\n\nSi recibes este mensaje, la configuración está funcionando correctamente. ✅`;

    console.log('\n🧪 ===== PRUEBA DE ENVÍO WHATSAPP =====');
    console.log('📱 Destinatario:', to);
    console.log('💬 Mensaje:', mensaje);

    const resultado = await sendWhatsAppText({
      to,
      body: mensaje,
    });

    console.log('✅ Mensaje enviado a Twilio');
    console.log('✅ Message SID:', resultado.sid);
    console.log('🧪 ===== PRUEBA COMPLETADA =====\n');

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado a Twilio exitosamente',
      messageSid: resultado.sid,
      to,
      note: 'Si no recibes el mensaje, verifica que el número esté verificado en Twilio Sandbox o que el número de Twilio esté completamente configurado.',
    });
  } catch (error) {
    console.error('\n❌ ===== ERROR EN PRUEBA =====');
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    console.error('❌ ===== FIN ERROR =====\n');

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}


