import React from 'react';
import {
  Zap,
  Smile,
  Activity,
  Layers,
  Thermometer,
  Wind,
  Lightbulb,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Users,
  Plus,
  LogIn,
  ShieldCheck
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { useAuth } from '../context/AuthContext';
import { KpiCard } from '../components/common/KpiCard';
import { EnergyPerformanceChart } from '../components/charts/EnergyPerformanceChart';
import { LoadBreakdownChart } from '../components/charts/LoadBreakdownChart';
import { StateBadge } from '../components/common/StateBadge';
import { NavTab } from '../components/layout/Sidebar';

interface OverviewViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenRoom: (roomId: string) => void;
  onOpenAddRoom?: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, onOpenRoom, onOpenAddRoom }) => {
  const {
    verification,
    rooms,
    buildingStatus,
  } = useSimulation();

  const { currentUser, isAuthenticated, openLoginModal } = useAuth();

  return (
    <div className="space-y-7">
      {/* 1. Spacious Hero Section with BIG title */}
      <div className="bg-white rounded-[24px] p-7 sm:p-9 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#E7F3EC] text-[#2D5A3C] px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3A8554] animate-pulse" />
            <span>Campus Academic Block · Composite Climate</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight leading-snug">
            {currentUser?.name ? `Good morning, ${currentUser.name}.` : 'Good morning, Building Manager.'}
          </h2>

          <p className="text-sm sm:text-base text-[#78817C] mt-2 leading-relaxed">
            Your building is operating efficiently while keeping occupants comfortable.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onNavigate('decisions')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#27302C] text-white text-xs font-semibold hover:bg-[#3B4641] transition-colors shadow-2xs cursor-pointer"
            >
              <span>Explainable Decisions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('rooms')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2F4EE] text-[#27302C] text-xs font-medium hover:bg-[#EAECE4] transition-colors cursor-pointer"
            >
              <span>Live Zones</span>
            </button>
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#27302C]/10 bg-white text-[#27302C] text-xs font-medium hover:bg-[#FAFBF9] transition-colors cursor-pointer"
              title="Open login window to switch roles or sign in"
            >
              <LogIn className="w-3.5 h-3.5 text-[#2D5A3C]" />
              <span>{isAuthenticated ? 'Switch Account' : 'Login Window'}</span>
            </button>
          </div>
        </div>

        {/* Right: Minimal Abstract Building Graphic in Soft Pastel Shapes + Status */}
        <div className="flex flex-col items-center md:items-end justify-center">
          <div className="p-4 rounded-2xl bg-[#F7F8F5] border border-[#27302C]/4 flex items-center gap-4">
            {/* Abstract building shapes in pastel sage, lavender, and blue */}
            <div className="flex items-end gap-1.5 h-14 px-2">
              <div className="w-4 h-12 bg-[#DDEBDD] rounded-t-lg shadow-2xs" />
              <div className="w-4 h-14 bg-[#EAE5F5] rounded-t-lg shadow-2xs" />
              <div className="w-4 h-9 bg-[#E4EEF7] rounded-t-lg shadow-2xs" />
              <div className="w-4 h-11 bg-[#F8E8DD] rounded-t-lg shadow-2xs" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A3C]">
                <span className="w-2 h-2 rounded-full bg-[#3A8554] animate-ping" />
                <span>SYSTEM OPTIMIZING</span>
              </div>
              <p className="text-[11px] text-[#78817C] mt-0.5">
                8 zones active · 3 in setback
              </p>
              <div className="text-[10px] font-mono text-[#78817C] mt-1">
                Load: 16.9 kW (vs 18.4 kW base)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Primary KPI Cards (Clean, Lots of Whitespace, Pastel Icon Circles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* KPI 1: Energy Saved */}
        <KpiCard
          title="Energy Saved"
          value={`${verification.saved_kwh.toFixed(1)} kWh`}
          subtext="Today's estimated curtailment"
          comparison={`${verification.saving_percent}% below baseline`}
          pastelBg="sage"
          icon={<Zap className="w-4 h-4 text-[#2D5A3C]" />}
        />

        {/* KPI 2: Comfort */}
        <KpiCard
          title="Comfort Compliance"
          value={`${verification.comfort_compliance_percent.toFixed(1)}%`}
          subtext="Occupied time within comfort band"
          comparison="Target ≥ 95%"
          pastelBg="lavender"
          icon={<Smile className="w-4 h-4 text-[#5A457D]" />}
        />

        {/* KPI 3: Peak Demand */}
        <KpiCard
          title="Peak Demand Shed"
          value={`${verification.peak_demand_shed_kw.toFixed(1)} kW`}
          subtext="Flexible load reduced"
          comparison="Grid peak period"
          pastelBg="blue"
          icon={<Activity className="w-4 h-4 text-[#34628A]" />}
        />

        {/* KPI 4: Current Load */}
        <KpiCard
          title="Current Load"
          value={`${buildingStatus.current_optimized_load_kw.toFixed(1)} kW`}
          subtext="3 rooms optimizing"
          comparison="-1.5 kW shift"
          pastelBg="peach"
          icon={<Layers className="w-4 h-4 text-[#8C4F2B]" />}
        />
      </div>

      {/* 3. Building Health Section (3 Horizontal Cards in Soft Lavender, Blue, Yellow) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold text-[#78817C] uppercase tracking-wider">
            Building Environmental Health
          </h3>
          <span className="text-xs text-[#78817C]">Real-time spatial averages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Thermal Comfort Card (Soft Lavender) */}
          <div className="bg-white rounded-[20px] p-5 border border-[#27302C]/5 shadow-2xs flex items-center justify-between hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#EAE5F5] flex items-center justify-center text-[#5A457D]">
                <Thermometer className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <span className="text-xs text-[#78817C] font-medium block">Thermal Comfort</span>
                <span className="text-xl font-bold font-mono text-[#27302C] tabular-nums">24.8°C</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE5F5] text-[#5A457D] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C5AAB]" />
              <span>Comfortable</span>
            </div>
          </div>

          {/* Indoor Air Quality Card (Soft Blue) */}
          <div className="bg-white rounded-[20px] p-5 border border-[#27302C]/5 shadow-2xs flex items-center justify-between hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E4EEF7] flex items-center justify-center text-[#34628A]">
                <Wind className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <span className="text-xs text-[#78817C] font-medium block">Indoor Air Quality</span>
                <span className="text-xl font-bold font-mono text-[#27302C] tabular-nums">680 ppm</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4EEF7] text-[#2C577E] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3770A4]" />
              <span>Good</span>
            </div>
          </div>

          {/* Lighting Card (Soft Yellow) */}
          <div className="bg-white rounded-[20px] p-5 border border-[#27302C]/5 shadow-2xs flex items-center justify-between hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#F7F0D8] flex items-center justify-center text-[#7A641A]">
                <Lightbulb className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <span className="text-xs text-[#78817C] font-medium block">Illumination</span>
                <span className="text-xl font-bold font-mono text-[#27302C] tabular-nums">320 lux</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F0D8] text-[#7A641A] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29D28]" />
              <span>Adequate</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Charts Row: Energy Performance & Load Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <EnergyPerformanceChart />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <LoadBreakdownChart />
        </div>
      </div>

      {/* 5. Live Rooms Section (Alive, Modern Room Cards from Section 10 & 11) */}
      <div className="!mt-3.5 sm:!mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 px-1">
          <div>
            <h3 className="text-base font-bold text-[#27302C] tracking-tight">Live Zone Status</h3>
            <p className="text-xs text-[#78817C] mt-0.5">
              Real-time room occupancy, thermal conditions, and intelligent setbacks
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onOpenAddRoom && (
              <button
                onClick={onOpenAddRoom}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#245034] bg-[#DDEBDD] hover:bg-[#cde0cd] rounded-full transition-all shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Room</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('rooms')}
              className="text-xs font-semibold text-[#2D5A3C] hover:text-[#20402B] flex items-center gap-1 transition-colors px-2 py-1"
            >
              <span>View All Zones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Featured Live Room Cards with Calm Alive Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Room 101 */}
          <div
            onClick={() => onOpenRoom('101')}
            className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base font-bold text-[#27302C]">Room 101</h4>
                  <p className="text-xs text-[#78817C]">Lecture Hall · Floor 1</p>
                </div>
                <StateBadge state="OCCUPIED" size="sm" />
              </div>

              {/* Stats Row */}
              <div className="space-y-2 my-4 text-xs">
                <div className="flex items-center justify-between text-[#78817C]">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Occupancy:
                  </span>
                  <span className="font-semibold text-[#27302C] font-mono">28 people</span>
                </div>
                <div className="flex items-center justify-between text-[#78817C]">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-[#34628A]" /> Temperature:
                  </span>
                  <span className="font-semibold text-[#27302C] font-mono">24.6°C</span>
                </div>
                <div className="flex items-center justify-between text-[#78817C]">
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-[#3A8554]" /> Air Freshness:
                  </span>
                  <span className="font-semibold text-[#27302C] font-mono">680 ppm</span>
                </div>
                <div className="flex items-center justify-between text-[#78817C]">
                  <span>AC / Lights:</span>
                  <span className="font-medium text-[#27302C] flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3A8554] animate-pulse" /> AC 24°C
                    </span>
                    <span>· Lights ON</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#27302C]/5 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-[#27302C]">2.1 kW</span>
              <span className="text-[#3A8554] font-medium text-[11px] bg-[#E7F3EC] px-2.5 py-0.5 rounded-full">
                Normal operation
              </span>
            </div>
          </div>

          {/* Room 102 (Soft Sage Background) */}
          <div
            onClick={() => onOpenRoom('102')}
            className="bg-[#E7F3EC]/70 rounded-[22px] p-6 border border-[#2D5A3C]/10 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base font-bold text-[#245034]">Room 102</h4>
                  <p className="text-xs text-[#2D5A3C]/70">Seminar Room · Floor 1</p>
                </div>
                <StateBadge state="SETBACK_ACTIVE" size="sm" />
              </div>

              {/* Stats Row */}
              <div className="space-y-2 my-4 text-xs">
                <div className="flex items-center justify-between text-[#2D5A3C]/80">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Occupancy:
                  </span>
                  <span className="font-semibold font-mono text-[#245034]">0 people</span>
                </div>
                <div className="flex items-center justify-between text-[#2D5A3C]/80">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5" /> Temperature:
                  </span>
                  <span className="font-semibold font-mono text-[#245034]">25.2°C</span>
                </div>
                <div className="flex items-center justify-between text-[#2D5A3C]/80">
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" /> Air Freshness:
                  </span>
                  <span className="font-semibold font-mono text-[#245034]">540 ppm</span>
                </div>
                <div className="flex items-center justify-between text-[#2D5A3C]/80">
                  <span>AC / Lights:</span>
                  <span className="font-medium text-[#245034]">
                    AC Setback (26.5°C) · Lights OFF
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2D5A3C]/10 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-[#245034]">0.8 kW</span>
              <span className="text-[#245034] font-semibold text-[11px] bg-white/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                Saving energy
              </span>
            </div>
          </div>

          {/* Room 103 (Soft Lavender Background) */}
          <div
            onClick={() => onOpenRoom('103')}
            className="bg-[#EAE5F5]/60 rounded-[22px] p-6 border border-[#5A457D]/10 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base font-bold text-[#493568]">Room 103</h4>
                  <p className="text-xs text-[#5A457D]/70">Classroom · Floor 1</p>
                </div>
                <StateBadge state="PRE_COOLING" size="sm" />
              </div>

              {/* Stats Row */}
              <div className="space-y-2 my-4 text-xs">
                <div className="flex items-center justify-between text-[#5A457D]/80">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Occupancy:
                  </span>
                  <span className="font-semibold font-mono text-[#493568]">0 people</span>
                </div>
                <div className="flex items-center justify-between text-[#5A457D]/80">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5" /> Temperature:
                  </span>
                  <span className="font-semibold font-mono text-[#493568]">26.1°C</span>
                </div>
                <div className="flex items-center justify-between text-[#5A457D]/80">
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" /> Air Freshness:
                  </span>
                  <span className="font-semibold font-mono text-[#493568]">610 ppm</span>
                </div>
                <div className="flex items-center justify-between text-[#5A457D]/80">
                  <span>AC / Lights:</span>
                  <span className="font-medium text-[#493568]">
                    AC Cooling (24°C) · Lights OFF
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#5A457D]/10 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-[#493568]">1.4 kW</span>
              <span className="text-[#5A457D] font-semibold text-[11px] bg-white/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                Next class in 18 min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
