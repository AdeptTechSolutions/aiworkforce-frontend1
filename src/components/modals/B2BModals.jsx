// components/modals/B2BModals.jsx
import { useState } from "react";
import { useB2BSearch } from "../../context/B2BSearchContext";

// Save Search Modal
export const SaveSearchModal = ({ isOpen, onClose, onSave }) => {
  const [searchName, setSearchName] = useState("");

  const handleSave = () => {
    if (searchName.trim()) {
      onSave(searchName);
      setSearchName("");
    }
  };

  const handleClose = () => {
    setSearchName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Save This Search</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-6">Save your current search filters for later use</p>

        {/* Search Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Search Name
          </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter a name for this search"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!searchName.trim()}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
              searchName.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Search
          </button>
        </div>
      </div>
    </div>
  );
};

// Load Search Modal
export const LoadSearchModal = ({ isOpen, onClose, savedSearches, onLoadSearch }) => {
  const [selectedSearch, setSelectedSearch] = useState(null);

  const handleLoad = () => {
    if (selectedSearch) {
      onLoadSearch(selectedSearch);
      setSelectedSearch(null);
    }
  };

  const handleClose = () => {
    setSelectedSearch(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Load Past Search</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-6">Select a saved search to load</p>

        {/* Saved Searches List */}
        <div className="space-y-2 max-h-80 overflow-y-auto mb-6">
          {savedSearches.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>No saved searches yet</p>
            </div>
          ) : (
            savedSearches.map((search) => (
              <button
                key={search.id}
                onClick={() => setSelectedSearch(search)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                  selectedSearch?.id === search.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">{search.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {search.resultCount.toLocaleString()} results • {search.date}
                  </p>
                </div>
                {selectedSearch?.id === search.id && (
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleLoad}
            disabled={!selectedSearch}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
              selectedSearch
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Load Search
          </button>
        </div>
      </div>
    </div>
  );
};

// Add to Project Modal
export const AddToProjectModal = ({ isOpen, onClose, company, onAddToProject }) => {
  const { projects, addProject, addToProject } = useB2BSearch();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState(""); // "added" or "created"
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const handleAdd = () => {
    if (selectedProject && company) {
      addToProject(selectedProject.id, [company.id]);
      setSuccessType("added");
      setShowSuccess(true);
    }
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
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

  // Go back to profiles (close modal completely)
  const handleGoBackToProfiles = () => {
    if (selectedProject) {
      onAddToProject(selectedProject.name);
    }
    handleClose();
  };

  // Go back to select project form after creating project
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
          {/* Success Icon */}
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
            Go Back to Profiles
          </button>
        </div>
      )}

      {/* Success Modal - Project Created */}
      {showSuccess && successType === "created" && (
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
          {/* Success Icon */}
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

          {/* Project Name */}
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

          {/* Project Description */}
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

          {/* Create Button */}
          <button
            onClick={handleCreateProject}
            disabled={!newProjectName.trim()}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              newProjectName.trim()
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

          <p className="text-gray-500 text-sm mb-6">Where you want to move the profile</p>

          {/* Project List */}
          <div className="space-y-2 mb-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  selectedProject?.id === project.id
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "bg-white hover:bg-gray-50 border-2 border-transparent"
                }`}
              >
                {/* Radio Button */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedProject?.id === project.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 bg-white"
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

          {/* Footer */}
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
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                selectedProject
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

// Success Modal
export const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-500 mb-8">{message}</p>

        <button
          onClick={onClose}
          className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Loading Modal
export const LoadingModal = ({ isOpen, message = "Loading..." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl text-center">
        {/* Spinner */}
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default {
  SaveSearchModal,
  LoadSearchModal,
  AddToProjectModal,
  SuccessModal,
  LoadingModal,
};