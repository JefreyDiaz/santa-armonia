import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Datos recibidos en test-db:', body);
    
    const db = await initDatabase();
    
    // Probar inserción directa
    const testCliente = {
      nombre: body.nombre || 'Test Cliente',
      telefono: body.telefono || '3001234567',
      email: body.email || 'test@example.com'
    };
    
    console.log('Intentando insertar cliente:', testCliente);
    
    const result = await db.run(`
      INSERT INTO clientes (nombre, telefono, email)
      VALUES (?, ?, ?)
    `, [testCliente.nombre, testCliente.telefono, testCliente.email]);
    
    console.log('Cliente insertado con ID:', result.lastID);
    
    return NextResponse.json({
      success: true,
      message: 'Cliente insertado correctamente',
      clienteId: result.lastID,
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
  try {
    console.log('Verificando fechas en la base de datos...');
    
    const db = await initDatabase();
    
    // Obtener todas las reservas con sus fechas
    const reservas = await db.all(`
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
    
    console.log('Reservas encontradas:', reservas);
    
    return NextResponse.json({
      success: true,
      message: 'Fechas verificadas',
      reservas: reservas,
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
  try {
    console.log('Creando reserva de prueba con fechas diferentes...');
    
    const db = await initDatabase();
    
    // Limpiar reservas de prueba anteriores
    await db.run(`DELETE FROM reservas WHERE id > 0`);
    await db.run(`DELETE FROM clientes WHERE id > 0`);
    
    // Crear cliente de prueba
    const clienteResult = await db.run(`
      INSERT INTO clientes (nombre, telefono, email)
      VALUES (?, ?, ?)
    `, ['Cliente Test Fechas', '3001234567', 'test@example.com']);
    
    const clienteId = clienteResult.lastID;
    
    // Obtener un tratamiento
    const tratamiento = await db.get(`SELECT id FROM tratamientos LIMIT 1`);
    
    // Crear reserva con fecha programada diferente a la actual
    const fechaProgramada = '2025-01-07'; // 7 de enero
    const fechaActual = new Date().toISOString().split('T')[0]; // Fecha actual
    
    console.log('Fecha programada:', fechaProgramada);
    console.log('Fecha actual:', fechaActual);
    
    const reservaResult = await db.run(`
      INSERT INTO reservas (cliente_id, tratamiento_id, fecha, horario, notas)
      VALUES (?, ?, ?, ?, ?)
    `, [clienteId, tratamiento.id, fechaProgramada, '10:00', 'Reserva de prueba']);
    
    console.log('Reserva creada con ID:', reservaResult.lastID);
    
    // Verificar qué se guardó
    const reservaGuardada = await db.get(`
      SELECT id, fecha, created_at, horario
      FROM reservas 
      WHERE id = ?
    `, [reservaResult.lastID]);
    
    console.log('Reserva guardada:', reservaGuardada);
    
    return NextResponse.json({
      success: true,
      message: 'Reserva de prueba creada',
      reserva: reservaGuardada,
      fechaProgramada,
      fechaActual
    });
    
  } catch (error) {
    console.error('Error creando reserva de prueba:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al crear reserva de prueba',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
} 