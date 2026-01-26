import React, { useState } from 'react';
import { Search, MoreVertical, Copy, Share2, Play, Trash2 } from 'lucide-react';

// Sample data
const sampleMessages = [
  { id: 1, title: 'Meeting Scheduled', timestamp: '2 min ago', unread: false },
  { id: 2, title: 'We got a new Lead', timestamp: '2 min ago', unread: true },
  { id: 3, title: 'We have generated a new lead', timestamp: '2 min ago', unread: false },
  { id: 4, title: 'Lorem Ipsum is simply dummy te...', timestamp: '2 min ago', unread: false },
  { id: 5, title: 'Lorem Ipsum is simply dummy te...', timestamp: '2 min ago', unread: true },
  { id: 6, title: 'Lorem Ipsum is simply dummy te...', timestamp: '2 min ago', unread: false },
  { id: 7, title: 'Lorem Ipsum is simply dummy te...', timestamp: '2 min ago', unread: false },
  { id: 8, title: 'Lorem Ipsum is simply dummy te...', timestamp: '2 min ago', unread: false },
];

const tags = [
  { id: 'meetings', label: 'Meetings Booked', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  { id: 'positive', label: 'Positive', bgColor: 'bg-transparent', textColor: 'text-green-500' },
  { id: 'nurturing', label: 'Nurturing', bgColor: 'bg-gray-100', textColor: 'text-gray-700' },
  { id: 'badTiming', label: 'Bad Timing', bgColor: 'bg-transparent', textColor: 'text-orange-400' },
  { id: 'replyNeeded', label: 'Reply Needed', bgColor: 'bg-transparent', textColor: 'text-blue-500' },
  { id: 'irrelevant', label: 'Irrelevant', bgColor: 'bg-gray-100', textColor: 'text-gray-400' },
  { id: 'outOfOffice', label: 'Out of Office Reply', bgColor: 'bg-transparent', textColor: 'text-orange-400' },
];

const MessageActionMenu = ({ onClose }) => {
  const menuItems = [
    { icon: Copy, label: 'Duplicate' },
    { icon: Share2, label: 'Share' },
    { icon: Play, label: 'Play' },
    { icon: Trash2, label: 'Delete' },
  ];

  return (
    <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[160px]">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            console.log(item.label);
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
        >
          <item.icon size={16} className="text-gray-500" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

const InboxPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const filters = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'replied', label: 'Replied', count: null },
    { id: 'analytics', label: 'Analytics', count: null },
  ];

  const toggleTag = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredMessages = sampleMessages.filter(msg => 
    msg.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl p-8 rounded bg-white font-semibold text-gray-900 mb-4">Inbox</h1>
      
      <div className="flex gap-4">
        {/* Left Sidebar - Filters */}
        <div className="w-[200px] bg-white p-5 rounded-2xl flex-shrink-0">
          {/* Filter Options */}
          <div className="space-y-1 mb-6">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                  activeFilter === filter.id 
                    ? 'bg-[#E8EAFF] text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{filter.label}</span>
                {filter.count && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === filter.id ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${tag.bgColor} ${tag.textColor} ${
                    selectedTags.includes(tag.id) ? 'ring-2 ring-[#3C49F7] ring-offset-1' : ''
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Messages */}
        <div className="flex-1 bg-white p-5 rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">All {filteredMessages.length} Messages</span>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search the message"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C49F7]/20 focus:border-[#3C49F7]"
              />
            </div>
            <button className="p-3 text-gray-400 hover:text-gray-600">
              <MoreVertical size={18} />
            </button>
          </div>

          {/* Messages List */}
          <div className="space-y-2">
            {filteredMessages.map(message => (
              <div
                key={message.id}
                className="bg-[#E8EAFF]/40 rounded-xl p-4 flex items-center justify-between hover:bg-[#E8EAFF]/60 transition-colors cursor-pointer relative"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{message.title}</h4>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <div className="flex items-center gap-3">
                  {message.unread && (
                    <div className="w-2 h-2 rounded-full bg-[#3C49F7]" />
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === message.id ? null : message.id);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {openMenuId === message.id && (
                    <MessageActionMenu onClose={() => setOpenMenuId(null)} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;