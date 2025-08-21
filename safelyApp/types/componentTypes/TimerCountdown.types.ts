export interface TimerCountdownProps {
  secondsRemaining: number;
  initialSeconds: number;
  nextCheckIn: number | null;
  nextCheckInTime: string | null;
  showCheckInButton: boolean;
  formatTime: (seconds: number) => string;
  handleCheckIn: () => void;
  timerId: string;
  timerName: string;
  currentMinutes: number | undefined;
  checkIns: string;
  checkInContact: string;
  onTimerUpdated: () => Promise<void>;
  onTimerDeleted: () => void;
}