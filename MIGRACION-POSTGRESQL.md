# 🚀 Migración a PostgreSQL - Spa Santa Armonía

Este documento explica cómo configurar y desplegar la aplicación después de la migración de SQLite a PostgreSQL.

## 📊 Cambios Realizados

### ✅ Base de Datos Optimizada
- **Eliminada tabla `tratamientos`**: Los tratamientos ahora solo existen en el código JS (fuente única de verdad)
- **Esquema simplificado**: Los datos del tratamiento se guardan directamente en la tabla `reservas`
- **Sin duplicación**: No más sincronización entre BD y código

### ✅ Tablas PostgreSQL

```sql
-- Clientes
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  email VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservas (con datos del tratamiento embebidos)
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  tratamiento_nombre VARCHAR(255) NOT NULL,
  tratamiento_precio INTEGER NOT NULL,
  tratamiento_duracion INTEGER NOT NULL,
  tratamiento_categoria VARCHAR(100) NOT NULL,
  fecha VARCHAR(20) NOT NULL,
  horario VARCHAR(20) NOT NULL,
  estado VARCHAR(50) DEFAULT 'confirmada',
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes (id)
);

-- WhatsApp outgoing messages
CREATE TABLE wa_outgoing (
  wa_message_id VARCHAR(255) PRIMARY KEY,
  reserva_id INTEGER NOT NULL,
  purpose VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reserva_id) REFERENCES reservas (id)
);

-- Feriados
CREATE TABLE feriados (
  fecha VARCHAR(20) PRIMARY KEY,
  descripcion TEXT
);

-- Usuarios admin
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuración Local

### 1. Instalar Dependencias
```bash
cd basic-front
npm install
```

### 2. Configurar PostgreSQL

**Opción A: Supabase (RECOMENDADO - Gratis y en la nube)**
1. Ve a https://supabase.com y crea un proyecto gratis
2. Obtén la Connection String (Session Pooler, puerto 6543)
3. Ver guía completa en: `CONFIGURACION-SUPABASE.md`

**Opción B: PostgreSQL Local**
1. Descarga e instala PostgreSQL: https://www.postgresql.org/download/
2. Crea una base de datos:
```bash
psql -U postgres
CREATE DATABASE santa_armonia;
\q
```

**Opción C: Docker**
```bash
docker run --name postgres-spa -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=santa_armonia -p 5432:5432 -d postgres:15
```

### 3. Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz de `basic-front/`:

**Para Supabase (recomendado):**
```bash
# Supabase Session Pooler (puerto 6543)
DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Para PostgreSQL local:**
```bash
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/santa_armonia
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Iniciar la Aplicación

```bash
npm run dev
```

La aplicación:
- ✅ Se conectará automáticamente a PostgreSQL
- ✅ Creará las tablas si no existen
- ✅ Insertará los feriados de 2025
- ✅ Estará lista para usar en http://localhost:3000

## ☁️ Desplegar en Producción

### Opción 1: Vercel + Neon (Recomendado - Gratis)

**1. Crear base de datos en Neon**
- Ve a https://neon.tech
- Crea una cuenta gratis
- Crea un nuevo proyecto
- Copia la cadena de conexión (DATABASE_URL)

**2. Desplegar en Vercel**
```bash
npm install -g vercel
vercel login
vercel
```

**3. Configurar variable de entorno en Vercel**
- Ve al dashboard de tu proyecto en Vercel
- Settings → Environment Variables
- Agrega: `DATABASE_URL` con el valor de Neon
- Redespliega: `vercel --prod`

### Opción 2: Vercel + Supabase (Gratis)

**1. Crear proyecto en Supabase**
- Ve a https://supabase.com
- Crea un proyecto gratis
- Ve a Settings → Database
- Copia la Connection String (URI mode)

**2. En Vercel**
- Agrega `DATABASE_URL` con la cadena de Supabase
- Deploy

### Opción 3: Railway (Todo en uno)

**1. Crear cuenta en Railway**
- Ve a https://railway.app
- Conecta tu repositorio de GitHub

**2. Agregar PostgreSQL**
- Desde el dashboard, agrega un servicio PostgreSQL
- Railway generará automáticamente `DATABASE_URL`

**3. Deploy**
- Railway detectará Next.js y desplegará automáticamente

## 🔄 Migración de Datos Existentes

Si ya tienes datos en SQLite y quieres migrarlos:

### 1. Exportar datos de SQLite
```bash
cd basic-front
sqlite3 spa_reservas.db .dump > backup.sql
```

### 2. Convertir a PostgreSQL

Edita `backup.sql` y cambia:
- `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY`
- `DATETIME` → `TIMESTAMP`
- Tipos de datos según sea necesario

### 3. Importar a PostgreSQL
```bash
psql -U postgres -d santa_armonia < backup_editado.sql
```

## 📝 Notas Importantes

### Tratamientos
- ✅ Los tratamientos están **solo en el código** (`src/app/reservar/page.tsx`)
- ✅ Para agregar/editar tratamientos, modifica el objeto `TRATAMIENTOS`
- ✅ No hay tabla `tratamientos` en la BD

### Cambios en el Frontend
- El formulario de reserva ahora envía campos adicionales:
  - `tratamientoPrecio`
  - `tratamientoDuracion`
  - `tratamientoCategoria`

### Cambios en el Backend
- `crearReserva()` ahora acepta datos completos del tratamiento
- `verificarDisponibilidad()` recibe la categoría directamente
- `getReservas()` devuelve datos del tratamiento embebidos en la reserva

## 🐛 Solución de Problemas

### Error: "DATABASE_URL no está definida"
- Verifica que el archivo `.env.local` existe
- Reinicia el servidor de desarrollo

### Error de conexión a PostgreSQL
- Verifica que PostgreSQL esté corriendo: `psql -U postgres -l`
- Verifica la cadena de conexión en `.env.local`
- En producción, verifica que SSL esté habilitado

### Las tablas no se crean
- La primera vez que accedas a cualquier endpoint, las tablas se crean automáticamente
- Verifica los logs de la consola
- Prueba accediendo a http://localhost:3000/api/test-db

## 📚 Estructura de Archivos Modificados

```
basic-front/
├── package.json                    ✅ Actualizado (pg en vez de sqlite)
├── .env.local                      ✅ Nuevo (DATABASE_URL)
├── .gitignore                      ✅ Actualizado (ignora .env y .db)
├── src/
│   ├── lib/
│   │   └── database.ts            ✅ Reescrito para PostgreSQL
│   ├── app/
│   │   ├── reservar/
│   │   │   └── page.tsx           ✅ Envía datos completos del tratamiento
│   │   └── api/
│   │       ├── reservar/route.ts  ✅ Actualizado
│   │       ├── horarios/route.ts  ✅ Actualizado para PostgreSQL
│   │       ├── reservas/route.ts  ✅ Actualizado
│   │       ├── test-db/route.ts   ✅ Reescrito para PostgreSQL
│   │       └── debug-reservas/    ✅ Reescrito para PostgreSQL
└── MIGRACION-POSTGRESQL.md        ✅ Este archivo
```

## ✅ Checklist de Deployment

- [ ] PostgreSQL configurado (local o cloud)
- [ ] Variable `DATABASE_URL` definida
- [ ] Dependencias instaladas (`npm install`)
- [ ] La aplicación arranca sin errores
- [ ] Puedes crear una reserva de prueba
- [ ] Las reservas se muestran en el admin
- [ ] Los horarios ocupados funcionan correctamente

## 🎉 ¡Listo!

Tu aplicación ahora está optimizada y lista para producción con:
- ✅ PostgreSQL escalable
- ✅ Sin duplicación de datos
- ✅ Una sola fuente de verdad para tratamientos
- ✅ Más simple y fácil de mantener

