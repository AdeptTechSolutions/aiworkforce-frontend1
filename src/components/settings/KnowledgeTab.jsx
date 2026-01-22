// components/settings/KnowledgeTab.jsx
import { useState, useRef } from 'react';
import { AddURLModal, AddFileModal, URLSuccessModal, FileSuccessModal, AddDropdownMenu } from './SettingsModals';

// Icons
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// Initial mock data matching the design
const initialKnowledgeFiles = [
  { id: 1, name: 'File Name', status: 'completed', size: '3.4 MB' },
  { id: 2, name: 'File Name', status: 'failed', size: '3.4 MB' },
  { id: 3, name: 'File Name', status: 'completed', size: '3.4 MB' },
  { id: 4, name: 'File Name', status: 'in_progress', size: '3.4 MB' },
];

// Status display component matching design exactly
const StatusDisplay = ({ status }) => {
  switch (status) {
    case 'completed':
      return <span className="text-[#22C55E] font-medium">Completed</span>;
    case 'failed':
      return (
        <span className="inline-flex px-4 py-1 bg-red-50 text-[#EF4444] rounded-full text-sm font-medium border border-red-100">
          Failed
        </span>
      );
    case 'in_progress':
      return <span className="text-gray-600 font-medium">In Progress</span>;
    default:
      return <span className="text-gray-500">-</span>;
  }
};

const KnowledgeTab = () => {
  const [files, setFiles] = useState(initialKnowledgeFiles);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  // Modal states
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showAddURLModal, setShowAddURLModal] = useState(false);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showURLSuccessModal, setShowURLSuccessModal] = useState(false);
  const [showFileSuccessModal, setShowFileSuccessModal] = useState(false);
  
  const addButtonRef = useRef(null);

  // Handle checkbox toggle
  const handleCheckboxToggle = (id) => {
    setSelectedFiles(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(f => f.id));
    }
  };

  // Handle URL add success
  const handleURLSuccess = (data) => {
    const newFile = {
      id: Date.now(),
      name: data.name,
      status: 'in_progress',
      size: 'Processing...'
    };
    setFiles(prev => [...prev, newFile]);
    setShowURLSuccessModal(true);
    
    // Simulate processing
    setTimeout(() => {
      setFiles(prev => prev.map(f => 
        f.id === newFile.id ? { ...f, status: 'completed', size: '1.2 MB' } : f
      ));
    }, 3000);
  };

  // Handle File add success
  const handleFileSuccess = (data) => {
    const newFile = {
      id: Date.now(),
      name: data.name,
      status: 'in_progress',
      size: data.size
    };
    setFiles(prev => [...prev, newFile]);
    setShowFileSuccessModal(true);
    
    // Simulate processing
    setTimeout(() => {
      setFiles(prev => prev.map(f => 
        f.id === newFile.id ? { ...f, status: 'completed' } : f
      ));
    }, 3000);
  };

  // Handle delete
  const handleDelete = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setSelectedFiles(prev => prev.filter(f => f !== id));
  };

  // Handle share
  const handleShare = (file) => {
    console.log('Share:', file);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-[#1a1a1a]">Knowledge Files</h2>
        <div className="relative" ref={addButtonRef}>
          <button
            onClick={() => setShowAddDropdown(!showAddDropdown)}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <PlusIcon />
            Add
          </button>
          <AddDropdownMenu
            isOpen={showAddDropdown}
            onClose={() => setShowAddDropdown(false)}
            onAddFile={() => setShowAddFileModal(true)}
            onAddURL={() => setShowAddURLModal(true)}
          />
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-6">Add relevant knowledge to your outreach.</p>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedFiles.length === files.length && files.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-[#3C49F7] focus:ring-[#3C49F7]"
                />
              </th>
              <th className="text-left px-4 py-4 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-4 text-sm font-medium text-gray-500">Size</th>
              <th className="text-right px-4 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleCheckboxToggle(file.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#3C49F7] focus:ring-[#3C49F7]"
                  />
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-[#1a1a1a]">{file.name}</span>
                </td>
                <td className="px-4 py-4">
                  <StatusDisplay status={file.status} />
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">{file.size}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleShare(file)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Share"
                    >
                      <ShareIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {files.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No files added yet</p>
            <button
              onClick={() => setShowAddDropdown(true)}
              className="px-4 py-2 bg-[#3C49F7] text-white rounded-lg text-sm font-medium hover:bg-[#2a35d4] transition-colors"
            >
              Add your first file
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddURLModal 
        isOpen={showAddURLModal} 
        onClose={() => setShowAddURLModal(false)} 
        onSuccess={handleURLSuccess}
      />
      <AddFileModal 
        isOpen={showAddFileModal} 
        onClose={() => setShowAddFileModal(false)} 
        onSuccess={handleFileSuccess}
      />
      <URLSuccessModal 
        isOpen={showURLSuccessModal} 
        onClose={() => setShowURLSuccessModal(false)}
      />
      <FileSuccessModal 
        isOpen={showFileSuccessModal} 
        onClose={() => setShowFileSuccessModal(false)}
      />
    </div>
  );
};

export default KnowledgeTab;