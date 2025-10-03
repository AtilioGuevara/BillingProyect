// Configuración para producción (VPS)
export const environment = {
  production: true,
  
  // 🌐 API Configuration - URLs directas con dominio
  apiCreateUrl: 'https://bill.beckysflorist.site/bill/api', // CREATE directo
  apiReadUrl: 'https://bill.beckysflorist.site/bill/api',   // READ directo
  
  // 🔑 Authentication API - URL directa del microservicio
  authApiUrl: 'https://accounts.beckysflorist.site/api/auth',
  
  // Configuración de la base de datos (para referencia, no se usa en frontend)
  database: {
    host: '37.60.243.227',
    name: 'bill', // Base de datos PostgreSQL
    // Credenciales manejadas solo en backend por seguridad
  },
  
  // Configuración de seguridad para producción
  enableHttps: true, // SSL/TLS habilitado para bill.beckysflorist.site
  
  endpoints: {
    finalConsumerBill: {
      create: '/create/create',                  // POST bill.beckysflorist.site/api/create/create
      getAll: '/get/all',                        // GET bill.beckysflorist.site/api/get/all
      getByGenerationCode: '/get/generation-code', // GET bill.beckysflorist.site/api/get/generation-code/{codigo}

    }
  },
  
  // Configuración adicional del VPS
  vps: {
    ip: '37.60.243.227',
    port: 8090, // Puerto actualizado del backend
    sshCommand: 'ssh bill@37.60.243.227', // Para conexión SSH con usuario deploy
  }
};