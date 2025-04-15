import { View, Text, StyleSheet, Image, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { X, Globe, Instagram, Music2, ExternalLink } from 'lucide-react-native';
import { djs } from '@/data/djs';
import { events } from '@/data/events';

export default function DJDetails() {
  const { id } = useLocalSearchParams();
  const dj = djs.find(d => d.id === id);
  
  if (!dj) {
    return null;
  }

  const today = new Date();
  const djEvents = events.filter(event => 
    event.lineup.some(set => set.name === dj.name)
  );

  const upcomingEvents = djEvents
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = djEvents
    .filter(event => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

  const handleSocialPress = (url?: string) => {
    if (url) {
      if (url.startsWith('@')) {
        // Handle Instagram
        Linking.openURL(`https://instagram.com/${url.substring(1)}`);
      } else if (url.includes('soundcloud.com')) {
        // Handle direct SoundCloud URLs
        Linking.openURL(url);
      } else if (url.startsWith('https://')) {
        // Handle website URLs
        Linking.openURL(url);
      } else if (url.includes('soundcloud')) {
        // Handle SoundCloud handles
        Linking.openURL(`https://soundcloud.com/${url.substring(1)}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: dj.image }}
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
            <Text style={styles.title}>{dj.name}</Text>
            
            <View style={styles.genreContainer}>
              {dj.genres.map((genre, index) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>

            <View style={styles.socialLinks}>
              {dj.social.website && (
                <Pressable
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(dj.social.website)}
                >
                  <Globe size={20} color="#00ff88" />
                </Pressable>
              )}
              {dj.social.instagram && (
                <Pressable
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(dj.social.instagram)}
                >
                  <Instagram size={20} color="#00ff88" />
                </Pressable>
              )}
              {dj.social.soundcloud && (
                <Pressable
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(dj.social.soundcloud)}
                >
                  <Music2 size={20} color="#00ff88" />
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.description}>{dj.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Sets</Text>
            <View style={styles.setList}>
              {dj.sets.map((set, index) => (
                <Pressable
                  key={index}
                  style={styles.setButton}
                  onPress={() => handleSocialPress(set.url)}
                >
                  <Music2 size={20} color="#00ff88" />
                  <Text style={styles.setName}>{set.name}</Text>
                  <ExternalLink size={16} color="#00ff88" />
                </Pressable>
              ))}
            </View>
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
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: 'rgba(0,255,136,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  genreText: {
    color: '#00ff88',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
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
  setList: {
    gap: 12,
  },
  setButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#00ff88',
  },
  setName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#fff',
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