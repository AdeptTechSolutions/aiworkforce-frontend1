// pages/B2BAgentContent.jsx
import { useState } from "react";
import { useB2BSearch } from "../context/B2BSearchContext";
import B2BSearchFiltersPanel from "../components/b2b/B2BSearchFiltersPanel";
import B2BSearchResultsView from "../components/b2b/B2BSearchResultsView";
import Logo from "../assets/Logo.png";

// Import modals - we'll reuse some from B2C
import {
  SaveSearchModal,
  LoadSearchModal,
  AddToProjectModal,
  SuccessModal,
  LoadingModal,
} from "../components/modals/B2BModals";

const B2BAgentContent = () => {
  const {
    hasSearched,
    setHasSearched,
    activeFilters,
    addFilter,
    savedSearches,
    saveCurrentSearch,
    loadSavedSearch,
  } = useB2BSearch();

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showAddToProjectModal, setShowAddToProjectModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || activeFilters.length > 0) {
      setShowLoadingModal(true);
      // Simulate search delay
      setTimeout(() => {
        setShowLoadingModal(false);
        setHasSearched(true);
      }, 1000);
    }
  };

  // Handle save search
  const handleSaveSearch = (name) => {
    saveCurrentSearch(name);
    setShowSaveModal(false);
    setSuccessMessage("Search saved successfully!");
    setShowSuccessModal(true);
  };

  // Handle load search
  const handleLoadSearch = (savedSearch) => {
    setShowLoadingModal(true);
    setTimeout(() => {
      loadSavedSearch(savedSearch);
      setShowLoadModal(false);
      setShowLoadingModal(false);
      setHasSearched(true);
    }, 800);
  };

  // Handle add to project
  const handleAddToProject = (company) => {
    setSelectedCompany(company);
    setShowAddToProjectModal(true);
  };

  // Handle project added success
  const handleProjectAdded = (projectName) => {
    setShowAddToProjectModal(false);
    setSuccessMessage(`Company added to "${projectName}" successfully!`);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Filters */}
        <B2BSearchFiltersPanel
          onSaveSearch={() => setShowSaveModal(true)}
          onLoadSearch={() => setShowLoadModal(true)}
        />

        {/* Right Panel - Results or Initial State */}
        <div className="flex-1 overflow-auto">
          {!hasSearched ? (
            // Initial State - Search Prompt
            <div className="flex flex-col items-center justify-center h-full px-4">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <img src={Logo} alt="AI Workforce" className="w-12 h-12" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">AI workforce</h1>
                  <p className="text-gray-500 text-sm">Create an AI employee</p>
                </div>
              </div>

              {/* Search Heading */}
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Tell us what you are looking for
              </h2>

              {/* Search Input */}
              <form onSubmit={handleSearch} className="w-full max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='e.g. LinkedIn URL, Job Title, Location, Skills, Years of Experience, Company etc."'
                    className="w-full px-6 py-4 pr-14 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Results View
            <B2BSearchResultsView onAddToProject={handleAddToProject} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="AI Workforce" className="w-6 h-6" />
            <span className="text-sm text-gray-500">© 2025 aiworkforce.co.uk</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Search
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Browser Extension
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              User Agreement
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Help
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SaveSearchModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveSearch}
      />

      <LoadSearchModal
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        savedSearches={savedSearches}
        onLoadSearch={handleLoadSearch}
      />

      <AddToProjectModal
        isOpen={showAddToProjectModal}
        onClose={() => setShowAddToProjectModal(false)}
        company={selectedCompany}
        onAddToProject={handleProjectAdded}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      <LoadingModal isOpen={showLoadingModal} message="Searching..." />
    </div>
  );
};

export default B2BAgentContent;