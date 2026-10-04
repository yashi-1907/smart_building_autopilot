import React from 'react';
import {
  Activity,
  ShieldCheck,
  TrendingDown,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { KpiCard } from '../components/common/KpiCard';

export const GridResponseView: React.FC = () => {
  const { gridStatus, toggleGridStatus, verification, config } = useSimulation();

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E4EEF7] text-[#2C577E] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Demand Flexibility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
            Grid Response
          </h2>
          <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
            Shift flexible demand when the grid needs it — without compromising comfort.
          </p>
        </div>

        {/* Interactive toggle */}
        <div className="flex items-center gap-2 bg-[#F2F4EE] p-1.5 rounded-full text-xs self-start sm:self-auto">
          <span className="text-[#78817C] px-2 font-medium">Signal:</span>
          <button
            onClick={toggleGridStatus}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              gridStatus === 'PEAK'
                ? 'bg-[#E4EEF7] text-[#2C577E] shadow-2xs font-semibold'
                : 'text-[#78817C] hover:text-[#27302C]'
            }`}
          >
            ● Peak
          </button>
          <button
            onClick={toggleGridStatus}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              gridStatus === 'NORMAL'
                ? 'bg-white text-[#27302C] shadow-2xs font-semibold'
                : 'text-[#78817C] hover:text-[#27302C]'
            }`}
          >
            Normal
          </button>
        </div>
      </div>

      {/* Grid Key Metrics Row (Section 15 of Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <KpiCard
          title="Baseline Peak Demand"
          value="18.2 kW"
          subtext="Unmanaged demand peak"
          pastelBg="stone"
        />

        <KpiCard
          title="Controlled Demand"
          value={gridStatus === 'PEAK' ? '17.1 kW' : '18.2 kW'}
          subtext="Active Autopilot draw"
          comparison="-1.1 kW curtailment"
          pastelBg="blue"
        />

        <KpiCard
          title="Demand Shed"
          value={gridStatus === 'PEAK' ? '1.1 kW' : '0.0 kW'}
          subtext="Flexible load reduced"
          comparison="6.0% peak reduction"
          pastelBg="sage"
          icon={<TrendingDown className="w-4 h-4 text-[#2D5A3C]" />}
        />
      </div>

      {/* Large Pastel Timeline (Section 15 of Prompt) */}
      <div className="bg-white rounded-[22px] p-7 border border-[#27302C]/5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#78817C]" />
            <h3 className="text-base font-bold text-[#27302C]">Daily Grid Tariff & Shedding Schedule</h3>
          </div>
          <span className="text-xs font-mono text-[#78817C]">Peak Hours: 14:00 – 17:00</span>
        </div>

        {/* Visual Timeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Normal 08:00 - 14:00 */}
          <div className="p-5 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <div className="flex items-center justify-between text-xs text-[#78817C] font-mono mb-2">
              <span>08:00</span>
              <span>14:00</span>
            </div>
            <div className="font-bold text-[#27302C] text-sm mb-1">NORMAL OPERATION</div>
            <p className="text-xs text-[#78817C] leading-relaxed">
              Standard thermostatic setpoints (24°C) maintained. Normal vacancy setback policies active.
            </p>
          </div>

          {/* Peak 14:00 - 17:00 in Soft Pastel Blue */}
          <div className="p-5 rounded-[18px] bg-[#E4EEF7] border border-[#34628A]/20 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-[#2C577E] font-mono font-semibold mb-2">
              <span>14:00</span>
              <span className="px-2 py-0.5 rounded-full bg-white/80 text-[10px] uppercase font-bold text-[#2C577E]">
                Peak Shed Window
              </span>
              <span>17:00</span>
            </div>
            <div className="font-bold text-[#27537A] text-sm mb-1">PEAK LOAD MODULATION</div>
            <p className="text-xs text-[#2C577E] leading-relaxed">
              Setpoints relaxed by 1.0°C–1.5°C across occupied non-critical zones to shed peak grid demand.
            </p>
          </div>

          {/* Normal 17:00 - 22:00 */}
          <div className="p-5 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <div className="flex items-center justify-between text-xs text-[#78817C] font-mono mb-2">
              <span>17:00</span>
              <span>22:00</span>
            </div>
            <div className="font-bold text-[#27302C] text-sm mb-1">NORMAL OPERATION</div>
            <p className="text-xs text-[#78817C] leading-relaxed">
              Restores steady comfort setpoints as campus occupancy gradually winds down into evening hours.
            </p>
          </div>
        </div>

        <p className="text-xs text-[#78817C] pt-2">
          "During peak periods, flexible cooling demand may be reduced when comfort conditions allow."
        </p>
      </div>

      {/* Comfort Protection Overrides Callout */}
      <div className="bg-[#DDEBDD]/60 rounded-[22px] p-6 border border-[#2D5A3C]/10 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-full bg-[#DDEBDD] flex items-center justify-center text-[#2D5A3C] shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#1E4B2C]">
            Comfort Protection Overrides Grid Optimization
          </h4>
          <p className="text-xs text-[#2D5A3C]/90 mt-1 leading-relaxed">
            If a room temperature approaches the upper comfort threshold ({config.comfort_max_c}°C), the system cancels peak setpoint relaxation immediately. Occupant wellbeing always takes precedence over demand-side energy curtailment.
          </p>
        </div>
      </div>
    </div>
  );
};
