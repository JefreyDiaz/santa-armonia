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

// Función para obtener la fecha de mañana
function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateLocal(tomorrow);
}

// Función para enviar recordatorios
// Si fechaEspecifica es undefined, busca reservas de mañana (para cron automático a las 6 PM)
async function enviarRecordatorios(horasAntes: number = 2, fechaEspecifica?: string) {
  try {
    // Si no se especifica fecha, usar mañana (para recordatorios automáticos a las 6 PM del día anterior)
    const fechaTarget = fechaEspecifica || getTomorrowDate();
    console.log(`🔄 Iniciando envío de recordatorios para reservas del ${fechaTarget}...`);
    
    await initDatabase();
    const pool = getPool();

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

    // Enviar recordatorio a TODAS las reservas del día especificado
    // (Si es automático, será mañana; si es manual, será la fecha especificada)
    for (const reserva of reservas) {
      try {
        console.log(`📱 Enviando recordatorio a ${reserva.nombre} para ${reserva.fecha} a las ${reserva.horario}`);
          
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

    console.log(`📊 Resumen: ${enviados.length} enviados, ${errores.length} errores`);
    return { enviados, errores, total: reservas.length };

  } catch (error) {
    console.error('❌ Error en envío de recordatorios:', error);
    throw error;
  }
}

// Endpoint GET para ejecutar recordatorios manualmente
// Si no se especifica fecha, busca reservas de mañana (para cron automático)
export async function GET(req: NextRequest) {
  try {
    const fecha = req.nextUrl.searchParams.get('fecha'); // Formato: YYYY-MM-DD
    
    // Validar formato de fecha si se proporciona
    if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    const fechaTarget = fecha || undefined; // Si no se especifica, usa mañana (automático)
    const resultado = await enviarRecordatorios(2, fechaTarget);
    
    const fechaReserva = fechaTarget || getTomorrowDate();
    const mensaje = `Recordatorios procesados para reservas del ${fechaReserva}`;
    
    return NextResponse.json({
      success: true,
      message: mensaje,
      fechaReserva: fechaReserva,
      fechaEnvio: formatDateLocal(new Date()),
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

// Endpoint POST para ejecutar recordatorios (compatible con Vercel Cron)
// Este endpoint se ejecuta automáticamente a las 6 PM todos los días
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { fecha } = body;
    
    // Validar formato de fecha si se proporciona
    if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Si no se especifica fecha, usa mañana (automático para cron a las 6 PM)
    const fechaTarget = fecha || undefined;
    const resultado = await enviarRecordatorios(2, fechaTarget);
    
    const fechaReserva = fechaTarget || getTomorrowDate();
    const mensaje = `Recordatorios automáticos ejecutados para reservas del ${fechaReserva}`;
    
    return NextResponse.json({
      success: true,
      message: mensaje,
      fechaReserva: fechaReserva,
      fechaEnvio: formatDateLocal(new Date()),
      ...resultado,
      timestamp: new Date().toISOString()
    });

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
