import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ArrowDownRight, TrendingUp } from 'lucide-react';

export const EnergyPerformanceChart: React.FC = () => {
  const { hourlyData, verification } = useSimulation();
  const [activeFilter, setActiveFilter] = useState<'today' | '24h' | '7d'>('today');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 720;
  const height = 230;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 32;

  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(...hourlyData.map((d) => Math.max(d.baseline_kw, d.controlled_kw)), 20);
  const minVal = 0;

  const getX = (index: number) => {
    if (hourlyData.length <= 1) return paddingLeft;
    return paddingLeft + (index / (hourlyData.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    return paddingTop + innerHeight - ((val - minVal) / (maxVal - minVal)) * innerHeight;
  };

  // Baseline line
  const baselinePath = hourlyData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.baseline_kw)}`)
    .join(' ');

  // Controlled line
  const controlledPath = hourlyData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.controlled_kw)}`)
    .join(' ');

  // Soft filled area under controlled curve
  const controlledAreaPath = [
    `M ${getX(0)} ${getY(hourlyData[0].controlled_kw)}`,
    ...hourlyData.map((p, i) => `L ${getX(i)} ${getY(p.controlled_kw)}`),
    `L ${getX(hourlyData.length - 1)} ${paddingTop + innerHeight}`,
    `L ${getX(0)} ${paddingTop + innerHeight}`,
    'Z',
  ].join(' ');

  const hoveredPoint = hoveredIndex !== null ? hourlyData[hoveredIndex] : null;

  return (
    <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-[0_2px_14px_-2px_rgba(39,48,44,0.03)] flex flex-col justify-between h-full w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-[#27302C] tracking-tight">Energy Performance</h3>
          <p className="text-xs text-[#78817C] mt-0.5">
            Baseline vs. Controlled Autopilot electric load across the day
          </p>
        </div>

        {/* Filter Segmented Controls in Soft Pastel Style */}
        <div className="flex items-center gap-1 p-1 bg-[#F2F4EE] rounded-full self-start sm:self-auto">
          {(['today', '24h', '7d'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                activeFilter === filter
                  ? 'bg-white text-[#27302C] shadow-2xs font-semibold'
                  : 'text-[#78817C] hover:text-[#27302C]'
              }`}
            >
              {filter === 'today' ? 'Today' : filter === '24h' ? '24h' : '7 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-visible">
          <defs>
            <linearGradient id="pastelGreenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DDEBDD" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#DDEBDD" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 5, 10, 15, 20].map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F0F2ED"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-[#78817C] font-mono"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Peak Period Shaded Zone (14:00 to 17:00) in soft powder blue */}
          {(() => {
            const startIdx = hourlyData.findIndex((p) => p.hour === 14);
            const endIdx = hourlyData.findIndex((p) => p.hour === 17);
            if (startIdx >= 0 && endIdx >= 0) {
              const x1 = getX(startIdx);
              const x2 = getX(endIdx);
              return (
                <rect
                  x={x1}
                  y={paddingTop}
                  width={x2 - x1}
                  height={innerHeight}
                  fill="#E4EEF7"
                  opacity="0.55"
                  rx="4"
                />
              );
            }
            return null;
          })()}

          {/* Subtle filled area under controlled curve */}
          <path d={controlledAreaPath} fill="url(#pastelGreenGradient)" />

          {/* Baseline Curve (Muted Warm Grey) */}
          <path
            d={baselinePath}
            fill="none"
            stroke="#A5ADA8"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Controlled Autopilot Curve (Soft Sage / Green) */}
          <path
            d={controlledPath}
            fill="none"
            stroke="#3B7E55"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Interactive target nodes */}
          {hourlyData.map((p, i) => {
            const cx = getX(i);
            const cyCtrl = getY(p.controlled_kw);
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={p.time}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <rect
                  x={cx - 15}
                  y={paddingTop}
                  width={30}
                  height={innerHeight}
                  fill="transparent"
                />

                {(i % 2 === 0 || i === hourlyData.length - 1) && (
                  <text
                    x={cx}
                    y={height - 10}
                    textAnchor="middle"
                    className="text-[10px] fill-[#78817C] font-mono"
                  >
                    {p.time}
                  </text>
                )}

                <circle
                  cx={cx}
                  cy={cyCtrl}
                  r={isHovered ? 4.5 : 2.5}
                  className="fill-white stroke-[#3B7E55]"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>

        {/* Minimal Tooltip Overlay */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 bg-white/95 rounded-xl p-3 border border-[#27302C]/8 shadow-sm text-xs font-mono backdrop-blur-xs text-[#27302C]">
            <div className="font-semibold text-xs border-b border-[#27302C]/6 pb-1 mb-1">
              Time: {hoveredPoint.time}
            </div>
            <div className="flex justify-between gap-4 text-[#78817C]">
              <span>Baseline:</span>
              <span className="font-semibold text-[#27302C]">{hoveredPoint.baseline_kw} kW</span>
            </div>
            <div className="flex justify-between gap-4 text-[#2D5A3C]">
              <span>Autopilot:</span>
              <span className="font-bold">{hoveredPoint.controlled_kw} kW</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Stat Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-2 border-t border-[#27302C]/5 text-xs">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#A5ADA8] inline-block" />
            <span className="text-[#78817C]">Baseline</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 rounded-full bg-[#3B7E55] inline-block" />
            <span className="text-[#27302C] font-medium">Controlled Autopilot</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-[#E4EEF7] border border-[#E4EEF7] inline-block" />
            <span className="text-[#78817C]">Peak Window</span>
          </div>
        </div>

        {/* Saved kWh badge with dynamic percentage */}
        <div className="flex items-center gap-1.5 font-medium text-[#2D5A3C] bg-[#E7F3EC] px-3 py-1 rounded-full text-xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="font-bold font-mono">{verification.saved_kwh.toFixed(1)} kWh saved</span>
          <span className="text-[#78817C] text-[11px]">({verification.saving_percent.toFixed(1)}% lower)</span>
        </div>
      </div>
    </div>
  );
};
