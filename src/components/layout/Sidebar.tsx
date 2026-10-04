import React from 'react';
import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  Zap,
  Wind,
  Activity,
  GitBranch,
  CheckCircle2,
  Lightbulb,
  SlidersHorizontal,
  Leaf,
  LogIn,
  LogOut,
  UserCheck,
  X
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { useAuth } from '../../context/AuthContext';

export type NavTab =
  | 'overview'
  | 'building'
  | 'rooms'
  | 'energy'
  | 'comfort'
  | 'grid'
  | 'decisions'
  | 'verification'
  | 'insights'
  | 'whatif';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
}) => {
  const { config, isPlaying } = useSimulation();
  const { currentUser, isAuthenticated, openLoginModal, logout } = useAuth();

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'building', label: 'Buildings', icon: <Building2 className="w-4 h-4" /> },
    { id: 'rooms', label: 'Rooms', icon: <DoorOpen className="w-4 h-4" /> },
    { id: 'energy', label: 'Energy', icon: <Zap className="w-4 h-4" /> },
    { id: 'comfort', label: 'Comfort', icon: <Wind className="w-4 h-4" /> },
    { id: 'grid', label: 'Grid', icon: <Activity className="w-4 h-4" /> },
    { id: 'decisions', label: 'Decisions', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'verification', label: 'Verification', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'whatif', label: 'Settings & Model', icon: <SlidersHorizontal className="w-4 h-4" /> },
  ];

  const handleSelect = (tab: NavTab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay - only visible when user clicks button to open menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#1F2723]/35 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Drawer Sidebar - Hidden by default until button is clicked */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#FAFBF9] border-r border-[#27302C]/10 flex flex-col justify-between shadow-2xl transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        {/* Brand Lockup with Close X button */}
        <div className="p-5 flex items-center justify-between border-b border-[#27302C]/6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#DDEBDD] flex items-center justify-center text-[#2D5A3C] shadow-2xs shrink-0">
              <div className="relative">
                <Building2 className="w-5 h-5 stroke-[1.8]" />
                <Leaf className="w-3.5 h-3.5 text-[#3A8554] fill-[#3A8554] absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-[#27302C] tracking-tight leading-tight">
                Smart Building Autopilot
              </h1>
              <p className="text-[11px] text-[#78817C] font-medium leading-none mt-0.5">
                Energy & Comfort Control
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl text-[#78817C] hover:text-[#27302C] hover:bg-[#F2F4EE] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="px-3.5 py-3 flex-1 overflow-y-auto space-y-1">
          <div className="text-[10px] font-semibold text-[#78817C]/70 uppercase tracking-wider px-3.5 mb-2">
            Operations
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] rounded-full transition-all duration-150 text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#DDEBDD] text-[#27302C] font-semibold shadow-2xs'
                    : 'text-[#78817C] hover:text-[#27302C] hover:bg-[#F2F4EE]'
                }`}
              >
                <span className={isActive ? 'text-[#2D5A3C]' : 'text-[#78817C]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Status & Profile Area with Login Window Trigger */}
        <div className="p-4 m-3 rounded-2xl bg-white border border-[#27302C]/5 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#78817C] flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#3A8554] animate-pulse' : 'bg-[#78817C]'}`} />
              System Status
            </span>
            <span className="font-medium text-[#2D5A3C] bg-[#E7F3EC] px-2 py-0.5 rounded-full text-[11px]">
              {isPlaying ? 'Optimizing' : 'Paused'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-[#27302C]/4">
            <span className="text-[#78817C]">Climate Profile</span>
            <span className="font-medium text-[#27302C]">{config.climate}</span>
          </div>

          {/* User Account / Sign Out / Login */}
          <div className="pt-2 border-t border-[#27302C]/4">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={openLoginModal}
                  className="flex items-center gap-2 text-left group min-w-0 flex-1 hover:opacity-80 transition-opacity cursor-pointer"
                  title="Click to switch account"
                >
                  <div className={`w-7 h-7 rounded-xl ${currentUser.badgeColor} font-bold text-[11px] flex items-center justify-center shrink-0`}>
                    {currentUser.avatarInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-[#27302C] truncate group-hover:text-[#2D5A3C] transition-colors">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-[#78817C] truncate">
                      {currentUser.role}
                    </div>
                  </div>
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-[#78817C] hover:text-[#C53030] hover:bg-[#FEE2E2]/50 transition-colors cursor-pointer"
                  title="Sign out to Login Page"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#27302C] hover:bg-[#394540] text-white text-xs font-semibold rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Login</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
