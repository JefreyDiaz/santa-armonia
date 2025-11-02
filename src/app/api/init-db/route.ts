import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    console.log('🔧 Inicializando/actualizando base de datos...');
    await initDatabase();
    console.log('✅ Base de datos inicializada correctamente');
    
    return NextResponse.json({ 
      success: true,
      message: 'Base de datos inicializada. Tablas creadas y feriados insertados.'
    });
  } catch (error: any) {
    console.error('Error inicializando BD:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message || String(error)
    }, { status: 500 });
  }
}

