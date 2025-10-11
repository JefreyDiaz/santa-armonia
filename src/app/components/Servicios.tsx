'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const servicios = [
  {
    nombre: 'Tratamientos Faciales',
    href: '/services/faciales',
    img: '/images/Servicios/Facial/1641d0e14126d0d9f943bccd767dcb50-xxlarge.jpg',
    alt: 'Tratamientos faciales profesionales',
    descripcion: 'Limpieza profunda, rejuvenecimiento y tratamientos especializados',
  },
  {
    nombre: 'Tratamientos Corporales',
    href: '/services/corporales',
    img: '/images/Servicios/masaje/WIL_5045.jpg',
    alt: 'Tratamientos corporales y masajes',
    descripcion: 'Masajes reductores, moldeadores, anticelulitis y especializados',
  },
  {
    nombre: 'Otros Servicios',
    href: '/services/otros',
    img: '/images/Servicios/general/401e507fd8d66d1a9ec18559a4bce0a0-xlarge.jpg',
    alt: 'Otros servicios especializados',
    descripcion: 'Servicios adicionales y tratamientos especializados',
  },
];

export default function Servicios() {
  const [hovered, setHovered] = useState(null);
  
  // Estados para scroll reveal
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  
  // Referencias para Intersection Observer
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
            // Disparar todo al mismo tiempo cuando entra la sección
            setIsVisible(true);
            setIsTitleVisible(true);
            setIsCardsVisible(true);
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="servicios-categorias"
      style={{ 
        padding: 'var(--spa-spacing-xxl) 0', 
        textAlign: 'center', 
        background: 'var(--spa-gradient-soft)',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease-out',
      }}
    >
      {/* Elementos decorativos */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '80px',
          height: '80px',
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
          bottom: '15%',
          right: '8%',
          width: '60px',
          height: '60px',
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
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      
      <h2 
        ref={titleRef}
        style={{ 
          marginBottom: 'var(--spa-spacing-lg)', 
          fontSize: '2.5rem', 
          color: 'var(--spa-primary)', 
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '600',
          position: 'relative',
          zIndex: 1,
          opacity: isTitleVisible ? 1 : 0,
          transform: isTitleVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        Nuestros Servicios
      </h2>
      <div 
        ref={cardsRef}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'var(--spa-spacing-xl)', 
          flexWrap: 'wrap',
          padding: '0 var(--spa-spacing-md)',
          position: 'relative',
          zIndex: 1,
          alignItems: 'stretch',
          minHeight: '400px',
          opacity: isCardsVisible ? 1 : 0,
          transform: isCardsVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        {servicios.map((servicio, idx) => (
          <Link href={servicio.href} style={{ textDecoration: 'none' }} key={servicio.nombre}>
            <div
              style={{
                position: 'relative',
                width: '280px',
                height: '100%',
                borderRadius: 'var(--spa-border-radius)',
                border: '2px solid var(--spa-border-color)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hovered === idx ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
                boxShadow: hovered === idx ? 'var(--spa-shadow-strong)' : 'var(--spa-shadow-medium)',
                zIndex: hovered === idx ? 2 : 1,
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 280px',
                animation: isCardsVisible ? 
                  (idx === 0 ? 'slideInFromLeft 0.8s ease-out 0.2s both' : 
                   idx === 1 ? 'slideInFromRight 0.8s ease-out 0.2s both' : 
                   'fadeInUp 0.8s ease-out 0.4s both') : 
                  'none',
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(idx)}
              onTouchEnd={() => setHovered(null)}
            >
              <div style={{ 
                height: '250px', 
                overflow: 'hidden',
                flexShrink: 0,
                flex: '0 0 250px',
                position: 'relative',
              }}>
                <img 
                  src={servicio.img} 
                  alt={servicio.alt} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.3s ease',
                    imageRendering: 'auto',
                    WebkitImageRendering: 'auto',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: `translate3d(0, 0, 0) ${hovered === idx ? 'scale(1.05)' : 'scale(1)'}`,
                    willChange: 'transform',
                    WebkitTransform: `translate3d(0, 0, 0) ${hovered === idx ? 'scale(1.05)' : 'scale(1)'}`,
                    imageSmoothingEnabled: true,
                    WebkitImageSmoothingEnabled: true,
                    MozImageSmoothingEnabled: true,
                    msImageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high',
                    WebkitImageSmoothingQuality: 'high',
                    filter: servicio.nombre === 'Tratamientos Corporales' ? 'contrast(1.1) saturate(1.1) brightness(1.2) sharpness(0.5)' : 'none',
                    WebkitFilter: servicio.nombre === 'Tratamientos Corporales' ? 'contrast(1.1) saturate(1.1) brightness(1.2) sharpness(0.5)' : 'none',
                  }} 
                />
              </div>
              <div
                style={{
                  padding: 'var(--spa-spacing-md)',
                  background: 'white',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '120px',
                }}
              >
                <h3 style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  color: 'var(--spa-primary)', 
                  fontSize: '1.4rem', 
                  margin: '0 0 var(--spa-spacing-md) 0',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  {servicio.nombre}
                </h3>
                <p style={{ 
                  color: 'var(--spa-text-secondary)', 
                  fontSize: '1rem', 
                  margin: 0,
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}>
                  {servicio.descripcion}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
