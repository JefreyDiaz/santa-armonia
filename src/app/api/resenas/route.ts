import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export async function POST(req: NextRequest) {
  try {
    const { nombre, servicio, calificacion, comentario } = await req.json();
    console.log('Guardando reseña:', { nombre, servicio, calificacion, comentario });
    
    const db = await initDatabase();
    
    // Crear tabla de reseñas si no existe
    await db.exec(`
      CREATE TABLE IF NOT EXISTS reseñas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        servicio TEXT NOT NULL,
        calificacion INTEGER NOT NULL,
        comentario TEXT,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    const result = await db.run(`
      INSERT INTO reseñas (nombre, servicio, calificacion, comentario)
      VALUES (?, ?, ?, ?)
    `, [nombre, servicio, calificacion, comentario]);
    
    console.log('Reseña guardada con ID:', result.lastID);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reseña guardada correctamente',
      reseñaId: result.lastID 
    });
    
  } catch (err: any) {
    console.error('Error guardando reseña:', err);
    return NextResponse.json({ 
      success: false,
      error: err.message || String(err) 
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const servicio = req.nextUrl.searchParams.get('servicio');
    
    console.log('Obteniendo reseñas, servicio:', servicio);
    
    const db = await initDatabase();
    
    // Crear tabla de reseñas si no existe
    await db.exec(`
      CREATE TABLE IF NOT EXISTS reseñas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        servicio TEXT NOT NULL,
        calificacion INTEGER NOT NULL,
        comentario TEXT,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    let reseñas;
    
    if (servicio) {
      reseñas = await db.all(`
        SELECT * FROM reseñas 
        WHERE servicio = ?
        ORDER BY fecha_creacion DESC
      `, [servicio]);
    } else {
      reseñas = await db.all(`
        SELECT * FROM reseñas 
        ORDER BY fecha_creacion DESC
      `);
    }
    
    console.log(`Reseñas encontradas: ${reseñas.length}`);
    
    return NextResponse.json({ 
      success: true, 
      reseñas 
    });
    
  } catch (err: any) {
    console.error('Error obteniendo reseñas:', err);
    return NextResponse.json({ 
      success: false,
      error: err.message || String(err) 
    }, { status: 500 });
  }
} 