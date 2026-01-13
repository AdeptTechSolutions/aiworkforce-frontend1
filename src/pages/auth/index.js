// src/pages/auth/index.js
// Export all auth pages for easy imports
export { default as LoginPage } from './LoginPage';
export { default as SignUpPage } from './SignUpPage';

// src/components/auth/index.js
// Export all auth components
export { default as AuthLayout } from './AuthLayout';

// src/context/index.js
// Export all contexts
export { AuthProvider, useAuth } from './AuthContext';

// src/services/index.js
// Export all services
export { authService } from './authService';

// ============================================
// Usage Example:
// ============================================
// import { LoginPage, SignUpPage } from './pages/auth';
// import { AuthLayout } from './components/auth';
// import { AuthProvider, useAuth } from './context';
// import { authService } from './services';