import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL no está definida');
  }
  return new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });
}

export async function POST(request: NextRequest) {
  const pool = getPool();
  try {
    const body = await request.json();
    console.log('Datos recibidos en test-db:', body);
    
    // Probar inserción directa
    const testCliente = {
      nombre: body.nombre || 'Test Cliente',
      telefono: body.telefono || '3001234567',
      email: body.email || 'test@example.com'
    };
    
    console.log('Intentando insertar cliente:', testCliente);
    
    const result = await pool.query(`
      INSERT INTO clientes (nombre, telefono, email)
      VALUES ($1, $2, $3)
      RETURNING id
    `, [testCliente.nombre, testCliente.telefono, testCliente.email]);
    
    console.log('Cliente insertado con ID:', result.rows[0].id);
    
    // NO cerrar el pool en serverless
    return NextResponse.json({
      success: true,
      message: 'Cliente insertado correctamente',
      clienteId: result.rows[0].id,
      datosInsertados: testCliente
    });
    
  } catch (error) {
    console.error('Error en test-db:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al insertar cliente',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const pool = getPool();
  try {
    console.log('Verificando fechas en la base de datos...');
    
    // Obtener todas las reservas con sus fechas
    const result = await pool.query(`
      SELECT 
        id,
        fecha,
        created_at,
        horario,
        estado
      FROM reservas 
      ORDER BY id DESC
      LIMIT 5
    `);
    
    console.log('Reservas encontradas:', result.rows);
    
    // NO cerrar el pool en serverless
    return NextResponse.json({
      success: true,
      message: 'Fechas verificadas',
      reservas: result.rows,
      fechaActual: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error verificando fechas:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al verificar fechas',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const pool = getPool();
  const client = await pool.connect();
  try {
    console.log('Creando reserva de prueba con fechas diferentes...');
    
    await client.query('BEGIN');
    
    // Limpiar reservas de prueba anteriores (cuidado en producción!)
    await client.query(`DELETE FROM reservas WHERE id > 0`);
    await client.query(`DELETE FROM clientes WHERE id > 0`);
    
    // Crear cliente de prueba
    const clienteResult = await client.query(`
      INSERT INTO clientes (nombre, telefono, email)
      VALUES ($1, $2, $3)
      RETURNING id
    `, ['Cliente Test Fechas', '3001234567', 'test@example.com']);
    
    const clienteId = clienteResult.rows[0].id;
    
    // Crear reserva con fecha programada diferente a la actual
    const fechaProgramada = '2025-01-07'; // 7 de enero
    const fechaActual = new Date().toISOString().split('T')[0]; // Fecha actual
    
    console.log('Fecha programada:', fechaProgramada);
    console.log('Fecha actual:', fechaActual);
    
    const reservaResult = await client.query(`
      INSERT INTO reservas (cliente_id, tratamiento_nombre, tratamiento_precio, tratamiento_duracion, tratamiento_categoria, fecha, horario, notas)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `, [clienteId, 'Masaje Test', 100000, 60, 'corporales', fechaProgramada, '10:00', 'Reserva de prueba']);
    
    console.log('Reserva creada con ID:', reservaResult.rows[0].id);
    
    // Verificar qué se guardó
    const reservaGuardada = await client.query(`
      SELECT id, fecha, created_at, horario
      FROM reservas 
      WHERE id = $1
    `, [reservaResult.rows[0].id]);
    
    console.log('Reserva guardada:', reservaGuardada.rows[0]);
    
    await client.query('COMMIT');
    client.release();
    // NO cerrar el pool en serverless
    
    return NextResponse.json({
      success: true,
      message: 'Reserva de prueba creada',
      reserva: reservaGuardada.rows[0],
      fechaProgramada,
      fechaActual
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    client.release();
    console.error('Error creando reserva de prueba:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al crear reserva de prueba',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
