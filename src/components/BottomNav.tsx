import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'feed', label: 'Feed', icon: 'hub' },
    { id: 'post', label: 'Post', icon: 'add_circle' },
    { id: 'details', label: 'Details', icon: 'grid_view' },
    { id: 'mentors', label: 'Mentors', icon: 'school' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-white/90 backdrop-blur-xl border-t border-[#e3dfff]/60 shadow-[0_-4px_24px_rgba(30,27,75,0.06)]">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 gap-0.5 transition-all active:scale-95 ${
                isActive
                  ? 'text-[#3525cd] font-semibold'
                  : 'text-[#464555] hover:text-[#3525cd]'
              }`}
            >
              <div
                className={`relative px-4 py-0.5 rounded-full transition-all flex items-center justify-center ${
                  isActive ? 'bg-[#3525cd]/10 text-[#3525cd]' : 'bg-transparent text-[#777587]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                <span
                  className={`absolute -bottom-1 w-1 h-1 rounded-full bg-[#3525cd] transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
              <span className="text-[10px] tracking-wide font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
