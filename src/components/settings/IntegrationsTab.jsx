import React, { useState } from 'react';
import { Search, CheckCircle, ExternalLink } from 'lucide-react';
import { SectionCard, IntegrationCard } from './SettingsComponents';

// Integration icons (simplified SVG representations)
const LinkedInIcon = () => (
  <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GmailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const SlackIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"/>
    <path fill="#E01E5A" d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z"/>
    <path fill="#36C5F0" d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
    <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z"/>
    <path fill="#2EB67D" d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
    <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z"/>
    <path fill="#ECB22E" d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const SalesforceIcon = () => (
  <svg className="w-5 h-5 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.45 0-.87-.06-1.29-.165a3.9 3.9 0 0 1-3.42 2.025c-.45 0-.899-.075-1.305-.24a4.504 4.504 0 0 1-4.05 2.52c-1.845 0-3.42-1.11-4.125-2.7a3.74 3.74 0 0 1-.54.045c-2.13 0-3.855-1.755-3.855-3.915 0-1.56.915-2.895 2.22-3.51a4.8 4.8 0 0 1-.285-1.65c0-2.64 2.115-4.77 4.725-4.77 1.665 0 3.135.87 3.975 2.175l.116-.704z"/>
  </svg>
);

const HubSpotIcon = () => (
  <svg className="w-5 h-5 text-[#FF7A59]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066A2.2 2.2 0 0 0 17.23.833h-.066a2.2 2.2 0 0 0-2.2 2.2v.067c0 .87.506 1.62 1.238 1.974v2.864a6.152 6.152 0 0 0-2.894 1.303l-7.64-5.95a2.546 2.546 0 1 0-1.335 1.702l7.377 5.744a6.17 6.17 0 0 0-.108 1.14c0 .395.037.78.108 1.155l-2.35 1.328a2.887 2.887 0 0 0-1.627-.5 2.91 2.91 0 1 0 2.91 2.91c0-.437-.097-.85-.27-1.22l2.249-1.27a6.188 6.188 0 1 0 5.213-9.485"/>
  </svg>
);

const CalendlyIcon = () => (
  <svg className="w-5 h-5 text-[#006BFF]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.655 14.262c-.207.586-.538 1.128-.973 1.586a4.133 4.133 0 0 1-1.567 1.069 5.016 5.016 0 0 1-1.952.387h-2.49a1.076 1.076 0 0 1-.758-.317 1.076 1.076 0 0 1-.317-.758v-8.46c0-.29.11-.551.317-.758s.468-.317.758-.317h2.49c.69 0 1.341.13 1.952.387.61.258 1.128.62 1.567 1.069.435.458.766 1 .973 1.586.207.586.31 1.21.31 1.877s-.103 1.29-.31 1.876z"/>
  </svg>
);

const IntegrationsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [integrations, setIntegrations] = useState([
    { id: 'linkedin', name: 'LinkedIn', description: 'Connect for lead generation', icon: <LinkedInIcon />, connected: true, category: 'Social' },
    { id: 'gmail', name: 'Gmail', description: 'Sync email campaigns', icon: <GmailIcon />, connected: true, category: 'Email' },
    { id: 'slack', name: 'Slack', description: 'Get notifications in Slack', icon: <SlackIcon />, connected: false, category: 'Communication' },
    { id: 'salesforce', name: 'Salesforce', description: 'Sync CRM data', icon: <SalesforceIcon />, connected: false, category: 'CRM' },
    { id: 'hubspot', name: 'HubSpot', description: 'Marketing automation', icon: <HubSpotIcon />, connected: false, category: 'CRM' },
    { id: 'calendly', name: 'Calendly', description: 'Schedule meetings', icon: <CalendlyIcon />, connected: true, category: 'Scheduling' },
  ]);

  const handleConnect = (id) => {
    // In real implementation, this would open OAuth popup
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: true } : i));
  };

  const handleDisconnect = (id) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: false } : i));
  };

  const filteredIntegrations = integrations.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const connectedIntegrations = filteredIntegrations.filter(i => i.connected);
  const availableIntegrations = filteredIntegrations.filter(i => !i.connected);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search integrations..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Connected Integrations */}
      <SectionCard 
        title="Connected" 
        description={`${connectedIntegrations.length} integrations active`}
      >
        {connectedIntegrations.length > 0 ? (
          <div className="space-y-3">
            {connectedIntegrations.map(integration => (
              <div key={integration.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-green-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-500">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No connected integrations</p>
        )}
      </SectionCard>

      {/* Available Integrations */}
      <SectionCard 
        title="Available Integrations" 
        description="Connect more tools to enhance your workflow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableIntegrations.map(integration => (
            <div key={integration.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {integration.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                  <p className="text-xs text-gray-500">{integration.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleConnect(integration.id)}
                className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* API Access */}
      <SectionCard 
        title="API Access" 
        description="Manage your API keys for custom integrations"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">API Key</p>
              <p className="text-xs text-gray-500 font-mono mt-1">sk-••••••••••••••••••••••••</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                Copy
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Regenerate
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Use this API key to integrate AI Workforce with your custom applications. 
            <a href="#" className="text-blue-600 hover:underline ml-1">View documentation →</a>
          </p>
        </div>
      </SectionCard>
    </div>
  );
};

export default IntegrationsTab;