import { NextRequest, NextResponse } from 'next/server';
import { crearReserva, verificarDisponibilidad } from '@/lib/database';
import { sendWhatsAppText, sendWhatsAppTemplate } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Datos recibidos:', body);
    
    const { nombre, telefono, fecha, horario, tratamiento, notas } = body;

    // Validar campos requeridos
    if (!nombre || !telefono || !fecha || !horario || !tratamiento) {
      console.log('Campos faltantes:', { nombre, telefono, fecha, horario, tratamiento });
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    console.log('Verificando disponibilidad para:', fecha, horario);
    
    // Verificar disponibilidad en tiempo real
    const disponible = await verificarDisponibilidad(fecha, horario, tratamiento);
    console.log('Disponibilidad:', disponible);
    
    if (!disponible) {
      return NextResponse.json(
        { error: 'El horario seleccionado ya no está disponible' },
        { status: 409 }
      );
    }

    console.log('Creando reserva...');
    
    // Crear reserva en la base de datos
    const reserva = await crearReserva({
      nombre,
      telefono,
      email: '', // Email vacío ya que no se requiere
      tratamiento,
      fecha,
      horario,
      notas
    });

    // Enviar confirmación por WhatsApp: primero intentar plantilla personalizada, luego texto, luego hello_world
    try {
      // Intenta plantilla 'reserva_confirmacion' (debe estar creada/aprobada en WhatsApp Manager)
      const plantilla = await sendWhatsAppTemplate({
        to: telefono,
        templateName: 'reserva_confirmacion',
        language: 'es',
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
      console.log('WA plantilla reserva_confirmacion OK:', plantilla);
    } catch (errTemplate) {
      console.warn('No se pudo enviar plantilla reserva_confirmacion. Enviando texto simple:', errTemplate);
      try {
        const mensaje = `*Spa Santa Armonía* ✨\n\nHola ${nombre} 👋, tu *reserva* ha sido registrada.\n\n• Tratamiento: *${tratamiento}*\n• Fecha: *${fecha}*\n• Hora: *${horario}*\n\n📍 Cra. XX #XX-XX, Manizales\n📞 301 536 1106\n\nGracias por elegirnos. ¡Te esperamos! 💆‍♀️💖\n\n_Nota: Si llegas con hasta 10 min de retraso, ese tiempo se descontará de tu sesión. Si llegas 15 min después de la hora agendada, no podremos atenderte ese día._`;
        const r = await sendWhatsAppText({ to: telefono, body: mensaje });
        console.log('WA envio texto respuesta:', r);
      } catch (waErr) {
        console.warn('No se pudo enviar WhatsApp de confirmación como texto, intento plantilla hello_world:', waErr);
        try {
          const r2 = await sendWhatsAppTemplate({ to: telefono, templateName: 'hello_world', language: 'en_US' });
          console.log('WA envio plantilla respuesta:', r2);
        } catch (e) {
          console.warn('Tampoco se pudo enviar plantilla hello_world:', e);
        }
      }
    }

    // Por ahora no enviamos emails
    console.log('Reserva creada exitosamente:', {
      id: reserva.id,
      cliente: nombre,
      tratamiento,
      fecha,
      horario
    });

    return NextResponse.json({
      success: true,
      message: 'Reserva creada exitosamente',
      reservaId: reserva.id,
      emailSent: false
    }, { status: 200 });

  } catch (error) {
    console.error('Error al crear reserva:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 