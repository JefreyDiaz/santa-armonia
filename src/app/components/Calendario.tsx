'use client';

import { useEffect, useState } from 'react';

interface CalendarioProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  categoria?: string; // Para verificar disponibilidad específica por categoría
}

export default function Calendario({ selectedDate, onDateSelect, categoria = 'masajes' }: CalendarioProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [feriados, setFeriados] = useState<string[]>([]);
  const [fechasSinDisponibilidad, setFechasSinDisponibilidad] = useState<Set<string>>(new Set());
  const [fechasConDisponibilidad, setFechasConDisponibilidad] = useState<Set<string>>(new Set());

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }

  function formatDate(date: Date): string {
    // Usar formato local para evitar problemas de zona horaria
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function isDomingo(date: Date): boolean {
    return date.getDay() === 0;
  }

  function isFeriado(date: Date): boolean {
    const dateStr = formatDate(date);
    return feriados.includes(dateStr);
  }

  // Función para verificar si una fecha tiene horarios disponibles
  async function verificarDisponibilidadFecha(fecha: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/horarios?fecha=${fecha}&categoria=${categoria}`);
      if (response.ok) {
        const data = await response.json();
        const horariosOcupados = data.horariosOcupados || [];
        
        // Generar todos los horarios posibles para esa fecha
        const d = new Date(fecha + 'T00:00:00');
        const dia = d.getDay();
        let horariosPosibles: string[] = [];
        
        if (dia >= 1 && dia <= 5) { // L-V
          horariosPosibles = [
            ...generarRango('07:00', '12:00'),
            ...generarRango('14:00', '18:00')
          ];
        } else if (dia === 6) { // Sábado
          horariosPosibles = generarRango('07:00', '14:00');
        }
        
        // Verificar si hay al menos un horario disponible
        const horariosDisponibles = horariosPosibles.filter(horario => 
          !horariosOcupados.includes(horario) && !isHorarioPasado(fecha, horario)
        );
        
        return horariosDisponibles.length > 0;
      }
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
    }
    return false; // Por defecto, asumir que NO hay disponibilidad si hay error
  }

  // Función auxiliar para generar rangos de horarios
  function generarRango(inicio: string, fin: string, pasoMin = 60): string[] {
    const [hIni, mIni] = inicio.split(':').map(Number);
    const [hFin, mFin] = fin.split(':').map(Number);
    const res: string[] = [];
    let t = new Date();
    t.setHours(hIni, mIni, 0, 0);
    const end = new Date();
    end.setHours(hFin, mFin, 0, 0);
    while (t.getTime() < end.getTime()) {
      const h = String(t.getHours()).padStart(2, '0');
      const m = String(t.getMinutes()).padStart(2, '0');
      res.push(`${h}:${m}`);
      t = new Date(t.getTime() + pasoMin * 60000);
    }
    return res;
  }

  // Función para verificar si un horario ya pasó
  function isHorarioPasado(fecha: string, horario: string): boolean {
    const ahora = new Date();
    
    // Solo aplicar restricciones si la fecha es hoy
    if (!esHoy(fecha)) {
      return false;
    }
    
    // Crear la fecha del horario seleccionado usando la fecha actual como base
    const [horas, minutos] = horario.split(':').map(Number);
    const fechaHorario = new Date();
    fechaHorario.setHours(horas, minutos, 0, 0);
    
    // Agregar 30 minutos de margen para evitar reservas muy cercanas
    const margen = new Date(fechaHorario.getTime() + 30 * 60 * 1000);
    
    return ahora >= margen;
  }

  // Función para verificar si una fecha es hoy
  function esHoy(fecha: string): boolean {
    const hoy = new Date();
    const hoyString = hoy.getFullYear() + '-' + 
                     String(hoy.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(hoy.getDate()).padStart(2, '0');
    return fecha === hoyString;
  }

  function getDateStyle(date: Date) {
    const dateStr = formatDate(date);
    const isSelected = dateStr === selectedDate;
    const isToday = dateStr === formatDate(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = date < today;
    const isNoLaboral = isDomingo(date) || isFeriado(date);
    const isSinDisponibilidad = fechasSinDisponibilidad.has(dateStr);
    const isConDisponibilidad = fechasConDisponibilidad.has(dateStr);
    const isVerificando = !isPast && !isNoLaboral && !isSinDisponibilidad && !isConDisponibilidad && !isSelected;
    
    let backgroundColor = '#fff';
    let color = 'var(--spa-text-primary)';
    let border = '1px solid var(--spa-border-color)';
    let cursor = 'pointer';
    let boxShadow = 'none';

    if (isPast) {
      backgroundColor = 'var(--spa-light)';
      color = 'var(--spa-text-light)';
      cursor = 'not-allowed';
    } else if (isNoLaboral) {
      backgroundColor = '#f8d7da';
      color = '#842029';
      border = '1px solid #f5c2c7';
      cursor = 'not-allowed';
    } else if (isSinDisponibilidad) {
      backgroundColor = '#f8d7da';
      color = '#842029';
      border = '1px solid #f5c2c7';
      cursor = 'not-allowed';
    } else if (isSelected) {
      backgroundColor = 'var(--spa-primary)';
      color = '#fff';
      border = '2px solid var(--spa-primary)';
      boxShadow = '0 4px 12px rgba(147, 51, 234, 0.3)';
    } else if (isVerificando) {
      // Mientras se verifica, mostrar en gris claro
      backgroundColor = '#f1f5f9';
      color = '#64748b';
      border = '1px solid #e2e8f0';
      cursor = 'wait';
    } else if (isConDisponibilidad) {
      // Solo mostrar verde cuando se confirma que hay disponibilidad
      backgroundColor = 'var(--spa-success)';
      color = '#fff';
      border = '1px solid var(--spa-success)';
    }

    return {
      backgroundColor,
      color,
      border,
      cursor,
      boxShadow,
      padding: '8px',
      textAlign: 'center' as const,
      borderRadius: 'var(--spa-border-radius-small)',
      fontSize: '14px',
      fontWeight: isToday ? 'bold' : 'normal',
      minWidth: '35px',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
    };
  }

  function handleDateClick(date: Date) {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = date < today;
    const isNoLaboral = isDomingo(date) || isFeriado(date);
    const isSinDisponibilidad = fechasSinDisponibilidad.has(dateStr);
    
    if (!isPast && !isNoLaboral && !isSinDisponibilidad) {
      onDateSelect(dateStr);
    }
  }

  function changeMonth(direction: number) {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  }

  // Cargar feriados del año visible
  useEffect(() => {
    async function load() {
      try {
        const y = currentMonth.getFullYear();
        const res = await fetch(`/api/feriados?year=${y}`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          setFeriados(Array.isArray(json?.feriados) ? json.feriados : []);
        }
      } catch (e) {
        console.warn('No se pudieron cargar feriados', e);
      }
    }
    load();
  }, [currentMonth]);

  // Verificar disponibilidad de fechas cuando cambie el mes o la categoría
  useEffect(() => {
    async function verificarDisponibilidadMes() {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const fechasSinDisponibilidadSet = new Set<string>();
      const fechasConDisponibilidadSet = new Set<string>();
      
      // Limpiar estados anteriores
      setFechasSinDisponibilidad(new Set());
      setFechasConDisponibilidad(new Set());
      
      // Verificar cada día del mes en lotes de 5 para mejor rendimiento
      const fechasAVerificar: string[] = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        
        // Solo verificar fechas futuras que no sean domingos o feriados
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isPast = date < today;
        const isNoLaboral = isDomingo(date) || isFeriado(date);
        
        if (!isPast && !isNoLaboral) {
          fechasAVerificar.push(dateStr);
        }
      }
      
      // Procesar en lotes de 5 fechas
      const batchSize = 5;
      for (let i = 0; i < fechasAVerificar.length; i += batchSize) {
        const batch = fechasAVerificar.slice(i, i + batchSize);
        
        // Procesar el lote en paralelo
        const promises = batch.map(async (fecha) => {
          const tieneDisponibilidad = await verificarDisponibilidadFecha(fecha);
          return { fecha, tieneDisponibilidad };
        });
        
        const results = await Promise.all(promises);
        
        // Actualizar estados con los resultados del lote
        results.forEach(({ fecha, tieneDisponibilidad }) => {
          if (tieneDisponibilidad) {
            fechasConDisponibilidadSet.add(fecha);
          } else {
            fechasSinDisponibilidadSet.add(fecha);
          }
        });
        
        // Actualizar estados después de cada lote para mostrar progreso
        setFechasSinDisponibilidad(new Set(fechasSinDisponibilidadSet));
        setFechasConDisponibilidad(new Set(fechasConDisponibilidadSet));
        
        // Pequeña pausa entre lotes para no sobrecargar el servidor
        if (i + batchSize < fechasAVerificar.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    verificarDisponibilidadMes();
  }, [currentMonth, categoria, feriados]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const days: JSX.Element[] = [];
  
  // Días vacíos al inicio
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} style={{ padding: '8px', minWidth: '35px', height: '35px' }}></div>);
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    
    days.push(
      <div
        key={day}
        style={getDateStyle(date)}
        onClick={() => handleDateClick(date)}
        title={(() => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today) return 'Fecha pasada';
          if (isDomingo(date) || isFeriado(date)) return 'No laboral (domingo/feriado)';
          if (fechasSinDisponibilidad.has(formatDate(date))) return 'Sin horarios disponibles';
          return 'Disponible';
        })()}
        onMouseEnter={(e) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (!date || date < today) return;
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (!date || date < today) return;
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = getDateStyle(date).boxShadow;
        }}
      >
        {day}
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)', 
      borderRadius: 'var(--spa-border-radius)', 
      padding: 'var(--spa-spacing-lg)', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      maxWidth: '350px',
      minWidth: '320px',
      border: '1px solid var(--spa-border-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decoración de fondo */}
      <div style={{
        position: 'absolute',
        top: -20,
        right: -20,
        width: '60px',
        height: '60px',
        background: 'var(--spa-gradient-primary)',
        borderRadius: '50%',
        opacity: 0.1,
        zIndex: 0
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: '80px',
        height: '80px',
        background: 'var(--spa-gradient-secondary)',
        borderRadius: '50%',
        opacity: 0.08,
        zIndex: 0
      }}></div>

      {/* Header del calendario */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          style={{
            background: 'var(--spa-gradient-primary)',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: 'var(--spa-border-radius-small)',
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(147, 51, 234, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(147, 51, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(147, 51, 234, 0.3)';
          }}
        >
          ←
        </button>
        <h3 style={{ 
          margin: 0, 
          color: 'var(--spa-primary)', 
          fontSize: '18px', 
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          {monthNames[month]} {year}
        </h3>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          style={{
            background: 'var(--spa-gradient-primary)',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: 'var(--spa-border-radius-small)',
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(147, 51, 234, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(147, 51, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(147, 51, 234, 0.3)';
          }}
        >
          →
        </button>
      </div>

      {/* Días de la semana */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '4px', 
        marginBottom: '12px',
        position: 'relative',
        zIndex: 1
      }}>
        {['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'].map(day => (
          <div key={day} style={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: 'var(--spa-primary)', 
            fontSize: '13px',
            padding: '8px',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '4px',
        position: 'relative',
        zIndex: 1
      }}>
        {days}
      </div>

      {/* Leyenda */}
      <div style={{ 
        marginTop: '20px', 
        fontSize: '12px',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.8)',
        padding: '12px',
        borderRadius: 'var(--spa-border-radius-small)',
        border: '1px solid var(--spa-border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: 'var(--spa-success)', 
            borderRadius: '3px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}></div>
          <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Disponible</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#f1f5f9', 
            borderRadius: '3px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}></div>
          <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Verificando...</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#f8d7da', 
            borderRadius: '3px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}></div>
          <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Sin horarios disponibles</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
            backgroundColor: 'var(--spa-light)', 
            borderRadius: '3px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}></div>
          <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Fecha pasada</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
            backgroundColor: 'var(--spa-primary)', 
            borderRadius: '3px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}></div>
          <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Seleccionada</span>
        </div>
      </div>
    </div>
  );
} 