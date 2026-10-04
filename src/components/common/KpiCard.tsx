import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  comparison?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  pastelBg?: 'sage' | 'lavender' | 'blue' | 'peach' | 'yellow' | 'stone';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  subtext,
  comparison,
  trend,
  icon,
  pastelBg = 'sage',
}) => {
  const getIconCircleBg = () => {
    switch (pastelBg) {
      case 'lavender':
        return 'bg-[#EAE5F5] text-[#5A457D]';
      case 'blue':
        return 'bg-[#E4EEF7] text-[#34628A]';
      case 'peach':
        return 'bg-[#F8E8DD] text-[#8C4F2B]';
      case 'yellow':
        return 'bg-[#F7F0D8] text-[#7A641A]';
      case 'stone':
        return 'bg-[#EFEFEA] text-[#555953]';
      case 'sage':
      default:
        return 'bg-[#DDEBDD] text-[#2D5A3C]';
    }
  };

  return (
    <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-[0_2px_14px_-2px_rgba(39,48,44,0.03)] hover:shadow-[0_6px_20px_-2px_rgba(39,48,44,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-medium text-[#78817C] tracking-tight">{title}</span>
          {icon && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getIconCircleBg()}`}>
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-3xl sm:text-[34px] font-bold tracking-tight text-[#27302C] font-mono tabular-nums leading-none">
            {value}
          </span>
          {unit && <span className="text-sm font-semibold text-[#78817C]">{unit}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs pt-1 text-[#78817C]">
        {comparison && (
          <span className="font-semibold text-[#2D5A3C] bg-[#E7F3EC] px-2 py-0.5 rounded-full text-[11px]">
            {comparison}
          </span>
        )}
        {subtext && <span className="text-[#78817C] text-[12px] truncate">{subtext}</span>}
      </div>
    </div>
  );
};
