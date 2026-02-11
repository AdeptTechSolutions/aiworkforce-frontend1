// src/components/auth/OnboardingGuard.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { STEP_ROUTES } from '../../services/onboardingService';

// Loading spinner component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4F46E5]"></div>
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

/**
 * ProtectedRoute - Simple auth check, redirects to login if not authenticated
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * PublicRoute - For login/signup pages, redirects authenticated users
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, status } = useOnboarding();
  
  // If not authenticated, show children (login/signup page)
  if (!isAuthenticated) {
    return children;
  }

  // If auth is loading, show loading
  if (authLoading) {
    return <LoadingScreen />;
  }

  // Wait for onboarding to initialize, but with a timeout
  const [timedOut, setTimedOut] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timer);
  }, []);

  // If onboarding hasn't initialized and hasn't timed out, show loading
  if (!initialized && !timedOut) {
    return <LoadingScreen />;
  }

  // Determine redirect URL
  let redirectTo = '/dashboard';
  
  if (status) {
    if (isOnboardingCompleted) {
      redirectTo = '/dashboard';
    } else if (currentStep) {
      redirectTo = STEP_ROUTES[currentStep] || '/choose-plan';
    }
  } else if (timedOut) {
    // If timed out without status, go to choose-plan as fallback
    redirectTo = '/choose-plan';
  }

  return <Navigate to={redirectTo} replace />;
};

/**
 * PaymentFlowRoute - For payment-related pages (choose-plan, cart)
 */
export const PaymentFlowRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Don't wait for onboarding status for payment flow
  // User needs to be able to access these pages to complete payment

  // If onboarding is already completed, redirect to dashboard
  if (initialized && isOnboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/**
 * IntegrationRoute - For integration hub page
 */
export const IntegrationRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, isStepCompleted, currentStep } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If onboarding is completed, redirect to dashboard
  if (initialized && isOnboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // If payment is not completed, redirect to choose-plan
  if (initialized && currentStep === 'payment') {
    return <Navigate to="/choose-plan" replace />;
  }

  return children;
};

/**
 * OnboardingQuestionsRoute - For onboarding questionnaire page
 */
export const OnboardingQuestionsRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If onboarding is completed, redirect to dashboard
  if (initialized && isOnboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // If payment is not completed, redirect to choose-plan
  if (initialized && currentStep === 'payment') {
    return <Navigate to="/choose-plan" replace />;
  }

  return children;
};

/**
 * DashboardRoute - For main dashboard
 * Requires full onboarding completion
 */
export const DashboardRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wait for onboarding to initialize
  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  // If onboarding is not completed, redirect to current step
  if (initialized && !isOnboardingCompleted) {
    const redirectTo = STEP_ROUTES[currentStep] || '/choose-plan';
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default {
  ProtectedRoute,
  PublicRoute,
  PaymentFlowRoute,
  IntegrationRoute,
  OnboardingQuestionsRoute,
  DashboardRoute,
};