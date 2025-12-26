// context/B2BSearchContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { b2bCompaniesData, b2bProjects, b2bSavedSearches } from "../data/b2bData";

const B2BSearchContext = createContext();

export const useB2BSearch = () => {
  const context = useContext(B2BSearchContext);
  if (!context) {
    throw new Error("useB2BSearch must be used within B2BSearchProvider");
  }
  return context;
};

export const B2BSearchProvider = ({ children }) => {
  // Credits state (shared with B2C or separate)
  const [credits, setCredits] = useState(3000);

  // Search mode: "basic" or "advanced"
  const [searchMode, setSearchMode] = useState("basic");

  // Active filters state
  const [activeFilters, setActiveFilters] = useState([]);

  // Companies state
  const [companies, setCompanies] = useState(b2bCompaniesData);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // UI state
  const [hasSearched, setHasSearched] = useState(false);
  const [excludeInProject, setExcludeInProject] = useState(false);

  // Projects state
  const [projects, setProjects] = useState(b2bProjects);

  // Saved searches state
  const [savedSearches, setSavedSearches] = useState(b2bSavedSearches);

  // Add filter with modifier support
  const addFilter = useCallback((filter) => {
    setActiveFilters((prev) => {
      // Check if filter with same type and value exists
      const exists = prev.some(
        (f) => f.type === filter.type && f.value === filter.value
      );
      if (exists) return prev;

      return [
        ...prev,
        {
          ...filter,
          id: Date.now() + Math.random(),
          modifier: filter.modifier || null, // "exact" | "not" | null
        },
      ];
    });
  }, []);

  // Remove filter
  const removeFilter = useCallback((filterId) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
  }, []);

  // Update filter modifier
  const updateFilterModifier = useCallback((filterId, modifier) => {
    setActiveFilters((prev) =>
      prev.map((f) =>
        f.id === filterId ? { ...f, modifier } : f
      )
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setActiveFilters([]);
    setHasSearched(false);
    setSelectedCompanies([]);
  }, []);

  // Load saved search
  const loadSavedSearch = useCallback((savedSearch) => {
    const filters = [];
    
    if (savedSearch.filters.businessType) {
      filters.push({
        id: Date.now(),
        type: "businessType",
        value: savedSearch.filters.businessType,
        icon: "building",
        modifier: null,
      });
    }
    if (savedSearch.filters.location) {
      filters.push({
        id: Date.now() + 1,
        type: "location",
        value: savedSearch.filters.location,
        icon: "location",
        modifier: null,
      });
    }
    if (savedSearch.filters.sicCode) {
      filters.push({
        id: Date.now() + 2,
        type: "sicCode",
        value: savedSearch.filters.sicCode,
        icon: "code",
        modifier: null,
      });
    }
    if (savedSearch.filters.companyStatus) {
      filters.push({
        id: Date.now() + 3,
        type: "companyStatus",
        value: savedSearch.filters.companyStatus,
        icon: "status",
        modifier: null,
      });
    }
    if (savedSearch.filters.companyName) {
      filters.push({
        id: Date.now() + 4,
        type: "companyName",
        value: savedSearch.filters.companyName,
        icon: "company",
        modifier: null,
      });
    }
    if (savedSearch.filters.companyType) {
      filters.push({
        id: Date.now() + 5,
        type: "companyType",
        value: savedSearch.filters.companyType,
        icon: "type",
        modifier: null,
      });
    }
    if (savedSearch.filters.incorporatedDate) {
      filters.push({
        id: Date.now() + 6,
        type: "incorporatedDate",
        value: savedSearch.filters.incorporatedDate,
        icon: "calendar",
        modifier: null,
      });
    }

    setActiveFilters(filters);
    setHasSearched(true);
  }, []);

  // Save current search
  const saveCurrentSearch = useCallback((name) => {
    const filtersObj = {};
    activeFilters.forEach((filter) => {
      filtersObj[filter.type] = filter.value;
    });

    const newSavedSearch = {
      id: Date.now(),
      name,
      date: new Date().toISOString().split("T")[0],
      filters: filtersObj,
      resultCount: companies.length,
    };

    setSavedSearches((prev) => [newSavedSearch, ...prev]);
    return newSavedSearch;
  }, [activeFilters, companies.length]);

  // Toggle company selection
  const toggleCompanySelection = useCallback((companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  }, []);

  // Select all companies on current page
  const selectAllCompanies = useCallback(() => {
    const currentCompanies = companies.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    const allSelected = currentCompanies.every((c) =>
      selectedCompanies.includes(c.id)
    );
    if (allSelected) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(currentCompanies.map((c) => c.id));
    }
  }, [companies, currentPage, itemsPerPage, selectedCompanies]);

  // Get paginated companies
  const getPaginatedCompanies = useCallback(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return companies.slice(start, end);
  }, [companies, currentPage, itemsPerPage]);

  // Add new project
  const addProject = useCallback((name, description) => {
    const newProject = {
      id: Date.now(),
      name,
      description,
      companyCount: 0,
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }, []);

  // Add company to project
  const addToProject = useCallback((projectId, companyIds) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, companyCount: project.companyCount + companyIds.length }
          : project
      )
    );
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const totalResults = companies.length;

  const value = {
    // Credits
    credits,
    setCredits,

    // Search Mode
    searchMode,
    setSearchMode,

    // Filters
    activeFilters,
    addFilter,
    removeFilter,
    updateFilterModifier,
    clearFilters,
    loadSavedSearch,
    saveCurrentSearch,

    // Saved Searches
    savedSearches,
    setSavedSearches,

    // Companies
    companies,
    setCompanies,
    selectedCompanies,
    toggleCompanySelection,
    selectAllCompanies,
    getPaginatedCompanies,

    // Pagination
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalResults,

    // UI State
    hasSearched,
    setHasSearched,
    excludeInProject,
    setExcludeInProject,

    // Projects
    projects,
    setProjects,
    addProject,
    addToProject,
  };

  return (
    <B2BSearchContext.Provider value={value}>
      {children}
    </B2BSearchContext.Provider>
  );
};

export default B2BSearchContext;