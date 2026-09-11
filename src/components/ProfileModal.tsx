import React from 'react';
import { Project, Mentor } from '../types';
import { USER_PROFILE_PIC } from '../data/mockData';
import { MentorStatusDot } from './MentorStatusDot';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: Project[];
  savedMentors: Mentor[];
  onSelectProject: (id: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  savedProjects,
  savedMentors,
  onSelectProject
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#181445]/50 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border border-[#e3dfff] flex flex-col max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#efebff]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#3525cd]">
            Student Innovator Pass
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f2ff] hover:bg-[#efebff] flex items-center justify-center text-[#464555] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3.5 my-3.5 p-3 rounded-xl bg-[#f6f2ff] border border-[#e3dfff]">
          <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#3525cd] via-[#712ae2] to-[#c3c0ff] flex-shrink-0 shadow-sm">
            <img
              src={USER_PROFILE_PIC}
              alt="Gowtham Reddy"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[16px] font-bold text-[#181445] truncate">Gowtham Reddy</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] text-[10px] font-bold">
                Student
              </span>
            </div>
            <p className="text-[12px] text-[#464555]">Senior, Computer Science • AI & Robotics</p>
            <p className="text-[11px] text-[#777587]">Marwadi University • Est. 1887</p>
          </div>
        </div>

        {/* Saved Projects */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#181445]">
              Saved Projects ({savedProjects.length})
            </span>
          </div>

          {savedProjects.length === 0 ? (
            <div className="p-3 text-center text-[12px] text-[#777587] rounded-xl bg-[#fcf8ff] border border-dashed border-[#e3dfff]">
              No saved projects yet. Tap the bookmark icon on any card to save it!
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {savedProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p.id);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#f6f2ff] hover:bg-[#efebff] text-left border border-[#e3dfff]/60 transition-colors"
                >
                  <span className="text-[12px] font-semibold text-[#181445] truncate pr-2">
                    {p.title}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#3525cd] flex-shrink-0">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Saved Mentors */}
        <div className="flex flex-col gap-2 mt-3">
          <span className="text-[12px] font-bold text-[#181445]">
            Saved Mentors ({savedMentors.length})
          </span>

          {savedMentors.length === 0 ? (
            <div className="p-3 text-center text-[12px] text-[#777587] rounded-xl bg-[#fcf8ff] border border-dashed border-[#e3dfff]">
              No saved advisors yet. Bookmark faculty or alumni on the Mentors tab!
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {savedMentors.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-[#f6f2ff] border border-[#e3dfff]/60"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <MentorStatusDot
                        status={m.status}
                        isOnline={m.isOnline}
                        size="sm"
                        tooltipPosition="top"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[12px] font-semibold text-[#181445] truncate">
                      {m.name}
                    </span>
                    <span className="text-[10px] text-[#777587] truncate">{m.lab}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-bold">
                    {m.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full h-10 rounded-xl bg-[#3525cd] text-white text-[13px] font-bold shadow-xs hover:bg-[#4f46e5] transition-colors"
        >
          Close Passport
        </button>
      </div>
    </div>
  );
};
