/*
  Helper para enviar emails usando Resend API.
  - Envía notificaciones por email de forma gratuita (hasta 100 emails/día).
  - Usa Resend que es gratuito y fácil de configurar.
*/

import { Resend } from 'resend';

function getEnv(name: string): string | undefined {
  return process.env[name];
}

// Inicializar Resend solo si hay API key configurada
let resendInstance: Resend | null = null;

function getResendInstance(): Resend | null {
  if (resendInstance) {
    return resendInstance;
  }
  
  const apiKey = getEnv('RESEND_API_KEY');
  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY no está configurado. Las notificaciones por email no se enviarán.');
    return null;
  }
  
  resendInstance = new Resend(apiKey);
  return resendInstance;
}

/**
 * Envía una notificación por email a la dueña cuando se crea una nueva reserva
 */
export async function sendOwnerNotification(params: {
  nombre: string;
  telefono: string;
  tratamiento: string;
  tratamientoPrecio: number;
  fecha: string;
  horario: string;
  notas?: string;
  reservaId: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const ownerEmail = getEnv('OWNER_EMAIL') || getEnv('NOTIFICATION_EMAIL');
    
    if (!ownerEmail) {
      console.warn('⚠️ OWNER_EMAIL o NOTIFICATION_EMAIL no está configurado. No se enviará notificación.');
      return { success: false, error: 'Email destinatario no configurado' };
    }

    const resend = getResendInstance();
    if (!resend) {
      return { success: false, error: 'Resend no configurado' };
    }

    // Formato de precio
    const precioFormato = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(params.tratamientoPrecio);

    // Crear contenido del email
    const emailSubject = `🎉 Nueva Reserva - ${params.nombre}`;
    
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .info-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #6b7280;
    }
    .info-value {
      color: #111827;
    }
    .badge {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✨ Nueva Reserva Recibida</h1>
  </div>
  <div class="content">
    <div class="badge">ID Reserva: #${params.reservaId}</div>
    
    <div class="info-box">
      <div class="info-row">
        <span class="info-label">👤 Cliente:</span>
        <span class="info-value"><strong>${params.nombre}</strong></span>
      </div>
      <div class="info-row">
        <span class="info-label">📞 Teléfono:</span>
        <span class="info-value">${params.telefono}</span>
      </div>
      <div class="info-row">
        <span class="info-label">💆‍♀️ Tratamiento:</span>
        <span class="info-value"><strong>${params.tratamiento}</strong></span>
      </div>
      <div class="info-row">
        <span class="info-label">💰 Precio:</span>
        <span class="info-value"><strong>${precioFormato}</strong></span>
      </div>
      <div class="info-row">
        <span class="info-label">📅 Fecha:</span>
        <span class="info-value"><strong>${params.fecha}</strong></span>
      </div>
      <div class="info-row">
        <span class="info-label">🕐 Horario:</span>
        <span class="info-value"><strong>${params.horario}</strong></span>
      </div>
      ${params.notas ? `
      <div class="info-row">
        <span class="info-label">📝 Notas:</span>
        <span class="info-value">${params.notas}</span>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>✨ Spa Santa Armonía - Sistema de Reservas</p>
      <p>Notificación enviada automáticamente</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailText = `
Nueva Reserva Recibida

ID Reserva: #${params.reservaId}

👤 Cliente: ${params.nombre}
📞 Teléfono: ${params.telefono}
💆‍♀️ Tratamiento: ${params.tratamiento}
💰 Precio: ${precioFormato}
📅 Fecha: ${params.fecha}
🕐 Horario: ${params.horario}
${params.notas ? `📝 Notas: ${params.notas}` : ''}

✨ Spa Santa Armonía - Sistema de Reservas
    `.trim();

    // Enviar email
    const result = await resend.emails.send({
      from: getEnv('RESEND_FROM_EMAIL') || 'Spa Santa Armonía <noreply@santaarmonia.com>',
      to: ownerEmail,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    console.log('✅ Email de notificación enviado exitosamente');
    console.log('📧 Email ID:', result.id);

    return { success: true };
  } catch (error) {
    console.error('❌ Error enviando email de notificación:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }
}
