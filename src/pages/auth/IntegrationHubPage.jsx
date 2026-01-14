// src/pages/auth/IntegrationHubPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ConnectingModal,
  IntegrationSuccessModal,
  IntegrationErrorModal,
  TwilioNumberModal,
  VonageNumberModal
} from '../../components/modals/Modals';
import Header from '../../components/layout/Header';
import backgroundImage from '../../assets/Background.png';
import Sales from '../../assets/IntegrationIcons/salesforce.png';
import pipe from '../../assets/IntegrationIcons/Pipedrive.png';
import hub from '../../assets/IntegrationIcons/hubspot.png';
import zoho from '../../assets/IntegrationIcons/zoho.png';
import odoo from '../../assets/IntegrationIcons/odoo.png';
import outlook from '../../assets/IntegrationIcons/outlook.png';
import google from '../../assets/IntegrationIcons/google.png';
import calendly from '../../assets/IntegrationIcons/calendly.png';
import LinkedIn from '../../assets/IntegrationIcons/linkedin.png';
import whatsapp from '../../assets/IntegrationIcons/whatsapp.png';
import telegram from '../../assets/IntegrationIcons/telegram.png';
import twilio from '../../assets/IntegrationIcons/twilio.png';
import vonage from '../../assets/IntegrationIcons/vonage.png';



// Integration Icons
const SalesforceIcon = () => (
  <img src={Sales} alt="" />
);

const PipedriveIcon = () => (
  <img src={pipe} alt="" />
);

const HubspotIcon = () => (
  <img src={hub} alt="" />
);

const ZohoIcon = () => (
  <img src={zoho} alt="" />
);

const OdooIcon = () => (
  <img src={odoo} alt="" />
);

const OutlookIcon = () => (
 <img src={outlook} alt="" />
);

const GoogleIcon = () => (
  <img src={google} alt="" />
);

const CalendlyIcon = () => (
  <img src={calendly} alt="" />
);

const LinkedInIcon = () => (
  <img src={LinkedIn} alt="" />
);

const WhatsAppIcon = () => (
  <img src={whatsapp} alt="" />
);

const TelegramIcon = () => (
  <img src={telegram} alt="" />
);

const TwilioIcon = () => (
  <img src={twilio} alt="" />
);

const VonageIcon = () => (
  <img src={vonage} alt="" />
);

// Integration Item Component
const IntegrationItem = ({ 
  icon, 
  name, 
  status, // 'connected', 'failed', 'not_connected'
  onConnect, 
  onRetry,
  disabled = false 
}) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'connected':
        return (
          <span className="text-[#10B981] font-medium text-sm">Connected</span>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-3">
            <span className="px-3 py-8 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              Failed to connect
            </span>
            <button 
              onClick={onRetry}
              className="text-[#4F46E5] font-medium text-sm hover:text-[#4338CA] transition-colors"
            >
              Retry Connecting
            </button>
          </div>
        );
      default:
        return (
          <button 
            onClick={onConnect}
            disabled={disabled}
            className={`font-medium text-[16px] transition-colors ${
              disabled 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-[#4F46E5] hover:text-[#4338CA]'
            }`}
          >
            Connect
          </button>
        );
    }
  };

  return (
    <div className={`flex items-center justify-between p-8 bg-white border border-gray-100 rounded-xl ${
      disabled ? 'opacity-50' : ''
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
          {name}
        </span>
      </div>
      {getStatusDisplay()}
    </div>
  );
};

// Main Integration Hub Page
const IntegrationHubPage = () => {
  const navigate = useNavigate();
  
  // Integration states
  const [integrations, setIntegrations] = useState({
    // CRM
    salesforce: 'not_connected',
    pipedrive: 'not_connected',
    hubspot: 'not_connected',
    zoho: 'not_connected',
    odoo: 'not_connected',
    // Email & Calendar
    outlook: 'not_connected',
    google: 'not_connected',
    calendly: 'not_connected',
    // Social Media
    linkedin: 'not_connected',
    whatsapp: 'not_connected',
    telegram: 'not_connected',
    // Phone
    twilio: 'not_connected',
    vonage: 'not_connected',
  });

  // Modal states
  const [showConnecting, setShowConnecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showTwilioModal, setShowTwilioModal] = useState(false);
  const [showVonageModal, setShowVonageModal] = useState(false);
  
  // Current connecting integration
  const [currentIntegration, setCurrentIntegration] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Check if any CRM is connected (only one allowed)
  const connectedCRM = Object.entries(integrations)
    .find(([key, value]) => 
      ['salesforce', 'pipedrive', 'hubspot', 'zoho', 'odoo'].includes(key) && 
      value === 'connected'
    );

  // Check if continue button should be shown (at least one integration connected)
  const hasAnyConnection = Object.values(integrations).some(status => status === 'connected');

  // Handle OAuth connection (for CRM, Email, Social)
  const handleOAuthConnect = (integrationKey, integrationName) => {
    setCurrentIntegration({ key: integrationKey, name: integrationName });
    setShowConnecting(true);

    // Simulate API call - replace with actual OAuth flow
    setTimeout(() => {
      setShowConnecting(false);
      
      // Simulate success (80% chance) or failure (20% chance)
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        setIntegrations(prev => ({ ...prev, [integrationKey]: 'connected' }));
        setSuccessMessage(`We have successfully connected your ${integrationName} account.`);
        setShowSuccess(true);
      } else {
        setIntegrations(prev => ({ ...prev, [integrationKey]: 'failed' }));
        setShowError(true);
      }
    }, 2000);
  };

  // Handle Twilio import
  const handleTwilioImport = (formData) => {
    setShowTwilioModal(false);
    setCurrentIntegration({ key: 'twilio', name: 'Twilio' });
    setShowConnecting(true);

    // Simulate API call
    setTimeout(() => {
      setShowConnecting(false);
      setIntegrations(prev => ({ ...prev, twilio: 'connected' }));
      setSuccessMessage('We have successfully imported all of your contacts from your Twilio account.');
      setShowSuccess(true);
    }, 2000);
  };

  // Handle Vonage import
  const handleVonageImport = (formData) => {
    setShowVonageModal(false);
    setCurrentIntegration({ key: 'vonage', name: 'Vonage' });
    setShowConnecting(true);

    // Simulate API call
    setTimeout(() => {
      setShowConnecting(false);
      setIntegrations(prev => ({ ...prev, vonage: 'connected' }));
      setSuccessMessage('We have successfully imported all of your contacts from your Vonage account.');
      setShowSuccess(true);
    }, 2000);
  };

  // Handle retry connection
  const handleRetry = (integrationKey, integrationName) => {
    setIntegrations(prev => ({ ...prev, [integrationKey]: 'not_connected' }));
    handleOAuthConnect(integrationKey, integrationName);
  };

  // Handle skip for now
  const handleSkip = () => {
    navigate('/onboarding');
  };

  // Handle continue
  const handleContinue = () => {
    navigate('/onboarding');
  };

  // Close success modal
  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCurrentIntegration(null);
    setSuccessMessage('');
  };

  // Close error modal and retry
  const handleErrorRetry = () => {
    setShowError(false);
    if (currentIntegration) {
      handleOAuthConnect(currentIntegration.key, currentIntegration.name);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        >
      {/* Header */}
      <Header variant="simple" />
      {/* Main Content */}
      <main className="max-w-full bg-white mx-auto px-16 py-8 mt-6">
        {/* Title & Skip/Continue */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[32px] font-semibold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Integration Hub
          </h1>
          {hasAnyConnection ? (
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg font-medium hover:bg-[#4338CA] transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSkip}
              className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
            >
              Skip For Now
            </button>
          )}
        </div>

        {/* Connect your CRM */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Connect your CRM</h2>
          {/* <div className="flex items-center gap-2 mb-4 px-3 py-5 bg-gray-100 rounded-lg w-fit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18"/>
            </svg>
            <span className="text-sm text-gray-600">
              Note: You can connect one CRM at a time. If you want to connect multiple CRM. Do reach you us.
            </span>
          </div> */}
          
          <div className="space-y-2">
            <IntegrationItem
              icon={<SalesforceIcon />}
              name="Connect your Salesforce account"
              status={integrations.salesforce}
              onConnect={() => handleOAuthConnect('salesforce', 'Salesforce')}
              onRetry={() => handleRetry('salesforce', 'Salesforce')}
              disabled={connectedCRM && connectedCRM[0] !== 'salesforce'}
            />
            <IntegrationItem
              icon={<PipedriveIcon />}
              name="Connect your Pipedrive account"
              status={integrations.pipedrive}
              onConnect={() => handleOAuthConnect('pipedrive', 'Pipedrive')}
              onRetry={() => handleRetry('pipedrive', 'Pipedrive')}
              disabled={connectedCRM && connectedCRM[0] !== 'pipedrive'}
            />
            <IntegrationItem
              icon={<HubspotIcon />}
              name="Connect your Hubspot account"
              status={integrations.hubspot}
              onConnect={() => handleOAuthConnect('hubspot', 'Hubspot')}
              onRetry={() => handleRetry('hubspot', 'Hubspot')}
              disabled={connectedCRM && connectedCRM[0] !== 'hubspot'}
            />
            <IntegrationItem
              icon={<ZohoIcon />}
              name="Connect your Zoho account"
              status={integrations.zoho}
              onConnect={() => handleOAuthConnect('zoho', 'Zoho')}
              onRetry={() => handleRetry('zoho', 'Zoho')}
              disabled={connectedCRM && connectedCRM[0] !== 'zoho'}
            />
            <IntegrationItem
              icon={<OdooIcon />}
              name="Connect your Oddo account"
              status={integrations.odoo}
              onConnect={() => handleOAuthConnect('odoo', 'Odoo')}
              onRetry={() => handleRetry('odoo', 'Odoo')}
              disabled={connectedCRM && connectedCRM[0] !== 'odoo'}
            />
          </div>
        </section>

        {/* Connect your Email & Calendar */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Connect your Email & Calendar</h2>
          
          <div className="space-y-3">
            <IntegrationItem
              icon={<OutlookIcon />}
              name="Connect your Outlook account"
              status={integrations.outlook}
              onConnect={() => handleOAuthConnect('outlook', 'Outlook')}
              onRetry={() => handleRetry('outlook', 'Outlook')}
            />
            <IntegrationItem
              icon={<GoogleIcon />}
              name="Connect your Google account"
              status={integrations.google}
              onConnect={() => handleOAuthConnect('google', 'Google')}
              onRetry={() => handleRetry('google', 'Google')}
            />
            <IntegrationItem
              icon={<CalendlyIcon />}
              name="Connect your Calendly"
              status={integrations.calendly}
              onConnect={() => handleOAuthConnect('calendly', 'Calendly')}
              onRetry={() => handleRetry('calendly', 'Calendly')}
            />
          </div>
        </section>

        {/* Connect your Social Media Account */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Connect your Social Media Account</h2>
          
          <div className="space-y-3">
            <IntegrationItem
              icon={<LinkedInIcon />}
              name="Connect your LinkedIn account"
              status={integrations.linkedin}
              onConnect={() => handleOAuthConnect('linkedin', 'LinkedIn')}
              onRetry={() => handleRetry('linkedin', 'LinkedIn')}
            />
            <IntegrationItem
              icon={<WhatsAppIcon />}
              name="Connect your WhatsApp account"
              status={integrations.whatsapp}
              onConnect={() => handleOAuthConnect('whatsapp', 'WhatsApp')}
              onRetry={() => handleRetry('whatsapp', 'WhatsApp')}
            />
            <IntegrationItem
              icon={<TelegramIcon />}
              name="Connect your Telegram account"
              status={integrations.telegram}
              onConnect={() => handleOAuthConnect('telegram', 'Telegram')}
              onRetry={() => handleRetry('telegram', 'Telegram')}
            />
          </div>
        </section>

        {/* Add your Phone number */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Add your Phone number</h2>
          
          <div className="space-y-3">
            <IntegrationItem
              icon={<TwilioIcon />}
              name="Add your Twilio Number"
              status={integrations.twilio}
              onConnect={() => setShowTwilioModal(true)}
              onRetry={() => setShowTwilioModal(true)}
            />
            <IntegrationItem
              icon={<VonageIcon />}
              name="Add your Vonage Number"
              status={integrations.vonage}
              onConnect={() => setShowVonageModal(true)}
              onRetry={() => setShowVonageModal(true)}
            />
          </div>
        </section>
      </main>

      {/* Modals */}
      <ConnectingModal
        isOpen={showConnecting}
        onClose={() => setShowConnecting(false)}
        title="Connecting and importing..."
        message="We are importing your contact. Please wait and do not close this window."
      />

      <IntegrationSuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Successfully Imported!"
        message={successMessage}
        buttonText="Cancel"
      />

      <IntegrationErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Failed to import"
        message="Please ensure that you have filled correct info."
        buttonText="Retry Importing"
        onRetry={handleErrorRetry}
      />

      <TwilioNumberModal
        isOpen={showTwilioModal}
        onClose={() => setShowTwilioModal(false)}
        onImport={handleTwilioImport}
      />

      <VonageNumberModal
        isOpen={showVonageModal}
        onClose={() => setShowVonageModal(false)}
        onImport={handleVonageImport}
      />
    </div>
  );
};

export default IntegrationHubPage;