// Configuración para desarrollo - Backend con puertos específicos
export const environment = {
  production: false,
  
  // 🌐 API Configuration - URLs con proxy para evitar CORS
  apiCreateUrl: '/api', // Proxy redirige a puerto 8080
  apiReadUrl: '/api',   // Proxy redirige a puerto 8090
  
  // 🔑 Authentication API (del equipo backend) - URL con proxy
  authApiUrl: '/api',
  
  // ⚙️ DevBadge Configuration - HABILITADO para probar login
  devBadge: {
    enabled: true, // HABILITADO para probar el nuevo endpoint
    defaultCredentials: {
      username: 'dev',        
      password: 'testpa$$'    
    }
  },
  
  // Configuración de autenticación real
  authEnabled: true,
  useVpsForAuth: true,
  
  endpoints: {
    // Endpoints de autenticación - confirmado que funciona
    auth: {
      login: '/auth/authentication/login',       // POST confirmado funcionando
      logout: '/authentication/logout',         // POST según documentación oficial
      validateCookie: '/validation/cookie',     // GET según documentación oficial
      validateHeader: '/validation/header'      // GET según documentación oficial - TEMPORALMENTE DESHABILITADO
    },
    finalConsumerBill: {
      create: '/final-consumer/create',    // POST para crear facturas
      getAll: '/final-consumer/all',       // GET para obtener todas las facturas
      getByGenerationCode: '/final-consumer/generation-code', // GET por código de generación
      update: '/final-consumer',
      delete: '/final-consumer'
    }
  }
};