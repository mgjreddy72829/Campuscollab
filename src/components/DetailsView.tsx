import React, { useState, useRef } from 'react';
import { Project, Mentor } from '../types';
import { Card3D } from './Card3D';
import { MentorStatusDot } from './MentorStatusDot';
import { AssignMentorModal } from './AssignMentorModal';

interface DetailsViewProps {
  project: Project;
  mentors?: Mentor[];
  onBackToFeed: () => void;
  onToggleBookmark: (projectId: string) => void;
  onShowToast?: (message: string) => void;
  onUpdateMentor?: (projectId: string, mentor: { name: string; lab: string } | undefined) => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({
  project,
  mentors = [],
  onBackToFeed,
  onToggleBookmark,
  onShowToast,
  onUpdateMentor
}) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [pitchText, setPitchText] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isAssignMentorModalOpen, setIsAssignMentorModalOpen] = useState(false);

  const matchedMentor = mentors.find(
    (m) =>
      project.mentor &&
      (m.name.toLowerCase() === project.mentor.name.toLowerCase() ||
        project.mentor.name.toLowerCase().includes(m.name.toLowerCase()))
  );

  const handleUpdateProjectMentor = (newMentor: { name: string; lab: string } | undefined) => {
    onUpdateMentor?.(project.id, newMentor);
  };

  const formRef = useRef<HTMLFormElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleRoleAutofill = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    if (selectRef.current) {
      selectRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      selectRef.current.focus();
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsApplying(true);

    setTimeout(() => {
      setIsApplying(false);
      setApplicationSubmitted(true);
      setPitchText('');
      setPortfolioLink('');
    }, 800);
  };

  const handleShare = async () => {
    let shareUrl = window.location.href;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('project', project.id);
      shareUrl = url.toString();
    } catch {
      shareUrl = `${window.location.origin}/?project=${project.id}`;
    }

    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch {
        success = false;
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopiedToast(true);
      if (onShowToast) {
        onShowToast(`Shareable link for "${project.title}" copied to clipboard!`);
      }
      setTimeout(() => setCopiedToast(false), 2400);
    } else {
      window.prompt('Copy shareable project link:', shareUrl);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 pb-28 pt-2 gap-4">
      {/* Back to Feed Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToFeed}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e3dfff] text-[#3525cd] text-[12px] font-semibold shadow-xs hover:bg-[#3525cd]/5 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="share-project-top-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e3dfff] text-[#3525cd] hover:bg-[#3525cd]/5 text-[12px] font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
            title="Copy shareable project link"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copiedToast ? 'check' : 'share'}
            </span>
            <span>{copiedToast ? 'Copied' : 'Share'}</span>
          </button>
          <span className="text-[11px] text-[#777587] font-medium hidden sm:inline">
            Venture ID: #{project.id.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Subtle Ambient Glow */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-80 h-44 bg-gradient-to-tr from-[#3525cd]/15 via-[#712ae2]/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero & Metadata Header Card with 3D Depth */}
      <Card3D maxAngle={5} className="w-full">
        <section className="relative w-full rounded-2xl bg-white/95 backdrop-blur-xl border border-[#e3dfff] shadow-md overflow-hidden p-4 flex flex-col gap-3.5">
          {/* Top Pill Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaddff] text-[#25005a]">
              <span className="w-2 h-2 rounded-full bg-[#712ae2] animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase">
                Active Recruitment • {project.teamTotal - project.teamCurrent} Slots Open
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e1e0ff] text-[#07006c] text-[10px] font-bold">
              <span className="material-symbols-outlined text-[14px]">psychology</span>
              {project.category}
            </span>
          </div>

          {/* Title & Creator Line */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] sm:text-[28px] text-[#181445] leading-tight font-extrabold tracking-tight">
              {project.title}
            </h1>
            <p className="text-[12px] text-[#464555] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#3525cd]">
                verified_user
              </span>
              Created by{' '}
              <span className="text-[13px] text-[#181445] font-bold">
                {project.authorDetails}
              </span>
            </p>
          </div>

          {/* Project Visual Showcase */}
          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-[#e9e5ff] shadow-sm border border-[#e3dfff]/80 group">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a5b]/80 via-transparent to-transparent flex items-end p-3">
              {project.mentor ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#181445] text-[11px] shadow-sm border border-white/60">
                  <span className="material-symbols-outlined text-[15px] text-[#712ae2]">
                    school
                  </span>
                  <span>
                    Mentored by <span className="font-bold">{project.mentor.name}</span> ({project.mentor.lab})
                  </span>
                  <button
                    type="button"
                    id="details-change-advisor-pill-btn"
                    onClick={() => setIsAssignMentorModalOpen(true)}
                    className="ml-1 px-2 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] hover:bg-[#3525cd] hover:text-white font-bold text-[10px] transition-all cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#181445] text-[11px] shadow-md border border-amber-200">
                  <span className="material-symbols-outlined text-[15px] text-amber-600">
                    person_off
                  </span>
                  <span className="font-medium text-[#464555]">No Sponsor Yet (Self-Directed)</span>
                  <button
                    type="button"
                    id="details-assign-advisor-pill-btn"
                    onClick={() => setIsAssignMentorModalOpen(true)}
                    className="ml-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#3525cd] to-[#712ae2] text-white font-bold text-[10px] shadow-xs hover:opacity-90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[12px]">add</span>
                    Assign Advisor
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </Card3D>

      {/* Deep-Dive Overview & Milestone Roadmap */}
      <section className="flex flex-col gap-3.5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#e3dfff] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#e2dfff] flex items-center justify-center text-[#3525cd]">
              <span className="material-symbols-outlined text-[18px]">biotech</span>
            </div>
            <h2 className="text-[17px] font-bold text-[#181445]">Mission Overview</h2>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] font-bold">
            {project.currentStage}
          </span>
        </div>

        <p className="text-[13px] text-[#464555] leading-relaxed">
          {project.fullMission}
        </p>

        {/* Milestone Roadmap */}
        <div className="flex flex-col gap-2 pt-1 border-t border-[#efebff]">
          <span className="text-[10px] uppercase tracking-wider text-[#777587] font-bold mt-1">
            Milestone Roadmap
          </span>
          <div className="grid grid-cols-1 gap-2">
            {project.milestones.map((milestone, idx) => {
              if (milestone.status === 'done') {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f6f2ff] border border-[#e3dfff]/60 shadow-xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#3525cd] flex items-center justify-center text-white flex-shrink-0">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[12px] text-[#181445] font-semibold truncate">
                        {milestone.stage}: {milestone.title}
                      </span>
                      <span className="text-[11px] text-[#777587] truncate">
                        {milestone.subtitle}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#0f0069] text-[10px] font-bold">
                      Done
                    </span>
                  </div>
                );
              }

              if (milestone.status === 'active') {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#e3dfff]/70 border border-[#712ae2]/30 shadow-xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#712ae2] flex items-center justify-center text-white flex-shrink-0">
                      <span className="material-symbols-outlined text-[14px] animate-spin">
                        progress_activity
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[12px] text-[#181445] font-bold truncate">
                        {milestone.stage}: {milestone.title}
                      </span>
                      <span className="text-[11px] text-[#712ae2] font-semibold truncate">
                        {milestone.subtitle}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[10px] font-bold animate-pulse">
                      Active
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f6f2ff] border border-[#e3dfff]/40 opacity-75"
                >
                  <div className="w-6 h-6 rounded-full bg-[#e9e5ff] flex items-center justify-center text-[#777587] flex-shrink-0">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[12px] text-[#181445] font-medium truncate">
                      {milestone.stage}: {milestone.title}
                    </span>
                    <span className="text-[11px] text-[#777587] truncate">
                      {milestone.subtitle}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#e9e5ff] text-[#464555] text-[10px]">
                    Upcoming
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Roster & Open Skill Slots */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#712ae2]">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </div>
            <h2 className="text-[17px] font-bold text-[#181445]">Team Roster</h2>
          </div>
          <span className="text-[12px] text-[#464555]">
            {project.teamCurrent} Filled • {project.teamTotal - project.teamCurrent} Open
          </span>
        </div>

        {/* Active Teammates */}
        <div className="grid grid-cols-1 gap-2.5">
          {project.teamRoster.map((member, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#e3dfff] shadow-xs"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border border-[#e3dfff]"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] text-[#181445] font-bold truncate">
                    {member.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] text-[10px] font-bold">
                    {member.role}
                  </span>
                </div>
                <span className="text-[11px] text-[#464555] truncate">
                  {member.department}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#f6f2ff] flex items-center justify-center text-[#464555]">
                <span className="material-symbols-outlined text-[18px]">{member.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Open Skill Slots (Highlighted Callouts) */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#712ae2] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">person_add</span>
              Needed Roles (Join Us)
            </span>
            <span className="text-[11px] text-[#777587]">Tap role to autofill</span>
          </div>

          {project.neededRoles.map((role, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleRoleAutofill(role.title)}
              className="w-full text-left p-3.5 rounded-2xl bg-white border border-[#e3dfff] shadow-sm hover:border-[#712ae2]/50 hover:shadow-md transition-all active:scale-[0.99] flex flex-col gap-2 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-[#712ae2]/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712ae2]" />
                  <span className="text-[15px] font-bold text-[#181445] group-hover:text-[#3525cd] transition-colors">
                    {role.title}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-bold">
                  Apply Slot
                </span>
              </div>
              <p className="text-[12px] text-[#464555] leading-relaxed">
                {role.description}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-[#f6f2ff] text-[10px] font-semibold text-[#464555] border border-[#e3dfff]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Faculty Sponsor & Lab Advisory Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#712ae2]">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </div>
            <h2 className="text-[17px] font-bold text-[#181445]">Faculty Sponsor & Lab Advisory</h2>
          </div>
          <button
            type="button"
            id="details-manage-advisor-btn"
            onClick={() => setIsAssignMentorModalOpen(true)}
            className="text-[12px] text-[#3525cd] font-bold hover:text-[#712ae2] flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">edit</span>
            {project.mentor ? 'Change Sponsor' : 'Assign Sponsor'}
          </button>
        </div>

        {project.mentor ? (
          <div className="p-4 rounded-2xl bg-white border border-[#e3dfff] shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                {matchedMentor ? (
                  <>
                    <img
                      src={matchedMentor.avatar}
                      alt={matchedMentor.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#e3dfff]"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <MentorStatusDot
                        status={matchedMentor.status}
                        isOnline={matchedMentor.isOnline}
                        size="sm"
                        tooltipPosition="top"
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#f0ecfc] flex items-center justify-center text-[#712ae2] border border-[#e3dfff]">
                    <span className="material-symbols-outlined text-[24px]">school</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[14px] font-bold text-[#181445] truncate">
                    {project.mentor.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[10px] font-bold">
                    Faculty Sponsor
                  </span>
                </div>
                <span className="text-[12px] text-[#464555] font-medium truncate">
                  {project.mentor.lab}
                </span>
                {matchedMentor && (
                  <span className="text-[11px] text-[#777587] truncate">
                    {matchedMentor.department} • Availability: {matchedMentor.availability}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
              <button
                type="button"
                id="details-change-mentor-btn"
                onClick={() => setIsAssignMentorModalOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-[#e3dfff] bg-white hover:bg-[#f6f2ff] text-[#3525cd] text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                id="details-remove-mentor-btn"
                onClick={() => handleUpdateProjectMentor(undefined)}
                className="px-3 py-1.5 rounded-xl border border-transparent text-[#777587] hover:text-red-600 hover:bg-red-50 text-[11px] font-semibold transition-all cursor-pointer"
              >
                Set Self-Directed
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#faf8ff] to-[#f4efff] border border-[#e3dfff] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#eaddff] flex items-center justify-center text-[#712ae2] flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">person_off</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-[#181445]">
                    Self-Directed Venture
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f0ecfc] text-[#712ae2] text-[10px] font-bold border border-[#e3dfff]">
                    No Sponsor Yet
                  </span>
                </div>
                <p className="text-[11px] text-[#464555] mt-0.5">
                  This venture was published as student-run and independent. You can select and attach a faculty advisor or lab sponsor anytime.
                </p>
              </div>
            </div>

            <button
              type="button"
              id="details-assign-mentor-action-btn"
              onClick={() => setIsAssignMentorModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#3525cd] to-[#712ae2] text-white text-[12px] font-bold shadow-md shadow-[#3525cd]/20 hover:opacity-95 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">school</span>
              Select Faculty Advisor
            </button>
          </div>
        )}
      </section>

      {/* Interactive Application Panel */}
      <section className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-[#e3dfff] shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#e2dfff] flex items-center justify-center text-[#3525cd]">
            <span className="material-symbols-outlined text-[18px]">send</span>
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-[#181445]">Pitch Your Contribution</h2>
            <p className="text-[11px] text-[#464555]">
              Direct ping to {project.author} {project.mentor ? `and ${project.mentor.name}` : '(Project Lead)'}
            </p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleApplySubmit} className="flex flex-col gap-3">
          {/* Role Selector */}
          <div className="flex flex-col gap-1">
            <label htmlFor="slotRole" className="text-[12px] text-[#181445] font-semibold">
              Select Position
            </label>
            <div className="relative">
              <select
                id="slotRole"
                ref={selectRef}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
                className="w-full h-11 px-3 pr-9 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] appearance-none focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
              >
                <option value="" disabled>
                  Select slot to apply for...
                </option>
                {project.neededRoles.map((role) => (
                  <option key={role.title} value={role.title}>
                    {role.title}
                  </option>
                ))}
                <option value="General Collaborator">General Collaborator / Cross-Functional</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-[#777587] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Pitch Input */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="pitchText" className="text-[12px] text-[#181445] font-semibold">
                Your Quick Pitch
              </label>
              <span className="text-[10px] text-[#777587]">Max 250 words</span>
            </div>
            <textarea
              id="pitchText"
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              required
              rows={3}
              placeholder={`Briefly tell ${project.author} why you'd be a great teammate, relevant coursework, or recent lab projects...`}
              className="w-full p-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 resize-none placeholder:text-[#777587]/60"
            />
          </div>

          {/* Quick Portfolio Link */}
          <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-[#f6f2ff] border border-[#e3dfff]">
            <span className="material-symbols-outlined text-[18px] text-[#3525cd]">link</span>
            <input
              type="text"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              placeholder="GitHub repo, CAD portfolio, or LinkedIn URL"
              className="w-full bg-transparent text-[12px] text-[#181445] placeholder:text-[#777587] focus:outline-none"
            />
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isApplying}
            className="w-full h-12 mt-1 rounded-xl bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] text-white text-[14px] font-bold shadow-md shadow-[#3525cd]/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer disabled:opacity-80"
          >
            {isApplying ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Sending Application...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                <span>Express Interest & Join Team</span>
              </>
            )}
          </button>

          {/* Feedback Banner */}
          {applicationSubmitted && (
            <div className="p-3 rounded-xl bg-[#eaddff] text-[#25005a] flex items-center gap-2 text-[12px] font-semibold animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-[18px] text-[#712ae2]">
                check_circle
              </span>
              <span>Interest received! {project.author} has been notified via campus Slack.</span>
            </div>
          )}
        </form>

        {/* Sub-Action Buttons: Share & Bookmark */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            id="share-project-btn"
            onClick={handleShare}
            className={`h-10 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 border transition-all active:scale-95 cursor-pointer ${
              copiedToast
                ? 'bg-[#3525cd] text-white border-[#3525cd] shadow-xs'
                : 'bg-[#f6f2ff] hover:bg-[#efebff] text-[#181445] border-[#e3dfff]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                copiedToast ? 'text-white' : 'text-[#3525cd]'
              }`}
            >
              {copiedToast ? 'check' : 'share'}
            </span>
            <span>{copiedToast ? 'Link Copied!' : 'Share Project'}</span>
          </button>
          <button
            type="button"
            id="bookmark-project-btn"
            onClick={() => onToggleBookmark(project.id)}
            className="h-10 rounded-xl bg-[#f6f2ff] hover:bg-[#efebff] text-[#181445] text-[12px] font-semibold flex items-center justify-center gap-1.5 border border-[#e3dfff] transition-colors active:scale-95 cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[18px] text-[#712ae2] ${
                project.isBookmarked ? 'fill-1' : ''
              }`}
            >
              {project.isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{project.isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>
        </div>
      </section>

      {/* Copy Toast */}
      {copiedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#181445] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-[12px] font-semibold animate-in fade-in slide-in-from-bottom duration-200 border border-[#3525cd]/40 pointer-events-none"
        >
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">
            check_circle
          </span>
          <span>Project link copied to clipboard!</span>
        </div>
      )}

      {/* Reusable Mentor Assignment & Search Modal */}
      <AssignMentorModal
        isOpen={isAssignMentorModalOpen}
        onClose={() => setIsAssignMentorModalOpen(false)}
        mentors={mentors}
        currentMentorName={project.mentor?.name}
        onSelectMentor={(mentor) => {
          handleUpdateProjectMentor(mentor);
          if (mentor) {
            onShowToast?.(`Assigned ${mentor.name} as Faculty Advisor`);
          } else {
            onShowToast?.('Venture updated to Self-Directed');
          }
        }}
      />
    </div>
  );
};
