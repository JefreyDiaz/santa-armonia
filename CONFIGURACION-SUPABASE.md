# 🎯 Configuración de Supabase para Spa Santa Armonía

## ✅ Configuración Completa en 5 Pasos

### 📍 **Paso 1: Obtener la Cadena de Conexión**

1. Ve a tu proyecto en **https://supabase.com**
2. Clic en el botón **"Connect"** (arriba a la derecha)
3. En el modal que aparece, configura:
   - **Type**: URI
   - **Source**: Primary Database
   - **Method**: **Session Pooler** ⚠️ ← IMPORTANTE (NO "Direct connection")

4. Copia la cadena de conexión que aparece:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   ```

5. **Importante**: Nota que el puerto es **6543** (Session Pooler), NO 5432

---

### 📍 **Paso 2: Obtener tu Contraseña**

Si no recuerdas tu contraseña de la base de datos:

1. En Supabase, ve a **Settings** (⚙️ abajo a la izquierda)
2. Clic en **Database**
3. Clic en **"Reset database password"**
4. Copia la nueva contraseña

---

### 📍 **Paso 3: Configurar Variables de Entorno Localmente**

1. En la carpeta `basic-front/`, copia el archivo de ejemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edita `.env.local` y reemplaza:
   ```bash
   DATABASE_URL=postgresql://postgres.mblvnlkluhdxhjzymhpl:[TU-CONTRASEÑA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   ```
   
   **Reemplaza:**
   - `[TU-CONTRASEÑA]` con tu contraseña real (sin corchetes)
   - `mblvnlkluhdxhjzymhpl` con tu proyecto ID de Supabase
   - `aws-0-sa-east-1` con tu región (por ejemplo: `aws-0-sa-east-1` para São Paulo)

---

### 📍 **Paso 4: Iniciar el Proyecto Localmente**

```bash
cd basic-front
npm install
npm run dev
```

**Al iniciar por primera vez, el sistema automáticamente:**
- ✅ Se conecta a Supabase
- ✅ Crea las 5 tablas necesarias
- ✅ Inserta los 18 feriados de 2025
- ✅ Está listo para usar

---

### 📍 **Paso 5: Verificar que Funciona**

#### **Opción A: Desde el navegador**
1. Abre http://localhost:3000
2. Intenta crear una reserva de prueba
3. Si se crea sin errores, ¡funciona! ✅

#### **Opción B: Desde Supabase Dashboard**
1. Ve a tu proyecto en Supabase
2. Clic en **Table Editor** (icono de tabla a la izquierda)
3. Deberías ver las tablas creadas:
   - `clientes`
   - `reservas`
   - `wa_outgoing`
   - `feriados`
   - `usuarios`

---

## 🚀 Desplegar a Producción (Vercel)

### **1. Desplegar el código**

```bash
npm install -g vercel
vercel login
vercel
```

### **2. Configurar Variables de Entorno en Vercel**

1. Ve al dashboard de tu proyecto en **https://vercel.com**
2. **Settings** → **Environment Variables**
3. Agrega una nueva variable:
   - **Name**: `DATABASE_URL`
   - **Value**: (pega tu connection string completo de Supabase)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
4. Clic en **Save**

### **3. Redeploy**

```bash
vercel --prod
```

¡Listo! Tu aplicación estará en producción con Supabase.

---

## 🔧 Optimizaciones Aplicadas

Tu código ya está optimizado para Supabase Session Pooler:

✅ **Pool de conexiones configurado para serverless**
- `max: 1` - Solo 1 conexión por instancia (óptimo para serverless)
- `idleTimeoutMillis: 0` - Sin timeout
- `allowExitOnIdle: true` - Permite que Node.js termine correctamente

✅ **NO se cierra el pool en las rutas API**
- El pool se reutiliza entre peticiones
- Mejor rendimiento y menos errores

✅ **SSL habilitado en producción**
- Conexión segura automática cuando `NODE_ENV=production`

---

## 🐛 Solución de Problemas

### Error: "DATABASE_URL no está definida"
**Causa**: El archivo `.env.local` no existe o no tiene la variable

**Solución**:
```bash
# Verifica que existe el archivo
ls -la .env.local

# Si no existe, créalo desde el ejemplo
cp .env.local.example .env.local

# Reinicia el servidor
npm run dev
```

---

### Error: "password authentication failed"
**Causa**: La contraseña en `DATABASE_URL` es incorrecta

**Solución**:
1. Ve a Supabase → Settings → Database
2. Resetea la contraseña
3. Actualiza `.env.local` con la nueva contraseña
4. Reinicia el servidor

---

### Error: "too many connections" o "connection timeout"
**Causa**: Estás usando Direct Connection (puerto 5432) en vez de Session Pooler

**Solución**:
1. Ve a Supabase → Connect
2. Cambia **Method** a **"Session Pooler"**
3. Copia la nueva URL (puerto 6543)
4. Actualiza `.env.local`

---

### Error: "certificate verify failed" en producción
**Causa**: Configuración SSL incorrecta

**Solución**: Ya está configurado automáticamente en `database.ts`:
```typescript
ssl: process.env.NODE_ENV === 'production' ? {
  rejectUnauthorized: false
} : undefined
```

---

## 📊 Monitorear tu Base de Datos

### **En Supabase Dashboard:**
1. **Table Editor**: Ver y editar datos manualmente
2. **SQL Editor**: Ejecutar consultas SQL personalizadas
3. **Database → Usage**: Ver uso de espacio y conexiones
4. **Database → Backups**: Ver backups automáticos (7 días gratis)

### **Ejemplo de consultas útiles:**

```sql
-- Ver total de reservas
SELECT COUNT(*) FROM reservas;

-- Ver reservas de hoy
SELECT * FROM reservas WHERE fecha = '2025-01-07';

-- Ver clientes más frecuentes
SELECT c.nombre, COUNT(r.id) as total_reservas 
FROM clientes c 
JOIN reservas r ON c.id = r.cliente_id 
GROUP BY c.id, c.nombre 
ORDER BY total_reservas DESC 
LIMIT 10;
```

---

## 📈 Límites del Plan Gratuito

| Recurso | Límite |
|---------|--------|
| **Database Size** | 500 MB (alcanza para ~100,000 reservas) |
| **Bandwidth** | 2 GB/mes (reinicia cada mes) |
| **Backups** | 7 días automáticos |
| **Projects** | 2 proyectos activos |

**Para tu spa**: El plan gratuito te durará años. Solo pagarías ($25/mes) si creces muchísimo.

---

## ✅ Checklist de Verificación

- [ ] Proyecto creado en Supabase
- [ ] Connection String copiada (Session Pooler, puerto 6543)
- [ ] Archivo `.env.local` creado con DATABASE_URL
- [ ] `npm install` ejecutado
- [ ] `npm run dev` corre sin errores
- [ ] Se crearon las tablas en Supabase
- [ ] Puedes crear una reserva de prueba
- [ ] Variables de entorno configuradas en Vercel (para producción)

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa los logs**: `npm run dev` muestra errores detallados
2. **Verifica la conexión**: Prueba http://localhost:3000/api/test-db
3. **Supabase Dashboard**: Ve a Database → Logs para ver errores de BD
4. **Documentación oficial**: https://supabase.com/docs

---

¡Listo! Tu aplicación ya está completamente configurada con Supabase. 🎉

