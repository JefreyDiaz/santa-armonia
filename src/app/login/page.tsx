"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/admin';
  const sessionError = searchParams.get('error');

  useEffect(() => {
    if (sessionError === 'session_expired') {
      setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
    }
  }, [sessionError]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // Login exitoso, redirigir a la página solicitada
      console.log("Login exitoso:", data);
      router.push(redirectTo);
    } catch (err: any) {
      console.error("Error en login:", err);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ 
      minHeight: "100vh", 
      background: "var(--spa-gradient-soft)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "var(--spa-spacing-md)"
    }}>
      <section style={{ 
        background: "#fff", 
        borderRadius: "var(--spa-border-radius)", 
        boxShadow: "var(--spa-shadow-medium)", 
        padding: "var(--spa-spacing-xl)", 
        minWidth: 400, 
        maxWidth: 500, 
        width: "100%", 
        color: 'var(--spa-text-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoración de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'var(--spa-gradient-primary)',
          borderRadius: '50%',
          opacity: 0.1,
          transform: 'translate(30px, -30px)'
        }}></div>

        {/* Botón para regresar */}
        <button
          onClick={() => router.push('/')}
          style={{
            background: 'transparent',
            color: 'var(--spa-text-secondary)',
            border: '1px solid var(--spa-border-color)',
            borderRadius: 'var(--spa-border-radius-small)',
            padding: 'var(--spa-spacing-sm) var(--spa-spacing-md)',
            fontSize: 14,
            cursor: 'pointer',
            marginBottom: 'var(--spa-spacing-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s',
            fontFamily: 'Montserrat, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--spa-light)';
            e.currentTarget.style.borderColor = 'var(--spa-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'var(--spa-border-color)';
          }}
        >
          ← Volver al Inicio
        </button>

        <div style={{ textAlign: 'center', marginBottom: 'var(--spa-spacing-lg)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--spa-spacing-sm)' }}>🔐</div>
          <h1 style={{ 
            color: 'var(--spa-primary)', 
            marginBottom: 'var(--spa-spacing-sm)', 
            fontFamily: 'Montserrat, sans-serif', 
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            Acceso Administrativo
          </h1>
          <p style={{ 
            color: 'var(--spa-text-secondary)', 
            fontSize: '0.9rem',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Ingresa tus credenciales para acceder al panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spa-spacing-md)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600', fontFamily: 'Montserrat, sans-serif' }}>
              Usuario *
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Ingresa tu usuario"
              style={{
                width: '100%',
                padding: 'var(--spa-spacing-md)',
                border: '1px solid var(--spa-border-color)',
                borderRadius: 'var(--spa-border-radius-small)',
                fontSize: '16px',
                boxSizing: 'border-box',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--spa-primary)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--spa-border-color)';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600', fontFamily: 'Montserrat, sans-serif' }}>
              Contraseña *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña"
              style={{
                width: '100%',
                padding: 'var(--spa-spacing-md)',
                border: '1px solid var(--spa-border-color)',
                borderRadius: 'var(--spa-border-radius-small)',
                fontSize: '16px',
                boxSizing: 'border-box',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--spa-primary)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--spa-border-color)';
              }}
            />
          </div>

          {error && (
            <div style={{ 
              background: 'var(--spa-error)', 
              color: 'white', 
              padding: 'var(--spa-spacing-md)', 
              borderRadius: 'var(--spa-border-radius-small)', 
              border: '1px solid var(--spa-error)',
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? 'var(--spa-text-light)' : 'var(--spa-gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--spa-border-radius-small)',
              padding: 'var(--spa-spacing-md)',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              boxShadow: 'var(--spa-shadow-soft)',
              transition: 'all 0.2s',
              marginTop: 'var(--spa-spacing-sm)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 125, 155, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--spa-shadow-soft)';
              }
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{
          marginTop: 'var(--spa-spacing-lg)',
          padding: 'var(--spa-spacing-md)',
          background: 'var(--spa-light)',
          borderRadius: 'var(--spa-border-radius-small)',
          border: '1px solid var(--spa-border-color)',
          fontSize: '12px',
          color: 'var(--spa-text-secondary)',
          textAlign: 'center',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          <strong>💡 Información:</strong> Esta es el acceso exclusivo para administradores del Spa Santa Armonía.
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main style={{ 
        minHeight: "100vh", 
        background: "var(--spa-gradient-soft)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{ textAlign: 'center', color: 'var(--spa-text-secondary)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--spa-spacing-md)' }}>🔐</div>
          <p>Cargando...</p>
        </div>
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}
