import React from 'react';
import {
  X,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Users,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { StateBadge } from '../common/StateBadge';
import { TemperatureComfortChart } from '../charts/TemperatureComfortChart';
import { OccupancyChart } from '../charts/OccupancyChart';
import { SAMPLE_TIMELINE_101 } from '../../data/mockData';

interface RoomDetailModalProps {
  onClose: () => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ onClose }) => {
  const { selectedRoom, config, updateRoomManualAction } = useSimulation();

  if (!selectedRoom) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#27302C]/25 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="bg-[#F7F8F5] rounded-[26px] max-w-4xl w-full border border-[#27302C]/8 shadow-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 py-5 bg-white border-b border-[#27302C]/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-[#27302C]">
                  {selectedRoom.name.trim().toLowerCase() === 'gg' ? 'Conference Room 105' : selectedRoom.name}
                </h2>
                <StateBadge state={selectedRoom.state} size="md" />
                {selectedRoom.critical && (
                  <span className="text-[11px] font-semibold text-[#2C577E] bg-[#E4EEF7] px-2.5 py-0.5 rounded-full">
                    Critical Protected
                  </span>
                )}
              </div>
              <p className="text-xs text-[#78817C] mt-0.5">
                Floor {selectedRoom.floor} · {selectedRoom.zone} · {selectedRoom.type}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#78817C] hover:text-[#27302C] hover:bg-[#F2F4EE] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-7 overflow-y-auto space-y-6">
          {/* Live Telemetry Grid */}
          <div>
            <h3 className="text-xs font-semibold text-[#78817C] uppercase tracking-wider mb-3">
              Live Sensor Telemetry
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
              {/* Temperature */}
              <div className="bg-white rounded-[18px] p-4 border border-[#27302C]/5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-[#78817C] mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#34628A]" />
                  <span>Temperature</span>
                </div>
                <div className="text-xl font-bold text-[#27302C] font-mono tabular-nums">
                  {selectedRoom.temperature.toFixed(1)}°C
                </div>
                <div className="text-[11px] text-[#78817C] mt-0.5">
                  Target: {selectedRoom.ac_setpoint.toFixed(1)}°C
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white rounded-[18px] p-4 border border-[#27302C]/5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-[#78817C] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-[#3770A4]" />
                  <span>Humidity</span>
                </div>
                <div className="text-xl font-bold text-[#27302C] font-mono tabular-nums">
                  {selectedRoom.humidity}%
                </div>
                <div className="text-[11px] text-[#78817C] mt-0.5">Target: 40–60%</div>
              </div>

              {/* CO2 */}
              <div className="bg-white rounded-[18px] p-4 border border-[#27302C]/5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-[#78817C] mb-1">
                  <Wind className="w-3.5 h-3.5 text-[#3A8554]" />
                  <span>Air (CO₂)</span>
                </div>
                <div className="text-xl font-bold text-[#27302C] font-mono tabular-nums">
                  {selectedRoom.co2} ppm
                </div>
                <div className="text-[11px] text-[#78817C] mt-0.5">Limit: {config.co2_threshold_ppm} ppm</div>
              </div>

              {/* Lux */}
              <div className="bg-white rounded-[18px] p-4 border border-[#27302C]/5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-[#78817C] mb-1">
                  <Sun className="w-3.5 h-3.5 text-[#C29D28]" />
                  <span>Illuminance</span>
                </div>
                <div className="text-xl font-bold text-[#27302C] font-mono tabular-nums">
                  {selectedRoom.lux} lux
                </div>
                <div className="text-[11px] text-[#78817C] mt-0.5">Lights: {selectedRoom.lighting_status}</div>
              </div>

              {/* Power */}
              <div className="bg-white rounded-[18px] p-4 border border-[#27302C]/5 shadow-2xs col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-[#78817C] mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#2D5A3C]" />
                  <span>Active Power</span>
                </div>
                <div className="text-xl font-bold text-[#2D5A3C] font-mono tabular-nums">
                  {selectedRoom.power_kw} kW
                </div>
                <div className="text-[11px] text-[#78817C] mt-0.5">Base: {selectedRoom.baseline_power_kw} kW</div>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-[20px] border border-[#27302C]/5 shadow-2xs text-xs">
            <div className="flex items-center gap-3">
              {selectedRoom.equipment_response === 'NORMAL' ? (
                <span className="flex items-center gap-1.5 text-[#2D5A3C] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#3A8554]" /> Normal Telemetry Response
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#8C4F2B] font-semibold">
                  <AlertTriangle className="w-4 h-4 text-[#C26B33]" /> Telemetry Check Required
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateRoomManualAction(selectedRoom.room_id, 'OPTIMIZE')}
                className="px-3 py-1.5 rounded-full bg-[#DDEBDD] text-[#245034] font-semibold hover:bg-[#D2E4D2] transition-colors"
              >
                Trigger Setback
              </button>
              <button
                onClick={() => updateRoomManualAction(selectedRoom.room_id, 'OVERRIDE_COMFORT')}
                className="px-3 py-1.5 rounded-full bg-[#EAE5F5] text-[#5A457D] font-semibold hover:bg-[#DFD8EE] transition-colors"
              >
                Restore 24°C
              </button>
              <button
                onClick={() => updateRoomManualAction(selectedRoom.room_id, 'TOGGLE_LIGHTS')}
                className="px-3 py-1.5 rounded-full bg-[#F2F4EE] text-[#27302C] font-medium hover:bg-[#EAECE4] transition-colors"
              >
                Toggle Lights
              </button>
            </div>
          </div>

          {/* FSM State Timeline */}
          <div className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs space-y-3">
            <h3 className="text-xs font-semibold text-[#78817C] uppercase tracking-wider">
              Room FSM State Machine Progression
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2 text-xs">
              {SAMPLE_TIMELINE_101.map((item) => (
                <div key={item.time} className="p-3 rounded-[16px] bg-[#FAFBF9] border border-[#27302C]/5 space-y-1">
                  <div className="font-mono font-bold text-[#27302C] text-[11px]">{item.time}</div>
                  <StateBadge state={item.state} size="sm" />
                  <p className="text-[10px] text-[#78817C] leading-tight pt-1">
                    {item.actionSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Temperature & Comfort Band Chart */}
          <TemperatureComfortChart
            currentTemp={selectedRoom.temperature}
            roomName={selectedRoom.name}
          />

          {/* Occupancy Profile Chart */}
          <OccupancyChart
            roomName={selectedRoom.name}
            peakOccupancy={selectedRoom.capacity}
            averageOccupancy={Math.round(selectedRoom.capacity * 0.6)}
          />
        </div>

        {/* Footer */}
        <div className="px-7 py-4 bg-white border-t border-[#27302C]/5 flex items-center justify-between text-xs text-[#78817C]">
          <span>Virtual Node #{selectedRoom.room_id}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#27302C] text-white text-xs font-medium hover:bg-[#3B4641] transition-colors shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
