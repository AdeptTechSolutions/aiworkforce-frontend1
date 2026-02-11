// src/services/authService.js
import api from './api.js';

export const authService = {
  /**
   * Login user with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, user?: object, token?: string, error?: string}>}
   */

  login: async (email, password) => {
    try {
      const response = await api.post('/platform/auth/login', {
        email,
        password,
      });

      const data = response.data;

      // Check subscription status from response
      const hasSubscription = !!(
        data.service_ids && data.service_ids.length > 0
      );

      return {
        success: true,
        user: data.user,
        token: data.access_token,
        organization: data.organization,
        seatId: data.seat_id,
        serviceIds: data.service_ids,
        serviceDetails: data.service_details,
        hasSubscription: hasSubscription,
      };
    } catch (error) {
      console.error("Login error:", error);
      const data = error.response?.data;
      return {
        success: false,
        error:
          data?.message ||
          data?.detail ||
          "Login failed. Please check your credentials.",
      };
    }
  },

  /**
   * Register new user
   * @param {object} userData - { firstName, lastName, email, password, organisation, location, phone, countryCode }
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  signUp: async (userData) => {
    try {
      const response = await api.post('/platform/auth/owner/register', {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        organization_name: userData.organisation,
        organization_type: "solo", // Default value
      });

      const data = response.data;

      return {
        success: true,
        message: data.message || "Account created successfully.",
        user: data.user || data,
      };
    } catch (error) {
      console.error("SignUp error:", error);
      const data = error.response?.data;
      return {
        success: false,
        error:
          data?.message ||
          data?.detail ||
          "Registration failed. Please try again.",
      };
    }
  },

  /**
   * Logout user
   * @returns {Promise<{success: boolean}>}
   */
  logout: async () => {
    try {
      // If your backend has a logout endpoint, uncomment below:
      // await api.post('/logout');

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: true }; // Still return success to clear local state
    }
  },

  /**
   * Request password reset
   * @param {string} email
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/forgot-password', { email });
      const data = response.data;

      return {
        success: true,
        message: data.message || "Password reset link sent to your email.",
      };
    } catch (error) {
      console.error("Forgot password error:", error);
      const data = error.response?.data;
      return {
        success: false,
        error: data?.message || data?.detail || "Failed to send reset email.",
      };
    }
  },

  /**
   * Verify token validity
   * @returns {Promise<{valid: boolean, user?: object}>}
   */
  verifyToken: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { valid: false };

      const response = await api.get('/verify');
      const data = response.data;

      return {
        valid: true,
        user: data.user || data,
      };
    } catch (error) {
      console.error("Token verification error:", error);
      return { valid: false };
    }
  },
};

export default authService;
