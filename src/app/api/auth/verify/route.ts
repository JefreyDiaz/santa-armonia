import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Extraer el token del header Authorization o de las cookies
    const authHeader = request.headers.get('authorization');
    const tokenFromHeader = extractTokenFromHeader(authHeader);
    const tokenFromCookie = request.cookies.get('auth-token')?.value;

    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticación no encontrado' },
        { status: 401 }
      );
    }

    // Verificar el token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    // Token válido
    return NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        username: payload.username
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error al verificar token:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
