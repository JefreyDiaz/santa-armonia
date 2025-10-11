// Script para probar respuestas automáticas
const fetch = require('node-fetch');

async function testAutoResponse() {
  try {
    console.log('🧪 Probando respuesta automática...');
    
    const response = await fetch('https://spa-santa-armonia.loca.lt/api/test-auto-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        telefono: '+573112405194',
        mensaje: 'Hola, quiero hacer una reserva'
      })
    });

    const result = await response.json();
    console.log('✅ Resultado:', result);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testAutoResponse();

