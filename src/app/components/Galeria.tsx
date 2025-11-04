'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const galeria = [
  // FACIALES (3)
  {
    id: 1,
    titulo: 'Limpieza Facial Profunda',
    categoria: 'Faciales',
    imagen: '/images/Servicios/Facial/WIL_5066.jpg',
    descripcion: 'Limpieza facial completa con extracción y exfoliación',
    duracion: '60 min',
    precio: '$120.000'
  },
  {
    id: 2,
    titulo: 'Plasma Rico en Plaquetas',
    categoria: 'Faciales',
    imagen: '/images/Servicios/Facial/WIL_5059.jpg',
    descripcion: 'Tratamiento regenerador con PRP para rejuvenecer la piel',
    duracion: '60 min',
    precio: '$120.000'
  },
  {
    id: 3,
    titulo: 'Tratamiento Anti Edad',
    categoria: 'Faciales',
    imagen: '/images/Servicios/Facial/WIL_5079_(2).jpg',
    descripcion: 'Mascarilla y principios activos para rejuvenecer',
    duracion: '45 min',
    precio: '$130.000'
  },
  // CORPORALES (3)
  {
    id: 4,
    titulo: 'Masaje Relajante con Piedras',
    categoria: 'Corporales',
    imagen: '/images/Servicios/masaje/WIL_5045.jpg',
    descripcion: 'Masaje con piedras volcánicas calientes para relajación profunda',
    duracion: '60 min',
    precio: '$120.000'
  },
  {
    id: 5,
    titulo: 'Masaje Reductor',
    categoria: 'Corporales',
    imagen: '/images/Servicios/masaje/WIL_5213.jpg',
    descripcion: 'Tratamiento con aparatología para reducir medidas',
    duracion: '60 min',
    precio: '$60.000'
  },
  {
    id: 6,
    titulo: 'Maderoterapia',
    categoria: 'Corporales',
    imagen: '/images/Servicios/masaje/WIL_5194.jpg',
    descripcion: 'Masaje moldeador con rodillos de madera',
    duracion: '60 min',
    precio: '$80.000'
  }
];

const categorias = ['Todos', 'Faciales', 'Corporales'];

type GaleriaItem = {
  id: number;
  titulo: string;
  categoria: string;
  imagen: string;
  descripcion: string;
  duracion: string;
  precio: string;
  imagenes?: string[];
};

function getItemImages(item: GaleriaItem, fuente: GaleriaItem[]): string[] {
  // Si el item ya trae su set de imágenes, úsalo
  if (Array.isArray(item.imagenes) && item.imagenes.length > 0) {
    return item.imagenes.slice(0, 3);
  }
  // Armar un set de hasta 3 imágenes relacionadas de la misma categoría
  const relacionadas = fuente
    .filter(it => it.categoria === item.categoria && it.id !== item.id)
    .map(it => it.imagen)
    .filter(Boolean);
  const unique: string[] = [];
  for (const img of [item.imagen, ...relacionadas]) {
    if (!img) continue;
    if (!unique.includes(img)) unique.push(img);
    if (unique.length === 3) break;
  }
  // Si no alcanzan 3, solo usar las disponibles sin repetir
  return unique;
}

function GalleryCard({ item, onSelect, fuente }:{ item: GaleriaItem; onSelect: (it: any) => void; fuente: GaleriaItem[] }) {
  const images = getItemImages(item, fuente);
  const [index, setIndex] = useState(0);
  const total = images.length;
  const goPrev = () => setIndex(prev => (prev - 1 + total) % total);
  const goNext = () => setIndex(prev => (prev + 1) % total);

  // Autoplay individual desfasado
  useEffect(() => {
    const initialDelay = 1000 + Math.floor(Math.random() * 2000);
    const intervalMs = 6000 + Math.floor(Math.random() * 2000);
    let intervalId: any;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => setIndex(prev => (prev + 1) % total), intervalMs);
    }, initialDelay);
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [total]);

  return (
    <div
      className="gallery-item"
      style={{
        background: 'white',
        borderRadius: 'var(--spa-border-radius)',
        overflow: 'hidden',
        boxShadow: 'var(--spa-shadow-medium)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
        <Image
          key={index}
          src={images[index]}
          alt={item.titulo}
          fill
          loading="lazy"
          style={{
            objectFit: 'cover',
          }}
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Controles solo si hay más de una imagen */}
        {total > 1 && (
          <>
            <button
              aria-label="Anterior"
              onClick={goPrev}
              style={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.45)',
                color: 'white',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ‹
            </button>
            <button
              aria-label="Siguiente"
              onClick={goNext}
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.45)',
                color: 'white',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ›
            </button>
            {/* Indicadores */}
            <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {images.map((_, i) => (
                <span key={i} style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i === index ? 'white' : 'rgba(255,255,255,0.5)'
                }} />
              ))}
            </div>
          </>
        )}
        {/* Overlay de info */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '16px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>{item.titulo}</span>
          <span style={{ fontSize: '12px', opacity: 0.9 }}>{item.descripcion}</span>
        </div>
      </div>
    </div>
  );
}

export default function Galeria() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  
  // Estados para scroll reveal
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  
  // Referencias para Intersection Observer
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === descriptionRef.current) {
            setTimeout(() => setIsDescriptionVisible(true), 400);
          } else if (entry.target === filtersRef.current) {
            setTimeout(() => setIsFiltersVisible(true), 600);
          } else if (entry.target === galleryRef.current) {
            setTimeout(() => setIsGalleryVisible(true), 800);
          }
        }
      });
    }, observerOptions);

    // Observar elementos
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (filtersRef.current) observer.observe(filtersRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);

    return () => observer.disconnect();
  }, []);

  const galeriaFiltrada = categoriaSeleccionada === 'Todos' 
    ? galeria 
    : galeria.filter(item => item.categoria === categoriaSeleccionada);

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: 'var(--spa-spacing-xxl) 0',
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
          top: '15%',
          left: '8%',
          width: '120px',
          height: '120px',
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
          bottom: '10%',
          right: '5%',
          width: '100px',
          height: '100px',
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
        
        .gallery-item {
          animation: scaleIn 0.6s ease-out both;
        }

        @keyframes imageFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spa-spacing-lg);
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
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
            marginBottom: 'var(--spa-spacing-md)',
            opacity: isTitleVisible ? 1 : 0,
            transform: isTitleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          Galería de Tratamientos
        </h2>
        
        <p 
          ref={descriptionRef}
          style={{
            textAlign: 'center',
            color: 'var(--spa-text-secondary)',
            fontSize: '1.1rem',
            marginBottom: 'var(--spa-spacing-xl)',
            maxWidth: '600px',
            margin: '0 auto var(--spa-spacing-xl) auto',
            opacity: isDescriptionVisible ? 1 : 0,
            transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          Descubre nuestros tratamientos especializados diseñados para tu bienestar y relajación
        </p>

        {/* Filtros de categorías */}
        <div 
          ref={filtersRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spa-spacing-md)',
            marginBottom: 'var(--spa-spacing-xl)',
            flexWrap: 'wrap',
            opacity: isFiltersVisible ? 1 : 0,
            transform: isFiltersVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          {categorias.map((categoria, index) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              style={{
                background: categoriaSeleccionada === categoria 
                  ? 'var(--spa-gradient-primary)' 
                  : 'transparent',
                color: categoriaSeleccionada === categoria 
                  ? 'white' 
                  : 'var(--spa-text-primary)',
                border: categoriaSeleccionada === categoria 
                  ? 'none' 
                  : '2px solid var(--spa-border-color)',
                borderRadius: 'var(--spa-border-radius-small)',
                padding: 'var(--spa-spacing-sm) var(--spa-spacing-md)',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                animation: isFiltersVisible ? `scaleIn 0.6s ease-out ${0.2 * index}s both` : 'none',
              }}
              onMouseEnter={(e) => {
                if (categoriaSeleccionada !== categoria) {
                  e.currentTarget.style.background = 'var(--spa-light)';
                }
              }}
              onMouseLeave={(e) => {
                if (categoriaSeleccionada !== categoria) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Galería de imágenes */}
        <div 
          ref={galleryRef}
          className="gallery-grid"
          style={{
            marginBottom: 'var(--spa-spacing-xl)',
            opacity: isGalleryVisible ? 1 : 0,
            transform: isGalleryVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          {galeriaFiltrada.map((item, index) => (
            <div key={item.id} style={{ animation: isGalleryVisible ? `scaleIn 0.6s ease-out ${0.1 * index}s both` : 'none' }}>
              <GalleryCard item={item as any} fuente={galeria as any} onSelect={() => {}} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
