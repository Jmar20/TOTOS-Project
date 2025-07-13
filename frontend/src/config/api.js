// Configuración de API para diferentes entornos
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://totos-api-ddf7gtgch4beh3hv.brazilsouth-01.azurewebsites.net',
    timeout: 15000,
  }
};

// Detectar el entorno actual
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

export const API_BASE_URL = currentConfig.baseURL;
export const API_TIMEOUT = currentConfig.timeout;

// URLs completas para las rutas de API
export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
  logout: `${API_BASE_URL}/api/auth/logout`,
  forgotPassword: `${API_BASE_URL}/api/auth/solicitarCambioContrasena`,
  resetPassword: `${API_BASE_URL}/api/auth/cambiarContrasena`,
  verifyToken: `${API_BASE_URL}/api/auth/verify`,
  
  // Clients
  clients: `${API_BASE_URL}/api/clients`,
  clientById: (id) => `${API_BASE_URL}/api/clients/${id}`,
  
  // Mandiles
  mandiles: `${API_BASE_URL}/api/mandiles`,
  mandilById: (id) => `${API_BASE_URL}/api/mandiles/${id}`,
  
  // Pedidos
  pedidos: `${API_BASE_URL}/api/pedidos`,
  pedidoById: (id) => `${API_BASE_URL}/api/pedidos/${id}`,
};

console.log(`🌐 API configurada para: ${isDevelopment ? 'DESARROLLO' : 'PRODUCCIÓN'}`);
console.log(`📍 Base URL: ${API_BASE_URL}`);
