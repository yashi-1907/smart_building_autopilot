import React, { useState } from 'react';
import { X, Bell, Wind, Zap, Wrench, ShieldAlert, AlertTriangle, Info, Check } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertItem } from '../../types';

interface AlertDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertDrawer: React.FC<AlertDrawerProps> = ({ isOpen, onClose }) => {
  const { alerts, markAlertRead, markAllAlertsRead } = useSimulation();
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter((alert) => {
    if (filterType === 'unread') return !alert.read;
    if (filterType === 'all') return true;
    return alert.type === filterType;
  });

  const getAlertStyle = (type: AlertItem['type']) => {
    switch (type) {
      case 'IAQ':
        return {
          bg: 'bg-[#F8E8DD]',
          border: 'border-[#8C4F2B]/15',
          text: 'text-[#6D391A]',
          icon: <Wind className="w-4 h-4 text-[#8C4F2B]" />,
        };
      case 'GRID':
        return {
          bg: 'bg-[#E4EEF7]',
          border: 'border-[#34628A]/15',
          text: 'text-[#27537A]',
          icon: <Zap className="w-4 h-4 text-[#2C577E]" />,
        };
      case 'EQUIPMENT':
        return {
          bg: 'bg-[#F8E8DD]',
          border: 'border-[#8C4F2B]/15',
          text: 'text-[#6D391A]',
          icon: <Wrench className="w-4 h-4 text-[#8C4F2B]" />,
        };
      case 'SAFETY':
        return {
          bg: 'bg-[#EAE5F5]',
          border: 'border-[#5A457D]/15',
          text: 'text-[#493568]',
          icon: <ShieldAlert className="w-4 h-4 text-[#5A457D]" />,
        };
      case 'ENERGY_WASTE':
      default:
        return {
          bg: 'bg-[#E7F3EC]',
          border: 'border-[#245034]/15',
          text: 'text-[#1E4B2C]',
          icon: <Info className="w-4 h-4 text-[#2D5A3C]" />,
        };
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-[#27302C]/20 backdrop-blur-2xs"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAFBF9] border-l border-[#27302C]/8 shadow-xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-[#27302C]/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#27302C]" />
              <h2 className="text-sm font-bold text-[#27302C]">System Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#78817C] hover:text-[#27302C] hover:bg-[#F2F4EE] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="px-6 py-3 bg-[#FAFBF9] border-b border-[#27302C]/5 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['all', 'unread', 'IAQ', 'GRID', 'EQUIPMENT'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                    filterType === f
                      ? 'bg-[#27302C] text-white shadow-2xs font-semibold'
                      : 'bg-[#F2F4EE] text-[#78817C] hover:text-[#27302C]'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'unread' ? 'Unread' : f}
                </button>
              ))}
            </div>

            <button
              onClick={markAllAlertsRead}
              className="text-[11px] font-medium text-[#2D5A3C] hover:underline whitespace-nowrap"
            >
              Clear unread
            </button>
          </div>

          {/* Alert Cards List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-16 text-[#78817C] text-xs">
                No notifications to display.
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const style = getAlertStyle(alert.type);
                return (
                  <div
                    key={alert.id}
                    onClick={() => markAlertRead(alert.id)}
                    className={`p-4 rounded-[18px] border text-xs transition-all cursor-pointer ${style.bg} ${style.border} ${
                      alert.read ? 'opacity-70' : 'shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        {style.icon}
                        <span className={`font-bold ${style.text}`}>{alert.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#78817C] tabular-nums">
                        {alert.time}
                      </span>
                    </div>

                    <p className={`text-[11px] leading-relaxed mb-2 ${style.text} opacity-90`}>
                      {alert.message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-[#78817C] pt-2 border-t border-black/5">
                      <span className="uppercase tracking-wider font-medium">{alert.type}</span>
                      {!alert.read && (
                        <span className="text-[#2D5A3C] font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Acknowledge
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Honest Notice */}
          <div className="p-5 border-t border-[#27302C]/5 bg-white text-[11px] text-[#78817C] leading-relaxed">
            <strong>Engineering Disclosure:</strong> Split ACs do not provide outdoor air ventilation. High CO₂ events generate notification alerts rather than cooling temperature commands.
          </div>
        </div>
      </div>
    </div>
  );
};
