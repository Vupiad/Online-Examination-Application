import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bell, BookOpen, Clock, Play } from 'lucide-react-native';
import api from '../services/api';

const StudentDashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState({ fullName: 'Student' });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
          const parsedUser = JSON.parse(userStr);
          setUser(parsedUser);
          const res = await api.get(`/api/exam/results/user/${parsedUser.id}`);
          setHistory(res.data);
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
          <Text style={styles.greeting}>Hello, {user.fullName.split(' ').pop()} 👋</Text>
          <Text style={styles.subtitle}>Ready to crunch some exams?</Text>
        </View>
        <TouchableOpacity style={styles.bellIcon} onPress={logout}>
          <Bell color="#026880" size={24} />
        </TouchableOpacity>
      </View>

      {/* Main Action Card */}
      <View style={styles.primaryCard}>
        <Text style={styles.cardTitle}>Test your knowledge</Text>
        <Text style={styles.cardSubtitle}>Enter a pass code to join your next examination block now.</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Play color="#FFF" size={16} />
          <Text style={styles.joinButtonText}>Join Exam</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Tests</Text>
      {history.length > 0 ? history.map((item, index) => (
        <View key={index} style={styles.historyCard}>
          <View style={styles.historyIcon}>
            <BookOpen color="#026880" size={24} />
          </View>
          <View style={styles.historyInfo}>
            <Text style={styles.historyName}>{item.examName}</Text>
            <View style={styles.historyMeta}>
              <Clock color="#aab3b8" size={12} />
              <Text style={styles.historyDate}>{new Date(item.submittedAt).toLocaleDateString()}</Text>
            </View>
          </View>
          <View style={styles.scoreBadge}>
             <Text style={styles.scoreText}>{item.score.toFixed(1)}</Text>
          </View>
        </View>
      )) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No test history found.</Text>
        </View>
      )}
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
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  joinButtonText: {
    color: '#026880',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b3437',
    marginBottom: 16,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dbe4e9',
  },
  historyIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#cee7ec',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b3437',
    marginBottom: 4,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyDate: {
    fontSize: 12,
    color: '#aab3b8',
    fontWeight: '600',
  },
  scoreBadge: {
    backgroundColor: '#f1faff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  scoreText: {
    color: '#026880',
    fontWeight: '900',
    fontSize: 16,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#aab3b8',
    fontWeight: 'bold',
  }
});

export default StudentDashboardScreen;
