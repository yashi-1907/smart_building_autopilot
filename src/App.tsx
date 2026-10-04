/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { AlertDrawer } from './components/layout/AlertDrawer';
import { RoomDetailModal } from './components/rooms/RoomDetailModal';
import { AddRoomModal } from './components/rooms/AddRoomModal';
import { LoginModal } from './components/auth/LoginModal';
import { LoginPage } from './views/LoginPage';

// Views
import { OverviewView } from './views/OverviewView';
import { BuildingView } from './views/BuildingView';
import { RoomsView } from './views/RoomsView';
import { EnergyView } from './views/EnergyView';
import { ComfortIaqView } from './views/ComfortIaqView';
import { GridResponseView } from './views/GridResponseView';
import { DecisionEngineView } from './views/DecisionEngineView';
import { VerificationView } from './views/VerificationView';
import { InsightsRetrofitView } from './views/InsightsRetrofitView';
import { WhatIfSettingsView } from './views/WhatIfSettingsView';

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState<boolean>(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState<boolean>(false);

  const { setSelectedRoomId } = useSimulation();

  const handleOpenRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsRoomModalOpen(true);
  };

  const handleOpenAddRoom = () => {
    setIsAddRoomModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewView
            onNavigate={setActiveTab}
            onOpenRoom={handleOpenRoom}
            onOpenAddRoom={handleOpenAddRoom}
          />
        );
      case 'building':
        return (
          <BuildingView
            onOpenRoom={handleOpenRoom}
            onOpenAddRoom={handleOpenAddRoom}
          />
        );
      case 'rooms':
        return (
          <RoomsView
            onOpenRoom={handleOpenRoom}
            onOpenAddRoom={handleOpenAddRoom}
          />
        );
      case 'energy':
        return <EnergyView />;
      case 'comfort':
        return <ComfortIaqView />;
      case 'grid':
        return <GridResponseView />;
      case 'decisions':
        return <DecisionEngineView />;
      case 'verification':
        return <VerificationView />;
      case 'insights':
        return <InsightsRetrofitView />;
      case 'whatif':
        return <WhatIfSettingsView />;
      default:
        return (
          <OverviewView
            onNavigate={setActiveTab}
            onOpenRoom={handleOpenRoom}
            onOpenAddRoom={handleOpenAddRoom}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] flex flex-col antialiased text-[#27302C] selection:bg-[#DDEBDD] selection:text-[#27302C]">
      {/* Sidebar Navigation Drawer - opens ONLY when Menu button is clicked */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Header Bar */}
        <TopBar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenAlerts={() => setIsAlertDrawerOpen(true)}
          onOpenAddRoom={handleOpenAddRoom}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Alert Slide-Over Drawer */}
      <AlertDrawer
        isOpen={isAlertDrawerOpen}
        onClose={() => setIsAlertDrawerOpen(false)}
      />

      {/* Deep Room Telemetry & FSM Modal */}
      {isRoomModalOpen && (
        <RoomDetailModal onClose={() => setIsRoomModalOpen(false)} />
      )}

      {/* Add New Room Modal */}
      {isAddRoomModalOpen && (
        <AddRoomModal
          isOpen={isAddRoomModalOpen}
          onClose={() => setIsAddRoomModalOpen(false)}
        />
      )}

      {/* Dedicated Login Window Modal for in-dashboard role switching */}
      <LoginModal />
    </div>
  );
};

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <DashboardContent />;
};

export default function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <MainApp />
      </SimulationProvider>
    </AuthProvider>
  );
}
