// src/services/authService.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const authService = {
  /**
   * Login user with email and password
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, user?: object, token?: string, error?: string}>}
   */
  login: async (email, password) => {
    // TODO: Replace with real API call when backend is ready
    // Example real implementation:
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // return response.json();

    // Simulated response for UI testing
    console.log('Login called with:', { email });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate validation
    if (email === 'error@test.com') {
      return { success: false, error: 'Invalid credentials' };
    }
    
    return {
      success: true,
      user: {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        organisation: 'Test Org',
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  /**
   * Register new user
   * @param {object} userData - { firstName, lastName, organisation, location, email, phone, countryCode, password }
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  signUp: async (userData) => {
    // TODO: Replace with real API call when backend is ready
    // Example real implementation:
    // const response = await fetch(`${API_BASE_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    // });
    // return response.json();

    console.log('SignUp called with:', userData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate email already exists error
    if (userData.email === 'exists@test.com') {
      return { success: false, error: 'Email already registered' };
    }
    
    return {
      success: true,
      message: 'Account created successfully. Please login.',
    };
  },

  /**
   * Logout user
   * @returns {Promise<{success: boolean}>}
   */
  logout: async () => {
    // TODO: Replace with real API call if backend requires logout endpoint
    // Example real implementation:
    // const token = localStorage.getItem('token');
    // await fetch(`${API_BASE_URL}/auth/logout`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${token}` },
    // });

    console.log('Logout called');
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  /**
   * Request password reset
   * @param {string} email 
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  forgotPassword: async (email) => {
    // TODO: Replace with real API call
    console.log('Forgot password for:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Password reset link sent to your email.',
    };
  },

  /**
   * Verify token validity
   * @returns {Promise<{valid: boolean, user?: object}>}
   */
  verifyToken: async () => {
    // TODO: Replace with real API call
    // const token = localStorage.getItem('token');
    // const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    //   headers: { 'Authorization': `Bearer ${token}` },
    // });
    // return response.json();

    const token = localStorage.getItem('token');
    if (!token) return { valid: false };
    
    return {
      valid: true,
      user: JSON.parse(localStorage.getItem('user') || '{}'),
    };
  },
};

export default authService;