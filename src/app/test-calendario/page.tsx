'use client';

import { useState } from 'react';
import Calendario from '../components/Calendario';

export default function TestCalendario() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendario, setShowCalendario] = useState(false);

  function handleDateSelect(date: string) {
    console.log('Fecha seleccionada en test:', date);
    setSelectedDate(date);
    setShowCalendario(false);
  }

  return (
    <div style={{ 
      padding: '50px', 
      background: 'var(--spa-gradient-soft)', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h1 style={{ color: 'var(--spa-primary)', fontFamily: 'Montserrat, sans-serif' }}>
        Test del Calendario
      </h1>
      
      <div style={{ position: 'relative', width: '300px' }}>
        <input
          type="text"
          value={selectedDate}
          placeholder="Selecciona una fecha"
          readOnly
          style={{
            width: '100%',
            padding: 'var(--spa-spacing-md)',
            border: '1px solid var(--spa-border-color)',
            borderRadius: 'var(--spa-border-radius-small)',
            fontSize: '16px',
            cursor: 'pointer',
            background: '#fff',
            fontFamily: 'Montserrat, sans-serif'
          }}
          onClick={() => {
            console.log('Click en test - showCalendario actual:', showCalendario);
            setShowCalendario(!showCalendario);
            console.log('showCalendario nuevo:', !showCalendario);
          }}
        />
        
        {showCalendario && (
          <div style={{
            position: 'absolute',
            top: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: '#fff',
            border: '1px solid var(--spa-border-color)',
            borderRadius: 'var(--spa-border-radius)',
            boxShadow: 'var(--spa-shadow-strong)',
            marginTop: 'var(--spa-spacing-sm)',
            padding: 'var(--spa-spacing-md)',
          }}>
            <Calendario
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>
        )}
      </div>
      
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: 'var(--spa-border-radius)',
        boxShadow: 'var(--spa-shadow-medium)'
      }}>
        <h3>Fecha seleccionada: {selectedDate || 'Ninguna'}</h3>
        <p>Estado del calendario: {showCalendario ? 'Abierto' : 'Cerrado'}</p>
      </div>
    </div>
  );
} 