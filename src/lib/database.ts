import { Pool } from 'pg';
import {
  obtenerHorariosPorFecha,
  obtenerHorariosPorFechaConBuffer,
  obtenerSlotsOcupadosParaRango,
  normalizarDuracionSolapes,
  SLOT_MINUTOS,
} from '@/lib/horarios-agenda';

// Pool de conexiones PostgreSQL
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error('DATABASE_URL no está definida en las variables de entorno');
    }

    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : undefined,
      // Optimizado para Supabase Session Pooler en entornos serverless
      max: 1, // Solo 1 conexión por instancia serverless
      idleTimeoutMillis: 0, // Sin timeout en serverless
      connectionTimeoutMillis: 10000, // 10 segundos para conectar
      allowExitOnIdle: true, // Permite cerrar cuando no hay actividad (Node.js puede terminar)
    });

    pool.on('error', (err: Error) => {
      console.error('Error inesperado en el pool de PostgreSQL:', err);
    });
  }

  return pool;
}

// Inicializar la base de datos
export async function initDatabase() {
  console.log('Inicializando base de datos PostgreSQL');
  
  try {
    const pool = getPool();
    
    // Verificar conexión
    const client = await pool.connect();
    console.log('Conexión a PostgreSQL establecida correctamente');
    
    // Crear tablas si no existen
    await client.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        telefono VARCHAR(50) NOT NULL,
        email VARCHAR(255) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reservas (
        id SERIAL PRIMARY KEY,
        cliente_id INTEGER NOT NULL,
        tratamiento_nombre VARCHAR(255) NOT NULL,
        tratamiento_precio INTEGER NOT NULL,
        tratamiento_duracion INTEGER NOT NULL,
        tratamiento_categoria VARCHAR(100) NOT NULL,
        fecha VARCHAR(20) NOT NULL,
        horario VARCHAR(20) NOT NULL,
        estado VARCHAR(50) DEFAULT 'confirmada',
        notas TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
      );

      CREATE TABLE IF NOT EXISTS wa_outgoing (
        wa_message_id VARCHAR(255) PRIMARY KEY,
        reserva_id INTEGER NOT NULL,
        purpose VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (reserva_id) REFERENCES reservas (id)
      );

      CREATE TABLE IF NOT EXISTS feriados (
        fecha VARCHAR(20) PRIMARY KEY,
        descripcion TEXT
      );

      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tablas creadas correctamente');

    // Insertar feriados por defecto 2025 y 2026 (idempotente)
    const FERIADOS: Array<[string, string]> = [
      // 2025
      ['2025-01-01', 'Año Nuevo'],
      ['2025-01-06', 'Reyes Magos'],
      ['2025-03-24', 'San José (trasladado)'],
      ['2025-04-17', 'Jueves Santo'],
      ['2025-04-18', 'Viernes Santo'],
      ['2025-05-01', 'Día del Trabajo'],
      ['2025-06-02', 'Ascensión del Señor (trasladado)'],
      ['2025-06-23', 'Corpus Christi (trasladado)'],
      ['2025-06-30', 'Sagrado Corazón (trasladado)'],
      ['2025-07-07', 'San Pedro y San Pablo (trasladado)'],
      ['2025-07-20', 'Independencia de Colombia'],
      ['2025-08-07', 'Batalla de Boyacá'],
      ['2025-08-18', 'Asunción de la Virgen (trasladado)'],
      ['2025-10-13', 'Día de la Raza (trasladado)'],
      ['2025-11-03', 'Todos los Santos (trasladado)'],
      ['2025-11-17', 'Independencia de Cartagena (trasladado)'],
      ['2025-12-08', 'Inmaculada Concepción'],
      ['2025-12-25', 'Navidad'],
      
      // 2026
      ['2026-01-01', 'Año Nuevo'],
      ['2026-01-12', 'Reyes Magos (trasladado)'],
      ['2026-03-23', 'San José (trasladado)'],
      ['2026-04-02', 'Jueves Santo'],
      ['2026-04-03', 'Viernes Santo'],
      ['2026-05-01', 'Día del Trabajo'],
      ['2026-05-18', 'Ascensión del Señor (trasladado)'],
      ['2026-06-08', 'Corpus Christi (trasladado)'],
      ['2026-06-15', 'Sagrado Corazón (trasladado)'],
      ['2026-06-29', 'San Pedro y San Pablo (trasladado)'],
      ['2026-07-20', 'Independencia de Colombia'],
      ['2026-08-07', 'Batalla de Boyacá'],
      ['2026-08-17', 'Asunción de la Virgen (trasladado)'],
      ['2026-10-12', 'Día de la Raza (trasladado)'],
      ['2026-11-02', 'Todos los Santos (trasladado)'],
      ['2026-11-16', 'Independencia de Cartagena (trasladado)'],
      ['2026-12-08', 'Inmaculada Concepción'],
      ['2026-12-25', 'Navidad']
    ];
    
    for (const [fecha, descripcion] of FERIADOS) {
      await client.query(
        `INSERT INTO feriados (fecha, descripcion) VALUES ($1, $2) ON CONFLICT (fecha) DO NOTHING`,
        [fecha, descripcion]
      );
    }

    client.release();
    return pool;
  } catch (error) {
    console.error('Error al inicializar base de datos:', error);
    throw error;
  }
}

// Función para crear un usuario
export async function crearUsuario(username: string, passwordHash: string) {
  try {
    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO usuarios (username, password_hash) VALUES ($1, $2) RETURNING id`,
      [username, passwordHash]
    );
    return result.rows[0].id;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
}

// Función para buscar un usuario por username
export async function buscarUsuario(username: string) {
  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id, username, password_hash, created_at FROM usuarios WHERE username = $1`,
      [username]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    throw error;
  }
}

// Función para verificar si existe un usuario
export async function existeUsuario(username: string): Promise<boolean> {
  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id FROM usuarios WHERE username = $1`,
      [username]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error al verificar usuario:', error);
    return false;
  }
}

// Función para obtener horarios ocupados
export async function getHorariosOcupados(fecha: string): Promise<string[]> {
  try {
    console.log('Obteniendo horarios ocupados para:', fecha);
    const pool = getPool();
    const result = await pool.query(
      `SELECT horario FROM reservas WHERE fecha = $1 AND estado = 'confirmada'`,
      [fecha]
    );
    
    const horarios = result.rows.map((r: { horario: string }) => r.horario);
    console.log('Horarios ocupados encontrados:', horarios);
    return horarios;
  } catch (error) {
    console.error('Error al obtener horarios ocupados:', error);
    return [];
  }
}

// Función para crear una reserva
export async function crearReserva(reservaData: {
  nombre: string;
  telefono: string;
  email: string;
  tratamiento: string;
  tratamientoPrecio: number;
  tratamientoDuracion: number;
  tratamientoCategoria: string;
  fecha: string;
  horario: string;
  notas?: string;
  estado?: 'confirmada' | 'cancelada' | 'reprogramar' | 'pendiente';
}) {
  const pool = getPool();
  const client = await pool.connect();
  
  try {
    console.log('Creando reserva con datos:', reservaData);
    
    // Validar que todos los campos requeridos estén presentes
    if (!reservaData.nombre || !reservaData.telefono) {
      throw new Error(`Campos requeridos faltantes: nombre=${reservaData.nombre}, telefono=${reservaData.telefono}`);
    }
    
    await client.query('BEGIN');
    
    // Insertar cliente
    console.log('Insertando cliente...');
    const clienteResult = await client.query(
      `INSERT INTO clientes (nombre, telefono, email) VALUES ($1, $2, $3) RETURNING id`,
      [reservaData.nombre, reservaData.telefono, reservaData.email || '']
    );
    
    const clienteId = clienteResult.rows[0].id;
    console.log('Cliente creado con ID:', clienteId);
    
    // Generar created_at en zona America/Bogota
    const createdAtBogota = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());

    // Crear reserva con datos del tratamiento embebidos
    console.log('Creando reserva...');
    const estadoReserva = reservaData.estado ?? 'confirmada';

    const reservaResult = await client.query(
      `INSERT INTO reservas 
       (cliente_id, tratamiento_nombre, tratamiento_precio, tratamiento_duracion, tratamiento_categoria, fecha, horario, notas, created_at, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING id`,
      [
        clienteId, 
        reservaData.tratamiento, 
        reservaData.tratamientoPrecio, 
        reservaData.tratamientoDuracion,
        reservaData.tratamientoCategoria,
        reservaData.fecha, 
        reservaData.horario, 
        reservaData.notas || '', 
        createdAtBogota,
        estadoReserva
      ]
    );
    
    await client.query('COMMIT');
    console.log('Reserva creada con ID:', reservaResult.rows[0].id);
    
    return {
      id: reservaResult.rows[0].id,
      clienteId
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear reserva:', error);
    throw error;
  } finally {
    client.release();
  }
}

type SlotCounts = { total: number; faciales: number; corporales: number; otros: number };

/** Mapa de ocupación por slot de 30 min (misma lógica que verificarDisponibilidad). */
async function buildSlotOccupancyMap(
  fecha: string,
  excluirReservaId?: number
): Promise<Record<string, SlotCounts>> {
  const pool = getPool();
  const result =
    excluirReservaId != null
      ? await pool.query(
          `SELECT horario, tratamiento_categoria, tratamiento_duracion
           FROM reservas
           WHERE fecha = $1 AND estado = 'confirmada' AND id <> $2`,
          [fecha, excluirReservaId]
        )
      : await pool.query(
          `SELECT horario, tratamiento_categoria, tratamiento_duracion
           FROM reservas
           WHERE fecha = $1 AND estado = 'confirmada'`,
          [fecha]
        );

  const bySlot: Record<string, SlotCounts> = {};
  const inc = (slot: string, cat: string) => {
    if (!bySlot[slot]) bySlot[slot] = { total: 0, faciales: 0, corporales: 0, otros: 0 };
    bySlot[slot].total += 1;
    if (cat === 'faciales') bySlot[slot].faciales += 1;
    if (cat === 'corporales') bySlot[slot].corporales += 1;
    if (cat === 'otros') bySlot[slot].otros += 1;
  };

  for (const r of result.rows as Array<{ horario: string; tratamiento_categoria: string; tratamiento_duracion: number }>) {
    const cat = (r.tratamiento_categoria || '').toLowerCase();
    const durR = normalizarDuracionSolapes(Number(r.tratamiento_duracion));
    const slotsR = obtenerSlotsOcupadosParaRango(r.horario, durR);
    for (const s of slotsR) inc(s, cat);
  }
  return bySlot;
}

function evaluarCupoParaInicio(
  fecha: string,
  horario: string,
  tratamientoCategoria: string,
  tratamientoDuracion: number,
  bySlot: Record<string, SlotCounts>
): boolean {
  const categoria = (tratamientoCategoria || '').toLowerCase();
  const dur = normalizarDuracionSolapes(tratamientoDuracion);
  const requestedSlots = obtenerSlotsOcupadosParaRango(horario, dur);
  const slotsDia = new Set(obtenerHorariosPorFechaConBuffer(fecha, 1));
  if (!slotsDia.has(horario)) return false;
  for (const s of requestedSlots) {
    if (!slotsDia.has(s)) return false;
  }

  for (const slot of requestedSlots) {
    const current = bySlot[slot] || { total: 0, faciales: 0, corporales: 0, otros: 0 };
    const hour = Number.parseInt((slot || '00:00').split(':')[0], 10);
    const isAfternoon = hour >= 14;

    if (!isAfternoon) {
      if (current.total >= 1) return false;
      continue;
    }

    if (categoria === 'faciales') {
      if (current.faciales >= 1) return false;
      if (current.total >= 2) return false;
    } else {
      if (current.total >= 2) return false;
    }
  }

  return true;
}

// Función para verificar disponibilidad
export async function verificarDisponibilidad(
  fecha: string,
  horario: string,
  tratamientoCategoria: string,
  tratamientoDuracion: number,
  excluirReservaId?: number
): Promise<boolean> {
  try {
    console.log('Verificando disponibilidad:', fecha, horario, tratamientoCategoria, tratamientoDuracion);
    const bySlot = await buildSlotOccupancyMap(fecha, excluirReservaId);
    return evaluarCupoParaInicio(fecha, horario, tratamientoCategoria, tratamientoDuracion, bySlot);
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    return false;
  }
}

/**
 * Horas de inicio (HH:MM) no disponibles para una nueva reserva con esa categoría y duración.
 * Una sola lectura a BD; alineado con verificarDisponibilidad.
 */
export async function listarHorariosOcupadosParaCategoria(
  fecha: string,
  tratamientoCategoria: string,
  duracionMinutos: number
): Promise<string[]> {
  const bySlot = await buildSlotOccupancyMap(fecha);
  const inicios = obtenerHorariosPorFecha(fecha);
  const dur = Number(duracionMinutos);
  const durEfectiva = Number.isFinite(dur) && dur > 0 ? dur : 60;
  const ocupados: string[] = [];
  for (const h of inicios) {
    if (!evaluarCupoParaInicio(fecha, h, tratamientoCategoria, durEfectiva, bySlot)) {
      ocupados.push(h);
    }
  }
  return ocupados;
}

// Función para obtener todas las reservas
export async function getReservas(): Promise<any[]> {
  try {
    const pool = getPool();
    const result = await pool.query(`
      SELECT 
        r.id,
        r.cliente_id,
        r.fecha,
        r.horario,
        r.estado,
        r.notas,
        r.created_at,
        r.tratamiento_nombre,
        r.tratamiento_categoria,
        r.tratamiento_precio as precio,
        r.tratamiento_duracion as duracion,
        c.nombre,
        c.telefono,
        c.email
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      ORDER BY r.fecha DESC, r.horario ASC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    return [];
  }
}

// Guarda relación entre mensaje WA y la reserva
export async function saveOutgoingMessage(params: {
  waMessageId: string;
  reservaId: number;
  purpose: 'recordatorio' | 'confirmacion';
}) {
  const pool = getPool();
  await pool.query(
    `INSERT INTO wa_outgoing (wa_message_id, reserva_id, purpose) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (wa_message_id) DO NOTHING`,
    [params.waMessageId, params.reservaId, params.purpose]
  );
}

// Busca reserva por id de mensaje de WhatsApp
export async function findReservaIdByMessageId(waMessageId: string): Promise<number | null> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT reserva_id FROM wa_outgoing WHERE wa_message_id = $1`,
    [waMessageId]
  );
  return result.rows[0]?.reserva_id ?? null;
}

// Actualiza estado de una reserva
export async function updateReservaEstado(reservaId: number, nuevoEstado: 'confirmada' | 'cancelada' | 'reprogramar' | 'pendiente') {
  const pool = getPool();
  await pool.query(
    `UPDATE reservas SET estado = $1 WHERE id = $2`,
    [nuevoEstado, reservaId]
  );
}

export async function updateReservaClienteYTratamiento(params: {
  reservaId: number;
  clienteId: number;
  nombre: string;
  telefono: string;
  tratamientoNombre: string;
  tratamientoPrecio: number;
  tratamientoDuracion: number;
  tratamientoCategoria: string;
}) {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `UPDATE clientes SET nombre = $1, telefono = $2 WHERE id = $3`,
      [params.nombre.trim(), params.telefono.trim(), params.clienteId]
    );
    await client.query(
      `UPDATE reservas
       SET tratamiento_nombre = $1,
           tratamiento_precio = $2,
           tratamiento_duracion = $3,
           tratamiento_categoria = $4
       WHERE id = $5`,
      [
        params.tratamientoNombre,
        params.tratamientoPrecio,
        params.tratamientoDuracion,
        params.tratamientoCategoria.toLowerCase(),
        params.reservaId,
      ]
    );
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

// Obtiene lista de feriados cargados
export async function getFeriados(year?: number): Promise<string[]> {
  const pool = getPool();
  if (year) {
    const result = await pool.query(
      `SELECT fecha FROM feriados WHERE SUBSTRING(fecha, 1, 4) = $1`,
      [String(year)]
    );
    return result.rows.map((r: { fecha: string }) => r.fecha);
  }
  const result = await pool.query(`SELECT fecha FROM feriados`);
  return result.rows.map((r: { fecha: string }) => r.fecha);
}

// Inserta uno o varios feriados
export async function addFeriados(entries: Array<{ fecha: string; descripcion?: string }>) {
  const pool = getPool();
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    for (const e of entries) {
      await client.query(
        `INSERT INTO feriados (fecha, descripcion) VALUES ($1, $2) ON CONFLICT (fecha) DO NOTHING`,
        [e.fecha, e.descripcion || null]
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
