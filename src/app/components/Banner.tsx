'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function Banner() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(true); // Asumimos true para evitar flash
  
  // Estados para animaciones
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isDecorationsVisible, setIsDecorationsVisible] = useState(false);
  
  // Referencias
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animaciones secuenciales sin Intersection Observer para primera carga
  useEffect(() => {
    // Trigger animaciones inmediatamente
    setTimeout(() => setIsDecorationsVisible(true), 200);
    setTimeout(() => setIsLogoVisible(true), 400);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manejar la carga del video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlayThrough = () => {
        // Video completamente cargado y listo para reproducir
        setIsVideoLoaded(true);
      };
      
      const handleLoadedMetadata = () => {
        // Metadatos cargados, mostrar video incluso si no está completo
        setTimeout(() => setIsVideoLoaded(true), 200);
      };
      
      const handleError = (e) => {
        console.warn('Error cargando video:', e);
        // Mantener imagen de fallback si hay error
        setIsVideoLoaded(false);
      };

      // Agregar eventos optimizados
      video.addEventListener('canplaythrough', handleCanPlayThrough);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      
      // Timeout de fallback muy corto para WebM (son más rápidos)
      const fallbackTimeout = setTimeout(() => {
        if (!isVideoLoaded) {
          setIsVideoLoaded(true);
        }
      }, 800);
      
      return () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
        clearTimeout(fallbackTimeout);
      };
    }
  }, [isVideoLoaded]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: 'serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        margin: 0,
        padding: 0,
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Elementos decorativos */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'var(--spa-gradient-primary)',
          borderRadius: '50%',
          opacity: isDecorationsVisible ? 0.1 : 0,
          animation: isDecorationsVisible ? 'float 6s ease-in-out infinite' : 'none',
          transition: 'opacity 1s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '80px',
          height: '80px',
          background: 'var(--spa-accent)',
          borderRadius: '50%',
          opacity: isDecorationsVisible ? 0.15 : 0,
          animation: isDecorationsVisible ? 'float 8s ease-in-out infinite reverse' : 'none',
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
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* Video de fondo para spa */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          zIndex: -2,
          margin: 0,
          padding: 0,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/Servicios/general/ed9000f0cd2e51871fa54a100a4d7c62-cover.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            willChange: 'opacity',
          }}
        >
          <source src="/videos/hero-1-1.webm" type="video/webm" />
          Tu navegador no soporta videos HTML5.
        </video>
      </div>
      
      {/* Overlay degradado para mejorar legibilidad */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(139, 125, 155, 0.1) 0%, rgba(184, 169, 201, 0.15) 50%, rgba(212, 196, 231, 0.2) 100%)',
        }}
      />
      
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          ref={logoRef}
          style={{
            background: 'rgba(255,255,255,0.7)',
            borderRadius: 'var(--spa-border-radius)',
            padding: isMobile ? '4vw 3vw' : '6vw 4vw',
            maxWidth: '90vw',
            boxShadow: 'var(--spa-shadow-strong)',
            margin: '0 auto',
            display: 'inline-block',
            border: '1px solid rgba(212, 196, 231, 0.3)',
            backdropFilter: 'blur(10px)',
            opacity: isLogoVisible ? 1 : 0,
            transform: isLogoVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
            transition: 'all 1s ease-out',
          }}
        >
          <Image
            src="/images/multimedia-santa-armonia/logo_page-0001.png"
            alt="Santa Armonía Facial & Corporal"
            width={400}
            height={200}
            style={{
              width: isMobile ? '70vw' : '50vw',
              height: 'auto',
              maxWidth: '500px',
              minWidth: '250px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 16px rgba(139, 107, 139, 0.2))',
            }}
            priority
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
