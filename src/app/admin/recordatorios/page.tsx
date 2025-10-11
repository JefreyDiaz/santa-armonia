"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RecordatorioResult {
  enviados: Array<{ id: number; nombre: string; horario: string }>;
  errores: Array<{ id: number; error: string }>;
  total: number;
}

export default function RecordatoriosPage() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<RecordatorioResult | null>(null);
  const [horasAntes, setHorasAntes] = useState(2);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [modoEnvio, setModoEnvio] = useState<'hoy' | 'fecha'>('hoy');
  const [error, setError] = useState('');
  const router = useRouter();

  async function ejecutarRecordatorios() {
    setLoading(true);
    setError('');
    setResultado(null);

    try {
      // Construir URL con parámetros
      let url = `/api/cron/recordatorios?horas=${horasAntes}`;
      if (modoEnvio === 'fecha' && fechaSeleccionada) {
        url += `&fecha=${fechaSeleccionada}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setResultado({
          enviados: data.enviados || [],
          errores: data.errores || [],
          total: data.total || 0
        });
      } else {
        setError(data.error || 'Error ejecutando recordatorios');
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ 
      minHeight: "100vh", 
      background: "var(--spa-gradient-soft)", 
      padding: "var(--spa-spacing-lg)"
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: 'var(--spa-border-radius)',
        boxShadow: 'var(--spa-shadow-medium)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--spa-gradient-primary)',
          padding: '25px 30px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '28px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                📱 Gestión de Recordatorios
              </h1>
              <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
                Envía recordatorios automáticos por WhatsApp
              </p>
            </div>
            <button
              onClick={() => router.push('/admin')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 'var(--spa-border-radius-small)',
                padding: '10px 15px',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600'
              }}
            >
              ← Volver al Admin
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div style={{ padding: '30px' }}>
          <div style={{
            background: 'var(--spa-light)',
            padding: '20px',
            borderRadius: 'var(--spa-border-radius-small)',
            border: '1px solid var(--spa-border-color)',
            marginBottom: '25px'
          }}>
            <h3 style={{ 
              color: 'var(--spa-primary)', 
              marginBottom: '15px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              ⚙️ Configuración de Recordatorios
            </h3>
            
            {/* Modo de envío */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: 'var(--spa-text-primary)',
                fontWeight: '600',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                Modo de envío:
              </label>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  <input
                    type="radio"
                    name="modoEnvio"
                    value="hoy"
                    checked={modoEnvio === 'hoy'}
                    onChange={(e) => setModoEnvio(e.target.value as 'hoy' | 'fecha')}
                    style={{ margin: 0 }}
                  />
                  <span>Hoy (automático con ventana de tiempo)</span>
                </label>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  <input
                    type="radio"
                    name="modoEnvio"
                    value="fecha"
                    checked={modoEnvio === 'fecha'}
                    onChange={(e) => setModoEnvio(e.target.value as 'hoy' | 'fecha')}
                    style={{ margin: 0 }}
                  />
                  <span>Fecha específica (todas las reservas)</span>
                </label>
              </div>
            </div>

            {/* Selector de fecha */}
            {modoEnvio === 'fecha' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: 'var(--spa-text-primary)',
                  fontWeight: '600',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  Seleccionar fecha:
                </label>
                <input
                  type="date"
                  value={fechaSeleccionada}
                  onChange={(e) => setFechaSeleccionada(e.target.value)}
                  style={{
                    padding: '10px 15px',
                    borderRadius: 'var(--spa-border-radius-small)',
                    border: '2px solid var(--spa-accent)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '16px',
                    color: 'var(--spa-text-primary)',
                    background: 'white',
                    minWidth: '200px'
                  }}
                />
              </div>
            )}

            {/* Horas de anticipación */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: 'var(--spa-text-primary)',
                fontWeight: '600',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {modoEnvio === 'hoy' 
                  ? 'Enviar recordatorio con cuántas horas de anticipación (solo el día de la cita):'
                  : 'Horas de anticipación (para el mensaje):'
                }
              </label>
              <select
                value={horasAntes}
                onChange={(e) => setHorasAntes(Number(e.target.value))}
                style={{
                  padding: '10px 15px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  border: '2px solid var(--spa-accent)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  color: 'var(--spa-text-primary)',
                  background: 'white',
                  minWidth: '200px'
                }}
              >
                <option value={1}>1 hora antes</option>
                <option value={2}>2 horas antes (recomendado)</option>
                <option value={3}>3 horas antes</option>
                <option value={4}>4 horas antes</option>
              </select>
            </div>

            <button
              onClick={ejecutarRecordatorios}
              disabled={loading || (modoEnvio === 'fecha' && !fechaSeleccionada)}
              style={{
                background: loading || (modoEnvio === 'fecha' && !fechaSeleccionada) ? 'var(--spa-text-light)' : 'var(--spa-gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--spa-border-radius-small)',
                padding: '12px 25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading || (modoEnvio === 'fecha' && !fechaSeleccionada) ? 'not-allowed' : 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                boxShadow: 'var(--spa-shadow-soft)',
                transition: 'all 0.2s'
              }}
            >
              {loading 
                ? '⏳ Enviando...' 
                : modoEnvio === 'hoy' 
                  ? '📱 Enviar Recordatorios para Hoy'
                  : `📱 Enviar Recordatorios para ${fechaSeleccionada || 'Fecha'}`
              }
            </button>
          </div>

          {/* Resultados */}
          {resultado && (
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: 'var(--spa-border-radius-small)',
              border: '1px solid var(--spa-border-color)',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                color: 'var(--spa-primary)', 
                marginBottom: '15px',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                📊 Resultados del Envío
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                <div style={{
                  background: 'var(--spa-light)',
                  padding: '15px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', color: 'var(--spa-primary)', fontWeight: 'bold' }}>
                    {resultado.total}
                  </div>
                  <div style={{ color: 'var(--spa-text-secondary)', fontSize: '14px' }}>
                    Total Revisadas
                  </div>
                </div>
                
                <div style={{
                  background: 'var(--spa-success)',
                  color: 'white',
                  padding: '15px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {resultado.enviados.length}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Enviados
                  </div>
                </div>
                
                <div style={{
                  background: 'var(--spa-error)',
                  color: 'white',
                  padding: '15px',
                  borderRadius: 'var(--spa-border-radius-small)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {resultado.errores.length}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Errores
                  </div>
                </div>
              </div>

              {resultado.enviados.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: 'var(--spa-success)', marginBottom: '10px', fontFamily: 'Montserrat, sans-serif' }}>
                    ✅ Recordatorios Enviados:
                  </h4>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {resultado.enviados.map((item) => (
                      <div key={item.id} style={{
                        background: 'var(--spa-light)',
                        padding: '10px',
                        borderRadius: 'var(--spa-border-radius-small)',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        <strong>{item.nombre}</strong> - Cita a las {item.horario}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resultado.errores.length > 0 && (
                <div>
                  <h4 style={{ color: 'var(--spa-error)', marginBottom: '10px', fontFamily: 'Montserrat, sans-serif' }}>
                    ❌ Errores:
                  </h4>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {resultado.errores.map((item) => (
                      <div key={item.id} style={{
                        background: '#ffe6e6',
                        padding: '10px',
                        borderRadius: 'var(--spa-border-radius-small)',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontFamily: 'Montserrat, sans-serif',
                        color: 'var(--spa-error)'
                      }}>
                        Reserva ID {item.id}: {item.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div style={{ 
              background: 'var(--spa-error)', 
              color: 'white', 
              padding: '15px', 
              borderRadius: 'var(--spa-border-radius-small)', 
              border: '1px solid var(--spa-error)',
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              {error}
            </div>
          )}

          {/* Información adicional */}
          <div style={{
            background: 'var(--spa-light)',
            padding: '20px',
            borderRadius: 'var(--spa-border-radius-small)',
            border: '1px solid var(--spa-border-color)',
            fontSize: '14px',
            color: 'var(--spa-text-secondary)',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            <h4 style={{ color: 'var(--spa-primary)', marginBottom: '10px' }}>
              💡 Información Importante:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li><strong>Modo "Hoy":</strong> Solo envía a reservas que están en la ventana de tiempo (ej: entre 2h y 1h antes)</li>
              <li><strong>Modo "Fecha específica":</strong> Envía a TODAS las reservas de esa fecha, sin importar la hora</li>
              <li>Solo se envían a reservas con estado "confirmada" o "pendiente"</li>
              <li>Cada reserva solo recibe un recordatorio por día</li>
              <li>El sistema intenta usar plantillas de WhatsApp, con fallback a mensajes de texto</li>
              <li>Los recordatorios incluyen la política de puntualidad del spa</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
