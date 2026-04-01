import { NextRequest, NextResponse } from 'next/server';
import { buscarUsuario } from '@/lib/database';
import { verifyPassword, generateToken, validateUsername, validatePassword } from '@/lib/auth';

function getCookieDomain(request: NextRequest): string | undefined {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0].toLowerCase();
  if (!hostname) return undefined;

  // Compartir cookie entre www y dominio raíz para el dominio productivo
  if (hostname === 'santaarmonia.com' || hostname.endsWith('.santaarmonia.com')) {
    return '.santaarmonia.com';
  }

  // En localhost / preview / vercel.app no forzar domain
  return undefined;
}

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

    // Validar formato de username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
      return NextResponse.json(
        { error: usernameValidation.message },
        { status: 400 }
      );
    }

    // Validar formato de contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }

    console.log('Intentando login para usuario:', username);

    // Buscar el usuario en la base de datos
    const usuario = await buscarUsuario(username);
    if (!usuario) {
      console.log('Usuario no encontrado:', username);
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar la contraseña
    const passwordValid = await verifyPassword(password, usuario.password_hash);
    if (!passwordValid) {
      console.log('Contraseña incorrecta para usuario:', username);
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = generateToken(usuario.id, usuario.username);

    console.log('Login exitoso para usuario:', username);

    // Crear respuesta con el token
    const response = NextResponse.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: usuario.id,
        username: usuario.username
      }
    }, { status: 200 });

    // Establecer cookie HTTP-only con el token
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 horas en segundos
      path: '/',
      domain: getCookieDomain(request),
    });

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
