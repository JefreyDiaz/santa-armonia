import Link from 'next/link';
import { getWhatsAppReservaGeneralLink } from '@/lib/whatsapp-link';

export default function ReservarPage() {
  const wa = getWhatsAppReservaGeneralLink();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--spa-gradient-soft)',
        fontFamily: 'Montserrat, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spa-spacing-lg)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          background: 'white',
          borderRadius: 'var(--spa-border-radius)',
          boxShadow: 'var(--spa-shadow-medium)',
          padding: 'clamp(24px, 5vw, 40px)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧘‍♀️</div>
        <h1
          style={{
            margin: '0 0 12px',
            fontSize: 'clamp(1.35rem, 4vw, 1.75rem)',
            color: 'var(--spa-text-primary)',
            fontWeight: 600,
          }}
        >
          Las citas se coordinan directamente con el spa
        </h1>
        <p
          style={{
            margin: '0 0 24px',
            color: 'var(--spa-text-secondary)',
            lineHeight: 1.6,
            fontSize: '15px',
          }}
        >
          Ya no tomamos reservas automáticas por esta página. Escríbenos por WhatsApp y con gusto te agendamos.
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'var(--spa-gradient-primary)',
            color: 'white',
            textDecoration: 'none',
            padding: '14px 28px',
            borderRadius: 'var(--spa-border-radius-small)',
            fontWeight: 700,
            fontSize: '15px',
            marginBottom: '16px',
          }}
        >
          Escribir por WhatsApp
        </a>
        <div>
          <Link
            href="/"
            style={{
              color: 'var(--spa-primary)',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
