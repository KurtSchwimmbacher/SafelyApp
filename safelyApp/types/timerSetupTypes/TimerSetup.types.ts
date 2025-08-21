export interface TimerSetupProps {
  minutes: number;
  timerName: string;
  checkIns: string;
  checkInContact: string;
  setMinutes: (minutes: number) => void;
  setTimerName: (name: string) => void;
  setCheckIns: (checkIns: string) => void;
  setCheckInContact: (contact: string) => void;
  handleSaveTimer: () => Promise<void>;
}