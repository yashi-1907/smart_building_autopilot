import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const LoadBreakdownChart: React.FC = () => {
  const slices = [
    {
      label: 'HVAC Cooling',
      percent: 68,
      color: '#A7D7B5',
      tailwindBg: 'bg-[#A7D7B5]',
      desc: 'Flexible cooling',
    },
    {
      label: 'Lighting Systems',
      percent: 17,
      color: '#F7E5A9',
      tailwindBg: 'bg-[#F7E5A9]',
      desc: 'Lux-aware',
    },
    {
      label: 'Other / Critical',
      percent: 15,
      color: '#CBE1F5',
      tailwindBg: 'bg-[#CBE1F5]',
      desc: 'Protected base',
    },
  ];

  // SVG Donut calculation
  const size = 110;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#27302C]/5 shadow-[0_2px_14px_-2px_rgba(39,48,44,0.03)] flex flex-col justify-between h-full w-full">
      <div className="space-y-3">
        {/* Header - flex-wrap to prevent badges from clipping or pushing outside bounds */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h3 className="text-base font-bold text-[#27302C] tracking-tight">Load Distribution</h3>
            <span className="text-xs font-mono text-[#78817C] bg-[#F2F4EE] px-2.5 py-0.5 rounded-full shrink-0">
              18.4 kW Base
            </span>
          </div>
          <p className="text-xs text-[#78817C] leading-relaxed break-words">
            Breakdown of flexible loads vs. protected critical infrastructure
          </p>
        </div>

        {/* Donut graphic - centered cleanly */}
        <div className="flex justify-center py-1">
          <div className="relative w-[110px] h-[110px] shrink-0">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
              {slices.map((slice) => {
                const strokeDasharray = `${(slice.percent / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += slice.percent;

                return (
                  <circle
                    key={slice.label}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[9px] text-[#78817C] uppercase tracking-wider font-semibold">Flexible</span>
              <span className="text-lg font-bold text-[#27302C] font-mono leading-none mt-0.5">85%</span>
            </div>
          </div>
        </div>

        {/* Legend rows with clean text wrapping and zero overflow */}
        <div className="space-y-1.5 text-xs">
          {slices.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFBF9] border border-[#27302C]/5 gap-2.5"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.tailwindBg}`} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-[#27302C] leading-tight break-words">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-[#78817C] leading-normal break-words">
                    {s.desc}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0 pl-2">
                <span className="font-bold font-mono text-xs sm:text-sm text-[#27302C] tabular-nums">
                  {s.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtext info pills - flex wrapped and spacious */}
      <div className="mt-3 pt-3 border-t border-[#27302C]/5 flex flex-col sm:flex-row gap-2 text-xs">
        <div className="flex-1 flex items-center gap-2 text-[#2D5A3C] bg-[#E7F3EC] px-2.5 py-1.5 rounded-xl text-[11px] font-medium min-w-0">
          <Zap className="w-3.5 h-3.5 shrink-0 text-[#2D5A3C]" />
          <span className="break-words">Flexible loads: 85%</span>
        </div>
        <div className="flex-1 flex items-center gap-2 text-[#27537A] bg-[#E4EEF7] px-2.5 py-1.5 rounded-xl text-[11px] font-medium min-w-0">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#27537A]" />
          <span className="break-words">Critical protected: 15%</span>
        </div>
      </div>
    </div>
  );
};
