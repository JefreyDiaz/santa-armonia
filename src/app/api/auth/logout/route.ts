import { NextRequest, NextResponse } from 'next/server';

function getCookieDomain(request: NextRequest): string | undefined {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0].toLowerCase();
  if (!hostname) return undefined;
  if (hostname === 'santaarmonia.com' || hostname.endsWith('.santaarmonia.com')) {
    return '.santaarmonia.com';
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    // Crear respuesta de logout exitoso
    const response = NextResponse.json({
      success: true,
      message: 'Logout exitoso'
    }, { status: 200 });

    // Eliminar la cookie de autenticación
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expirar inmediatamente
      path: '/',
      domain: getCookieDomain(request),
    });

    return response;

  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
