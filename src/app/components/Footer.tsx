"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function Footer() {
  // Estados para scroll reveal
  const [isVisible, setIsVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isColumnsVisible, setIsColumnsVisible] = useState(false);
  const [isCopyrightVisible, setIsCopyrightVisible] = useState(false);
  
  // Referencias para Intersection Observer
  const footerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para scroll reveal
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === footerRef.current) {
            setIsVisible(true);
            setTimeout(() => setIsHeaderVisible(true), 200);
            setTimeout(() => setIsColumnsVisible(true), 400);
            setTimeout(() => setIsCopyrightVisible(true), 600);
          }
        }
      });
    }, observerOptions);

    // Observar elementos
    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      padding: '0 var(--spa-spacing-lg)'
    }}>
      <footer 
        ref={footerRef}
        style={{
          background: 'linear-gradient(135deg, #4A7A7A 0%, #5D9C9C 30%, #7FB3B3 70%, #B8D4D4 100%)',
          color: 'white',
          padding: 'var(--spa-spacing-lg) 0 var(--spa-spacing-lg) 0',
          fontFamily: 'Montserrat, sans-serif',
          borderRadius: 'var(--spa-border-radius) var(--spa-border-radius) 0 0',
          maxWidth: '1200px',
          margin: '0 auto',
          boxShadow: 'var(--spa-shadow-strong)',
          position: 'relative' as const,
          overflow: 'hidden',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <style jsx>{`
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
        `}</style>

        {/* Efecto decorativo sutil en las esquinas superiores */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: 'linear-gradient(90deg, var(--spa-accent) 0%, var(--spa-light) 50%, var(--spa-accent) 100%)',
          opacity: isVisible ? 0.6 : 0,
          transition: 'opacity 1s ease-out',
        }} />
        
        {/* Header con Logo y Redes Sociales */}
        <div 
          ref={headerRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 var(--spa-spacing-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spa-spacing-lg)',
            borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
            paddingBottom: 'var(--spa-spacing-md)',
            opacity: isHeaderVisible ? 1 : 0,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            animation: isHeaderVisible ? 'slideInFromLeft 0.8s ease-out' : 'none',
          }}>
            <Image
              src="/images/multimedia-santa-armonia/logo_page-0001.png"
              alt="Santa Armonía Facial & Corporal"
              width={200}
              height={100}
              style={{
                width: '160px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: '0.9'
              }}
            />
          </div>

          {/* Redes Sociales */}
          <div style={{
            display: 'flex',
            gap: 'var(--spa-spacing-md)',
            animation: isHeaderVisible ? 'slideInFromRight 0.8s ease-out' : 'none',
          }}>
            <a href="https://www.instagram.com/santaarmonia/" target="_blank" rel="noopener noreferrer" style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: 'var(--spa-shadow-soft)'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/p/Santa-Armonia-100071553266304/" target="_blank" rel="noopener noreferrer" style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: 'var(--spa-shadow-soft)'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://wa.me/573157274521?text=Hola%20quiero%20más%20información%20de%20Santa%20Armonía" target="_blank" rel="noopener noreferrer" style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: 'var(--spa-shadow-soft)'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
        </a>
      </div>
        </div>

        {/* Contenido Principal - 3 Columnas */}
        <div 
          ref={columnsRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 var(--spa-spacing-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spa-spacing-xl)',
            marginBottom: 'var(--spa-spacing-xl)',
            opacity: isColumnsVisible ? 1 : 0,
            transform: isColumnsVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          
          {/* Columna 1: Canales de Atención */}
          <div style={{
            animation: isColumnsVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none',
          }}>
            <h3 style={{
              color: 'var(--spa-light)',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: 'var(--spa-spacing-lg)',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
              paddingBottom: 'var(--spa-spacing-sm)'
            }}>
              Canales de Atención
            </h3>
            
            <div style={{ marginBottom: 'var(--spa-spacing-lg)' }}>
              <h4 style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: 'var(--spa-spacing-sm)'
              }}>
                Contáctenos
              </h4>
              <div style={{
                color: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div>📞 WhatsApp: 301-536-1106</div>
                <div>📧 Email: info@santaarmonia.com</div>
                <div>🕐 Atención: Lunes a Sábado</div>
                <div>⏰ Horario: 8:00 AM - 6:00 PM</div>
              </div>
            </div>

            <div>
              <h4 style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: 'var(--spa-spacing-sm)'
              }}>
                Visítenos
              </h4>
              <div style={{
                color: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div>📍 Calle Principal #123</div>
                <div>🏢 Manizales - Caldas</div>
                <div>🚗 Estacionamiento disponible</div>
                <div>♿ Acceso para personas con movilidad reducida</div>
              </div>
            </div>
          </div>

          {/* Columna 2: Información Legal */}
          <div style={{
            animation: isColumnsVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none',
          }}>
            <h3 style={{
              color: 'var(--spa-light)',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: 'var(--spa-spacing-lg)',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
              paddingBottom: 'var(--spa-spacing-sm)'
            }}>
              Información Legal
            </h3>
            
            <div style={{ marginBottom: 'var(--spa-spacing-lg)' }}>
              <h4 style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: 'var(--spa-spacing-sm)'
              }}>
                Políticas
              </h4>
              <div style={{
                color: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📄 Política de privacidad ↗
                </div>
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📋 Términos y condiciones ↗
                </div>
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🛡️ Política de cancelación ↗
                </div>
              </div>
            </div>

            <div>
              <h4 style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: 'var(--spa-spacing-sm)'
              }}>
                Certificaciones
              </h4>
              <div style={{
                color: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div>✅ Certificado de sanidad</div>
                <div>✅ Licencia comercial</div>
                <div>✅ Terapeutas certificados</div>
                <div>✅ Productos autorizados</div>
              </div>
            </div>
          </div>

          {/* Columna 3: Servicios y Pagos */}
          <div style={{
            animation: isColumnsVisible ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none',
          }}>
            <h3 style={{
              color: 'var(--spa-light)',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: 'var(--spa-spacing-lg)',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
              paddingBottom: 'var(--spa-spacing-sm)'
            }}>
              Servicios y Pagos
            </h3>
            
            <div style={{ marginBottom: 'var(--spa-spacing-lg)' }}>
              <h4 style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: 'var(--spa-spacing-sm)'
              }}>
                Tratamientos
              </h4>
              <div style={{
                color: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div>💆‍♀️ Masajes terapéuticos</div>
                <div>🧖‍♀️ Tratamientos faciales</div>
                <div>💆‍♂️ Terapias corporales</div>
                <div>🎁 Paquetes especiales</div>
              </div>
            </div>

            <div>
              <h4 style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: 'var(--spa-spacing-sm)'
              }}>
                Medios de Pago
              </h4>
              <div style={{
                color: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <img src="/images/davivienda.png" alt="Davivienda" style={{ width: '20px', height: '20px' }} />
                  <span>4884-0445-0337</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <img src="/images/nequi.png" alt="Nequi" style={{ width: '20px', height: '20px' }} />
                  <span>313-621-1447</span>
                </div>
                <div>💳 Efectivo</div>
                <div>💳 Tarjetas débito/crédito</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div 
          ref={copyrightRef}
          style={{
            textAlign: 'center',
            padding: 'var(--spa-spacing-md) var(--spa-spacing-lg) var(--spa-spacing-md) var(--spa-spacing-lg)',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#2C3E50',
            fontSize: '14px',
            fontWeight: '500',
            opacity: isCopyrightVisible ? 1 : 0,
            transform: isCopyrightVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          © 2025 | Todos los derechos reservados | Santa Armonía Facial & Corporal
      </div>
    </footer>
    </div>
  );
}
