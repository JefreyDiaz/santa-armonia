# Configuración de Variables de Entorno - Twilio

## 📋 Pasos para Configurar

### 1. Crear archivo `.env.local`

Crea un archivo llamado `.env.local` en la carpeta `basic-front/` con el siguiente contenido:

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=AC33291b03e50338227b94b23a3111bd3f
TWILIO_AUTH_TOKEN=REEMPLAZA_CON_TU_AUTH_TOKEN
TWILIO_WHATSAPP_NUMBER=whatsapp:+573116335256

# Content Template SID (obténlo de Twilio Content Template Builder después de crear la plantilla)
# Formato: HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_CONTENT_SID_RESERVA=HXcbea0eef41b48d930153a6a0448da0ed

# Opcional: Token de verificación (ya no se usa con Twilio, pero lo mantenemos por compatibilidad)
WHATSAPP_VERIFY_TOKEN=tu_token_secreto_aqui
```

---

## 🔑 Cómo Obtener el Auth Token

### Paso 1: Ir a la Consola de Twilio
1. Ve a: https://console.twilio.com/
2. Inicia sesión con tu cuenta

### Paso 2: Ir a Settings
1. En el menú superior, busca el ícono de **engranaje (⚙️)** o click en **"Admin"**
2. Click en **"Settings"** o **"General"**

### Paso 3: Ver el Auth Token
1. En la página de Settings, busca la sección **"Account Credentials"** o **"API Credentials"**
2. Verás dos valores:
   - **Account SID**: `AC33291b03e50338227b94b23a3111bd3f` (ya lo tienes)
   - **Auth Token**: Está oculto por seguridad
3. Click en el botón **"View"** o el ícono de **ojo (👁️)** junto a "Auth Token"
4. **IMPORTANTE**: El token se mostrará solo una vez
5. **Copia el token inmediatamente** y pégalo en tu archivo `.env.local`

### Paso 4: Guardar en `.env.local`
- Reemplaza `REEMPLAZA_CON_TU_AUTH_TOKEN` con el token que copiaste
- Guarda el archivo

---

## 📍 Ubicación Visual en Twilio

```
Twilio Console
├── Admin (menú superior)
│   └── Settings
│       └── General
│           ├── Account SID: AC33291b03e50338227b94b23a3111bd3f ✅
│           └── Auth Token: [View] 👁️ ← Click aquí
```

---

## ⚠️ Importante

1. **El Auth Token es secreto**: Nunca lo compartas ni lo subas a GitHub
2. **Solo se muestra una vez**: Si lo pierdes, puedes regenerarlo desde Settings
3. **Si regeneras el token**: El token anterior dejará de funcionar
4. **El archivo `.env.local` está en `.gitignore`**: No se subirá a Git (está bien)

---

## ✅ Verificación

Después de configurar las variables:

1. Reinicia tu servidor:
   ```bash
   npm run dev
   ```

2. Crea una reserva de prueba desde tu aplicación

3. Verifica que llegue el mensaje de WhatsApp

4. Si hay errores, revisa la consola del servidor para ver qué variable falta

---

## 🔄 Si Necesitas Regenerar el Auth Token

1. Ve a Settings → General
2. Busca "Auth Token"
3. Click en "Regenerate"
4. **IMPORTANTE**: Esto invalidará el token anterior
5. Actualiza el token en `.env.local`
6. Reinicia el servidor

