// components/modals/Modals.jsx
import { useState } from "react";
import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { Modal, LoadingSpinner, SuccessIcon } from "../common/CommonComponents";
import { savedSearches, projects } from "../../data/profilesData";

// Save Search Modal
export const SaveSearchModal = ({ isOpen, onClose, onSave }) => {
  const [searchName, setSearchName] = useState("");

  const handleSave = () => {
    if (searchName.trim()) {
      onSave(searchName);
      setSearchName("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <h2 className="text-xl font-bold text-[#000000] mb-1">Save your search</h2>
      <p className="text-[#000000] text-sm mb-6">Fill details for new project</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#000000] mb-2">
          Search Name
        </label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Search Name"
          className="w-full px-4 py-3 border border-gray-400 rounded-lg hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={!searchName.trim()}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Search
      </button>
    </Modal>
  );
};

// Credit Card Icon for the modal
const CreditCardIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="12" width="36" height="24" rx="3" stroke="#3C49F7" strokeWidth="2" fill="none"/>
    <line x1="6" y1="20" x2="42" y2="20" stroke="#3C49F7" strokeWidth="2"/>
    <line x1="12" y1="28" x2="24" y2="28" stroke="#3C49F7" strokeWidth="2"/>
    <circle cx="36" cy="12" r="8" fill="#EEF0FF" stroke="#3C49F7" strokeWidth="2"/>
    <line x1="36" y1="8" x2="36" y2="16" stroke="#3C49F7" strokeWidth="2"/>
    <line x1="32" y1="12" x2="40" y2="12" stroke="#3C49F7" strokeWidth="2"/>
  </svg>
);

// Out of Credits Modal Component
export const OutOfCreditsModal = ({ isOpen, onClose, onGetCredits }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#EEF0FF] rounded-full flex items-center justify-center">
            <CreditCardIcon />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          It seems you ran out<br />of credits!
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8">
          Do not worry, we got you covered.
        </p>

        {/* Button */}
        <button
          onClick={() => {
            onClose();
            onGetCredits();
          }}
          className="w-full bg-[#3C49F7] text-white py-4 rounded-full font-medium text-lg hover:bg-[#2D3AD9] transition-colors"
        >
          Get more credits
        </button>
      </div>
    </div>
  );
};

// Load Search Modal
// ============================================
// LOAD SEARCH MODAL
// ============================================
export const LoadSearchModal = ({
  isOpen,
  onClose,
  savedSearches = [],
  onLoadSearch,
}) => {
  const [selectedSearch, setSelectedSearch] = useState(null);

  const handleLoad = () => {
    if (!selectedSearch) return;

    onLoadSearch?.(selectedSearch);
    setSelectedSearch(null);
  };

  const handleClose = () => {
    setSelectedSearch(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedSearch(null);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <h2 className="text-xl font-bold mb-1">Select Saved Search</h2>
      <p className="text-gray-500 text-sm mb-6">
        Load a saved search list.
      </p>

      <div className="space-y-3 mb-6">
        {savedSearches.map((search) => (
          <button
            key={search.id}
            onClick={() => setSelectedSearch(search)}
            className={`w-full p-4 text-left rounded-lg border ${
              selectedSearch?.id === search.id
                ? "border-blue-600 bg-[#F2F2FF]"
                : "border-white hover:border-blue-600 hover:bg-[#F2F2FF]"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSearch?.id === search.id}
                readOnly
                className="appearance-none
    w-[18px] h-[18px]
    rounded-[6px]
    border border-gray-300
    bg-white
    hover:border-blue-600
    focus:outline-none focus:ring-2 focus:ring-blue-500/30
    cursor-pointer

    checked:bg-blue-600 checked:border-blue-600
    checked:after:content-['']
    checked:after:block
    checked:after:w-[6px] checked:after:h-[10px]
    checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white
    checked:after:rotate-45
    checked:after:translate-x-[5px] checked:after:translate-y-[1px]
  "
              />
              <span className="font-medium">{search.name}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleLoad}
        disabled={!selectedSearch}
        className="w-full bg-blue-500 text-white py-3 rounded-full disabled:opacity-50"
      >
        Load Search
      </button>
    </Modal>
  );
};
// Add to Project Modal
// Add this updated AddToProjectModal to your Modals.jsx file
// It handles both B2C (profiles) and B2B (companies)

export const AddToProjectModal = ({
  isOpen,
  onClose,
  profile,
  company,
  onAddToProject,
  mode = "b2c",
  context
}) => {
  // Get projects from context
  const projects = context?.projects || [];
  const addProject = context?.addProject;
  const addToProject = context?.addToProject;

  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  // Get the item (profile or company)
  const item = mode === "b2b" ? company : profile;

  const handleAdd = () => {
    if (selectedProject && item) {
      if (addToProject) {
        addToProject(selectedProject.id, [item.id]);
      }
      setSuccessType("added");
      setShowSuccess(true);
    }
  };

  const handleCreateProject = () => {
    if (newProjectName.trim() && addProject) {
      addProject(newProjectName, newProjectDescription);
      setNewProjectName("");
      setNewProjectDescription("");
      setShowCreateProject(false);
      setSuccessType("created");
      setShowSuccess(true);
    }
  };

  const handleClose = () => {
    setSelectedProject(null);
    setShowCreateProject(false);
    setShowSuccess(false);
    setSuccessType("");
    setNewProjectName("");
    setNewProjectDescription("");
    onClose();
  };

  const handleGoBackToProfiles = () => {
    if (selectedProject && onAddToProject) {
      onAddToProject(selectedProject.name);
    }
    handleClose();
  };

  const handleGoBackToForm = () => {
    setShowSuccess(false);
    setSuccessType("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Success Modal - Added to Project */}
      {showSuccess && successType === "added" && (
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Successfully added!</h2>
          <p className="text-gray-500 mb-8">
            Lead added to "{selectedProject?.name}" successfully
          </p>

          <button
            onClick={handleGoBackToProfiles}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base"
          >
            Go Back to {mode === "b2b" ? "Companies" : "Profiles"}
          </button>
        </div>
      )}

      {/* Success Modal - Project Created */}
      {showSuccess && successType === "created" && (
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Project added successfully</h2>

          <button
            onClick={handleGoBackToForm}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base"
          >
            Go Back to Form
          </button>
        </div>
      )}

      {/* Create New Project Modal */}
      {!showSuccess && showCreateProject && (
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-semibold text-gray-900">Create a new project</h2>
            <button
              onClick={() => setShowCreateProject(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-6">Fill details for new project</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter Project Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Description
            </label>
            <textarea
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              placeholder="Enter here..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={handleCreateProject}
            disabled={!newProjectName.trim()}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${newProjectName.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            Create Project
          </button>
        </div>
      )}

      {/* Select Project Modal */}
      {!showSuccess && !showCreateProject && (
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-semibold text-gray-900">Select a Project</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-6">Where you want to move the {mode === "b2b" ? "company" : "profile"}</p>

          <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${selectedProject?.id === project.id
                    ? "bg-[#F2F2FF] border border-blue-600"
                    : "bg-white hover:bg-[#F2F2FF] hover:border hover:border-blue-600"
                  }`}
              >
                <div
                  className={`w-5 h-5  border-2 flex items-center justify-center transition-all ${selectedProject?.id === project.id
                      ? "border-blue-500 rounded bg-blue-500"
                      : "border-gray-300 rounded-full bg-white"
                    }`}
                >
                  {selectedProject?.id === project.id && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-900 font-medium">{project.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowCreateProject(true)}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Create New Project
            </button>

            <button
              onClick={handleAdd}
              disabled={!selectedProject}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${selectedProject
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Add to Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// Loading Modal
// Loading Modal
export const LoadingModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Loading your Search</h2>
          <p className="text-gray-500 text-sm">
            Do not close the window, we are fetching the information
          </p>
        </div>
        {/* <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
      </div>

      {/* 3 Dots Loading Animation */}
      {/* 3 Dots Loading Animation */}
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.6s]"></div>
        </div>
      </div>
    </Modal>
  );
};
// Success Modal - Search Saved
export const SearchSavedModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <SuccessIcon />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your search is saved!
        </h2>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Search for more profiles
        </button>
      </div>
    </Modal>
  );
};

// Success Modal - Added to Project
export const AddedToProjectModal = ({ isOpen, onClose, projectName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <SuccessIcon />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Successfully added!
        </h2>
        <p className="text-gray-500 mb-6">
          Lead added to "{projectName}" successfully
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Go Back to Form
        </button>
      </div>
    </Modal>
  );
};

// Add this to your components/modals/Modals.jsx file

export const ExportLeadsModal = ({ isOpen, onClose, onExport }) => {
  const [selectedOption, setSelectedOption] = useState("csv");

  const exportOptions = [
    { id: "csv", label: "Export as .CSV" },
    { id: "odoo", label: "Export as Odoo" },
    { id: "hubspot", label: "Export as Hubspot" },
    { id: "salesforce", label: "Export as Salesforce" },
    { id: "bullhorn", label: "Export as Bullhorn" },
    { id: "pipedrive", label: "Export as Pipedrive" },
  ];

  const handleExport = () => {
    if (onExport) {
      onExport(selectedOption);
    }
    onClose();
  };

  const handleClose = () => {
    setSelectedOption("csv"); // Reset to default
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Export Leads</h2>
      <p className="text-gray-500 text-sm mb-6">Pick a way to export leads</p>

      <div className="space-y-1 mb-6">
        {exportOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`w-full p-2 text-left rounded-lg transition-all hover:border-blue-600 duration-200 ${
              selectedOption === option.id
                ? "border-blue-600 bg-[#F2F2FF]"
                : "border border-white hover:border-blue-600 hover:bg-[#F2F2FF]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-[18px] h-[18px] rounded flex items-center justify-center border-2 transition-colors ${
                  selectedOption === option.id
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {selectedOption === option.id && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="font-medium text-sm text-[#000000]">{option.label}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleExport}
        className="bg-gray-300 text-white py-2 px-5 rounded-full font-medium hover:bg-blue-600 transition-colors"
      >
        Export Leads
      </button>
    </Modal>
  );
};