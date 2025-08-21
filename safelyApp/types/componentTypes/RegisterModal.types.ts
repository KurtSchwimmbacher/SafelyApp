import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}