import { crearUsuario, existeUsuario } from '../lib/database';
import { hashPassword } from '../lib/auth';

async function createAdminUser() {
  try {
    const username = 'admin';
    const password = 'admin123'; // Cambiar por una contraseña segura en producción
    
    console.log('Verificando si el usuario admin ya existe...');
    
    const userExists = await existeUsuario(username);
    if (userExists) {
      console.log('✅ El usuario admin ya existe en la base de datos');
      return;
    }
    
    console.log('Creando usuario administrador...');
    
    // Hashear la contraseña
    const passwordHash = await hashPassword(password);
    
    // Crear el usuario
    const userId = await crearUsuario(username, passwordHash);
    
    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('📋 Credenciales:');
    console.log(`   Usuario: ${username}`);
    console.log(`   Contraseña: ${password}`);
    console.log(`   ID: ${userId}`);
    console.log('');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña por defecto en producción!');
    
  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createAdminUser().then(() => {
    console.log('Script completado');
    process.exit(0);
  }).catch((error) => {
    console.error('Error en script:', error);
    process.exit(1);
  });
}

export { createAdminUser };
