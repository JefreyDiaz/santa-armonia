import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppTemplate, sendWhatsAppText, sendWhatsAppInteractive } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, templateName, components, text, language, buttons } = body || {};

    if (!to) {
      return NextResponse.json({ ok: false, error: 'Parámetro "to" es requerido' }, { status: 400 });
    }

    let data: any;
    if (text && buttons) {
      // Mensaje interactivo con botones
      data = await sendWhatsAppInteractive({ to, body: text, buttons });
    } else if (text) {
      // Mensaje de texto simple
      data = await sendWhatsAppText({ to, body: text });
    } else {
      if (!templateName) {
        return NextResponse.json({ ok: false, error: 'templateName o text requerido' }, { status: 400 });
      }
      data = await sendWhatsAppTemplate({ to, templateName, components, language });
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error /api/whatsapp/send:', error?.message || error);
    return NextResponse.json({ ok: false, error: error?.message || 'Error' }, { status: 500 });
  }
}


