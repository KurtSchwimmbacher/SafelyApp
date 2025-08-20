import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useAuth } from "../contexts/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import { View, Text, StyleSheet } from "react-native";
import { logoutUser } from "../services/authService";
import DashboardScreen from "../screens/dashboardScreen";
import { Typography } from "../styles/GlobalStyles";

export type DrawerParamList = {
  Home: undefined;
  Dashboard: undefined; 
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// Custom Drawer Content
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={Typography.heading}>Safely</Text>
      </View>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Stats"
        onPress={() => props.navigation.navigate("Dashboard")} 
      />
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          logoutUser();
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true, 
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} /> 
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});