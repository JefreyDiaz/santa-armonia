'use client';

import Link from 'next/link';
import Image from 'next/image';

const faciales = [
  {
    id: 'limpieza-facial-profunda',
    nombre: 'LIMPIEZA FACIAL PROFUNDA',
    precio: 120000,
    duracion: 60,
    descripcion: 'Tratamiento completo de limpieza facial que elimina impurezas y células muertas para una piel radiante y saludable.',
    beneficios: [
      'Elimina impurezas y células muertas',
      'Mejora la textura de la piel',
      'Facilita la penetración de principios activos en la piel',
      'Rejuvenece',
      'Brinda salud y bienestar a tu piel'
    ],
    imagen: '/images/Servicios/Facial/WIL_5066.jpg',
    incluye: [
      'Higiénizacion',
      'Exfoliacion',
      'Mascarilla desincrustante',
      'Vapor ozono',
      'Peeling ultrasónico',
      'Extracción de puntos negros y acné',
      'Alta frecuencia',
      'Mascarilla según tipo de piel',
      'Camara foto dinámica',
      'Hidratación facial',
      'Pantalla solar'
    ]
  },
  {
    id: 'plasma-rico-plaquetas',
    nombre: 'PLASMA RICO EN PLAQUETAS',
    precio: 120000,
    duracion: 60,
    descripcion: 'Tratamiento terapéutico derivado de la sangre que estimula la regeneración celular y mejora la textura de la piel.',
    beneficios: [
      'Mejora la textura de la piel',
      'Ayuda a mejorar las líneas de expresión',
      'Estimula producción de colágeno y elastina',
      'Rejuvenece tu rostro',
      'Ayuda a controlar la caída del cabello'
    ],
    imagen: '/images/Servicios/Facial/WIL_5059.jpg',
    incluye: [
      'Extracción de sangre',
      'Proceso de centrífuga',
      'Aplicación en zonas necesarias',
      'Rostro, cuello, manos o cuero cabelludo'
    ]
  },
  {
    id: 'toxina-botulinica',
    nombre: 'TOXINA BOTULÍNICA (BOTOX)',
    precio: 0, // Según valoración
    duracion: 60,
    descripcion: 'La toxina botulínica es una sustancia derivada de una bacteria llamada Clostridium botulinum, conocida por detener la movilidad de los músculos faciales de manera temporal.',
    beneficios: [
      'Detiene la movilidad de músculos faciales',
      'Retrasa los signos de envejecimiento',
      'Efecto temporal y seguro',
      'También usado con fines terapéuticos'
    ],
    imagen: '/images/Servicios/Facial/_MG_0059.jpg',
    incluye: [
      'Evaluación personalizada',
      'Aplicación de toxina botulínica',
      'Seguimiento post-tratamiento',
      'Valoración según necesidades'
    ],
    precioEspecial: 'Según valoración'
  },
  {
    id: 'rejuvenecimiento-facial-3d',
    nombre: 'REJUVENECIMIENTO FACIAL EN 3D',
    precio: 0, // Según valoración
    duracion: 90,
    descripcion: 'Es una combinación de diferentes procedimientos que ayudarán a devolver la juventud en tu rostro.',
    beneficios: [
      'Devuelve la juventud al rostro',
      'Combinación de tratamientos avanzados',
      'Resultados naturales y duraderos',
      'Tratamiento personalizado'
    ],
    imagen: '/images/Servicios/Facial/WIL_5119.jpg',
    incluye: [
      'Ácido hialurónico de hidratación',
      'TOXINA BOTULÍNICA',
      'Hilos tensores',
      'Ácido hialurónico reticulado (relleno)'
    ],
    precioEspecial: 'Según valoración'
  },
  {
    id: 'tratamiento-despigmentante',
    nombre: 'TRATAMIENTO DESPIGMENTANTE (ANTI MANCHAS)',
    precio: 120000,
    duracion: 45,
    descripcion: 'Tratamiento basado en aplicación de diferentes principios activos para mejorar la apariencia de los melasmas y prevenir su aparición.',
    beneficios: [
      'Mejora la apariencia de melasmas',
      'Previene la aparición de manchas',
      'Tratamiento personalizado',
      'Resultados visibles'
    ],
    imagen: '/images/Servicios/Facial/antimanchas.jpg',
    incluye: [
      'Evaluación de manchas',
      'Aplicación de principios activos',
      'Tratamiento personalizado',
      'Seguimiento de sesiones'
    ],
    nota: 'Número de sesiones según la necesidad de cada paciente. Aplica condiciones y restricciones.'
  },
  {
    id: 'tratamiento-anti-acne',
    nombre: 'TRATAMIENTO ANTI ACNÉ',
    precio: 110000,
    duracion: 45,
    descripcion: 'Tratamiento basado en la aplicación de diferentes principios activos para mejorar los diferentes tipos de acné y prevenir su proliferación.',
    beneficios: [
      'Mejora diferentes tipos de acné',
      'Previene la proliferación',
      'Tratamiento específico',
      'Resultados duraderos'
    ],
    imagen: '/images/Servicios/Facial/_MG_0024.jpg',
    incluye: [
      'Evaluación del tipo de acné',
      'Aplicación de principios activos',
      'Tratamiento personalizado',
      'Prevención de proliferación'
    ],
    nota: 'Número de sesiones según la necesidad de cada paciente. Aplica condiciones y restricciones.'
  },
  {
    id: 'tratamiento-anti-edad',
    nombre: 'TRATAMIENTO ANTI EDAD',
    precio: 130000,
    duracion: 45,
    descripcion: 'Tratamiento basado en la aplicación de diferentes principios activos indicados para mejorar los signos de envejecimiento de la piel.',
    beneficios: [
      'Mejora signos de envejecimiento',
      'Devuelve hidratación y elastina',
      'Mejora líneas de expresión',
      'Reduce la flacidez',
      'Devuelve luminosidad y brillo natural'
    ],
    imagen: '/images/Servicios/Facial/antiedad.jpg',
    incluye: [
      'Evaluación de signos de envejecimiento',
      'Aplicación de principios activos',
      'Tratamiento personalizado',
      'Seguimiento de resultados'
    ],
    nota: 'Número de sesiones según la necesidad de cada paciente. Aplica condiciones y restricciones.'
  },
  {
    id: 'relleno-labios',
    nombre: 'RELLENO DE LABIOS CON ÁCIDO HIALURÓNICO',
    precio: 750000,
    duracion: 60,
    descripcion: 'Procedimiento no quirúrgico que se realiza mediante la inyección de ácido hialurónico, sustancia segura y reabsorbible.',
    beneficios: [
      'Mejora volumen de labios',
      'Mejora forma y simetría',
      'Define el contorno labial',
      'Resultados naturales',
      'Sustancia segura y reabsorbible'
    ],
    imagen: '/images/Servicios/Facial/acido-hialuronico.jpg',
    incluye: [
      'Evaluación de labios',
      'Aplicación cuidadosa en puntos estratégicos',
      'Mejora de volumen, forma y simetría',
      'Definición del contorno'
    ]
  },
  {
    id: 'depilacion-cejas',
    nombre: 'DEPILACIÓN CON CERA - CEJAS',
    precio: 15000,
    duracion: 15,
    descripcion: 'Depilación con cera especializada para cejas, definiendo la forma perfecta para tu rostro.',
    beneficios: [
      'Define la forma de las cejas',
      'Resultado limpio y duradero',
      'Técnica profesional',
      'Cuidado de la piel'
    ],
    imagen: '/images/Servicios/Facial/0038a5750b4f8c517163a5e507f4866e-xlarge.jpg',
    incluye: [
      'Limpieza del área',
      'Depilación con cera',
      'Definición de forma',
      'Cuidado post-depilación'
    ]
  },
  {
    id: 'depilacion-bigote',
    nombre: 'DEPILACIÓN CON CERA - BIGOTE',
    precio: 7000,
    duracion: 10,
    descripcion: 'Depilación con cera para el área del bigote, dejando la piel suave y sin vello.',
    beneficios: [
      'Piel suave y sin vello',
      'Resultado duradero',
      'Técnica profesional',
      'Cuidado de la piel'
    ],
    imagen: '/images/Servicios/Facial/cb1f7291e94b748603a7a3cfe036c275-xxlarge.jpg',
    incluye: [
      'Limpieza del área',
      'Depilación con cera',
      'Cuidado post-depilación'
    ]
  },
  {
    id: 'depilacion-nariz',
    nombre: 'DEPILACIÓN CON CERA - NARIZ',
    precio: 10000,
    duracion: 10,
    descripcion: 'Depilación con cera para el área de la nariz, eliminando vello no deseado.',
    beneficios: [
      'Elimina vello no deseado',
      'Piel suave',
      'Resultado duradero',
      'Técnica profesional'
    ],
    imagen: '/images/Servicios/Facial/1641d0e14126d0d9f943bccd767dcb50-xxlarge.jpg',
    incluye: [
      'Limpieza del área',
      'Depilación con cera',
      'Cuidado post-depilación'
    ]
  } 
  
];

export default function FacialesPage() {
  return (
    <main style={{
      background: 'var(--spa-gradient-soft)',
      minHeight: '100vh',
      padding: 'var(--spa-spacing-xl) 0',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--spa-spacing-md)',
        textAlign: 'center',
        marginBottom: 'var(--spa-spacing-xxl)',
        position: 'relative',
      }}>
        {/* Botón Regresar */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'var(--spa-gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--spa-border-radius-small)',
              padding: 'var(--spa-spacing-sm) var(--spa-spacing-md)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              boxShadow: 'var(--spa-shadow-soft)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--spa-shadow-soft)';
            }}
          >
            ← Volver al Inicio
          </button>
        </Link>
        <h1 style={{
          fontSize: '3rem',
          color: 'var(--spa-primary)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '600',
          marginBottom: 'var(--spa-spacing-md)',
          paddingTop: '60px', // Espacio para el botón en móvil
        }}>
          Tratamientos Faciales
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--spa-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Descubre nuestros tratamientos faciales especializados diseñados para 
          rejuvenecer, hidratar y mantener tu piel radiante y saludable.
        </p>
      </div>

      {/* Servicios */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--spa-spacing-md)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'var(--spa-spacing-xl)',
          marginBottom: 'var(--spa-spacing-xxl)',
          justifyContent: 'center', // Centrar el grid en móvil
        }}>
          {faciales.map((facial) => (
            <div
              key={facial.id}
              style={{
                background: 'white',
                borderRadius: 'var(--spa-border-radius)',
                overflow: 'hidden',
                boxShadow: 'var(--spa-shadow-medium)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
              }}
            >
              <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                <Image
                  src={facial.imagen}
                  alt={facial.nombre}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div style={{ 
                padding: 'var(--spa-spacing-lg)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <div style={{
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  <h2 style={{
                    margin: '0 0 var(--spa-spacing-sm) 0',
                    color: 'var(--spa-primary)',
                    fontSize: '1.5rem',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                  }}>
                    {facial.nombre}
                  </h2>
                  <span style={{
                    color: 'var(--spa-primary)',
                    fontWeight: '600',
                    fontSize: '1.3rem',
                    display: 'block',
                  }}>
                    {facial.precioEspecial ? facial.precioEspecial : `$${facial.precio.toLocaleString('es-CO')}`}
                  </span>
                </div>

                <p style={{
                  color: 'var(--spa-text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  {facial.descripcion}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  <span style={{
                    color: 'var(--spa-text-light)',
                    fontSize: '0.9rem',
                  }}>
                    ⏱️ {facial.duracion} minutos
                  </span>
                </div>

                <div style={{ marginBottom: 'var(--spa-spacing-md)' }}>
                  <h3 style={{
                    color: 'var(--spa-text-primary)',
                    fontSize: '1.1rem',
                    marginBottom: 'var(--spa-spacing-sm)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                  }}>
                    Beneficios:
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}>
                    {facial.beneficios.map((beneficio, index) => (
                      <li key={index} style={{
                        color: 'var(--spa-text-secondary)',
                        fontSize: '0.9rem',
                        marginBottom: '4px',
                        paddingLeft: '20px',
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--spa-primary)',
                        }}>
                          ✓
                        </span>
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: 'var(--spa-spacing-lg)' }}>
                  <h3 style={{
                    color: 'var(--spa-text-primary)',
                    fontSize: '1.1rem',
                    marginBottom: 'var(--spa-spacing-sm)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                  }}>
                    Incluye:
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}>
                    {facial.incluye.map((item, index) => (
                      <li key={index} style={{
                        color: 'var(--spa-text-secondary)',
                        fontSize: '0.9rem',
                        marginBottom: '4px',
                        paddingLeft: '20px',
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--spa-primary)',
                        }}>
                          ✨
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {facial.nota && (
                  <div style={{ 
                    marginBottom: 'var(--spa-spacing-md)',
                    padding: 'var(--spa-spacing-sm)',
                    background: 'rgba(139, 125, 155, 0.1)',
                    borderRadius: 'var(--spa-border-radius-small)',
                    border: '1px solid rgba(139, 125, 155, 0.2)'
                  }}>
                    <p style={{
                      color: 'var(--spa-text-secondary)',
                      fontSize: '0.85rem',
                      margin: 0,
                      fontStyle: 'italic',
                    }}>
                      <strong>Nota:</strong> {facial.nota}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: 'var(--spa-spacing-md)' }}>
                  <Link
                    href={`/reservar?seleccion=${encodeURIComponent(facial.nombre)}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      style={{
                        width: '100%',
                        background: 'var(--spa-gradient-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--spa-border-radius-small)',
                        padding: 'var(--spa-spacing-md)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: 'Montserrat, sans-serif',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Reservar {facial.nombre}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          background: 'white',
          borderRadius: 'var(--spa-border-radius)',
          padding: 'var(--spa-spacing-xl)',
          boxShadow: 'var(--spa-shadow-medium)',
        }}>
          <h2 style={{
            color: 'var(--spa-primary)',
            fontSize: '2rem',
            marginBottom: 'var(--spa-spacing-md)',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
          }}>
            ¿Cuál es tu tipo de piel?
          </h2>
          <p style={{
            color: 'var(--spa-text-secondary)',
            fontSize: '1.1rem',
            marginBottom: 'var(--spa-spacing-lg)',
            maxWidth: '600px',
            margin: '0 auto var(--spa-spacing-lg) auto',
          }}>
            Nuestras esteticistas expertas evaluarán tu piel y te recomendarán 
            el tratamiento facial más adecuado para tus necesidades específicas.
          </p>
          <Link href="/reservar?seleccion=Valoración" style={{ textDecoration: 'none' }}>
            <button
              style={{
                background: 'var(--spa-gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--spa-border-radius-small)',
                padding: 'var(--spa-spacing-md) var(--spa-spacing-lg)',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                boxShadow: 'var(--spa-shadow-soft)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--spa-shadow-soft)';
              }}
            >
              Evaluación de Piel Gratuita
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
