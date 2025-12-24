// components/sales/SearchFiltersPanel.jsx
import { useState } from "react";
import { FilterTag } from "../common/CommonComponents";
import {
  locationData,
  departmentData,
  managementLevels,
  educationMajors,
  degreeTypes,
  preferredContactMethods,
} from "../../data/salesAgentData";

// Chevron Icons
const ChevronRight = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronDown = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const SettingsIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Filter Section Component
const FilterSection = ({ title, count, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">{title}</span>
          {count > 0 && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <span className={`transition-transform duration-200 text-blue-500 ${isOpen ? "rotate-90" : "rotate-180"}`}>
          <ChevronRight />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1">{children}</div>
      </div>
    </div>
  );
};

// Text Input
const TextInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all duration-200"
  />
);

// Select Input
const SelectInput = ({ options, value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white pr-8 transition-all duration-200"
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

// Expandable List Item
const ExpandableListItem = ({ item, isSelected, onToggle, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2 py-1.5 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-150">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0.5 hover:bg-gray-100 rounded transition-colors duration-150"
        >
          <ChevronRight className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
        </button>
        <label className="flex items-center gap-2 flex-1 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(item.name)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            {item.name} {item.count && <span className="text-gray-400">({item.count})</span>}
          </span>
        </label>
        <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-150">
          <SettingsIcon className="text-gray-400" />
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        {item.children && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child, idx) => (
              <label key={idx} className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={() => onToggle({ type: "location", value: child, icon: "location" })}
                />
                <span className="text-sm text-gray-600">{child}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Radius Slider
const RadiusSlider = ({ value, onChange }) => {
  const marks = [0, 25, 50, 75, 100];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700">Radius (mi)</span>
        <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-400 cursor-help">?</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between mt-1">
        {marks.map((mark) => (
          <span key={mark} className="text-xs text-blue-500 font-medium">{mark}</span>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function SearchFiltersPanel({
  searchType = "individual",
  activeFilters = [],
  onAddFilter,
  onRemoveFilter,
  onClearFilters,
  onSaveSearch,
  onLoadSearch,
}) {
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    description: "",
    preferredContact: "- Preferred Contact -",
    occupation: "",
    companyName: "",
    school: "",
    degree: "",
    major: "",
    jobTitle: "",
    department: "",
    radius: 0,
  });

  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputKeyDown = (e, type, icon) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onAddFilter({ type, value: e.target.value.trim(), icon });
      handleFilterChange(type, "");
    }
  };

  const handleLocationSelect = (locationName) => {
    const isSelected = selectedLocations.includes(locationName);
    if (isSelected) {
      setSelectedLocations((prev) => prev.filter((l) => l !== locationName));
    } else {
      setSelectedLocations((prev) => [...prev, locationName]);
      onAddFilter({ type: "location", value: locationName, icon: "location" });
    }
  };

  const isIndividual = searchType === "individual";

  // Count active filters per section
  const getFilterCount = (type) => activeFilters.filter((f) => f.type === type).length;

  return (
    <div className="w-80 bg-white flex flex-col h-full rounded-b-2xl">
      {/* Header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Search Filters</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Clear Filter
          </button>
        </div>

        {/* Active Filter Tags */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((filter) => (
              <FilterTag key={filter.id} filter={filter} onRemove={onRemoveFilter} />
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Filters */}
      <div className="flex-1 overflow-auto px-4">
        {isIndividual ? (
          <>
            <FilterSection title="Name" count={getFilterCount("name")}>
              <TextInput
                placeholder="Enter Name..."
                value={filters.name}
                onChange={(v) => handleFilterChange("name", v)}
                onKeyDown={(e) => handleInputKeyDown(e, "name", "user")}
              />
            </FilterSection>

            <FilterSection title="Location" count={getFilterCount("location")}>
              <TextInput
                placeholder="Enter Location..."
                value={filters.location}
                onChange={(v) => handleFilterChange("location", v)}
              />
              <div className="mt-3 max-h-64 overflow-auto space-y-1">
                {locationData.map((loc) => (
                  <ExpandableListItem
                    key={loc.name}
                    item={loc}
                    isSelected={selectedLocations.includes(loc.name)}
                    onSelect={handleLocationSelect}
                    onToggle={onAddFilter}
                  />
                ))}
              </div>
              <RadiusSlider
                value={filters.radius}
                onChange={(v) => handleFilterChange("radius", v)}
              />
            </FilterSection>

            <FilterSection title="Description" count={getFilterCount("description")}>
              <TextInput
                placeholder="Enter LinkedIn Url or Keyword here.."
                value={filters.description}
                onChange={(v) => handleFilterChange("description", v)}
              />
            </FilterSection>
          </>
        ) : (
          <>
            <FilterSection title="Preffered Contact Method" count={getFilterCount("contact")}>
              <SelectInput
                options={preferredContactMethods}
                value={filters.preferredContact}
                onChange={(v) => {
                  handleFilterChange("preferredContact", v);
                  if (v !== "- Preferred Contact -") {
                    onAddFilter({ type: "contact", value: v, icon: "contact" });
                  }
                }}
              />
            </FilterSection>

            <FilterSection title="Location" count={getFilterCount("location")}>
              <TextInput
                placeholder="Enter Location..."
                value={filters.location}
                onChange={(v) => handleFilterChange("location", v)}
              />
              <div className="mt-3 max-h-48 overflow-auto space-y-1">
                {locationData.map((loc) => (
                  <ExpandableListItem
                    key={loc.name}
                    item={loc}
                    isSelected={selectedLocations.includes(loc.name)}
                    onSelect={handleLocationSelect}
                    onToggle={onAddFilter}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Occupation" count={getFilterCount("occupation")}>
              <TextInput
                placeholder="Enter Job Title..."
                value={filters.jobTitle}
                onChange={(v) => handleFilterChange("jobTitle", v)}
              />
            </FilterSection>

            <FilterSection title="Company Name or Domain" count={getFilterCount("company")}>
              <TextInput
                placeholder="Enter Company..."
                value={filters.companyName}
                onChange={(v) => handleFilterChange("companyName", v)}
              />
            </FilterSection>

            <FilterSection title="Education" count={getFilterCount("education")}>
              <TextInput
                placeholder="Enter Major..."
                value={filters.major}
                onChange={(v) => handleFilterChange("major", v)}
              />
            </FilterSection>

            <FilterSection title="Description" count={getFilterCount("description")}>
              <TextInput
                placeholder="Enter LinkedIn Url or Keyword here.."
                value={filters.description}
                onChange={(v) => handleFilterChange("description", v)}
              />
            </FilterSection>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3 border-t border-gray-100">
        <button
          onClick={onSaveSearch}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-all duration-200"
        >
          Save This Search
        </button>
        <button
          onClick={onLoadSearch}
          className="w-full bg-white text-gray-700 py-3 rounded-full font-medium border border-gray-200 hover:border-gray-300 transition-all duration-200"
        >
          Load Past Search
        </button>
      </div>
    </div>
  );
}