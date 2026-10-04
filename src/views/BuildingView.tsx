import React, { useState } from 'react';
import {
  Building2,
  Thermometer,
  Zap,
  Users,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { StateBadge } from '../components/common/StateBadge';

interface BuildingViewProps {
  onOpenRoom: (roomId: string) => void;
  onOpenAddRoom?: () => void;
}

export const BuildingView: React.FC<BuildingViewProps> = ({ onOpenRoom, onOpenAddRoom }) => {
  const { buildingStatus, config, rooms } = useSimulation();
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');

  const filteredRooms = rooms.filter(
    (r) => selectedFloor === 'all' || r.floor === selectedFloor
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-[24px] p-7 border border-[#27302C]/5 shadow-[0_2px_16px_-2px_rgba(39,48,44,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#DDEBDD] text-[#2D5A3C] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Campus Academic Block</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27302C] tracking-tight">
            Building Spatial Layout
          </h2>
          <p className="text-xs sm:text-sm text-[#78817C] mt-1.5 leading-relaxed">
            Floor-by-floor thermal zone allocation and flexible vs. critical load mapping.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          {onOpenAddRoom && (
            <button
              onClick={onOpenAddRoom}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#245034] bg-[#DDEBDD] hover:bg-[#cde0cd] rounded-full transition-all shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Room</span>
            </button>
          )}

          {/* Floor Selection Pills */}
          <div className="flex items-center gap-1 p-1 bg-[#F2F4EE] rounded-full">
            {(['all', 1, 2, 3] as const).map((fl) => (
              <button
                key={fl}
              onClick={() => setSelectedFloor(fl)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                selectedFloor === fl
                  ? 'bg-white text-[#27302C] shadow-2xs font-semibold'
                  : 'text-[#78817C] hover:text-[#27302C]'
              }`}
            >
              {fl === 'all' ? 'All Floors' : `Floor ${fl}`}
            </button>
            ))}
          </div>
        </div>
      </div>

      {/* Building Spatial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredRooms.map((room) => (
          <div
            key={room.room_id}
            onClick={() => onOpenRoom(room.room_id)}
            className="bg-white rounded-[22px] p-6 border border-[#27302C]/5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#78817C]">
                    Floor {room.floor} · {room.zone}
                  </span>
                  <h4 className="text-base font-bold text-[#27302C] leading-snug">
                    {room.name.trim().toLowerCase() === 'gg' ? 'Conference Room 105' : room.name}
                  </h4>
                </div>
                <StateBadge state={room.state} size="sm" />
              </div>

              <div className="space-y-2 my-4 text-xs">
                <div className="flex items-center justify-between text-[#78817C]">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-[#34628A]" /> Temp:
                  </span>
                  <span className="font-semibold text-[#27302C] font-mono">
                    {room.temperature}°C ({room.ac_setpoint}°C)
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#78817C]">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Occupants:
                  </span>
                  <span className="font-mono text-[#27302C]">
                    {room.occupancy} / {room.capacity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#78817C]">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#3A8554]" /> Current Draw:
                  </span>
                  <span className="font-mono font-bold text-[#2D5A3C]">
                    {room.power_kw} kW
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#27302C]/5 flex items-center justify-between text-xs">
              {room.critical ? (
                <span className="text-[#2C577E] text-[11px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Critical Protected
                </span>
              ) : (
                <span className="text-[#2D5A3C] text-[11px] font-medium">
                  Flexible Load Zone
                </span>
              )}
              <span className="text-[#78817C] text-[11px]">Inspect →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
