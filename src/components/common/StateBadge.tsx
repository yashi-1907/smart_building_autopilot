import React from 'react';
import { RoomState } from '../../types';

interface StateBadgeProps {
  state: RoomState;
  size?: 'sm' | 'md';
}

export const StateBadge: React.FC<StateBadgeProps> = ({ state, size = 'sm' }) => {
  const getBadgeConfig = () => {
    switch (state) {
      case 'OCCUPIED':
        return {
          bg: 'bg-[#E7F3EC] text-[#245034] border border-[#245034]/10',
          dot: 'bg-[#3A8554]',
          label: 'OCCUPIED',
          desc: 'Normal comfort mode',
        };
      case 'PRE_SETBACK':
        return {
          bg: 'bg-[#FDF3DE] text-[#7A5B15] border border-[#7A5B15]/10',
          dot: 'bg-[#C28C1A]',
          label: 'PRE_SETBACK',
          desc: 'Vacancy countdown',
        };
      case 'SETBACK_ACTIVE':
        return {
          bg: 'bg-[#DDEBDD] text-[#1E4B2C] border border-[#1E4B2C]/10',
          dot: 'bg-[#2D6E3F]',
          label: 'SETBACK',
          desc: 'Energy optimization active',
        };
      case 'PRE_COOLING':
        return {
          bg: 'bg-[#EAE5F5] text-[#553C7B] border border-[#553C7B]/10',
          dot: 'bg-[#7C5AAB]',
          label: 'PRE-COOLING',
          desc: 'Pre-conditioning active',
        };
      case 'SHUTDOWN_STANDBY':
        return {
          bg: 'bg-[#EFEFEA] text-[#636862] border border-[#636862]/10',
          dot: 'bg-[#8E938A]',
          label: 'STANDBY',
          desc: 'Deep idle standby',
        };
      default:
        return {
          bg: 'bg-[#F0F2ED] text-[#27302C]',
          dot: 'bg-[#78817C]',
          label: state,
          desc: '',
        };
    }
  };

  const config = getBadgeConfig();
  const paddingClass = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${config.bg} ${paddingClass}`}
      title={config.desc}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
};
