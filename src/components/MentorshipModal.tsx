import React, { useState } from 'react';
import { Mentor, Project } from '../types';
import { MentorStatusDot } from './MentorStatusDot';

interface MentorshipModalProps {
  isOpen: boolean;
  mentor: Mentor | null;
  projects: Project[];
  onClose: () => void;
  onSubmit: (mentorName: string, projectTitle: string, pitch: string) => void;
}

export const MentorshipModal: React.FC<MentorshipModalProps> = ({
  isOpen,
  mentor,
  projects,
  onClose,
  onSubmit
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [pitch, setPitch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const chosenProject = projects.find((p) => p.id === selectedProjectId)?.title || 'Venture Initiative';

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(mentor.name, chosenProject, pitch);
      setPitch('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#181445]/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 border border-[#e3dfff]"
        role="dialog"
      >
        {/* Handle for mobile */}
        <div className="w-12 h-1.5 bg-[#e3dfff] rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-start justify-between pb-2 border-b border-[#efebff]">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#3525cd] to-[#712ae2] flex-shrink-0">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5">
                <MentorStatusDot
                  status={mentor.status}
                  isOnline={mentor.isOnline}
                  size="sm"
                  tooltipPosition="right"
                />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#3525cd] uppercase font-bold tracking-wider">
                {mentor.type} Advisor
              </span>
              <h3 className="text-[18px] font-bold text-[#181445] leading-snug">
                {mentor.name}
              </h3>
              <p className="text-[12px] text-[#464555] truncate max-w-[240px]">
                {mentor.department}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f2ff] hover:bg-[#efebff] flex items-center justify-center text-[#464555] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div>
            <label className="text-[12px] text-[#181445] font-semibold block mb-1">
              Your Project or Initiative
            </label>
            <div className="relative">
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full h-11 px-3 pr-9 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] appearance-none focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category})
                  </option>
                ))}
                <option value="custom">Other Independent Capstone / Thesis</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-[#777587] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] text-[#181445] font-semibold">
                Brief Pitch & Guidance Goals
              </label>
              <span className="text-[10px] text-[#777587]">Advisor Review</span>
            </div>
            <textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              required
              rows={3}
              placeholder="Describe your current blocker or milestone, and how this advisor can accelerate your progress..."
              className="w-full p-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 resize-none placeholder:text-[#777587]/60"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-[#eaddff]/40 flex items-center gap-2 text-[11px] text-[#25005a]">
            <span className="material-symbols-outlined text-[16px] text-[#712ae2] flex-shrink-0">
              verified
            </span>
            <span>
              Mentors usually reply within 24-48 hours with open calendar office hours slots.
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] text-white font-semibold text-[14px] shadow-lg shadow-[#3525cd]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Sending Invitation...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  <span>Send Invitation</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-12 rounded-xl bg-[#f6f2ff] hover:bg-[#efebff] text-[#464555] font-semibold text-[13px] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
