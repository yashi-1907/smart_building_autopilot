import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Facility Director' | 'Energy Engineer' | 'Sustainability Lead' | 'Zone Manager';
  avatarInitials: string;
  facility: string;
  badgeColor: string;
  permissions: string[];
}

export const PRESET_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@campus.edu',
    role: 'Facility Director',
    avatarInitials: 'RS',
    facility: 'Campus Academic Block · Block 4',
    badgeColor: 'bg-[#DDEBDD] text-[#245034]',
    permissions: ['Full HVAC Override', 'Grid Peak Response', 'Zone Provisioning', 'Safety Setpoints'],
  },
  {
    id: 'user-2',
    name: 'Priya Nair',
    email: 'priya.nair@autopilot.energy',
    role: 'Energy Engineer',
    avatarInitials: 'PN',
    facility: 'BMS Optimization Division',
    badgeColor: 'bg-[#E4EEF7] text-[#2C577E]',
    permissions: ['Thermal Modeling', 'Energy Scheduling', 'FSM Rules', 'Setpoint Calibration'],
  },
  {
    id: 'user-3',
    name: 'Vikram Desai',
    email: 'vikram.desai@sustainability.org',
    role: 'Sustainability Lead',
    avatarInitials: 'VD',
    facility: 'ESG & Decarbonization Office',
    badgeColor: 'bg-[#EAE5F5] text-[#5A457D]',
    permissions: ['Carbon Accounting', 'Verification Reports', 'Baseline Analytics'],
  },
];

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, role?: UserProfile['role'], name?: string) => void;
  loginWithPreset: (presetUser: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // The app should open on the login page by default
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loginWithPreset = (presetUser: UserProfile) => {
    setCurrentUser(presetUser);
    setIsLoginModalOpen(false);
  };

  const login = (email: string, role: UserProfile['role'] = 'Facility Director', name?: string) => {
    const derivedName = name?.trim() || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const initials = derivedName
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AU';

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: derivedName,
      email,
      role,
      avatarInitials: initials,
      facility: 'Campus Academic Block',
      badgeColor: 'bg-[#DDEBDD] text-[#245034]',
      permissions: ['HVAC Setpoint Adjustments', 'Grid Response Participation', 'Zone Optimization'],
    };

    setCurrentUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoginModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        loginWithPreset,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
