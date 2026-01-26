import React, { useState } from "react";
import { ChevronLeft, X, Check, ChevronDown, Info, MoreVertical, Play } from "lucide-react";

// Variable options for Add Variables dropdown
const variableOptions = ["First Name", "Last Name", "Full Name", "Job Title", "Current Company"];

// Timezone options
const timezoneOptions = ["Eastern Time Zone (EST)", "Indian Standard Time (IST)", "Pacific Time (PST)"];

// Time options
const timeOptions = ["01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];

// Voice options
const voiceOptions = ["Eric (American English)", "Sarah (British English)", "James (Australian English)"];

// Language options
const languageOptions = ["English", "Spanish", "French", "German"];

// Background audio options
const backgroundAudioOptions = ["Office", "Cafe", "Silent", "Nature"];

// Days of week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Sample data for emails
const sampleEmails = [
  { id: 1, name: "Jhon Doe", count: 2, tag: "IMPORTANT", tagColor: "bg-red-500", preview: "Hi There!, We are really interested in getting the subscription for AI Workforce. We wanted to know more bout the platform.", time: "12:20 PM" },
  { id: 2, name: "Dana Osbor", count: 2, tag: "WARM LEADS", tagColor: "bg-blue-500", preview: "Hi There!, We are really interested in getting the subscription for AI Workforce. We wanted to know more bout the platform.", time: "12:20 PM" },
  { id: 3, name: "Agnes Pratt", count: 2, tag: "IMPORTANT", tagColor: "bg-red-500", preview: "Hi There!, We are really interested in getting the subscription for AI Workforce. We wanted to know more bout the platform.", time: "12:20 PM" },
  { id: 4, name: "Clint Estrad", count: 2, tag: "TODO", tagColor: "bg-yellow-400", preview: "Hi There!, We are really interested in getting the subscription for AI Workforce. We wanted to know more bout the platform.", time: "12:20 PM" },
  { id: 5, name: "Marcelo Dix", count: 2, tag: "WARM LEADS", tagColor: "bg-blue-500", preview: "Hi There!, We are really interested in getting the subscription for AI Workforce. We wanted to know more bout the platform.", time: "12:20 PM" },
  { id: 6, name: "Cameron Ai", count: 2, tag: "TODO", tagColor: "bg-yellow-400", preview: "Hi There!, We are really interested in getting the subscription for AI Workforce. We wanted to know more bout the platform.", time: "12:20 PM" },
];

// Sample upcoming meetings for Meeting Notetaker
const upcomingMeetings = [
  { id: 1, time: "12:00 PM", title: "Onboarding the Platform", name: "Nikolaj Jørgensen", email: "nikolaj123@email.com", callTime: "Call At 12:30 PM, Sunday 12/01/26", hasJoin: true },
  { id: 2, time: "12:30 PM", title: null, name: null, email: null, callTime: null, hasJoin: false },
  { id: 3, time: "01:00 PM", title: null, name: null, email: null, callTime: null, hasJoin: false },
  { id: 4, time: "01:30 PM", title: "Onboarding the Platform", name: "Nikolaj Jørgensen", email: "nikolaj123@email.com", callTime: "Call At 12:30 PM, Sunday 12/01/26", hasJoin: true },
  { id: 5, time: "02:00 PM", title: null, name: null, email: null, callTime: null, hasJoin: false },
];

// Sample upcoming calls
const upcomingCalls = [
  { id: 1, time: "12:00 PM", name: "Nikolaj Jørgensen", location: "London", phone: "+44-54123541623", scheduledTime: "At 5:30 PM - 6:00 PM", hasNotify: false },
  { id: 2, time: "12:30 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
  { id: 3, time: "01:00 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
  { id: 4, time: "01:30 PM", name: "Nikolaj Jørgensen", location: "London", phone: "+44-54123541623", scheduledTime: "At 5:30 PM - 6:00 PM", hasNotify: true },
  { id: 5, time: "02:00 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
  { id: 6, time: "02:00 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
  { id: 7, time: "02:00 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
  { id: 8, time: "02:00 PM", name: "Nikolaj Jørgensen", location: "London", phone: "+44-54123541623", scheduledTime: "At 5:30 PM - 6:00 PM", hasNotify: true },
  { id: 9, time: "02:00 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
  { id: 10, time: "02:00 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
  { id: 11, time: "02:00 PM", name: null, location: null, phone: null, scheduledTime: null, hasNotify: false },
];

// Remove Number Confirmation Modal
const RemoveNumberModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Are you sure?</h3>
        <p className="text-gray-600 mb-8">
          Your settings will be removed permanently if you proceed.<br />Are you sure
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 border-2 border-[#3C49F7] text-[#3C49F7] rounded-full font-medium hover:bg-blue-50"
          >
            Yes, Remove Number
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#3C49F7]/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Generating Prompt Modal
const GeneratingPromptModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Wait for a few seconds,</h3>
        <p className="text-gray-600 mb-6">We are generating your prompt for the call agent</p>
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
        </div>
      </div>
    </div>
  );
};

// Add Variables Dropdown
const AddVariablesDropdown = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
        {variableOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              onSelect(option);
              onClose();
            }}
            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};

// Setup Assistant Screen
const SetupAssistantScreen = ({ onBack, phoneNumber = "+44 65124 64612" }) => {
  const [activeTab, setActiveTab] = useState("callFlow");
  const [assistantActive, setAssistantActive] = useState(true);
  const [agentName, setAgentName] = useState("");
  const [openingLine, setOpeningLine] = useState("Hello,\n\nMyself Jhon, I am Sales Executive at and launched a new product at the company.");
  const [callPrompt, setCallPrompt] = useState("Hello first_name,\n\nWe're excited to share that current_company officially launches tomorrow.\n\nAI Lead is built to help businesses find, qualify, and convert the right leads faster—using the power of AI. Our goal is simple: reduce manual effort, improve lead quality, and help teams focus on closing, not chasing.\n\nTomorrow marks the beginning of something we've worked hard to build, and we'd love for you to be part of this journey from day one.");
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showGeneratingModal, setShowGeneratingModal] = useState(false);
  const [showVariablesDropdown, setShowVariablesDropdown] = useState(null);
  
  // Configuration state
  const [voice, setVoice] = useState("Eric (American English)");
  const [language, setLanguage] = useState("English");
  const [backgroundAudio, setBackgroundAudio] = useState("Office");
  const [advanceSettingsEnabled, setAdvanceSettingsEnabled] = useState(true);
  const [fromTime, setFromTime] = useState("12:00 PM");
  const [toTime, setToTime] = useState("6:00 PM");
  const [timezone, setTimezone] = useState("Estern Time Zone");
  const [maxMinutes, setMaxMinutes] = useState("");
  const [activeDays, setActiveDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);

  const toggleDay = (day) => {
    setActiveDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleAddVariable = (variable, field) => {
    const variableTag = variable.toLowerCase().replace(/ /g, "_");
    if (field === "opening") {
      setOpeningLine(prev => prev + ` {{${variableTag}}}`);
    } else if (field === "prompt") {
      setCallPrompt(prev => prev + ` {{${variableTag}}}`);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <ChevronLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-3xl font-normal text-gray-900">Setup Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#3C49F7] font-medium">Assistant Active</span>
            <button
              onClick={() => setAssistantActive(!assistantActive)}
              className={`w-12 h-7 rounded-full transition-colors ${assistantActive ? 'bg-[#3C49F7]' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${assistantActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Phone Number Card */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Phone Number Connected</span>
            <a href="#" className="text-[#3C49F7] font-medium">{phoneNumber}</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
              Inbound Call Logs
            </button>
            <button 
              onClick={() => setShowRemoveModal(true)}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Remove Number
            </button>
            <button className="px-4 py-2 bg-[#3C49F7] text-white rounded-full text-sm font-medium hover:bg-[#3C49F7]/90">
              Switch Phone Number
            </button>
          </div>
        </div>

        {/* Tabs and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("callFlow")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "callFlow" ? "bg-gray-900 text-white" : "text-gray-600"
              }`}
            >
              Call Flow
            </button>
            <button
              onClick={() => setActiveTab("configurations")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "configurations" ? "bg-gray-900 text-white" : "text-gray-600"
              }`}
            >
              Configurations
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500">
              Test Call
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500">
              Save Prompt
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "callFlow" ? (
          <div className="space-y-6">
            {/* Name Your Agent */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Name Your Agent</label>
              <input
                type="text"
                placeholder="Name your Agent"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C49F7]/20"
              />
            </div>

            {/* Opening Line */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">Opening Line</label>
                <div className="group relative">
                  <Info size={16} className="text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg">
                    The first message that your Agent will say.
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <textarea
                  value={openingLine}
                  onChange={(e) => setOpeningLine(e.target.value)}
                  placeholder="Type your message content here."
                  className="w-full bg-transparent text-sm text-gray-700 focus:outline-none min-h-[80px] resize-none"
                />
                <div className="relative mt-2">
                  <button 
                    onClick={() => setShowVariablesDropdown(showVariablesDropdown === "opening" ? null : "opening")}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-white"
                  >
                    + Add Variables
                  </button>
                  <AddVariablesDropdown 
                    isOpen={showVariablesDropdown === "opening"}
                    onSelect={(v) => handleAddVariable(v, "opening")}
                    onClose={() => setShowVariablesDropdown(null)}
                  />
                </div>
              </div>
            </div>

            {/* Call Prompt */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">Call Prompt</label>
                <div className="group relative">
                  <Info size={16} className="text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg">
                    The call prompt can be used to configure the context, role, personality, instructions and so on.
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <textarea
                  value={callPrompt}
                  onChange={(e) => setCallPrompt(e.target.value)}
                  placeholder="Type your prompt here."
                  className="w-full bg-transparent text-sm text-gray-700 focus:outline-none min-h-[200px] resize-none"
                />
                <div className="relative mt-2">
                  <button 
                    onClick={() => setShowVariablesDropdown(showVariablesDropdown === "prompt" ? null : "prompt")}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-white"
                  >
                    + Add Variables
                  </button>
                  <AddVariablesDropdown 
                    isOpen={showVariablesDropdown === "prompt"}
                    onSelect={(v) => handleAddVariable(v, "prompt")}
                    onClose={() => setShowVariablesDropdown(null)}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Caller Configuration */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Caller Configuration</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Voice</label>
                  <div className="flex gap-2">
                    <select
                      value={voice}
                      onChange={(e) => setVoice(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C49F7]/20 appearance-none bg-white"
                    >
                      {voiceOptions.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                      <Play size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C49F7]/20 appearance-none bg-white"
                  >
                    {languageOptions.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Background audio</label>
                  <select
                    value={backgroundAudio}
                    onChange={(e) => setBackgroundAudio(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C49F7]/20 appearance-none bg-white"
                  >
                    {backgroundAudioOptions.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Advance Assistant Settings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Advance Assistant Settings</h3>
                <button
                  onClick={() => setAdvanceSettingsEnabled(!advanceSettingsEnabled)}
                  className={`w-12 h-7 rounded-full transition-colors ${advanceSettingsEnabled ? 'bg-[#3C49F7]' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${advanceSettingsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {advanceSettingsEnabled && (
                <>
                  {/* AI Assistant Active Hours */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">AI Assistant Active Hours</label>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">From</label>
                        <select
                          value={fromTime}
                          onChange={(e) => setFromTime(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none appearance-none bg-white"
                        >
                          {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">To</label>
                        <select
                          value={toTime}
                          onChange={(e) => setToTime(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none appearance-none bg-white"
                        >
                          {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Select Timezone</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none appearance-none bg-white"
                        >
                          {timezoneOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Limit Max Minutes used per call</label>
                        <select
                          value={maxMinutes}
                          onChange={(e) => setMaxMinutes(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none appearance-none bg-white"
                        >
                          <option value="">-- Select --</option>
                          <option value="5">5 minutes</option>
                          <option value="10">10 minutes</option>
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Active Days */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Active Days</label>
                    <div className="flex gap-2">
                      {daysOfWeek.map(day => (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                            activeDays.includes(day)
                              ? "bg-white border-gray-300 text-gray-900"
                              : "bg-gray-50 border-gray-200 text-gray-400"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <RemoveNumberModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={() => {
          setShowRemoveModal(false);
          onBack();
        }}
      />
      <GeneratingPromptModal isOpen={showGeneratingModal} />
    </div>
  );
};

// Meeting Notetaker Dashboard
const MeetingNotetakerDashboard = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Title */}
        <h1 className="text-3xl font-normal text-gray-900 mb-8">Meeting Notetaker</h1>

        {/* Calendar Connected Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 mb-1">Calendar Connected</p>
            <h2 className="text-2xl text-gray-900">Google Calendar</h2>
          </div>
          <button className="text-[#3C49F7] font-medium hover:text-[#3C49F7]/80">
            Calendar Settings
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Meetings Recorded</h3>
            <p className="text-3xl font-bold text-[#3C49F7]">32</p>
          </div>
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Average Meeting Duration</h3>
            <p className="text-3xl font-bold text-[#3C49F7]">3:20 min</p>
          </div>
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Telegram Account</h3>
            <button className="text-[#3C49F7] font-medium hover:text-[#3C49F7]/80 mt-2">
              Open Telegram
            </button>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-normal text-gray-900">Upcoming Meetings</h2>
            <button className="px-5 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#3C49F7]/90">
              Meetings Logs
            </button>
          </div>
          
          <div className="space-y-0">
            {upcomingMeetings.map((meeting, index) => (
              <div key={meeting.id} className="flex items-center">
                {/* Time Column */}
                <div className="w-24 pr-4">
                  <span className="text-sm font-medium text-gray-600">{meeting.time}</span>
                </div>

                {/* Vertical Line */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-0.5 h-8 ${meeting.title ? 'bg-red-400' : 'bg-gray-200'}`} />
                  {index < upcomingMeetings.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200" />
                  )}
                </div>

                {/* Meeting Card or Empty Space */}
                <div className="flex-1 ml-4 py-2">
                  {meeting.title ? (
                    <div className="bg-[#E8EAFF]/50 rounded-xl px-6 py-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{meeting.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{meeting.name}</span>
                          <a href={`mailto:${meeting.email}`} className="text-[#3C49F7] underline">{meeting.email}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-700">{meeting.callTime}</span>
                        {meeting.hasJoin && (
                          <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-white">
                            Join Meeting
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-8 border-b border-dashed border-gray-200" />
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

// Add Number Modal
const AddNumberModal = ({ isOpen, onClose, onSubmit }) => {
  const [activeProvider, setActiveProvider] = useState("twilio");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    accountSid: "",
    authToken: "",
  });
  const [showNumberDropdown, setShowNumberDropdown] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add your Number</h2>
            <p className="text-sm text-gray-600">Please fill your details.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Provider Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveProvider("twilio")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeProvider === "twilio"
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-700"
            }`}
          >
            Twilio
          </button>
          <button
            onClick={() => setActiveProvider("vonage")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeProvider === "vonage"
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-700"
            }`}
          >
            Vonage
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Number <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <button
                onClick={() => setShowNumberDropdown(!showNumberDropdown)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-left text-gray-500 flex items-center justify-between"
              >
                {formData.number || "Enter your Number"}
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Account SID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Account SID"
              value={formData.accountSid}
              onChange={(e) => setFormData({ ...formData, accountSid: e.target.value })}
              className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Auth Token <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Auth Token *"
              value={formData.authToken}
              onChange={(e) => setFormData({ ...formData, authToken: e.target.value })}
              className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-[#3C49F7] text-white py-3 rounded-full font-medium hover:bg-[#3C49F7]/90"
        >
          Import
        </button>
      </div>
    </div>
  );
};

// Connecting Modal
const ConnectingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Connecting and importing...</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          We are importing your contact. Please wait and do not close this window.
        </p>
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
        </div>
      </div>
    </div>
  );
};

// Success Modal
const SuccessModal = ({ isOpen, onClose, provider = "Twilio" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Successfully Imported!</h3>
        <p className="text-gray-600 mb-6">
          We have successfully imported all of your contacts from your {provider} account.
        </p>
        <button
          onClick={onClose}
          className="px-8 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#3C49F7]/90"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Email Review Screen
const EmailReviewScreen = ({ onBack }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="h-full flex flex-col">
      {/* Back Button */}
      <div className="p-6 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Email List */}
      <div className="px-6">
        {sampleEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => setSelectedEmail(email)}
            className={`flex items-center py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              selectedEmail?.id === email.id ? "bg-gray-50" : ""
            }`}
          >
            <span className="font-semibold text-gray-900 w-32">{email.name}</span>
            <span className="text-gray-500 text-sm w-6">{email.count}</span>
            <span className={`${email.tagColor} text-white text-xs px-2 py-1 rounded font-medium mr-4`}>
              {email.tag}
            </span>
            <span className="flex-1 text-sm text-gray-600 truncate">{email.preview}</span>
            <span className="text-sm text-gray-500 ml-4">{email.time}</span>
          </div>
        ))}
      </div>

      {/* Email Detail / Empty State */}
      <div className="flex-1 mx-6 mt-4 mb-6 border border-gray-200 rounded-xl">
        {selectedEmail ? (
          <div className="p-6 h-full flex flex-col">
            {/* Email Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedEmail.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-gray-900">Meeting Schedued</span>
                <span className={`${selectedEmail.tagColor} text-white text-xs px-2 py-1 rounded font-medium`}>
                  {selectedEmail.tag}
                </span>
              </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 space-y-4">
              <div className="bg-[#E8EAFF]/30 p-4 rounded-lg border-l-4 border-[#3C49F7]">
                <p className="text-gray-700">Hi There!,</p>
                <p className="text-gray-700 mt-2">
                  We are really interested in getting the subscription for AI Workforce. We wanted to know more bout the platform.
                </p>
              </div>

              <div className="bg-[#E8EAFF]/30 p-4 rounded-lg border-l-4 border-[#3C49F7]">
                <p className="text-gray-700">Hi,</p>
                <p className="text-gray-700 mt-2">
                  I'd like to schedule a quick discussion to take things forward. Please share your availability and a suitable time.
                  Looking forward to connecting.
                </p>
                <p className="text-gray-700 mt-4">Best,</p>
                <p className="text-gray-700">Raymond</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-4">
                <button className="text-[#3C49F7] font-medium hover:text-[#3C49F7]/80">
                  Re Draft
                </button>
                <button className="text-[#3C49F7] font-medium hover:text-[#3C49F7]/80">
                  Fix Grammar
                </button>
              </div>
              <button className="px-6 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#3C49F7]/90">
                Send Email
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No Email Selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Dashboard Component
const PersonalAssistantDashboard = ({ onConnectAccount, onReviewEmails, onSettings, isConnected }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Title */}
        <h1 className="text-3xl font-normal text-gray-900 mb-8">Personal Assistant Agent</h1>

        {/* AI Assistant Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">Your AI executive assistant for Inbound calls</h2>
            <p className="text-lg text-gray-700">Setup the AI assistant.</p>
          </div>
          {isConnected ? (
            <button
              onClick={onSettings}
              className="text-[#3C49F7] font-medium hover:text-[#3C49F7]/80"
            >
              Settings
            </button>
          ) : (
            <button
              onClick={onConnectAccount}
              className="text-[#3C49F7] font-medium hover:text-[#3C49F7]/80"
            >
              Connect Your Account
            </button>
          )}
        </div>

        {/* Emails Pending Section */}
        <div className="flex items-center justify-between mb-8 py-4 border-t border-gray-100">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">E-mails pending approval</h2>
            <p className="text-lg text-gray-700">List of emails you have received from end customers.</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-5xl font-bold text-[#3C49F7]">{isConnected ? "12" : "32"}</span>
            <button
              onClick={onReviewEmails}
              className="text-[#3C49F7] font-medium hover:text-[#3C49F7]/80"
            >
              Review Emails
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Inbound Calls Answered</h3>
            <p className="text-3xl font-bold text-[#3C49F7]">32</p>
          </div>
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Meeting Scheduled From Inbound Calls</h3>
            <p className="text-3xl font-bold text-[#3C49F7]">12</p>
          </div>
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Average Call Duration</h3>
            <p className="text-3xl font-bold text-[#3C49F7]">3:20 min</p>
          </div>
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Calling Credits Left</h3>
            <p className="text-3xl font-bold text-[#3C49F7]">324</p>
          </div>
          <div className="bg-white border border-[#3C49F7]/20 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Minutes Spend On Inbound Calls</h3>
            <p className="text-3xl font-bold text-[#3C49F7]">115</p>
          </div>
        </div>

        {/* Upcoming Inbound Calls */}
        <div>
          <h2 className="text-2xl font-normal text-gray-900 mb-6">Upcoming Inbound Calls</h2>
          
          <div className="space-y-0">
            {upcomingCalls.map((call, index) => (
              <div key={call.id} className="flex items-center">
                {/* Time Column */}
                <div className="w-24 pr-4">
                  <span className="text-sm font-medium text-gray-600">{call.time}</span>
                </div>

                {/* Vertical Line */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-0.5 h-8 ${call.name ? 'bg-[#3C49F7]' : 'bg-gray-200'}`} />
                  {index < upcomingCalls.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200" />
                  )}
                </div>

                {/* Call Card or Empty Space */}
                <div className="flex-1 ml-4 py-2">
                  {call.name ? (
                    <div className="bg-[#E8EAFF]/50 rounded-xl px-6 py-4 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-gray-900">{call.name}</span>
                        <span className="text-gray-600 ml-1">from {call.location}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-700">{call.phone}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-700">{call.scheduledTime}</span>
                        {call.hasNotify && (
                          <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Notify Me
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-8 border-b border-dashed border-gray-200" />
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

// Main Support Agent Page
const SupportAgentPage = ({ activeSupportTab = "personal" }) => {
  const [showAddNumberModal, setShowAddNumberModal] = useState(false);
  const [showConnectingModal, setShowConnectingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEmailReview, setShowEmailReview] = useState(false);
  const [showSetupAssistant, setShowSetupAssistant] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectAccount = () => {
    setShowAddNumberModal(true);
  };

  const handleImport = (formData) => {
    setShowAddNumberModal(false);
    setShowConnectingModal(true);
    
    // Simulate import process
    setTimeout(() => {
      setShowConnectingModal(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setIsConnected(true);
    setShowSetupAssistant(true);
  };

  const handleReviewEmails = () => {
    setShowEmailReview(true);
  };

  const handleSettings = () => {
    setShowSetupAssistant(true);
  };

  // Show Setup Assistant Screen
  if (showSetupAssistant && activeSupportTab === "personal") {
    return (
      <div className="h-full bg-white/50">
        <SetupAssistantScreen 
          onBack={() => setShowSetupAssistant(false)} 
          phoneNumber="+44 65124 64612"
        />
      </div>
    );
  }

  // Show Email Review Screen
  if (showEmailReview) {
    return (
      <div className="h-full bg-white/50">
        <EmailReviewScreen onBack={() => setShowEmailReview(false)} />
        
        <AddNumberModal
          isOpen={showAddNumberModal}
          onClose={() => setShowAddNumberModal(false)}
          onSubmit={handleImport}
        />
        <ConnectingModal isOpen={showConnectingModal} />
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleSuccessClose}
        />
      </div>
    );
  }

  // Show main dashboard based on active tab
  return (
    <div className="h-full bg-white/50">
      {activeSupportTab === "personal" ? (
        <PersonalAssistantDashboard
          onConnectAccount={handleConnectAccount}
          onReviewEmails={handleReviewEmails}
          onSettings={handleSettings}
          isConnected={isConnected}
        />
      ) : activeSupportTab === "meeting" ? (
        <MeetingNotetakerDashboard />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Meeting Notetaker Agent</h2>
            <p className="text-gray-500 mt-2">Coming Soon</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddNumberModal
        isOpen={showAddNumberModal}
        onClose={() => setShowAddNumberModal(false)}
        onSubmit={handleImport}
      />
      <ConnectingModal isOpen={showConnectingModal} />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
      />
    </div>
  );
};

export default SupportAgentPage;