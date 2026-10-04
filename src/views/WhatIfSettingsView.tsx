import React from 'react';
import {
  SlidersHorizontal,
  Building,
  Globe,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Server
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { CLIMATE_PROFILES_INFO, BUILDING_CATEGORIES_INFO } from '../data/mockData';
import { ClimateRegion, BuildingCategory } from '../types';

export const WhatIfSettingsView: React.FC = () => {
  const {
    config,
    setClimate,
    setBuildingCategory,
    whatIfParams,
    setWhatIfParams,
    whatIfResults,
    resetSimulation
  } = useSimulation();

  const handleSliderChange = (key: keyof typeof whatIfParams, val: number) => {
    setWhatIfParams((prev) => ({ ...prev, [key]: val }));
  };

  const climateList: ClimateRegion[] = [
    'Hot-Dry',
    'Warm-Humid',
    'Composite',
    'Temperate',
    'Cold',
  ];

  const categoryList: BuildingCategory[] = [
    'College',
    'Office',
    'Hotel',
    'Retail',
    'Hospital',
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#EAE5F5] text-[#5A457D] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Facility Parameters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
            Building Profile & Climate Adaptation
          </h2>
          <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
            Same control engine, dynamically adapted to regional Indian climates and facility types.
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAFBF9] border border-[#27302C]/8 text-[#27302C] text-xs font-medium hover:bg-[#F2F4EE] transition-colors shadow-2xs self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Building Profile Modern Settings Cards (Section 21) */}
      <div className="bg-white rounded-[22px] p-7 border border-[#27302C]/5 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-[#27302C] tracking-tight">
          Building Profile Specifications
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <span className="text-[#78817C] text-[11px] block mb-1">Building Type</span>
            <span className="text-base font-bold text-[#27302C] block">{config.category}</span>
            <span className="text-[10px] text-[#78817C] mt-0.5 block">Academic Block</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <span className="text-[#78817C] text-[11px] block mb-1">Climate Region</span>
            <span className="text-base font-bold text-[#27302C] block">{config.climate}</span>
            <span className="text-[10px] text-[#78817C] mt-0.5 block">Delhi NCR Region</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <span className="text-[#78817C] text-[11px] block mb-1">Building Area</span>
            <span className="text-base font-bold text-[#27302C] block">{config.area_m2.toLocaleString()} m²</span>
            <span className="text-[10px] text-[#78817C] mt-0.5 block">Enclosed Space</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <span className="text-[#78817C] text-[11px] block mb-1">Monitored Rooms</span>
            <span className="text-base font-bold text-[#27302C] block">8 Zones</span>
            <span className="text-[10px] text-[#78817C] mt-0.5 block">Full telemetry</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
            <span className="text-[#78817C] text-[11px] block mb-1">Operating Hours</span>
            <span className="text-base font-bold text-[#27302C] block font-mono">08:00–18:00</span>
            <span className="text-[10px] text-[#78817C] mt-0.5 block">Timetable driven</span>
          </div>
        </div>
      </div>

      {/* Climate Profile Five Small Pastel Pills (Section 22 of Prompt) */}
      <div className="bg-white rounded-[22px] p-7 border border-[#27302C]/5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#34628A]" />
            <h3 className="text-base font-bold text-[#27302C]">Climate Profile Envelope</h3>
          </div>
          <span className="text-xs text-[#78817C]">Select to reconfigure comfort bands</span>
        </div>

        {/* 5 Small Pastel Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {climateList.map((region) => {
            const isSelected = config.climate === region;
            return (
              <button
                key={region}
                onClick={() => setClimate(region)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#DDEBDD] text-[#245034] shadow-2xs border border-[#245034]/20 scale-102'
                    : 'bg-[#F2F4EE] text-[#78817C] hover:text-[#27302C] hover:bg-[#EAECE4]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#78817C] italic pt-1">
          "Control behaviour adapts to the selected climate profile." (Composite: {config.comfort_min_c}°C – {config.comfort_max_c}°C)
        </p>
      </div>

      {/* What-If Sensitivity Scenario Modeler */}
      <div className="bg-white rounded-[22px] p-7 border border-[#27302C]/5 shadow-2xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2D5A3C]" />
            <h3 className="text-base font-bold text-[#27302C]">What-If Simulation Sandbox</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E7F3EC] text-[#245034]">
            Simulated Projections
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 rounded-[20px] bg-[#FAFBF9] border border-[#27302C]/5 text-xs">
          {/* Occupancy */}
          <div>
            <div className="flex justify-between font-medium text-[#27302C] mb-2">
              <span>Occupancy Scale:</span>
              <span className="font-mono font-bold">{(whatIfParams.occupancyFactor * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.1}
              value={whatIfParams.occupancyFactor}
              onChange={(e) => handleSliderChange('occupancyFactor', parseFloat(e.target.value))}
              className="w-full accent-[#27302C] cursor-pointer"
            />
          </div>

          {/* Outdoor Temp Shift */}
          <div>
            <div className="flex justify-between font-medium text-[#27302C] mb-2">
              <span>Outdoor Ambient Shift:</span>
              <span className="font-mono font-bold">{whatIfParams.outdoorTempOffset > 0 ? `+${whatIfParams.outdoorTempOffset}` : whatIfParams.outdoorTempOffset}°C</span>
            </div>
            <input
              type="range"
              min={-5}
              max={5}
              step={1}
              value={whatIfParams.outdoorTempOffset}
              onChange={(e) => handleSliderChange('outdoorTempOffset', parseInt(e.target.value))}
              className="w-full accent-[#27302C] cursor-pointer"
            />
          </div>

          {/* Setback Offset */}
          <div>
            <div className="flex justify-between font-medium text-[#27302C] mb-2">
              <span>Setback Offset:</span>
              <span className="font-mono font-bold">+{whatIfParams.setbackOffsetC.toFixed(1)}°C</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={4.0}
              step={0.5}
              value={whatIfParams.setbackOffsetC}
              onChange={(e) => handleSliderChange('setbackOffsetC', parseFloat(e.target.value))}
              className="w-full accent-[#27302C] cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-[18px] bg-white border border-[#27302C]/6 shadow-2xs">
            <span className="text-[10px] text-[#78817C] block uppercase">Est. Saved</span>
            <span className="text-xl font-bold text-[#2D5A3C]">{whatIfResults.estimatedSavedKwh} kWh</span>
            <span className="text-[11px] text-[#78817C] block mt-0.5">{whatIfResults.estimatedSavingPercent}% reduction</span>
          </div>

          <div className="p-4 rounded-[18px] bg-white border border-[#27302C]/6 shadow-2xs">
            <span className="text-[10px] text-[#78817C] block uppercase">Est. Baseline</span>
            <span className="text-xl font-bold text-[#27302C]">{whatIfResults.estimatedBaselineKwh} kWh</span>
            <span className="text-[11px] text-[#78817C] block mt-0.5">Unmanaged</span>
          </div>

          <div className="p-4 rounded-[18px] bg-white border border-[#27302C]/6 shadow-2xs">
            <span className="text-[10px] text-[#78817C] block uppercase">Comfort Safe</span>
            <span className="text-xl font-bold text-[#5A457D]">{whatIfResults.estimatedComfortCompliance}%</span>
            <span className="text-[11px] text-[#78817C] block mt-0.5">In comfort band</span>
          </div>

          <div className="p-4 rounded-[18px] bg-white border border-[#27302C]/6 shadow-2xs">
            <span className="text-[10px] text-[#78817C] block uppercase">Energy Intensity</span>
            <span className="text-xl font-bold text-[#27302C]">{whatIfResults.estimatedIntensity}</span>
            <span className="text-[11px] text-[#78817C] block mt-0.5">kWh/m²/day</span>
          </div>
        </div>
      </div>
    </div>
  );
};
