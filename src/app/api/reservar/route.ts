import { NextRequest, NextResponse } from 'next/server';
import { crearReserva, verificarDisponibilidad, initDatabase } from '@/lib/database';
import { sendWhatsAppText, sendWhatsAppTemplate } from '@/lib/whatsapp';
import { sendOwnerNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  console.log('\n🚀 ===== NUEVA RESERVA RECIBIDA =====');
  try {
    // Inicializar la base de datos (crea las tablas si no existen)
    await initDatabase();
    
    const body = await request.json();
    console.log('📝 Datos recibidos:', { nombre: body.nombre, telefono: body.telefono, fecha: body.fecha, horario: body.horario });
    
    const { nombre, telefono, fecha, horario, tratamiento, tratamientoPrecio, tratamientoDuracion, tratamientoCategoria, notas } = body;

    // Validar campos requeridos
    if (!nombre || !telefono || !fecha || !horario || !tratamiento || tratamientoPrecio === undefined || !tratamientoDuracion || !tratamientoCategoria) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }
    
    // Verificar disponibilidad en tiempo real
    const disponible = await verificarDisponibilidad(fecha, horario, tratamientoCategoria);
    
    if (!disponible) {
      return NextResponse.json(
        { error: 'El horario seleccionado ya no está disponible' },
        { status: 409 }
      );
    }
    
    // Crear reserva en la base de datos
    const reserva = await crearReserva({
      nombre,
      telefono,
      email: '', // Email vacío ya que no se requiere
      tratamiento,
      tratamientoPrecio,
      tratamientoDuracion,
      tratamientoCategoria,
      fecha,
      horario,
      notas
    });

    console.log('✅ Reserva creada en BD:', { id: reserva.id });

    // Verificar variables de entorno antes de enviar WhatsApp
    console.log('\n📱 ===== VERIFICANDO CONFIGURACIÓN TWILIO =====');
    const hasAccountSid = !!process.env.TWILIO_ACCOUNT_SID;
    const hasAuthToken = !!process.env.TWILIO_AUTH_TOKEN;
    const hasWhatsAppNumber = !!process.env.TWILIO_WHATSAPP_NUMBER;
    const hasContentSid = !!process.env.TWILIO_CONTENT_SID_RESERVA;
    console.log('🔧 Variables configuradas:', { 
      TWILIO_ACCOUNT_SID: hasAccountSid ? '✅' : '❌',
      TWILIO_AUTH_TOKEN: hasAuthToken ? '✅' : '❌',
      TWILIO_WHATSAPP_NUMBER: hasWhatsAppNumber ? '✅' : '❌',
      TWILIO_CONTENT_SID_RESERVA: hasContentSid ? '✅' : '❌',
      numero: process.env.TWILIO_WHATSAPP_NUMBER || 'NO CONFIGURADO',
      contentSid: process.env.TWILIO_CONTENT_SID_RESERVA ? `${process.env.TWILIO_CONTENT_SID_RESERVA.substring(0, 10)}...` : 'NO CONFIGURADO'
    });

    // Enviar confirmación por WhatsApp usando Content Template
    console.log('\n📱 ===== INICIANDO ENVÍO WHATSAPP =====');
    console.log('📱 Destinatario:', telefono);
    console.log('📱 Reserva ID:', reserva.id);
    
    try {
      // Usar Content Template (requiere plantilla aprobada en Twilio)
      const contentSid = process.env.TWILIO_CONTENT_SID_RESERVA;
      
      if (contentSid) {
        // Usar Content Template con variables
        console.log('📱 Usando Content Template:', contentSid);
        console.log('📱 Variables:', { nombre, tratamiento, fecha, horario });
        
        const resultado = await sendWhatsAppTemplate({
        to: telefono,
        templateName: 'reserva_confirmacion',
        language: 'es',
          contentSid: contentSid, // Pasar el ContentSid directamente
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: nombre },
              { type: 'text', text: tratamiento },
              { type: 'text', text: fecha },
              { type: 'text', text: horario },
            ],
          },
        ],
      });
        
        console.log('✅ WhatsApp enviado exitosamente con plantilla');
        console.log('✅ Message SID:', resultado.sid);
      } else {
        // NO intentar mensaje libre - siempre fallará fuera de ventana de 24h
        console.error('❌ ERROR: TWILIO_CONTENT_SID_RESERVA no está configurado');
        console.error('💡 SOLUCIÓN: Agrega el ContentSid a tu .env.local:');
        console.error('💡 TWILIO_CONTENT_SID_RESERVA=HXcbea0eef41b48d930153a6a0448da0ed');
        console.error('💡 (Usa el ContentSid de tu plantilla en Twilio)');
        throw new Error('ContentSid no configurado. Necesitas agregar TWILIO_CONTENT_SID_RESERVA a tu .env.local');
      }
      console.log('📱 ===== WHATSAPP ENVIADO CORRECTAMENTE =====\n');
      } catch (waErr) {
      console.error('\n❌ ===== ERROR ENVIANDO WHATSAPP =====');
      console.error('❌ Error:', waErr instanceof Error ? waErr.message : String(waErr));
      if (waErr instanceof Error && waErr.stack) {
        console.error('❌ Stack:', waErr.stack);
      }
      console.error('💡 SOLUCIÓN: Necesitas crear una Content Template en Twilio');
      console.error('💡 Ve a: Messaging → Content Template Builder');
      console.error('❌ ===== FIN ERROR WHATSAPP =====\n');
      // No lanzamos el error para que la reserva se guarde igual
    }

    // Enviar notificación por email a la dueña
    console.log('\n📧 ===== ENVIANDO NOTIFICACIÓN A LA DUEÑA =====');
    try {
      const emailResult = await sendOwnerNotification({
        nombre,
        telefono,
        tratamiento,
        tratamientoPrecio,
        fecha,
        horario,
        notas,
        reservaId: reserva.id
      });

      if (emailResult.success) {
        console.log('✅ Email de notificación enviado a la dueña');
      } else {
        console.warn('⚠️ No se pudo enviar email de notificación:', emailResult.error);
      }
    } catch (emailErr) {
      console.error('❌ Error enviando email de notificación:', emailErr instanceof Error ? emailErr.message : String(emailErr));
      // No lanzamos el error para que la reserva se guarde igual
    }
    console.log('📧 ===== FIN NOTIFICACIÓN EMAIL =====\n');

    console.log('✅ ===== RESERVA COMPLETADA =====\n');
    return NextResponse.json({
      success: true,
      message: 'Reserva creada exitosamente',
      reservaId: reserva.id,
      emailSent: true
    }, { status: 200 });

  } catch (error) {
    console.error('\n❌ ===== ERROR AL CREAR RESERVA =====');
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error('❌ Stack:', error.stack);
    }
    console.error('❌ ===== FIN ERROR =====\n');
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 