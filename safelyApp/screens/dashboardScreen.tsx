import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getDashboardSummary,
  DashboardSummary,
} from '../services/dashboardService';
import {
  Colors,
  Spacing,
  Radius,
  Shadows,
  Typography,
} from '../styles/GlobalStyles';
import { styles } from '../styles/screenStyles/dashboardScreen.styles';

const DashboardScreen: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors.base} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Total Hours Card */}
      <View style={[styles.card, Shadows.subtle]}>
        <Text style={styles.sectionTitle}>Total Hours Logged</Text>
        <Text style={styles.sectionValue}>{summary?.totalHours} hrs</Text>
      </View>

      {/* Timer Names Card */}
      <View style={[styles.card, Shadows.subtle]}>
        <Text style={styles.sectionTitle}>Most Used Timer Names</Text>
        {summary?.timerNameCounts.length ? (
          <FlatList
            data={summary.timerNameCounts}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.timerNameItem}>
                <Text style={styles.timerNameText}>{item.name}</Text>
                <Text style={styles.timerCountText}>{item.count}×</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No timers found.</Text>
            }
          />
        ) : (
          <Text style={styles.emptyText}>No timer names recorded.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
