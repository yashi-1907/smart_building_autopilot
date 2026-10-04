import React from 'react';
import {
  Lightbulb,
  Zap,
  Smile,
  Activity,
  Wrench,
  Layers,
  ArrowRight,
  Radio,
  ShieldCheck
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const InsightsRetrofitView: React.FC = () => {
  const insightsList = [
    {
      category: 'Energy',
      title: 'Prolonged Vacancy Waste Curtailed',
      desc: 'Room 204 had 3 prolonged vacancy periods today. Autopilot setback saved 1.9 kWh of wasted cooling.',
      icon: <Zap className="w-4 h-4 text-[#2D5A3C]" />,
      bg: 'bg-[#DDEBDD]',
      tagBg: 'bg-[#E7F3EC] text-[#245034]',
    },
    {
      category: 'Comfort',
      title: 'High Thermal Comfort Preservation',
      desc: '96.4% of occupied time remained strictly within the configured comfort band (23.5°C – 26.0°C).',
      icon: <Smile className="w-4 h-4 text-[#5A457D]" />,
      bg: 'bg-[#EAE5F5]',
      tagBg: 'bg-[#EAE5F5] text-[#5A457D]',
    },
    {
      category: 'Grid',
      title: 'Peak-Period Cooling Relaxation',
      desc: 'Peak-period control reduced flexible demand by 0.8 kW (1.1 kW peak shed) during simulated tariff peak hours.',
      icon: <Activity className="w-4 h-4 text-[#2C577E]" />,
      bg: 'bg-[#E4EEF7]',
      tagBg: 'bg-[#E4EEF7] text-[#2C577E]',
    },
    {
      category: 'Equipment',
      title: 'HVAC Unit Response Discrepancy',
      desc: 'Room 204 showed slower-than-expected HVAC response after setpoint command. Contact inspection suggested.',
      icon: <Wrench className="w-4 h-4 text-[#8C4F2B]" />,
      bg: 'bg-[#F8E8DD]',
      tagBg: 'bg-[#F8E8DD] text-[#8C4F2B]',
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)]">
        <div className="inline-flex items-center gap-2 bg-[#F7F0D8] text-[#7A641A] px-3 py-1 rounded-full text-xs font-semibold mb-2">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Actionable Intelligence</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
          Today's Insights & Retrofit Blueprint
        </h2>
        <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
          Concrete facility observations and the non-invasive hardware retrofit methodology.
        </p>
      </div>

      {/* Today's Insights Section (Section 20 of Prompt) */}
      <div>
        <h3 className="text-sm font-bold text-[#27302C] tracking-tight mb-4 px-1">
          Today's Key Building Insights
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {insightsList.map((item) => (
            <div
              key={item.category}
              className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${item.tagBg}`}>
                    {item.category}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg}`}>
                    {item.icon}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#27302C] mb-2 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-[#78817C] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#27302C]/5 text-[11px] text-[#2D5A3C] font-semibold">
                Actionable Recommendation →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Invasive Retrofit Architecture Schematic (Section 28) */}
      <div className="bg-white rounded-[24px] p-8 border border-[#27302C]/5 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2D5A3C]" />
            <h3 className="text-base font-bold text-[#27302C]">Retrofit Architecture Schematic</h3>
          </div>
          <p className="text-xs text-[#78817C] mt-1 leading-relaxed">
            "We don't replace the building. We add intelligence to what already exists."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 text-xs">
          <div className="p-5 rounded-[20px] bg-[#FAFBF9] border border-[#27302C]/5 space-y-2">
            <span className="text-[10px] font-mono text-[#78817C] uppercase font-bold tracking-wider">
              Layer 1
            </span>
            <div className="font-bold text-[#27302C] text-sm">Existing Assets</div>
            <p className="text-[#78817C] text-xs leading-relaxed">
              Existing split & cassette air conditioners, 230V lighting circuits, and distribution boards. Zero infrastructure replacement.
            </p>
          </div>

          <div className="p-5 rounded-[20px] bg-[#E7F3EC]/70 border border-[#245034]/10 space-y-2">
            <span className="text-[10px] font-mono text-[#245034] uppercase font-bold tracking-wider">
              Layer 2
            </span>
            <div className="font-bold text-[#1E4B2C] text-sm">Lightweight Sensing</div>
            <p className="text-[#2D5A3C]/90 text-xs leading-relaxed">
              Plug-and-play PIR occupancy sensors, temperature/humidity probes, lux photodiodes, and non-invasive split AC controllers.
            </p>
          </div>

          <div className="p-5 rounded-[20px] bg-[#EAE5F5]/70 border border-[#5A457D]/10 space-y-2">
            <span className="text-[10px] font-mono text-[#5A457D] uppercase font-bold tracking-wider">
              Layer 3
            </span>
            <div className="font-bold text-[#493568] text-sm">Building Autopilot</div>
            <p className="text-[#5A457D]/90 text-xs leading-relaxed">
              Deterministic finite state machine (FSM), comfort guardrails, thermal pre-cooling estimation, and verified energy savings.
            </p>
          </div>
        </div>
      </div>

      {/* Future Physical Deployment Hardware Roadmap (Section 29) */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#78817C]" />
            <h3 className="text-base font-bold text-[#27302C]">Future Physical Hardware Flow</h3>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#FAFBF9] border border-[#27302C]/8 text-[#78817C]">
            Prototype Phase: Software-in-the-Loop
          </span>
        </div>

        <div className="p-4 rounded-[18px] bg-[#FAFBF9] border border-[#27302C]/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center font-medium">
            <div className="p-3 bg-white rounded-xl border border-[#27302C]/6 flex-1 w-full text-[#27302C]">
              PIR + Temp / RH Sensor
            </div>
            <span className="text-[#78817C] hidden sm:inline">→</span>
            <div className="p-3 bg-white rounded-xl border border-[#27302C]/6 flex-1 w-full text-[#27302C]">
              ESP32 Microcontroller
            </div>
            <span className="text-[#78817C] hidden sm:inline">→</span>
            <div className="p-3 bg-white rounded-xl border border-[#27302C]/6 flex-1 w-full text-[#27302C]">
              Building Autopilot Server
            </div>
            <span className="text-[#78817C] hidden sm:inline">→</span>
            <div className="p-3 bg-white rounded-xl border border-[#27302C]/6 flex-1 w-full text-[#27302C]">
              IR Blaster Controller
            </div>
            <span className="text-[#78817C] hidden sm:inline">→</span>
            <div className="p-3 bg-[#E7F3EC] rounded-xl border border-[#245034]/15 flex-1 w-full font-bold text-[#245034]">
              Existing Split AC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
