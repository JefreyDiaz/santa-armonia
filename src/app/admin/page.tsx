'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TRATAMIENTOS,
  ETIQUETA_CATEGORIA,
  textoPrecioCatalogo,
  getTratamientoById,
  type CategoriaTratamiento,
} from '@/lib/tratamientos';
import { obtenerHorariosPorFecha } from '@/lib/horarios-agenda';

// Configuración para evitar prerendering
export const dynamic = 'force-dynamic';

interface Reserva {
  id: number;
  fecha: string;
  horario: string;
  estado: string;
  notas?: string;
  nombre: string;
  telefono: string;
  email: string;
  tratamiento_nombre: string;
  precio: number;
  duracion: number;
  created_at: string;
}

export default function AdminPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const [vistaAdmin, setVistaAdmin] = useState<'agenda' | 'listado'>('agenda');
  const [fechaAgenda, setFechaAgenda] = useState('');
  const [modalNuevaReserva, setModalNuevaReserva] = useState(false);
  const [guardandoReserva, setGuardandoReserva] = useState(false);
  const [horariosOcupadosModal, setHorariosOcupadosModal] = useState<string[]>([]);
  const [mensajeModalNueva, setMensajeModalNueva] = useState('');
  const [formNueva, setFormNueva] = useState({
    nombre: '',
    telefono: '',
    email: '',
    categoria: 'otros' as CategoriaTratamiento,
    tratamientoId: '',
    fecha: '',
    horario: '',
    estado: 'confirmada' as 'confirmada' | 'pendiente',
    notas: '',
    precioManual: '',
    omitirDisponibilidad: false,
  });
  const router = useRouter();

  useEffect(() => {
    verifyAuth();
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaHoy = `${año}-${mes}-${dia}`;
    setFiltroFecha(fechaHoy);
    setFechaAgenda(fechaHoy);
  }, []);

  // Cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuUsuarioAbierto) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-user-menu]')) {
          cerrarMenuUsuario();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuUsuarioAbierto]);

  useEffect(() => {
    if (!modalNuevaReserva || !formNueva.fecha || !formNueva.categoria) {
      setHorariosOcupadosModal([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/horarios?fecha=${encodeURIComponent(formNueva.fecha)}&categoria=${encodeURIComponent(formNueva.categoria)}`
        );
        const data = await res.json();
        if (!cancelled) setHorariosOcupadosModal(data.horariosOcupados || []);
      } catch {
        if (!cancelled) setHorariosOcupadosModal([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [modalNuevaReserva, formNueva.fecha, formNueva.categoria]);

  async function verifyAuth() {
    try {
      setAuthLoading(true);
      const response = await fetch('/api/auth/verify');
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        fetchReservas(); // Solo cargar reservas si está autenticado
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      router.push('/login');
    } finally {
      setAuthLoading(false);
    }
  }

  async function fetchReservas() {
    try {
      setLoading(true);
      const res = await fetch('/api/reservas');
      const data = await res.json();
      
      if (data.success) {
        setReservas(data.reservas);
        console.log('Reservas cargadas:', data.reservas);
      } else {
        setError(data.error || 'Error cargando reservas');
      }
    } catch (err: any) {
      console.error('Error fetching reservas:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  async function agregarFeriadoInteractivo(fechaInicial?: string) {
    try {
      const fecha =
        fechaInicial?.trim() ||
        window.prompt('Ingresa la fecha a deshabilitar (YYYY-MM-DD):');
      if (!fecha) return;
      const valida = /^\d{4}-\d{2}-\d{2}$/.test(fecha);
      if (!valida) {
        alert('Formato inválido. Usa YYYY-MM-DD.');
        return;
      }
      const descripcion = window.prompt('Descripción (opcional):') || '';
      const res = await fetch('/api/feriados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feriados: [{ fecha, descripcion }] })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Error agregando feriado');
      }
      alert('Fecha deshabilitada correctamente. Actualiza el calendario para ver el cambio.');
    } catch (e: any) {
      console.error('Error agregando feriado:', e);
      alert('No se pudo deshabilitar la fecha');
    }
  }

  async function updateEstado(id: number, nuevoEstado: string) {
    try {
      console.log('Actualizando estado:', { id, nuevoEstado });
      const res = await fetch('/api/reservas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado: nuevoEstado }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        console.log('Estado actualizado correctamente');
        fetchReservas(); // Recargar la lista
      } else {
        console.error('Error actualizando estado:', data.error);
        setError(data.error || 'Error actualizando estado');
      }
    } catch (err: any) {
      console.error('Error actualizando estado:', err);
      setError('Error de conexión al actualizar estado');
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      
      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Error en logout');
        router.push('/login'); // Redirigir de todas formas
      }
    } catch (error) {
      console.error('Error en logout:', error);
      router.push('/login'); // Redirigir de todas formas
    }
  }

  const abrirModal = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setReservaSeleccionada(null);
  };

  const toggleMenuUsuario = () => {
    setMenuUsuarioAbierto(!menuUsuarioAbierto);
  };

  const cerrarMenuUsuario = () => {
    setMenuUsuarioAbierto(false);
  };

  const deshabilitarFecha = () => {
    const fecha = prompt('Ingresa la fecha a deshabilitar (YYYY-MM-DD):');
    if (fecha) {
      agregarFeriadoInteractivo(fecha);
    }
    cerrarMenuUsuario();
  };

  const abrirModalNueva = (fecha?: string, horario?: string) => {
    setMensajeModalNueva('');
    const f = fecha || fechaAgenda;
    setFormNueva({
      nombre: '',
      telefono: '',
      email: '',
      categoria: 'otros',
      tratamientoId: '',
      fecha: f,
      horario: horario || '',
      estado: 'confirmada',
      notas: '',
      precioManual: '',
      omitirDisponibilidad: false,
    });
    setModalNuevaReserva(true);
  };

  const cerrarModalNueva = () => {
    setModalNuevaReserva(false);
    setMensajeModalNueva('');
  };

  async function guardarReservaDesdeAgenda() {
    setMensajeModalNueva('');
    if (!formNueva.nombre.trim() || !formNueva.telefono.trim()) {
      setMensajeModalNueva('Nombre y teléfono son obligatorios.');
      return;
    }
    if (!formNueva.tratamientoId || !formNueva.fecha || !formNueva.horario) {
      setMensajeModalNueva('Elige tratamiento, fecha y hora.');
      return;
    }
    const trat = getTratamientoById(formNueva.tratamientoId);
    if (!trat) {
      setMensajeModalNueva('Tratamiento no válido.');
      return;
    }
    const necesitaPrecioManual = trat.precioEspecial != null || trat.precio === 0;
    let precioManual: number | undefined;
    if (necesitaPrecioManual) {
      const raw = formNueva.precioManual.trim();
      if (raw === '') {
        precioManual = 0;
      } else {
        const n = Number(raw);
        if (!Number.isFinite(n) || n < 0) {
          setMensajeModalNueva('Indica un precio válido (o 0).');
          return;
        }
        precioManual = Math.round(n);
      }
    }

    setGuardandoReserva(true);
    try {
      const res = await fetch('/api/admin/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nombre: formNueva.nombre.trim(),
          telefono: formNueva.telefono.trim(),
          email: formNueva.email.trim(),
          tratamientoId: formNueva.tratamientoId,
          fecha: formNueva.fecha,
          horario: formNueva.horario,
          estado: formNueva.estado,
          notas: formNueva.notas,
          precioManual: necesitaPrecioManual ? precioManual : undefined,
          omitirDisponibilidad: formNueva.omitirDisponibilidad,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setMensajeModalNueva(data.error || 'No se pudo guardar.');
        return;
      }
      await fetchReservas();
      cerrarModalNueva();
    } catch {
      setMensajeModalNueva('Error de conexión.');
    } finally {
      setGuardandoReserva(false);
    }
  }

  const reservasFiltradas = reservas.filter(reserva => {
    const cumpleFecha = !filtroFecha || reserva.fecha === filtroFecha;
    const cumpleEstado = !filtroEstado || reserva.estado === filtroEstado;
    return cumpleFecha && cumpleEstado;
  });

  // Si no hay filtros, ordenar por las más recientes (created_at DESC)
  const reservasOrdenadas = (!filtroFecha && !filtroEstado)
    ? [...reservasFiltradas].sort((a, b) => {
        const ta = new Date(a.created_at).getTime();
        const tb = new Date(b.created_at).getTime();
        return tb - ta;
      })
    : reservasFiltradas;

  const reservasAgendaDia = fechaAgenda
    ? reservas.filter((r) => r.fecha === fechaAgenda)
    : [];
  const slotsAgenda = fechaAgenda ? obtenerHorariosPorFecha(fechaAgenda) : [];
  const porHorario: Record<string, Reserva[]> = {};
  reservasAgendaDia.forEach((r) => {
    if (!porHorario[r.horario]) porHorario[r.horario] = [];
    porHorario[r.horario].push(r);
  });
  const slotsManana = slotsAgenda.filter((s) => Number.parseInt(s.split(':')[0], 10) < 14);
  const slotsTarde = slotsAgenda.filter((s) => Number.parseInt(s.split(':')[0], 10) >= 14);

  const tratamientoFormSeleccionado = formNueva.tratamientoId
    ? getTratamientoById(formNueva.tratamientoId)
    : null;
  const horariosSelectModal = formNueva.fecha
    ? obtenerHorariosPorFecha(formNueva.fecha)
    : [];

  if (authLoading) {
    return (
      <div style={{
        padding: '50px',
        background: 'var(--spa-gradient-soft)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: 'var(--spa-border-radius)',
          boxShadow: 'var(--spa-shadow-medium)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '15px' }}>🔐</div>
          <div style={{ color: 'var(--spa-text-primary)' }}>Verificando autenticación...</div>
        </div>
      </div>
    );
  }

  if (loading) {
  return (
      <div style={{
        padding: '50px',
        background: 'var(--spa-gradient-soft)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: 'var(--spa-border-radius)',
          boxShadow: 'var(--spa-shadow-medium)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '15px' }}>⏳</div>
          <div style={{ color: 'var(--spa-text-primary)' }}>Cargando reservas...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '50px',
        background: 'var(--spa-gradient-soft)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: 'var(--spa-border-radius)',
          boxShadow: 'var(--spa-shadow-medium)',
          textAlign: 'center',
          border: '2px solid var(--spa-error)'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--spa-error)' }}>❌</div>
          <div style={{ color: 'var(--spa-error)' }}>{error}</div>
        <button 
          onClick={fetchReservas}
          style={{
              marginTop: '15px',
              background: 'var(--spa-gradient-primary)',
            color: 'white',
            border: 'none',
              padding: '10px 20px',
              borderRadius: 'var(--spa-border-radius-small)',
            cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 'bold'
          }}
        >
            Reintentar
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container" style={{
      padding: '30px',
      background: 'var(--spa-gradient-soft)',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: 'var(--spa-border-radius)',
        boxShadow: 'var(--spa-shadow-medium)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div className="admin-header" style={{
          background: 'var(--spa-gradient-primary)',
          padding: '25px 30px',
          color: 'white'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: '28px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                🧘‍♀️ Panel de Administración - Spa Santa Armonía
              </h1>
              <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
                Agenda digital, listado de reservas y estado de cada cita
              </p>
            </div>
            {user && (
              <div className="user-menu-wrapper">
                <div 
                  data-user-menu
                  className="user-menu-container"
                >
                  {/* Contenedor del icono y nombre */}
                  <div className="user-info-section">
                    <div 
                      onClick={toggleMenuUsuario}
                      className="user-avatar"
                    >
                      👤
                    </div>
                    <div className="username-display">
                      {user.username}
                    </div>
                  </div>

                  {/* Menú desplegable */}
                  {menuUsuarioAbierto && (
                    <div className="user-dropdown-menu">
                      <div className="dropdown-content">
                        <button
                          onClick={() => {
                            router.push('/admin/recordatorios');
                            cerrarMenuUsuario();
                          }}
                          className="dropdown-item"
                        >
                          📱 Recordatorios
                        </button>
                        <button
                          onClick={deshabilitarFecha}
                          className="dropdown-item"
                        >
                          🚫 Deshabilitar Fecha
                        </button>
                        <div className="dropdown-divider"></div>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item logout-item"
                        >
                          🚪 Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pestañas: agenda vs listado */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px 30px 0',
            borderBottom: '1px solid var(--spa-border-color)',
            background: 'white',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setVistaAdmin('agenda')}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: 'var(--spa-border-radius-small) var(--spa-border-radius-small) 0 0',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              background: vistaAdmin === 'agenda' ? 'var(--spa-light)' : 'transparent',
              color: 'var(--spa-text-primary)',
              borderBottom: vistaAdmin === 'agenda' ? '3px solid var(--spa-primary)' : '3px solid transparent',
            }}
          >
            📅 Agenda del día
          </button>
          <button
            type="button"
            onClick={() => setVistaAdmin('listado')}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: 'var(--spa-border-radius-small) var(--spa-border-radius-small) 0 0',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              background: vistaAdmin === 'listado' ? 'var(--spa-light)' : 'transparent',
              color: 'var(--spa-text-primary)',
              borderBottom: vistaAdmin === 'listado' ? '3px solid var(--spa-primary)' : '3px solid transparent',
            }}
          >
            📋 Todas las reservas
          </button>
        </div>

        {vistaAdmin === 'agenda' && (
          <div style={{ padding: '25px 30px', borderBottom: '1px solid var(--spa-border-color)' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'flex-end',
                marginBottom: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    color: 'var(--spa-text-primary)',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  Día de la agenda
                </label>
                <input
                  type="date"
                  value={fechaAgenda}
                  onChange={(e) => setFechaAgenda(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    border: '2px solid var(--spa-accent)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => abrirModalNueva()}
                style={{
                  background: 'var(--spa-gradient-primary)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 22px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                ➕ Nueva reserva
              </button>
              <button
                type="button"
                onClick={() => fetchReservas()}
                style={{
                  background: 'white',
                  color: 'var(--spa-primary)',
                  border: '2px solid var(--spa-primary)',
                  padding: '10px 18px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                🔄 Actualizar
              </button>
            </div>
            <p
              style={{
                margin: '0 0 16px',
                fontSize: '13px',
                color: 'var(--spa-text-secondary)',
                maxWidth: '720px',
              }}
            >
              Apunta aquí las citas que coordinas por teléfono o WhatsApp. Los tratamientos y precios salen del mismo
              catálogo del sitio; si el precio es &quot;según valoración&quot;, puedes indicar el monto al guardar.
            </p>
            {slotsAgenda.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: 'var(--spa-text-secondary)',
                  background: 'var(--spa-light)',
                  borderRadius: 'var(--spa-border-radius-small)',
                }}
              >
                No hay horarios para este día (domingo u otra fecha cerrada). Elige otra fecha o usa el listado
                completo.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                {[
                  { titulo: '🌅 Mañana', slots: slotsManana },
                  { titulo: '🌆 Tarde', slots: slotsTarde },
                ].map(({ titulo, slots }) => (
                  <div
                    key={titulo}
                    style={{
                      background: 'var(--spa-light)',
                      borderRadius: 'var(--spa-border-radius)',
                      padding: '16px',
                      border: '1px solid var(--spa-border-color)',
                    }}
                  >
                    <h3
                      style={{
                        margin: '0 0 12px',
                        fontSize: '16px',
                        color: 'var(--spa-text-primary)',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      {titulo}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {slots.map((hora) => {
                        const lista = porHorario[hora] || [];
                        return (
                          <div
                            key={hora}
                            style={{
                              background: 'white',
                              borderRadius: 'var(--spa-border-radius-small)',
                              padding: '12px',
                              border: '1px solid var(--spa-border-color)',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: lista.length ? '10px' : 0,
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: 'var(--spa-primary)',
                                  fontFamily: 'Montserrat, sans-serif',
                                }}
                              >
                                {hora}
                              </span>
                              <button
                                type="button"
                                onClick={() => abrirModalNueva(fechaAgenda, hora)}
                                style={{
                                  background: 'transparent',
                                  border: '1px dashed var(--spa-accent)',
                                  color: 'var(--spa-primary)',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontFamily: 'Montserrat, sans-serif',
                                }}
                              >
                                + Apuntar
                              </button>
                            </div>
                            {lista.length === 0 ? (
                              <div style={{ fontSize: '13px', color: 'var(--spa-text-secondary)' }}>Sin citas</div>
                            ) : (
                              lista.map((r) => (
                                <button
                                  key={r.id}
                                  type="button"
                                  onClick={() => abrirModal(r)}
                                  style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'left',
                                    marginTop: '8px',
                                    padding: '10px',
                                    background: 'var(--spa-cream)',
                                    border: '1px solid var(--spa-border-color)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontFamily: 'Montserrat, sans-serif',
                                  }}
                                >
                                  <div style={{ fontWeight: 600, color: 'var(--spa-text-primary)' }}>{r.nombre}</div>
                                  <div style={{ fontSize: '12px', color: 'var(--spa-text-secondary)', marginTop: '4px' }}>
                                    {r.tratamiento_nombre}
                                  </div>
                                  <div style={{ fontSize: '11px', marginTop: '6px' }}>
                                    <span
                                      style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontWeight: 600,
                                        background:
                                          r.estado === 'confirmada'
                                            ? 'var(--spa-success)'
                                            : r.estado === 'cancelada'
                                              ? 'var(--spa-error)'
                                              : 'var(--spa-warning)',
                                        color: r.estado === 'pendiente' ? 'var(--spa-text-primary)' : 'white',
                                      }}
                                    >
                                      {r.estado}
                                    </span>
                                  </div>
                                </button>
                              ))
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {vistaAdmin === 'listado' && (
        <>
        {/* Controles */}
        <div className="admin-controls" style={{
          padding: '25px 30px',
          borderBottom: '1px solid var(--spa-border-color)',
          background: 'var(--spa-light)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div className="admin-filters" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              flexWrap: 'wrap',
              flex: '1',
              minWidth: '250px'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  color: 'var(--spa-text-primary)',
                  fontWeight: '600'
                }}>
            Filtrar por fecha:
          </label>
          <input
            type="date"
            value={filtroFecha}
            onChange={e => setFiltroFecha(e.target.value)}
            style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    border: '2px solid var(--spa-accent)',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
                    color: 'var(--spa-text-primary)',
                    background: 'white'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  color: 'var(--spa-text-primary)',
                  fontWeight: '600'
                }}>
                  Filtrar por estado:
                </label>
                <select
                  value={filtroEstado}
                  onChange={e => setFiltroEstado(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    border: '2px solid var(--spa-accent)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    color: 'var(--spa-text-primary)',
                    background: 'white'
                  }}
                >
                  <option value="">Todos los estados</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>

              {(filtroFecha || filtroEstado) && (
                <button
                  onClick={() => {
                    setFiltroFecha('');
                    setFiltroEstado('');
                  }}
                  style={{
                    background: 'var(--spa-secondary)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                    marginTop: '20px'
                  }}
                >
                  🗑️ Limpiar filtros
                </button>
              )}
            </div>
            <div className="admin-buttons" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'flex-end'
            }}>
            <button
              onClick={fetchReservas}
              style={{
                background: 'var(--spa-gradient-primary)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 'var(--spa-border-radius-small)',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔄 Actualizar
            </button>
        </div>
      </div>

          <div style={{
            marginTop: '15px',
            padding: '15px',
            background: 'var(--spa-cream)',
            borderRadius: 'var(--spa-border-radius-small)',
            border: '1px solid var(--spa-accent)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <span style={{ color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                📊 Estadísticas:
              </span>
              <span style={{ color: 'var(--spa-text-secondary)' }}>
                Total: <strong>{reservas.length}</strong> | 
                Mostrando: <strong>{reservasFiltradas.length}</strong> | 
                Confirmadas: <strong style={{ color: 'var(--spa-success)' }}>
                  {reservas.filter(r => r.estado === 'confirmada').length}
                </strong> | 
                Pendientes: <strong style={{ color: 'var(--spa-warning)' }}>
                  {reservas.filter(r => r.estado === 'pendiente').length}
                </strong> | 
                Canceladas: <strong style={{ color: 'var(--spa-error)' }}>
                  {reservas.filter(r => r.estado === 'cancelada').length}
                </strong>
              </span>
            </div>
            <div style={{
              marginTop: '8px',
              padding: '8px',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 'var(--spa-border-radius-small)',
              fontSize: '12px',
              color: 'var(--spa-text-secondary)',
              border: '1px solid var(--spa-border-color)'
            }}>
              💡 <strong>Nota:</strong> La fecha mostrada es la fecha programada para el tratamiento. 
              La fecha de creación se muestra en texto más pequeño debajo.
            </div>
          </div>
        </div>

        {/* Vista de reservas - PC y Móvil */}
        {/* Vista PC - Tabla completa */}
        <div className="admin-table-desktop" style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white'
          }}>
          <thead>
              <tr style={{ background: 'var(--spa-primary)', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>Cliente</th>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>Tratamiento</th>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>Fecha Programada</th>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>Horario</th>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>Precio</th>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>Estado</th>
                <th style={{ padding: '15px', textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {reservasOrdenadas.map((reserva, index) => (
                <tr key={reserva.id} style={{
                  borderBottom: '1px solid var(--spa-border-color)',
                  background: index % 2 === 0 ? 'white' : 'var(--spa-light)'
                }}>
                  <td style={{ padding: '15px', color: 'var(--spa-text-primary)', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                    #{reserva.id}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ color: 'var(--spa-text-primary)', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>
                      {reserva.nombre}
                    </div>
                    <div style={{ color: 'var(--spa-text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                      {reserva.email}
                    </div>
                    <div style={{ color: 'var(--spa-text-secondary)', fontSize: '12px' }}>
                      📞 {reserva.telefono}
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ color: 'var(--spa-text-primary)', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>
                      {reserva.tratamiento_nombre}
                    </div>
                    <div style={{ color: 'var(--spa-text-secondary)', fontSize: '12px' }}>
                      ⏱️ {reserva.duracion} min
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ color: 'var(--spa-text-primary)', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>
                      📅 {reserva.fecha}
                    </div>
                    <div style={{ color: 'var(--spa-text-secondary)', fontSize: '11px', marginTop: '2px' }}>
                      📝 Creada: {(reserva.created_at || '').split('T')[0].split(' ')[0]}
                    </div>
                  </td>
                  <td style={{ padding: '15px', color: 'var(--spa-text-primary)', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>
                    {reserva.horario}
                  </td>
                  <td style={{ padding: '15px', color: 'var(--spa-text-primary)', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>
                    ${reserva.precio?.toLocaleString('es-CO') || 'N/A'}
                  </td>
                  <td style={{ padding: '15px' }}>
                  <span style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--spa-border-radius-small)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: reserva.estado === 'confirmada' ? 'var(--spa-success)' : 
                                 reserva.estado === 'cancelada' ? 'var(--spa-error)' : 'var(--spa-warning)',
                      color: reserva.estado === 'pendiente' ? 'var(--spa-text-primary)' : 'white'
                    }}>
                      {reserva.estado === 'confirmada' ? '✅' :
                       reserva.estado === 'cancelada' ? '❌' : '⏳'}
                  </span>
                </td>
                  <td style={{ padding: '15px' }}>
                  <select 
                    value={reserva.estado}
                    onChange={(e) => updateEstado(reserva.id, e.target.value)}
                    style={{
                        padding: '6px 10px',
                        borderRadius: 'var(--spa-border-radius-small)',
                        border: '2px solid var(--spa-accent)',
                      fontSize: '12px',
                      fontFamily: 'Montserrat, sans-serif',
                        color: 'var(--spa-text-primary)',
                        background: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="pendiente">⏳ Pendiente</option>
                      <option value="confirmada">✅ Confirmada</option>
                      <option value="cancelada">❌ Cancelada</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Vista Móvil - Lista simplificada */}
        <div className="admin-table-mobile" style={{
          background: 'white',
          borderRadius: 'var(--spa-border-radius-small)',
          border: '1px solid var(--spa-border-color)',
          overflow: 'hidden'
        }}>
          {reservasOrdenadas.map((reserva, index) => (
            <div
              key={reserva.id}
              onClick={() => abrirModal(reserva)}
              style={{
                background: 'white',
                border: 'none',
                borderRadius: '0',
                padding: '15px',
                marginBottom: '0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'none',
                borderBottom: index === reservasOrdenadas.length - 1 ? 'none' : '1px solid var(--spa-border-color)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--spa-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    color: 'var(--spa-text-primary)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                    fontSize: '16px',
                    marginBottom: '5px'
                  }}>
                    {reserva.nombre}
                  </div>
                  <div style={{
                    color: 'var(--spa-text-secondary)',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginBottom: '5px'
                  }}>
                    📞 {reserva.telefono}
                  </div>
                  <div style={{
                    color: 'var(--spa-text-secondary)',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    📅 {reserva.fecha} - 🕐 {reserva.horario}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '5px'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                    background: reserva.estado === 'confirmada' ? 'var(--spa-success)' : 
                               reserva.estado === 'pendiente' ? 'var(--spa-warning)' : 'var(--spa-error)',
                    color: 'white'
                  }}>
                    {reserva.estado === 'confirmada' ? '✅' : 
                     reserva.estado === 'pendiente' ? '⏳' : '❌'}
                  </span>
                  <div style={{
                    color: 'var(--spa-text-secondary)',
                    fontSize: '12px',
                    textAlign: 'right'
                  }}>
                    #{reserva.id}
                  </div>
                </div>
              </div>
              <div style={{
                color: 'var(--spa-text-secondary)',
                fontSize: '12px',
                textAlign: 'center',
                opacity: 0.7
              }}>
                Toca para ver detalles completos
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay reservas */}
        {reservasFiltradas.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '50px 30px',
            color: 'var(--spa-text-secondary)',
            fontFamily: 'Montserrat, sans-serif',
            background: 'var(--spa-light)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🧘‍♀️</div>
            <h3 style={{ color: 'var(--spa-text-primary)', marginBottom: '10px' }}>
              {reservas.length === 0 ? 'No hay reservas registradas' : 'No hay reservas que coincidan con los filtros'}
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              {reservas.length === 0 
                ? 'Registra citas desde la pestaña Agenda o cuando lleguen nuevas reservas al sistema.'
                : 'Intenta ajustar los filtros para ver más resultados.'
              }
            </p>
        </div>
      )}
        </>
        )}

        {/* Modal de detalles de reserva (ambas vistas) */}
        {modalAbierto && reservaSeleccionada && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={cerrarModal}
          >
            <div style={{
              background: 'white',
              borderRadius: 'var(--spa-border-radius)',
              padding: '30px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--spa-shadow-large)'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid var(--spa-border-color)',
                paddingBottom: '15px'
              }}>
                <h2 style={{
                  margin: 0,
                  color: 'var(--spa-text-primary)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '24px'
                }}>
                  📋 Detalles de la Reserva
                </h2>
                <button
                  onClick={cerrarModal}
                  style={{
                    background: 'var(--spa-error)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{
                  color: 'var(--spa-text-primary)',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '10px',
                  fontSize: '18px'
                }}>
                  👤 Información del Cliente
                </h3>
                <div style={{
                  background: 'var(--spa-light)',
                  padding: '15px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  marginBottom: '15px'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Nombre:</strong> {reservaSeleccionada.nombre}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>📞 Teléfono:</strong> {reservaSeleccionada.telefono}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{
                  color: 'var(--spa-text-primary)',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '10px',
                  fontSize: '18px'
                }}>
                  🧘‍♀️ Información del Tratamiento
                </h3>
                <div style={{
                  background: 'var(--spa-light)',
                  padding: '15px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  marginBottom: '15px'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Tratamiento:</strong> {reservaSeleccionada.tratamiento_nombre}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>⏱️ Duración:</strong> {reservaSeleccionada.duracion} minutos
                  </div>
                  <div>
                    <strong>💰 Precio:</strong> ${reservaSeleccionada.precio.toLocaleString('es-CO')}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{
                  color: 'var(--spa-text-primary)',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '10px',
                  fontSize: '18px'
                }}>
                  📅 Información de la Cita
                </h3>
                <div style={{
                  background: 'var(--spa-light)',
                  padding: '15px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  marginBottom: '15px'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>📅 Fecha:</strong> {reservaSeleccionada.fecha}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>🕐 Horario:</strong> {reservaSeleccionada.horario}
                  </div>
                  <div>
                    <strong>📝 Estado:</strong> 
                    <span style={{
                      marginLeft: '8px',
                      padding: '4px 8px',
                      borderRadius: 'var(--spa-border-radius-small)',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: reservaSeleccionada.estado === 'confirmada' ? 'var(--spa-success)' : 
                                 reservaSeleccionada.estado === 'pendiente' ? 'var(--spa-warning)' : 'var(--spa-error)',
                      color: 'white'
                    }}>
                      {reservaSeleccionada.estado === 'confirmada' ? '✅ Confirmada' : 
                       reservaSeleccionada.estado === 'pendiente' ? '⏳ Pendiente' : '❌ Cancelada'}
                    </span>
                  </div>
                </div>
              </div>

              {reservaSeleccionada.notas && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{
                    color: 'var(--spa-text-primary)',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '10px',
                    fontSize: '18px'
                  }}>
                    📝 Notas
                  </h3>
                  <div style={{
                    background: 'var(--spa-light)',
                    padding: '15px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    fontStyle: 'italic'
                  }}>
                    {reservaSeleccionada.notas}
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid var(--spa-border-color)'
              }}>
                <button
                  onClick={() => {
                    updateEstado(reservaSeleccionada.id, 'confirmada');
                    cerrarModal();
                  }}
                  disabled={reservaSeleccionada.estado === 'confirmada'}
                  style={{
                    background: reservaSeleccionada.estado === 'confirmada' ? 'var(--spa-text-secondary)' : 'var(--spa-success)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    cursor: reservaSeleccionada.estado === 'confirmada' ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ Confirmar
                </button>
                <button
                  onClick={() => {
                    updateEstado(reservaSeleccionada.id, 'pendiente');
                    cerrarModal();
                  }}
                  disabled={reservaSeleccionada.estado === 'pendiente'}
                  style={{
                    background: reservaSeleccionada.estado === 'pendiente' ? 'var(--spa-text-secondary)' : 'var(--spa-warning)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    cursor: reservaSeleccionada.estado === 'pendiente' ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  ⏳ Pendiente
                </button>
                <button
                  onClick={() => {
                    updateEstado(reservaSeleccionada.id, 'cancelada');
                    cerrarModal();
                  }}
                  disabled={reservaSeleccionada.estado === 'cancelada'}
                  style={{
                    background: reservaSeleccionada.estado === 'cancelada' ? 'var(--spa-text-secondary)' : 'var(--spa-error)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    cursor: reservaSeleccionada.estado === 'cancelada' ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: nueva reserva (agenda) */}
        {modalNuevaReserva && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1001,
              padding: '20px',
            }}
            onClick={cerrarModalNueva}
          >
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--spa-border-radius)',
                padding: '28px',
                maxWidth: '520px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                boxShadow: 'var(--spa-shadow-large)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '18px',
                  borderBottom: '1px solid var(--spa-border-color)',
                  paddingBottom: '12px',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: '20px',
                    color: 'var(--spa-text-primary)',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  ➕ Nueva reserva en agenda
                </h2>
                <button
                  type="button"
                  onClick={cerrarModalNueva}
                  style={{
                    background: 'var(--spa-error)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  ✕
                </button>
              </div>

              {mensajeModalNueva && (
                <div
                  style={{
                    marginBottom: '14px',
                    padding: '10px 12px',
                    background: 'rgba(220, 53, 69, 0.1)',
                    border: '1px solid var(--spa-error)',
                    borderRadius: '8px',
                    color: 'var(--spa-error)',
                    fontSize: '13px',
                  }}
                >
                  {mensajeModalNueva}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                    Nombre del cliente *
                  </label>
                  <input
                    value={formNueva.nombre}
                    onChange={(e) => setFormNueva((f) => ({ ...f, nombre: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--spa-border-color)',
                      fontFamily: 'Montserrat, sans-serif',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                    Teléfono *
                  </label>
                  <input
                    value={formNueva.telefono}
                    onChange={(e) => setFormNueva((f) => ({ ...f, telefono: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--spa-border-color)',
                      fontFamily: 'Montserrat, sans-serif',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={formNueva.email}
                    onChange={(e) => setFormNueva((f) => ({ ...f, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--spa-border-color)',
                      fontFamily: 'Montserrat, sans-serif',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                    Categoría
                  </label>
                  <select
                    value={formNueva.categoria}
                    onChange={(e) =>
                      setFormNueva((f) => ({
                        ...f,
                        categoria: e.target.value as CategoriaTratamiento,
                        tratamientoId: '',
                      }))
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--spa-border-color)',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {(Object.keys(TRATAMIENTOS) as CategoriaTratamiento[]).map((c) => (
                      <option key={c} value={c}>
                        {ETIQUETA_CATEGORIA[c]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                    Tratamiento *
                  </label>
                  <select
                    value={formNueva.tratamientoId}
                    onChange={(e) => setFormNueva((f) => ({ ...f, tratamientoId: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--spa-border-color)',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    <option value="">Selecciona…</option>
                    {TRATAMIENTOS[formNueva.categoria].map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre} — {t.duracion} min — {textoPrecioCatalogo(t)}
                      </option>
                    ))}
                  </select>
                </div>
                {tratamientoFormSeleccionado &&
                  (tratamientoFormSeleccionado.precioEspecial != null ||
                    tratamientoFormSeleccionado.precio === 0) && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                        Precio acordado (COP)
                      </label>
                      <input
                        value={formNueva.precioManual}
                        onChange={(e) => setFormNueva((f) => ({ ...f, precioManual: e.target.value }))}
                        placeholder="0 si aplica"
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid var(--spa-border-color)',
                          fontFamily: 'Montserrat, sans-serif',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  )}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '140px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                      Fecha *
                    </label>
                    <input
                      type="date"
                      value={formNueva.fecha}
                      onChange={(e) => setFormNueva((f) => ({ ...f, fecha: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid var(--spa-border-color)',
                        fontFamily: 'Montserrat, sans-serif',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ flex: '1', minWidth: '140px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                      Hora *
                    </label>
                    <select
                      value={formNueva.horario}
                      onChange={(e) => setFormNueva((f) => ({ ...f, horario: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid var(--spa-border-color)',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      <option value="">Selecciona…</option>
                      {horariosSelectModal.map((h) => {
                        const ocupado = horariosOcupadosModal.includes(h);
                        return (
                          <option key={h} value={h}>
                            {h}
                            {ocupado ? ' (cupo lleno según reglas)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                    Estado al guardar
                  </label>
                  <select
                    value={formNueva.estado}
                    onChange={(e) =>
                      setFormNueva((f) => ({
                        ...f,
                        estado: e.target.value as 'confirmada' | 'pendiente',
                      }))
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--spa-border-color)',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    <option value="confirmada">Confirmada (cuenta para cupos)</option>
                    <option value="pendiente">Pendiente (no bloquea cupos)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
                    Notas
                  </label>
                  <textarea
                    value={formNueva.notas}
                    onChange={(e) => setFormNueva((f) => ({ ...f, notas: e.target.value }))}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--spa-border-color)',
                      fontFamily: 'Montserrat, sans-serif',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    color: 'var(--spa-text-secondary)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formNueva.omitirDisponibilidad}
                    onChange={(e) =>
                      setFormNueva((f) => ({ ...f, omitirDisponibilidad: e.target.checked }))
                    }
                  />
                  Omitir comprobación de cupos (solo si la agenda debe permitir dos citas en el mismo hueco)
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={guardarReservaDesdeAgenda}
                    disabled={guardandoReserva}
                    style={{
                      flex: 1,
                      minWidth: '160px',
                      background: guardandoReserva ? 'var(--spa-text-secondary)' : 'var(--spa-gradient-primary)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 18px',
                      borderRadius: 'var(--spa-border-radius-small)',
                      cursor: guardandoReserva ? 'not-allowed' : 'pointer',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 'bold',
                    }}
                  >
                    {guardandoReserva ? 'Guardando…' : 'Guardar en agenda'}
                  </button>
                  <button
                    type="button"
                    onClick={cerrarModalNueva}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 'var(--spa-border-radius-small)',
                      border: '1px solid var(--spa-border-color)',
                      background: 'white',
                      cursor: 'pointer',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Estilos para el menú de usuario */}
      <style jsx>{`
        /* Estilos base del menú de usuario */
        .user-menu-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .user-menu-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        
        .user-info-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .user-avatar {
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          border: 1px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .user-avatar:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.05);
        }
        
        .username-display {
          font-size: 12px;
          font-weight: 500;
          font-family: 'Montserrat', sans-serif;
          text-align: center;
          color: white;
          width: 100%;
        }
        
        .user-dropdown-menu {
          position: absolute;
          top: 70px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border: 1px solid #e0e0e0;
          min-width: 200px;
          z-index: 1000;
          overflow: hidden;
        }
        
        .dropdown-content {
          padding: 8px 0;
        }
        
        .dropdown-item {
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          color: #333;
          font-family: 'Montserrat', sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s ease;
        }
        
        .dropdown-item:hover {
          background: #f5f5f5;
        }
        
        .logout-item {
          color: #e74c3c;
        }
        
        .logout-item:hover {
          background: #fef2f2;
        }
        
        .dropdown-divider {
          height: 1px;
          background: #e0e0e0;
          margin: 4px 0;
        }
        
        /* Estilos para móvil */
        @media (max-width: 768px) {
          .admin-header h1 {
            font-size: 20px !important;
            line-height: 1.3 !important;
          }
          
          .admin-controls {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .admin-filters {
            flex-direction: column !important;
            gap: 15px !important;
          }
          
          .admin-buttons {
            flex-direction: column !important;
            gap: 10px !important;
            width: 100% !important;
          }
          
          .admin-buttons button {
            width: 100% !important;
            justify-content: center !important;
          }
          
          .admin-table-desktop {
            display: none !important;
          }
          
          .admin-table-mobile {
            display: block !important;
          }
          
          /* Layout del header en móvil */
          .admin-header {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 20px !important;
          }
          
          .admin-header > div {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            gap: 20px !important;
          }
          
          .admin-header > div > div:first-child {
            flex: none !important;
            min-width: auto !important;
            margin-right: 0 !important;
            text-align: center !important;
          }
          
          /* Centrado perfecto del menú de usuario en móvil */
          .user-menu-wrapper {
            order: 2 !important;
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .user-menu-container {
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            width: auto !important;
            margin: 0 !important;
          }
          
          .user-info-section {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 8px !important;
            width: 100% !important;
          }
          
          .user-avatar {
            margin: 0 auto !important;
          }
          
          .username-display {
            text-align: center !important;
            width: 100% !important;
            margin: 0 auto !important;
          }
          
          /* Menú desplegable centrado en móvil */
          .user-dropdown-menu {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            min-width: 200px !important;
            max-width: calc(100vw - 40px) !important;
          }
        }
        
        /* Estilos para desktop */
        @media (min-width: 769px) {
          .admin-table-desktop {
            display: block !important;
          }
          
          .admin-table-mobile {
            display: none !important;
          }
          
          .user-menu-wrapper {
            order: 2 !important;
          }
          
          .user-dropdown-menu {
            right: 0 !important;
            left: auto !important;
            transform: none !important;
          }
        }
        
        @media (min-width: 769px) {
          .admin-table-desktop {
            display: block !important;
          }
          
          .admin-table-mobile {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          .admin-container {
            padding: 15px !important;
          }
          
          .admin-header {
            padding: 20px 15px !important;
          }
          
          .admin-controls {
            padding: 20px 15px !important;
          }
        }
      `}</style>
    </div>
  );
} 