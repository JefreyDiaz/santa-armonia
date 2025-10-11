"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const [form, setForm] = useState({
    username: "admin",
    password: "admin123"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al crear usuario");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      console.error("Error en setup:", err);
      setError("Error de conexión. Intenta nuevamente.");
      setLoading(false);
    }
  }

  if (success) {
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
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--spa-spacing-md)' }}>✅</div>
          <h1 style={{ 
            color: 'var(--spa-primary)', 
            marginBottom: 'var(--spa-spacing-md)', 
            fontFamily: 'Montserrat, sans-serif', 
            fontSize: '1.8rem'
          }}>
            ¡Configuración Completada!
          </h1>
          <p style={{ 
            color: 'var(--spa-text-secondary)', 
            marginBottom: 'var(--spa-spacing-lg)', 
            lineHeight: 1.6 
          }}>
            El usuario administrador ha sido creado exitosamente. 
            Serás redirigido al login en unos segundos...
          </p>
          <div style={{
            background: 'var(--spa-light)',
            padding: 'var(--spa-spacing-md)',
            borderRadius: 'var(--spa-border-radius-small)',
            border: '1px solid var(--spa-border-color)',
            fontSize: '14px',
            color: 'var(--spa-text-secondary)',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            <strong>Credenciales creadas:</strong><br/>
            Usuario: {form.username}<br/>
            Contraseña: {form.password}
          </div>
        </section>
      </main>
    );
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

        <div style={{ textAlign: 'center', marginBottom: 'var(--spa-spacing-lg)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--spa-spacing-sm)' }}>⚙️</div>
          <h1 style={{ 
            color: 'var(--spa-primary)', 
            marginBottom: 'var(--spa-spacing-sm)', 
            fontFamily: 'Montserrat, sans-serif', 
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            Configuración Inicial
          </h1>
          <p style={{ 
            color: 'var(--spa-text-secondary)', 
            fontSize: '0.9rem',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Crea el usuario administrador para acceder al panel
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spa-spacing-md)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spa-spacing-sm)', color: 'var(--spa-text-primary)', fontWeight: '600', fontFamily: 'Montserrat, sans-serif' }}>
              Usuario Administrador *
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Ingresa el nombre de usuario"
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
              placeholder="Ingresa la contraseña"
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
            {loading ? 'Creando usuario...' : 'Crear Usuario Administrador'}
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
          <strong>💡 Información:</strong> Esta página solo debe usarse una vez para la configuración inicial del sistema.
        </div>
      </section>
    </main>
  );
}
