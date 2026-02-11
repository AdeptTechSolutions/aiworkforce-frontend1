// src/services/subscriptionService.js
import api from './api.js';

export const subscriptionService = {
  // Get all available services/plans
  getServices: async () => {
    try {
      const response = await api.get('/platform/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Create Stripe checkout session
  subscribe: async (serviceIds) => {
    try {
      const response = await api.post('/platform/solo/subscribe', {
        service_ids: serviceIds,
      });
      return response.data;
    } catch (error) {
      // Handle 401 Unauthorized specifically
      if (error.response?.status === 401) {
        throw new Error('Please login to continue with checkout');
      }

      const errorData = error.response?.data || {};
      throw new Error(errorData.detail || errorData.message || `Failed to create checkout: ${error.response?.status || 'Unknown error'}`);
    }
  },

  // Sync services with Stripe (admin only)
  syncWithStripe: async (force = false) => {
    try {
      const response = await api.post('/platform/stripe/sync/all', { force });
      return response.data;
    } catch (error) {
      console.error('Error syncing with Stripe:', error);
      throw error;
    }
  },
};

// Helper to categorize services from API response
export const categorizeServices = (services) => {
  const mainPlans = [];
  const seoAddons = [];

  services.forEach(service => {
    const name = service.name.toLowerCase();
    
    // SEO plans start with "seo tier"
    if (name.startsWith('seo tier') || name.startsWith('seo ')) {
      seoAddons.push({
        id: service.id,
        name: service.name.replace('SEO ', '').replace(' - Free', '').replace(' - Starter', '').replace(' - Growth', '').replace(' - Professional', ''),
        price: service.price_per_seat ? parseFloat(service.price_per_seat) : 0,
        description: service.description,
        words: extractWords(service.description),
        isActive: service.is_active,
        stripeId: service.stripe_price_id,
      });
    } else {
      // Main subscription plans (Lead Builder tiers)
      const isTier3 = name.includes('tier 3') || name.includes('premium') || name.includes('b2c and b2b');
      mainPlans.push({
        id: service.id,
        name: service.name,
        price: service.price_per_seat ? parseFloat(service.price_per_seat) : 0,
        description: service.description,
        features: extractFeatures(service.description),
        isActive: service.is_active,
        stripeId: service.stripe_price_id,
        isBestseller: isTier3,
        hasAgentToggle: !isTier3,
        bothAgents: isTier3,
      });
    }
  });

  // Sort by price
  mainPlans.sort((a, b) => a.price - b.price);
  seoAddons.sort((a, b) => a.price - b.price);

  return { mainPlans, seoAddons };
};

// Extract word count from description
const extractWords = (description) => {
  const match = description.match(/([\d,]+)\s*words/i);
  if (match) {
    return `${match[1]} Words.`;
  }
  return 'Unlimited';
};

// Extract features from description
const extractFeatures = (description) => {
  // Split by comma and clean up
  const parts = description.split(',').map(p => p.trim());
  return parts.filter(p => p.length > 0);
};

export default subscriptionService;