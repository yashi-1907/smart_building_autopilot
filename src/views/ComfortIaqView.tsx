import React from 'react';
import {
  Smile,
  Thermometer,
  Droplets,
  Wind,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const ComfortIaqView: React.FC = () => {
  const { rooms, config, verification } = useSimulation();

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#EAE5F5] text-[#5A457D] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Smile className="w-3.5 h-3.5" />
            <span>Occupant Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
            Occupant Comfort
          </h2>
          <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
            Energy efficiency should never come at the cost of occupant wellbeing.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#2D5A3C] bg-[#E7F3EC] px-3.5 py-1.5 rounded-full font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#3A8554]" />
          <span>Configured Band: {config.comfort_min_c}°C – {config.comfort_max_c}°C</span>
        </div>
      </div>

      {/* Wellness Dashboard Large Central Card + 3 Stat Cards (Section 16) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Large Central Card: Comfort Compliance */}
        <div className="lg:col-span-1 bg-white rounded-[22px] p-7 border border-[#27302C]/5 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78817C]">
              Overall Index
            </span>
            <div className="my-4">
              <span className="text-5xl font-extrabold text-[#27302C] font-mono tracking-tight tabular-nums block">
                {verification.comfort_compliance_percent.toFixed(1)}%
              </span>
              <span className="text-sm font-semibold text-[#2D5A3C] block mt-1">
                Comfort Compliance
              </span>
            </div>
          </div>
          <p className="text-xs text-[#78817C] leading-relaxed">
            Percentage of occupied building timetable operating within configured comfort band.
          </p>
        </div>

        {/* 3 Smaller Cards: Temperature, Humidity, CO2 */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Temperature (Soft Lavender) */}
          <div className="bg-[#EAE5F5]/60 rounded-[22px] p-6 border border-[#5A457D]/10 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#5A457D]">Temperature</span>
              <div className="w-7 h-7 rounded-full bg-[#EAE5F5] flex items-center justify-center text-[#5A457D]">
                <Thermometer className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#493568] font-mono tabular-nums mb-1">
                24.8°C
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A457D] bg-white/80 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C5AAB]" />
                Comfortable
              </span>
            </div>
          </div>

          {/* Humidity (Soft Blue) */}
          <div className="bg-[#E4EEF7]/60 rounded-[22px] p-6 border border-[#34628A]/10 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#2C577E]">Humidity</span>
              <div className="w-7 h-7 rounded-full bg-[#E4EEF7] flex items-center justify-center text-[#2C577E]">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#27537A] font-mono tabular-nums mb-1">
                51%
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C577E] bg-white/80 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3770A4]" />
                Normal Band
              </span>
            </div>
          </div>

          {/* CO2 (Soft Sage) */}
          <div className="bg-[#DDEBDD]/60 rounded-[22px] p-6 border border-[#2D5A3C]/10 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#245034]">CO₂ Level</span>
              <div className="w-7 h-7 rounded-full bg-[#DDEBDD] flex items-center justify-center text-[#245034]">
                <Wind className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F462B] font-mono tabular-nums mb-1">
                680 ppm
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#245034] bg-white/80 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3A8554]" />
                Good Air Freshness
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Peach IAQ Alert Card (Section 17 of Prompt) */}
      <div className="bg-[#F8E8DD] rounded-[22px] p-6 border border-[#8C4F2B]/15 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-[#8C4F2B] shrink-0 mt-0.5 shadow-2xs">
              <AlertCircle className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#6D391A]">
                Air Quality Attention (Room 201)
              </h3>
              <p className="text-xs text-[#8C4F2B] mt-1 leading-relaxed max-w-2xl">
                CO₂ reached <strong className="font-mono text-[#6D391A]">840 ppm</strong> during an occupied session. (Note: Split AC units circulate indoor air and do not supply fresh air).
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-xs font-semibold text-[#6D391A] border border-[#8C4F2B]/10 shadow-2xs">
              Action: Check ventilation
            </span>
          </div>
        </div>
      </div>

      {/* Lighting Section */}
      <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-[#C29D28]" />
          <h3 className="text-base font-bold text-[#27302C]">Daylight Harvesting & Visual Comfort</h3>
        </div>
        <p className="text-xs text-[#78817C] mb-4">
          Lighting optimization checks both occupancy and lux illuminance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <div className="font-bold text-[#27302C] mb-1">Room 102 · Confirmed Vacancy</div>
            <p className="text-[#78817C] leading-relaxed">
              Occupancy: 0 · Lux: 280 · Lights: OFF. "Lights extinguished after verified vacancy countdown."
            </p>
          </div>
          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <div className="font-bold text-[#27302C] mb-1">Room 101 · Daylight Shortfall</div>
            <p className="text-[#78817C] leading-relaxed">
              Occupancy: 28 · Lux: 180 (&lt; 300 target) · Lights: ON. "Task illumination energized for occupant visual wellbeing."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
