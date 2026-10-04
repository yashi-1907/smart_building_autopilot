import React, { useState } from 'react';
import {
  Building2,
  Leaf,
  Lock,
  Mail,
  User,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  X,
  Zap,
  Sparkles
} from 'lucide-react';
import { useAuth, PRESET_USERS, UserProfile } from '../../context/AuthContext';
import { BuildingLogo } from '../common/BuildingLogo';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, loginWithPreset, currentUser, isAuthenticated } = useAuth();

  const [mode, setMode] = useState<'signin' | 'personas' | 'register'>('signin');
  const [email, setEmail] = useState('rajesh.sharma@campus.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserProfile['role']>('Facility Director');
  const [facilityName, setFacilityName] = useState('Campus Academic Block');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'register') {
        login(email, role, fullName);
      } else {
        login(email, role);
      }
      setLoginSuccessMessage('Access authorized. Initializing autopilot telemetry...');
      setTimeout(() => {
        setLoginSuccessMessage(null);
        closeLoginModal();
      }, 700);
    }, 450);
  };

  const handleSelectPreset = (preset: UserProfile) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginWithPreset(preset);
      setLoginSuccessMessage(`Signed in as ${preset.name}`);
      setTimeout(() => {
        setLoginSuccessMessage(null);
        closeLoginModal();
      }, 600);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1F2723]/60 backdrop-blur-sm transition-opacity"
        onClick={closeLoginModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#27302C]/10 shadow-[0_24px_60px_-12px_rgba(39,48,44,0.2)] overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-5 right-5 p-2 rounded-full text-[#78817C] hover:text-[#27302C] hover:bg-[#F2F4EE] transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Hero & Branding Section - Prominent "Smart Building Autopilot" in BIG text */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FAFBF9] via-[#F2F6F2] to-[#E7F0E7] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#27302C]/8">
            <div>
              {/* Badge Icon */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DDEBDD] flex items-center justify-center text-[#2D5A3C] shadow-sm">
                  <div className="relative">
                    <Building2 className="w-6 h-6 stroke-[1.8]" />
                    <Leaf className="w-3.5 h-3.5 text-[#3A8554] fill-[#3A8554] absolute -bottom-1 -right-1" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#27302C]/6 text-[11px] font-semibold text-[#2D5A3C] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A8554] animate-pulse" />
                  <span>Autonomous BMS Intelligence</span>
                </div>
              </div>

              {/* USER'S PRIMARY REQUIREMENT: Written "Smart Building Autopilot" in BIG */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#27302C] tracking-tight leading-[1.1] mb-4">
                Smart Building Autopilot
              </h1>

              <p className="text-sm text-[#5B6560] leading-relaxed mb-6">
                Next-generation software-in-the-loop supervisory control optimizing energy consumption, occupant thermal comfort, and grid demand flexibility.
              </p>

              {/* Building Logo matching user sketch */}
              <div className="pt-2 flex justify-center">
                <BuildingLogo className="w-full max-w-[240px] sm:max-w-[260px] drop-shadow-xs" />
              </div>
            </div>

            {/* Bottom Status / Hardware Bridge */}
            <div className="mt-8 pt-6 border-t border-[#27302C]/8">
              <div className="flex items-center justify-between text-xs text-[#5B6560]">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A3C]" />
                  BACnet / Modbus Secure Gateway
                </span>
                <span className="font-mono text-[11px] bg-white/70 px-2 py-0.5 rounded text-[#27302C]">
                  v2.4 Ready
                </span>
              </div>
            </div>
          </div>

          {/* Right Login Interaction Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              {/* Header Title & Tab Switcher */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#27302C]">
                    {mode === 'signin' && 'Sign In to Workspace'}
                    {mode === 'personas' && 'Quick Persona Access'}
                    {mode === 'register' && 'Enroll New Facility'}
                  </h2>
                  <p className="text-xs text-[#78817C] mt-0.5">
                    {mode === 'signin' && 'Enter your institutional or corporate credentials.'}
                    {mode === 'personas' && 'Select an operational role for rapid testing.'}
                    {mode === 'register' && 'Configure credentials for your building automation team.'}
                  </p>
                </div>
              </div>

              {/* Segmented Mode Selector */}
              <div className="flex items-center p-1 bg-[#F4F5F1] rounded-xl mb-6 text-xs font-semibold text-[#78817C]">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
                    mode === 'signin'
                      ? 'bg-white text-[#27302C] shadow-2xs'
                      : 'hover:text-[#27302C]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('personas')}
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
                    mode === 'personas'
                      ? 'bg-white text-[#27302C] shadow-2xs'
                      : 'hover:text-[#27302C]'
                  }`}
                >
                  Demo Roles
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
                    mode === 'register'
                      ? 'bg-white text-[#27302C] shadow-2xs'
                      : 'hover:text-[#27302C]'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Feedback Alert if login succeeds */}
              {loginSuccessMessage && (
                <div className="mb-4 p-3 bg-[#E7F3EC] border border-[#2D5A3C]/20 rounded-xl text-xs text-[#245034] font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3A8554] shrink-0" />
                  <span>{loginSuccessMessage}</span>
                </div>
              )}

              {/* MODE 1: Standard Sign In Form */}
              {mode === 'signin' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#27302C] mb-1.5">
                      Work Email Address
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
                        placeholder="operator@campus.edu"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] placeholder-[#78817C]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A3C]/20 focus:border-[#2D5A3C] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-[#27302C]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Demo password reset: Any password format will be authorized for this demonstration.')}
                        className="text-[11px] text-[#2D5A3C] hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
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
                        className="w-full pl-10 pr-10 py-2.5 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] placeholder-[#78817C]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A3C]/20 focus:border-[#2D5A3C] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#78817C] hover:text-[#27302C]"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-[#5B6560]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded text-[#2D5A3C] border-[#27302C]/20 focus:ring-0"
                      />
                      <span>Keep me authenticated on this device</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 bg-[#27302C] hover:bg-[#394540] text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Authenticate & Launch Autopilot</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* MODE 2: Quick Persona Access */}
              {mode === 'personas' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#5B6560] mb-2">
                    Click any pre-configured operational persona to authenticate instantly:
                  </p>
                  {PRESET_USERS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="w-full p-3.5 rounded-2xl bg-[#FAFBF9] border border-[#27302C]/8 hover:border-[#2D5A3C]/30 hover:bg-[#F2F6F2] transition-all text-left flex items-center justify-between group cursor-pointer"
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
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#2D5A3C] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Select</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* MODE 3: Register New Facility */}
              {mode === 'register' && (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#27302C] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A3C]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#27302C] mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@institution.org"
                      className="w-full px-3.5 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A3C]/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#27302C] mb-1">
                        Facility Name
                      </label>
                      <input
                        type="text"
                        value={facilityName}
                        onChange={(e) => setFacilityName(e.target.value)}
                        placeholder="Science Wing"
                        className="w-full px-3.5 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A3C]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#27302C] mb-1">
                        Operational Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserProfile['role'])}
                        className="w-full px-3 py-2 bg-[#FAFBF9] border border-[#27302C]/10 rounded-xl text-xs text-[#27302C] focus:bg-white focus:outline-hidden"
                      >
                        <option value="Facility Director">Facility Director</option>
                        <option value="Energy Engineer">Energy Engineer</option>
                        <option value="Sustainability Lead">Sustainability Lead</option>
                        <option value="Zone Manager">Zone Manager</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 bg-[#2D5A3C] hover:bg-[#23472f] text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Create Facility Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Footer Options */}
            <div className="mt-6 pt-4 border-t border-[#27302C]/8 flex items-center justify-between text-xs text-[#78817C]">
              {isAuthenticated && currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#3E4A43]">Active:</span>
                  <span className="font-semibold text-[#27302C]">{currentUser.name}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="text-xs text-[#5B6560] hover:text-[#27302C] underline decoration-[#27302C]/30"
                >
                  Explore as Guest Viewer
                </button>
              )}

              <button
                type="button"
                onClick={closeLoginModal}
                className="px-3 py-1.5 text-xs font-medium text-[#27302C] bg-[#F2F4EE] hover:bg-[#EAECE4] rounded-lg transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
