import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Zap,
  Wind,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth, PRESET_USERS, UserProfile } from '../context/AuthContext';
import { BuildingLogo } from '../components/common/BuildingLogo';

export const LoginPage: React.FC = () => {
  const { login, loginWithPreset } = useAuth();

  const [email, setEmail] = useState('director@autopilot.campus.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_USERS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'personas' | 'custom'>('personas');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      login(email, 'Facility Director');
    }, 400);
  };

  const handlePresetLogin = (preset: UserProfile) => {
    setSelectedPresetId(preset.id);
    setIsLoading(true);
    setTimeout(() => {
      loginWithPreset(preset);
    }, 350);
  };

  const handleDirectLaunch = () => {
    const selected = PRESET_USERS.find((p) => p.id === selectedPresetId) || PRESET_USERS[0];
    handlePresetLogin(selected);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#27302C] flex flex-col justify-between selection:bg-[#DDEBDD] selection:text-[#27302C]">
      {/* Main Hero & Login Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: BIG SMART BUILDING AUTOPILOT TITLE */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E7F3EC] text-[#2D5A3C] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#3A8554] animate-pulse" />
              <span>Campus Academic Block · Indian Climate Retrofit</span>
            </div>

            {/* THE BIG TITLE REQUESTED BY USER */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-[#27302C] tracking-tight leading-[1.05] uppercase">
              SMART BUILDING AUTOPILOT
            </h1>

            {/* Side-by-side presentation: Building Logo + Text (~5 words per line) filling the space */}
            <div className="pt-2 flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8">
              <div className="shrink-0 flex items-center justify-center">
                <BuildingLogo className="w-[210px] sm:w-[240px] md:w-[260px] drop-shadow-sm" />
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-3 py-1">
                <div className="text-[17px] sm:text-[19px] lg:text-[21px] font-semibold text-[#2D3832] tracking-tight leading-[1.6]">
                  <span>Real-time software-in-the-loop control platform</span><br />
                  <span>optimizing HVAC energy consumption,</span><br />
                  <span>occupant thermal comfort, and</span><br />
                  <span>grid demand flexibility with</span><br />
                  <span className="text-[#2D5A3C] font-bold">explainable rule guardrails.</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#5B6760]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#27302C]/8 font-medium shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A8554]" />
                    <span>Multi-zone FSM Model</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#27302C]/8 font-medium shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2C577E]" />
                    <span>Continuous Setback Logic</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-4 text-xs text-[#78817C]">
              <span className="flex items-center gap-1.5 font-medium text-[#27302C]">
                <ShieldCheck className="w-4 h-4 text-[#2D5A3C]" />
                BACnet / Modbus Hardware Ready
              </span>
              <span>·</span>
              <span>Autonomous Closed-Loop Control</span>
            </div>
          </div>

          {/* Right Column: Interactive Login Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#27302C]/8 shadow-[0_16px_40px_-8px_rgba(39,48,44,0.08)] space-y-6">
              <div>
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#2D5A3C] bg-[#E7F3EC] px-2.5 py-0.5 rounded-full mb-2">
                  System Authentication
                </div>
                <h2 className="text-2xl font-bold text-[#27302C] tracking-tight">
                  Sign In to Autopilot
                </h2>
                <p className="text-xs text-[#78817C] mt-1">
                  Authenticate to supervise building operations and monitor closed-loop setpoint decisions.
                </p>
              </div>

              {/* Segmented Tab */}
              <div className="flex items-center p-1 bg-[#F4F5F1] rounded-xl text-xs font-semibold text-[#78817C]">
                <button
                  type="button"
                  onClick={() => setActiveTab('personas')}
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
                    activeTab === 'personas'
                      ? 'bg-white text-[#27302C] shadow-2xs font-bold'
                      : 'hover:text-[#27302C]'
                  }`}
                >
                  Quick Demo Roles
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
                    activeTab === 'custom'
                      ? 'bg-white text-[#27302C] shadow-2xs font-bold'
                      : 'hover:text-[#27302C]'
                  }`}
                >
                  Email & Password
                </button>
              </div>

              {/* Tab 1: Quick Demo Roles */}
              {activeTab === 'personas' && (
                <div className="space-y-3">
                  <div className="text-xs font-medium text-[#5B6560]">
                    Select an operator profile to log in immediately:
                  </div>

                  {PRESET_USERS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetLogin(preset)}
                        disabled={isLoading}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer group ${
                          isSelected
                            ? 'bg-[#F2F7F2] border-[#2D5A3C] shadow-2xs'
                            : 'bg-[#FAFBF9] border-[#27302C]/8 hover:border-[#2D5A3C]/30 hover:bg-[#F2F6F2]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl ${preset.badgeColor} flex items-center justify-center font-bold text-xs shadow-2xs`}>
                            {preset.avatarInitials}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#27302C] group-hover:text-[#2D5A3C] transition-colors">
                              {preset.name}
                            </div>
                            <div className="text-[11px] text-[#78817C]">
                              {preset.role} · {preset.facility}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D5A3C]">
                          <span className="text-[11px]">Log In</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    );
                  })}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleDirectLaunch}
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-[#27302C] hover:bg-[#3B4641] text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Launch Autopilot as Building Manager</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Standard Custom Email/Password */}
              {activeTab === 'custom' && (
                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#27302C] mb-1.5">
                      Operator Work Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#78817C]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="manager@campus.edu"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A3C]/20 focus:border-[#2D5A3C] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-[#27302C]">
                        Password
                      </label>
                      <span className="text-[11px] text-[#78817C]">Any key for demo</span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#78817C]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A3C]/20 focus:border-[#2D5A3C] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#78817C] hover:text-[#27302C]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-[#27302C] hover:bg-[#3B4641] text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Sign In & Open Dashboard</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Bottom Quick Guest Jump */}
              <div className="pt-3 border-t border-[#27302C]/6 flex items-center justify-between text-xs text-[#78817C]">
                <span>Explore without sign-up</span>
                <button
                  type="button"
                  onClick={() => handlePresetLogin(PRESET_USERS[0])}
                  className="font-semibold text-[#2D5A3C] hover:underline cursor-pointer"
                >
                  Continue as Building Manager →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="px-6 sm:px-12 py-5 border-t border-[#27302C]/6 bg-white/50 text-xs text-[#78817C] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          Smart Building Autopilot · Hardware-in-the-Loop Supervisory Control Simulation
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Composite Climate</span>
          <span>·</span>
          <span>ASHRAE 55 Adaptive Comfort</span>
          <span>·</span>
          <span>ECBC Compliance</span>
        </div>
      </footer>
    </div>
  );
};
