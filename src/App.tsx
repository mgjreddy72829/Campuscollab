/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Project, Mentor } from './types';
import { INITIAL_PROJECTS, INITIAL_MENTORS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FeedView } from './components/FeedView';
import { DetailsView } from './components/DetailsView';
import { MentorsView } from './components/MentorsView';
import { PostIdeaView } from './components/PostIdeaView';
import { MentorshipModal } from './components/MentorshipModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('campuscollab_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem('campuscollab_mentors');
    if (saved) {
      try {
        const parsed: Mentor[] = JSON.parse(saved);
        return parsed.map((m, idx) => ({
          ...m,
          status: m.status || INITIAL_MENTORS[idx]?.status || (m.isOnline ? 'Online' : 'Busy')
        }));
      } catch {
        return INITIAL_MENTORS;
      }
    }
    return INITIAL_MENTORS;
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>('drone-pollination');
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('campuscollab_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('campuscollab_mentors', JSON.stringify(mentors));
  }, [mentors]);

  // Load project from URL query parameter if present
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlProjectId = searchParams.get('project');
      if (urlProjectId && projects.some((p) => p.id === urlProjectId)) {
        setSelectedProjectId(urlProjectId);
        setActiveTab('details');
      }
    } catch {
      // Ignore URL parsing errors
    }

    const handlePopState = () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const urlProjectId = searchParams.get('project');
        if (urlProjectId && projects.some((p) => p.id === urlProjectId)) {
          setSelectedProjectId(urlProjectId);
          setActiveTab('details');
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('details');
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      window.history.pushState({ projectId }, '', url.toString());
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFeed = () => {
    setActiveTab('feed');
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('project');
      window.history.pushState({}, '', url.toString());
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleProjectBookmark = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const next = !p.isBookmarked;
          showToast(next ? `Saved "${p.title}" to bookmarks` : `Removed "${p.title}" from bookmarks`);
          return { ...p, isBookmarked: next };
        }
        return p;
      })
    );
  };

  const handleToggleMentorBookmark = (mentorId: string) => {
    setMentors((prev) =>
      prev.map((m) => {
        if (m.id === mentorId) {
          const next = !m.isBookmarked;
          showToast(next ? `Saved ${m.name} to advisory team!` : `Removed ${m.name} from bookmarks`);
          return { ...m, isBookmarked: next };
        }
        return m;
      })
    );
  };

  const handleAddProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setSelectedProjectId(newProject.id);
    setActiveTab('details');
    showToast(`Venture "${newProject.title}" published!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestMentorship = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setMentorshipModalOpen(true);
  };

  const handleMentorshipSubmit = (mentorName: string, projectTitle: string) => {
    showToast(`Mentorship invitation sent to ${mentorName} for ${projectTitle}!`);
  };

  const handleUpdateProjectMentor = (
    projectId: string,
    mentor: { name: string; lab: string } | undefined
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, mentor };
        }
        return p;
      })
    );
  };

  // Selected project for details view
  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || INITIAL_PROJECTS[0];

  const savedProjects = projects.filter((p) => p.isBookmarked);
  const savedMentors = mentors.filter((m) => m.isBookmarked);

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#181445] flex flex-col antialiased selection:bg-[#4f46e5]/20 selection:text-[#3525cd]">
      {/* Top Fixed Header */}
      <Header
        activeTab={activeTab}
        onSearchClick={() => {
          if (activeTab !== 'feed' && activeTab !== 'mentors') {
            setActiveTab('feed');
          }
          const searchElem = document.getElementById('project-search-input') || document.getElementById('mentor-search-input');
          searchElem?.focus();
        }}
        onProfileClick={() => setProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20">
        {activeTab === 'feed' && (
          <FeedView
            projects={projects}
            onSelectProject={handleSelectProject}
            onPostClick={() => {
              setActiveTab('post');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onToggleBookmark={handleToggleProjectBookmark}
          />
        )}

        {activeTab === 'details' && (
          <DetailsView
            project={currentProject}
            mentors={mentors}
            onBackToFeed={handleBackToFeed}
            onToggleBookmark={handleToggleProjectBookmark}
            onShowToast={showToast}
            onUpdateMentor={handleUpdateProjectMentor}
          />
        )}

        {activeTab === 'mentors' && (
          <MentorsView
            mentors={mentors}
            onRequestMentorship={handleRequestMentorship}
            onToggleBookmark={handleToggleMentorBookmark}
          />
        )}

        {activeTab === 'post' && (
          <PostIdeaView
            mentors={mentors}
            onAddProject={handleAddProject}
            onCancel={() => {
              setActiveTab('feed');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Request Mentorship Modal */}
      <MentorshipModal
        isOpen={mentorshipModalOpen}
        mentor={selectedMentor}
        projects={projects}
        onClose={() => {
          setMentorshipModalOpen(false);
          setSelectedMentor(null);
        }}
        onSubmit={handleMentorshipSubmit}
      />

      {/* Profile & Saved Items Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        savedProjects={savedProjects}
        savedMentors={savedMentors}
        onSelectProject={handleSelectProject}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#2d2a5b] text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-[12px] font-semibold animate-in fade-in slide-in-from-bottom duration-200 border border-[#c3c0ff]/20 max-w-[90vw]"
        >
          <span className="material-symbols-outlined text-[#d2bbff] text-[18px]">
            check_circle
          </span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
