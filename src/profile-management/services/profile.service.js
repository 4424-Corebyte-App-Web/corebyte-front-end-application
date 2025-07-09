import axios from 'axios';

const API_URL = import.meta.env.DEV 
  ? '/api/v1/auth' 
  : 'https://corebyte-backendapplication.azurewebsites.net/api/v1/auth';

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('No authentication token found in localStorage');
      throw new Error('No authentication token found');
    }
    
    // Try to get user from localStorage first
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed && typeof parsed === 'object' && parsed.id && parsed.username) {
          // Verify token is still valid by making a lightweight request
          try {
            await axios.get(`${API_URL}/verify-token`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
              },
              validateStatus: status => status === 200 || status === 401
            });
            return parsed;
          } catch (verifyError) {
            console.warn('Token verification failed, fetching fresh user data');
            // Continue to fetch fresh data if token verification fails
          }
        }
      }
    } catch (e) {
      console.warn('Error processing localStorage user data:', e);
      // Continue to fetch fresh data if there's any error with localStorage
    }
    
    // Fetch fresh user data from the server
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        validateStatus: status => status === 200 || status === 401
      });
      
      if (response.status === 401) {
        // Clear invalid auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        throw new Error('Sesión expirada. Por favor inicie sesión nuevamente.');
      }
      
      if (!response.data) {
        throw new Error('No se recibieron datos del servidor');
      }
      
      // Validate the response data structure
      const userData = response.data;
      if (!userData || typeof userData !== 'object' || !userData.id || !userData.username) {
        throw new Error('Datos de usuario inválidos recibidos del servidor');
      }
      
      // Save valid user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      // Ensure required fields exist
      const requiredFields = ['id', 'username', 'email'];
      const missingFields = requiredFields.filter(field => !(field in userData));
      if (missingFields.length > 0) {
        throw new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`);
      }
      
      // Save valid user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Error fetching user from API:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error fetching current user:', error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw error;
  }
};

export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.post(
      `${API_URL}/change-password`,
      { 
        currentPassword: currentPassword,
        newPassword: newPassword 
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    
    if (response.data && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw error;
  }
};
