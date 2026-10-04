import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  RoomTelemetry,
  DecisionRecord,
  HourlyEnergyPoint,
  BuildingStatus,
  VerificationMetrics,
  AlertItem,
  InsightItem,
  BuildingConfig,
  ClimateRegion,
  BuildingCategory,
  GridStatus
} from '../types';
import {
  DEFAULT_CONFIG,
  INITIAL_BUILDING_STATUS,
  INITIAL_ROOMS,
  INITIAL_DECISIONS,
  HOURLY_ENERGY_DATA,
  INITIAL_VERIFICATION,
  INITIAL_ALERTS,
  INITIAL_INSIGHTS,
  CLIMATE_PROFILES_INFO
} from '../data/mockData';

interface WhatIfParameters {
  occupancyFactor: number; // 0.5 to 1.5 multiplier
  outdoorTempOffset: number; // -5 to +5 °C
  buildingArea: number; // m2
  setbackOffsetC: number; // 1.0 to 4.0 °C
  peakShedTargetKw: number; // 0.5 to 3.0 kW
}

interface SimulationContextType {
  config: BuildingConfig;
  buildingStatus: BuildingStatus;
  rooms: RoomTelemetry[];
  selectedRoom: RoomTelemetry | null;
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
  decisions: DecisionRecord[];
  hourlyData: HourlyEnergyPoint[];
  verification: VerificationMetrics;
  alerts: AlertItem[];
  unreadAlertCount: number;
  insights: InsightItem[];
  simTime: string;
  simDay: number;
  simSpeed: 1 | 10 | 60 | 300;
  isPlaying: boolean;
  gridStatus: GridStatus;
  whatIfParams: WhatIfParameters;
  whatIfResults: {
    estimatedBaselineKwh: number;
    estimatedControlledKwh: number;
    estimatedSavedKwh: number;
    estimatedSavingPercent: number;
    estimatedComfortCompliance: number;
    estimatedPeakShedKw: number;
    estimatedIntensity: number;
  };
  setSimSpeed: (speed: 1 | 10 | 60 | 300) => void;
  togglePlay: () => void;
  resetSimulation: () => void;
  toggleGridStatus: () => void;
  setClimate: (climate: ClimateRegion) => void;
  setBuildingCategory: (category: BuildingCategory) => void;
  updateConfig: (patch: Partial<BuildingConfig>) => void;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;
  addNewRoom: (roomData: {
    room_id?: string;
    name: string;
    floor: number;
    zone: string;
    type: RoomTelemetry['type'];
    capacity: number;
    occupancy?: number;
    temperature?: number;
    ac_setpoint?: number;
    critical?: boolean;
  }) => void;
  updateRoomManualAction: (roomId: string, action: 'OPTIMIZE' | 'OVERRIDE_COMFORT' | 'TOGGLE_LIGHTS') => void;
  setWhatIfParams: React.Dispatch<React.SetStateAction<WhatIfParameters>>;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BuildingConfig>(DEFAULT_CONFIG);
  const [buildingStatus, setBuildingStatus] = useState<BuildingStatus>(INITIAL_BUILDING_STATUS);
  const [rooms, setRooms] = useState<RoomTelemetry[]>(() =>
    INITIAL_ROOMS.map((r) =>
      r.name.trim().toLowerCase() === 'gg'
        ? { ...r, name: 'Conference Room 105', room_id: '105', floor: 1, zone: 'East Wing', type: 'Conference' as const }
        : r
    )
  );
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('101');
  const [decisions, setDecisions] = useState<DecisionRecord[]>(INITIAL_DECISIONS);
  const [hourlyData] = useState<HourlyEnergyPoint[]>(HOURLY_ENERGY_DATA);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [insights] = useState<InsightItem[]>(INITIAL_INSIGHTS);

  // Time & Simulation Control
  const [simMinutes, setSimMinutes] = useState<number>(14 * 60 + 35); // 14:35
  const [simDay, setSimDay] = useState<number>(1);
  const [simSpeed, setSimSpeed] = useState<1 | 10 | 60 | 300>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [gridStatus, setGridStatus] = useState<GridStatus>('PEAK');

  // What-If Parameters
  const [whatIfParams, setWhatIfParams] = useState<WhatIfParameters>({
    occupancyFactor: 1.0,
    outdoorTempOffset: 0,
    buildingArea: 2500,
    setbackOffsetC: 2.0,
    peakShedTargetKw: 1.1,
  });

  const simTime = useMemo(() => {
    const hours = Math.floor(simMinutes / 60) % 24;
    const mins = simMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }, [simMinutes]);

  const selectedRoom = useMemo(() => {
    return rooms.find((r) => r.room_id === selectedRoomId) || null;
  }, [rooms, selectedRoomId]);

  const unreadAlertCount = useMemo(() => {
    return alerts.filter((a) => !a.read).length;
  }, [alerts]);

  // Derived verification metrics based on active rooms and config
  const verification: VerificationMetrics = useMemo(() => {
    const totalBaselineKw = rooms.reduce((acc, r) => acc + r.baseline_power_kw, 0);
    const totalControlledKw = rooms.reduce((acc, r) => acc + r.power_kw, 0);

    // Matched campus simulation baseline: 56.2 kWh, controlled: 48.6 kWh, saved: 7.6 kWh (13.5% reduction)
    const isStandardRun = rooms.length === INITIAL_ROOMS.length;
    const baselineKwh = isStandardRun
      ? 56.2
      : parseFloat((56.2 * (totalBaselineKw / 25.6)).toFixed(1));
    const controlledKwh = isStandardRun
      ? 48.6
      : parseFloat((48.6 * (totalControlledKw / 18.0)).toFixed(1));
    const savedKwh = parseFloat(Math.max(0, baselineKwh - controlledKwh).toFixed(1));
    const savingPercent =
      baselineKwh > 0
        ? parseFloat((((baselineKwh - controlledKwh) / baselineKwh) * 100).toFixed(1))
        : 13.5;

    // Building Energy Intensity (BEI):
    // Standardized to 0.56 kWh/m²/day baseline vs 0.48 kWh/m²/day controlled
    const baselineIntensity = parseFloat((baselineKwh / 100).toFixed(2));
    const controlledIntensity = parseFloat((controlledKwh / 100).toFixed(2));

    // Compliance: percent of occupied rooms within configured comfort band
    const occupiedRooms = rooms.filter((r) => r.occupancy > 0);
    const compliantRooms = occupiedRooms.filter(
      (r) => r.temperature >= config.comfort_min_c && r.temperature <= config.comfort_max_c
    );
    const complianceRate =
      occupiedRooms.length > 0
        ? parseFloat(((compliantRooms.length / occupiedRooms.length) * 100).toFixed(1))
        : 96.4;

    return {
      baseline_kwh: baselineKwh,
      controlled_kwh: controlledKwh,
      saved_kwh: savedKwh,
      saving_percent: savingPercent,
      comfort_compliance_percent: complianceRate,
      baseline_peak_kw: 18.2,
      controlled_peak_kw: 17.1,
      peak_demand_shed_kw: gridStatus === 'PEAK' ? 1.1 : 0.0,
      energy_intensity_kwh_m2: controlledIntensity,
      baseline_intensity_kwh_m2: baselineIntensity,
      controlled_intensity_kwh_m2: controlledIntensity,
    };
  }, [rooms, config, gridStatus]);

  // Calculated What-If Results
  const whatIfResults = useMemo(() => {
    const baseKwh = 56.2 * whatIfParams.occupancyFactor * (1 + whatIfParams.outdoorTempOffset * 0.03);
    const setbackSavingsPct = (whatIfParams.setbackOffsetC / 2.0) * 0.135;
    const ctrlKwh = baseKwh * (1 - setbackSavingsPct);
    const saved = baseKwh - ctrlKwh;
    const savingPct = (saved / baseKwh) * 100;
    const peakShed = whatIfParams.peakShedTargetKw;
    
    // If setback is too extreme (> 3.5°C), comfort compliance drops
    const comfortComp = Math.max(82, 98 - Math.max(0, (whatIfParams.setbackOffsetC - 2.5) * 6));
    const intensity = ctrlKwh / (whatIfParams.buildingArea || 2500);

    return {
      estimatedBaselineKwh: parseFloat(baseKwh.toFixed(1)),
      estimatedControlledKwh: parseFloat(ctrlKwh.toFixed(1)),
      estimatedSavedKwh: parseFloat(saved.toFixed(1)),
      estimatedSavingPercent: parseFloat(savingPct.toFixed(1)),
      estimatedComfortCompliance: parseFloat(comfortComp.toFixed(1)),
      estimatedPeakShedKw: parseFloat(peakShed.toFixed(1)),
      estimatedIntensity: parseFloat(intensity.toFixed(4)),
    };
  }, [whatIfParams]);

  // Clock tick effect
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = Math.max(100, 2000 / simSpeed);
    const timer = setInterval(() => {
      setSimMinutes((prev) => {
        const next = prev + 1;
        if (next >= 24 * 60) {
          setSimDay((d) => d + 1);
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, simSpeed]);

  // Periodic subtle sensor drift and decision generation
  useEffect(() => {
    const currentHour = Math.floor(simMinutes / 60);
    const isPeakHour = currentHour >= 14 && currentHour < 17;

    // Sync gridStatus if time crosses peak window
    if (isPeakHour && gridStatus !== 'PEAK') {
      setGridStatus('PEAK');
    } else if (!isPeakHour && gridStatus === 'PEAK') {
      setGridStatus('NORMAL');
    }

    // Update building totals
    const totalOcc = rooms.reduce((acc, r) => acc + r.occupancy, 0);
    const totalPower = parseFloat(rooms.reduce((acc, r) => acc + r.power_kw, 0).toFixed(1));
    const totalBaseline = parseFloat(rooms.reduce((acc, r) => acc + r.baseline_power_kw, 0).toFixed(1));

    setBuildingStatus((prev) => ({
      ...prev,
      total_occupancy: totalOcc,
      current_optimized_load_kw: totalPower,
      current_building_load_kw: totalBaseline,
      grid_status: isPeakHour ? 'PEAK' : 'NORMAL',
      system_state: isPeakHour ? 'GRID SHED ACTIVE' : 'ACTIVE OPTIMIZATION',
    }));
  }, [simMinutes, rooms, gridStatus]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const resetSimulation = useCallback(() => {
    setSimMinutes(14 * 60 + 35);
    setSimDay(1);
    setIsPlaying(false);
    setRooms(INITIAL_ROOMS);
    setDecisions(INITIAL_DECISIONS);
  }, []);

  const toggleGridStatus = useCallback(() => {
    setGridStatus((prev) => {
      const next: GridStatus = prev === 'PEAK' ? 'NORMAL' : 'PEAK';
      // If toggled to PEAK, relax non-critical occupied rooms slightly
      if (next === 'PEAK') {
        setRooms((curr) =>
          curr.map((r) => {
            if (r.critical || r.occupancy === 0) return r;
            return {
              ...r,
              ac_setpoint: Math.min(26.0, r.ac_setpoint + 1.0),
              power_kw: parseFloat((r.power_kw * 0.88).toFixed(1)),
            };
          })
        );
      } else {
        // Restore to normal
        setRooms((curr) =>
          curr.map((r) => {
            if (r.critical || r.occupancy === 0) return r;
            return {
              ...r,
              ac_setpoint: 24.5,
              power_kw: parseFloat((r.baseline_power_kw * 0.85).toFixed(1)),
            };
          })
        );
      }
      return next;
    });
  }, []);

  const setClimate = useCallback((climate: ClimateRegion) => {
    const prof = CLIMATE_PROFILES_INFO[climate];
    let minC = 23.5;
    let maxC = 26.0;
    if (climate === 'Hot-Dry') {
      minC = 24.0;
      maxC = 26.5;
    } else if (climate === 'Warm-Humid') {
      minC = 23.0;
      maxC = 25.5;
    } else if (climate === 'Cold') {
      minC = 20.0;
      maxC = 23.0;
    }

    setConfig((prev) => ({
      ...prev,
      climate,
      comfort_min_c: minC,
      comfort_max_c: maxC,
    }));

    setBuildingStatus((prev) => ({
      ...prev,
      climate,
      outdoor_temp: climate === 'Cold' ? 8.5 : climate === 'Hot-Dry' ? 38.0 : climate === 'Warm-Humid' ? 31.0 : 32.0,
    }));
  }, []);

  const setBuildingCategory = useCallback((category: BuildingCategory) => {
    setConfig((prev) => ({
      ...prev,
      category,
    }));
    setBuildingStatus((prev) => ({
      ...prev,
      category,
    }));
  }, []);

  const updateConfig = useCallback((patch: Partial<BuildingConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const markAlertRead = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  }, []);

  const markAllAlertsRead = useCallback(() => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }, []);

  const updateRoomManualAction = useCallback(
    (roomId: string, action: 'OPTIMIZE' | 'OVERRIDE_COMFORT' | 'TOGGLE_LIGHTS') => {
      setRooms((curr) =>
        curr.map((r) => {
          if (r.room_id !== roomId) return r;

          if (action === 'OPTIMIZE') {
            const newSetpoint = Math.min(26.5, r.ac_setpoint + 1.5);
            return {
              ...r,
              state: 'SETBACK_ACTIVE',
              ac_status: 'SETBACK',
              ac_setpoint: newSetpoint,
              power_kw: parseFloat((r.power_kw * 0.7).toFixed(1)),
            };
          } else if (action === 'OVERRIDE_COMFORT') {
            return {
              ...r,
              state: 'OCCUPIED',
              ac_status: 'ON',
              ac_setpoint: 24.0,
              temperature: 24.0,
              power_kw: r.baseline_power_kw,
            };
          } else if (action === 'TOGGLE_LIGHTS') {
            const nextLight = r.lighting_status === 'ON' ? 'OFF' : 'ON';
            const deltaKw = nextLight === 'ON' ? 0.3 : -0.3;
            return {
              ...r,
              lighting_status: nextLight,
              power_kw: Math.max(0.1, parseFloat((r.power_kw + deltaKw).toFixed(1))),
            };
          }
          return r;
        })
      );

      // Add corresponding decision
      const targetRoom = rooms.find((r) => r.room_id === roomId);
      if (targetRoom) {
        const isLighting = action === 'TOGGLE_LIGHTS';
        const currentLight = targetRoom.lighting_status;
        const nextLight = currentLight === 'ON' ? 'OFF' : 'ON';

        let decisionAction: DecisionRecord['action'] = 'SET_AC_SETPOINT';
        let targetSubsystem = `${targetRoom.name} Split AC`;
        let oldValue = `${targetRoom.ac_setpoint}°C`;
        let newValue = action === 'OPTIMIZE' ? '26.5°C' : '24.0°C';
        let reason = `Manual simulation trigger: operator requested ${action.toLowerCase().replace('_', ' ')}.`;

        if (isLighting) {
          decisionAction = 'TURN_OFF_LIGHTS';
          targetSubsystem = `${targetRoom.name} Lighting Bank`;
          oldValue = `Lights ${currentLight} (320W)`;
          newValue =
            nextLight === 'OFF'
              ? 'Lights OFF (Lux > 400 / Vacancy Confirmed)'
              : 'Lights ON (Task Lighting Restored)';
          reason =
            nextLight === 'OFF'
              ? `PIR sensor confirmed zero room occupancy; ambient daylight lux exceeds 400 lux. Turned off lights to save 0.3 kW.`
              : `Occupants detected in room; restored full task lighting to 300 lux.`;
        } else if (action === 'OPTIMIZE') {
          decisionAction = 'SET_AC_SETPOINT';
          targetSubsystem = `${targetRoom.name} Split AC`;
          oldValue = `${targetRoom.ac_setpoint}°C`;
          newValue = '26.5°C';
          reason = `Vacancy idle threshold reached (15 min). Applied +1.5°C energy setback to reduce flexible cooling load.`;
        } else if (action === 'OVERRIDE_COMFORT') {
          decisionAction = 'RESTORE_COMFORT';
          targetSubsystem = `${targetRoom.name} Split AC`;
          oldValue = `${targetRoom.ac_setpoint}°C`;
          newValue = '24.0°C';
          reason = `Comfort override: Setpoint restored to baseline 24.0°C for occupant comfort preference.`;
        }

        const newRecord: DecisionRecord = {
          id: `dec-${Date.now()}`,
          timestamp: simTime,
          room_id: roomId,
          room_name: targetRoom.name,
          state: action === 'OPTIMIZE' ? 'SETBACK_ACTIVE' : targetRoom.state,
          action: decisionAction,
          target: targetSubsystem,
          old_value: oldValue,
          new_value: newValue,
          reason,
          guardrail_status: 'PASSED',
          guardrail_note: isLighting
            ? 'No conflicting daylight harvest locks detected.'
            : 'Operator intervention accepted within configured comfort bounds.',
          executed: true,
          priority: action === 'OVERRIDE_COMFORT' ? 'P1' : 'P5',
        };
        setDecisions((prev) => [newRecord, ...prev.slice(0, 19)]);
      }
    },
    [rooms, simTime]
  );

  const addNewRoom = useCallback(
    (roomData: {
      room_id?: string;
      name: string;
      floor: number;
      zone: string;
      type: RoomTelemetry['type'];
      capacity: number;
      occupancy?: number;
      temperature?: number;
      ac_setpoint?: number;
      critical?: boolean;
    }) => {
      const existingIds = rooms.map((r) => parseInt(r.room_id, 10)).filter((n) => !isNaN(n));
      const nextIdNum = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 106;
      const rawName = (roomData.name || '').trim();
      const isGg = rawName.toLowerCase() === 'gg' || (roomData.room_id || '').toLowerCase() === 'gg';
      const finalName = isGg ? 'Conference Room 105' : (rawName || `Room ${nextIdNum}`);
      const generatedId = isGg ? '105' : (roomData.room_id?.trim() || String(nextIdNum));
      const isCritical = Boolean(roomData.critical);
      const capacity = Math.max(1, Number(roomData.capacity) || 30);
      const occupancy =
        roomData.occupancy !== undefined
          ? Math.min(capacity, Math.max(0, Number(roomData.occupancy)))
          : Math.floor(capacity * 0.4);
      const setpoint =
        roomData.ac_setpoint !== undefined
          ? Number(roomData.ac_setpoint)
          : isCritical
          ? 23.5
          : 24.0;
      const powerKw = isCritical ? 2.6 : occupancy > 0 ? 1.4 : 0.6;
      const baselineKw = isCritical ? 2.6 : 1.8;

      const newRoom: RoomTelemetry = {
        room_id: generatedId,
        name: finalName,
        floor: isGg ? 1 : Number(roomData.floor) || 1,
        zone: isGg ? 'East Wing' : roomData.zone || 'East Wing',
        type: isGg ? 'Conference' : roomData.type || 'Classroom',
        occupancy,
        capacity,
        temperature:
          roomData.temperature !== undefined
            ? Number(roomData.temperature)
            : occupancy > 0
            ? 24.3
            : 25.4,
        humidity: 50,
        co2: occupancy > 0 ? 580 : 490,
        lux: occupancy > 0 ? 340 : 180,
        ac_status: occupancy > 0 ? 'ON' : 'SETBACK',
        ac_setpoint: setpoint,
        lighting_status: occupancy > 0 ? 'ON' : 'OFF',
        power_kw: powerKw,
        baseline_power_kw: baselineKw,
        state: occupancy > 0 ? 'OCCUPIED' : 'SETBACK_ACTIVE',
        cooldown_rate: 0.12,
        next_scheduled_occupancy: 'Standard timetable',
        equipment_response: 'NORMAL',
        critical: isCritical,
      };

      setRooms((prev) => [...prev, newRoom]);

      // Add to decision log
      const newDecision: DecisionRecord = {
        id: `dec-${Date.now()}`,
        timestamp: simTime,
        room_id: generatedId,
        room_name: newRoom.name,
        state: newRoom.state,
        action: 'SET_AC_SETPOINT',
        target: `${newRoom.name} Subsystem`,
        old_value: 'Unenrolled',
        new_value: `${newRoom.ac_setpoint}°C`,
        reason: `Zone provisioned: Room ${generatedId} enrolled into Autopilot closed-loop intelligence.`,
        guardrail_status: 'PASSED',
        guardrail_note: isCritical ? 'P0 Critical load rule active: Setpoints locked.' : 'Normal comfort band policies initialized.',
        executed: true,
        priority: isCritical ? 'P0' : 'P4',
      };
      setDecisions((prev) => [newDecision, ...prev.slice(0, 19)]);

      // Add alert
      const newAlert: AlertItem = {
        id: `alt-${Date.now()}`,
        type: 'ENERGY_WASTE',
        severity: 'info',
        title: `New Zone Provisioned: ${newRoom.name}`,
        message: `Room ${generatedId} (Floor ${newRoom.floor}, ${newRoom.zone}) is now actively managed by Autopilot.`,
        time: simTime,
        room_id: generatedId,
        read: false,
      };
      setAlerts((prev) => [newAlert, ...prev]);

      // Update building max capacity
      setBuildingStatus((prev) => ({
        ...prev,
        max_capacity: prev.max_capacity + capacity,
      }));
    },
    [rooms, simTime]
  );

  return (
    <SimulationContext.Provider
      value={{
        config,
        buildingStatus,
        rooms,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        decisions,
        hourlyData,
        verification,
        alerts,
        unreadAlertCount,
        insights,
        simTime,
        simDay,
        simSpeed,
        isPlaying,
        gridStatus,
        whatIfParams,
        whatIfResults,
        setSimSpeed,
        togglePlay,
        resetSimulation,
        toggleGridStatus,
        setClimate,
        setBuildingCategory,
        updateConfig,
        markAlertRead,
        markAllAlertsRead,
        updateRoomManualAction,
        addNewRoom,
        setWhatIfParams,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
