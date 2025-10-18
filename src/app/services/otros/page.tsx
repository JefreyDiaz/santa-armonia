'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Servicios de depilación para el modal
const serviciosDepilacion = [
  {
    id: 'depilacion-cejas',
    nombre: 'Depilación de Cejas',
    categoria: 'Facial',
    colorCategoria: '#8B5CF6',
    descripcion: 'Depilación profesional de cejas con cera para dar forma perfecta.',
    duracion: '30 minutos',
    precio: 15000,
  },
  {
    id: 'depilacion-bigote',
    nombre: 'Depilación de Bigote',
    categoria: 'Facial',
    colorCategoria: '#8B5CF6',
    descripcion: 'Depilación de vello facial superior con cera.',
    duracion: '20 minutos',
    precio: 8000,
  },
  {
    id: 'depilacion-axilas',
    nombre: 'Depilación de Axilas',
    categoria: 'Corporal',
    colorCategoria: '#10B981',
    descripcion: 'Depilación de axilas con cera para una piel suave y sin vello.',
    duracion: '10 minutos',
    precio: 15000,
  },
  {
    id: 'depilacion-piernas-completas',
    nombre: 'Depilación Piernas Completas',
    categoria: 'Corporal',
    colorCategoria: '#10B981',
    descripcion: 'Depilación completa de piernas con cera desde los muslos hasta los tobillos.',
    duracion: '60 minutos',
    precio: 55000,
  },
  {
    id: 'depilacion-media-pierna',
    nombre: 'Depilación Media Pierna',
    categoria: 'Corporal',
    colorCategoria: '#10B981',
    descripcion: 'Depilación de piernas desde la rodilla hasta el tobillo con cera.',
    duracion: '40 minutos',
    precio: 35000,
  },
  {
    id: 'depilacion-bikini',
    nombre: 'Depilación de Bikini',
    categoria: 'Corporal',
    colorCategoria: '#10B981',
    descripcion: 'Depilación de zona íntima con cera para una piel suave y sin vello.',
    duracion: '20 minutos',
    precio: 35000,
  }
];

// Masajes relajantes y descontracturantes (movidos desde corporales)
const masajesRelajantes = [
  {
    id: 'masaje-relajante',
    nombre: 'Masaje Relajante',
    indicacion: 'INDICADO PARA ALIVIAR TENSIONES FÍSICAS Y EMOCIONALES',
    duracion: '60 minutos',
    precio: 120000,
    descripcion: 'Masaje suave y relajante diseñado para reducir el estrés y promover la relajación profunda.',
    incluye: [
      'Aromaterapia',
      'Musicoterapia',
      'Piedras volcánicas',
      'Masaje manual'
    ],
    imagen: '/images/Servicios/masaje/WIL_5045.jpg'
  },
  {
    id: 'masaje-descontracturante',
    nombre: 'Masaje Descontracturante',
    duracion: '60 minutos',
    precio: 120000,
    descripcion: 'Masaje profundo especializado para liberar tensiones y contracturas musculares.',
    incluye: [
      'Vacunoterapia',
      'Masajeador eléctrico',
      'Masaje manual con presión'
    ],
    imagen: '/images/Servicios/masaje/WIL_5191.jpg'
  }
];

// Otros servicios especializados
const otrosServiciosEspecializados = [
  {
    id: 'valoracion',
    nombre: 'Valoración',
    indicacion: 'FACIAL O CORPORAL',
    duracion: '20 minutos',
    precio: 0,
    descripcion: 'Consulta especializada para evaluar tus necesidades y determinar el mejor tratamiento facial o corporal según tu tipo de piel y objetivos.',
    precioEspecial: '$ Sin costo',
    imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0007.jpg'
  },
  {
    id: 'cauterizacion-verrugas',
    nombre: 'Cauterización de Verrugas',
    indicacion: 'SEGÚN VALORACIÓN MÉDICA',
    descripcion: 'Tratamiento especializado para la eliminación segura de verrugas y lunares mediante técnicas de cauterización.',
    precio: '$ Según valoración',
    imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0007.jpg'
  },
  {
    id: 'lipo-papada',
    nombre: 'Lipo Papada',
    descripcion: 'Tratamiento de liposucción de papada a través de quemadores de grasa especializados.',
    precio: '$ Según valoración',
    imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0009.jpg'
  },
  {
    id: 'lispoflas',
    nombre: 'Lispoflas',
    descripcion: 'Tratamiento especializado para la reducción de grasa localizada mediante técnicas avanzadas.',
    precio: '$ Según valoración',
    imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0009.jpg'
  }
];

// Suero terapia
const sueroTerapia = {
  nombre: 'SUERO TERAPIA',
  descripcion: 'Cada suero es indicado para una necesidad específica.',
  tipos: [
    'Reductor',
    'Antiedad',
    'Inmunológico',
    'Desintoxicante',
    'Energéticos',
    'Hidratante',
    'Vitalidad',
    'Entre otros'
  ],
  precio: '$ De acuerdo al suero',
  imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0010.jpg'
};

export default function OtrosServiciosPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectService = (servicio) => {
    // Redirigir a la página de reserva con el servicio seleccionado
    window.location.href = `/reservar?seleccion=${encodeURIComponent(servicio.nombre)}`;
  };

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
              left: 'var(--spa-spacing-sm)',
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
          Otros Servicios
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--spa-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Descubre nuestra amplia gama de servicios adicionales: 
          masajes relajantes, tratamientos especializados y más.
        </p>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--spa-spacing-md)',
      }}>

        {/* Depilaciones con Cera */}
        <h2 style={{
          fontSize: '2.5rem',
          color: 'var(--spa-primary)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 'var(--spa-spacing-xl)',
        }}>
          Depilaciones con Cera
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 'var(--spa-spacing-xxl)',
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--spa-border-radius)',
            padding: 'var(--spa-spacing-xl)',
            boxShadow: 'var(--spa-shadow-medium)',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
          }}
          >
            <h3 style={{
              color: 'var(--spa-primary)',
              fontSize: '1.5rem',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
              marginBottom: 'var(--spa-spacing-md)',
            }}>
              Depilación con Cera
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--spa-spacing-md)',
            }}>
              <span style={{
                color: 'var(--spa-text-light)',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                ⏱️ Variable
              </span>
              <span style={{
                color: 'var(--spa-primary)',
                fontWeight: '700',
                fontSize: '1.1rem',
              }}>
                $ Según Área
              </span>
            </div>

            <p style={{
              color: 'var(--spa-text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6,
              marginBottom: 'var(--spa-spacing-lg)',
            }}>
              Depilación profesional con cera en diferentes zonas del cuerpo. 
              Selecciona la zona específica al hacer tu reserva.
            </p>
            
            <button
              onClick={() => setShowModal(true)}
              style={{
                width: '100%',
                background: 'var(--spa-gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--spa-border-radius-small)',
                padding: 'var(--spa-spacing-md)',
                fontSize: '1rem',
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
              Reservar Depilación con Cera
            </button>
          </div>
        </div>

        {/* Masajes Relajantes */}
        <h2 style={{
          fontSize: '2.5rem',
          color: 'var(--spa-primary)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 'var(--spa-spacing-xl)',
        }}>
          Masajes Relajantes
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 400px))',
          gap: 'var(--spa-spacing-xl)',
          marginBottom: 'var(--spa-spacing-xxl)',
          justifyContent: 'center',
          padding: '0 var(--spa-spacing-md)',
        }}>
          {masajesRelajantes.map((masaje) => (
            <div
              key={masaje.id}
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
                  src={masaje.imagen} 
                  alt={masaje.nombre} 
                  fill 
                  style={{ objectFit: 'cover' }} 
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
                  <h3 style={{
                    margin: '0 0 var(--spa-spacing-sm) 0',
                    color: 'var(--spa-primary)',
                    fontSize: '1.5rem',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                  }}>
                    {masaje.nombre}
                  </h3>
                  
                  {masaje.indicacion && (
                    <p style={{
                      color: 'var(--spa-text-light)',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      marginBottom: 'var(--spa-spacing-sm)',
                    }}>
                      {masaje.indicacion}
                    </p>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spa-spacing-sm)',
                  }}>
                    <span style={{
                      color: 'var(--spa-text-light)',
                      fontSize: '0.9rem',
                    }}>
                      ⏱️ {masaje.duracion}
                    </span>
                    <span style={{
                      color: 'var(--spa-primary)',
                      fontWeight: '700',
                      fontSize: '1.3rem',
                    }}>
                      ${masaje.precio.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>

                <p style={{
                  color: 'var(--spa-text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  {masaje.descripcion}
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
                    {masaje.incluye.map((item, index) => (
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

                <div style={{ marginTop: 'auto', paddingTop: 'var(--spa-spacing-md)' }}>
                  <Link
                    href={`/reservar?seleccion=${encodeURIComponent(masaje.nombre)}`}
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
                      Reservar {masaje.nombre}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Otros Servicios Especializados */}
        <h2 style={{
          fontSize: '2.5rem',
          color: 'var(--spa-primary)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 'var(--spa-spacing-xl)',
        }}>
          Servicios Especializados
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spa-spacing-lg)',
          marginBottom: 'var(--spa-spacing-xxl)',
        }}>
          {otrosServiciosEspecializados.map((servicio) => (
            <div
              key={servicio.id}
              style={{
                background: 'white',
                borderRadius: 'var(--spa-border-radius)',
                padding: 'var(--spa-spacing-lg)',
                boxShadow: 'var(--spa-shadow-medium)',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
              }}
            >
              <h3 style={{
                color: 'var(--spa-primary)',
                fontSize: '1.3rem',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600',
                marginBottom: 'var(--spa-spacing-md)',
              }}>
                {servicio.nombre}
              </h3>

              {servicio.indicacion && (
                <p style={{
                  color: 'var(--spa-text-light)',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  marginBottom: 'var(--spa-spacing-sm)',
                }}>
                  {servicio.indicacion}
                </p>
              )}

              {servicio.duracion && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--spa-spacing-sm)',
                }}>
                  <span style={{
                    color: 'var(--spa-text-light)',
                    fontSize: '0.9rem',
                  }}>
                    ⏱️ {servicio.duracion}
                  </span>
                  <span style={{
                    color: 'var(--spa-primary)',
                    fontWeight: '700',
                    fontSize: '1.2rem',
                  }}>
                    {servicio.precioEspecial || (servicio.precio > 0 ? `$${servicio.precio.toLocaleString('es-CO')}` : 'Sin costo')}
                  </span>
                </div>
              )}

              {!servicio.duracion && (
                <p style={{
                  color: 'var(--spa-primary)',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  marginBottom: 'var(--spa-spacing-md)',
                }}>
                  {servicio.precio}
                </p>
              )}
              
              <p style={{
                color: 'var(--spa-text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.6,
                marginBottom: 'var(--spa-spacing-lg)',
                flex: 1,
              }}>
                {servicio.descripcion}
              </p>
              
              <div style={{ marginTop: 'auto' }}>
                <Link
                  href={`/reservar?seleccion=${encodeURIComponent(servicio.nombre)}`}
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
                      fontSize: '1rem',
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
                    Reservar {servicio.nombre}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Suero Terapia */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--spa-border-radius)',
          padding: 'var(--spa-spacing-xl)',
          boxShadow: 'var(--spa-shadow-medium)',
          marginBottom: 'var(--spa-spacing-xxl)',
        }}>
          <h2 style={{
            color: 'var(--spa-primary)',
            fontSize: '2rem',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 'var(--spa-spacing-lg)',
          }}>
            {sueroTerapia.nombre}
          </h2>
          
          <p style={{
            color: 'var(--spa-text-secondary)',
            fontSize: '1.1rem',
            textAlign: 'center',
            marginBottom: 'var(--spa-spacing-lg)',
            maxWidth: '600px',
            margin: '0 auto var(--spa-spacing-lg) auto',
          }}>
            {sueroTerapia.descripcion}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--spa-spacing-md)',
            marginBottom: 'var(--spa-spacing-lg)',
          }}>
            {sueroTerapia.tipos.map((tipo, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--spa-gradient-soft)',
                  padding: 'var(--spa-spacing-md)',
                  borderRadius: 'var(--spa-border-radius-small)',
                  textAlign: 'center',
                  color: 'var(--spa-text-primary)',
                  fontWeight: '500',
                }}
              >
                {tipo}
              </div>
            ))}
          </div>

          <p style={{
            color: 'var(--spa-primary)',
            fontSize: '1.2rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 'var(--spa-spacing-lg)',
          }}>
            {sueroTerapia.precio}
          </p>
          
          <div style={{ textAlign: 'center' }}>
            <Link
              href={`/reservar?seleccion=${encodeURIComponent(sueroTerapia.nombre)}`}
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  background: 'var(--spa-gradient-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--spa-border-radius-small)',
                  padding: 'var(--spa-spacing-md) var(--spa-spacing-lg)',
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
                Reservar {sueroTerapia.nombre}
              </button>
            </Link>
          </div>
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
            ¿Necesitas asesoría personalizada?
          </h2>
          <p style={{
            color: 'var(--spa-text-secondary)',
            fontSize: '1.1rem',
            marginBottom: 'var(--spa-spacing-lg)',
            maxWidth: '600px',
            margin: '0 auto var(--spa-spacing-lg) auto',
          }}>
            Nuestras especialistas te ayudarán a elegir el servicio perfecto 
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

      {/* Modal de Depilaciones */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 'var(--spa-spacing-sm)',
        }}
        onClick={handleCloseModal}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--spa-border-radius)',
            padding: 'var(--spa-spacing-xl)',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: 'var(--spa-shadow-strong)',
            margin: '0 auto',
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: 'var(--spa-spacing-md)',
                right: 'var(--spa-spacing-md)',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--spa-text-light)',
                padding: '4px',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--spa-gradient-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>

            {/* Título del modal */}
            <h2 style={{
              color: 'var(--spa-primary)',
              fontSize: '2rem',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: 'var(--spa-spacing-xl)',
              marginTop: 'var(--spa-spacing-sm)',
            }}>
              Selecciona tu Depilación
            </h2>

            {/* Grid de servicios */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--spa-spacing-md)',
              justifyContent: 'center',
              maxWidth: '100%',
              placeItems: 'center',
            }}>
              {serviciosDepilacion.map((servicio) => (
                <div
                  key={servicio.id}
                  style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: 'var(--spa-border-radius-small)',
                    padding: 'var(--spa-spacing-lg)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '300px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                    e.currentTarget.style.borderColor = 'var(--spa-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--spa-spacing-sm)',
                  }}>
                    <h3 style={{
                      color: 'var(--spa-primary)',
                      fontSize: '1.1rem',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '600',
                      margin: 0,
                      flex: 1,
                    }}>
                      {servicio.nombre}
                    </h3>
                    <span style={{
                      backgroundColor: servicio.colorCategoria,
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      marginLeft: 'var(--spa-spacing-sm)',
                    }}>
                      {servicio.categoria}
                    </span>
                  </div>

                  <p style={{
                    color: 'var(--spa-text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    marginBottom: 'var(--spa-spacing-md)',
                  }}>
                    {servicio.descripcion}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spa-spacing-md)',
                  }}>
                    <span style={{
                      color: 'var(--spa-text-light)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      ⏱️ {servicio.duracion}
                    </span>
                    <span style={{
                      color: 'var(--spa-primary)',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                    }}>
                      ${servicio.precio.toLocaleString('es-CO')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectService(servicio)}
                    style={{
                      width: '100%',
                      background: 'var(--spa-gradient-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--spa-border-radius-small)',
                      padding: 'var(--spa-spacing-sm)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Montserrat, sans-serif',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
