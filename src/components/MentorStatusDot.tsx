import React, { useState } from 'react';
import { MentorAvailabilityStatus } from '../types';

interface MentorStatusDotProps {
  status?: MentorAvailabilityStatus;
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface StatusConfig {
  label: string;
  colorClass: string;
  glowClass: string;
  pulseClass: string;
  description: string;
  icon: string;
}

const STATUS_CONFIGS: Record<MentorAvailabilityStatus, StatusConfig> = {
  Online: {
    label: 'Online',
    colorClass: 'bg-emerald-500',
    glowClass: 'shadow-[0_0_8px_rgba(16,185,129,0.7)]',
    pulseClass: 'bg-emerald-400',
    description: 'Active & available for project review',
    icon: 'radio_button_checked'
  },
  Busy: {
    label: 'Busy',
    colorClass: 'bg-amber-500',
    glowClass: 'shadow-[0_0_6px_rgba(245,158,11,0.5)]',
    pulseClass: '',
    description: 'In research meeting or lab sprint',
    icon: 'do_not_disturb_on'
  },
  'Office Hours': {
    label: 'Office Hours',
    colorClass: 'bg-[#712ae2]',
    glowClass: 'shadow-[0_0_8px_rgba(113,42,226,0.6)]',
    pulseClass: 'bg-[#985bf8]',
    description: 'Active drop-in advising session',
    icon: 'schedule'
  }
};

export const MentorStatusDot: React.FC<MentorStatusDotProps> = ({
  status = 'Online',
  isOnline,
  size = 'md',
  className = '',
  tooltipPosition = 'top'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Fallback if status is omitted but isOnline is provided
  const resolvedStatus: MentorAvailabilityStatus =
    status === 'Office Hours' || status === 'Busy' || status === 'Online'
      ? status
      : isOnline
      ? 'Online'
      : 'Busy';
  const config = STATUS_CONFIGS[resolvedStatus] || STATUS_CONFIGS.Online;

  const sizeClasses = {
    sm: 'w-2.5 h-2.5 border',
    md: 'w-3.5 h-3.5 border-2',
    lg: 'w-4 h-4 border-2'
  }[size];

  // Tooltip position offsets
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }[tooltipPosition];

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[#181445] border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#181445] border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[#181445] border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[#181445] border-t-transparent border-b-transparent border-l-transparent'
  }[tooltipPosition];

  return (
    <div
      className={`relative inline-flex items-center justify-center group ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      role="status"
      aria-label={`Advisor status: ${config.label}. ${config.description}`}
    >
      {/* Animated halo for active statuses */}
      {config.pulseClass && (
        <span
          className={`absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none ${config.pulseClass}`}
        />
      )}

      {/* Main Status Dot Indicator */}
      <span
        className={`relative z-10 rounded-full border-white ${sizeClasses} ${config.colorClass} ${config.glowClass} cursor-pointer transition-transform duration-150 group-hover:scale-125`}
      />

      {/* Floating Hover Tooltip */}
      <div
        className={`absolute z-40 ${positionClasses} pointer-events-none transition-all duration-200 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative px-2.5 py-1.5 rounded-xl bg-[#181445] text-white shadow-2xl border border-[#3525cd]/40 whitespace-nowrap flex flex-col items-start min-w-[130px]">
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 pointer-events-none ${arrowClasses}`}
          />

          <div className="flex items-center gap-1.5 w-full">
            <span className={`w-2 h-2 rounded-full ${config.colorClass}`} />
            <span className="text-[11px] font-bold text-white tracking-wide">
              {config.label}
            </span>
          </div>
          <span className="text-[9.5px] text-[#c3c0ff] mt-0.5 leading-tight font-normal">
            {config.description}
          </span>
        </div>
      </div>
    </div>
  );
};
