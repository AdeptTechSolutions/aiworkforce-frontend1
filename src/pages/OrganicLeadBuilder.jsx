// pages/OrganicLeadBuilder.jsx
import { useState } from "react";
import LinkedInIcon from "../assets/icons/LinkedInIcon.png";
// LinkedIn Icon Component
// const LinkedInIcon = () => (
//     <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#0A66C2">
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//     </svg>
// );

const OrganicLeadBuilder = () => {
    const [isConnected, setIsConnected] = useState(false);

    const handleConnectAccount = () => {
        // Handle LinkedIn OAuth connection
        console.log("Connecting LinkedIn account...");
        // This would trigger OAuth flow in real implementation
    };

    const handleAddNewCampaign = () => {
        // Handle adding new campaign
        console.log("Adding new campaign...");
    };

    return (
        <div className="flex-1 min-h-full p-8 overflow-y-auto">
            <div className="w-full rounded-[24px] bg-white px-5 py-2">
                {/* Header Section */}
                <div className="mb-8 ">
                    <h1 className="text-[32px] font-normal text-[#1a1a1a] mb-1 font-['DM_Sans']">
                        To start generate leads,
                    </h1>
                    <p className="text-[18px] font-semibold text-[#1a1a1a] font-['DM_Sans']">
                        We need you to:
                    </p>
                </div>

                {/* LinkedIn Connection Card */}
                <div className="bg-[#F2F2FF] rounded-lg p-5 flex items-center justify-between shadow-sm mb-10 max-w-full">
                    <div className="flex items-center gap-4">
                        {/* LinkedIn Icon Container */}
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                           <img src={LinkedInIcon} alt="linkedin" className="w-14 h-14" />
                        </div>

                        {/* Text Content */}
                        <div>
                            <h3 className="text-[16px] font-semibold text-[#1a1a1a] font-['DM_Sans']">
                                Connect your Linkedin Profile
                            </h3>
                            <p className="text-[14px] text-[#6B7280] font-['DM_Sans']">
                                Connect your Linkedin account to enhance your reach.
                            </p>
                        </div>
                    </div>

                    {/* Connect Button */}
                    <button
                        onClick={handleConnectAccount}
                        className="bg-[#3C49F7] hover:bg-[#0052CC] text-white px-5 py-2 rounded-full text-[14px] font-medium transition-colors font-['DM_Sans']"
                    >
                        Connect Account
                    </button>
                </div>
            </div>
            {/* Start a Campaign Section */}
            <div className="bg-white rounded-[24px] mt-4 p-3 ">
                <h2 className="text-[28px] font-normal text-[#1a1a1a] mb-5 font-['DM_Sans']">
                    Start a campaign
                </h2>

                <button
                    onClick={handleAddNewCampaign}
                    className="border-2 border-[#0028B6] text-[#0028B6] bg-white hover:bg-[#F0F7FF] px-4 py-2 rounded-full text-[14px] font-medium transition-colors font-['DM_Sans']"
                >
                    Add New Campaign
                </button>
            </div>
        </div>
    );
};

export default OrganicLeadBuilder;