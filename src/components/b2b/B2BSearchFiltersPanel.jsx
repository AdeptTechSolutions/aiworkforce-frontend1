// components/b2b/B2BSearchFiltersPanel.jsx
import { useState, useRef, useEffect } from "react";
import { useB2BSearch } from "../../context/B2BSearchContext";
import { basicSearchFilters, advancedSearchFilters } from "../../data/b2bData";

// Filter Icon Component
const FilterIcon = ({ type }) => {
  const icons = {
    businessType: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    location: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    sicCode: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    companyName: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    companyStatus: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    companyType: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    incorporatedDate: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };

  return icons[type] || icons.businessType;
};

// Active Filter Tag Component
const ActiveFilterTag = ({ filter, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm">
      <span className="text-gray-500">
        <FilterIcon type={filter.type} />
      </span>
      <span className="text-gray-700">{filter.value}</span>
      <button
        onClick={() => onRemove(filter.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Filter Section Component with Modifier Dropdown
const FilterSection = ({ 
  title, 
  filterKey, 
  placeholder, 
  options, 
  selectedValues,
  onSelect,
  onUpdateModifier,
  showModifier = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModifierDropdown, setShowModifierDropdown] = useState(null);
  const modifierRef = useRef(null);

  // Close modifier dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modifierRef.current && !modifierRef.current.contains(event.target)) {
        setShowModifierDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = selectedValues.filter((v) => v.type === filterKey).length;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Section Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{title}</span>
          {selectedCount > 0 && (
            <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Section Content */}
      {isOpen && (
        <div className="pb-4 px-1">
          {/* Search Input */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Options List */}
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => {
              const isSelected = selectedValues.some(
                (v) => v.type === filterKey && v.value === option.label
              );
              const selectedFilter = selectedValues.find(
                (v) => v.type === filterKey && v.value === option.label
              );

              return (
                <div
                  key={option.id}
                  className="flex items-center justify-between group"
                >
                  <button
                    onClick={() => onSelect(filterKey, option.label)}
                    className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isSelected
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                        isSelected
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                      {option.label}
                    </span>
                  </button>

                  {/* Modifier Button */}
                  {showModifier && isSelected && (
                    <div className="relative" ref={modifierRef}>
                      <button
                        onClick={() => setShowModifierDropdown(
                          showModifierDropdown === option.id ? null : option.id
                        )}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </button>

                      {/* Modifier Dropdown */}
                      {showModifierDropdown === option.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase">
                            Apply Modifier
                          </div>
                          <button
                            onClick={() => {
                              onUpdateModifier(selectedFilter.id, "exact");
                              setShowModifierDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <span>Exact</span>
                            {selectedFilter?.modifier === "exact" && (
                              <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              onUpdateModifier(selectedFilter.id, "not");
                              setShowModifierDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <span>Not</span>
                            {selectedFilter?.modifier === "not" && (
                              <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Settings Icon for non-selected */}
                  {!isSelected && (
                    <button className="p-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component
const B2BSearchFiltersPanel = ({ onSaveSearch, onLoadSearch }) => {
  const {
    searchMode,
    setSearchMode,
    activeFilters,
    addFilter,
    removeFilter,
    updateFilterModifier,
    clearFilters,
    hasSearched,
  } = useB2BSearch();

  // Handle filter selection
  const handleSelectFilter = (type, value) => {
    const exists = activeFilters.some(
      (f) => f.type === type && f.value === value
    );

    if (exists) {
      const filter = activeFilters.find(
        (f) => f.type === type && f.value === value
      );
      removeFilter(filter.id);
    } else {
      addFilter({ type, value, icon: type });
    }
  };

  // Get current filters based on mode
  const currentFilters = searchMode === "basic" ? basicSearchFilters : advancedSearchFilters;

  return (
    <div className="w-80 bg-white border-r border-gray-100 flex flex-col h-full">
      {/* Search Mode Tabs */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setSearchMode("basic")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all ${
              searchMode === "basic"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Basic Search
          </button>
          <button
            onClick={() => setSearchMode("advanced")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all ${
              searchMode === "advanced"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Advance Search
          </button>
        </div>
      </div>

      {/* Filters Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Search Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear Filter
        </button>
      </div>

      {/* Active Filters Tags */}
      {activeFilters.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <ActiveFilterTag
                key={filter.id}
                filter={filter}
                onRemove={removeFilter}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto px-3">
        {searchMode === "basic" ? (
          <>
            <FilterSection
              title="Business Type"
              filterKey="businessType"
              placeholder="What business are you looking for?"
              options={currentFilters.businessType.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
            <FilterSection
              title="Location"
              filterKey="location"
              placeholder="Type Location"
              options={currentFilters.location.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
          </>
        ) : (
          <>
            <FilterSection
              title="SIC Code"
              filterKey="sicCode"
              placeholder="Enter SIC Code"
              options={currentFilters.sicCode.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
            <FilterSection
              title="Location"
              filterKey="location"
              placeholder="Type Location"
              options={currentFilters.location.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
            <FilterSection
              title="Company Name (*includes)"
              filterKey="companyName"
              placeholder="Enter Company Name"
              options={currentFilters.companyName.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
            <FilterSection
              title="Company Status"
              filterKey="companyStatus"
              placeholder="Select Status"
              options={currentFilters.companyStatus.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
            <FilterSection
              title="Company Type"
              filterKey="companyType"
              placeholder="Select Type"
              options={currentFilters.companyType.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
            <FilterSection
              title="Incorporated Date"
              filterKey="incorporatedDate"
              placeholder="Select Date Range"
              options={currentFilters.incorporatedDate.options}
              selectedValues={activeFilters}
              onSelect={handleSelectFilter}
              onUpdateModifier={updateFilterModifier}
              showModifier={true}
            />
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        {hasSearched && (
          <button
            onClick={onSaveSearch}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Save This Search
          </button>
        )}
        <button
          onClick={onLoadSearch}
          className="w-full py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          Load Past Search
        </button>
      </div>
    </div>
  );
};

export default B2BSearchFiltersPanel;