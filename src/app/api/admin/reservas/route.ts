import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { crearReserva, initDatabase, verificarDisponibilidad } from '@/lib/database';
import { duracionParaAgenda, getTratamientoById } from '@/lib/tratamientos';

function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const tokenFromHeader =
    authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = tokenFromHeader || request.cookies.get('auth-token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function POST(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
    }

    await initDatabase();

    const body = await request.json();
    const {
      nombre,
      telefono,
      tratamientoId,
      fecha,
      horario,
      notas,
      precioManual,
    } = body;

    if (!nombre || !telefono || !tratamientoId || !fecha || !horario) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos obligatorios (nombre, teléfono, tratamiento, fecha y hora).' },
        { status: 400 }
      );
    }

    const trat = getTratamientoById(String(tratamientoId));
    if (!trat) {
      return NextResponse.json(
        { success: false, error: 'Tratamiento no válido.' },
        { status: 400 }
      );
    }

    let precio = trat.precio;
    if (precioManual !== undefined && precioManual !== null && precioManual !== '') {
      const n = Number(precioManual);
      if (!Number.isFinite(n) || n < 0) {
        return NextResponse.json(
          { success: false, error: 'El precio manual no es válido.' },
          { status: 400 }
        );
      }
      precio = Math.round(n);
    }

  // En agenda siempre se guarda como "confirmada" y siempre valida cupos
  const durAgenda = duracionParaAgenda(trat);
  const ok = await verificarDisponibilidad(fecha, horario, trat.categoria, durAgenda);
  if (!ok) {
    return NextResponse.json(
      {
        success: false,
        error: 'Ese horario no tiene cupo según las reglas del spa.',
      },
      { status: 409 }
    );
  }

    const reserva = await crearReserva({
      nombre: String(nombre).trim(),
      telefono: String(telefono).trim(),
    email: '',
      tratamiento: trat.nombre,
      tratamientoPrecio: precio,
      tratamientoDuracion: durAgenda,
      tratamientoCategoria: trat.categoria,
      fecha: String(fecha),
      horario: String(horario),
      notas: typeof notas === 'string' ? notas : '',
    estado: 'confirmada',
    });

    return NextResponse.json({
      success: true,
      reservaId: reserva.id,
      message: 'Reserva registrada en la agenda',
    });
  } catch (error) {
    console.error('Error admin crear reserva:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error interno',
      },
      { status: 500 }
    );
  }
}
