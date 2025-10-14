export const authConfig = {
  // URL del sistema de login de tu compañero
  loginUrl: 'https://tu-companero-auth.com/login',
  
  // Configuración de cookies
  cookieConfig: {
    tokenName: 'token',
    domain: window.location.hostname,
    secure: window.location.protocol === 'https:',
    sameSite: 'Lax' as const
  },
  
  // URLs de redirección después del login
  redirectUrls: {
    success: window.location.origin + '/dashboard',
    error: window.location.origin + '/login-error'
  }
};