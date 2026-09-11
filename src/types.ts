export interface Milestone {
  stage: string;
  title: string;
  subtitle: string;
  status: 'done' | 'active' | 'upcoming';
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  avatar: string;
  icon: string;
}

export interface NeededRole {
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  categoryType: 'iot' | 'web3' | 'biotech' | 'ai' | 'mobile' | 'general';
  description: string;
  fullMission: string;
  lookingFor: string[];
  teamCurrent: number;
  teamTotal: number;
  author: string;
  authorYear: string;
  authorDetails: string;
  authorAvatar: string;
  timeAgo: string;
  thumbnail: string;
  heroImage: string;
  mentor?: {
    name: string;
    lab: string;
  };
  currentStage: string;
  milestones: Milestone[];
  teamRoster: TeamMember[];
  neededRoles: NeededRole[];
  isBookmarked?: boolean;
}

export type MentorAvailabilityStatus = 'Online' | 'Busy' | 'Office Hours';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  department: string;
  lab: string;
  type: 'Faculty' | 'Alumni';
  year?: string;
  avatar: string;
  domains: string[];
  labDomain: string;
  badge: string;
  availability: string;
  availabilityTag: string;
  isOnline: boolean;
  status: MentorAvailabilityStatus;
  isBookmarked?: boolean;
}

export type TabType = 'feed' | 'post' | 'details' | 'mentors';
