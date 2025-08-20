// DrawerNavigator.tsx
import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/dashboardScreen';
import { logoutUser } from '../services/authService';
import { getUserProfile, userProfile } from '../services/userService';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from '../styles/GlobalStyles';

export type DrawerParamList = {
  Home: undefined;
  Dashboard: undefined;
  Settings: undefined; // (placeholder)
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// ——— Small helper to make drawer items consistent
type RowProps = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  focused?: boolean;
  onPress: () => void;
  testID?: string;
};

const DrawerItemRow: React.FC<RowProps> = ({ label, icon, focused, onPress, testID }) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: 'rgba(0,160,160,0.15)' }}
    style={({ pressed }) => [
      styles.itemRow,
      (focused || pressed) && styles.itemRowActive,
      Shadows.subtle,
    ]}
    accessibilityRole="button"
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    testID={testID}
  >
    <MaterialCommunityIcons
      name={icon}
      size={22}
      color={focused ? Colors.base : Colors.darker}
      style={styles.itemIcon}
    />
    <Text
      style={[
        Typography.body,
        styles.itemLabel,
        { color: focused ? Colors.base : Colors.darker },
      ]}
      numberOfLines={1}
    >
      {label}
    </Text>
    {focused && <View style={styles.activeDot} />}
  </Pressable>
);

// ——— Custom drawer content
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation, state } = props;
  const { user } = useAuth();
  const [profile, setProfile] = useState<userProfile | null>(null);

  const currentRoute = state.routeNames[state.index];
  const isFocused = (name: keyof DrawerParamList) => currentRoute === name;

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      }
    };
    fetchProfile();
  }, [user]);

  // fallback initials
  const initials =
    (profile?.firstName?.[0] ||
      user?.email?.[0] ||
      'S').toUpperCase();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerScroll}
      style={styles.drawerContent}
    >
      {/* Header */}
      <View style={[styles.header, Shadows.subtle]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[Typography.heading, styles.brand]}>Safely</Text>
          <Text style={[Typography.caption, styles.subtleText]}>
            {profile?.firstName
              ? `Welcome, ${profile.firstName}`
              : user?.email || 'Stay safe out there'}
          </Text>
        </View>
      </View>

      {/* Nav items */}
      <View style={styles.section}>
        <DrawerItemRow
          label="Home"
          icon="home"
          focused={isFocused('Home')}
          onPress={() => navigation.navigate('Home')}
          testID="nav-home"
        />
        <DrawerItemRow
          label="Stats"
          icon="chart-line"
          focused={isFocused('Dashboard')}
          onPress={() => navigation.navigate('Dashboard')}
          testID="nav-stats"
        />
        {/* Example placeholder:
        <DrawerItemRow
          label="Settings"
          icon="cog"
          focused={isFocused('Settings')}
          onPress={() => navigation.navigate('Settings')}
        /> */}
      </View>

      {/* Footer actions */}
      <View style={styles.footerSpacer} />
      <View style={styles.footer}>
        <Pressable
          onPress={() => {
            logoutUser();
            // @ts-ignore (Landing may be in parent navigator)
            navigation.navigate(user ? 'Home' : 'Landing');
          }}
          android_ripple={{ color: 'rgba(0,160,160,0.15)' }}
          style={[styles.signOutRow, Shadows.subtle]}
        >
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={Colors.darker}
            style={styles.itemIcon}
          />
          <Text style={[Typography.body, styles.signOutLabel]}>Sign Out</Text>
        </Pressable>

        <Text style={[Typography.caption, styles.version]}>
          v1.0.0
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTitleStyle: [Typography.heading, { color: Colors.darker }],
        headerTintColor: Colors.darker,
        headerShadowVisible: false,
        headerTransparent: false,
        drawerStyle: {
          backgroundColor: Colors.white,
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Safely' }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerTitle: 'Stats' }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: Colors.white,
  },
  drawerScroll: {
    paddingVertical: Spacing.md,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lighter,
    marginBottom: Spacing.sm,
  },
  brand: {
    color: Colors.base,
  },
  subtleText: {
    color: Colors.dark,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,160,160,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Typography.button,
    color: Colors.base,
  },

  // Items
  section: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },
  itemRowActive: {
    backgroundColor: 'rgba(0,160,160,0.10)',
  },
  itemIcon: {
    marginRight: Spacing.md,
  },
  itemLabel: {
    flex: 1,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.base,
    marginLeft: Spacing.md,
  },

  // Footer
  footerSpacer: {
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Platform.select({ ios: 16, android: 12, default: 12 }),
    gap: Spacing.sm,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },
  signOutLabel: {
    color: Colors.darker,
  },
  version: {
    textAlign: 'center',
    color: Colors.dark,
    opacity: 0.7,
  },
});
