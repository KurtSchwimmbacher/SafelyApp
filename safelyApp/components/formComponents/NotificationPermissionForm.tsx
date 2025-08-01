import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles } from '../../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-gesture-handler';

const NotificationPermissionForm = ({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) => {
    const [personalized, setPersonalized] = useState(true);
  return (
    <View>

        <Text style={[Typography.title, { marginBottom: Spacing.md, textAlign: 'center' }]}>
            Enable Notifications
        </Text>

        <Text style={[Typography.body, { marginBottom: Spacing.md, textAlign: 'center' }]}>
            Stay up to date with important updates and alerts.
        </Text>
    
        <View style={styles.bar}>
            <Text style={styles.barText}>Get personalised recommendations and more</Text>
            <Switch
                value={personalized}
                onValueChange={setPersonalized}
                trackColor={{ false: Colors.light, true: Colors.primaryLight }}
                thumbColor={personalized ? Colors.primary : Colors.light}
            />
        </View>

        <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg, width: '100%' }]}
            onPress={() => {
            //  request permission here with Expo Notifications API
            console.log('Notification permission requested');
            onFinish();
            }}
        >
            <Text style={GlobalStyles.buttonText}>Yes, notify me</Text>
        </TouchableOpacity>
    </View>
  );
};

export default NotificationPermissionForm;

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightest,
    borderRadius: Spacing.sm,
    padding: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    justifyContent: 'space-between',
  },
  barText: {
    flex: 1,
    color: Colors.midDark,
    fontSize: 16,
    marginRight: 12,
  },
});