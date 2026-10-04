import React from 'react';
import { useSimulation } from '../../context/SimulationContext';

interface TemperatureComfortChartProps {
  currentTemp?: number;
  roomName?: string;
}

export const TemperatureComfortChart: React.FC<TemperatureComfortChartProps> = ({
  currentTemp = 24.6,
  roomName = 'Selected Zone',
}) => {
  const { config } = useSimulation();

  const dataPoints = [
    { time: '08:00', temp: 24.0 },
    { time: '09:00', temp: 24.2 },
    { time: '10:00', temp: 24.5 },
    { time: '11:00', temp: 25.8 },
    { time: '12:00', temp: 26.1 },
    { time: '12:40', temp: 25.4 },
    { time: '13:00', temp: 24.5 },
    { time: '14:00', temp: 25.2 },
    { time: '14:35', temp: currentTemp },
  ];

  const width = 640;
  const height = 210;
  const paddingLeft = 35;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const minTemp = 22.0;
  const maxTemp = 28.0;

  const getX = (idx: number) => paddingLeft + (idx / (dataPoints.length - 1)) * innerWidth;
  const getY = (t: number) => paddingTop + innerHeight - ((t - minTemp) / (maxTemp - minTemp)) * innerHeight;

  const minComfortY = getY(config.comfort_min_c);
  const maxComfortY = getY(config.comfort_max_c);

  const linePath = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.temp)}`)
    .join(' ');

  return (
    <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-sm font-bold text-[#27302C]">
            {roomName} — Thermal Profile & Comfort Band
          </h4>
          <p className="text-xs text-[#78817C]">
            Configured comfort tolerance band ({config.comfort_min_c}°C – {config.comfort_max_c}°C)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-[#27302C] font-mono">
            {currentTemp.toFixed(1)}°C
          </span>
          <span className="text-[#2D5A3C] bg-[#E7F3EC] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            Comfort Compliant
          </span>
        </div>
      </div>

      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
          {/* Y Axis Grid lines */}
          {[22, 24, 26, 28].map((t) => {
            const y = getY(t);
            return (
              <g key={t}>
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
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-[#78817C] font-mono"
                >
                  {t}°
                </text>
              </g>
            );
          })}

          {/* Configured Comfort Band Shaded Area in Soft Sage */}
          <rect
            x={paddingLeft}
            y={maxComfortY}
            width={innerWidth}
            height={minComfortY - maxComfortY}
            fill="#DDEBDD"
            opacity="0.45"
            rx="4"
          />

          {/* Upper Limit Line */}
          <line
            x1={paddingLeft}
            y1={maxComfortY}
            x2={width - paddingRight}
            y2={maxComfortY}
            stroke="#2D5A3C"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.6"
          />

          {/* Lower Limit Line */}
          <line
            x1={paddingLeft}
            y1={minComfortY}
            x2={width - paddingRight}
            y2={minComfortY}
            stroke="#2D5A3C"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.6"
          />

          {/* Actual Temperature Curve */}
          <path
            d={linePath}
            fill="none"
            stroke="#27302C"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {dataPoints.map((p, i) => {
            const cx = getX(i);
            const cy = getY(p.temp);

            return (
              <g key={p.time}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={3}
                  className="fill-white stroke-[#27302C]"
                  strokeWidth="2"
                />
                {(i % 2 === 0 || i === dataPoints.length - 1) && (
                  <text
                    x={cx}
                    y={height - 8}
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 mt-2 border-t border-[#27302C]/5 text-xs text-[#78817C]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#DDEBDD] border border-[#2D5A3C]/20 inline-block" />
            <span>Configured Comfort Band</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#27302C] inline-block" />
            <span className="text-[#27302C] font-medium">Actual Temperature</span>
          </div>
        </div>

        <p className="italic text-[11px]">
          Comfort band is configurable by building/climate profile.
        </p>
      </div>
    </div>
  );
};
