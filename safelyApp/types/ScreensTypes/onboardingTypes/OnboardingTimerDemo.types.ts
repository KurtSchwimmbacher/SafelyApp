import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";

export type Props = NativeStackScreenProps<RootStackParamList, "OnboardingTimerDemo">;

export interface DummyContact {
  id: string;
  name: string;
  phoneNumber: string;
}