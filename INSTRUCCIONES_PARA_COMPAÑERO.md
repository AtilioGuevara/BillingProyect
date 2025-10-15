# 🔧 Instrucciones para el sistema de login (accounts.beckysflorist.site)

## Problema identificado:
Las cookies generadas en `accounts.beckysflorist.site` no son visibles en `bill.beckysflorist.site` debido a restricciones de seguridad entre dominios diferentes.

## ✅ SOLUCIÓN RECOMENDADA: Token en URL

Después del login exitoso, redirigir con el token como parámetro:

### Código para implementar:

```javascript
// Después del login exitoso en accounts.beckysflorist.site
function redirectAfterLogin(token, redirectUrl) {
  // Agregar el token como parámetro en la URL
  const separator = redirectUrl.includes('?') ? '&' : '?';
  const finalUrl = `${redirectUrl}${separator}token=${token}`;
  
  console.log('Redirigiendo con token:', finalUrl);
  window.location.href = finalUrl;
}

// Ejemplo de uso:
// Si redirectUrl = "bill.beckysflorist.site/final-consumer-bill/list"
// Resultado: "bill.beckysflorist.site/final-consumer-bill/list?token=ABC123..."
```

### Nombres de parámetros soportados:
El sistema de facturación detecta automáticamente estos nombres:
- `token` ✅ (recomendado)
- `access_token` ✅
- `authToken` ✅  
- `jwt` ✅

### Ejemplo de redirección completa:
```
https://bill.beckysflorist.site/final-consumer-bill/list?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔄 Flujo completo actualizado:

1. Usuario hace clic en "Iniciar Sesión" en `bill.beckysflorist.site`
2. Redirección a: `accounts.beckysflorist.site/login?redirect=bill.beckysflorist.site/final-consumer-bill/list`
3. Usuario se autentica exitosamente
4. **TU SISTEMA** redirige a: `https://bill.beckysflorist.site/final-consumer-bill/list?token=TOKEN_AQUI`
5. Sistema de facturación detecta el token, lo guarda y limpia la URL
6. ¡Login completado exitosamente! 🎉

## ⚠️ Consideraciones de seguridad:
- El token se pasa temporalmente en la URL pero se limpia inmediatamente
- Se guarda en localStorage y cookies locales para uso posterior
- La URL se limpia automáticamente después de procesar el token

## 🧪 Para probar:
Después de implementar, el login debería funcionar sin problemas de cookies cross-domain.