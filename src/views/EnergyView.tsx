import React from 'react';
import {
  Zap,
  TrendingDown,
  Calculator,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { EnergyPerformanceChart } from '../components/charts/EnergyPerformanceChart';
import { LoadBreakdownChart } from '../components/charts/LoadBreakdownChart';
import { KpiCard } from '../components/common/KpiCard';

export const EnergyView: React.FC = () => {
  const { verification, config, updateConfig } = useSimulation();

  const baselineIntensity = (verification.baseline_intensity_kwh_m2 ?? 0.56).toFixed(2);
  const controlledIntensity = (verification.controlled_intensity_kwh_m2 ?? 0.48).toFixed(2);
  const savingPctFormatted = `${verification.saving_percent.toFixed(1)}% lower`;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#DDEBDD] text-[#2D5A3C] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Energy Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
            Energy Performance & Intensity
          </h2>
          <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
            Comparing Autopilot active management against matched unmanaged baseline load profiles.
          </p>
        </div>

        <div className="text-xs text-[#2D5A3C] bg-[#E7F3EC] px-3.5 py-1.5 rounded-full font-semibold">
          {verification.saving_percent.toFixed(1)}% Simulated Energy Reduction
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Baseline Total"
          value={`${verification.baseline_kwh.toFixed(1)} kWh`}
          subtext={`Baseline Intensity: ${baselineIntensity} kWh/m²/day`}
          pastelBg="stone"
        />

        <KpiCard
          title="Controlled Total"
          value={`${verification.controlled_kwh.toFixed(1)} kWh`}
          subtext={`Controlled Intensity: ${controlledIntensity} kWh/m²/day`}
          comparison={savingPctFormatted}
          pastelBg="sage"
        />

        <KpiCard
          title="Energy Saved"
          value={`${verification.saved_kwh.toFixed(1)} kWh`}
          subtext="Estimated net reduction"
          comparison={`${verification.saved_kwh.toFixed(1)} kWh today (${verification.saving_percent.toFixed(1)}%)`}
          pastelBg="sage"
          icon={<Zap className="w-4 h-4 text-[#2D5A3C]" />}
        />

        <KpiCard
          title="Peak Demand Shed"
          value={`${verification.peak_demand_shed_kw.toFixed(1)} kW`}
          subtext="Grid peak curtailment"
          comparison="Peak hours"
          pastelBg="blue"
          icon={<TrendingDown className="w-4 h-4 text-[#34628A]" />}
        />
      </div>

      {/* Dedicated Energy Intensity Indicator Bar (Request 3) */}
      <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#27302C]/5 shadow-[0_2px_14px_-2px_rgba(39,48,44,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#E4EEF7] text-[#2C577E] flex items-center justify-center shrink-0 shadow-2xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-[#27302C] tracking-tight">
                Intensity: {controlledIntensity} kWh/m²/day (Building Energy Intensity)
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#E7F3EC] text-[#245034] font-semibold">
                {savingPctFormatted}
              </span>
            </div>
            <p className="text-xs text-[#78817C] mt-1">
              Normalized daily energy footprint: <strong className="text-[#27302C]">Baseline {baselineIntensity} kWh/m²/day</strong> reduced to <strong className="text-[#2D5A3C]">{controlledIntensity} kWh/m²/day</strong> under Autopilot load steering.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto shrink-0 bg-[#FAFBF9] px-4 py-2.5 rounded-2xl border border-[#27302C]/6 text-xs font-mono">
          <div className="text-right">
            <span className="text-[10px] text-[#78817C] uppercase tracking-wider block">Baseline Intensity</span>
            <span className="text-sm font-bold text-[#78817C] tabular-nums">{baselineIntensity} <span className="text-[10px]">kWh/m²/d</span></span>
          </div>
          <div className="h-7 w-px bg-[#27302C]/10" />
          <div className="text-right">
            <span className="text-[10px] text-[#2D5A3C] uppercase tracking-wider font-semibold block">Controlled Intensity</span>
            <span className="text-sm font-bold text-[#2D5A3C] tabular-nums">{controlledIntensity} <span className="text-[10px]">kWh/m²/d</span></span>
          </div>
        </div>
      </div>

      {/* Energy Performance Line Chart */}
      <EnergyPerformanceChart />

      {/* Load Breakdown & Energy Intensity Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoadBreakdownChart />

        {/* Building Energy Intensity (BEI) Card */}
        <div className="bg-white rounded-[22px] p-7 border border-[#27302C]/5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#34628A]" />
                <h3 className="text-base font-bold text-[#27302C]">
                  Building Energy Intensity (BEI)
                </h3>
              </div>
              <span className="text-xs font-mono bg-[#E4EEF7] text-[#2C577E] px-2.5 py-0.5 rounded-full font-medium">
                Total kWh / Area m²
              </span>
            </div>
            <p className="text-xs text-[#78817C] mb-5">
              Standardized daily energy consumption normalized by gross floor area.
            </p>

            <div className="bg-[#FAFBF9] rounded-[18px] p-5 border border-[#27302C]/5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#78817C]">Daily Controlled Consumption:</span>
                <span className="font-mono font-bold text-[#27302C] text-sm">
                  {verification.controlled_kwh.toFixed(1)} kWh
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label htmlFor="area-input" className="text-[#78817C]">
                  Building Floor Area:
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id="area-input"
                    type="number"
                    min={500}
                    max={50000}
                    step={100}
                    value={config.area_m2}
                    onChange={(e) => updateConfig({ area_m2: Math.max(100, Number(e.target.value)) })}
                    className="w-24 px-3 py-1 text-xs font-mono font-bold bg-white border border-[#27302C]/10 rounded-full text-right text-[#27302C] focus:outline-hidden focus:ring-1 focus:ring-[#27302C]/20 shadow-2xs"
                  />
                  <span className="text-[#78817C] font-mono text-xs">m²</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#27302C]/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#27302C] block">
                    Calculated Energy Intensity:
                  </span>
                  <span className="text-[11px] text-[#78817C]">Daily normalized indicator</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-[#2D5A3C] tabular-nums">
                    {(verification.controlled_kwh / config.area_m2).toFixed(4)}
                  </div>
                  <span className="text-[11px] text-[#78817C]">kWh / m² / day</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#78817C] mt-4 pt-3 border-t border-[#27302C]/5 italic">
            * Matched baseline-versus-controlled simulation under identical environmental conditions. Does not claim IPMVP protocol certification.
          </p>
        </div>
      </div>
    </div>
  );
};
