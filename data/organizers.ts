import { Organizer } from '@/types/events';

export const organizers: Organizer[] = [
  {
    id: 'dreamscape',
    name: 'Dreamscape Events',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070',
    description: "Dreamscape Events has been at the forefront of electronic music events since 2010. Known for creating immersive experiences that combine cutting-edge technology with world-class music, we've hosted some of the biggest names in EDM. Our events are characterized by spectacular production values, innovative stage designs, and an unwavering commitment to sound quality.",
    location: 'New York, USA',
    followers: '125K',
    established: '2010',
    social: {
      website: 'https://dreamscape.events',
      instagram: '@dreamscape_events',
      facebook: 'dreamscapeevents'
    }
  },
  {
    id: 'berlin-underground',
    name: 'Berlin Underground',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070',
    description: "Berlin Underground represents the heart and soul of techno culture. Operating from the city's most iconic venues, we've been instrumental in shaping the modern techno scene. Our events focus on raw, authentic electronic music experiences, bringing together underground artists and dedicated ravers in historic industrial spaces.",
    location: 'Berlin, Germany',
    followers: '89K',
    established: '2008',
    social: {
      instagram: '@berlinunderground',
      facebook: 'berlinunderground'
    }
  },
  {
    id: 'trance-family',
    name: 'Trance Family',
    image: 'https://images.unsplash.com/photo-1516389573391-6c587e0e1e01?q=80&w=2069',
    description: "Trance Family is more than just an event organizer - we're a global community united by our love for trance music. Since our inception, we've created transcendent experiences that connect people through music. Our events are known for their emotional energy and uplifting atmosphere.",
    location: 'Amsterdam, Netherlands',
    followers: '200K',
    established: '2012',
    social: {
      website: 'https://trancefamily.com',
      instagram: '@trancefamily',
      facebook: 'trancefamilyglobal'
    }
  }
];