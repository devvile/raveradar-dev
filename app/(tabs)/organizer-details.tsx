import { View, Text, StyleSheet, Image, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { X, MapPin, Users, Calendar, Globe, Instagram, Facebook } from 'lucide-react-native';
import { organizers } from '@/data/organizers';
import { events } from '@/data/events';

export default function OrganizerDetails() {
  const { id } = useLocalSearchParams();
  const organizer = organizers.find(org => org.id === id);
  
  if (!organizer) {
    return null;
  }

  const organizerEvents = events.filter(event => event.organizerId === id);
  const today = new Date();
  const upcomingEvents = organizerEvents.filter(event => new Date(event.date) >= today);
  const pastEvents = organizerEvents.filter(event => new Date(event.date) < today);

  // Sort events by date
  upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  pastEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEventPress = (event: any) => {
    router.push({
      pathname: '/event-details',
      params: {
        ...event,
        djs: event.djs.join(', '),
        tags: event.tags.join(', ')
      }
    });
  };

  const handleSocialPress = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: organizer.image }}
          style={styles.image}
        />
        
        <Pressable 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X color="#fff" size={24} />
        </Pressable>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{organizer.name}</Text>
            
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <MapPin size={20} color="#666" />
                <Text style={styles.infoText}>{organizer.location}</Text>
              </View>
              <View style={styles.infoRow}>
                <Users size={20} color="#666" />
                <Text style={styles.infoText}>{organizer.followers} followers</Text>
              </View>
              <View style={styles.infoRow}>
                <Calendar size={20} color="#666" />
                <Text style={styles.infoText}>Est. {organizer.established}</Text>
              </View>
            </View>

            <View style={styles.socialLinks}>
              {organizer.social.website && (
                <Pressable
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(organizer.social.website)}
                >
                  <Globe size={20} color="#00ff88" />
                </Pressable>
              )}
              {organizer.social.instagram && (
                <Pressable
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(`https://instagram.com/${organizer.social.instagram}`)}
                >
                  <Instagram size={20} color="#00ff88" />
                </Pressable>
              )}
              {organizer.social.facebook && (
                <Pressable
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(`https://facebook.com/${organizer.social.facebook}`)}
                >
                  <Facebook size={20} color="#00ff88" />
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.description}>{organizer.description}</Text>
          </View>

          {upcomingEvents.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <View style={styles.eventList}>
                {upcomingEvents.map((event) => (
                  <Pressable
                    key={event.id}
                    style={styles.eventCard}
                    onPress={() => handleEventPress(event)}
                  >
                    <Image
                      source={{ uri: event.image }}
                      style={styles.eventImage}
                    />
                    <View style={styles.eventContent}>
                      <Text style={styles.eventGenre}>{event.genre}</Text>
                      <Text style={styles.eventName}>{event.name}</Text>
                      <Text style={styles.eventDate}>{event.date}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {pastEvents.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Past Events</Text>
              <View style={styles.eventList}>
                {pastEvents.map((event) => (
                  <Pressable
                    key={event.id}
                    style={[styles.eventCard, styles.pastEventCard]}
                    onPress={() => handleEventPress(event)}
                  >
                    <Image
                      source={{ uri: event.image }}
                      style={styles.eventImage}
                    />
                    <View style={styles.eventContent}>
                      <Text style={[styles.eventGenre, styles.pastEventText]}>{event.genre}</Text>
                      <Text style={[styles.eventName, styles.pastEventText]}>{event.name}</Text>
                      <Text style={styles.eventDate}>{event.date}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    marginBottom: 16,
  },
  infoSection: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    flex: 1,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,255,136,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#999',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    marginBottom: 16,
  },
  eventList: {
    gap: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    height: 100,
  },
  pastEventCard: {
    opacity: 0.6,
  },
  eventImage: {
    width: 100,
    height: '100%',
  },
  eventContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  eventGenre: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#00ff88',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#666',
  },
  pastEventText: {
    color: '#999',
  },
});