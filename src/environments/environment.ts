// Configuración para desarrollo - Backend con puertos específicos
export const environment = {
  production: false,
  
  // 🌐 API Configuration - TODO vía proxy para evitar CORS
  apiCreateUrl: '/api', // CREATE vía proxy (tiene CORS)
  apiReadUrl: '/api',   // READ vía proxy (cambio importante)
  
  // 🔑 Authentication API - También vía proxy
  authApiUrl: '/api/auth',

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
    finalConsumerBill: {
      create: '/bill/create/create',              // POST bill.beckysflorist.site/bill/api/create/create
      getAll: '/bill/get/all',                    // GET bill.beckysflorist.site/bill/api/get/all
      getByGenerationCode: '/bill/get/generation-code', // GET bill.beckysflorist.site/bill/api/get/generation-code/{codigo}
      update: '/bill/final-consumer',
      delete: '/bill/final-consumer'
    }
  }
};