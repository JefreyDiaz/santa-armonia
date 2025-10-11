import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Clave secreta para JWT (en producción debería estar en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'spa-santa-armonia-secret-key-2025';

// Configuración de bcrypt
const SALT_ROUNDS = 12;

// Interfaz para el payload del JWT
export interface JWTPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

/**
 * Hashea una contraseña usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error al hashear contraseña:', error);
    throw new Error('Error al procesar la contraseña');
  }
}

/**
 * Verifica una contraseña contra su hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error al verificar contraseña:', error);
    return false;
  }
}

/**
 * Genera un JWT token para un usuario
 */
export function generateToken(userId: number, username: string): string {
  try {
    const payload: JWTPayload = {
      userId,
      username
    };
    
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '24h', // Token válido por 24 horas
      issuer: 'spa-santa-armonia'
    });
    
    return token;
  } catch (error) {
    console.error('Error al generar token:', error);
    throw new Error('Error al generar token de autenticación');
  }
}

/**
 * Verifica y decodifica un JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Error al verificar token:', error);
    return null;
  }
}

/**
 * Extrae el token del header Authorization
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Valida que una contraseña cumpla con los requisitos mínimos
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  if (password.length > 50) {
    return { valid: false, message: 'La contraseña no puede tener más de 50 caracteres' };
  }
  
  return { valid: true };
}

/**
 * Valida que un username cumpla con los requisitos mínimos
 */
export function validateUsername(username: string): { valid: boolean; message?: string } {
  if (username.length < 3) {
    return { valid: false, message: 'El usuario debe tener al menos 3 caracteres' };
  }
  
  if (username.length > 30) {
    return { valid: false, message: 'El usuario no puede tener más de 30 caracteres' };
  }
  
  // Solo permitir letras, números y guiones bajos
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: 'El usuario solo puede contener letras, números y guiones bajos' };
  }
  
  return { valid: true };
}
