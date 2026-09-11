import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { Card3D } from './Card3D';

interface FeedViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onPostClick: () => void;
  onToggleBookmark: (projectId: string) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  projects,
  onSelectProject,
  onPostClick,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI & ML', 'IoT & Hardware', 'Web3', 'Mobile', 'BioTech'];

  // Filter projects based on search query and category
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return projects.filter((project) => {
      const textMatch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.author.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.lookingFor.some((skill) => skill.toLowerCase().includes(q));

      if (!textMatch) return false;

      if (activeCategory === 'All') return true;
      if (activeCategory === 'IoT & Hardware') {
        return (
          project.category.toLowerCase().includes('iot') ||
          project.category.toLowerCase().includes('robotics') ||
          project.category.toLowerCase().includes('hardware')
        );
      }
      if (activeCategory === 'AI & ML') {
        return (
          project.category.toLowerCase().includes('ai') ||
          project.category.toLowerCase().includes('ml') ||
          project.lookingFor.some((s) => s.toLowerCase().includes('python ml') || s.toLowerCase().includes('vision'))
        );
      }
      if (activeCategory === 'Web3') {
        return (
          project.category.toLowerCase().includes('web3') ||
          project.category.toLowerCase().includes('crypto') ||
          project.title.toLowerCase().includes('decentralized')
        );
      }
      if (activeCategory === 'Mobile') {
        return (
          project.category.toLowerCase().includes('mobile') ||
          project.lookingFor.some((s) => s.toLowerCase().includes('mobile') || s.toLowerCase().includes('flutter'))
        );
      }
      if (activeCategory === 'BioTech') {
        return (
          project.category.toLowerCase().includes('biotech') ||
          project.category.toLowerCase().includes('bio')
        );
      }

      return project.category.toLowerCase().includes(activeCategory.toLowerCase());
    });
  }, [projects, searchQuery, activeCategory]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 pb-28 pt-2">
      {/* Subtle Ambient Top Glow Decorator */}
      <div className="relative w-full overflow-hidden flex flex-col pt-1 pb-1">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#3525cd]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Search Bar & Instant Filter Row */}
        <div className="relative z-10 flex flex-col gap-2.5 w-full">
          {/* Search Input Surface */}
          <div className="relative flex items-center w-full bg-white rounded-xl shadow-[0_8px_20px_rgba(30,27,75,0.04)] border border-[#e3dfff]/80 transition-all focus-within:shadow-[0_12px_24px_rgba(79,70,229,0.12)] focus-within:border-[#4f46e5]/40">
            <span className="material-symbols-outlined text-[#3525cd] ml-3.5 text-[20px] select-none">
              search
            </span>
            <input
              type="text"
              id="project-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, skills, or domains..."
              className="w-full bg-transparent py-3 pl-2.5 pr-10 text-[14px] text-[#181445] placeholder:text-[#464555]/50 focus:outline-none font-normal"
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

          {/* Category Filter Pills (Horizontal Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar -mx-4 px-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-chip flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#4f46e5] to-[#712ae2] text-white shadow-[0_4px_12px_rgba(79,70,229,0.25)] scale-[1.02]'
                      : 'bg-white text-[#464555] shadow-xs border border-[#e3dfff]/60 hover:text-[#3525cd] hover:border-[#3525cd]/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Prominent Action: Post New Idea (3D Gradient Pill Glow) */}
      <div className="mt-3 mb-3">
        <button
          onClick={onPostClick}
          className="group relative w-full overflow-hidden rounded-xl p-[1px] shadow-[0_12px_28px_-6px_rgba(79,70,229,0.35),0_4px_12px_-2px_rgba(113,42,226,0.2)] active:scale-[0.99] transition-transform text-left cursor-pointer"
        >
          {/* Outer Gradient Sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3525cd] via-[#712ae2] to-[#4f46e5] opacity-90 transition-opacity group-hover:opacity-100" />

          {/* Button Content Surface */}
          <div className="relative flex items-center justify-between px-4 py-3.5 rounded-[11px] bg-gradient-to-r from-[#4f46e5] to-[#712ae2] text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-white text-[20px]">add</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[17px] font-bold tracking-tight leading-none text-white">
                  Post New Idea
                </span>
                <span className="text-[11px] font-medium text-white/85 mt-0.5">
                  Recruit co-founders & build together
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <span className="material-symbols-outlined text-[18px] text-white">
                arrow_forward
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Live Feed Header */}
      <div className="flex items-center justify-between mt-1 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#712ae2] animate-pulse" />
          <span className="text-[17px] font-bold text-[#181445]">Campus Ventures</span>
        </div>
        <span className="text-[12px] font-semibold text-[#3525cd] bg-[#3525cd]/10 px-2.5 py-0.5 rounded-full">
          {filteredProjects.length} live briefs
        </span>
      </div>

      {/* Cards Feed Stream */}
      <div className="flex flex-col gap-3.5 w-full" id="project-feed-list">
        {filteredProjects.map((project, index) => {
          // Progress calculation for radial circle
          const percentage = Math.round((project.teamCurrent / project.teamTotal) * 100);
          const strokeDash = `${percentage}, 100`;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.38,
                delay: Math.min(index * 0.06, 0.3),
                ease: [0.22, 1, 0.36, 1]
              }}
              className="w-full"
            >
              <Card3D
                onClick={() => onSelectProject(project.id)}
                className="cursor-pointer"
              >
              <article className="project-card relative flex flex-col rounded-2xl bg-white/95 backdrop-blur-xl p-4 shadow-[0_10px_30px_rgba(30,27,75,0.06),0_2px_8px_rgba(79,70,229,0.04)] border border-[#e3dfff]/80 transition-all hover:border-[#712ae2]/40">
                {/* Visual Accent Header with Image Thumbnail */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-[#efebff] border border-[#e3dfff]/60">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] text-[10px] font-bold shadow-[0_0_12px_rgba(53,37,205,0.15)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd]" />
                        {project.category}
                      </span>
                      <button
                        type="button"
                        aria-label="Bookmark Idea"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(project.id);
                        }}
                        className={`bookmark-btn p-1 transition-colors ${
                          project.isBookmarked
                            ? 'text-[#3525cd]'
                            : 'text-[#777587] hover:text-[#3525cd]'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] ${
                            project.isBookmarked ? 'fill-1' : ''
                          }`}
                        >
                          bookmark
                        </span>
                      </button>
                    </div>

                    <h3 className="text-[17px] font-bold text-[#181445] leading-snug truncate">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-[#464555] line-clamp-2 mb-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Looking For Section */}
                <div className="flex flex-col gap-1.5 mb-3.5 bg-[#f6f2ff]/80 p-2.5 rounded-xl border border-[#e3dfff]/40">
                  <span className="text-[10px] text-[#464555]/80 uppercase font-bold tracking-wider">
                    Looking for collaborators
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.lookingFor.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white text-[#3525cd] text-[11px] font-semibold shadow-xs border border-[#e3dfff]/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Progress & Creator Bar */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  {/* Capacity indicator + Author */}
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Progress Ring SVG */}
                    <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#e3dfff] stroke-current"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="3"
                        />
                        <path
                          className="text-[#712ae2] stroke-current transition-all duration-500"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeDasharray={strokeDash}
                          strokeLinecap="round"
                          strokeWidth="3.2"
                        />
                      </svg>
                      <span className="absolute text-[10px] text-[#181445] font-bold">
                        {project.teamCurrent}/{project.teamTotal}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-semibold text-[#181445] truncate">
                        {project.author}{' '}
                        <span className="text-[#464555] font-normal text-[11px]">
                          ({project.authorYear})
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#777587] leading-none mt-0.5">
                        <span>{project.timeAgo}</span>
                        <span>•</span>
                        {project.mentor ? (
                          <span className="text-[#712ae2] font-semibold flex items-center gap-0.5 truncate max-w-[150px]">
                            <span className="material-symbols-outlined text-[12px]">school</span>
                            {project.mentor.name}
                          </span>
                        ) : (
                          <span className="text-[#777587] font-medium flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">person_off</span>
                            Self-Directed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project.id);
                    }}
                    className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#e9e5ff] hover:bg-[#3525cd] hover:text-white text-[#3525cd] text-[12px] font-semibold transition-all active:scale-95"
                  >
                    <span>View Project</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </article>
            </Card3D>
          </motion.div>
        );
      })}
      </div>

      {/* Empty Search Result Fallback State */}
      {filteredProjects.length === 0 && (
        <div
          className="flex flex-col items-center justify-center text-center py-10 px-4 bg-white/80 rounded-2xl mt-4 border border-[#e3dfff]"
          id="empty-feed-state"
        >
          <div className="w-14 h-14 rounded-full bg-[#3525cd]/10 text-[#3525cd] flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[28px]">search_off</span>
          </div>
          <h4 className="text-[18px] font-bold text-[#181445]">No briefs found</h4>
          <p className="text-[13px] text-[#464555] mt-1 max-w-xs leading-relaxed">
            No projects matched your search criteria. Be the first visionary to start one in this space!
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-[#3525cd] text-white text-[12px] font-semibold shadow-sm hover:bg-[#4f46e5] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
