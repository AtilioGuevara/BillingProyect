import { Environment } from './environment.interface';

// Configuración para producción (VPS)
export const environment: Environment = {
  production: true,
  
  // 🌐 API Configuration - URLs directas con dominio
  apiCreateUrl: 'https://bill.beckysflorist.site/bill/api', // CREATE directo
  apiReadUrl: 'https://bill.beckysflorist.site/bill/api',   // READ directo

  //API de Inventario - Directo sin proxy
  inventoryApiUrl: 'http://37.60.243.227:8080/api/productos',

  //API de Clientes
  clientApiUrl: 'http://31.220.87.189:8080/api/clientes/buscar?filtro=',
  
  // 🔑 Authentication API - URL directa del microservicio
  authApiUrl: 'https://accounts.beckysflorist.site/api/',

  
  // Configuración de la base de datos (para referencia, no se usa en frontend)
  database: {
    host: '37.60.243.227',
    name: 'bill', // Base de datos PostgreSQL
    // Credenciales manejadas solo en backend por seguridad
  },
  
  // Configuración de seguridad para producción
  enableHttps: true, // SSL/TLS habilitado para bill.beckysflorist.site
  
   authEndpoints: {
     login: '/authentication/login',
     verify: '/authentication/verify',
     logout: '/authentication/logout'
   },
  
  // Configuración de autenticación externa
  auth: {
    enabled: true,
    // URL del sistema de login externo de tu compañero
    externalLoginUrl: 'https://accounts.beckysflorist.site/login',
    // URL de retorno después del login exitoso (producción) - DIRECTO A LA LISTA
    callbackUrl: 'https://bill.beckysflorist.site/final-consumer-bill/list',
    // URL local para desarrollo
    localCallbackUrl: 'http://localhost:4200/final-consumer-bill/list'
  },

  endpoints: {
    finalConsumerBill: {
      create: '/create/create',                  // POST bill.beckysflorist.site/bill/api/create/create
      getAll: '/get/all',                        // GET bill.beckysflorist.site/bill/api/get/all
      getByGenerationCode: '/get/generation-code', // GET bill.beckysflorist.site/bill/api/get/generation-code/{codigo}
      
      // Endpoints de devoluciones
      getReturnInfo: '/get/return/info',         // GET bill.beckysflorist.site/bill/api/get/return/info/{codigo}
      createReturn: '/create/return'             // POST bill.beckysflorist.site/bill/api/create/return/{codigo}
    }
  },
  
  // Configuración adicional del VPS
  vps: {
    ip: '37.60.243.227',
    port: 8090, // Puerto actualizado del backend
    sshCommand: 'ssh bill@37.60.243.227', // Para conexión SSH con usuario deploy
  }
};