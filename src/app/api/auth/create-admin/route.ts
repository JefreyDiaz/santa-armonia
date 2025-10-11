import { NextRequest, NextResponse } from 'next/server';
import { crearUsuario, existeUsuario } from '@/lib/database';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validar que se envíen los campos requeridos
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    console.log('Verificando si el usuario ya existe:', username);
    
    // Verificar si el usuario ya existe
    const userExists = await existeUsuario(username);
    if (userExists) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    console.log('Creando usuario administrador:', username);
    
    // Hashear la contraseña
    const passwordHash = await hashPassword(password);
    
    // Crear el usuario
    const userId = await crearUsuario(username, passwordHash);

    console.log('Usuario administrador creado exitosamente:', userId);

    return NextResponse.json({
      success: true,
      message: 'Usuario administrador creado exitosamente',
      userId: userId
    }, { status: 201 });

  } catch (error) {
    console.error('Error creando usuario administrador:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
