import React, { useState, useMemo } from 'react';
import { Mentor } from '../types';
import { Card3D } from './Card3D';
import { MentorStatusDot } from './MentorStatusDot';

interface MentorsViewProps {
  mentors: Mentor[];
  onRequestMentorship: (mentor: Mentor) => void;
  onToggleBookmark: (mentorId: string) => void;
}

export const MentorsView: React.FC<MentorsViewProps> = ({
  mentors,
  onRequestMentorship,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filterDomains = [
    { id: 'all', label: 'All', icon: 'stars' },
    { id: 'machine learning', label: 'Machine Learning' },
    { id: 'circuit analysis', label: 'Circuit Analysis' },
    { id: 'software engineering', label: 'Software Engineering' },
    { id: 'biomedical', label: 'Biomedical' },
    { id: 'product design', label: 'Product Design' }
  ];

  const filteredMentors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return mentors.filter((m) => {
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.lab.toLowerCase().includes(q) ||
        m.domains.some((d) => d.toLowerCase().includes(q));

      if (!matchSearch) return false;

      if (activeFilter === 'all') return true;

      return (
        m.labDomain.toLowerCase().includes(activeFilter) ||
        m.domains.some((d) => d.toLowerCase().includes(activeFilter))
      );
    });
  }, [mentors, searchQuery, activeFilter]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 pb-28 pt-2">
      {/* Interactive Match Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#e3dfff] p-4 shadow-sm">
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-[#eaddff]/50 blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-[#3525cd] text-[18px] fill-1">
                auto_awesome
              </span>
              <span className="text-[10px] font-bold text-[#3525cd] tracking-wider uppercase">
                Smart Advisor Match
              </span>
            </div>
            <h2 className="text-[20px] font-bold text-[#181445] leading-tight">
              Faculty & Alumni Mentors
            </h2>
            <p className="text-[12px] text-[#464555] mt-0.5 leading-relaxed">
              Connect with experienced campus advisors to guide your research and startup projects.
            </p>
          </div>
        </div>

        {/* Quick Metric Pills */}
        <div className="flex items-center gap-2.5 mt-3 pt-2 bg-[#f6f2ff]/80 backdrop-blur-md rounded-xl p-2 px-3 border border-[#e3dfff]/50">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3525cd] animate-pulse" />
            <span className="text-[11px] text-[#181445] font-bold">42 Online Advisors</span>
          </div>
          <span className="text-[#c7c4d8] text-[10px]">•</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#712ae2] text-[14px]">verified</span>
            <span className="text-[11px] text-[#464555] font-medium">
              100% Verified Faculty & Alumni
            </span>
          </div>
        </div>
      </div>

      {/* Search & Domain Filter Toolbar */}
      <div className="mt-3 flex flex-col gap-2.5">
        {/* Search Bar */}
        <div className="relative flex items-center w-full bg-white rounded-xl shadow-[0_8px_20px_rgba(30,27,75,0.04)] border border-[#e3dfff]/80 transition-all focus-within:shadow-[0_12px_24px_rgba(79,70,229,0.12)]">
          <span className="material-symbols-outlined absolute left-3.5 text-[#777587] text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            id="mentor-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name, research lab, or skill..."
            className="w-full h-12 pl-11 pr-10 bg-transparent text-[#181445] text-[13px] placeholder:text-[#464555]/50 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 w-6 h-6 rounded-full bg-[#e9e5ff] flex items-center justify-center text-[#464555] hover:text-[#181445] transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Category Chips (Horizontal Scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          {filterDomains.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`filter-pill whitespace-nowrap px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#3525cd] text-white shadow-sm scale-[1.02]'
                    : 'bg-white text-[#464555] border border-[#e3dfff]/60 hover:bg-[#f6f2ff]'
                }`}
              >
                {chip.icon && (
                  <span className="material-symbols-outlined text-[15px] fill-1">
                    {chip.icon}
                  </span>
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mentors Card List */}
      <div className="mt-3 flex flex-col gap-3.5" id="mentors-container">
        {filteredMentors.map((mentor) => (
          <Card3D key={mentor.id} className="w-full">
            <div className="mentor-card relative rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgba(30,27,75,0.06)] border border-[#e3dfff] overflow-hidden transition-all duration-300">
              {/* Luxury sheen highlight line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3525cd] via-[#712ae2] to-[#c3c0ff]" />

              <div className="flex items-start gap-3">
                {/* Profile Picture & Status Dot with Tooltip */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#3525cd] to-[#712ae2] shadow-sm">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <MentorStatusDot
                      status={mentor.status}
                      isOnline={mentor.isOnline}
                      size="md"
                      tooltipPosition="right"
                    />
                  </div>
                </div>

                {/* Name & Department Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 min-w-0">
                      <h3 className="text-[16px] font-bold text-[#181445] truncate">
                        {mentor.name}
                      </h3>
                      {mentor.year && (
                        <span className="text-[11px] text-[#777587] font-semibold">
                          {mentor.year}
                        </span>
                      )}
                    </div>

                    {/* Status Pill & Verified Badge */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f6f2ff] border border-[#e3dfff] text-[10px] font-semibold text-[#181445]">
                        <MentorStatusDot
                          status={mentor.status}
                          isOnline={mentor.isOnline}
                          size="sm"
                          tooltipPosition="bottom"
                        />
                        <span>{mentor.status || (mentor.isOnline ? 'Online' : 'Busy')}</span>
                      </div>

                      {mentor.type === 'Faculty' ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] flex-shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[13px] text-[#712ae2] fill-1">
                            workspace_premium
                          </span>
                          <span className="text-[10px] font-bold">Faculty</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2d2a5b] text-[#f3eeff] flex-shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[13px] text-[#e1e0ff] fill-1">
                            school
                          </span>
                          <span className="text-[10px] font-bold">Alumni</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-[12px] text-[#464555] font-medium mt-0.5 truncate">
                    {mentor.title}
                  </p>
                  <div className="flex items-center gap-1 text-[#777587] mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-[#3525cd]">
                      {mentor.type === 'Faculty' ? 'biotech' : 'groups'}
                    </span>
                    <span className="text-[11px] truncate">{mentor.lab}</span>
                  </div>
                </div>
              </div>

              {/* Domain Expertise Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {mentor.domains.map((dom) => (
                  <span
                    key={dom}
                    className="px-2.5 py-0.5 rounded-full bg-[#f6f2ff] text-[#3525cd] text-[10px] font-bold border border-[#e3dfff]/60"
                  >
                    {dom}
                  </span>
                ))}
              </div>

              {/* Availability Banner */}
              <div className="mt-2.5 px-3 py-2 rounded-xl bg-[#f6f2ff] flex items-center justify-between border border-[#e3dfff]/50">
                <div className="flex items-center gap-2 min-w-0">
                  <MentorStatusDot
                    status={mentor.status}
                    isOnline={mentor.isOnline}
                    size="sm"
                    tooltipPosition="top"
                  />
                  <span className="text-[11px] text-[#181445] font-medium truncate">
                    {mentor.availability}
                  </span>
                </div>
                <span className="text-[11px] text-[#712ae2] font-bold flex-shrink-0 ml-1">
                  {mentor.availabilityTag}
                </span>
              </div>

              {/* Action Footer */}
              <div className="flex items-center gap-2.5 mt-3 pt-1">
                <button
                  type="button"
                  onClick={() => onRequestMentorship(mentor)}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#3525cd] to-[#712ae2] text-white text-[13px] font-bold shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">send</span>
                  <span>Request Mentorship</span>
                </button>
                <button
                  type="button"
                  aria-label={`Bookmark ${mentor.name}`}
                  onClick={() => onToggleBookmark(mentor.id)}
                  className={`w-11 h-11 rounded-xl bg-[#f6f2ff] border border-[#e3dfff] flex items-center justify-center transition-colors ${
                    mentor.isBookmarked
                      ? 'text-[#3525cd]'
                      : 'text-[#777587] hover:text-[#3525cd]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      mentor.isBookmarked ? 'fill-1' : ''
                    }`}
                  >
                    bookmark
                  </span>
                </button>
              </div>
            </div>
          </Card3D>
        ))}
      </div>

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <div className="my-8 flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-[#e3dfff]">
          <div className="w-14 h-14 rounded-full bg-[#e9e5ff] flex items-center justify-center text-[#3525cd] mb-2 shadow-inner">
            <span className="material-symbols-outlined text-[28px]">person_search</span>
          </div>
          <h4 className="text-[17px] font-bold text-[#181445]">No Mentors Found</h4>
          <p className="text-[12px] text-[#464555] mt-1 max-w-xs leading-relaxed">
            We couldn't find matching advisors for that query. Try exploring other domains or resetting your search filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="mt-3 px-4 py-1.5 rounded-full bg-[#3525cd] text-white text-[12px] font-semibold shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick Info Callout */}
      <div className="mt-4">
        <div className="rounded-2xl bg-white border border-[#e3dfff] p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#3525cd]/10 flex items-center justify-center text-[#3525cd] flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#181445]">
              Need a Cross-Disciplinary Panel?
            </span>
            <span className="text-[11px] text-[#464555] leading-relaxed">
              You can invite up to 2 co-mentors per thesis or startup incubator project.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
