/**
 * Catálogo único de tratamientos (precios y duraciones) para reservas y panel admin.
 */

export const CATEGORIAS_TRATAMIENTO = ['corporales', 'otros', 'faciales'] as const;
export type CategoriaTratamiento = (typeof CATEGORIAS_TRATAMIENTO)[number];

export interface TratamientoDef {
  id: string;
  nombre: string;
  precio: number;
  /** Minutos (p. ej. total del paquete en corporales). */
  duracion: number;
  descripcion: string;
  precioEspecial?: string;
  /** Si existe: minutos por cita para cupos y solapes en agenda (paquetes corporales). */
  duracionAgenda?: number;
}

/** Duración que debe usarse para disponibilidad y campo `tratamiento_duracion` en reservas. */
export function duracionParaAgenda(t: TratamientoDef): number {
  return t.duracionAgenda ?? t.duracion;
}

export const ETIQUETA_CATEGORIA: Record<CategoriaTratamiento, string> = {
  corporales: 'Corporales (paquetes)',
  otros: 'Otros (depilación, masajes, etc.)',
  faciales: 'Faciales',
};

export const TRATAMIENTOS: Record<CategoriaTratamiento, TratamientoDef[]> = {
  corporales: [
    { id: 'masajes-reductores', nombre: 'Masajes Reductores', precio: 900000, duracion: 900, duracionAgenda: 60, descripcion: 'Tratamiento especializado para reducir grasa corporal y mejorar la silueta mediante técnicas avanzadas de masaje y aparatología. Paquete de 15 sesiones.' },
    { id: 'masajes-moldeadores', nombre: 'Masajes Moldeadores', precio: 750000, duracion: 720, duracionAgenda: 60, descripcion: 'Tratamiento especializado para moldear y tonificar el cuerpo, ideal para personas con poco tejido graso que buscan definir su figura. Paquete de 12 sesiones.' },
    { id: 'levantamiento-gluteos', nombre: 'Levantamiento de Glúteos', precio: 950000, duracion: 600, duracionAgenda: 60, descripcion: 'Tratamiento completo especializado para levantar, tonificar y dar forma a los glúteos mediante técnicas avanzadas. Paquete de 10 sesiones.' },
    { id: 'tratamiento-anticelulitis', nombre: 'Tratamiento Anticelulitis', precio: 800000, duracion: 600, duracionAgenda: 60, descripcion: 'Tratamiento especializado para combatir la celulitis mediante técnicas de drenaje linfático y electroestimulación. Paquete de 10 sesiones.' },
    { id: 'tensamax-corporal', nombre: 'Tensamax', precio: 0, duracion: 60, descripcion: 'Tratamiento corporal con protocolo Tensamax según indicación.', precioEspecial: 'Por definir' },
    { id: 'quemador-de-grasa', nombre: 'Quemador de grasa', precio: 0, duracion: 60, descripcion: 'Sesión focalizada en complemento reductor y modelado.', precioEspecial: 'Por definir' },
    { id: 'sesion-masaje-moldeador', nombre: 'Sesión de masaje moldeador', precio: 0, duracion: 60, descripcion: 'Sesión individual de masaje moldeador para tonificar y definir.', precioEspecial: 'Por definir' },
    { id: 'masaje-postoperatorio', nombre: 'Masaje postoperatorio', precio: 0, duracion: 60, descripcion: 'Masaje terapéutico adaptado al periodo de recuperación tras un procedimiento, según valoración y autorización.', precioEspecial: 'Por definir' },
  ],
  otros: [
    { id: 'depilacion-cejas', nombre: 'Depilación de Cejas', precio: 15000, duracion: 30, descripcion: 'Depilación profesional de cejas con cera para dar forma perfecta.' },
    { id: 'depilacion-bigote', nombre: 'Depilación de Bigote', precio: 8000, duracion: 20, descripcion: 'Depilación de vello facial superior con cera.' },
    { id: 'depilacion-barbilla', nombre: 'Depilación de Barbilla', precio: 22000, duracion: 25, descripcion: 'Depilación de vello en la zona de la barbilla.' },
    { id: 'depilacion-facial-completa', nombre: 'Depilación Facial Completa', precio: 45000, duracion: 45, descripcion: 'Depilación completa del rostro incluyendo cejas, bigote, barbilla y patillas.' },
    { id: 'depilacion-brazos', nombre: 'Depilación de Brazos', precio: 45000, duracion: 45, descripcion: 'Depilación completa de brazos con cera.' },
    { id: 'depilacion-piernas-completas', nombre: 'Depilación Piernas Completas', precio: 55000, duracion: 60, descripcion: 'Depilación completa de piernas con cera desde los muslos hasta los tobillos.' },
    { id: 'depilacion-media-pierna', nombre: 'Depilación Media Pierna', precio: 35000, duracion: 40, descripcion: 'Depilación de piernas desde la rodilla hasta el tobillo con cera.' },
    { id: 'depilacion-axilas', nombre: 'Depilación de Axilas', precio: 15000, duracion: 10, descripcion: 'Depilación de axilas con cera para una piel suave y sin vello.' },
    { id: 'depilacion-bikini', nombre: 'Depilación de Bikini', precio: 35000, duracion: 20, descripcion: 'Depilación de zona íntima con cera para una piel suave y sin vello.' },
    { id: 'depilacion-espalda', nombre: 'Depilación de Espalda', precio: 70000, duracion: 60, descripcion: 'Depilación completa de espalda con cera.' },
    { id: 'masaje-relajante', nombre: 'Masaje Relajante', precio: 120000, duracion: 60, descripcion: 'Masaje suave y relajante diseñado para reducir el estrés y promover la relajación profunda. Incluye aromaterapia, musicoterapia, piedras volcánicas y masaje manual.' },
    { id: 'masaje-descontracturante', nombre: 'Masaje Descontracturante', precio: 120000, duracion: 60, descripcion: 'Masaje profundo especializado para liberar tensiones y contracturas musculares. Incluye vacunoterapia, masajeador eléctrico y masaje manual con presión.' },
    { id: 'valoracion', nombre: 'Valoración', precio: 0, duracion: 20, descripcion: 'Consulta especializada para evaluar tus necesidades y determinar el mejor tratamiento facial o corporal según tu tipo de piel y objetivos.', precioEspecial: 'Sin costo' },
    { id: 'cauterizacion-verrugas', nombre: 'Cauterización de Verrugas', precio: 0, duracion: 30, descripcion: 'Tratamiento especializado para la eliminación segura de verrugas y lunares mediante técnicas de cauterización.', precioEspecial: 'Según valoración' },
    { id: 'lipo-papada', nombre: 'Lipo Papada', precio: 0, duracion: 60, descripcion: 'Tratamiento de liposucción de papada a través de quemadores de grasa especializados.', precioEspecial: 'Según valoración' },
    { id: 'lispoflas', nombre: 'Lispoflas', precio: 0, duracion: 60, descripcion: 'Tratamiento especializado para la reducción de grasa localizada mediante técnicas avanzadas.', precioEspecial: 'Según valoración' },
    { id: 'suero-terapia', nombre: 'SUERO TERAPIA', precio: 0, duracion: 45, descripcion: 'Cada suero es indicado para una necesidad específica. Tipos: Reductor, Antiedad, Inmunológico, Desintoxicante, Energéticos, Hidratante, Vitalidad, entre otros.', precioEspecial: 'De acuerdo al suero' },
  ],
  faciales: [
    { id: 'limpieza-facial-profunda', nombre: 'LIMPIEZA FACIAL PROFUNDA', precio: 120000, duracion: 60, descripcion: 'Tratamiento completo de limpieza facial que elimina impurezas y células muertas para una piel radiante y saludable' },
    { id: 'plasma-rico-plaquetas', nombre: 'PLASMA RICO EN PLAQUETAS', precio: 120000, duracion: 60, descripcion: 'Tratamiento terapéutico derivado de la sangre que estimula la regeneración celular y mejora la textura de la piel' },
    { id: 'toxina-botulinica', nombre: 'TOXINA BOTULÍNICA (BOTOX)', precio: 0, duracion: 60, descripcion: 'La toxina botulínica es una sustancia derivada de una bacteria llamada Clostridium botulinum, conocida por detener la movilidad de los músculos faciales de manera temporal', precioEspecial: 'Según valoración' },
    { id: 'rejuvenecimiento-facial-3d', nombre: 'REJUVENECIMIENTO FACIAL EN 3D', precio: 0, duracion: 90, descripcion: 'Es una combinación de diferentes procedimientos que ayudarán a devolver la juventud en tu rostro', precioEspecial: 'Según valoración' },
    { id: 'tratamiento-despigmentante', nombre: 'TRATAMIENTO DESPIGMENTANTE (ANTI MANCHAS)', precio: 120000, duracion: 45, descripcion: 'Tratamiento basado en aplicación de diferentes principios activos para mejorar la apariencia de los melasmas y prevenir su aparición' },
    { id: 'tratamiento-anti-acne', nombre: 'TRATAMIENTO ANTI ACNÉ', precio: 110000, duracion: 45, descripcion: 'Tratamiento basado en la aplicación de diferentes principios activos para mejorar los diferentes tipos de acné y prevenir su proliferación' },
    { id: 'tratamiento-anti-edad', nombre: 'TRATAMIENTO ANTI EDAD', precio: 130000, duracion: 45, descripcion: 'Tratamiento basado en la aplicación de diferentes principios activos indicados para mejorar los signos de envejimiento de la piel' },
    { id: 'relleno-labios', nombre: 'RELLENO DE LABIOS CON ÁCIDO HIALURÓNICO', precio: 750000, duracion: 60, descripcion: 'Procedimiento no quirúrgico que se realiza mediante la inyección de ácido hialurónico, sustancia segura y reabsorbible' },
    { id: 'tensamax-facial', nombre: 'Tensamax facial', precio: 0, duracion: 60, descripcion: 'Tratamiento facial con protocolo Tensamax según indicación.', precioEspecial: 'Por definir' },
    { id: 'hidratacion-facial', nombre: 'Hidratación facial', precio: 0, duracion: 60, descripcion: 'Hidratación profunda para devolver confort y luminosidad al rostro.', precioEspecial: 'Por definir' },
    { id: 'peeling', nombre: 'Peeling', precio: 0, duracion: 60, descripcion: 'Exfoliación facial según tipo de piel y objetivo, definido en valoración.', precioEspecial: 'Por definir' },
    { id: 'microdermoabrasion', nombre: 'Microdermoabrasión', precio: 0, duracion: 60, descripcion: 'Renovación superficial de la piel para mejorar textura y luminosidad.', precioEspecial: 'Por definir' },
  ],
};

export type TratamientoConCategoria = TratamientoDef & { categoria: CategoriaTratamiento };

export function getTratamientoById(id: string): TratamientoConCategoria | null {
  for (const categoria of CATEGORIAS_TRATAMIENTO) {
    const t = TRATAMIENTOS[categoria].find((x) => x.id === id);
    if (t) return { ...t, categoria };
  }
  return null;
}

/** Coincide nombre guardado en BD con el catálogo (mayúsculas/formato distinto). */
export function findTratamientoIdFromNombreGuardado(nombreDb: string): {
  id: string;
  categoria: CategoriaTratamiento;
} | null {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  const target = norm(nombreDb || '');
  if (!target) return null;
  for (const categoria of CATEGORIAS_TRATAMIENTO) {
    for (const t of TRATAMIENTOS[categoria]) {
      if (norm(t.nombre) === target || norm(formatNombreServicio(t.nombre)) === target) {
        return { id: t.id, categoria };
      }
    }
  }
  return null;
}

export function textoPrecioCatalogo(t: TratamientoDef): string {
  if (t.precioEspecial) return t.precioEspecial;
  return `$${t.precio.toLocaleString('es-CO')}`;
}

export function formatNombreServicio(nombre: string): string {
  if (!nombre) return nombre;
  const tokens = nombre.trim().split(/\s+/g);
  const mapped = tokens.map((tok) => {
    // Mantener tokens con números (ej. 3D) tal cual
    if (/\d/.test(tok)) return tok;
    const lower = tok.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
  return mapped.join(' ');
}
