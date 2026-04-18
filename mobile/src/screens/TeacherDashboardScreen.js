import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bell, BookOpen, Clock, FileText, CheckCircle } from 'lucide-react-native';
import api from '../services/api';

const TeacherDashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState({ fullName: 'Teacher' });
  const [stats, setStats] = useState({
    openExamsCount: 0,
    studentsTestingCount: 0,
    completionRateToday: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
          setUser(JSON.parse(userStr));
          const res = await api.get('/api/exam/stats');
          setStats(res.data);
        }
      } catch (err) {
        console.error("Error fetching mobile dashboard data", err);
      }
    };
    fetchData();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Teacher Dashboard</Text>
          <Text style={styles.subtitle}>Welcome back, {user.fullName.split(' ').pop()}</Text>
        </View>
        <TouchableOpacity style={styles.bellIcon} onPress={logout}>
          <Bell color="#026880" size={24} />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
         <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#cee7ec' }]}>
               <FileText color="#026880" size={20} />
            </View>
            <Text style={styles.statLabel}>Active Exams</Text>
            <Text style={styles.statValue}>{stats.openExamsCount || 0}</Text>
         </View>
         <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#e2faea' }]}>
               <BookOpen color="#34a853" size={20} />
            </View>
            <Text style={styles.statLabel}>Testing Now</Text>
            <Text style={styles.statValue}>{stats.studentsTestingCount || 0}</Text>
         </View>
      </View>

      <View style={styles.fullStatCard}>
         <View style={[styles.statIcon, { backgroundColor: '#f3e8ff' }]}>
            <CheckCircle color="#9333ea" size={20} />
         </View>
         <View style={{ marginLeft: 16 }}>
            <Text style={styles.statLabel}>Completion Rate</Text>
            <Text style={styles.statValue}>{stats.completionRateToday || 0}%</Text>
         </View>
      </View>

      {/* Primary Action */}
      <View style={styles.primaryCard}>
        <Text style={styles.cardTitle}>Create New Exam</Text>
        <Text style={styles.cardSubtitle}>Draft a new multiple choice, essay, or coding test.</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '900',
    color: '#026880',
  },
  subtitle: {
    fontSize: 14,
    color: '#aab3b8',
    marginTop: 4,
  },
  bellIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dbe4e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  statsGrid: {
     flexDirection: 'row',
     gap: 16,
     marginBottom: 16,
  },
  statCard: {
     flex: 1,
     backgroundColor: '#FFF',
     padding: 24,
     borderRadius: 24,
     borderWidth: 1,
     borderColor: '#dbe4e9',
  },
  fullStatCard: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#FFF',
     padding: 24,
     borderRadius: 24,
     borderWidth: 1,
     borderColor: '#dbe4e9',
     marginBottom: 30,
  },
  statIcon: {
     width: 48,
     height: 48,
     borderRadius: 16,
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 16,
  },
  statLabel: {
     fontSize: 12,
     color: '#aab3b8',
     fontWeight: 'bold',
     textTransform: 'uppercase',
     letterSpacing: 1,
     marginBottom: 4,
  },
  statValue: {
     fontSize: 32,
     fontWeight: '900',
     color: '#2b3437',
  },
  primaryCard: {
    backgroundColor: '#026880',
    padding: 24,
    borderRadius: 24,
    marginBottom: 30,
    shadowColor: '#026880',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#cee7ec',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  joinButtonText: {
    color: '#026880',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TeacherDashboardScreen;
