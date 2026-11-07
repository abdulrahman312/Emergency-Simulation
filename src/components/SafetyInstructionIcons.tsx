import React from 'react';
import {
  Shield,
  Footprints,
  Users,
  MapPin,
  EyeOff,
  DoorClosed,
  PackageX,
  ArrowDownRight,
  Sparkles,
  Star,
  UserCheck,
  PhoneOff,
  VolumeX,
  HeartHandshake,
  AlertOctagon,
  ShieldCheck,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';

/**
 * Head-and-Neck Protection Posture Vector Icon (Drop, Cover & Hold).
 * Depicts a student crouching with hands interlocked behind the head and neck.
 */
export const HeadNeckPostureIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Head tucked down */}
    <circle cx="12" cy="7.5" r="3" />
    {/* Interlocked hands protecting the back of the neck */}
    <path d="M8.5 5.5 C 9.8 4 14.2 4 15.5 5.5" />
    <path d="M7.8 7.2 C 8.8 5.2 15.2 5.2 16.2 7.2" />
    {/* Arms wrapped around neck */}
    <path d="M7 13 C 6.5 9.5 8 6.5 10.5 5.5" />
    <path d="M17 13 C 17.5 9.5 16 6.5 13.5 5.5" />
    {/* Arched protective back */}
    <path d="M12 10.5 C 9 12 7.5 15.5 7.5 19.5" />
    {/* Kneeling base */}
    <path d="M7.5 19.5 L 5 21" />
    <path d="M12 19.5 L 16 21" />
    <path d="M4.5 21.5 H 19.5" />
  </svg>
);

/**
 * Window clearance / move away from glass icon.
 */
export const WindowClearanceIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Window frame */}
    <rect x="3" y="3" width="13" height="13" rx="2" />
    <line x1="9.5" y1="3" x2="9.5" y2="16" />
    <line x1="3" y1="9.5" x2="16" y2="9.5" />
    {/* Arrow pointing away from the glass */}
    <path d="M16 16 L 21 21" />
    <path d="M21 16 V 21 H 16" />
    {/* Warning slash on glass */}
    <line x1="5" y1="5" x2="14" y2="14" stroke="#EF4444" strokeWidth="2" />
  </svg>
);

/**
 * Sturdy desk shelter icon.
 */
export const DeskShelterIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Desk tabletop */}
    <rect x="2" y="4" width="20" height="3" rx="1.5" />
    {/* Desk legs */}
    <line x1="4.5" y1="7" x2="4.5" y2="20" />
    <line x1="19.5" y1="7" x2="19.5" y2="20" />
    {/* Sheltered student figure under desk */}
    <circle cx="12" cy="12" r="2.2" />
    <path d="M9.5 18 C 9.5 15.5 14.5 15.5 14.5 18" />
    <path d="M8 20 H 16" />
  </svg>
);

/**
 * Stairs only / No elevator icon.
 */
export const StairsOnlyIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Descending stairs */}
    <path d="M4 8 H 8 V 12 H 12 V 16 H 16 V 20 H 20" />
    {/* Walking student arrow down */}
    <circle cx="6" cy="4" r="2" />
    <path d="M6 6 V 8" />
    {/* Direction indicator */}
    <path d="M19 12 L 19 18 M 19 18 L 16 15 M 19 18 L 22 15" stroke="#EA580C" />
  </svg>
);

export type ScenarioActionKey =
  | 'window-away'
  | 'desk-shelter'
  | 'door-curtain'
  | 'head-neck-posture'
  | 'leave-belongings'
  | 'single-file'
  | 'stairs-only'
  | 'assembly-gather';

export interface ActionIconBadgeProps {
  actionKey: ScenarioActionKey;
  variant?: 'amber' | 'emerald';
  className?: string;
}

export const ActionIconBadge: React.FC<ActionIconBadgeProps> = ({
  actionKey,
  variant = 'amber',
  className = 'w-9 h-9',
}) => {
  const isAmber = variant === 'amber';

  const containerBg = isAmber
    ? 'bg-amber-100/90 text-[#B45309] border-amber-200'
    : 'bg-emerald-100/90 text-[#047857] border-emerald-200';

  const renderIcon = () => {
    switch (actionKey) {
      case 'window-away':
        return <WindowClearanceIcon className="w-5 h-5" />;
      case 'desk-shelter':
        return <DeskShelterIcon className="w-5 h-5" />;
      case 'door-curtain':
        return <DoorClosed className="w-5 h-5" />;
      case 'head-neck-posture':
        return <HeadNeckPostureIcon className="w-5 h-5 text-[#DC2626]" />;
      case 'leave-belongings':
        return <PackageX className="w-5 h-5 text-[#EA580C]" />;
      case 'single-file':
        return <Footprints className="w-5 h-5" />;
      case 'stairs-only':
        return <StairsOnlyIcon className="w-5 h-5 text-[#EA580C]" />;
      case 'assembly-gather':
        return <MapPin className="w-5 h-5 text-[#059669]" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`${className} rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${containerBg}`}
    >
      {renderIcon()}
    </div>
  );
};
