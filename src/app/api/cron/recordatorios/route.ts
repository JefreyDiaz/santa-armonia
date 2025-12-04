import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, saveOutgoingMessage, getPool } from '@/lib/database';
import { sendWhatsAppText, sendWhatsAppTemplate } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Función para parsear tiempo a minutos
function parseTimeToMinutes(hhmm: string): number {
  const [hh, mm] = hhmm.split(':').map(Number);
  return hh * 60 + (mm || 0);
}

// Función para formatear fecha local
function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Función para enviar recordatorios
async function enviarRecordatorios(horasAntes: number = 2, fechaEspecifica?: string) {
  try {
    const fechaTarget = fechaEspecifica || formatDateLocal(new Date());
    console.log(`🔄 Iniciando envío de recordatorios para ${fechaTarget} (${horasAntes} horas antes)...`);
    
    await initDatabase();
    const pool = getPool();
    const ahora = new Date();
    const ahoraMinutos = ahora.getHours() * 60 + ahora.getMinutes();

    // Buscar reservas del día especificado que necesiten recordatorio
    console.log(`🔍 Buscando reservas para fecha: ${fechaTarget}`);
    
    // Primero, ver todas las reservas del día
    const todasReservasResult = await pool.query(
      `SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, r.tratamiento_nombre AS tratamiento
       FROM reservas r
       JOIN clientes c ON r.cliente_id = c.id
       WHERE r.fecha = $1`,
      [fechaTarget]
    );
    
    const todasReservas = todasReservasResult.rows;
    console.log(`📊 Total reservas encontradas para ${fechaTarget}:`, todasReservas.length);
    
    // Luego, filtrar las que necesitan recordatorio (que no tengan recordatorio enviado hoy)
    const hoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const reservasResult = await pool.query(
      `SELECT r.id, r.fecha, r.horario, r.estado, c.nombre, c.telefono, r.tratamiento_nombre AS tratamiento
       FROM reservas r
       JOIN clientes c ON r.cliente_id = c.id
       WHERE r.fecha = $1 
       AND r.estado IN ('confirmada','pendiente')
       AND NOT EXISTS (
         SELECT 1 FROM wa_outgoing wo 
         WHERE wo.reserva_id = r.id 
         AND wo.purpose = 'recordatorio'
         AND DATE(wo.created_at) = $2
       )`,
      [fechaTarget, hoy]
    );
    
    const reservas = reservasResult.rows;

    console.log(`📋 Encontradas ${reservas.length} reservas para revisar`);
    
    // Mostrar detalles de las reservas encontradas
    if (reservas.length > 0) {
      console.log('📝 Detalles de reservas candidatas:');
      reservas.forEach((r, index) => {
        console.log(`  ${index + 1}. ID: ${r.id}, Cliente: ${r.nombre}, Horario: ${r.horario}, Estado: ${r.estado}`);
      });
    } else {
      console.log('⚠️ No se encontraron reservas candidatas. Posibles causas:');
      console.log('  - No hay reservas para la fecha especificada');
      console.log('  - Todas las reservas ya tienen recordatorio enviado hoy');
      console.log('  - Las reservas no tienen estado "confirmada" o "pendiente"');
    }

    const enviados: Array<{ id: number; nombre: string; horario: string }> = [];
    const errores: Array<{ id: number; error: string }> = [];

    for (const reserva of reservas) {
      const minutosHastaCita = parseTimeToMinutes(reserva.horario) - ahoraMinutos;
      const ventanaRecordatorio = horasAntes * 60; // Convertir horas a minutos
      
      // Si se especifica una fecha, enviar a TODAS las reservas de ese día
      // Si no se especifica fecha (automático), usar la ventana de tiempo
      const debeEnviar = fechaEspecifica 
        ? true // Enviar a todas las reservas de la fecha especificada
        : (minutosHastaCita <= ventanaRecordatorio && minutosHastaCita > 60); // Ventana de tiempo para automático
      
      if (debeEnviar) {
        try {
          console.log(`📱 Enviando recordatorio a ${reserva.nombre} para ${reserva.horario}`);
          
          // Intentar usar plantilla si está disponible, sino usar mensaje libre
          const contentSidRecordatorio = process.env.TWILIO_CONTENT_SID_RECORDATORIO;
          let wa;
          
          if (contentSidRecordatorio) {
            // Usar Content Template (recomendado)
            console.log('📱 Usando Content Template para recordatorio:', contentSidRecordatorio);
            wa = await sendWhatsAppTemplate({
              to: reserva.telefono,
              templateName: 'reserva_recordatorio',
              language: 'es',
              contentSid: contentSidRecordatorio,
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: reserva.nombre },
                    { type: 'text', text: reserva.tratamiento },
                    { type: 'text', text: reserva.fecha },
                    { type: 'text', text: reserva.horario },
                  ],
                },
              ],
            });
          } else {
            // Fallback: mensaje libre (solo funciona dentro de ventana de 24h)
            console.log('⚠️ No hay ContentSid para recordatorio. Usando mensaje libre (solo funciona dentro de 24h)');
            const mensaje = `*Recordatorio* ⏰\n\nHola ${reserva.nombre}, te recordamos tu cita:\n\n• Tratamiento: *${reserva.tratamiento}*\n• Fecha: *${reserva.fecha}*\n• Hora: *${reserva.horario}*\n\n📍 Cra 9B #57D - 27 La Carolita, Manizales\n📞 315 727 4521\n\nPor favor confirma tu asistencia:\n\n1️⃣ Escribe *1* para confirmar\n2️⃣ Escribe *2* para cancelar\n\n_Nota: Si no respondes, tu reserva quedará confirmada por defecto._`;
            
            wa = await sendWhatsAppText({
              to: reserva.telefono,
              body: mensaje,
            });
          }
          
          // Guardar el messageSid para poder asociar la respuesta con la reserva
          const messageId = (wa?.messages?.[0]?.id || wa?.sid) as string | undefined;
          
          if (messageId) {
            await saveOutgoingMessage({ 
              waMessageId: messageId, 
              reservaId: reserva.id, 
              purpose: 'recordatorio' 
            });
            
            enviados.push({ 
              id: reserva.id, 
              nombre: reserva.nombre, 
              horario: reserva.horario 
            });
            
            console.log(`✅ Recordatorio enviado a ${reserva.nombre} (MessageSid: ${messageId})`);
          } else {
            throw new Error('No se obtuvo ID del mensaje de WhatsApp');
          }
          
        } catch (error) {
          console.error(`❌ Error enviando recordatorio a ${reserva.nombre}:`, error);
          errores.push({ 
            id: reserva.id, 
            error: error instanceof Error ? error.message : 'Error desconocido' 
          });
        }
      }
    }

    console.log(`📊 Resumen: ${enviados.length} enviados, ${errores.length} errores`);
    return { enviados, errores, total: reservas.length };

  } catch (error) {
    console.error('❌ Error en envío de recordatorios:', error);
    throw error;
  }
}

// Endpoint GET para ejecutar recordatorios manualmente
export async function GET(req: NextRequest) {
  try {
    const horas = Number(req.nextUrl.searchParams.get('horas') || '2');
    const fecha = req.nextUrl.searchParams.get('fecha'); // Formato: YYYY-MM-DD
    
    // Verificar que sea una hora válida (1-24 horas)
    if (horas < 1 || horas > 24) {
      return NextResponse.json(
        { error: 'Las horas deben estar entre 1 y 24' },
        { status: 400 }
      );
    }

    // Validar formato de fecha si se proporciona
    if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    const resultado = await enviarRecordatorios(horas, fecha || undefined);
    
    const mensaje = fecha 
      ? `Recordatorios procesados para ${fecha}`
      : `Recordatorios procesados para hoy`;
    
    return NextResponse.json({
      success: true,
      message: mensaje,
      fecha: fecha || formatDateLocal(new Date()),
      ...resultado,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en GET recordatorios:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// Endpoint POST para configurar recordatorios automáticos
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { horas = 2, habilitar = true } = body;
    
    // Aquí podrías guardar la configuración en la base de datos
    // Por ahora solo ejecutamos los recordatorios
    
    if (habilitar) {
      const resultado = await enviarRecordatorios(horas);
      
      return NextResponse.json({
        success: true,
        message: 'Recordatorios automáticos configurados y ejecutados',
        configuracion: { horas, habilitar },
        ...resultado,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Recordatorios automáticos deshabilitados',
        configuracion: { horas, habilitar }
      });
    }

  } catch (error) {
    console.error('Error en POST recordatorios:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
