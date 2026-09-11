import React from 'react';
import { TabType } from '../types';
import { APP_LOGO, USER_PROFILE_PIC } from '../data/mockData';

interface HeaderProps {
  activeTab: TabType;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSearchClick,
  onProfileClick
}) => {
  const getSubtitle = () => {
    switch (activeTab) {
      case 'feed':
        return 'Feed';
      case 'details':
        return 'Details';
      case 'mentors':
        return 'Mentors';
      case 'post':
        return 'New Idea';
      default:
        return 'Portal';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 pt-safe bg-[#fcf8ff]/85 backdrop-blur-xl border-b border-[#e3dfff]/60 shadow-[0_1px_16px_rgba(30,27,75,0.04)]">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand Group */}
        <div className="flex items-center gap-2.5">
          <div className="relative group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#712ae2] p-[1.5px] shadow-sm shadow-[#3525cd]/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-[#fcf8ff] flex items-center justify-center overflow-hidden">
                <img
                  src={APP_LOGO}
                  alt="CampusCollab Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#712ae2] border-2 border-white animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="text-[18px] font-bold bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] bg-clip-text text-transparent leading-none tracking-tight">
              CampusCollab
            </span>
            <span className="text-[11px] font-semibold text-[#777587] leading-tight mt-0.5 tracking-wide">
              {getSubtitle()}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Quick Search"
            onClick={onSearchClick}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#464555] hover:text-[#3525cd] hover:bg-[#3525cd]/5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Profile with 3D Luxury Ring */}
          <button
            onClick={onProfileClick}
            aria-label="User Profile"
            className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-[#3525cd] via-[#712ae2] to-[#c3c0ff] hover:shadow-md hover:shadow-[#712ae2]/30 active:scale-95 transition-all"
          >
            <img
              src={USER_PROFILE_PIC}
              alt="Gowtham Reddy Profile"
              className="w-8 h-8 rounded-full object-cover block"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  );
};
