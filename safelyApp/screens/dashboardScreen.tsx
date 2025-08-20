import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Colors, Spacing } from '../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDashboardSummary, DashboardSummary } from '../services/dashboardService';

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
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.base} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Total Hours Logged</Text>
        <Text style={styles.sectionValue}>{summary?.totalHours} hours</Text>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Most Used Timer Names</Text>
        {summary?.timerNameCounts.length ? (
          <FlatList
            data={summary.timerNameCounts}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.timerNameItem}>
                <Text style={styles.timerNameText}>{item.name}</Text>
                <Text style={styles.timerCountText}>{item.count} times</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No timers found.</Text>}
          />
        ) : (
          <Text style={styles.emptyText}>No timer names recorded.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  summarySection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.lighter,
    marginBottom: Spacing.sm,
  },
  sectionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.base,
  },
  timerNameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.lightest,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  timerNameText: {
    fontSize: 16,
    color: Colors.base,
  },
  timerCountText: {
    fontSize: 16,
    color: Colors.base,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.darker,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  errorText: {
    fontSize: 16,
    color: Colors.darkest,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});