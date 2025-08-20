import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet, Dimensions, Alert } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Colors, Spacing, Typography, GlobalStyles, Shadows, Radius } from "../../styles/GlobalStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { getAuth } from "firebase/auth";
import { updateUserOnboardingStatus } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingTimerDemo">;

interface DummyContact {
  id: string;
  name: string;
  phoneNumber: string;
}

const CheckInSelector: React.FC<{ checkIns: number; setCheckIns: (num: number) => void }> = ({ checkIns, setCheckIns }) => {
  const maxCheckIns = 5;
  return (
    <View style={styles.checkInContainer}>
      <View style={styles.iconsContainer}>
        {[...Array(maxCheckIns)].map((_, index) => {
          const isSelected = index + 1 <= checkIns;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.iconWrapper, Shadows.subtle]}
              onPress={() => setCheckIns(checkIns === index + 1 ? 0 : index + 1)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={isSelected ? "checkbox-marked-circle" : "circle-outline"}
                size={32}
                color={isSelected ? Colors.base : Colors.light}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function OnboardingTimerDemo({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [minutes, setMinutes] = useState(15);
  const [timerName, setTimerName] = useState("");
  const [checkIns, setCheckIns] = useState("0");
  const [checkInContact, setCheckInContact] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const { setHasOnboarded } = useAuth();

  const dummyContacts: DummyContact[] = [
    { id: "1", name: "John Doe", phoneNumber: "+1-555-123-4567" },
    { id: "2", name: "Jane Smith", phoneNumber: "+1-555-987-6543" },
    { id: "3", name: "Alice Johnson", phoneNumber: "+1-555-555-5555" },
  ];

  const selectContact = (contact: DummyContact) => {
    setCheckInContact(contact.phoneNumber);
    setModalVisible(false);
    advanceStep();
  };

  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  const advanceStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (isLoading) return;
    setIsLoading(true);
    navigation.navigate("OnboardingCheckInDemo");
    setIsLoading(false);
  };

  const windowWidth = Dimensions.get("window").width;
  const circleSize = windowWidth * 0.65;

  const steps = [
    { title: "Step 1: Name your timer", instruction: "Enter a name, like 'Evening Walk'.", action: () => setTimerName("Evening Walk") },
    { title: "Step 2: Set the duration", instruction: "Use the buttons to adjust minutes.", action: () => updateMinutes(1) },
    { title: "Step 3: Choose check-ins", instruction: "Select how many check-ins you want.", action: () => setCheckIns("2") },
    { title: "Step 4: Pick a contact", instruction: "Choose who to notify for check-ins.", action: () => setModalVisible(true) },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index + 1 <= currentStep ? styles.progressDotActive : styles.progressDotInactive,
            ]}
          />
        ))}
      </View>

      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
        <Text style={[Typography.subheading, styles.stepTitle]}>{steps[currentStep - 1].title}</Text>
        <Text style={[Typography.body, styles.instruction]}>{steps[currentStep - 1].instruction}</Text>

        {currentStep === 1 && (
          <Animated.View entering={FadeIn} style={styles.inputContainer}>
            <TextInput
              style={[styles.input, Typography.body]}
              placeholder="Timer Name (e.g., Evening Walk)"
              placeholderTextColor={Colors.light}
              value={timerName}
              onChangeText={(text) => setTimerName(text)}
              textAlignVertical="center"
            />
            <TouchableOpacity
              style={[styles.actionButton, Shadows.subtle]}
              onPress={() => { steps[0].action(); advanceStep(); }}
            >
              <Text style={styles.actionButtonText}>Try it!</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {currentStep === 2 && (
          <Animated.View entering={FadeIn} style={styles.inputContainer}>
            <View style={styles.circleContainer}>
              <TouchableOpacity
                style={[styles.circleButton, Shadows.subtle]}
                onPress={() => updateMinutes(-1)}
              >
                <MaterialCommunityIcons name="minus" size={32} color={Colors.white} />
              </TouchableOpacity>
              <Svg height={circleSize} width={circleSize} viewBox="0 0 200 200">
                <Circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke={Colors.darker}
                  strokeWidth="20"
                  fill="none"
                />
                <Circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke={Colors.base}
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={[2 * Math.PI * 90 * (minutes / 60), 2 * Math.PI * 90]}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                />
                <SvgText
                  x="100"
                  y="100"
                  textAnchor="middle"
                  dy=".3em"
                  fill={Colors.darker}
                  fontSize={48}
                  fontFamily="SpaceGrotesk_400Regular"
                >
                  {minutes}
                </SvgText>
                <SvgText
                  x="100"
                  y="140"
                  textAnchor="middle"
                  fill={Colors.dark}
                  fontSize={18}
                  fontFamily="Inter_400Regular"
                >
                  Minutes
                </SvgText>
              </Svg>
              <TouchableOpacity
                style={[styles.circleButton, Shadows.subtle]}
                onPress={() => { updateMinutes(1); advanceStep(); }}
              >
                <MaterialCommunityIcons name="plus" size={32} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {currentStep === 3 && (
          <Animated.View entering={FadeIn} style={styles.inputContainer}>
            <CheckInSelector checkIns={parseInt(checkIns) || 0} setCheckIns={(num) => { setCheckIns(num.toString()); advanceStep(); }} />
          </Animated.View>
        )}

        {currentStep === 4 && (
          <Animated.View entering={FadeIn} style={styles.inputContainer}>
            <TouchableOpacity
              style={[GlobalStyles.fullWidthButton, styles.contactButton, Shadows.subtle]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={[Typography.body, { color: checkInContact ? Colors.darker : Colors.light }]}>
                {checkInContact || "Select Check-in Contact"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={[Typography.heading, styles.modalHeading]}>Select a Contact (Demo)</Text>
          <Text style={[Typography.caption, styles.modalNote]}>These are sample contacts for the demo.</Text>
          <FlatList
            data={dummyContacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => selectContact(item)}
              >
                <Text style={[Typography.body, { color: Colors.darker }]}>{item.name}</Text>
                <Text style={[Typography.caption, { color: Colors.dark }]}>{item.phoneNumber}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, styles.modalCancelButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={GlobalStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {currentStep === 4 && checkInContact && (
        <Animated.View entering={FadeIn}>
          <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, styles.completeButton, Shadows.subtle, isLoading && styles.disabledButton]}
            onPress={handleComplete}
            disabled={isLoading}
          >
            <Text style={GlobalStyles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
    marginHorizontal: Spacing.xs,
  },
  progressDotActive: {
    backgroundColor: Colors.base,
  },
  progressDotInactive: {
    backgroundColor: Colors.lighter,
  },
  stepContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightest,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadows.subtle,
  },
  stepTitle: {
    color: Colors.darker,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  instruction: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
    color: Colors.darker,
    height: 52,
    textAlignVertical: "center",
    width: "100%",
  },
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  circleButton: {
    backgroundColor: Colors.base,
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Spacing.md,
  },
  checkInContainer: {
    width: "100%",
    marginBottom: Spacing.sm,
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    padding: Spacing.xs,
  },
  contactButton: {
    width: "100%",
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  completeButton: {
    width: "100%",
    marginTop: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  modalHeading: {
    color: Colors.darker,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  modalNote: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  contactItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
  },
  modalCancelButton: {
    marginTop: Spacing.md,
    width: "100%",
  },
  disabledButton: {
    opacity: 0.6,
  },
  actionButton: {
    backgroundColor: Colors.base,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
});