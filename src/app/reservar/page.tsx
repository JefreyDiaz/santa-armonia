"use client";
import { useState, useEffect, Suspense, useMemo, useCallback, memo } from "react";
import { useSearchParams } from "next/navigation";
import Calendario from "../components/Calendario";

// Configuración para evitar prerendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

// Tipos de tratamientos del spa
const TRATAMIENTOS = {
  corporales: [
    // Paquetes de tratamientos
    { id: 'masajes-reductores', nombre: 'Masajes Reductores', precio: 900000, duracion: 900, descripcion: 'Tratamiento especializado para reducir grasa corporal y mejorar la silueta mediante técnicas avanzadas de masaje y aparatología. Paquete de 15 sesiones.' },
    { id: 'masajes-moldeadores', nombre: 'Masajes Moldeadores', precio: 750000, duracion: 720, descripcion: 'Tratamiento especializado para moldear y tonificar el cuerpo, ideal para personas con poco tejido graso que buscan definir su figura. Paquete de 12 sesiones.' },
    { id: 'levantamiento-gluteos', nombre: 'Levantamiento de Glúteos', precio: 950000, duracion: 600, descripcion: 'Tratamiento completo especializado para levantar, tonificar y dar forma a los glúteos mediante técnicas avanzadas. Paquete de 10 sesiones.' },
    { id: 'tratamiento-anticelulitis', nombre: 'Tratamiento Anticelulitis', precio: 800000, duracion: 600, descripcion: 'Tratamiento especializado para combatir la celulitis mediante técnicas de drenaje linfático y electroestimulación. Paquete de 10 sesiones.' }
  ],
  otros: [
    // Depilaciones Faciales
    { id: 'depilacion-cejas', nombre: 'Depilación de Cejas', precio: 15000, duracion: 30, descripcion: 'Depilación profesional de cejas con cera para dar forma perfecta.' },
    { id: 'depilacion-bigote', nombre: 'Depilación de Bigote', precio: 8000, duracion: 20, descripcion: 'Depilación de vello facial superior con cera.' },
    { id: 'depilacion-barbilla', nombre: 'Depilación de Barbilla', precio: 22000, duracion: 25, descripcion: 'Depilación de vello en la zona de la barbilla.' },
    { id: 'depilacion-facial-completa', nombre: 'Depilación Facial Completa', precio: 45000, duracion: 45, descripcion: 'Depilación completa del rostro incluyendo cejas, bigote, barbilla y patillas.' },
    
    // Depilaciones Corporales
    { id: 'depilacion-brazos', nombre: 'Depilación de Brazos', precio: 45000, duracion: 45, descripcion: 'Depilación completa de brazos con cera.' },
    { id: 'depilacion-piernas-completas', nombre: 'Depilación Piernas Completas', precio: 55000, duracion: 60, descripcion: 'Depilación completa de piernas con cera desde los muslos hasta los tobillos.' },
    { id: 'depilacion-media-pierna', nombre: 'Depilación Media Pierna', precio: 35000, duracion: 40, descripcion: 'Depilación de piernas desde la rodilla hasta el tobillo con cera.' },
    { id: 'depilacion-axilas', nombre: 'Depilación de Axilas', precio: 15000, duracion: 10, descripcion: 'Depilación de axilas con cera para una piel suave y sin vello.' },
    { id: 'depilacion-bikini', nombre: 'Depilación de Bikini', precio: 35000, duracion: 20, descripcion: 'Depilación de zona íntima con cera para una piel suave y sin vello.' },
    { id: 'depilacion-espalda', nombre: 'Depilación de Espalda', precio: 70000, duracion: 60, descripcion: 'Depilación completa de espalda con cera.' },
    
    // Masajes Relajantes
    { id: 'masaje-relajante', nombre: 'Masaje Relajante', precio: 120000, duracion: 60, descripcion: 'Masaje suave y relajante diseñado para reducir el estrés y promover la relajación profunda. Incluye aromaterapia, musicoterapia, piedras volcánicas y masaje manual.' },
    { id: 'masaje-descontracturante', nombre: 'Masaje Descontracturante', precio: 120000, duracion: 60, descripcion: 'Masaje profundo especializado para liberar tensiones y contracturas musculares. Incluye vacunoterapia, masajeador eléctrico y masaje manual con presión.' },
    
    // Servicios Especializados
    { id: 'valoracion', nombre: 'Valoración', precio: 0, duracion: 20, descripcion: 'Consulta especializada para evaluar tus necesidades y determinar el mejor tratamiento facial o corporal según tu tipo de piel y objetivos.', precioEspecial: 'Sin costo' },
    { id: 'cauterizacion-verrugas', nombre: 'Cauterización de Verrugas', precio: 0, duracion: 30, descripcion: 'Tratamiento especializado para la eliminación segura de verrugas y lunares mediante técnicas de cauterización.', precioEspecial: 'Según valoración' },
    { id: 'lipo-papada', nombre: 'Lipo Papada', precio: 0, duracion: 60, descripcion: 'Tratamiento de liposucción de papada a través de quemadores de grasa especializados.', precioEspecial: 'Según valoración' },
    { id: 'lispoflas', nombre: 'Lispoflas', precio: 0, duracion: 60, descripcion: 'Tratamiento especializado para la reducción de grasa localizada mediante técnicas avanzadas.', precioEspecial: 'Según valoración' },
    { id: 'suero-terapia', nombre: 'SUERO TERAPIA', precio: 0, duracion: 45, descripcion: 'Cada suero es indicado para una necesidad específica. Tipos: Reductor, Antiedad, Inmunológico, Desintoxicante, Energéticos, Hidratante, Vitalidad, entre otros.', precioEspecial: 'De acuerdo al suero' }
  ],
  faciales: [
    { id: 'limpieza-facial-profunda', nombre: 'LIMPIEZA FACIAL PROFUNDA', precio: 120000, duracion: 60, descripcion: 'Tratamiento completo de limpieza facial que elimina impurezas y células muertas para una piel radiante y saludable' },
    { id: 'plasma-rico-plaquetas', nombre: 'PLASMA RICO EN PLAQUETAS', precio: 120000, duracion: 60, descripcion: 'Tratamiento terapéutico derivado de la sangre que estimula la regeneración celular y mejora la textura de la piel' },
    { id: 'toxina-botulinica', nombre: 'TOXINA BOTULÍNICA (BOTOX)', precio: 0, duracion: 60, descripcion: 'La toxina botulínica es una sustancia derivada de una bacteria llamada Clostridium botulinum, conocida por detener la movilidad de los músculos faciales de manera temporal', precioEspecial: 'Según valoración' },
    { id: 'rejuvenecimiento-facial-3d', nombre: 'REJUVENECIMIENTO FACIAL EN 3D', precio: 0, duracion: 90, descripcion: 'Es una combinación de diferentes procedimientos que ayudarán a devolver la juventud en tu rostro', precioEspecial: 'Según valoración' },
    { id: 'tratamiento-despigmentante', nombre: 'TRATAMIENTO DESPIGMENTANTE (ANTI MANCHAS)', precio: 120000, duracion: 45, descripcion: 'Tratamiento basado en aplicación de diferentes principios activos para mejorar la apariencia de los melasmas y prevenir su aparición' },
    { id: 'tratamiento-anti-acne', nombre: 'TRATAMIENTO ANTI ACNÉ', precio: 110000, duracion: 45, descripcion: 'Tratamiento basado en la aplicación de diferentes principios activos para mejorar los diferentes tipos de acné y prevenir su proliferación' },
    { id: 'tratamiento-anti-edad', nombre: 'TRATAMIENTO ANTI EDAD', precio: 130000, duracion: 45, descripcion: 'Tratamiento basado en la aplicación de diferentes principios activos indicados para mejorar los signos de envejecimiento de la piel' },
    { id: 'relleno-labios', nombre: 'RELLENO DE LABIOS CON ÁCIDO HIALURÓNICO', precio: 750000, duracion: 60, descripcion: 'Procedimiento no quirúrgico que se realiza mediante la inyección de ácido hialurónico, sustancia segura y reabsorbible' },
    { id: 'depilacion-cejas', nombre: 'DEPILACIÓN CON CERA - CEJAS', precio: 15000, duracion: 15, descripcion: 'Depilación con cera especializada para cejas, definiendo la forma perfecta para tu rostro' },
    { id: 'depilacion-bigote', nombre: 'DEPILACIÓN CON CERA - BIGOTE', precio: 7000, duracion: 10, descripcion: 'Depilación con cera para el área del bigote, dejando la piel suave y sin vello' },
    { id: 'depilacion-nariz', nombre: 'DEPILACIÓN CON CERA - NARIZ', precio: 10000, duracion: 10, descripcion: 'Depilación con cera para el área de la nariz, eliminando vello no deseado' },
    { id: 'depilacion-menton', nombre: 'DEPILACIÓN CON CERA - MENTÓN', precio: 8000, duracion: 10, descripcion: 'Depilación con cera para el área del mentón, dejando la piel suave y definida' },
    { id: 'depilacion-rostro', nombre: 'DEPILACIÓN CON CERA - ROSTRO', precio: 25000, duracion: 30, descripcion: 'Depilación completa del rostro con cera, eliminando todo el vello facial no deseado' }
  ]
};

// Mapa ultra-optimizado para búsqueda instantánea
const TRATAMIENTOS_MAP = new Map();
const TRATAMIENTOS_BY_ID = new Map();

// Pre-procesar todos los datos una sola vez
Object.entries(TRATAMIENTOS).forEach(([categoria, tratamientos]) => {
  tratamientos.forEach(tratamiento => {
    const nombreLower = tratamiento.nombre.toLowerCase();
    const tratamientoConCategoria = { ...tratamiento, categoria };
    
    // Mapa por ID para acceso O(1)
    TRATAMIENTOS_BY_ID.set(tratamiento.id, tratamientoConCategoria);
    
    // Mapa por nombre completo
    TRATAMIENTOS_MAP.set(nombreLower, tratamientoConCategoria);
    
    // Solo palabras clave más importantes para reducir memoria
    const palabras = nombreLower.split(' ').filter(palabra => palabra.length > 5);
    palabras.forEach(palabra => {
      if (!TRATAMIENTOS_MAP.has(palabra)) {
        TRATAMIENTOS_MAP.set(palabra, tratamientoConCategoria);
      }
    });
  });
});

// Función de búsqueda ultra-optimizada
const buscarTratamientoOptimizado = (query: string) => {
  if (!query) return null;
  
  const queryLower = query.toLowerCase();
  
  // Búsqueda directa por nombre completo (más común)
  let resultado = TRATAMIENTOS_MAP.get(queryLower);
  if (resultado) return resultado;
  
  // Búsqueda por palabras clave (solo las más importantes)
  const palabras = queryLower.split(' ').filter(palabra => palabra.length > 5);
  for (const palabra of palabras) {
    resultado = TRATAMIENTOS_MAP.get(palabra);
    if (resultado) return resultado;
  }
  
  return null;
};

// Reglas de negocio: L-V 7-12 y 14-18; Sábados 7-14; Domingos/Feriados no se atiende (bloqueados en calendario)
function generarRango(inicio: string, fin: string, pasoMin = 60): string[] {
  const [hIni, mIni] = inicio.split(':').map(Number);
  const [hFin, mFin] = fin.split(':').map(Number);
  const res: string[] = [];
  let t = new Date();
  t.setHours(hIni, mIni, 0, 0);
  const end = new Date();
  end.setHours(hFin, mFin, 0, 0);
  // Usamos rango semiabierto [inicio, fin): no incluir el límite superior como hora de inicio
  while (t.getTime() < end.getTime()) {
    const h = String(t.getHours()).padStart(2, '0');
    const m = String(t.getMinutes()).padStart(2, '0');
    res.push(`${h}:${m}`);
    t = new Date(t.getTime() + pasoMin * 60000);
  }
  return res;
}

function obtenerHorariosPorFecha(fecha: string): string[] {
  if (!fecha) return [];
  const d = new Date(fecha + 'T00:00:00');
  const dia = d.getDay(); // 0=Dom,1=Lun,...6=Sab
  if (dia === 0) return []; // Domingo (bloqueado en calendario también)
  if (dia >= 1 && dia <= 5) {
    return [
      ...generarRango('07:00', '12:00'),
      ...generarRango('14:00', '18:00')
    ];
  }
  // Sábado
  return generarRango('07:00', '14:00');
}

// Función para verificar si un horario ya pasó
function isHorarioPasado(fecha: string, horario: string): boolean {
  const ahora = new Date();
  
  console.log(`=== Verificando horario ${horario} para fecha ${fecha} ===`);
  
  // Solo aplicar restricciones si la fecha es hoy
  if (!esHoy(fecha)) {
    console.log(`- No es hoy, retornando false`);
    return false;
  }
  
  console.log(`- Es hoy, verificando horario...`);
  
  // Crear la fecha del horario seleccionado usando la fecha actual como base
  const [horas, minutos] = horario.split(':').map(Number);
  const fechaHorario = new Date();
  fechaHorario.setHours(horas, minutos, 0, 0);
  
  // Agregar 30 minutos de margen para evitar reservas muy cercanas
  const margen = new Date(fechaHorario.getTime() + 30 * 60 * 1000);
  
  // Debug: Solo para hoy
  console.log(`- Ahora: ${ahora.toLocaleString()}`);
  console.log(`- Horario: ${fechaHorario.toLocaleString()}`);
  console.log(`- Margen: ${margen.toLocaleString()}`);
  console.log(`- ¿Ya pasó?: ${ahora >= margen}`);
  
  // Verificar si el horario ya pasó
  return ahora >= margen;
}

// Función para verificar si una fecha es hoy
function esHoy(fecha: string): boolean {
  const hoy = new Date();
  
  // Obtener la fecha de hoy en formato YYYY-MM-DD
  const hoyString = hoy.getFullYear() + '-' + 
                   String(hoy.getMonth() + 1).padStart(2, '0') + '-' + 
                   String(hoy.getDate()).padStart(2, '0');
  
  console.log(`Verificando si es hoy:`);
  console.log(`- Fecha seleccionada: ${fecha}`);
  console.log(`- Hoy calculado: ${hoyString}`);
  console.log(`- ¿Es hoy?: ${fecha === hoyString}`);
  
  return fecha === hoyString;
}

// Función para obtener horarios disponibles (excluyendo los que ya pasaron)
function getHorariosDisponibles(fecha: string, horariosOcupados: string[]): string[] {
  return obtenerHorariosPorFecha(fecha).filter(horario => {
    const noOcupado = !horariosOcupados.includes(horario);
    const noPasado = !isHorarioPasado(fecha, horario);
    return noOcupado && noPasado;
  });
}

// Simulación de horarios ocupados (en un sistema real esto vendría de la base de datos)
const HORARIOS_OCUPADOS: Record<string, string[]> = {
  '2025-01-15': ['10:00', '14:00', '16:00'],
  '2025-01-16': ['09:00', '11:00', '17:00'],
  '2025-01-17': ['12:00', '15:00', '18:00'],
  '2025-01-20': ['09:00', '10:00', '11:00', '15:00'],
  '2025-01-21': ['14:00', '16:00', '17:00'],
  '2025-01-22': ['09:00', '12:00', '18:00']
};

// Función para verificar si un horario está disponible
function isHorarioDisponible(fecha: string, horario: string): boolean {
  const horariosOcupados = HORARIOS_OCUPADOS[fecha] || [];
  return !horariosOcupados.includes(horario);
}

// Función para obtener horarios ocupados desde la API
async function fetchHorariosOcupados(fecha: string, categoria: string): Promise<string[]> {
  try {
    const response = await fetch(`/api/horarios?fecha=${fecha}&categoria=${encodeURIComponent(categoria)}`);
    if (response.ok) {
      const data = await response.json();
      return data.horariosOcupados || [];
    }
  } catch (error) {
    console.error('Error al obtener horarios ocupados:', error);
  }
  return [];
}

const ReservarContent = memo(function ReservarContent() {
  const params = useSearchParams();
  const seleccionQuery = params.get("seleccion") || "";

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    horario: "",
    tratamiento: "",
    terapeuta: "",
    notas: "",
    cantidad: 1,
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCalendario, setShowCalendario] = useState(false);
  const [showHorarios, setShowHorarios] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("corporales");
  const [tratamientoCargado, setTratamientoCargado] = useState(false);
  const [loadingTratamiento, setLoadingTratamiento] = useState(!!seleccionQuery);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  // Búsqueda ultra-optimizada sin re-renders
  const tratamientoEncontrado = useMemo(() => {
    return buscarTratamientoOptimizado(seleccionQuery);
  }, [seleccionQuery]);
  

  


  // Aplicar tratamiento encontrado inmediatamente
  useEffect(() => {
    if (tratamientoEncontrado) {
      setForm(prev => ({ ...prev, tratamiento: tratamientoEncontrado.id }));
      setCategoriaSeleccionada(tratamientoEncontrado.categoria);
      setTratamientoCargado(true);
      setLoadingTratamiento(false);
    } else if (seleccionQuery) {
      // Si hay query pero no se encuentra tratamiento, quitar loading
      setLoadingTratamiento(false);
    }
  }, [tratamientoEncontrado, seleccionQuery]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target as HTMLInputElement;
    // Normalizar teléfono: solo dígitos, sin espacios ni guiones
    if (name === 'telefono') {
      const digitsOnly = value.replace(/\D+/g, '');
      // Limitar a 10 dígitos (Colombia)
      const limited = digitsOnly.slice(0, 10);
      setForm({ ...form, telefono: limited });
      return;
    }
    setForm({ ...form, [name]: value });
  }

  async function handleDateSelect(date: string) {
    console.log(`Fecha seleccionada: ${date}`);
    console.log(`Tipo de fecha: ${typeof date}`);
    console.log(`Fecha actual: ${new Date().toISOString().split('T')[0]}`);
    
    setForm({ ...form, fecha: date, horario: '' }); // Limpiar horario al cambiar fecha
    setShowCalendario(false);
    setShowHorarios(true);
    
    // Cargar horarios ocupados para la fecha seleccionada
    setLoadingHorarios(true);
    try {
      // Determinar la categoría a partir del tratamiento seleccionado
      const cat = (getTratamientoSeleccionado()?.categoria as any) || categoriaSeleccionada;
      const ocupados = await fetchHorariosOcupados(date, cat);
      setHorariosOcupados(ocupados);
    } catch (error) {
      console.error('Error al cargar horarios ocupados:', error);
    } finally {
      setLoadingHorarios(false);
    }
  }

  function handleHorarioSelect(horario: string) {
    setForm({ ...form, horario });
    setShowHorarios(false);
  }

  function getTratamientoSeleccionado() {
    return Object.values(TRATAMIENTOS).flat().find(t => t.id === form.tratamiento);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    // Validar campos requeridos
    if (!form.nombre || !form.telefono || !form.fecha || !form.horario || !form.tratamiento) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }
    
    // Validar que el horario no haya pasado
    if (isHorarioPasado(form.fecha, form.horario)) {
      setError("El horario seleccionado ya ha pasado. Por favor selecciona otro horario.");
      return;
    }
    
    if (!window.confirm("¿Estás seguro de tu selección y tus datos?")) {
      return;
    }
    
    setLoading(true);
    try {
      const tratamiento = getTratamientoSeleccionado();
      if (!tratamiento) {
        setError("Tratamiento no encontrado");
        setLoading(false);
        return;
      }

      // Normalizar teléfono a E.164 (+57) para WhatsApp Cloud API
      const raw = form.telefono.replace(/\D+/g, '');
      const telefonoE164 = raw.startsWith('57') && raw.length === 12
        ? `+${raw}`
        : `+57${raw}`;

      const reservaData = {
        nombre: form.nombre,
        telefono: telefonoE164,
        fecha: form.fecha,
        horario: form.horario,
        tratamiento: tratamiento.nombre, // Enviar el nombre del tratamiento
        notas: form.notas || ""
      };

      console.log('Enviando reserva:', reservaData);

      const res = await fetch("/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Error al enviar la reserva");
        setLoading(false);
        return;
      }
      
      console.log('Reserva exitosa:', data);
      setEnviado(true);
    } catch (err: any) {
      console.error('Error en handleSubmit:', err);
      setError("Error al enviar la reserva: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const tratamiento = getTratamientoSeleccionado();

  return (
    <main style={{ 
      minHeight: "100vh", 
      background: "var(--spa-gradient-soft)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "var(--spa-spacing-md) var(--spa-spacing-lg)" // Más padding horizontal para centrado
    }}>
      <section style={{ 
        background: "#fff", 
        borderRadius: "var(--spa-border-radius)", 
        boxShadow: "var(--spa-shadow-medium)", 
        padding: "var(--spa-spacing-xl)", 
        minWidth: 400, 
        maxWidth: 600, 
        width: "100%", 
        color: 'var(--spa-text-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoración de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'var(--spa-gradient-primary)',
          borderRadius: '50%',
          opacity: 0.1,
          transform: 'translate(30px, -30px)'
        }}></div>

        {/* Botón para regresar */}
        <button
          onClick={() => window.history.back()}
          style={{
            background: 'transparent',
            color: 'var(--spa-text-secondary)',
            border: '1px solid var(--spa-border-color)',
            borderRadius: 'var(--spa-border-radius-small)',
            padding: 'var(--spa-spacing-sm) var(--spa-spacing-md)',
            fontSize: 14,
            cursor: 'pointer',
            marginBottom: 'var(--spa-spacing-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s',
            fontFamily: 'Montserrat, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--spa-light)';
            e.currentTarget.style.borderColor = 'var(--spa-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'var(--spa-border-color)';
          }}
        >
          ← Volver
        </button>

        {enviado ? (
          <div style={{ textAlign: 'center', padding: 'var(--spa-spacing-xxl) var(--spa-spacing-md)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--spa-spacing-md)' }}>✨</div>
            <h2 style={{ 
              color: 'var(--spa-primary)', 
              marginBottom: 'var(--spa-spacing-md)', 
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.8rem'
            }}>
              ¡Reserva Confirmada!
            </h2>
            <p style={{ 
              color: 'var(--spa-text-secondary)', 
              marginBottom: 'var(--spa-spacing-lg)', 
              lineHeight: 1.6 
            }}>
              Tu cita en el Spa Santa Armonía ha sido reservada exitosamente. 
              Te enviaremos un mensaje de WhatsApp con todos los detalles y 
              recomendaciones para tu tratamiento.
            </p>
            <p style={{
              color: 'var(--spa-text-secondary)',
              marginTop: '-8px',
              marginBottom: 'var(--spa-spacing-lg)',
              lineHeight: 1.5,
              fontSize: '12px',
              fontStyle: 'italic'
            }}>
              Nota: Si llegas con hasta 10 minutos de retraso, ese tiempo se descontará de tu sesión. Si llegas 15 minutos después de la hora agendada, no podremos atenderte ese día.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: 'var(--spa-gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--spa-border-radius-small)',
                padding: 'var(--spa-spacing-md) var(--spa-spacing-lg)',
                fontSize: 16,
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600',
                boxShadow: 'var(--spa-shadow-soft)'
              }}
            >
              Volver al Inicio
            </button>
          </div>
        ) : (
          <>
            <h1 style={{ 
              color: 'var(--spa-primary)', 
              marginBottom: 'var(--spa-spacing-lg)', 
              textAlign: 'center', 
              fontFamily: 'Montserrat, sans-serif', 
              fontSize: '2rem',
              fontWeight: '600'
            }}>
              Reservar Tratamiento Spa
            </h1>
            
            {loadingTratamiento && (
              <div style={{
                background: 'var(--spa-light)',
                color: 'var(--spa-text-primary)',
                padding: 'var(--spa-spacing-md)',
                borderRadius: 'var(--spa-border-radius-small)',
                marginBottom: 'var(--spa-spacing-lg)',
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.9rem',
                border: '1px solid var(--spa-accent)'
              }}>
                <div style={{ fontSize: '1.2rem', marginBottom: 'var(--spa-spacing-xs)' }}>⏳</div>
                Cargando tratamiento seleccionado...
              </div>
            )}

            {seleccionQuery && tratamientoCargado && !loadingTratamiento && (
              <div style={{
                background: 'var(--spa-success)',
                color: 'white',
                padding: 'var(--spa-spacing-md)',
                borderRadius: 'var(--spa-border-radius-small)',
                marginBottom: 'var(--spa-spacing-lg)',
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.9rem'
              }}>
                ✅ Tratamiento "{seleccionQuery}" preseleccionado. Completa tus datos para continuar.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spa-spacing-md)' }}>
              
              {/* Solo mostrar selección de tratamiento si no hay uno preseleccionado */}
              {!seleccionQuery && (
                <>
                  {/* Selección de tratamiento */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                      Categoría de Tratamiento *
                    </label>
                    <select
                      name="categoria"
                      value={categoriaSeleccionada}
                      onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                      style={{
                        width: '100%',
                        padding: 'var(--spa-spacing-md)',
                        border: '1px solid var(--spa-border-color)',
                        borderRadius: 'var(--spa-border-radius-small)',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        background: 'white',
                        color: 'var(--spa-text-primary)',
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      <option value="corporales">Tratamientos Corporales</option>
                      <option value="faciales">Tratamientos Faciales</option>
                      <option value="otros">Otros Servicios</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                      Tratamiento *
                    </label>
                    <select
                      name="tratamiento"
                      value={form.tratamiento}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spa-spacing-md)',
                        border: '1px solid var(--spa-border-color)',
                        borderRadius: 'var(--spa-border-radius-small)',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        background: 'white',
                        color: 'var(--spa-text-primary)',
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      <option value="">Selecciona un tratamiento</option>
                      {TRATAMIENTOS[categoriaSeleccionada as keyof typeof TRATAMIENTOS]?.map(tratamiento => (
                        <option key={tratamiento.id} value={tratamiento.id}>
                          {tratamiento.nombre} - {tratamiento.duracion}min - {tratamiento.precioEspecial ? tratamiento.precioEspecial : `$${tratamiento.precio.toLocaleString('es-CO')}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {tratamiento && !loadingTratamiento && (
                <div style={{ 
                  background: 'var(--spa-light)', 
                  padding: 'var(--spa-spacing-md)', 
                  borderRadius: 'var(--spa-border-radius-small)', 
                  border: '1px solid var(--spa-accent)',
                  marginBottom: 'var(--spa-spacing-md)'
                }}>
                  {seleccionQuery && (
                    <div style={{ 
                      background: 'var(--spa-primary)', 
                      color: 'white', 
                      padding: 'var(--spa-spacing-sm)', 
                      borderRadius: 'var(--spa-border-radius-small)', 
                      marginBottom: 'var(--spa-spacing-sm)',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      fontFamily: 'Montserrat, sans-serif'
                    }}>
                      ✨ Tratamiento preseleccionado
                    </div>
                  )}
                  {seleccionQuery && (
                    <div style={{ 
                      textAlign: 'center', 
                      marginBottom: 'var(--spa-spacing-sm)'
                    }}>
                      <button
                        type="button"
                        onClick={() => window.history.back()}
                        style={{
                          background: 'transparent',
                          color: 'var(--spa-primary)',
                          border: '1px solid var(--spa-primary)',
                          borderRadius: 'var(--spa-border-radius-small)',
                          padding: 'var(--spa-spacing-sm) var(--spa-spacing-md)',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          fontFamily: 'Montserrat, sans-serif',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--spa-primary)';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--spa-primary)';
                        }}
                      >
                        Cambiar Tratamiento
                      </button>
                    </div>
                  )}
                  <h4 style={{ color: 'var(--spa-primary)', marginBottom: 'var(--spa-spacing-sm)', fontFamily: 'Montserrat, sans-serif' }}>
                    {tratamiento.nombre}
                  </h4>
                  <p style={{ color: 'var(--spa-text-secondary)', fontSize: '0.9rem', lineHeight: 1.4, marginBottom: 'var(--spa-spacing-sm)' }}>
                    {tratamiento.descripcion}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--spa-text-secondary)', fontSize: '0.9rem' }}>
                      Duración: {tratamiento.duracion} minutos
                    </span>
                    <span style={{ color: 'var(--spa-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {tratamiento.precioEspecial ? tratamiento.precioEspecial : `$${tratamiento.precio.toLocaleString('es-CO')}`}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--spa-spacing-md)',
                    border: '1px solid var(--spa-border-color)',
                    borderRadius: 'var(--spa-border-radius-small)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-xs)', color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                  Teléfono *
                </label>
                <div style={{
                  marginBottom: 'var(--spa-spacing-sm)',
                  color: 'var(--spa-text-secondary)',
                  fontSize: '12px',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  Ingresa solo dígitos (ej. 311240XXXX). Sin espacios ni guiones.
                </div>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--spa-spacing-md)',
                    border: '1px solid var(--spa-border-color)',
                    borderRadius: 'var(--spa-border-radius-small)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
              </div>


              {/* Nota de puntualidad en datos de contacto */}
              <div style={{
                background: 'var(--spa-light)',
                border: '1px solid var(--spa-border-color)',
                borderRadius: 'var(--spa-border-radius-small)',
                padding: '10px',
                color: 'var(--spa-text-secondary)',
                fontSize: '12px',
                lineHeight: 1.5,
                fontFamily: 'Montserrat, sans-serif'
              }}>
                Nota: Si llegas con hasta 10 minutos de retraso, ese tiempo se descontará de tu sesión. Si llegas 15 minutos después de la hora agendada, no podremos atenderte ese día.
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                  Fecha de reserva *
                </label>
                {form.fecha && esHoy(form.fecha) && (
                  <div style={{
                    background: 'var(--spa-light)',
                    border: '1px solid var(--spa-accent)',
                    borderRadius: 'var(--spa-border-radius-small)',
                    padding: 'var(--spa-spacing-sm)',
                    marginBottom: 'var(--spa-spacing-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--spa-text-secondary)',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    📅 <strong>Hoy:</strong> Solo se mostrarán horarios futuros con un margen de 30 minutos
                  </div>
                )}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    required
                    placeholder="Selecciona una fecha"
                    readOnly
                    style={{
                      width: '100%',
                      padding: 'var(--spa-spacing-md)',
                      border: '1px solid var(--spa-border-color)',
                      borderRadius: 'var(--spa-border-radius-small)',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                      background: '#fff',
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                    onClick={() => setShowCalendario(!showCalendario)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCalendario(!showCalendario)}
                    style={{
                      position: 'absolute',
                      right: 'var(--spa-spacing-sm)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      cursor: 'pointer',
                      color: 'var(--spa-text-secondary)'
                    }}
                  >
                    📅
                  </button>
                </div>
                
                {showCalendario && (
                  <>
                    {/* Overlay de fondo */}
                    <div 
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 9998
                      }}
                      onClick={() => setShowCalendario(false)}
                    />
                                        {/* Modal del calendario */}
                  <div style={{
                      position: 'fixed',
                      top: '50%',
                    left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 9999,
                      background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
                      border: '2px solid var(--spa-primary)',
                      borderRadius: 'var(--spa-border-radius)',
                      boxShadow: '0 20px 60px rgba(139, 125, 155, 0.3)',
                      padding: '25px',
                      minWidth: '380px',
                      maxWidth: '420px',
                      animation: 'fadeInUp 0.3s ease-out'
                    }}>
                      <div style={{
                    display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        borderBottom: '2px solid var(--spa-accent)',
                        paddingBottom: '15px'
                      }}>
                        <h3 style={{ 
                          margin: 0, 
                          color: 'var(--spa-primary)', 
                          fontSize: '20px',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: '600'
                        }}>
                          📅 Selecciona una fecha
                        </h3>
                        <button
                          onClick={() => setShowCalendario(false)}
                          style={{
                            background: 'var(--spa-gradient-primary)',
                            border: 'none',
                            fontSize: '18px',
                            cursor: 'pointer',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: 'var(--spa-border-radius-small)',
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 125, 155, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    <Calendario
                      selectedDate={form.fecha}
                      onDateSelect={handleDateSelect}
                      categoria={categoriaSeleccionada}
                    />
                  </div>
                  </>
                )}
              </div>

              {form.fecha && (
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                    Horario *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="horario"
                      value={form.horario}
                      onChange={handleChange}
                      required
                      placeholder="Selecciona un horario"
                      readOnly
                      style={{
                        width: '100%',
                        padding: 'var(--spa-spacing-md)',
                        border: '1px solid var(--spa-border-color)',
                        borderRadius: 'var(--spa-border-radius-small)',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        background: '#fff',
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                      onClick={() => setShowHorarios(!showHorarios)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowHorarios(!showHorarios)}
                      style={{
                        position: 'absolute',
                        right: 'var(--spa-spacing-sm)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer',
                        color: 'var(--spa-text-secondary)'
                      }}
                    >
                      🕐
                    </button>
                  </div>
                  
                  {showHorarios && (
                    <>
                      {/* Overlay de fondo */}
                      <div 
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0,0,0,0.5)',
                          zIndex: 9998
                        }}
                        onClick={() => setShowHorarios(false)}
                      />
                      {/* Modal de horarios */}
                      <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                        background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
                        border: '2px solid var(--spa-primary)',
                        borderRadius: 'var(--spa-border-radius)',
                        boxShadow: '0 20px 60px rgba(139, 125, 155, 0.3)',
                        padding: '25px',
                        minWidth: '350px',
                        maxWidth: '400px',
                        animation: 'fadeInUp 0.3s ease-out'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '20px',
                          borderBottom: '2px solid var(--spa-accent)',
                          paddingBottom: '15px'
                        }}>
                          <h3 style={{ 
                            margin: 0, 
                            color: 'var(--spa-primary)', 
                            fontSize: '20px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600'
                          }}>
                            🕐 Selecciona un horario
                          </h3>
                          <button
                            onClick={() => setShowHorarios(false)}
                            style={{
                              background: 'var(--spa-gradient-primary)',
                              border: 'none',
                              fontSize: '18px',
                              cursor: 'pointer',
                              color: 'white',
                              padding: '8px 12px',
                              borderRadius: 'var(--spa-border-radius-small)',
                              transition: 'all 0.3s ease',
                              fontWeight: 'bold'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 125, 155, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            ✕
                          </button>
                        </div>
                        
                        {loadingHorarios ? (
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '40px',
                            color: 'var(--spa-text-secondary)',
                            fontFamily: 'Montserrat, sans-serif'
                          }}>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
                              <div>Cargando horarios disponibles...</div>
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '12px',
                            maxHeight: '300px',
                            overflowY: 'auto'
                          }}>
                          {obtenerHorariosPorFecha(form.fecha).map(horario => {
                            const isOcupado = horariosOcupados.includes(horario);
                            const isPasado = isHorarioPasado(form.fecha, horario);
                            const isDisponible = !isOcupado && !isPasado;
                            const isSeleccionado = form.horario === horario;
                            
                            return (
                              <button
                                key={horario}
                                type="button"
                                onClick={() => isDisponible && handleHorarioSelect(horario)}
                                disabled={!isDisponible}
                                style={{
                                  padding: '15px 12px',
                                  border: `2px solid ${isDisponible ? 'var(--spa-accent)' : 'var(--spa-error)'}`,
                                  background: isSeleccionado ? 'var(--spa-primary)' : 
                                             isDisponible ? 'white' : 'var(--spa-light)',
                                  color: isSeleccionado ? 'white' : 
                                         isDisponible ? 'var(--spa-text-primary)' : 'var(--spa-text-light)',
                                  borderRadius: 'var(--spa-border-radius-small)',
                                  cursor: isDisponible ? 'pointer' : 'not-allowed',
                                  fontSize: '16px',
                                  fontFamily: 'Montserrat, sans-serif',
                                  fontWeight: isSeleccionado ? 'bold' : 'normal',
                                  transition: 'all 0.3s ease',
                                  boxShadow: isSeleccionado ? '0 4px 12px rgba(139, 125, 155, 0.3)' : 
                                            isDisponible ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                  opacity: isDisponible ? 1 : 0.6,
                                  position: 'relative' as const
                                }}
                                onMouseEnter={(e) => {
                                  if (isDisponible && !isSeleccionado) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 125, 155, 0.2)';
                                    e.currentTarget.style.borderColor = 'var(--spa-primary)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (isDisponible && !isSeleccionado) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.borderColor = 'var(--spa-accent)';
                                  }
                                }}
                                title={isDisponible ? `Reservar ${horario}` : isPasado ? `Horario ya pasó` : `Horario ocupado`}
                              >
                                {horario}
                                {!isDisponible && (
                                  <span style={{
                                    position: 'absolute',
                                    top: '2px',
                                    right: '2px',
                                    fontSize: '10px',
                                    color: 'var(--spa-error)',
                                    fontWeight: 'bold'
                                  }}>
                                    {isPasado ? '⏰' : '✕'}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                          </div>
                        )}
                        
                        <div style={{
                          marginTop: '20px',
                          padding: '15px',
                          background: 'rgba(255,255,255,0.8)',
                          borderRadius: 'var(--spa-border-radius-small)',
                          border: '1px solid var(--spa-border-color)',
                          fontSize: '14px',
                          color: 'var(--spa-text-secondary)',
                          fontFamily: 'Montserrat, sans-serif'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                            <span>✅ Disponible</span>
                            <span>❌ Ocupado</span>
                            <span>⏰ Ya pasó</span>
                            <span>🟣 Seleccionado</span>
                          </div>
                          <p style={{ margin: '8px 0 0 0', textAlign: 'center', fontSize: '12px' }}>
                            💡 Horarios disponibles de lunes a sábado
                          </p>
                          {form.fecha && esHoy(form.fecha) && (
                            <p style={{ margin: '8px 0 0 0', textAlign: 'center', fontSize: '11px', color: 'var(--spa-error)' }}>
                              ⚠️ Algunos horarios ya han pasado para hoy
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

    

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600' }}>
                  Notas especiales
                </label>
                <textarea
                  name="notas"
                  value={form.notas}
                  onChange={handleChange}
                  placeholder="Alergias, preferencias, condiciones especiales..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: 'var(--spa-spacing-md)',
                    border: '1px solid var(--spa-border-color)',
                    borderRadius: 'var(--spa-border-radius-small)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    fontFamily: 'Montserrat, sans-serif',
                    resize: 'vertical'
                  }}
                />
              </div>

              {tratamiento && form.horario && (
                <div style={{ 
                  background: 'var(--spa-light)', 
                  padding: 'var(--spa-spacing-md)', 
                  borderRadius: 'var(--spa-border-radius-small)', 
                  border: '1px solid var(--spa-accent)',
                  marginBottom: 'var(--spa-spacing-md)'
                }}>
                  <h4 style={{ color: 'var(--spa-primary)', marginBottom: 'var(--spa-spacing-sm)', fontFamily: 'Montserrat, sans-serif' }}>
                    Resumen de la reserva:
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spa-spacing-xs)' }}>
                    <span>Tratamiento:</span>
                    <span>{tratamiento.nombre}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spa-spacing-xs)' }}>
                    <span>Fecha:</span>
                    <span>{form.fecha}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spa-spacing-xs)' }}>
                    <span>Horario:</span>
                    <span>{form.horario}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spa-spacing-xs)' }}>
                    <span>Duración:</span>
                    <span>{tratamiento.duracion} minutos</span>
                  </div>
                  <hr style={{ margin: 'var(--spa-spacing-sm) 0', border: 'none', borderTop: '1px solid var(--spa-accent)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'var(--spa-primary)' }}>
                    <span>Total:</span>
                    <span>{tratamiento.precioEspecial ? tratamiento.precioEspecial : `$${tratamiento.precio.toLocaleString('es-CO')}`}</span>
                  </div>
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: '#fff',
                    border: '1px dashed var(--spa-border-color)',
                    borderRadius: 'var(--spa-border-radius-small)',
                    color: 'var(--spa-text-secondary)',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    Importante: Si llegas con hasta 10 minutos de retraso, ese tiempo se descontará de tu sesión. Si llegas 15 minutos después de la hora agendada, no podremos atenderte ese día.
                  </div>
                </div>
              )}

              {error && (
                <div style={{ 
                  background: 'var(--spa-error)', 
                  color: 'white', 
                  padding: 'var(--spa-spacing-md)', 
                  borderRadius: 'var(--spa-border-radius-small)', 
                  border: '1px solid var(--spa-error)',
                  fontSize: '14px'
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !tratamiento || !form.horario}
                style={{
                  background: loading || !tratamiento || !form.horario ? 'var(--spa-text-light)' : 'var(--spa-gradient-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--spa-border-radius-small)',
                  padding: 'var(--spa-spacing-md)',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading || !tratamiento || !form.horario ? 'not-allowed' : 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  boxShadow: 'var(--spa-shadow-soft)',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? 'Reservando...' : 'Confirmar Reserva'}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
});

export default function ReservarPage() {
  return (
    <Suspense fallback={
      <main style={{ 
        minHeight: "100vh", 
        background: "var(--spa-gradient-soft)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{ textAlign: 'center', color: 'var(--spa-text-secondary)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--spa-spacing-md)' }}>✨</div>
          <p>Cargando...</p>
        </div>
      </main>
    }>
      <ReservarContent />
    </Suspense>
  );
} 