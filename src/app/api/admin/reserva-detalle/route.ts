import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getTratamientoById } from '@/lib/tratamientos';
import {
  initDatabase,
  updateReservaClienteYTratamiento,
  verificarDisponibilidad,
  getPool,
} from '@/lib/database';

function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = tokenFromHeader || request.cookies.get('auth-token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function PATCH(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
    }

    await initDatabase();
    const body = await request.json();
    const { reservaId, nombre, telefono, tratamientoId } = body;

    if (!reservaId || !nombre || !telefono || !tratamientoId) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos obligatorios (reserva, nombre, teléfono, tratamiento).' },
        { status: 400 }
      );
    }

    const trat = getTratamientoById(String(tratamientoId));
    if (!trat) {
      return NextResponse.json({ success: false, error: 'Tratamiento no válido.' }, { status: 400 });
    }

    const pool = getPool();
    const row = await pool.query(
      `SELECT id, cliente_id, fecha, horario, estado FROM reservas WHERE id = $1`,
      [reservaId]
    );
    const r = row.rows[0];
    if (!r) {
      return NextResponse.json({ success: false, error: 'Reserva no encontrada.' }, { status: 404 });
    }

    let precio = trat.precio;
    if (body.precioManual !== undefined && body.precioManual !== null && body.precioManual !== '') {
      const n = Number(body.precioManual);
      if (!Number.isFinite(n) || n < 0) {
        return NextResponse.json({ success: false, error: 'Precio manual no válido.' }, { status: 400 });
      }
      precio = Math.round(n);
    }

    if (r.estado === 'confirmada') {
      const ok = await verificarDisponibilidad(
        r.fecha,
        r.horario,
        trat.categoria,
        trat.duracion,
        Number(reservaId)
      );
      if (!ok) {
        return NextResponse.json(
          { success: false, error: 'Con ese tratamiento el horario ya no tiene cupo según las reglas del spa.' },
          { status: 409 }
        );
      }
    }

    await updateReservaClienteYTratamiento({
      reservaId: Number(reservaId),
      clienteId: Number(r.cliente_id),
      nombre: String(nombre),
      telefono: String(telefono),
      tratamientoNombre: trat.nombre,
      tratamientoPrecio: precio,
      tratamientoDuracion: trat.duracion,
      tratamientoCategoria: trat.categoria,
    });

    return NextResponse.json({ success: true, message: 'Reserva actualizada' });
  } catch (error) {
    console.error('Error admin PATCH reserva-detalle:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error interno' },
      { status: 500 }
    );
  }
}
