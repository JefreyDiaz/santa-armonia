/*
  Helper para WhatsApp usando Twilio API.
  - Envía mensajes de texto y plantillas usando Twilio.
  - Usa fetch nativo disponible en Next.js (App Router, runtime nodejs).
*/

type TemplateComponent = {
  type: 'body' | 'header' | 'button';
  parameters?: Array<
    | { type: 'text'; text: string }
    | { type: 'currency' | 'date_time' | 'payload' | 'document' | 'image' | 'video' | 'location'; [k: string]: any }
  >;
};

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

function formatTwilioPhone(phone: string): string {
  const normalized = normalizeToE164(phone);
  return `whatsapp:${normalized}`;
}

function createBasicAuth(accountSid: string, authToken: string): string {
  return Buffer.from(`${accountSid}:${authToken}`).toString('base64');
}

/**
 * IMPORTANTE: WhatsApp requiere Content Templates para mensajes fuera de la ventana de 24h.
 * Esta función ahora usa Content Templates. Necesitas crear la plantilla en Twilio primero.
 * 
 * Para crear la plantilla:
 * 1. Ve a: Messaging → Content Template Builder
 * 2. Crea una plantilla llamada "reserva_confirmacion" con variables {{1}}, {{2}}, etc.
 * 3. Una vez aprobada, obtén el ContentSid y úsalo aquí
 */
export async function sendWhatsAppText(params: { to: string; body: string; contentSid?: string }): Promise<any> {
  try {
    const accountSid = getEnv('TWILIO_ACCOUNT_SID');
    const authToken = getEnv('TWILIO_AUTH_TOKEN');
    const fromNumber = getEnv('TWILIO_WHATSAPP_NUMBER');
    const to = formatTwilioPhone(params.to);

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const formData = new URLSearchParams();
    formData.append('From', fromNumber);
    formData.append('To', to);
    
    // Si hay ContentSid, usar plantilla. Si no, intentar mensaje libre (solo funciona dentro de 24h)
    if (params.contentSid) {
      formData.append('ContentSid', params.contentSid);
      // Si la plantilla tiene variables, puedes agregarlas aquí
      // formData.append('ContentVariables', JSON.stringify({ '1': 'valor1', '2': 'valor2' }));
    } else {
      // Mensaje libre - solo funciona dentro de ventana de 24h
      formData.append('Body', params.body);
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${createBasicAuth(accountSid, authToken)}`,
      },
      body: formData,
      cache: 'no-store',
    });

    const json = await res.json();
    
    if (!res.ok) {
      console.error('❌ Error de Twilio API:', json);
      throw new Error(`Error WhatsApp: ${res.status} - ${json.message || JSON.stringify(json)}`);
    }
    
    return {
      messages: [{ id: json.sid }],
      sid: json.sid,
    };
  } catch (error) {
    console.error('❌ Error en sendWhatsAppText:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function sendWhatsAppInteractive(params: { 
  to: string; 
  body: string; 
  buttons: Array<{ type: string; reply: { id: string; title: string } }> 
}): Promise<any> {
  // Twilio no soporta botones interactivos nativos como Meta.
  // En su lugar, enviamos un mensaje de texto con opciones numeradas.
  const accountSid = getEnv('TWILIO_ACCOUNT_SID');
  const authToken = getEnv('TWILIO_AUTH_TOKEN');
  const fromNumber = getEnv('TWILIO_WHATSAPP_NUMBER');
  const to = formatTwilioPhone(params.to);

  // Construir mensaje con botones como opciones numeradas
  let messageBody = params.body + '\n\n';
  buttons.forEach((btn, index) => {
    if (btn.reply) {
      messageBody += `${index + 1}. ${btn.reply.title}\n`;
    }
  });
  messageBody += '\nResponde con el número de tu opción o escribe CONFIRMAR o CANCELAR.';

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const formData = new URLSearchParams();
  formData.append('From', fromNumber);
  formData.append('To', to);
  formData.append('Body', messageBody);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${createBasicAuth(accountSid, authToken)}`,
    },
    body: formData,
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Error WhatsApp interactive: ${res.status} ${JSON.stringify(json)}`);
  }
  console.log('WhatsApp interactive OK:', { to, status: res.status, sid: json?.sid });
  return {
    messages: [{ id: json.sid }],
    sid: json.sid,
  };
}

/**
 * Envía mensaje usando Content Template de Twilio
 * IMPORTANTE: Necesitas crear la plantilla en Twilio Content Template Builder primero
 */
export async function sendWhatsAppTemplate(params: {
  to: string;
  templateName: string;
  language?: string; // ej: 'es'
  components?: TemplateComponent[];
  contentSid?: string; // ContentSid de la plantilla en Twilio
}): Promise<any> {
  try {
    const accountSid = getEnv('TWILIO_ACCOUNT_SID');
    const authToken = getEnv('TWILIO_AUTH_TOKEN');
    const fromNumber = getEnv('TWILIO_WHATSAPP_NUMBER');
    const to = formatTwilioPhone(params.to);

    // Obtener ContentSid desde variable de entorno o parámetro
    let contentSid = params.contentSid;
    if (!contentSid) {
      // Intentar obtener desde variables de entorno según el nombre de la plantilla
      switch (params.templateName) {
        case 'reserva_confirmacion':
          contentSid = process.env.TWILIO_CONTENT_SID_RESERVA;
          break;
        case 'reserva_recordatorio':
          contentSid = process.env.TWILIO_CONTENT_SID_RECORDATORIO;
          break;
      }
    }

    // Extraer parámetros de los componentes para las variables de la plantilla
    const bodyComponent = params.components?.find(c => c.type === 'body');
    const textParams = bodyComponent?.parameters
      ?.filter(p => p.type === 'text')
      .map(p => (p as { type: string; text: string }).text) || [];

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const formData = new URLSearchParams();
    formData.append('From', fromNumber);
    formData.append('To', to);

    if (contentSid) {
      // Usar Content Template (recomendado)
      formData.append('ContentSid', contentSid);
      
      // Si hay variables, construir ContentVariables JSON
      if (textParams.length > 0) {
        const contentVariables: Record<string, string> = {};
        textParams.forEach((param, index) => {
          contentVariables[String(index + 1)] = param;
        });
        formData.append('ContentVariables', JSON.stringify(contentVariables));
      }
    } else {
      // Fallback: construir mensaje manualmente (solo funciona dentro de 24h)
      console.warn('⚠️ No hay ContentSid. Usando mensaje libre (solo funciona dentro de ventana de 24h)');
      let messageBody = '';
      
      switch (params.templateName) {
        case 'reserva_confirmacion':
          if (textParams.length >= 4) {
            const [nombre, tratamiento, fecha, horario] = textParams;
            messageBody = `*Spa Santa Armonía* ✨\n\nHola ${nombre} 👋, tu *reserva* ha sido registrada.\n\n• Tratamiento: *${tratamiento}*\n• Fecha: *${fecha}*\n• Hora: *${horario}*\n\n📍 Cra. XX #XX-XX, Manizales\n📞 301 536 1106\n\nGracias por elegirnos. ¡Te esperamos! 💆‍♀️💖\n\n_Nota: Si llegas con hasta 10 min de retraso, ese tiempo se descontará de tu sesión. Si llegas 15 min después de la hora agendada, no podremos atenderte ese día._`;
          } else {
            messageBody = 'Tu reserva ha sido confirmada. Gracias por elegirnos.';
          }
          break;
        case 'reserva_recordatorio':
          if (textParams.length >= 4) {
            const [nombre, tratamiento, fecha, horario] = textParams;
            messageBody = `*Recordatorio* ⏰\n\nHola ${nombre}, te recordamos tu cita:\n\n• Tratamiento: *${tratamiento}*\n• Fecha: *${fecha}*\n• Hora: *${horario}*\n\n¡Te esperamos! 💆‍♀️✨`;
          } else {
            messageBody = 'Recordatorio: Tienes una reserva próximamente. ¡Te esperamos!';
          }
          break;
        default:
          messageBody = textParams.join(' - ') || 'Mensaje de Santa Armonía Facial & Corporal';
      }
      formData.append('Body', messageBody);
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${createBasicAuth(accountSid, authToken)}`,
      },
      body: formData,
      cache: 'no-store',
    });

    const json = await res.json();
    
    if (!res.ok) {
      console.error('❌ Error de Twilio API:', json);
      throw new Error(`Error WhatsApp template: ${res.status} - ${json.message || JSON.stringify(json)}`);
    }
    
    return {
      messages: [{ id: json.sid }],
      sid: json.sid,
    };
  } catch (error) {
    console.error('❌ Error en sendWhatsAppTemplate:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}


