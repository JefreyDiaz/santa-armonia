/*
  Helper para WhatsApp Cloud API.
  - Envía mensajes de plantilla o texto usando el PHONE_ID y el TOKEN del entorno.
  - Usa fetch nativo disponible en Next.js (App Router, runtime nodejs).
*/

type TemplateComponent = {
  type: 'body' | 'header' | 'button';
  parameters?: Array<
    | { type: 'text'; text: string }
    | { type: 'currency' | 'date_time' | 'payload' | 'document' | 'image' | 'video' | 'location'; [k: string]: any }
  >;
};

const GRAPH_API_VERSION = 'v20.0';

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta variable de entorno: ${name}`);
  return value;
}

function normalizeToE164(rawPhone: string, defaultCountryCode = '+57'): string {
  if (!rawPhone) return rawPhone;
  const onlyDigits = rawPhone.replace(/[^0-9+]/g, '');
  if (onlyDigits.startsWith('+')) return onlyDigits;
  // Si no trae código, anteponer el de Colombia por defecto
  return `${defaultCountryCode}${onlyDigits}`;
}

export async function sendWhatsAppText(params: { to: string; body: string }): Promise<any> {
  const token = getEnv('WHATSAPP_TOKEN');
  const phoneId = getEnv('WHATSAPP_PHONE_ID');
  const to = normalizeToE164(params.to);

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: params.body },
  } as const;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Error WhatsApp text: ${res.status} ${JSON.stringify(json)}`);
  }
  console.log('WhatsApp text OK:', { to, status: res.status, id: json?.messages?.[0]?.id });
  return json;
}

export async function sendWhatsAppInteractive(params: { 
  to: string; 
  body: string; 
  buttons: Array<{ type: string; reply: { id: string; title: string } }> 
}): Promise<any> {
  const token = getEnv('WHATSAPP_TOKEN');
  const phoneId = getEnv('WHATSAPP_PHONE_ID');
  const to = normalizeToE164(params.to);

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: params.body
      },
      action: {
        buttons: params.buttons
      }
    },
  } as const;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Error WhatsApp interactive: ${res.status} ${JSON.stringify(json)}`);
  }
  console.log('WhatsApp interactive OK:', { to, status: res.status, id: json?.messages?.[0]?.id });
  return json;
}

export async function sendWhatsAppTemplate(params: {
  to: string;
  templateName: string;
  language?: string; // ej: 'es'
  components?: TemplateComponent[];
}): Promise<any> {
  const token = getEnv('WHATSAPP_TOKEN');
  const phoneId = getEnv('WHATSAPP_PHONE_ID');
  const to = normalizeToE164(params.to);

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: params.templateName,
      language: { code: params.language || 'es' },
      components: params.components,
    },
  } as const;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Error WhatsApp template: ${res.status} ${JSON.stringify(json)}`);
  }
  console.log('WhatsApp template OK:', { to, template: params.templateName, status: res.status, id: json?.messages?.[0]?.id });
  return json;
}


