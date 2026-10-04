export type RoomState = 
  | 'OCCUPIED'
  | 'PRE_SETBACK'
  | 'SETBACK_ACTIVE'
  | 'PRE_COOLING'
  | 'SHUTDOWN_STANDBY';

export type GridStatus = 'NORMAL' | 'PEAK';

export type BuildingCategory = 'College' | 'Office' | 'Hotel' | 'Retail' | 'Hospital';
export type ClimateRegion = 'Composite' | 'Hot-Dry' | 'Warm-Humid' | 'Temperate' | 'Cold';

export interface RoomTelemetry {
  room_id: string;
  name: string;
  floor: number;
  zone: string;
  type: 'Classroom' | 'Laboratory' | 'Faculty Office' | 'Seminar Hall' | 'Library Zone' | 'Conference' | 'Auditorium';
  occupancy: number;
  capacity: number;
  temperature: number;
  humidity: number;
  co2: number;
  lux: number;
  ac_status: 'ON' | 'SETBACK' | 'STANDBY' | 'OFF';
  ac_setpoint: number;
  lighting_status: 'ON' | 'OFF' | 'DIMMED';
  power_kw: number;
  baseline_power_kw: number;
  state: RoomState;
  cooldown_rate: number; // °C/min
  next_scheduled_occupancy?: string;
  equipment_response: 'NORMAL' | 'CHECK_REQUIRED';
  critical: boolean; // if true, load protection overrides setbacks
}

export interface DecisionRecord {
  id: string;
  timestamp: string;
  room_id: string;
  room_name: string;
  state: RoomState;
  action: 'SET_AC_SETPOINT' | 'TURN_OFF_LIGHTS' | 'INITIATE_PRE_COOL' | 'GRID_DEMAND_SHED' | 'RESTORE_COMFORT' | 'VENTILATION_ALERT';
  target: string;
  old_value: string;
  new_value: string;
  reason: string;
  guardrail_status: 'PASSED' | 'BLOCKED';
  guardrail_note?: string;
  executed: boolean;
  priority: 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
}

export interface HourlyEnergyPoint {
  time: string;
  hour: number;
  baseline_kw: number;
  controlled_kw: number;
  outdoor_temp: number;
  occupancy_count: number;
  is_peak: boolean;
}

export interface BuildingConfig {
  id: string;
  name: string;
  category: BuildingCategory;
  climate: ClimateRegion;
  area_m2: number;
  comfort_min_c: number;
  comfort_max_c: number;
  co2_threshold_ppm: number;
  lux_target: number;
  idle_vacancy_threshold_min: number;
  pre_cooling_buffer_min: number;
}

export interface BuildingStatus {
  name: string;
  category: BuildingCategory;
  climate: ClimateRegion;
  outdoor_temp: number;
  outdoor_humidity: number;
  grid_status: GridStatus;
  total_occupancy: number;
  max_capacity: number;
  current_building_load_kw: number;
  current_optimized_load_kw: number;
  system_state: 'ACTIVE OPTIMIZATION' | 'GRID SHED ACTIVE' | 'MONITORING' | 'PRE-CONDITIONING';
  area_m2: number;
  flexible_load_percent: number;
  critical_load_percent: number;
  other_load_percent: number;
}

export interface VerificationMetrics {
  baseline_kwh: number;
  controlled_kwh: number;
  saved_kwh: number;
  saving_percent: number;
  comfort_compliance_percent: number;
  baseline_peak_kw: number;
  controlled_peak_kw: number;
  peak_demand_shed_kw: number;
  energy_intensity_kwh_m2: number;
  baseline_intensity_kwh_m2?: number;
  controlled_intensity_kwh_m2?: number;
}

export interface AlertItem {
  id: string;
  type: 'ENERGY_WASTE' | 'COMFORT' | 'IAQ' | 'EQUIPMENT' | 'GRID' | 'SAFETY';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  time: string;
  room_id?: string;
  read: boolean;
}

export interface InsightItem {
  id: string;
  category: 'Energy' | 'Comfort' | 'IAQ' | 'Occupancy' | 'Equipment' | 'Grid';
  title: string;
  description: string;
  impact: string;
  action: string;
  metric?: string;
}

export interface RoomTimelineEvent {
  time: string;
  state: RoomState;
  temp: number;
  actionSummary: string;
}
