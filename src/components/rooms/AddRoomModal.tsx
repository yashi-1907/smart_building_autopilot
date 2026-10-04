import React, { useState } from 'react';
import { X, Plus, ShieldCheck, DoorOpen, Users, Thermometer, Building } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { RoomTelemetry } from '../../types';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({ isOpen, onClose }) => {
  const { addNewRoom, rooms } = useSimulation();

  // Compute default next room number
  const existingIds = rooms.map((r) => parseInt(r.room_id, 10)).filter((n) => !isNaN(n));
  const defaultNextId = existingIds.length > 0 ? String(Math.max(...existingIds) + 1) : '105';

  const [roomId, setRoomId] = useState<string>(defaultNextId);
  const [name, setName] = useState<string>('');
  const [floor, setFloor] = useState<number>(1);
  const [zone, setZone] = useState<string>('East Wing');
  const [type, setType] = useState<RoomTelemetry['type']>('Classroom');
  const [capacity, setCapacity] = useState<number>(35);
  const [occupancy, setOccupancy] = useState<number>(0);
  const [targetSetpoint, setTargetSetpoint] = useState<number>(24.5);
  const [critical, setCritical] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || `${type} ${roomId}`;
    addNewRoom({
      room_id: roomId.trim() || defaultNextId,
      name: finalName,
      floor: Number(floor) || 1,
      zone,
      type,
      capacity: Number(capacity) || 30,
      occupancy: Number(occupancy) || 0,
      ac_setpoint: Number(targetSetpoint) || 24.5,
      critical,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="bg-white rounded-[24px] max-w-lg w-full border border-[#27302C]/10 shadow-[0_12px_36px_-6px_rgba(39,48,44,0.12)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#27302C]/5 flex items-center justify-between bg-[#FAFBF9]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DDEBDD] text-[#245034] flex items-center justify-center font-bold">
              <DoorOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#27302C]">Add New Room</h2>
              <p className="text-xs text-[#78817C] mt-0.5">
                Enroll a new physical zone into Autopilot closed-loop intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78817C] hover:text-[#27302C] hover:bg-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Room ID */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">
                Room ID / Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="e.g. 105"
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] font-mono focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              />
            </div>

            {/* Room Name */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tutorial Room 105"
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Floor */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">Floor</label>
              <select
                value={floor}
                onChange={(e) => setFloor(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              >
                <option value={1}>Floor 1</option>
                <option value={2}>Floor 2</option>
                <option value={3}>Floor 3</option>
              </select>
            </div>

            {/* Zone / Wing */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">Wing Zone</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              >
                <option value="East Wing">East Wing</option>
                <option value="West Wing">West Wing</option>
                <option value="North Wing">North Wing</option>
                <option value="Central Core">Central Core</option>
                <option value="South Wing">South Wing</option>
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as RoomTelemetry['type'])}
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              >
                <option value="Classroom">Classroom</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Faculty Office">Faculty Office</option>
                <option value="Seminar Hall">Seminar Hall</option>
                <option value="Auditorium">Auditorium</option>
                <option value="Library Zone">Library Zone</option>
                <option value="Conference">Conference</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Seating Capacity */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">Capacity</label>
              <input
                type="number"
                min={1}
                max={500}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] font-mono focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              />
            </div>

            {/* Initial Occupancy */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">Initial Occupants</label>
              <input
                type="number"
                min={0}
                max={capacity}
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] font-mono focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              />
            </div>

            {/* AC Setpoint */}
            <div>
              <label className="block text-[#27302C] font-semibold mb-1">Target Temp (°C)</label>
              <input
                type="number"
                step="0.5"
                min={20}
                max={28}
                value={targetSetpoint}
                onChange={(e) => setTargetSetpoint(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-[#27302C] font-mono focus:outline-hidden focus:ring-1 focus:ring-[#A7D7B5]"
              />
            </div>
          </div>

          {/* Critical Protected Load toggle */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#27302C]/6 flex items-start gap-3">
            <input
              type="checkbox"
              id="critical-checkbox"
              checked={critical}
              onChange={(e) => setCritical(e.target.checked)}
              className="mt-0.5 accent-[#2D5A3C] w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="critical-checkbox" className="cursor-pointer select-none">
              <div className="font-semibold text-[#27302C] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#27537A]" />
                <span>Mark as Critical Protected Load (P0)</span>
              </div>
              <p className="text-[11px] text-[#78817C] mt-0.5 leading-relaxed">
                Exempts this room from automated vacancy setback and peak-grid shedding (ideal for Server Labs, Cold Storage, or Clinical suites).
              </p>
            </label>
          </div>

          {/* Footer action buttons */}
          <div className="pt-4 border-t border-[#27302C]/5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#78817C] hover:text-[#27302C] bg-[#F2F4EE] hover:bg-[#e6e8e2] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-[#245034] bg-[#DDEBDD] hover:bg-[#cbe0cb] rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Room in Autopilot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
