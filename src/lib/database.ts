import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Configuración de la base de datos SQLite
const DB_PATH = path.join(process.cwd(), 'spa_reservas.db');

// Inicializar la base de datos
export async function initDatabase() {
  console.log('Inicializando base de datos en:', DB_PATH);
  
  try {
    const db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database
    });

    console.log('Base de datos abierta correctamente');
      
      // Crear tablas si no existen
    await db.exec(`
      CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          telefono TEXT NOT NULL,
        email TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tratamientos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
        precio INTEGER NOT NULL,
        duracion INTEGER NOT NULL,
        descripcion TEXT,
        categoria TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS reservas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        tratamiento_id INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        horario TEXT NOT NULL,
        estado TEXT DEFAULT 'confirmada',
        notas TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cliente_id) REFERENCES clientes (id),
        FOREIGN KEY (tratamiento_id) REFERENCES tratamientos (id)
      );

      -- Mapeo de mensajes salientes de WhatsApp a reservas para rastrear respuestas
      CREATE TABLE IF NOT EXISTS wa_outgoing (
        wa_message_id TEXT PRIMARY KEY,
        reserva_id INTEGER NOT NULL,
        purpose TEXT NOT NULL, -- ej: 'recordatorio', 'confirmacion'
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (reserva_id) REFERENCES reservas (id)
      );

      -- Feriados (no laborales). Formato fecha: YYYY-MM-DD
      CREATE TABLE IF NOT EXISTS feriados (
        fecha TEXT PRIMARY KEY,
        descripcion TEXT
      );

      -- Usuarios para autenticación del admin
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tablas creadas correctamente');

    // Insertar/asegurar tratamientos por defecto (idempotente)
    const DEFAULTS = [
      // Tratamientos Corporales
      ['Masajes Reductores', 900000, 900, 'Tratamiento especializado para reducir grasa corporal y mejorar la silueta mediante técnicas avanzadas de masaje y aparatología. Paquete de 15 sesiones.', 'corporales'],
      ['Masajes Moldeadores', 750000, 720, 'Tratamiento especializado para moldear y tonificar el cuerpo, ideal para personas con poco tejido graso que buscan definir su figura. Paquete de 12 sesiones.', 'corporales'],
      ['Levantamiento de Glúteos', 950000, 600, 'Tratamiento completo especializado para levantar, tonificar y dar forma a los glúteos mediante técnicas avanzadas. Paquete de 10 sesiones.', 'corporales'],
      ['Tratamiento Anticelulitis', 800000, 600, 'Tratamiento especializado para combatir la celulitis mediante técnicas de drenaje linfático y electroestimulación. Paquete de 10 sesiones.', 'corporales'],
      ['Masaje Relajante', 120000, 60, 'Masaje suave y relajante diseñado para reducir el estrés y promover la relajación profunda. Incluye aromaterapia, musicoterapia, piedras volcánicas y masaje manual.', 'corporales'],
      ['Masaje Descontracturante', 120000, 60, 'Masaje profundo especializado para liberar tensiones y contracturas musculares. Incluye vacunoterapia, masajeador eléctrico y masaje manual con presión.', 'corporales'],
      ['Cauterización de verrugas y lunares', 0, 30, 'Tratamiento especializado para la eliminación segura de verrugas y lunares mediante técnicas de cauterización.', 'corporales'],
      ['Depilación con cera facial', 0, 30, 'Servicio de depilación facial con cera para una piel suave y sin vello.', 'corporales'],
      ['Lipo papada y corporal', 0, 60, 'Tratamiento de liposucción de papada y corporal a través de quemadores de grasa.', 'corporales'],
      ['SUERO TERAPIA', 0, 45, 'Cada suero es indicado para una necesidad específica. Tipos: Reductor, Antiedad, Inmunológico, Desintoxicante, Energéticos, Hidratante, Vitalidad, entre otros.', 'corporales'],
      
      // Tratamientos Faciales
      ['LIMPIEZA FACIAL PROFUNDA', 120000, 60, 'Tratamiento completo de limpieza facial que elimina impurezas y células muertas para una piel radiante y saludable', 'faciales'],
      ['PLASMA RICO EN PLAQUETAS', 120000, 60, 'Tratamiento terapéutico derivado de la sangre que estimula la regeneración celular y mejora la textura de la piel', 'faciales'],
      ['TOXINA BOTULÍNICA (BOTOX)', 0, 60, 'La toxina botulínica es una sustancia derivada de una bacteria llamada Clostridium botulinum, conocida por detener la movilidad de los músculos faciales de manera temporal', 'faciales'],
      ['REJUVENECIMIENTO FACIAL EN 3D', 0, 90, 'Es una combinación de diferentes procedimientos que ayudarán a devolver la juventud en tu rostro', 'faciales'],
      ['TRATAMIENTO DESPIGMENTANTE (ANTI MANCHAS)', 120000, 45, 'Tratamiento basado en aplicación de diferentes principios activos para mejorar la apariencia de los melasmas y prevenir su aparición', 'faciales'],
      ['TRATAMIENTO ANTI ACNÉ', 110000, 45, 'Tratamiento basado en la aplicación de diferentes principios activos para mejorar los diferentes tipos de acné y prevenir su proliferación', 'faciales'],
      ['TRATAMIENTO ANTI EDAD', 130000, 45, 'Tratamiento basado en la aplicación de diferentes principios activos indicados para mejorar los signos de envejecimiento de la piel', 'faciales'],
      ['RELLENO DE LABIOS CON ÁCIDO HIALURÓNICO', 750000, 60, 'Procedimiento no quirúrgico que se realiza mediante la inyección de ácido hialurónico, sustancia segura y reabsorbible', 'faciales'],
      ['DEPILACIÓN CON CERA - CEJAS', 15000, 15, 'Depilación con cera especializada para cejas, definiendo la forma perfecta para tu rostro', 'faciales'],
      ['DEPILACIÓN CON CERA - BIGOTE', 7000, 10, 'Depilación con cera para el área del bigote, dejando la piel suave y sin vello', 'faciales'],
      ['DEPILACIÓN CON CERA - NARIZ', 10000, 10, 'Depilación con cera para el área de la nariz, eliminando vello no deseado', 'faciales'],
      ['DEPILACIÓN CON CERA - MENTÓN', 8000, 10, 'Depilación con cera para el área del mentón, dejando la piel suave y definida', 'faciales'],
      ['DEPILACIÓN CON CERA - ROSTRO', 25000, 30, 'Depilación completa del rostro con cera, eliminando todo el vello facial no deseado', 'faciales']
    ] as const;

    for (const [nombre, precio, duracion, descripcion, categoria] of DEFAULTS) {
      await db.run(
        `INSERT INTO tratamientos (nombre, precio, duracion, descripcion, categoria)
         SELECT ?, ?, ?, ?, ?
         WHERE NOT EXISTS (SELECT 1 FROM tratamientos WHERE UPPER(nombre) = UPPER(?))`,
        [nombre, precio, duracion, descripcion, categoria, nombre]
      );
    }
    const tratamientosCount = await db.get('SELECT COUNT(*) as count FROM tratamientos');
    console.log('Tratamientos existentes:', tratamientosCount.count);

    // Insertar feriados por defecto 2025 (idempotente)
    const FERIADOS_2025: Array<[string, string]> = [
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
      ['2025-12-25', 'Navidad']
    ];
    for (const [fecha, descripcion] of FERIADOS_2025) {
      await db.run(
        `INSERT OR IGNORE INTO feriados (fecha, descripcion) VALUES (?, ?)`,
        [fecha, descripcion]
      );
    }

    return db;
  } catch (error) {
    console.error('Error al inicializar base de datos:', error);
    throw error;
  }
}

// Función para crear un usuario
export async function crearUsuario(username: string, passwordHash: string) {
  try {
    const db = await initDatabase();
    const result = await db.run(`
      INSERT INTO usuarios (username, password_hash)
      VALUES (?, ?)
    `, [username, passwordHash]);
    return result.lastID;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
}

// Función para buscar un usuario por username
export async function buscarUsuario(username: string) {
  try {
    const db = await initDatabase();
    const usuario = await db.get(`
      SELECT id, username, password_hash, created_at
      FROM usuarios
      WHERE username = ?
    `, [username]);
    return usuario;
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    throw error;
  }
}

// Función para verificar si existe un usuario
export async function existeUsuario(username: string): Promise<boolean> {
  try {
    const db = await initDatabase();
    const usuario = await db.get(`
      SELECT id FROM usuarios WHERE username = ?
    `, [username]);
    return !!usuario;
  } catch (error) {
    console.error('Error al verificar usuario:', error);
    return false;
  }
}

// Función para obtener horarios ocupados
export async function getHorariosOcupados(fecha: string): Promise<string[]> {
  try {
    console.log('Obteniendo horarios ocupados para:', fecha);
    const db = await initDatabase();
    const reservas = await db.all(`
      SELECT horario 
      FROM reservas 
      WHERE fecha = ? AND estado = 'confirmada'
    `, [fecha]);
    
    const horarios = reservas.map(r => r.horario);
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
  fecha: string;
  horario: string;
  notas?: string;
}) {
  try {
    console.log('Creando reserva con datos:', reservaData);
    
    // Validar que todos los campos requeridos estén presentes
    if (!reservaData.nombre || !reservaData.telefono) {
      throw new Error(`Campos requeridos faltantes: nombre=${reservaData.nombre}, telefono=${reservaData.telefono}`);
    }
    
    const db = await initDatabase();
    
    // Insertar cliente
    console.log('Insertando cliente...');
    console.log('Datos del cliente:', {
      nombre: reservaData.nombre,
      telefono: reservaData.telefono,
      email: reservaData.email || ''
    });
    
    const clienteResult = await db.run(`
      INSERT INTO clientes (nombre, telefono, email)
      VALUES (?, ?, ?)
    `, [reservaData.nombre, reservaData.telefono, reservaData.email || '']);
    
    const clienteId = clienteResult.lastID;
    console.log('Cliente creado con ID:', clienteId);
    
    // Obtener tratamiento_id
    console.log('Buscando tratamiento:', reservaData.tratamiento);
    let tratamientoRow: { id: number } | undefined = await db.get(`
      SELECT id FROM tratamientos 
      WHERE UPPER(TRIM(nombre)) = UPPER(TRIM(?))
    `, [reservaData.tratamiento]);
    
    if (!tratamientoRow) {
      console.error('Tratamiento no encontrado con coincidencia exacta. Intentando búsqueda por LIKE:', reservaData.tratamiento);
      // 1) Intento con patrón compacto (ignora espacios)
      const compactSql = `SELECT id FROM tratamientos
        WHERE REPLACE(UPPER(TRIM(nombre)), ' ', '') = REPLACE(UPPER(TRIM(?)), ' ', '')
        LIMIT 1`;
      let alt: { id: number } | undefined = await db.get(compactSql, [reservaData.tratamiento]);
      if (!alt?.id) {
        // 2) Intento con patrón flexible: %PALABRA%PALABRA%
        const pattern = `%${reservaData.tratamiento.replace(/\s+/g, '%').toUpperCase()}%`;
        alt = await db.get(
          `SELECT id FROM tratamientos WHERE UPPER(nombre) LIKE ? LIMIT 1`,
          [pattern]
        );
      }
      if (!alt?.id) {
        // 3) Intento tokenizado: cada palabra debe existir en el nombre
        const tokens = reservaData.tratamiento.toUpperCase().split(/\s+/).filter(Boolean);
        const conditions = tokens.map(() => `UPPER(nombre) LIKE ?`).join(' AND ');
        const params = tokens.map(t => `%${t}%`);
        alt = await db.get(`SELECT id FROM tratamientos WHERE ${conditions} LIMIT 1`, params);
      }
      if (alt?.id) {
        console.log('Tratamiento localizado mediante búsqueda flexible con ID:', alt.id);
        tratamientoRow = alt;
      } else {
        throw new Error('Tratamiento no encontrado');
      }
    }
    
    console.log('Tratamiento encontrado con ID:', tratamientoRow.id);
    
    // Crear reserva
    console.log('Creando reserva...');
    console.log('Fecha programada:', reservaData.fecha);
    console.log('Fecha actual:', new Date().toISOString());

    // Generar created_at en zona America/Bogota (estable para prod y local)
    const createdAtBogota = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date()); // Formato: YYYY-MM-DD HH:mm:ss

    const reservaResult = await db.run(`
      INSERT INTO reservas (cliente_id, tratamiento_id, fecha, horario, notas, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [clienteId, tratamientoRow.id, reservaData.fecha, reservaData.horario, reservaData.notas || '', createdAtBogota]);
    
    console.log('Reserva creada con ID:', reservaResult.lastID);
    
    return {
      id: reservaResult.lastID,
      clienteId,
      tratamientoId: tratamientoRow.id
    };
  } catch (error) {
    console.error('Error al crear reserva:', error);
    throw error;
  }
}

// Función para verificar disponibilidad
export async function verificarDisponibilidad(
  fecha: string,
  horario: string,
  tratamientoNombre: string
): Promise<boolean> {
  try {
    console.log('Verificando disponibilidad:', fecha, horario);
    const db = await initDatabase();

    // Localizar categoría del tratamiento solicitado (búsqueda robusta)
    let tratamientoRow: { id: number; categoria: string } | undefined = await db.get(
      `SELECT id, categoria FROM tratamientos 
       WHERE UPPER(TRIM(nombre)) = UPPER(TRIM(?))`,
      [tratamientoNombre]
    );

    if (!tratamientoRow) {
      console.warn('Tratamiento no encontrado por coincidencia exacta al verificar disponibilidad, intentando alternativas');
      const compactSql = `SELECT id, categoria FROM tratamientos
        WHERE REPLACE(UPPER(TRIM(nombre)), ' ', '') = REPLACE(UPPER(TRIM(?)), ' ', '')
        LIMIT 1`;
      let alt: { id: number; categoria: string } | undefined = await db.get(compactSql, [tratamientoNombre]);
      if (!alt?.id) {
        const pattern = `%${tratamientoNombre.replace(/\s+/g, '%').toUpperCase()}%`;
        alt = await db.get(
          `SELECT id, categoria FROM tratamientos WHERE UPPER(nombre) LIKE ? LIMIT 1`,
          [pattern]
        );
      }
      if (!alt?.id) {
        const tokens = tratamientoNombre.toUpperCase().split(/\s+/).filter(Boolean);
        const conditions = tokens.map(() => `UPPER(nombre) LIKE ?`).join(' AND ');
        const params = tokens.map(t => `%${t}%`);
        alt = await db.get(`SELECT id, categoria FROM tratamientos WHERE ${conditions} LIMIT 1`, params);
      }
      if (alt?.id) {
        tratamientoRow = alt;
      } else {
        // Si no logramos identificar el tratamiento, por seguridad negar para evitar sobreventa
        console.warn('No se pudo identificar el tratamiento al verificar disponibilidad. Se asume no disponible.');
        return false;
      }
    }

    const categoria = (tratamientoRow.categoria || '').toLowerCase();

    // Contabilizar reservas existentes en el mismo slot
    const counts: any = await db.get(
      `SELECT 
         COUNT(*) as total,
         SUM(CASE WHEN t.categoria = 'faciales' THEN 1 ELSE 0 END) as faciales
       FROM reservas r
       JOIN tratamientos t ON r.tratamiento_id = t.id
       WHERE r.fecha = ? AND r.horario = ? AND r.estado = 'confirmada'`,
      [fecha, horario]
    );

    const total = Number(counts?.total ?? 0);
    const faciales = Number(counts?.faciales ?? 0);

    const hour = parseInt((horario || '00:00').split(':')[0], 10);
    const isAfternoon = hour >= 14;

    if (!isAfternoon) {
      // Mañana: 1 cita total por horario (facial o masajes)
      return total < 1;
    }

    // Tarde: capacidad 2 total, no 2 faciales
    if (categoria === 'faciales') {
      // Ya existe al menos un facial o ya se completaron 2 citas
      if (faciales >= 1) return false;
      return total < 2;
    }
    // Masajes (corporal): solo validar máximo 2 totales
    return total < 2;
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    // En caso de error, ser conservadores: evitar sobreventa
    return false;
  }
}

// Función para obtener todas las reservas
export async function getReservas(): Promise<any[]> {
  try {
    const db = await initDatabase();
    return await db.all(`
      SELECT 
        r.id,
        r.fecha,
        r.horario,
        r.estado,
        r.notas,
        r.created_at,
        c.nombre,
        c.telefono,
        c.email,
        t.nombre as tratamiento_nombre,
        t.precio,
        t.duracion
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      JOIN tratamientos t ON r.tratamiento_id = t.id
      ORDER BY r.fecha DESC, r.horario ASC
    `);
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
  const db = await initDatabase();
  await db.run(
    `INSERT OR IGNORE INTO wa_outgoing (wa_message_id, reserva_id, purpose) VALUES (?, ?, ?)`,
    [params.waMessageId, params.reservaId, params.purpose]
  );
}

// Busca reserva por id de mensaje de WhatsApp
export async function findReservaIdByMessageId(waMessageId: string): Promise<number | null> {
  const db = await initDatabase();
  const row = await db.get(`SELECT reserva_id FROM wa_outgoing WHERE wa_message_id = ?`, [waMessageId]);
  return row?.reserva_id ?? null;
}

// Actualiza estado de una reserva
export async function updateReservaEstado(reservaId: number, nuevoEstado: 'confirmada' | 'cancelada' | 'reprogramar' | 'pendiente') {
  const db = await initDatabase();
  await db.run(`UPDATE reservas SET estado = ? WHERE id = ?`, [nuevoEstado, reservaId]);
}

// Obtiene lista de feriados cargados
export async function getFeriados(year?: number): Promise<string[]> {
  const db = await initDatabase();
  if (year) {
    const rows = await db.all(`SELECT fecha FROM feriados WHERE substr(fecha,1,4) = ?`, [String(year)]);
    return rows.map((r: any) => r.fecha);
  }
  const rows = await db.all(`SELECT fecha FROM feriados`);
  return rows.map((r: any) => r.fecha);
}

// Inserta uno o varios feriados
export async function addFeriados(entries: Array<{ fecha: string; descripcion?: string }>) {
  const db = await initDatabase();
  const stmt = await db.prepare(`INSERT OR IGNORE INTO feriados (fecha, descripcion) VALUES (?, ?)`);
  try {
    for (const e of entries) {
      await stmt.run(e.fecha, e.descripcion || null);
    }
  } finally {
    await stmt.finalize();
  }
}