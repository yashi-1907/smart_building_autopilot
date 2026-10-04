import React, { useState } from 'react';
import {
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowDown,
  Sparkles,
  Gauge,
  Sliders,
  Filter
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { StateBadge } from '../components/common/StateBadge';

export const DecisionEngineView: React.FC = () => {
  const { decisions, config } = useSimulation();
  const [filterRoom, setFilterRoom] = useState<string>('all');

  const filteredDecisions = decisions.filter(
    (d) => filterRoom === 'all' || d.room_id === filterRoom
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#EAE5F5] text-[#5A457D] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable Control Logic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
            Why is the building doing this?
          </h2>
          <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
            Every setpoint adjustment, lighting cutoff, and grid-shed command is deterministic, guardrail-checked, and explainable.
          </p>
        </div>

        {/* Filter by Room */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-[#78817C]" />
          <select
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="bg-[#F7F8F5] border border-[#27302C]/6 rounded-full px-4 py-1.5 text-[#27302C] text-xs font-medium cursor-pointer shadow-2xs"
          >
            <option value="all">All Monitored Rooms</option>
            <option value="101">Room 101</option>
            <option value="102">Room 102</option>
            <option value="103">Room 103</option>
            <option value="201">Room 201</option>
            <option value="202">Room 202 (Lab)</option>
            <option value="204">Room 204</option>
            <option value="301">Room 301</option>
          </select>
        </div>
      </div>

      {/* Decision Pipeline Visual Blocks (Pastel Palette) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-[18px] bg-[#EAE5F5]/70 border border-[#5A457D]/10">
          <span className="text-[10px] font-mono text-[#5A457D] font-bold uppercase tracking-wider block mb-1">
            01 · Decision
          </span>
          <span className="font-bold text-[#493568] text-sm block">Identify Policy</span>
          <p className="text-[11px] text-[#5A457D]/80 mt-1">
            Evaluates occupancy, timetable, and comfort thresholds.
          </p>
        </div>

        <div className="p-4 rounded-[18px] bg-[#E4EEF7]/70 border border-[#34628A]/10">
          <span className="text-[10px] font-mono text-[#34628A] font-bold uppercase tracking-wider block mb-1">
            02 · Guardrail
          </span>
          <span className="font-bold text-[#27537A] text-sm block">Safety Check</span>
          <p className="text-[11px] text-[#34628A]/80 mt-1">
            P0/P1 comfort and safety bounds strictly satisfied.
          </p>
        </div>

        <div className="p-4 rounded-[18px] bg-[#DDEBDD]/70 border border-[#2D5A3C]/10">
          <span className="text-[10px] font-mono text-[#2D5A3C] font-bold uppercase tracking-wider block mb-1">
            03 · Action
          </span>
          <span className="font-bold text-[#1F462B] text-sm block">Command Loads</span>
          <p className="text-[11px] text-[#2D5A3C]/80 mt-1">
            Emits setback setpoint or lux-aware lighting deactivation.
          </p>
        </div>

        <div className="p-4 rounded-[18px] bg-white border border-[#27302C]/6 shadow-2xs">
          <span className="text-[10px] font-mono text-[#78817C] font-bold uppercase tracking-wider block mb-1">
            04 · Impact
          </span>
          <span className="font-bold text-[#27302C] text-sm block">Verify Power</span>
          <p className="text-[11px] text-[#78817C] mt-1">
            Validates measured compressor power curtailment.
          </p>
        </div>
      </div>

      {/* Explainable Decision Cards Timeline (Section 13 & 14) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#27302C] tracking-tight px-1">
          Recent Decision Events & Rationale
        </h3>

        {filteredDecisions.map((dec) => (
          <div
            key={dec.id}
            className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs hover:shadow-xs transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#27302C]/5">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-[#27302C]">{dec.room_name}</span>
                <StateBadge state={dec.state} size="sm" />
                <span className="font-mono text-xs text-[#78817C]">{dec.timestamp}</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAE5F5] text-[#5A457D]">
                Priority: {dec.priority}
              </span>
            </div>

            {/* Vertical Flow with Pastel Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              {/* Decision Step (Soft Lavender) */}
              <div className="p-3.5 rounded-[16px] bg-[#EAE5F5]/60 border border-[#5A457D]/10 space-y-1">
                <div className="text-[10px] font-bold text-[#5A457D] uppercase tracking-wider">
                  Decision
                </div>
                <div className="font-bold text-[#493568]">
                  {dec.action.replace(/_/g, ' ')}
                </div>
                <p className="text-[11px] text-[#5A457D]/80">
                  Target: {dec.target}
                </p>
              </div>

              {/* Reason Step (Warm White / Slate) */}
              <div className="p-3.5 rounded-[16px] bg-[#FAFBF9] border border-[#27302C]/6 space-y-1">
                <div className="text-[10px] font-bold text-[#78817C] uppercase tracking-wider">
                  Why?
                </div>
                <p className="text-[11px] text-[#27302C] leading-relaxed">
                  {dec.reason}
                </p>
              </div>

              {/* Guardrail Step (Pale Blue) */}
              <div className="p-3.5 rounded-[16px] bg-[#E4EEF7]/60 border border-[#34628A]/10 space-y-1">
                <div className="text-[10px] font-bold text-[#34628A] uppercase tracking-wider">
                  Guardrail Check
                </div>
                <div className="flex items-center gap-1 font-semibold text-[#27537A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3770A4]" />
                  <span>{dec.guardrail_status}</span>
                </div>
                {dec.guardrail_note && (
                  <p className="text-[10px] text-[#34628A]/80 leading-tight">
                    {dec.guardrail_note}
                  </p>
                )}
              </div>

              {/* Action & Expected Impact (Soft Sage) */}
              {(() => {
                const isLighting =
                  dec.action === 'TURN_OFF_LIGHTS' ||
                  dec.target.toLowerCase().includes('light') ||
                  dec.reason.toLowerCase().includes('lux') ||
                  dec.reason.toLowerCase().includes('light');

                let actionText = `${dec.old_value} → ${dec.new_value}`;
                let impactText = 'Impact: Lower flexible power consumption';
                let badge = 'HVAC Control';

                if (isLighting) {
                  badge = 'Lighting';
                  impactText = 'Impact: 0.3 kW lighting load eliminated';
                  if (dec.old_value.includes('°C') || dec.new_value.includes('°C') || dec.new_value === 'OFF (0W)') {
                    actionText = 'Lights OFF (Lux > 400 / Vacancy Confirmed)';
                  } else {
                    actionText = `${dec.old_value} → ${dec.new_value}`;
                  }
                } else {
                  badge = 'HVAC Closed-Loop';
                  const isSetback = dec.action === 'SET_AC_SETPOINT' || dec.action === 'GRID_DEMAND_SHED';
                  const prefix = isSetback ? 'Setback: ' : dec.action === 'INITIATE_PRE_COOL' ? 'Pre-Cool: ' : '';
                  actionText = `${prefix}${dec.old_value} → ${dec.new_value}`;
                  impactText =
                    dec.action === 'GRID_DEMAND_SHED'
                      ? 'Impact: 1.1 kW grid demand shed'
                      : dec.action === 'INITIATE_PRE_COOL'
                      ? 'Impact: Thermal pre-conditioning'
                      : 'Impact: Lower flexible cooling consumption';
                }

                return (
                  <div className="p-3.5 rounded-[16px] bg-[#DDEBDD]/60 border border-[#2D5A3C]/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold text-[#2D5A3C] uppercase tracking-wider">
                        Action Executed
                      </div>
                      <span className="text-[9px] font-medium text-[#245034] bg-white/70 px-2 py-0.5 rounded-full">
                        {badge}
                      </span>
                    </div>
                    <div className="font-mono font-bold text-[#1F462B] text-xs break-words">
                      {actionText}
                    </div>
                    <p className="text-[10px] text-[#2D5A3C]/80">
                      {impactText}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* Pre-Cooling Estimator Card (Section 20 of Prompt) */}
      <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#34628A]" />
            <h3 className="text-base font-bold text-[#27302C]">Pre-Cooling Lead Time Estimator</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAE5F5] text-[#5A457D]">
            P2 Predictive Lead Time
          </span>
        </div>
        <p className="text-xs text-[#78817C] mb-4">
          Estimates required thermal ramp time from observed cooldown dynamics (0.12°C/min) so rooms are comfortable when students arrive.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#27302C]/4">
            <span className="text-[#78817C] text-[10px] block">Current Temp</span>
            <span className="text-base font-bold text-[#27302C]">26.2°C</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#27302C]/4">
            <span className="text-[#78817C] text-[10px] block">Target Comfort</span>
            <span className="text-base font-bold text-[#27302C]">24.0°C</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#27302C]/4">
            <span className="text-[#78817C] text-[10px] block">Cooldown Rate</span>
            <span className="text-base font-bold text-[#2D5A3C]">0.12°C / min</span>
          </div>
          <div className="p-3 rounded-xl bg-[#E4EEF7]/50 border border-[#34628A]/10">
            <span className="text-[#34628A] text-[10px] block">Required Lead</span>
            <span className="text-base font-bold text-[#27537A]">~20 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};
