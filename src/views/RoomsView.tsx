import React, { useState } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  Thermometer,
  Wind,
  Zap,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { StateBadge } from '../components/common/StateBadge';
import { RoomState } from '../types';

interface RoomsViewProps {
  onOpenRoom: (roomId: string) => void;
  onOpenAddRoom?: () => void;
}

export const RoomsView: React.FC<RoomsViewProps> = ({ onOpenRoom, onOpenAddRoom }) => {
  const { rooms, config } = useSimulation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<RoomState | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.room_id.includes(searchQuery) ||
      r.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'ALL' || r.state === selectedState;
    return matchesSearch && matchesState;
  });

  const stateFilters: { label: string; value: RoomState | 'ALL'; count: number }[] = [
    { label: 'All Rooms', value: 'ALL', count: rooms.length },
    { label: 'Occupied', value: 'OCCUPIED', count: rooms.filter((r) => r.state === 'OCCUPIED').length },
    { label: 'Setback', value: 'SETBACK_ACTIVE', count: rooms.filter((r) => r.state === 'SETBACK_ACTIVE').length },
    { label: 'Pre-Cooling', value: 'PRE_COOLING', count: rooms.filter((r) => r.state === 'PRE_COOLING').length },
    { label: 'Standby', value: 'SHUTDOWN_STANDBY', count: rooms.filter((r) => r.state === 'SHUTDOWN_STANDBY').length },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Bar */}
      <div className="bg-white rounded-[22px] p-5 border border-[#27302C]/5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#78817C] absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by zone name, number, or wing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAFBF9] border border-[#27302C]/6 rounded-full focus:outline-hidden focus:ring-1 focus:ring-[#27302C]/20 text-[#27302C] placeholder-[#78817C]/60"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onOpenAddRoom && (
              <button
                onClick={onOpenAddRoom}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#245034] bg-[#DDEBDD] hover:bg-[#cde0cd] rounded-full transition-all shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Room</span>
              </button>
            )}

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#F2F4EE] rounded-full">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'grid' ? 'bg-white text-[#27302C] shadow-2xs' : 'text-[#78817C]'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'table' ? 'bg-white text-[#27302C] shadow-2xs' : 'text-[#78817C]'
                }`}
                aria-label="Table view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* State Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {stateFilters.map((sf) => (
            <button
              key={sf.value}
              onClick={() => setSelectedState(sf.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedState === sf.value
                  ? 'bg-[#27302C] text-white font-semibold shadow-2xs'
                  : 'bg-[#F2F4EE] text-[#78817C] hover:text-[#27302C]'
              }`}
            >
              <span>{sf.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedState === sf.value ? 'bg-[#3B4641] text-white' : 'bg-white text-[#78817C]'
              }`}>
                {sf.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredRooms.map((room) => {
            const isSetback = room.state === 'SETBACK_ACTIVE';
            const isPreCool = room.state === 'PRE_COOLING';
            const cardBg = isSetback
              ? 'bg-[#E7F3EC]/70 border-[#2D5A3C]/10'
              : isPreCool
              ? 'bg-[#EAE5F5]/60 border-[#5A457D]/10'
              : 'bg-white border-[#27302C]/5';

            return (
              <div
                key={room.room_id}
                onClick={() => onOpenRoom(room.room_id)}
                className={`rounded-[22px] p-6 border shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between ${cardBg}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#78817C] block">
                        F{room.floor} · {room.zone}
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
                        <Users className="w-3.5 h-3.5" /> Occupancy:
                      </span>
                      <span className="font-semibold text-[#27302C] font-mono">
                        {room.occupancy} / {room.capacity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#78817C]">
                      <span className="flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-[#34628A]" /> Temperature:
                      </span>
                      <span className="font-semibold text-[#27302C] font-mono">
                        {room.temperature.toFixed(1)}°C
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#78817C]">
                      <span className="flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-[#3A8554]" /> Air (CO₂):
                      </span>
                      <span className="font-semibold text-[#27302C] font-mono">
                        {room.co2} ppm
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#78817C]">
                      <span>AC Setpoint:</span>
                      <span className="font-mono font-medium text-[#27302C]">
                        {room.ac_setpoint}°C
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#27302C]/5 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#27302C]">{room.power_kw} kW</span>
                  <span className="text-[#2D5A3C] text-[11px] font-semibold flex items-center gap-1">
                    Details <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-[22px] border border-[#27302C]/5 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] border-b border-[#27302C]/5 text-[#78817C] font-semibold">
                <tr>
                  <th className="py-3 px-5">Room</th>
                  <th className="py-3 px-3">State</th>
                  <th className="py-3 px-3">Occupancy</th>
                  <th className="py-3 px-3">Temperature</th>
                  <th className="py-3 px-3">CO₂</th>
                  <th className="py-3 px-3">AC Setpoint</th>
                  <th className="py-3 px-3">Lighting</th>
                  <th className="py-3 px-3 text-right">Power Draw</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27302C]/4">
                {filteredRooms.map((room) => (
                  <tr
                    key={room.room_id}
                    onClick={() => onOpenRoom(room.room_id)}
                    className="hover:bg-[#FAFBF9] cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-5 font-bold text-[#27302C]">
                      {room.name.trim().toLowerCase() === 'gg' ? 'Conference Room 105' : room.name}
                    </td>
                    <td className="py-3 px-3"><StateBadge state={room.state} size="sm" /></td>
                    <td className="py-3 px-3 font-mono">{room.occupancy} / {room.capacity}</td>
                    <td className="py-3 px-3 font-mono font-semibold">{room.temperature}°C</td>
                    <td className="py-3 px-3 font-mono">{room.co2} ppm</td>
                    <td className="py-3 px-3 font-mono">{room.ac_setpoint}°C</td>
                    <td className="py-3 px-3 text-[#78817C]">{room.lighting_status}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#2D5A3C]">{room.power_kw} kW</td>
                    <td className="py-3 px-5 text-right">
                      <span className="text-xs font-semibold text-[#2D5A3C]">Inspect →</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
