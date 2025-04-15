import { View, Text, StyleSheet, Pressable, ScrollView, useWindowDimensions, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  useSharedValue,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Music2, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { events } from '@/data/events';
import { useFiltersStore, getFilteredEvents } from '@/store/filters';

// Conditionally import MapView to avoid web issues
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;

if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
    PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  } catch (e) {
    console.warn('react-native-maps failed to load:', e);
  }
}

const INITIAL_REGION = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapComponent = ({ location, filteredEvents, handleEventPress, eventCoordinates }: any) => {
  if (Platform.OS === 'web' || !MapView) {
    return (
      <View style={[styles.mapContainer, { backgroundColor: '#111' }]}>
        <Text style={styles.webMapPlaceholder}>
          Map view is not available on web. Please use our mobile app for the full experience.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={location}
        showsUserLocation
        showsMyLocationButton
      >
        {filteredEvents.map((event: any) => (
          <Marker
            key={event.id}
            coordinate={eventCoordinates[event.location as keyof typeof eventCoordinates]}
            title={event.name}
            description={event.genre}
            onPress={() => handleEventPress(event)}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Music2 size={16} color="#000" />
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const [showMap, setShowMap] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [location, setLocation] = useState(INITIAL_REGION);
  const [isScanning, setIsScanning] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const filters = useFiltersStore();
  
  const filteredEvents = getFilteredEvents(events, filters);
  
  const initialPosition = height * 0.4 - 150;
  
  const scale1 = useSharedValue(0);
  const scale2 = useSharedValue(0);
  const scale3 = useSharedValue(0);
  const scale4 = useSharedValue(0);
  
  const opacity1 = useSharedValue(1);
  const opacity2 = useSharedValue(1);
  const opacity3 = useSharedValue(1);
  const opacity4 = useSharedValue(1);
  
  const radarTopPosition = useSharedValue(initialPosition);
  const eventsOpacity = useSharedValue(0);

  useEffect(() => {
    // Get location permission and current position
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setHasLocation(true);
      } catch (error) {
        console.warn('Error getting location:', error);
        // Set hasLocation true anyway on web since we'll show a placeholder
        if (Platform.OS === 'web') {
          setHasLocation(true);
        }
      }
    })();
  }, []);

  const startAnimation = () => {
    if (!hasLocation || isScanning) return;
    
    setIsScanning(true);
    setShowMap(false);
    setShowEvents(false);
    
    [scale1, scale2, scale3, scale4, opacity1, opacity2, opacity3, opacity4]
      .forEach(value => cancelAnimation(value));
    
    scale1.value = 0;
    scale2.value = 0;
    scale3.value = 0;
    scale4.value = 0;
    opacity1.value = 1;
    opacity2.value = 1;
    opacity3.value = 1;
    opacity4.value = 1;
    eventsOpacity.value = 0;
    radarTopPosition.value = initialPosition;
    
    const duration = 4000;
    const delay = duration / 3;
    
    const animateRing = (scale: any, opacity: any, delay: number, maxScale = 2) => {
      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(maxScale, {
            duration,
            easing: Easing.out(Easing.ease),
          })
        )
      );

      opacity.value = withDelay(
        delay,
        withSequence(
          withTiming(1, { duration: 0 }),
          withTiming(0, {
            duration,
            easing: Easing.out(Easing.ease),
          })
        )
      );
    };

    animateRing(scale1, opacity1, 0, 1.5);
    animateRing(scale2, opacity2, delay, 1.8);
    animateRing(scale3, opacity3, delay * 2, 2.1);
    animateRing(scale4, opacity4, delay * 3, 2.4);

    setTimeout(() => {
      radarTopPosition.value = withTiming(40, {
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      });
      eventsOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      setShowEvents(true);
      setShowMap(true);
      setIsScanning(false);
    }, 6000);
  };

  const handleEventPress = (event: any) => {
    router.push({
      pathname: '/event-details',
      params: {
        ...event,
        lineup: JSON.stringify(event.lineup),
        tags: event.tags.join(', ')
      }
    });
  };

  const eventCoordinates = {
    'New York': { latitude: 40.7128, longitude: -74.0060 },
    'Los Angeles': { latitude: 34.0522, longitude: -118.2437 },
    'Miami': { latitude: 25.7617, longitude: -80.1918 },
    'Las Vegas': { latitude: 36.1699, longitude: -115.1398 },
    'Chicago': { latitude: 41.8781, longitude: -87.6298 },
    'San Francisco': { latitude: 37.7749, longitude: -122.4194 },
    'London': { latitude: 51.5074, longitude: -0.1278 },
    'Berlin': { latitude: 52.5200, longitude: 13.4050 },
    'Amsterdam': { latitude: 52.3676, longitude: 4.9041 },
    'Tokyo': { latitude: 35.6762, longitude: 139.6503 },
  };

  const createRingStyle = (scale: any, opacity: any) => 
    useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

  const radarContainerStyle = useAnimatedStyle(() => ({
    marginTop: radarTopPosition.value,
  }));

  const eventsContainerStyle = useAnimatedStyle(() => ({
    opacity: eventsOpacity.value,
  }));

  const ring1Style = createRingStyle(scale1, opacity1);
  const ring2Style = createRingStyle(scale2, opacity2);
  const ring3Style = createRingStyle(scale3, opacity3);
  const ring4Style = createRingStyle(scale4, opacity4);

  return (
    <View style={styles.container}>
      {!showMap ? (
        <Animated.View style={[styles.radarWrapper, radarContainerStyle]}>
          <Pressable onPress={startAnimation} style={styles.radarContainer}>
            <View style={styles.center} />
            <Animated.View style={[styles.ring, ring1Style]} />
            <Animated.View style={[styles.ring, ring2Style]} />
            <Animated.View style={[styles.ring, ring3Style]} />
            <Animated.View style={[styles.ring, ring4Style]} />
          </Pressable>
          <Text style={styles.instruction}>
            {!hasLocation 
              ? "Waiting for location access..."
              : isScanning 
                ? "Scanning for events nearby..."
                : "Tap the radar to scan for events"}
          </Text>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.contentContainer, eventsContainerStyle]}>
          <ScrollView style={styles.scrollView}>
            <MapComponent
              location={location}
              filteredEvents={filteredEvents}
              handleEventPress={handleEventPress}
              eventCoordinates={eventCoordinates}
            />

            <View style={styles.eventListContainer}>
              <Text style={styles.title}>
                Found {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Nearby
                {filters.selectedCity ? ` in ${filters.selectedCity}` : ''}
                {filters.timeFilter !== 'all' ? ` for ${filters.timeFilter}` : ''}
              </Text>
              
              {filteredEvents.map((event) => (
                <Pressable
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => handleEventPress(event)}
                >
                  <View style={styles.eventHeader}>
                    <Music2 size={24} color="#00ff88" />
                    <Text style={styles.genre}>{event.genre}</Text>
                  </View>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <View style={styles.eventInfo}>
                    <Calendar size={16} color="#666" />
                    <Text style={styles.eventDetails}>{event.date}</Text>
                    <Clock size={16} color="#666" />
                    <Text style={styles.eventDetails}>{event.time}</Text>
                  </View>
                  <View style={styles.eventInfo}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.eventLocation}>{event.location}</Text>
                    <Users size={16} color="#666" />
                    <Text style={styles.eventDetails}>{event.attendees} going</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  radarWrapper: {
    alignItems: 'center',
  },
  radarContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00ff88',
    position: 'absolute',
    zIndex: 2,
    shadowColor: '#00ff88',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  ring: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#00ff88',
    position: 'absolute',
  },
  instruction: {
    color: '#666',
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 16,
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  webMapPlaceholder: {
    color: '#666',
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 16,
    paddingTop: 140,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#00ff88',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  eventListContainer: {
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    marginBottom: 24,
  },
  eventCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00ff88',
    gap: 8,
    marginBottom: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  genre: {
    color: '#00ff88',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  eventName: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetails: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#666',
    flex: 1,
  },
  eventLocation: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#666',
    flex: 1,
  },
});