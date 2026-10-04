import React from 'react';
import {
  Menu,
  Zap,
  Bell,
  ChevronDown,
  Plus,
  User,
  LogIn,
  LogOut
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { useAuth } from '../../context/AuthContext';
import { ClimateRegion, BuildingCategory } from '../../types';

interface TopBarProps {
  onToggleSidebar: () => void;
  onOpenAlerts: () => void;
  onOpenAddRoom?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleSidebar,
  onOpenAlerts,
  onOpenAddRoom,
}) => {
  const {
    config,
    gridStatus,
    unreadAlertCount,
    toggleGridStatus,
    setClimate,
    setBuildingCategory,
  } = useSimulation();

  const { currentUser, isAuthenticated, openLoginModal, logout } = useAuth();

  const climateOptions: ClimateRegion[] = [
    'Composite',
    'Hot-Dry',
    'Warm-Humid',
    'Temperate',
    'Cold',
  ];

  const categoryOptions: BuildingCategory[] = [
    'College',
    'Office',
    'Hotel',
    'Retail',
    'Hospital',
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F7F8F5]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 border-b border-[#27302C]/5">
      {/* Left: Menu Open Button + Building Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-[#FAFBF9] border border-[#27302C]/10 text-xs font-semibold text-[#27302C] shadow-2xs transition-all cursor-pointer hover:border-[#2D5A3C]/40 group"
          title="Open Smart Building Autopilot Operations Menu"
        >
          <Menu className="w-4 h-4 text-[#2D5A3C] group-hover:scale-110 transition-transform" />
          <span className="font-bold">Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={config.category}
              onChange={(e) => setBuildingCategory(e.target.value as BuildingCategory)}
              className="appearance-none bg-white border border-[#27302C]/6 rounded-full pl-3.5 pr-8 py-1.5 text-xs font-semibold text-[#27302C] hover:bg-[#FAFBF9] focus:outline-hidden focus:ring-1 focus:ring-[#27302C]/20 cursor-pointer shadow-2xs"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  Campus Academic Block ({cat})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#78817C] absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Center & Right: Small rounded pills + controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Climate Pill */}
        <div className="hidden md:flex items-center relative">
          <select
            value={config.climate}
            onChange={(e) => setClimate(e.target.value as ClimateRegion)}
            className="appearance-none bg-white border border-[#27302C]/6 rounded-full pl-3 pr-7 py-1 text-xs font-medium text-[#27302C] hover:bg-[#FAFBF9] cursor-pointer shadow-2xs"
          >
            {climateOptions.map((clim) => (
              <option key={clim} value={clim}>
                Climate: {clim}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#78817C] absolute right-2.5 top-2 pointer-events-none" />
        </div>

        {/* Grid Status Pill Toggle */}
        <button
          onClick={toggleGridStatus}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            gridStatus === 'PEAK'
              ? 'bg-[#E4EEF7] text-[#2C577E] border border-[#2C577E]/15'
              : 'bg-white text-[#78817C] border border-[#27302C]/6 hover:bg-[#FAFBF9]'
          }`}
          title="Click to toggle simulated grid signal"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${gridStatus === 'PEAK' ? 'bg-[#3770A4] animate-pulse' : 'bg-[#78817C]'}`} />
          <span>Grid: {gridStatus === 'PEAK' ? 'Peak' : 'Normal'}</span>
        </button>

        {/* Add Room Quick Action */}
        {onOpenAddRoom && (
          <button
            onClick={onOpenAddRoom}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#DDEBDD] hover:bg-[#cde0cd] text-[#245034] rounded-full text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            title="Add a new room to building simulation"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Room</span>
          </button>
        )}

        {/* Alerts Pill */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2 rounded-full bg-white border border-[#27302C]/6 text-[#78817C] hover:text-[#27302C] hover:bg-[#FAFBF9] transition-colors shadow-2xs"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E06D53] ring-2 ring-white" />
          )}
        </button>

        {/* Login Window / User Profile Button */}
        {isAuthenticated && currentUser ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={openLoginModal}
              className="flex items-center gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1 bg-white hover:bg-[#FAFBF9] border border-[#27302C]/10 rounded-full text-xs font-medium text-[#27302C] transition-all shadow-2xs cursor-pointer group"
              title="Click to switch operator accounts"
            >
              <div className={`w-6 h-6 rounded-full ${currentUser.badgeColor} font-bold text-[10px] flex items-center justify-center shrink-0`}>
                {currentUser.avatarInitials}
              </div>
              <span className="hidden sm:inline font-semibold text-[#27302C] group-hover:text-[#2D5A3C] transition-colors max-w-[110px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
            <button
              onClick={logout}
              className="p-1.5 rounded-full bg-white hover:bg-[#FEE2E2]/60 border border-[#27302C]/8 text-[#78817C] hover:text-[#C53030] transition-colors shadow-2xs"
              title="Sign out to Login Page"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={openLoginModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27302C] hover:bg-[#394540] text-white rounded-full text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            title="Open Login Window"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
