// components/sales/SearchResultsView.jsx
import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import {
  ProfileCard,
  ProfileListHeader,
  SelectAllRow,
} from "../profiles/ProfileComponents";
import { Pagination } from "../common/CommonComponents";
import {
  AddToProjectModal,
  AddedToProjectModal,
} from "../modals/Modals";

export default function SearchResultsView() {
  const {
    profiles,
    selectedProfiles,
    toggleProfileSelection,
    selectAllProfiles,
    expandedProfile,
    toggleExpandedProfile,
    enrichProfile,
    enrichMultipleProfiles,
    getPaginatedProfiles,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalResults,
    excludeInProject,
    setExcludeInProject,
  } = useSearch();

  const [addToProjectModal, setAddToProjectModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [targetProfileId, setTargetProfileId] = useState(null);

  const paginatedProfiles = getPaginatedProfiles();
  const isAllSelected =
    paginatedProfiles.length > 0 &&
    paginatedProfiles.every((p) => selectedProfiles.includes(p.id));

  const handleEnrich = (profileId) => {
    enrichProfile(profileId);
  };

  const handleEnrichAll = () => {
    const unenrichedSelected = selectedProfiles.filter(
      (id) => !profiles.find((p) => p.id === id)?.isEnriched
    );
    enrichMultipleProfiles(unenrichedSelected);
  };

  const handleAddToProject = (profileId) => {
    setTargetProfileId(profileId);
    setAddToProjectModal(true);
  };

  const handleAddAllToProject = () => {
    setTargetProfileId(null);
    setAddToProjectModal(true);
  };

  const handleProjectSelected = (project) => {
    setSelectedProjectName(project.name);
    setAddToProjectModal(false);
    setSuccessModal(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <ProfileListHeader
          totalResults={totalResults}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          selectedCount={selectedProfiles.length}
          isAllSelected={isAllSelected}
          onSelectAll={selectAllProfiles}
          excludeInProject={excludeInProject}
          onExcludeChange={setExcludeInProject}
        />

        <SelectAllRow
          isAllSelected={isAllSelected}
          selectedCount={selectedProfiles.length}
          onSelectAll={selectAllProfiles}
          onEnrichAll={handleEnrichAll}
          onAddAllToProject={handleAddAllToProject}
        />
      </div>

      {/* Profile List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {paginatedProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isSelected={selectedProfiles.includes(profile.id)}
              isExpanded={expandedProfile === profile.id}
              onSelect={toggleProfileSelection}
              onExpand={toggleExpandedProfile}
              onEnrich={handleEnrich}
              onAddToProject={handleAddToProject}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Modals */}
      <AddToProjectModal
        isOpen={addToProjectModal}
        onClose={() => setAddToProjectModal(false)}
        onAdd={handleProjectSelected}
        profileCount={targetProfileId ? 1 : selectedProfiles.length}
      />

      <AddedToProjectModal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        projectName={selectedProjectName}
      />
    </div>
  );
}