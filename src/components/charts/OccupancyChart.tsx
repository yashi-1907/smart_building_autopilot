import React from 'react';

interface OccupancyChartProps {
  roomName?: string;
  peakOccupancy?: number;
  averageOccupancy?: number;
  longestVacancyMin?: number;
}

export const OccupancyChart: React.FC<OccupancyChartProps> = ({
  roomName = 'Selected Zone',
  peakOccupancy = 84,
  averageOccupancy = 52,
  longestVacancyMin = 96,
}) => {
  const points = [
    { time: '08:00', count: 0 },
    { time: '09:00', count: 32 },
    { time: '10:00', count: 0 },
    { time: '11:00', count: 45 },
    { time: '12:00', count: 70 },
    { time: '13:00', count: peakOccupancy },
    { time: '14:00', count: 65 },
    { time: '15:00', count: 0 },
    { time: '16:00', count: 28 },
    { time: '17:00', count: 12 },
    { time: '18:00', count: 0 },
  ];

  const width = 640;
  const height = 180;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const maxCount = Math.max(...points.map((p) => p.count), 100);

  const getX = (i: number) => paddingLeft + (i / (points.length - 1)) * innerWidth;
  const getY = (c: number) => paddingTop + innerHeight - (c / maxCount) * innerHeight;

  const areaPath = [
    `M ${getX(0)} ${getY(points[0].count)}`,
    ...points.map((p, i) => `L ${getX(i)} ${getY(p.count)}`),
    `L ${getX(points.length - 1)} ${paddingTop + innerHeight}`,
    `L ${getX(0)} ${paddingTop + innerHeight}`,
    'Z',
  ].join(' ');

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.count)}`)
    .join(' ');

  return (
    <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-sm font-bold text-[#27302C]">
            {roomName} — Occupancy Profile
          </h4>
          <p className="text-xs text-[#78817C]">
            PIR & door counter occupancy detection across operating hours
          </p>
        </div>

        {/* High level occupancy metrics */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-baseline gap-1">
            <span className="text-[#78817C] text-[11px]">Peak:</span>
            <span className="font-bold text-[#27302C] font-mono">{peakOccupancy}</span>
          </div>
          <span className="text-[#78817C]/40">·</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[#78817C] text-[11px]">Avg:</span>
            <span className="font-bold text-[#27302C] font-mono">{averageOccupancy}</span>
          </div>
          <span className="text-[#78817C]/40">·</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[#78817C] text-[11px]">Longest Vacancy:</span>
            <span className="font-bold text-[#8C4F2B] font-mono">{longestVacancyMin} min</span>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
          {/* Y Axis grid lines */}
          {[0, 50, 100].map((c) => {
            const y = getY(c);
            return (
              <g key={c}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F0F2ED"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-[#78817C] font-mono"
                >
                  {c}
                </text>
              </g>
            );
          })}

          {/* Area fill in Soft Lavender */}
          <path d={areaPath} fill="#EAE5F5" opacity="0.65" />

          {/* Line curve in Deep Lavender */}
          <path d={linePath} fill="none" stroke="#5A457D" strokeWidth="2" strokeLinecap="round" />

          {/* Data points */}
          {points.map((p, i) => {
            const cx = getX(i);
            const cy = getY(p.count);
            return (
              <g key={p.time}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={2.5}
                  className="fill-white stroke-[#5A457D]"
                  strokeWidth="1.5"
                />
                {(i % 2 === 0 || i === points.length - 1) && (
                  <text
                    x={cx}
                    y={height - 6}
                    textAnchor="middle"
                    className="text-[10px] fill-[#78817C] font-mono"
                  >
                    {p.time}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#27302C]/5 flex items-center justify-between text-xs text-[#78817C]">
        <span>PIR confirmed vacancy triggers automated setback after 15 min idle threshold.</span>
        <span className="text-[#5A457D] font-medium">Timetable & Sensor Fusion Active</span>
      </div>
    </div>
  );
};
