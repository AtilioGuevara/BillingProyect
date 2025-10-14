# 🔧 Troubleshooting: Login Externo no Redirige de Vuelta

## 🚨 Problema Reportado
- ✅ El usuario es enviado al login externo
- ❌ Después de autenticarse, no regresa al sistema de facturación

## 🔍 Pasos de Diagnóstico

### 1. **Verificar URLs de Redirección**

Abrir la consola del navegador (F12) y ejecutar:
```javascript
// Verificar configuración de URLs
authTest.testRedirectUrls()
```

Esto mostrará:
- URL de login configurada
- URL de callback configurada  
- URL completa que se envía al sistema externo

### 2. **Verificar que tu compañero recibe la URL correcta**

La URL que se envía debe ser:
```
https://accounts.beckysflorist.site/login?returnUrl=https%3A//bill.beckysflorist.site/auth/callback&clientId=billing-app&source=billing-system
```

### 3. **Verificar que el callback funciona**

Simular retorno con token:
```javascript
// Simular callback con token
authTest.testCallbackWithToken('token-de-prueba-123')
```

### 4. **Verificar cookies**

```javascript
// Verificar funcionamiento de cookies
authTest.testCookies()
```

## 🛠️ Posibles Causas y Soluciones

### Causa 1: **Tu compañero no está usando la returnUrl**

**Solución**: Tu compañero debe:
```javascript
// En su sistema, después del login exitoso:
const urlParams = new URLSearchParams(window.location.search);
const redirectUrl = urlParams.get('redirect'); // CAMBIO: 'redirect' en lugar de 'returnUrl'

if (redirectUrl && token) {
  // Opción 1: Redirect con token en query
  window.location.href = `${redirectUrl}?token=${token}`;
  
  // Opción 2: Redirect con token en hash
  window.location.href = `${redirectUrl}#token=${token}`;
  
  // Opción 3: Establecer cookie y redirect (RECOMENDADO)
  document.cookie = `token=${token}; path=/; domain=.beckysflorist.site; SameSite=Lax`;
  window.location.href = redirectUrl;
}
```

### Causa 2: **Problema de CORS o Cookies entre dominios**

**Solución**: Tu compañero debe configurar:
```javascript
// Permitir cookies entre subdominios
domain: '.beckysflorist.site'  // Nota el punto inicial
```

### Causa 3: **La ruta /auth/callback no existe**

**Verificación**: Ir manualmente a:
```
https://bill.beckysflorist.site/auth/callback
```

Si aparece un 404, el problema es que la ruta no está desplegada.

### Causa 4: **Problema con parámetros esperados**

Tu compañero debe verificar que recibe:
- `returnUrl`: URL de retorno
- `clientId`: Identificador de la app
- `source`: Origen de la petición

## 📞 Coordinación con tu Compañero

### Información para compartir:

```
PARÁMETRO CORRECTO: redirect=URL_DE_CALLBACK
URL de callback esperada: https://bill.beckysflorist.site/auth/callback

Métodos para enviar el token (en orden de preferencia):

1. Cookie + Redirect (RECOMENDADO):
   const redirectUrl = urlParams.get('redirect'); // Obtener URL del parámetro 'redirect'
   document.cookie = 'token=JWT_TOKEN; path=/; domain=.beckysflorist.site; SameSite=Lax';
   window.location.href = redirectUrl;

2. Query Parameter:
   window.location.href = redirectUrl + '?token=' + JWT_TOKEN;

3. Hash Fragment:
   window.location.href = redirectUrl + '#token=' + JWT_TOKEN;
```

### Test Manual:

1. Tu compañero puede probar directamente:
```
https://accounts.beckysflorist.site/login?redirect=https://bill.beckysflorist.site/auth/callback&clientId=billing-app&source=billing-system
```

2. Después del login, debe redirigir a:
```
https://bill.beckysflorist.site/auth/callback?token=XXXX
```

## 🧪 Tests Manuales

### En Producción:

1. **Ir a**: `https://bill.beckysflorist.site`
2. **Verificar redirección**: Debe ir a `accounts.beckysflorist.site`
3. **Login**: Ingresar credenciales  
4. **Verificar retorno**: Debe volver a `bill.beckysflorist.site/auth/callback`

### Comando de debug en consola:
```javascript
// Ver información completa del entorno
console.log(authTest.getEnvironmentInfo());

// Limpiar datos de test
authTest.clearTestData();
```

## 📝 Logs a Revistar

En la consola del navegador, buscar:
- `🚀 Redirigiendo al sistema de login...`
- `🔄 AuthCallback: Procesando retorno...`  
- `🔍 Buscando token...`
- `✅ Token encontrado...` o `❌ No se encontró token...`

## ⚡ Solución Rápida Temporal

Mientras se resuelve, puedes crear un botón manual:

```javascript
// En la consola, simular token recibido:
localStorage.setItem('authToken', 'token-manual-123');
document.cookie = 'token=token-manual-123; path=/';
window.location.href = '/';
```