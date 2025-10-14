# Flujo de Autenticación Externa

## 📋 Resumen

Esta aplicación usa un sistema de autenticación externa desarrollado por tu compañero. El flujo funciona de la siguiente manera:

## 🔄 Flujo de Autenticación

### 1. **Usuario sin autenticar**
- La aplicación verifica si hay token válido
- Si no hay token → Redirige al login externo

**2. Redirección al Login Externo**
```typescript
URL: https://accounts.beckysflorist.site/login
Parámetros:
- redirect: https://bill.beckysflorist.site/auth/callback (según compañero)
- clientId: billing-app  
- source: billing-system
```

### 3. **Usuario se autentica**
- El usuario ingresa credenciales en el sistema externo
- El sistema externo valida las credenciales
- Si son válidas → Redirige de vuelta con token

### 4. **Callback de Retorno**
```typescript
URL de retorno: https://bill.beckysflorist.site/auth/callback
Métodos de recepción del token:
- Query parameters: ?token=abc123
- Hash fragment: #token=abc123  
- Cookie: token=abc123
```

### 5. **Procesamiento del Token**
- AuthCallbackComponent procesa el token recibido
- Guarda el token en localStorage y cookies
- Redirige al dashboard

## 🔧 Configuración

### Environment Variables
```typescript
// src/environments/environment.ts
auth: {
  enabled: true,
  externalLoginUrl: 'https://accounts.beckysflorist.site/login',
  callbackUrl: 'https://bill.beckysflorist.site/auth/callback',
  localCallbackUrl: 'http://localhost:4200/auth/callback'
}
```

### Rutas Configuradas
```typescript
// Ruta de callback
{
  path: 'auth/callback',
  component: AuthCallbackComponent
}
```

## 🛠️ Componentes Principales

### 1. AuthService
- `isAuthenticated()`: Verifica si hay token válido
- `redirectToLogin()`: Redirige al sistema externo
- `getToken()`: Obtiene token de localStorage/cookies
- `storeToken()`: Guarda token recibido

### 2. AuthCallbackComponent
- Procesa el retorno del login externo
- Maneja diferentes métodos de recepción del token
- Redirige al usuario después del login exitoso

### 3. AppComponent
- Verifica autenticación al inicializar
- Solo redirige en producción (no en localhost)

## 🔍 Debugging

### Verificar Token
```typescript
// En la consola del navegador
console.log('Token en localStorage:', localStorage.getItem('authToken'));
console.log('Token en cookies:', document.cookie);
```

### URLs de Prueba

**Desarrollo:**
- App local: `http://localhost:4200`
- Callback local: `http://localhost:4200/auth/callback`

**Producción:**
- App: `https://bill.beckysflorist.site`
- Login externo: `https://accounts.beckysflorist.site/login`
- Callback: `https://bill.beckysflorist.site/auth/callback`

## 📞 Coordinación con tu Compañero

### Lo que necesita configurar tu compañero:

1. **Validar parámetro redirect**
```typescript
// Su sistema debe aceptar el parámetro 'redirect' con estas URLs:
const validRedirectUrls = [
  'https://bill.beckysflorist.site/auth/callback',
  'http://localhost:4200/auth/callback'  // Para desarrollo
];
```

2. **Retornar el Token**
```typescript
// Después del login exitoso, debe redirigir a:
const redirectUrl = urlParams.get('redirect'); // Parámetro 'redirect' en lugar de 'returnUrl'

// Opción 1: Query parameter
`${redirectUrl}?token=${jwtToken}`

// Opción 2: Hash fragment  
`${redirectUrl}#token=${jwtToken}`

// Opción 3: Cookie (recomendado)
// Establecer cookie 'token' y redirigir a redirectUrl
```

3. **Configurar CORS (si es necesario)**
```typescript
// Si usa cookies, debe configurar CORS para:
allowedOrigins: [
  'https://bill.beckysflorist.site',
  'http://localhost:4200'
]
```

## 🚀 Para Probar

1. **Ir a la aplicación**
   ```
   https://bill.beckysflorist.site
   ```

2. **Sin token válido → Debe redirigir a:**
   ```
   https://accounts.beckysflorist.site/login?returnUrl=...
   ```

3. **Después del login → Debe volver a:**
   ```
   https://bill.beckysflorist.site/auth/callback
   ```

4. **Y finalmente ir a:**
   ```
   https://bill.beckysflorist.site/dashboard (o /)
   ```

## ⚠️ Notas Importantes

- En desarrollo (localhost) no se fuerza la redirección al login
- En producción sí se fuerza la redirección
- Los tokens se guardan tanto en localStorage como en cookies
- El componente AuthCallback maneja múltiples formas de recibir el token