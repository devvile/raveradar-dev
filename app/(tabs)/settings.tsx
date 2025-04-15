import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MapPin, Music, Calendar, Clock } from 'lucide-react-native';
import { useFiltersStore } from '@/store/filters';
import type { TimeFilter } from '@/types/events';
import DateRangePicker from '@/components/DateRangePicker';

const cities = [
  'New York',
  'Los Angeles',
  'Miami',
  'Las Vegas',
  'Chicago',
  'San Francisco',
  'London',
  'Berlin',
  'Amsterdam',
  'Tokyo',
];

const genres = [
  'House',
  'Techno',
  'Trance',
  'Drum & Bass',
  'Dubstep',
  'EDM',
  'Progressive',
  'Deep House',
  'Tech House',
  'Minimal',
  'Hardstyle',
  'Bass House',
  'Future House',
  'Melodic Techno',
  'Industrial',
];

const timeFilters: { id: TimeFilter; label: string }[] = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: 'weekend', label: 'This Weekend' },
  { id: 'week', label: 'This Week' },
];

export default function SettingsScreen() {
  const { 
    selectedCity, 
    selectedGenres, 
    timeFilter,
    customDateRange,
    setSelectedCity, 
    setSelectedGenres,
    setTimeFilter,
  } = useFiltersStore();

  const toggleGenre = (genre: string) => {
    setSelectedGenres(
      selectedGenres.includes(genre)
        ? selectedGenres.filter(g => g !== genre)
        : [...selectedGenres, genre]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Filters</Text>
        <Text style={styles.subtitle}>Customize your radar search</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Clock size={24} color="#00ff88" />
          <Text style={styles.sectionTitle}>Time Frame</Text>
        </View>
        <View style={styles.timeGrid}>
          {timeFilters.map((filter) => (
            <Pressable
              key={filter.id}
              style={[
                styles.timeButton,
                timeFilter === filter.id && styles.timeButtonSelected,
              ]}
              onPress={() => setTimeFilter(filter.id)}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  timeFilter === filter.id && styles.timeButtonTextSelected,
                ]}
              >
                {filter.label}
              </Text>
            </Pressable>
          ))}
          <DateRangePicker />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MapPin size={24} color="#00ff88" />
          <Text style={styles.sectionTitle}>City</Text>
        </View>
        <View style={styles.cityGrid}>
          {cities.map((city) => (
            <Pressable
              key={city}
              style={[
                styles.cityButton,
                selectedCity === city && styles.cityButtonSelected,
              ]}
              onPress={() => setSelectedCity(selectedCity === city ? null : city)}
            >
              <Text
                style={[
                  styles.cityButtonText,
                  selectedCity === city && styles.cityButtonTextSelected,
                ]}
              >
                {city}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Music size={24} color="#00ff88" />
          <Text style={styles.sectionTitle}>Music Genres</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Select multiple genres</Text>
        <View style={styles.genreGrid}>
          {genres.map((genre) => (
            <Pressable
              key={genre}
              style={[
                styles.genreButton,
                selectedGenres.includes(genre) && styles.genreButtonSelected,
              ]}
              onPress={() => toggleGenre(genre)}
            >
              <Text
                style={[
                  styles.genreButtonText,
                  selectedGenres.includes(genre) && styles.genreButtonTextSelected,
                ]}
              >
                {genre}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Search Range</Text>
        <View style={styles.statsContent}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>50km</Text>
            <Text style={styles.statLabel}>Radius</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{selectedGenres.length}</Text>
            <Text style={styles.statLabel}>Genres</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {timeFilter === 'custom' && customDateRange.start && customDateRange.end
                ? `${Math.ceil((customDateRange.end.getTime() - customDateRange.start.getTime()) / (1000 * 60 * 60 * 24))}d`
                : timeFilter === 'all'
                ? '∞'
                : timeFilter}
            </Text>
            <Text style={styles.statLabel}>Time Frame</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#666',
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#666',
    marginBottom: 16,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  timeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  timeButtonSelected: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  timeButtonTextSelected: {
    color: '#000',
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cityButtonSelected: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
  },
  cityButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  cityButtonTextSelected: {
    color: '#000',
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  genreButtonSelected: {
    backgroundColor: 'rgba(0,255,136,0.1)',
    borderColor: '#00ff88',
  },
  genreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  genreButtonTextSelected: {
    color: '#00ff88',
  },
  statsContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#00ff88',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#666',
    marginTop: 4,
  },
});