// src/context/OnboardingContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { onboardingService, STEP_ROUTES, ONBOARDING_SUBSTEPS } from '../services/onboardingService';
import { useAuth } from './AuthContext';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  // Use ref to prevent multiple simultaneous fetches
  const fetchingRef = useRef(false);

  // Fetch onboarding status
  const fetchStatus = useCallback(async (force = false) => {
    // Prevent multiple simultaneous fetches
    if (fetchingRef.current && !force) {
      console.log('[OnboardingContext] Already fetching, skipping...');
      return;
    }

    if (!isAuthenticated) {
      setStatus(null);
      setLoading(false);
      setInitialized(true);
      return;
    }

    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus(null);
      setLoading(false);
      setInitialized(true);
      return;
    }

    try {
      fetchingRef.current = true;
      setLoading(true);
      setError(null);
      
      console.log('[OnboardingContext] Fetching status...');
      const data = await onboardingService.getStatus();
      console.log('[OnboardingContext] Status received:', data);
      
      setStatus(data);
      setInitialized(true);
    } catch (err) {
      console.error('[OnboardingContext] Failed to fetch onboarding status:', err);
      setError(err.message);
      // Still mark as initialized even on error to prevent infinite loading
      setInitialized(true);
      // Set a default status to prevent blocking
      setStatus(null);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [isAuthenticated]);

  // Fetch status when auth changes - only once
  useEffect(() => {
    if (isAuthenticated && !initialized && !fetchingRef.current) {
      fetchStatus();
    } else if (!isAuthenticated) {
      setStatus(null);
      setInitialized(false);
      setError(null);
    }
  }, [isAuthenticated, initialized, fetchStatus]);

  // Get redirect URL based on current status
  const getRedirectUrl = useCallback(async () => {
    try {
      const redirect = await onboardingService.getRedirect();
      
      if (redirect.is_onboarding_completed) {
        return '/dashboard';
      }
      
      if (redirect.redirect_to) {
        return redirect.redirect_to;
      }
      
      return STEP_ROUTES[redirect.current_step] || '/choose-plan';
    } catch (err) {
      console.error('[OnboardingContext] Failed to get redirect:', err);
      // Fallback to status-based redirect
      if (status?.is_onboarding_completed) {
        return '/dashboard';
      }
      return STEP_ROUTES[status?.current_step] || '/choose-plan';
    }
  }, [status]);

  // Complete a step
  const completeStep = useCallback(async (stepName, metadata = {}) => {
    try {
      console.log('[OnboardingContext] Completing step:', stepName);
      const result = await onboardingService.completeStep(stepName, metadata);
      console.log('[OnboardingContext] Step completed:', result);
      
      // Refresh status after completing a step
      await fetchStatus(true);
      
      return {
        success: true,
        nextStep: result.next_step,
        isCompleted: result.is_onboarding_completed,
        message: result.message,
      };
    } catch (err) {
      console.error(`[OnboardingContext] Failed to complete step ${stepName}:`, err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [fetchStatus]);

  // Skip a step
  const skipStep = useCallback(async (stepName) => {
    try {
      console.log('[OnboardingContext] Skipping step:', stepName);
      const result = await onboardingService.skipStep(stepName);
      
      // Refresh status after skipping
      await fetchStatus(true);
      
      return {
        success: true,
        nextStep: result.next_step,
        isCompleted: result.is_onboarding_completed,
      };
    } catch (err) {
      console.error(`[OnboardingContext] Failed to skip step ${stepName}:`, err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [fetchStatus]);

  // Skip all integration steps
  const skipAllIntegrations = useCallback(async () => {
    try {
      await onboardingService.skipAllIntegrations();
      await fetchStatus(true);
      return { success: true };
    } catch (err) {
      console.error('[OnboardingContext] Failed to skip integrations:', err);
      return { success: false, error: err.message };
    }
  }, [fetchStatus]);

  // Check if onboarding is completed
  const isOnboardingCompleted = status?.is_onboarding_completed ?? false;

  // Get current step name
  const currentStep = status?.current_step ?? null;

  // Get all steps
  const steps = status?.steps ?? [];

  // Check if a specific step is completed
  const isStepCompleted = useCallback((stepName) => {
    const step = steps.find(s => s.step_name === stepName);
    return step?.status === 'completed';
  }, [steps]);

  // Check if a specific step is the current step
  const isCurrentStep = useCallback((stepName) => {
    return currentStep === stepName;
  }, [currentStep]);

  // Get step status
  const getStepStatus = useCallback((stepName) => {
    const step = steps.find(s => s.step_name === stepName);
    return step?.status ?? 'pending';
  }, [steps]);

  // Get current onboarding substep (memoized to prevent re-renders)
  const getCurrentOnboardingSubstep = useCallback(() => {
    if (!status || !status.steps) return 0;
    
    const onboardingSteps = ['onboarding_1', 'onboarding_2', 'onboarding_3', 'knowledge_base'];
    
    for (let i = 0; i < onboardingSteps.length; i++) {
      const step = status.steps.find(s => s.step_name === onboardingSteps[i]);
      if (step && (step.status === 'pending' || step.is_current)) {
        return i;
      }
    }
    
    return 0;
  }, [status]);

  const value = {
    // State
    status,
    loading,
    error,
    initialized,
    isOnboardingCompleted,
    currentStep,
    steps,

    // Actions
    fetchStatus,
    getRedirectUrl,
    completeStep,
    skipStep,
    skipAllIntegrations,

    // Helpers
    isStepCompleted,
    isCurrentStep,
    getStepStatus,
    getCurrentOnboardingSubstep,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;