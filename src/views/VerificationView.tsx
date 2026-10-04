import React from 'react';
import {
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Zap,
  ArrowRight,
  Scale,
  Wrench
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const VerificationView: React.FC = () => {
  const { verification } = useSimulation();

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)]">
        <div className="inline-flex items-center gap-2 bg-[#DDEBDD] text-[#2D5A3C] px-3 py-1 rounded-full text-xs font-semibold mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Empirical Proof</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
          Did we actually save energy?
        </h2>
        <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
          Matched baseline-versus-controlled simulation under identical occupancy and environmental weather conditions.
        </p>
      </div>

      {/* Two Soft Cards Connected by Arrow (Section 19 of Prompt) */}
      <div className="bg-white rounded-[24px] p-8 border border-[#27302C]/5 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Baseline Card (Soft Grey) */}
          <div className="flex-1 w-full p-6 rounded-[22px] bg-[#F2F4EE] border border-[#27302C]/5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-[#78817C] uppercase tracking-wider block mb-2">
              Baseline Operation
            </span>
            <div className="my-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#78817C] font-mono tabular-nums">
                {verification.baseline_kwh.toFixed(1)}
              </span>
              <span className="text-base font-semibold text-[#78817C] ml-1.5">kWh</span>
            </div>
            <p className="text-xs text-[#78817C] mt-2">
              Standard unmanaged split AC schedule with continuous daytime cooling.
            </p>
          </div>

          {/* Subtle Connecting Arrow */}
          <div className="w-12 h-12 rounded-full bg-[#FAFBF9] border border-[#27302C]/8 flex items-center justify-center text-[#27302C] shrink-0 shadow-2xs">
            <ArrowRight className="w-5 h-5 stroke-[2]" />
          </div>

          {/* Controlled Autopilot Card (Soft Sage) */}
          <div className="flex-1 w-full p-6 rounded-[22px] bg-[#DDEBDD] border border-[#2D5A3C]/10 flex flex-col justify-between shadow-xs">
            <span className="text-xs font-semibold text-[#2D5A3C] uppercase tracking-wider block mb-2">
              Controlled Autopilot
            </span>
            <div className="my-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#1F462B] font-mono tabular-nums">
                {verification.controlled_kwh.toFixed(1)}
              </span>
              <span className="text-base font-semibold text-[#2D5A3C] ml-1.5">kWh</span>
            </div>
            <p className="text-xs text-[#2D5A3C] mt-2">
              Closed-loop vacancy setback, lux harvesting & demand shed logic.
            </p>
          </div>
        </div>

        {/* Caption */}
        <div className="pt-4 border-t border-[#27302C]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#78817C]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#27302C]">Same occupancy + environmental conditions</span>
            <span>·</span>
            <span>Different control strategy</span>
          </div>
          <span className="italic text-[11px]">Matched simulation testbed</span>
        </div>
      </div>

      {/* 4 Major Verification Highlights (Section 18) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
          <span className="text-xs font-medium text-[#78817C] block mb-1">Energy Saved</span>
          <div className="text-3xl font-extrabold text-[#2D5A3C] font-mono tabular-nums mb-1">
            {verification.saved_kwh.toFixed(1)} kWh
          </div>
          <span className="text-xs font-semibold text-[#2D5A3C] bg-[#E7F3EC] px-2 py-0.5 rounded-full inline-block">
            Estimated daily net
          </span>
        </div>

        <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
          <span className="text-xs font-medium text-[#78817C] block mb-1">Reduction Ratio</span>
          <div className="text-3xl font-extrabold text-[#27302C] font-mono tabular-nums mb-1">
            {verification.saving_percent.toFixed(1)}%
          </div>
          <span className="text-xs text-[#78817C]">
            Below unmanaged baseline
          </span>
        </div>

        <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
          <span className="text-xs font-medium text-[#78817C] block mb-1">Comfort Compliance</span>
          <div className="text-3xl font-extrabold text-[#5A457D] font-mono tabular-nums mb-1">
            {verification.comfort_compliance_percent.toFixed(1)}%
          </div>
          <span className="text-xs font-semibold text-[#5A457D] bg-[#EAE5F5] px-2 py-0.5 rounded-full inline-block">
            Zero comfort compromise
          </span>
        </div>

        <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
          <span className="text-xs font-medium text-[#78817C] block mb-1">Peak Demand Shed</span>
          <div className="text-3xl font-extrabold text-[#2C577E] font-mono tabular-nums mb-1">
            {verification.peak_demand_shed_kw.toFixed(1)} kW
          </div>
          <span className="text-xs font-semibold text-[#2C577E] bg-[#E4EEF7] px-2 py-0.5 rounded-full inline-block">
            Flexible peak relief
          </span>
        </div>
      </div>

      {/* Basic Equipment Response Verification */}
      <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <Wrench className="w-4 h-4 text-[#78817C]" />
          <h3 className="text-base font-bold text-[#27302C]">Equipment Control-Response Check</h3>
        </div>
        <p className="text-xs text-[#78817C] mb-4">
          Closed-loop telemetry checks whether measured power draw drops after issuing a setback command.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#27302C] block">AC Unit 101 (Split)</span>
              <span className="text-[#78817C] text-[11px]">Command 24°C → 26°C · Power curtailed</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E7F3EC] text-[#245034]">
              NORMAL
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#F8E8DD]/60 border border-[#8C4F2B]/15 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#6D391A] block">AC Unit 204 (Split)</span>
              <span className="text-[#8C4F2B] text-[11px]">Command 24°C → 26°C · Stuck at 1.4 kW</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F8E8DD] text-[#8C4F2B] border border-[#8C4F2B]/20">
              CHECK REQUIRED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
