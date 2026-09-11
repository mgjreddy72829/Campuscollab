import React, { useState, useMemo } from 'react';
import { Project, Mentor } from '../types';
import { Card3D } from './Card3D';
import { MentorStatusDot } from './MentorStatusDot';

interface PostIdeaViewProps {
  mentors: Mentor[];
  onAddProject: (newProject: Project) => void;
  onCancel: () => void;
}

export const PostIdeaView: React.FC<PostIdeaViewProps> = ({
  mentors,
  onAddProject,
  onCancel
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI & ML');
  const [description, setDescription] = useState('');
  const [fullMission, setFullMission] = useState('');
  const [neededSkills, setNeededSkills] = useState<string[]>(['PyTorch', 'System Architecture']);
  const [skillInput, setSkillInput] = useState('');
  const [teamTotal, setTeamTotal] = useState(4);
  const [selectedMentorId, setSelectedMentorId] = useState<string>('none');
  const [mentorSearchQuery, setMentorSearchQuery] = useState('');
  const [isMentorDropdownOpen, setIsMentorDropdownOpen] = useState(false);
  const [roleTitle1, setRoleTitle1] = useState('Machine Learning Lead');
  const [roleDesc1, setRoleDesc1] = useState('Implement transformer attention models for low-power edge compute.');

  const [isPublishing, setIsPublishing] = useState(false);

  const filteredMentors = useMemo(() => {
    const q = mentorSearchQuery.toLowerCase().trim();
    if (!q) return mentors;
    return mentors.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.lab.toLowerCase().includes(q) ||
        m.domains.some((d) => d.toLowerCase().includes(q)) ||
        (m.status && m.status.toLowerCase().includes(q))
    );
  }, [mentors, mentorSearchQuery]);

  const chosenMentor = mentors.find((m) => m.id === selectedMentorId);

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (skillInput.trim() && !neededSkills.includes(skillInput.trim())) {
      setNeededSkills([...neededSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setNeededSkills(neededSkills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsPublishing(true);

    const newProject: Project = {
      id: `venture-${Date.now()}`,
      title: title.trim(),
      category,
      categoryType: 'ai',
      description: description.trim(),
      fullMission:
        fullMission.trim() ||
        `${description.trim()} Designed to solve collegiate and global technical bottlenecks through applied campus research.`,
      lookingFor: neededSkills.length > 0 ? neededSkills : ['Full Stack', 'Prototyper'],
      teamCurrent: 1,
      teamTotal: teamTotal,
      author: 'Gowtham R.',
      authorYear: 'Senior, AI',
      authorDetails: 'Gowtham Reddy (Senior, AI)',
      authorAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBhnhSiPxEB232w2YEKHlZaFwpgtPDyCParjUi9-gBFBMVKcYf2o3YJYvfx0zCI1u5LjYlLAOXvGvXDTHcdwKESh78SUDqUHfka60TMjAI6nQfh6KTwDgQD37B5LKm_Fy91x251rXETW-LZtC3QQw6962R4_zrYK_2etCWbimAAksucQJ3RscwUxteqLMYCgPOyQcZMID4TfCHDPqqhOJHWxXDIqFlU-j4WPSrsSBVrENZpBHyP_jVL',
      timeAgo: 'Just now',
      thumbnail:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9mgz-oMCqbzcQgkdCdcKZpyBdbbOOauk85nFndBfev9nWKVX3FIpWA8UnQlm4zgEKMWDkodjivJBIGAzKqLecjrFskBGlDgMuPCfm_dLYySZRkg2JdsGkmz_RNSw1w7JPTCkzGaBoNxG3xFqWAbM8X6E4r30TKD61dZXTI5bVZm6PdoeDGuVPA1VCXx6NtHJeaedoWsT-SQQ310mzRGkMSIZ7RdlWbVj0wsWNoLbXZDn1_YZHZVBt',
      heroImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDwF6dMBbUUvvSCyV_3gc11ixim__mAVbtJji_z_hiuh1HIzB0BmzVp5_LlUISHRpIYxK_xOP-pYNQFYEPlU__suzmrK5EC0nSSqjPO7u5iU29Hk1A3jsRZW8C_QUsniUM5_o0VYiNGm17y3F5RkDnM87FDLmiQi-W9A2z_9hVJND5ZXGirclXw7x-dfKbt-MwgstzfVshgKLFrfnYZZJ5yBKDq3pzxeZBLpnrfvL4rGLU9Dg2K1_2s',
      mentor: chosenMentor
        ? {
            name: chosenMentor.name,
            lab: chosenMentor.lab
          }
        : undefined,
      currentStage: 'Stage 1 / 3',
      milestones: [
        {
          stage: 'Phase 1',
          title: 'Problem Framing & MVP Architecture',
          subtitle: 'Core tech stack benchmark and architecture review',
          status: 'active'
        },
        {
          stage: 'Phase 2',
          title: 'Prototype Fabrication / Model Training',
          subtitle: 'Campus testing alpha deployment',
          status: 'upcoming'
        },
        {
          stage: 'Phase 3',
          title: 'Campus Demo Day & Venture Showcase',
          subtitle: 'Seed funding pitch and angel advisor panel',
          status: 'upcoming'
        }
      ],
      teamRoster: [
        {
          name: 'Gowtham Reddy',
          role: 'Founder & Lead',
          department: 'Computer Science • AI & Systems',
          avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBhnhSiPxEB232w2YEKHlZaFwpgtPDyCParjUi9-gBFBMVKcYf2o3YJYvfx0zCI1u5LjYlLAOXvGvXDTHcdwKESh78SUDqUHfka60TMjAI6nQfh6KTwDgQD37B5LKm_Fy91x251rXETW-LZtC3QQw6962R4_zrYK_2etCWbimAAksucQJ3RscwUxteqLMYCgPOyQcZMID4TfCHDPqqhOJHWxXDIqFlU-j4WPSrsSBVrENZpBHyP_jVL',
          icon: 'psychology'
        }
      ],
      neededRoles: [
        {
          title: roleTitle1 || 'Co-Founder & Tech Lead',
          description: roleDesc1 || 'Drive rapid prototyping and product validation.',
          tags: neededSkills.slice(0, 3)
        }
      ],
      isBookmarked: false
    };

    setTimeout(() => {
      setIsPublishing(false);
      onAddProject(newProject);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 pb-28 pt-2">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e3dfff] text-[#3525cd] text-[12px] font-semibold shadow-xs hover:bg-[#3525cd]/5 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Cancel</span>
        </button>
        <span className="text-[11px] text-[#712ae2] font-bold uppercase tracking-wider bg-[#eaddff] px-2.5 py-0.5 rounded-full">
          Incubator Studio
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#e3dfff] p-4 shadow-sm mb-4">
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-[#3525cd]/10 blur-2xl pointer-events-none" />
        <h2 className="text-[20px] font-bold text-[#181445]">Publish New Campus Idea</h2>
        <p className="text-[12px] text-[#464555] mt-0.5">
          Form your dream student engineering squad and request faculty advisory sponsorship.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title & Domain */}
        <div className="p-4 rounded-2xl bg-white border border-[#e3dfff] shadow-xs flex flex-col gap-3">
          <div>
            <label className="text-[12px] font-bold text-[#181445] block mb-1">
              Project / Venture Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AeroOptic: Lidar-Guided Autonomous Crop Sorter"
              className="w-full h-11 px-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-bold text-[#181445] block mb-1">
                Domain / Track
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
              >
                <option>AI & ML</option>
                <option>IoT & Robotics</option>
                <option>Web3 & Security</option>
                <option>BioTech & AI</option>
                <option>Mobile & Cloud</option>
                <option>CleanTech & Hardware</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] font-bold text-[#181445] block mb-1">
                Target Team Size
              </label>
              <select
                value={teamTotal}
                onChange={(e) => setTeamTotal(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
              >
                <option value={2}>2 Members (1 Needed)</option>
                <option value={3}>3 Members (2 Needed)</option>
                <option value={4}>4 Members (3 Needed)</option>
                <option value={5}>5 Members (4 Needed)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pitch & Mission */}
        <div className="p-4 rounded-2xl bg-white border border-[#e3dfff] shadow-xs flex flex-col gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] font-bold text-[#181445]">
                Feed Teaser (1-2 sentences) *
              </label>
              <span className="text-[10px] text-[#777587]">Shows on Feed Card</span>
            </div>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A concise summary of what you are engineering and the breakthrough you are targeting..."
              className="w-full p-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 resize-none"
            />
          </div>

          <div>
            <label className="text-[12px] font-bold text-[#181445] block mb-1">
              Detailed Mission Overview
            </label>
            <textarea
              rows={3}
              value={fullMission}
              onChange={(e) => setFullMission(e.target.value)}
              placeholder="Elaborate on the technical architecture, methodology, hardware stack, or campus lab resources involved..."
              className="w-full p-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[13px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 resize-none"
            />
          </div>
        </div>

        {/* Roles & Collaborator Skills */}
        <div className="p-4 rounded-2xl bg-white border border-[#e3dfff] shadow-xs flex flex-col gap-3">
          <label className="text-[12px] font-bold text-[#181445] block">
            Skills & Collaborator Tags
          </label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="e.g. OpenCV, FPGA, React, ROS2 (press Enter)"
              className="flex-1 h-10 px-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[12px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="h-10 px-3 rounded-xl bg-[#3525cd] text-white text-[12px] font-bold shadow-xs active:scale-95 transition-all"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {neededSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f6f2ff] text-[#3525cd] text-[11px] font-bold border border-[#e3dfff]"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}
          </div>

          {/* Primary Open Role */}
          <div className="mt-2 pt-2 border-t border-[#efebff]">
            <span className="text-[11px] font-bold text-[#712ae2] uppercase tracking-wider block mb-2">
              Featured Open Role Slot
            </span>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={roleTitle1}
                onChange={(e) => setRoleTitle1(e.target.value)}
                placeholder="Role Title (e.g. Embedded Firmware Engineer)"
                className="w-full h-10 px-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[12px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
              />
              <input
                type="text"
                value={roleDesc1}
                onChange={(e) => setRoleDesc1(e.target.value)}
                placeholder="Role Scope / Responsibilities"
                className="w-full h-10 px-3 rounded-xl bg-[#f6f2ff] text-[#181445] text-[12px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
              />
            </div>
          </div>
        </div>

        {/* Sponsor Mentor or Still No One with Search Option */}
        <div className="p-4 rounded-2xl bg-white border border-[#e3dfff] shadow-xs flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <label className="text-[13px] font-bold text-[#181445] block">
                Select Lab Sponsor or Faculty Advisor
              </label>
              <p className="text-[11px] text-[#464555] mt-0.5">
                Choose an advising professor or lab sponsor, or select <strong>Still No One</strong> to launch self-directed and assign or invite an advisor later.
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[10px] font-bold flex-shrink-0">
              Optional
            </span>
          </div>

          {/* Quick Selection Status / Summary Card */}
          {chosenMentor ? (
            <div className="p-3 rounded-xl bg-[#f6f2ff] border border-[#3525cd]/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={chosenMentor.avatar}
                    alt={chosenMentor.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#e3dfff]"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <MentorStatusDot
                      status={chosenMentor.status}
                      isOnline={chosenMentor.isOnline}
                      size="sm"
                      tooltipPosition="top"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[13px] font-bold text-[#181445] truncate">
                      {chosenMentor.name}
                    </span>
                    <span className="px-1.5 py-0.2 rounded-md bg-[#eaddff] text-[#25005a] text-[9.5px] font-semibold">
                      {chosenMentor.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#464555] truncate font-medium">
                    {chosenMentor.lab} • {chosenMentor.department}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  id="change-mentor-btn"
                  onClick={() => setIsMentorDropdownOpen(!isMentorDropdownOpen)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#e3dfff] text-[#3525cd] text-[11px] font-bold hover:bg-[#3525cd] hover:text-white transition-colors cursor-pointer shadow-xs"
                >
                  {isMentorDropdownOpen ? 'Close' : 'Change'}
                </button>
                <button
                  type="button"
                  id="clear-mentor-btn"
                  onClick={() => {
                    setSelectedMentorId('none');
                    setIsMentorDropdownOpen(false);
                  }}
                  title="Clear to Still No One"
                  className="p-1 rounded-lg text-[#777587] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e3dfff] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#f0ecfc] flex items-center justify-center text-[#712ae2] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">person_off</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12.5px] font-bold text-[#181445]">
                      Still No One (Self-Directed)
                    </span>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#eaddff] text-[#25005a] text-[9px] font-bold">
                      Can Add Later
                    </span>
                  </div>
                  <span className="text-[11px] text-[#464555] line-clamp-1">
                    No advisor assigned yet. You can select or invite an advisor anytime after posting.
                  </span>
                </div>
              </div>

              <button
                type="button"
                id="search-and-select-mentor-btn"
                onClick={() => setIsMentorDropdownOpen(!isMentorDropdownOpen)}
                className="px-3 py-1.5 rounded-lg bg-[#3525cd] text-white text-[11px] font-bold hover:bg-[#281ca8] transition-all flex-shrink-0 cursor-pointer shadow-xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">search</span>
                {isMentorDropdownOpen ? 'Close Menu' : 'Search Mentors'}
              </button>
            </div>
          )}

          {/* Search Dropdown / Picker with Still No One option */}
          {isMentorDropdownOpen && (
            <div className="mt-1 flex flex-col rounded-xl border border-[#e3dfff] bg-[#fbf9ff] overflow-hidden shadow-md">
              {/* Search input bar */}
              <div className="p-2.5 bg-white border-b border-[#efebff]">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[#712ae2]">
                    search
                  </span>
                  <input
                    type="text"
                    id="post-idea-mentor-search-input"
                    value={mentorSearchQuery}
                    onChange={(e) => setMentorSearchQuery(e.target.value)}
                    placeholder="Search advisor by name, lab, department, or domain..."
                    className="w-full h-9 pl-8 pr-8 rounded-lg bg-[#f6f2ff] text-[#181445] text-[12px] border border-[#e3dfff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
                    autoFocus
                  />
                  {mentorSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMentorSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777587] hover:text-[#181445]"
                    >
                      <span className="material-symbols-outlined text-[15px]">close</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable list of options */}
              <div className="max-h-60 overflow-y-auto p-2 flex flex-col gap-1.5">
                {/* 1. STILL NO ONE OPTION */}
                <button
                  type="button"
                  id="select-still-no-one-option"
                  onClick={() => {
                    setSelectedMentorId('none');
                    setIsMentorDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                    selectedMentorId === 'none'
                      ? 'bg-[#f0ecfc] border-[#712ae2] text-[#181445]'
                      : 'bg-white hover:bg-white/80 border-[#e3dfff]/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#eaddff] flex items-center justify-center text-[#712ae2] flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">person_off</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-bold text-[#181445]">
                          Still No One (Self-Directed)
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full bg-[#eaddff] text-[#25005a] text-[9px] font-bold">
                          Decide Later
                        </span>
                      </div>
                      <span className="text-[10px] text-[#464555] truncate">
                        Post without a faculty sponsor. You can select or invite one afterwards.
                      </span>
                    </div>
                  </div>
                  {selectedMentorId === 'none' && (
                    <span className="material-symbols-outlined text-[#712ae2] text-[18px] flex-shrink-0">
                      check_circle
                    </span>
                  )}
                </button>

                {/* Mentors matched */}
                {filteredMentors.length === 0 ? (
                  <div className="p-4 text-center text-[#777587] text-[11px]">
                    No advisors match "{mentorSearchQuery}". You can select "Still No One" above.
                  </div>
                ) : (
                  filteredMentors.map((mentor) => {
                    const isSelected = selectedMentorId === mentor.id;
                    return (
                      <button
                        type="button"
                        key={mentor.id}
                        onClick={() => {
                          setSelectedMentorId(mentor.id);
                          setIsMentorDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#f0ecfc] border-[#3525cd] text-[#181445]'
                            : 'bg-white hover:bg-white/80 border-[#e3dfff]/70'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative flex-shrink-0">
                            <img
                              src={mentor.avatar}
                              alt={mentor.name}
                              className="w-8 h-8 rounded-full object-cover"
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
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12px] font-bold text-[#181445] truncate">
                                {mentor.name}
                              </span>
                              <span className="px-1.5 py-0.2 rounded bg-[#eaddff] text-[#25005a] text-[9px] font-medium">
                                {mentor.badge}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#464555] truncate">
                              {mentor.lab} • {mentor.department}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[#3525cd] text-[18px] flex-shrink-0">
                            check_circle
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3D Live Feed Preview Card */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#777587] uppercase tracking-wider">
            Live Feed Preview
          </span>
          <Card3D maxAngle={6}>
            <div className="p-4 rounded-2xl bg-white/95 border border-[#e3dfff] shadow-md flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] text-[10px] font-bold">
                  {category}
                </span>
                <span className="text-[10px] font-bold text-[#712ae2] bg-[#eaddff] px-2 py-0.5 rounded-full">
                  1/{teamTotal} members
                </span>
              </div>
              <h3 className="text-[16px] font-bold text-[#181445] truncate">
                {title || 'Your Venture Name Here'}
              </h3>
              <p className="text-[12px] text-[#464555] line-clamp-2">
                {description || 'Your brief teaser will display here with full interactive team invitation controls.'}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#712ae2] font-semibold">
                <span className="material-symbols-outlined text-[15px]">
                  {chosenMentor ? 'school' : 'person_off'}
                </span>
                <span>
                  {chosenMentor
                    ? `Faculty Sponsor: ${chosenMentor.name} (${chosenMentor.lab})`
                    : 'Self-Directed Venture • No Sponsor Yet'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {neededSkills.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-[#f6f2ff] text-[#3525cd] text-[10px] font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Card3D>
        </div>

        {/* Publish Action Button */}
        <button
          type="submit"
          disabled={isPublishing}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] text-white text-[14px] font-bold shadow-lg shadow-[#3525cd]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
        >
          {isPublishing ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span>Publishing to Live Campus Feed...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              <span>Publish Venture & Recruit Co-Founders</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
