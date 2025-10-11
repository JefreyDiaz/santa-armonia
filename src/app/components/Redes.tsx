const redes = [
  {
    nombre: 'Instagram',
    url: 'https://www.instagram.com/santaarmoniaspa/',
    icon: '📸',
    color: '#E4405F',
  },
  {
    nombre: 'Facebook',
    url: 'https://www.facebook.com/santaarmoniaspa',
    icon: '📘',
    color: '#1877F3',
  },
  {
    nombre: 'WhatsApp',
    url: 'https://wa.me/573015361106?text=Hola%20quiero%20más%20información%20del%20Spa%20Santa%20Armonía',
    icon: '💬',
    color: '#25D366',
  },
];

export default function Redes() {
  return (
    <section style={{ background: 'var(--spa-gradient-soft)', padding: 'var(--spa-spacing-xl) 0', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--spa-primary)', fontFamily: 'Montserrat, sans-serif', fontSize: '2rem', marginBottom: '2rem', fontWeight: '600' }}>Síguenos en nuestras redes sociales</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {redes.map((r) => (
          <a
            key={r.nombre}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'white',
              borderRadius: 'var(--spa-border-radius)',
              boxShadow: 'var(--spa-shadow-medium)',
              padding: 'var(--spa-spacing-lg) var(--spa-spacing-xl)',
              minWidth: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: r.color,
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
            }}
          >
            <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{r.icon}</span>
            {r.nombre}
          </a>
        ))}
      </div>
    </section>
  );
}
