export interface CheckInSelectorProps {
  checkIns: number;
  setCheckIns: (num: number) => void;
}


export interface DurationPickerProps {
  minutes: number;
  setMinutes: (num: number) => void;
}


export interface EditTimerModalProps {
  visible: boolean;
  onClose: () => void;
  timerId: string;
  currentName: string;
  currentMinutes: number | undefined;
  currentCheckIns: number;
  currentContact: string;
  onTimerUpdated: () => Promise<void>;
  onTimerDeleted: () => void;
}