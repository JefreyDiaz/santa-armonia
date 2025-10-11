'use client';

import Link from 'next/link';
import Image from 'next/image';

const tratamientosCorporales = [
  {
    id: 'masajes-reductores',
    nombre: 'Masajes Reductores',
    indicacion: 'INDICADO PARA PERSONAS CON ALTO ÍNDICE DE GRASA',
    paquete: '15 SESIONES',
    precio: 900000,
    descripcion: 'Tratamiento especializado para reducir grasa corporal y mejorar la silueta mediante técnicas avanzadas de masaje y aparatología.',
    incluye: [
      'Desintoxicación intramuscular',
      'Quemadores de grasa',
      'Aparatología según la necesidad',
      'Carboxiterapia',
      'Masaje manual',
      'Maderoterapia',
      'Otros'
    ],
    imagen: '/images/Servicios/masaje/WIL_5213.jpg',
    condiciones: 'Aplica condiciones y restricciones'
  },
  {
    id: 'masajes-moldeadores',
    nombre: 'Masajes Moldeadores',
    indicacion: 'INDICADO PARA PERSONAS CON POCO TEJIDO GRASO',
    paquete: '12 SESIONES',
    precio: 750000,
    descripcion: 'Tratamiento especializado para moldear y tonificar el cuerpo, ideal para personas con poco tejido graso que buscan definir su figura.',
    incluye: [
      'Masajes manuales',
      'Maderoterapia',
      'Carboxiterapia',
      'Aparatología de acuerdo a la necesidad',
      'Otros'
    ],
    imagen: '/images/Servicios/masaje/WIL_5194.jpg',
    condiciones: 'Aplica condiciones y restricciones'
  },
  {
    id: 'levantamiento-gluteos',
    nombre: 'Levantamiento de Glúteos',
    paquete: '10 SESIONES',
    precio: 950000,
    descripcion: 'Tratamiento completo especializado para levantar, tonificar y dar forma a los glúteos mediante técnicas avanzadas.',
    incluye: [
      'Masaje manual',
      'Aparatología indicada',
      'Aplicación de peptonas',
      'Aplicación de vitamina C'
    ],
    imagen: '/images/Servicios/masaje/WIL_5181.jpg',
    condiciones: 'Aplica condiciones y restricciones'
  },
  {
    id: 'tratamiento-anticelulitis',
    nombre: 'Tratamiento Anticelulitis',
    paquete: '10 SESIONES',
    precio: 800000,
    descripcion: 'Tratamiento especializado para combatir la celulitis mediante técnicas de drenaje linfático y electroestimulación.',
    incluye: [
      'Drenaje linfático',
      'Tenjamax',
      'Electroestimulación',
      'Principios activos indicados'
    ],
    imagen: '/images/Servicios/masaje/WIL_5156.jpg',
    condiciones: 'Aplica condiciones y restricciones'
  }
];

// Las depilaciones corporales se movieron a /services/otros

// Los masajes relajantes y descontracturantes se movieron a /services/otros

// Los otros servicios se movieron a /services/otros

export default function CorporalesPage() {
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
            ← Volver a Inicio
          </button>
        </Link>
        <h1 style={{
          fontSize: '3rem',
          color: 'var(--spa-primary)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '600',
          marginBottom: 'var(--spa-spacing-md)',
          paddingTop: '60px',
        }}>
          Tratamientos Corporales
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--spa-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Descubre nuestros tratamientos corporales especializados diseñados para 
          moldear, tonificar y mejorar tu figura con técnicas avanzadas.
        </p>
      </div>

      {/* Tratamientos Corporales */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--spa-spacing-md)',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: 'var(--spa-primary)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 'var(--spa-spacing-xl)',
        }}>
          Paquetes de Tratamientos
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'var(--spa-spacing-xl)',
          marginBottom: 'var(--spa-spacing-xxl)',
        }}>
          {tratamientosCorporales.map((tratamiento) => (
            <div
              key={tratamiento.id}
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
              <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}><Image src={tratamiento.imagen} alt={tratamiento.nombre} fill style={{ objectFit: 'cover' }} quality={85} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /></div>
              <div style={{ 
                padding: 'var(--spa-spacing-lg)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <div style={{
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  <h3 style={{
                    margin: '0 0 var(--spa-spacing-sm) 0',
                    color: 'var(--spa-primary)',
                    fontSize: '1.5rem',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                  }}>
                    {tratamiento.nombre}
                  </h3>
                  
                  {tratamiento.indicacion && (
                    <p style={{
                      color: 'var(--spa-text-light)',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      marginBottom: 'var(--spa-spacing-sm)',
                    }}>
                      {tratamiento.indicacion}
                    </p>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spa-spacing-sm)',
                  }}>
                    <span style={{
                      color: 'var(--spa-primary)',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                    }}>
                      {tratamiento.paquete}
                    </span>
                    <span style={{
                      color: 'var(--spa-primary)',
                      fontWeight: '700',
                      fontSize: '1.3rem',
                    }}>
                      ${tratamiento.precio.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>

                <p style={{
                  color: 'var(--spa-text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  {tratamiento.descripcion}
                </p>

                <div style={{ marginBottom: 'var(--spa-spacing-md)' }}>
                  <h4 style={{
                    color: 'var(--spa-text-primary)',
                    fontSize: '1.1rem',
                    marginBottom: 'var(--spa-spacing-sm)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                  }}>
                    Incluye:
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}>
                    {tratamiento.incluye.map((item, index) => (
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

                <p style={{
                  color: 'var(--spa-text-light)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  {tratamiento.condiciones}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: 'var(--spa-spacing-md)' }}>
                  <Link
                    href={`/reservar?seleccion=${encodeURIComponent(tratamiento.nombre)}`}
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
                      Reservar {tratamiento.nombre}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Las depilaciones corporales se movieron a /services/otros */}

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
            ¿Necesitas asesoría personalizada?
          </h2>
          <p style={{
            color: 'var(--spa-text-secondary)',
            fontSize: '1.1rem',
            marginBottom: 'var(--spa-spacing-lg)',
            maxWidth: '600px',
            margin: '0 auto var(--spa-spacing-lg) auto',
          }}>
            Nuestras especialistas te ayudarán a elegir el tratamiento perfecto 
            según tus necesidades y objetivos específicos.
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
              Consultar Disponibilidad
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

