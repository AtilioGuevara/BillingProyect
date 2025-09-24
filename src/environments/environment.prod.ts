// Configuración para producción (VPS)
export const environment = {
  production: true,
  
  // Configuración del VPS: 37.60.243.227 - Puerto 8090
  apiUrl: 'http://37.60.243.227:8090/api', // Backend Spring Boot en el VPS
  
  // Configuración de la base de datos (para referencia, no se usa en frontend)
  database: {
    host: '37.60.243.227',
    name: 'bill', // Base de datos PostgreSQL
    // Credenciales manejadas solo en backend por seguridad
  },
  
  // Configuración de seguridad para producción
  enableHttps: false, // Cambiar a true si configuran SSL/TLS
  
  endpoints: {
    finalConsumerBill: {
      create: '/final-consumer', // POST para crear facturas
      getAll: '/final-consumer/all', // GET para obtener todas las facturas
      getByGenerationCode: '/final-consumer/generation-code', // GET por código de generación
      update: '/final-consumer',
      delete: '/final-consumer'
    }
  },
  
  // Configuración adicional del VPS
  vps: {
    ip: '37.60.243.227',
    port: 8090, // Puerto actualizado del backend
    sshCommand: 'ssh bill@37.60.243.227', // Para conexión SSH con usuario deploy
  }
};