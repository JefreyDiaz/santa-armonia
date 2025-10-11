'use client';

import { useState, useEffect, useRef } from 'react';

const testimonios = [
  {
    id: 1,
    nombre: 'María González',
    tratamiento: 'Masaje Relajante',
    calificacion: 5,
    comentario: 'Excelente experiencia en Santa Armonía. El masaje fue increíble y me sentí completamente renovada. Las terapeutas son muy profesionales y el ambiente es muy relajante.',
    fecha: 'Hace 2 semanas',
    foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0004.jpg'
  },
  {
    id: 2,
    nombre: 'Ana Rodríguez',
    tratamiento: 'Limpieza Facial Profunda',
    calificacion: 5,
    comentario: 'Mi piel se ve increíble después del tratamiento facial. La limpieza fue muy profunda y me dieron excelentes consejos para el cuidado diario.',
    fecha: 'Hace 1 mes',
    foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0005.jpg'
  },
  {
    id: 3,
    nombre: 'Carmen López',
    tratamiento: 'Envoltura de Algas',
    calificacion: 5,
    comentario: 'La envoltura de algas fue una experiencia única. Me sentí completamente detoxificada y mi piel quedó súper suave. Definitivamente volveré.',
    fecha: 'Hace 3 semanas',
    foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0006.jpg'
  },
  {
    id: 4,
    nombre: 'Laura Martínez',
    tratamiento: 'Masaje con Piedras Calientes',
    calificacion: 5,
    comentario: 'El masaje con piedras calientes fue espectacular. Las piedras volcánicas me ayudaron a relajarme completamente. Altamente recomendado.',
    fecha: 'Hace 2 meses',
    foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0007.jpg'
  },
  {
    id: 5,
    nombre: 'Patricia Silva',
    tratamiento: 'Tratamiento Anti-Age',
    calificacion: 5,
    comentario: 'El tratamiento anti-age superó mis expectativas. Mi piel se ve más joven y radiante. Las terapeutas son muy expertas en su trabajo.',
    fecha: 'Hace 1 mes',
    foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
  },
  {
    id: 6,
    nombre: 'Sofia Vargas',
    tratamiento: 'Drenaje Linfático',
    calificacion: 5,
    comentario: 'El drenaje linfático me ayudó mucho con la retención de líquidos. Me sentí más ligera y con más energía después del tratamiento.',
    fecha: 'Hace 3 semanas',
    foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0009.jpg'
  }
];

export default function Testimonios() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  // Estados para scroll reveal
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isIndicatorsVisible, setIsIndicatorsVisible] = useState(false);
  const [isCTAVisible, setIsCTAVisible] = useState(false);
  
  // Referencias para Intersection Observer
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para scroll reveal
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            setIsVisible(true);
          } else if (entry.target === titleRef.current) {
            setTimeout(() => setIsTitleVisible(true), 200);
          } else if (entry.target === carouselRef.current) {
            setTimeout(() => setIsCarouselVisible(true), 400);
          } else if (entry.target === indicatorsRef.current) {
            setTimeout(() => setIsIndicatorsVisible(true), 600);
          } else if (entry.target === ctaRef.current) {
            setTimeout(() => setIsCTAVisible(true), 800);
          }
        }
      });
    }, observerOptions);

    // Observar elementos
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (carouselRef.current) observer.observe(carouselRef.current);
    if (indicatorsRef.current) observer.observe(indicatorsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection('next');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonios.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonio = () => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonios.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevTestimonio = () => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToTestimonio = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const renderStars = (calificacion: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < calificacion ? '#FFD700' : '#E0E0E0',
          fontSize: '1.2rem',
          marginRight: '2px',
          transition: 'color 0.3s ease',
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: 'var(--spa-spacing-xxl) 0',
        background: 'var(--spa-gradient-warm)',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease-out',
      }}
    >
      {/* Elementos decorativos animados */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'var(--spa-gradient-primary)',
          borderRadius: '50%',
          opacity: isVisible ? 0.1 : 0,
          animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
          transition: 'opacity 1s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '80px',
          height: '80px',
          background: 'var(--spa-accent)',
          borderRadius: '50%',
          opacity: isVisible ? 0.15 : 0,
          animation: isVisible ? 'float 8s ease-in-out infinite reverse' : 'none',
          transition: 'opacity 1s ease-out 0.3s',
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .testimonial-card {
          animation: ${isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out'};
        }
        
        .testimonial-content {
          animation: ${isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'};
        }
      `}</style>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--spa-spacing-md)',
        position: 'relative',
        zIndex: 1,
      }}>
        <h2 
          ref={titleRef}
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            color: 'var(--spa-primary)',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            marginBottom: 'var(--spa-spacing-lg)',
            opacity: isTitleVisible ? 1 : 0,
            transform: isTitleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          Lo Que Dicen Nuestras Clientes
        </h2>

        <div 
          ref={carouselRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spa-spacing-lg)',
            flexWrap: 'wrap',
            opacity: isCarouselVisible ? 1 : 0,
            transform: isCarouselVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          {/* Botón anterior */}
          <button
            onClick={prevTestimonio}
            disabled={isTransitioning}
            style={{
              background: 'var(--spa-gradient-primary)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              color: 'white',
              fontSize: '1.5rem',
              boxShadow: 'var(--spa-shadow-medium)',
              transition: 'all 0.3s ease',
              opacity: isTransitioning ? 0.6 : 1,
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ←
          </button>

          {/* Testimonio principal */}
          <div 
            className="testimonial-card"
            style={{
              background: 'white',
              borderRadius: 'var(--spa-border-radius)',
              padding: 'var(--spa-spacing-xl)',
              maxWidth: '600px',
              boxShadow: 'var(--spa-shadow-medium)',
              position: 'relative',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transform: isTransitioning ? (direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)') : 'translateX(0)',
              opacity: isTransitioning ? 0.7 : 1,
              transition: 'all 0.3s ease',
            }}
          >
            <div 
              className="testimonial-content"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'var(--spa-spacing-md)',
              }}
            >
              <img
                src={testimonios[currentIndex].foto}
                alt={testimonios[currentIndex].nombre}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: 'var(--spa-spacing-md)',
                  border: '3px solid var(--spa-accent)',
                  transition: 'all 0.3s ease',
                }}
              />
              <div>
                <h3 style={{
                  margin: 0,
                  color: 'var(--spa-primary)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                }}>
                  {testimonios[currentIndex].nombre}
                </h3>
                <p style={{
                  margin: '4px 0',
                  color: 'var(--spa-text-secondary)',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                }}>
                  {testimonios[currentIndex].tratamiento}
                </p>
                <div style={{ marginTop: '4px' }}>
                  {renderStars(testimonios[currentIndex].calificacion)}
                </div>
              </div>
            </div>

            <blockquote 
              className="testimonial-content"
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'var(--spa-text-primary)',
                fontStyle: 'italic',
                margin: 'var(--spa-spacing-md) 0',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
            >
              "{testimonios[currentIndex].comentario}"
            </blockquote>

            <p 
              className="testimonial-content"
              style={{
                color: 'var(--spa-text-light)',
                fontSize: '0.9rem',
                margin: 0,
                textAlign: 'right',
                transition: 'all 0.3s ease',
              }}
            >
              {testimonios[currentIndex].fecha}
            </p>
          </div>

          {/* Botón siguiente */}
          <button
            onClick={nextTestimonio}
            disabled={isTransitioning}
            style={{
              background: 'var(--spa-gradient-primary)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              color: 'white',
              fontSize: '1.5rem',
              boxShadow: 'var(--spa-shadow-medium)',
              transition: 'all 0.3s ease',
              opacity: isTransitioning ? 0.6 : 1,
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            →
          </button>
        </div>

        {/* Indicadores */}
        <div 
          ref={indicatorsRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spa-spacing-sm)',
            marginTop: 'var(--spa-spacing-lg)',
            opacity: isIndicatorsVisible ? 1 : 0,
            transform: isIndicatorsVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonio(index)}
              disabled={isTransitioning}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? 'var(--spa-primary)' : 'var(--spa-accent)',
                cursor: isTransitioning ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isTransitioning ? 0.6 : 1,
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div 
          ref={ctaRef}
          style={{
            textAlign: 'center',
            marginTop: 'var(--spa-spacing-xl)',
            opacity: isCTAVisible ? 1 : 0,
            transform: isCTAVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <p style={{
            color: 'var(--spa-text-secondary)',
            fontSize: '1.1rem',
            marginBottom: 'var(--spa-spacing-md)',
          }}>
            ¿Lista para tu experiencia de relajación?
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('servicios-categorias');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.hash = '#servicios-categorias';
              }
            }}
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
            Reserva Tu Cita
          </button>
        </div>
      </div>
    </section>
  );
}
