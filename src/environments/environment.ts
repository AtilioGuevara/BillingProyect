// Configuración para desarrollo - Backend con puertos específicos
export const environment = {
  production: false,
  
  //  API de facturación - Directo sin proxy
  apiCreateUrl: 'https://bill.beckysflorist.site/bill/api', // CREATE directo
  apiReadUrl: 'https://bill.beckysflorist.site/bill/api',   // READ directo

  //API de Inventario - Directo sin proxy
  inventoryApiUrl: 'http://37.60.243.227:8080/api/productos',

  // Authentication API - También vía proxy
  authApiUrl: 'https://accounts.beckysflorist.site/api/auth',

  authEndpoints: {
    login: '/authentication/login',
    verify: '/authentication/verify',
    logout: '/authentication/logout'
  },
  
  // Configuración de la base de datos (para referencia, no se usa en frontend)
  database: {
    host: 'localhost',
    name: 'bill_dev', // Base de datos de desarrollo
  },
  
  // Configuración de seguridad para desarrollo
  enableHttps: false, // HTTP para desarrollo local
  
  // Configuración de autenticación
  auth: {
    enabled: true,
    // URL del sistema de login externo
    externalLoginUrl: 'https://accounts.beckysflorist.site/login',
    // URL de retorno después del login exitoso - DIRECTO A LA LISTA
    callbackUrl: 'bill.beckysflorist.site/final-consumer-bill/list',
    // URL local para desarrollo
    localCallbackUrl: 'http://localhost:4200/final-consumer-bill/list'
  },
  
  endpoints: {
    // Endpoints de autenticación - confirmado que funciona
    finalConsumerBill: {
      create: '/create/create',              // POST bill.beckysflorist.site/bill/api/create/create
      getAll: '/get/all',                    // GET bill.beckysflorist.site/bill/api/get/all
      getByGenerationCode: '/get/generation-code', // GET bill.beckysflorist.site/bill/api/get/generation-code/{codigo}
      
      // Endpoints de devoluciones
      getReturnInfo: '/get/return/info',     // GET bill.beckysflorist.site/bill/api/get/return/info/{codigo}
      createReturn: '/create/return'         // POST bill.beckysflorist.site/bill/api/create/return/{codigo}
    }
  },
  
  // Configuración adicional del VPS (para referencia en desarrollo)
  vps: {
    ip: '37.60.243.227',
    port: 8090,
    sshCommand: 'ssh bill@37.60.243.227',
  }
};