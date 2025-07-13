import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './api.js';

// Crear instancia de axios con configuración predeterminada
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: true, // Importante para cookies de autenticación
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para requests (agregar tokens, logs, etc.)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses (manejar errores globalmente)
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
    
    // Manejar errores comunes
    if (error.response?.status === 401) {
      console.warn('🔒 Token expirado, redirigiendo a login...');
      // Opcional: redirigir automáticamente al login
      // window.location.href = '/login';
    }
    
    if (error.response?.status >= 500) {
      console.error('🚨 Error del servidor');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
