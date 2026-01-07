// context/B2BSearchContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { b2bCompaniesData, b2bProjects as initialProjects } from "../data/b2bData";

const B2BSearchContext = createContext();

export const useB2BSearch = () => {
  const context = useContext(B2BSearchContext);
  if (!context) {
    throw new Error("useB2BSearch must be used within B2BSearchProvider");
  }
  return context;
};

export const B2BSearchProvider = ({ children }) => {
  // Credits state
  const [credits, setCredits] = useState(3000);
  const [showOutOfCreditsModal, setShowOutOfCreditsModal] = useState(false);

  // Search type state (basic or advance)
  const [searchType, setSearchType] = useState("basic");

  // Active filters state
  const [activeFilters, setActiveFilters] = useState([]);

  // Company results state
  const [companies, setCompanies] = useState(b2bCompaniesData);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [expandedCompany, setExpandedCompany] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // UI state
  const [hasSearched, setHasSearched] = useState(false);
  const [excludeInProject, setExcludeInProject] = useState(false);

  // Projects state
  const [projects, setProjects] = useState(initialProjects);

  // Add filter
  const addFilter = useCallback((filter) => {
    setActiveFilters((prev) => {
      const exists = prev.some(
        (f) => f.type === filter.type && f.value === filter.value
      );
      if (exists) return prev;
      return [...prev, { ...filter, id: Date.now() + Math.random() }];
    });
  }, []);

  // Remove filter
  const removeFilter = useCallback((filterId) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setActiveFilters([]);
    setHasSearched(false);
    setSelectedCompanies([]);
    setExpandedCompany(null);
  }, []);

  // Update filter modifier
  const updateFilterModifier = useCallback((filterId, modifier) => {
    setActiveFilters((prev) =>
      prev.map((f) => (f.id === filterId ? { ...f, modifier } : f))
    );
  }, []);

  // Load saved search
  const loadSavedSearch = useCallback((savedSearch) => {
    const filters = [];
    const filterMapping = {
      businessType: { icon: "building", type: "businessType" },
      location: { icon: "location", type: "location" },
      sicCode: { icon: "code", type: "sicCode" },
      companyName: { icon: "company", type: "companyName" },
      companyStatus: { icon: "status", type: "companyStatus" },
      companyType: { icon: "type", type: "companyType" },
      incorporatedDateFrom: { icon: "calendar", type: "incorporatedDateFrom" },
      incorporatedDateTo: { icon: "calendar", type: "incorporatedDateTo" },
    };

    Object.entries(savedSearch.filters).forEach(([key, value], index) => {
      if (value && filterMapping[key]) {
        filters.push({
          id: Date.now() + index,
          type: filterMapping[key].type,
          value: value,
          icon: filterMapping[key].icon,
        });
      }
    });

    // Set the search type from saved search
    if (savedSearch.searchType) {
  setSearchType(savedSearch.searchType);
}

    setActiveFilters(filters);
    setHasSearched(true);  // ← THIS IS CRITICAL - Make sure this line exists!
    console.log("B2B loadSavedSearch called, hasSearched set to true, filters:", filters);
  }, []);

  // Toggle company selection
  const toggleCompanySelection = useCallback((companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  }, []);

  // Select all companies
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

  // Enrich director (costs 1 credit per director)
  const enrichDirector = useCallback((companyId, directorId) => {
    if (credits <= 0) {
      setShowOutOfCreditsModal(true);
      return false;
    }

    setCompanies((prev) =>
      prev.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            directors: company.directors.map((director) =>
              director.id === directorId
                ? { ...director, isEnriched: true }
                : director
            ),
          };
        }
        return company;
      })
    );

    setCredits((prev) => {
      const newCredits = prev - 1;
      if (newCredits <= 0) {
        setShowOutOfCreditsModal(true);
      }
      return Math.max(0, newCredits);
    });

    return true;
  }, [credits]);

  // Enrich all directors in a company
  const enrichAllDirectors = useCallback((companyId) => {
    const company = companies.find((c) => c.id === companyId);
    if (!company) return false;

    const unenrichedDirectors = company.directors.filter((d) => !d.isEnriched);
    const cost = unenrichedDirectors.length;

    if (credits <= 0) {
      setShowOutOfCreditsModal(true);
      return false;
    }

    const canEnrich = Math.min(cost, credits);
    if (canEnrich === 0) {
      setShowOutOfCreditsModal(true);
      return false;
    }

    let enrichedCount = 0;
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          return {
            ...c,
            directors: c.directors.map((director) => {
              if (!director.isEnriched && enrichedCount < canEnrich) {
                enrichedCount++;
                return { ...director, isEnriched: true };
              }
              return director;
            }),
          };
        }
        return c;
      })
    );

    setCredits((prev) => {
      const newCredits = prev - canEnrich;
      if (newCredits <= 0) {
        setShowOutOfCreditsModal(true);
      }
      return Math.max(0, newCredits);
    });

    return true;
  }, [companies, credits]);

  // Check if company has any enriched directors
  const hasEnrichedDirectors = useCallback((companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company?.directors?.some((d) => d.isEnriched) || false;
  }, [companies]);

  // Get enriched directors count for a company
  const getEnrichedDirectorsCount = useCallback((companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company?.directors?.filter((d) => d.isEnriched).length || 0;
  }, [companies]);

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

  // Toggle expanded company
  const toggleExpandedCompany = useCallback((companyId) => {
    setExpandedCompany((prev) => (prev === companyId ? null : companyId));
  }, []);

  // Get paginated companies
  const getPaginatedCompanies = useCallback(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return companies.slice(start, end);
  }, [companies, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const totalResults = companies.length;

  const value = {
    // Credits
    credits,
    setCredits,
    showOutOfCreditsModal,
    setShowOutOfCreditsModal,

    // Search Type
    searchType,
    setSearchType,

    // Filters
    activeFilters,
    addFilter,
    removeFilter,
    updateFilterModifier,
    clearFilters,
    loadSavedSearch,

    // Companies
    companies,
    selectedCompanies,
    toggleCompanySelection,
    selectAllCompanies,
    expandedCompany,
    toggleExpandedCompany,

    // Director Enrichment
    enrichDirector,
    enrichAllDirectors,
    hasEnrichedDirectors,
    getEnrichedDirectorsCount,

    // Pagination
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalResults,
    getPaginatedCompanies,

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