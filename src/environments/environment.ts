// Configuración para desarrollo - Backend con puertos específicos
export const environment = {
  production: false,
  
  // 🌐 API Configuration - TODO vía proxy para evitar CORS
  apiCreateUrl: 'https://bill.beckysflorist.site/bill/api', // CREATE vía proxy (tiene CORS)
  apiReadUrl: 'https://bill.beckysflorist.site/bill/api',   // READ vía proxy (cambio importante)

  // 🔑 Authentication API - También vía proxy
  authApiUrl: 'https://accounts.beckysflorist.site/api/auth',

  authEndpoints: {
    login: '/authentication/login',
    verify: '/authentication/verify',
    logout: '/authentication/logout'
  },
  
  // Configuración de autenticación real
  authEnabled: true,
  useVpsForAuth: true,

  endpoints: {
    // Endpoints de autenticación - confirmado que funciona
    finalConsumerBill: {
      create: '/create/create',              // POST bill.beckysflorist.site/bill/api/create/create
      getAll: '/get/all',                    // GET bill.beckysflorist.site/bill/api/get/all
      getByGenerationCode: '/get/generation-code', // GET bill.beckysflorist.site/bill/api/get/generation-code/{codigo}
    }
  }
};