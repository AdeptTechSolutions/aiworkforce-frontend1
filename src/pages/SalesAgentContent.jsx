// pages/SalesAgentContent.jsx
import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import SearchFiltersPanel from "../components/sales/SearchFiltersPanel";
import SearchResultsView from "../components/sales/SearchResultsView";
import {
  SaveSearchModal,
  LoadSearchModal,
  SearchSavedModal,
  LoadingModal,
} from "../components/modals/Modals";
import { footerLinks } from "../data/salesAgentData";
import logo from "../assets/Logo.png";

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export default function SalesAgentContent() {
  const {
    activeFilters,
    addFilter,
    removeFilter,
    clearFilters,
    loadSavedSearch,
    hasSearched,
    setHasSearched,
  } = useSearch();

  const [searchType, setSearchType] = useState("individual");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [saveSearchModal, setSaveSearchModal] = useState(false);
  const [loadSearchModal, setLoadSearchModal] = useState(false);
  const [searchSavedModal, setSearchSavedModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const handleSaveSearch = (searchName) => {
    setSaveSearchModal(false);
    setSearchSavedModal(true);
  };

  const handleLoadSearch = (savedSearch) => {
    setLoadingModal(true);
    setTimeout(() => {
      loadSavedSearch(savedSearch);
      setLoadingModal(false);
      setHasSearched(true);
    }, 1500);
  };

  const handleSearch = () => {
    if (searchQuery.trim() || activeFilters.length > 0) {
      setLoadingModal(true);
      setTimeout(() => {
        setLoadingModal(false);
        setHasSearched(true);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        {/* Filter Panel */}
        <div className="flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Search Type Toggle */}
          <div className="p-4 border-b border-gray-100">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setSearchType("individual")}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  searchType === "individual"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Individual Search
              </button>
              <button
                onClick={() => setSearchType("bulk")}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  searchType === "bulk"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Bulk Search
              </button>
            </div>
          </div>

          <SearchFiltersPanel
            searchType={searchType}
            activeFilters={activeFilters}
            onAddFilter={addFilter}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
            onSaveSearch={() => setSaveSearchModal(true)}
            onLoadSearch={() => setLoadSearchModal(true)}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden">
          {hasSearched ? (
            <SearchResultsView />
          ) : (
            <>
              {/* Search Content */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-xl">
                  {/* Logo */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                    <div className="text-left">
                      <div className="font-bold text-2xl text-gray-800">AI workforce</div>
                      <div className="text-gray-500">Create an AI employee</div>
                    </div>
                  </div>

                  {/* Heading */}
                  <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Tell us what you are looking for
                  </h1>

                  {/* Search Bar */}
                  <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 overflow-hidden">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder='e.g. LinkedIn URL, Job Title, Location, Skills, Years of Experience, Company etc."'
                      className="flex-1 px-6 py-4 text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={handleSearch}
                      className="bg-gray-900 text-white p-4 m-1 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
                  <span>© 2025 aiworkforce.co.uk</span>
                </div>
                <nav className="flex items-center gap-6">
                  {footerLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </footer>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <SaveSearchModal
        isOpen={saveSearchModal}
        onClose={() => setSaveSearchModal(false)}
        onSave={handleSaveSearch}
      />

      <LoadSearchModal
        isOpen={loadSearchModal}
        onClose={() => setLoadSearchModal(false)}
        onLoad={handleLoadSearch}
      />

      <SearchSavedModal
        isOpen={searchSavedModal}
        onClose={() => setSearchSavedModal(false)}
      />

      <LoadingModal
        isOpen={loadingModal}
        onClose={() => setLoadingModal(false)}
      />
    </div>
  );
}