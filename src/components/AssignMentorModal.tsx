import React, { useState, useMemo } from 'react';
import { Mentor } from '../types';
import { MentorStatusDot } from './MentorStatusDot';

interface AssignMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMentor?: { name: string; lab: string };
  mentors: Mentor[];
  onSelectMentor: (mentor: { name: string; lab: string } | undefined) => void;
  projectTitle: string;
}

export const AssignMentorModal: React.FC<AssignMentorModalProps> = ({
  isOpen,
  onClose,
  currentMentor,
  mentors,
  onSelectMentor,
  projectTitle
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMentors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return mentors;
    return mentors.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.lab.toLowerCase().includes(q) ||
        m.domains.some((d) => d.toLowerCase().includes(q)) ||
        (m.status && m.status.toLowerCase().includes(q))
    );
  }, [mentors, searchQuery]);

  if (!isOpen) return null;

  const handleSelectStillNoOne = () => {
    onSelectMentor(undefined);
    onClose();
  };

  const handleSelectMentor = (mentor: Mentor) => {
    onSelectMentor({ name: mentor.name, lab: mentor.lab });
    onClose();
  };

  const isCurrentStillNoOne = !currentMentor;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-mentor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0720]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-[#e3dfff] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#efebff] flex items-start justify-between bg-gradient-to-r from-white via-[#fbf9ff] to-[#f5f1ff]">
          <div className="flex flex-col gap-1 pr-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#eaddff] flex items-center justify-center text-[#712ae2]">
                <span className="material-symbols-outlined text-[18px]">school</span>
              </div>
              <h2 id="assign-mentor-title" className="text-[17px] font-bold text-[#181445]">
                Select Faculty Sponsor or Advisor
              </h2>
            </div>
            <p className="text-[12px] text-[#464555] line-clamp-1">
              For: <span className="font-semibold text-[#181445]">{projectTitle}</span>
            </p>
          </div>
          <button
            type="button"
            id="close-assign-mentor-modal-btn"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777587] hover:bg-[#f6f2ff] hover:text-[#181445] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#efebff] bg-[#faf8ff]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#712ae2]">
              search
            </span>
            <input
              type="text"
              id="mentor-search-in-modal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by advisor name, lab, department, or domain..."
              className="w-full h-10 pl-9 pr-9 rounded-xl bg-white text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/25 shadow-xs"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777587] hover:text-[#181445]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Mentors List with "Still No One" option */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
          {/* Option: Still No One / Self-Directed */}
          <div
            onClick={handleSelectStillNoOne}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
              isCurrentStillNoOne
                ? 'bg-[#f6f2ff] border-[#712ae2] shadow-sm'
                : 'bg-white hover:bg-[#faf8ff] border-[#e3dfff]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0ecfc] flex items-center justify-center text-[#712ae2] flex-shrink-0 border border-[#e3dfff]">
                <span className="material-symbols-outlined text-[20px]">person_off</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#181445]">
                    Still No One (Self-Directed)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[9.5px] font-bold">
                    Student-Led
                  </span>
                </div>
                <p className="text-[11px] text-[#464555] mt-0.5">
                  Launch without a faculty sponsor. You or collaborators can assign or invite an advisor anytime later.
                </p>
              </div>
            </div>

            <div className="flex items-center self-center flex-shrink-0">
              {isCurrentStillNoOne ? (
                <span className="px-2.5 py-1 rounded-full bg-[#712ae2] text-white text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Current
                </span>
              ) : (
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg border border-[#e3dfff] bg-white text-[#3525cd] hover:bg-[#3525cd] hover:text-white text-[11px] font-bold transition-all shadow-xs"
                >
                  Select
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 my-1">
            <div className="h-px bg-[#efebff] flex-1" />
            <span className="text-[10px] uppercase font-bold text-[#777587] tracking-wider">
              Available Faculty & Lab Sponsors ({filteredMentors.length})
            </span>
            <div className="h-px bg-[#efebff] flex-1" />
          </div>

          {filteredMentors.length === 0 ? (
            <div className="p-6 text-center text-[#777587] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-[#712ae2]">
                person_search
              </span>
              <p className="text-[13px] font-semibold text-[#181445]">
                No advisors match "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[12px] text-[#3525cd] font-bold underline"
              >
                Clear search query
              </button>
            </div>
          ) : (
            filteredMentors.map((mentor) => {
              const isSelected =
                currentMentor &&
                currentMentor.name === mentor.name &&
                currentMentor.lab === mentor.lab;

              return (
                <div
                  key={mentor.id}
                  onClick={() => handleSelectMentor(mentor)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#f6f2ff] border-[#3525cd] shadow-sm'
                      : 'bg-white hover:bg-[#faf8ff] border-[#e3dfff]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#e3dfff]"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <MentorStatusDot
                          status={mentor.status}
                          isOnline={mentor.isOnline}
                          size="sm"
                          tooltipPosition="top"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[13px] font-bold text-[#181445] truncate">
                          {mentor.name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded-md bg-[#eaddff] text-[#25005a] text-[9.5px] font-semibold">
                          {mentor.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#464555] truncate font-medium">
                        {mentor.lab} • {mentor.department}
                      </span>
                      <div className="flex items-center gap-1 mt-1 flex-wrap">
                        {mentor.domains.slice(0, 2).map((d) => (
                          <span
                            key={d}
                            className="px-1.5 py-0.2 rounded bg-[#f6f2ff] text-[#3525cd] text-[9.5px] border border-[#e3dfff]/60"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center flex-shrink-0">
                    {isSelected ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#3525cd] text-white text-[11px] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        Assigned
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="px-3 py-1 rounded-lg border border-[#e3dfff] bg-white text-[#3525cd] hover:bg-[#3525cd] hover:text-white text-[11px] font-bold transition-all shadow-xs"
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#faf8ff] border-t border-[#efebff] flex items-center justify-between text-[11px] text-[#777587]">
          <span>💡 You can update this project's advisor anytime.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-[#efebff] hover:bg-[#e2dfff] text-[#181445] font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
