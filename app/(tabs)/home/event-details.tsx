import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Clock, Users, X } from 'lucide-react-native';

export default function EventDetails() {
  const params = useLocalSearchParams();
  const {
    name,
    genre,
    date,
    time,
    location,
    attendees,
    image,
    description,
    organizer,
    djs,
    tags
  } = params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: image as string }}
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
            <Text style={styles.genre}>{genre}</Text>
            <Text style={styles.title}>{name}</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Calendar size={20} color="#666" />
              <Text style={styles.infoText}>{date}</Text>
              <Clock size={20} color="#666" />
              <Text style={styles.infoText}>{time}</Text>
            </View>
            <View style={styles.infoRow}>
              <MapPin size={20} color="#666" />
              <Text style={styles.infoText}>{location}</Text>
              <Users size={20} color="#666" />
              <Text style={styles.infoText}>{attendees} going</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organizer</Text>
            <Text style={styles.organizerName}>{organizer}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Line-up</Text>
            <View style={styles.djList}>
              {(djs as string).split(',').map((dj, index) => (
                <Text key={index} style={styles.dj}>{dj.trim()}</Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagContainer}>
              {(tags as string).split(',').map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.trim()}</Text>
                </View>
              ))}
            </View>
          </View>
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
    marginBottom: 20,
  },
  genre: {
    color: '#00ff88',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoSection: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#999',
    lineHeight: 24,
  },
  organizerName: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#00ff88',
  },
  djList: {
    gap: 8,
  },
  dj: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#fff',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(0,255,136,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  tagText: {
    color: '#00ff88',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
});