import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Endpoint para verificar la configuración de Twilio
 * GET /api/whatsapp/test-config
 */
export async function GET(req: NextRequest) {
  const config = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 
      `${process.env.TWILIO_ACCOUNT_SID.substring(0, 10)}...` : 
      '❌ NO CONFIGURADO',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? 
      '✅ Configurado' : 
      '❌ NO CONFIGURADO',
    TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER || '❌ NO CONFIGURADO',
  };

  const allConfigured = 
    process.env.TWILIO_ACCOUNT_SID && 
    process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_WHATSAPP_NUMBER;

  return NextResponse.json({
    status: allConfigured ? '✅ Configuración OK' : '❌ Faltan variables',
    config,
    message: allConfigured 
      ? 'Todas las variables están configuradas. Revisa los logs del servidor para ver errores de Twilio.'
      : 'Faltan variables de entorno. Verifica tu archivo .env.local',
  });
}

