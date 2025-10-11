'use client';

import { useState } from 'react';

export default function TestDB() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  async function testReserva() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const testData = {
        nombre: 'Cliente de Prueba',
        telefono: '3001234567',
        correo: 'test@example.com',
        tratamiento: 'Masaje Relajante',
        fecha: '2025-01-25',
        horario: '10:00',
        notas: 'Reserva de prueba'
      };

      console.log('Enviando datos de prueba:', testData);

      const response = await fetch('/api/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err: any) {
      console.error('Error en test:', err);
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  async function testHorarios() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/horarios?fecha=2025-01-25');
      const data = await response.json();
      console.log('Horarios ocupados:', data);
      setResult(data);
    } catch (err: any) {
      console.error('Error al obtener horarios:', err);
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  async function testSimpleAPI() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data' }),
      });

      const data = await response.json();
      console.log('Respuesta API simple:', data);
      setResult(data);
    } catch (err: any) {
      console.error('Error en API simple:', err);
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  async function testDBInsert() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const testData = {
        nombre: 'Cliente Test DB',
        telefono: '3001234567',
        email: 'test@example.com'
      };

      console.log('Probando inserción directa en BD:', testData);

      const response = await fetch('/api/test-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      console.log('Respuesta test-db:', data);
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err: any) {
      console.error('Error en test-db:', err);
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  async function testFechas() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('Verificando fechas en la BD...');

      const response = await fetch('/api/test-db', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Fechas verificadas:', data);
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err: any) {
      console.error('Error verificando fechas:', err);
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  async function crearReservaTest() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('Creando reserva de prueba...');

      const response = await fetch('/api/test-db', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Reserva de prueba creada:', data);
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err: any) {
      console.error('Error creando reserva de prueba:', err);
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  async function testFechaFormato() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simular la selección de fecha del calendario
      const fechaSeleccionada = new Date(2025, 7, 7); // 7 de agosto de 2025
      const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];
      
      const testData = {
        fechaSeleccionada: fechaSeleccionada.toString(),
        fechaFormateada: fechaFormateada,
        fechaISO: fechaSeleccionada.toISOString(),
        fechaLocal: fechaSeleccionada.toLocaleDateString('es-CO'),
        fechaActual: new Date().toISOString().split('T')[0],
        zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      console.log('Test de formato de fecha:', testData);
      setResult(testData);
    } catch (err: any) {
      console.error('Error en test de fecha:', err);
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      padding: '50px',
      background: 'var(--spa-gradient-soft)',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <h1 style={{ color: 'var(--spa-primary)', textAlign: 'center', marginBottom: '30px' }}>
        🧪 Test de Base de Datos
      </h1>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        padding: '30px',
        borderRadius: 'var(--spa-border-radius)',
        boxShadow: 'var(--spa-shadow-medium)'
      }}>
                 <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
           <button
             onClick={testSimpleAPI}
             disabled={loading}
             style={{
               background: 'var(--spa-success)',
               color: 'white',
               border: 'none',
               padding: '12px 20px',
               borderRadius: 'var(--spa-border-radius-small)',
               cursor: loading ? 'not-allowed' : 'pointer',
               fontSize: '16px',
               fontWeight: 'bold'
             }}
           >
             {loading ? '⏳ Probando...' : '🔧 Test API Simple'}
           </button>

                       <button
              onClick={testDBInsert}
              disabled={loading}
              style={{
                background: 'var(--spa-warning)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 'var(--spa-border-radius-small)',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {loading ? '⏳ Probando...' : '💾 Test Inserción BD'}
            </button>

                         <button
               onClick={testFechas}
               disabled={loading}
               style={{
                 background: 'var(--spa-info)',
                 color: 'white',
                 border: 'none',
                 padding: '12px 20px',
                 borderRadius: 'var(--spa-border-radius-small)',
                 cursor: loading ? 'not-allowed' : 'pointer',
                 fontSize: '16px',
                 fontWeight: 'bold'
               }}
             >
               {loading ? '⏳ Probando...' : '📅 Verificar Fechas'}
             </button>

                           <button
                onClick={crearReservaTest}
                disabled={loading}
                style={{
                  background: 'var(--spa-secondary)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {loading ? '⏳ Probando...' : '🧪 Crear Reserva Test'}
              </button>

              <button
                onClick={testFechaFormato}
                disabled={loading}
                style={{
                  background: 'var(--spa-accent)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {loading ? '⏳ Probando...' : '📅 Test Formato Fecha'}
              </button>

           <button
             onClick={testReserva}
             disabled={loading}
             style={{
               background: 'var(--spa-gradient-primary)',
               color: 'white',
               border: 'none',
               padding: '12px 20px',
               borderRadius: 'var(--spa-border-radius-small)',
               cursor: loading ? 'not-allowed' : 'pointer',
               fontSize: '16px',
               fontWeight: 'bold'
             }}
           >
             {loading ? '⏳ Probando...' : '🧪 Crear Reserva de Prueba'}
           </button>

           <button
             onClick={testHorarios}
             disabled={loading}
             style={{
               background: 'var(--spa-secondary)',
               color: 'white',
               border: 'none',
               padding: '12px 20px',
               borderRadius: 'var(--spa-border-radius-small)',
               cursor: loading ? 'not-allowed' : 'pointer',
               fontSize: '16px',
               fontWeight: 'bold'
             }}
           >
             {loading ? '⏳ Probando...' : '🕐 Ver Horarios Ocupados'}
           </button>
         </div>

        {error && (
          <div style={{
            background: 'var(--spa-error)',
            color: 'white',
            padding: '15px',
            borderRadius: 'var(--spa-border-radius-small)',
            marginBottom: '20px'
          }}>
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {result && (
          <div style={{
            background: 'var(--spa-light)',
            padding: '20px',
            borderRadius: 'var(--spa-border-radius-small)',
            border: '1px solid var(--spa-accent)'
          }}>
            <h3 style={{ color: 'var(--spa-primary)', marginTop: 0 }}>
              ✅ Resultado:
            </h3>
            <pre style={{
              background: 'white',
              padding: '15px',
              borderRadius: 'var(--spa-border-radius-small)',
              overflow: 'auto',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'var(--spa-cream)',
          borderRadius: 'var(--spa-border-radius-small)',
          fontSize: '14px',
          color: 'var(--spa-text-secondary)'
        }}>
          <h4 style={{ color: 'var(--spa-primary)', marginTop: 0 }}>📋 Instrucciones:</h4>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Haz clic en "Crear Reserva de Prueba" para verificar que la BD funciona</li>
            <li>Haz clic en "Ver Horarios Ocupados" para verificar la API de horarios</li>
            <li>Revisa la consola del navegador para logs detallados</li>
            <li>Si hay errores, verifica que el servidor esté corriendo</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 