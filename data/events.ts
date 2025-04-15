import { Event } from '@/types/events';

export const events: Event[] = [
  {
    id: '1',
    name: 'Spring Awakening Festival',
    genre: 'EDM',
    date: '2025-03-15',
    time: '18:00',
    location: 'Miami',
    attendees: '3000',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070',
    description: 'Welcome spring with the most electrifying festival of the year! Featuring world-class DJs and incredible production.',
    organizer: 'Dreamscape Events',
    organizerId: 'dreamscape',
    lineup: [
      { name: 'Skrillex', startTime: '23:30', endTime: '01:00' },
      { name: 'Diplo', startTime: '22:00', endTime: '23:30' },
      { name: 'Zedd', startTime: '20:30', endTime: '22:00' }
    ],
    tags: ['EDM', 'House', 'Bass']
  },
  {
    id: '2',
    name: 'Techno Equinox',
    genre: 'Techno',
    date: '2025-03-20',
    time: '22:00',
    location: 'Berlin',
    attendees: '1500',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070',
    description: 'Celebrate the spring equinox with underground techno beats.',
    organizer: 'Berlin Underground',
    organizerId: 'berlin-underground',
    lineup: [
      { name: 'Charlotte de Witte', startTime: '02:00', endTime: '04:00' },
      { name: 'Amelie Lens', startTime: '00:00', endTime: '02:00' },
      { name: 'FJAAK', startTime: '22:00', endTime: '00:00' }
    ],
    tags: ['Techno', 'Industrial', 'Dark Techno']
  },
  {
    id: '3',
    name: 'Trance Horizons',
    genre: 'Trance',
    date: '2025-03-22',
    time: '21:00',
    location: 'Amsterdam',
    attendees: '2500',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070',
    description: 'A transcendent journey through uplifting trance music.',
    organizer: 'Trance Family',
    organizerId: 'trance-family',
    lineup: [
      { name: 'Aly & Fila', startTime: '01:00', endTime: '03:00' },
      { name: 'Giuseppe Ottaviani', startTime: '23:00', endTime: '01:00' },
      { name: "John O'Callaghan", startTime: '21:00', endTime: '23:00' }
    ],
    tags: ['Trance', 'Progressive', 'Uplifting']
  },
  {
    id: '4',
    name: 'Deep Fusion',
    genre: 'Deep House',
    date: '2025-03-25',
    time: '20:00',
    location: 'Ibiza',
    attendees: '1000',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069',
    description: 'Intimate deep house gathering with Mediterranean sunset views.',
    organizer: 'Dreamscape Events',
    organizerId: 'dreamscape',
    lineup: [
      { name: 'Tale Of Us', startTime: '00:00', endTime: '02:00' },
      { name: 'Mind Against', startTime: '22:00', endTime: '00:00' },
      { name: 'Adriatique', startTime: '20:00', endTime: '22:00' }
    ],
    tags: ['Deep House', 'Melodic', 'Organic']
  },
  {
    id: '5',
    name: 'Bass Revolution',
    genre: 'Bass House',
    date: '2025-03-28',
    time: '22:00',
    location: 'Los Angeles',
    attendees: '2000',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070',
    description: 'The heaviest bass music event of the spring.',
    organizer: 'Dreamscape Events',
    organizerId: 'dreamscape',
    lineup: [
      { name: 'JOYRYDE', startTime: '01:00', endTime: '02:30' },
      { name: 'Habstrakt', startTime: '23:30', endTime: '01:00' },
      { name: 'Matroda', startTime: '22:00', endTime: '23:30' }
    ],
    tags: ['Bass House', 'Future House', 'Bass']
  },
  {
    id: '6',
    name: 'Minimal Spring',
    genre: 'Minimal',
    date: '2025-03-01',
    time: '23:00',
    location: 'Berlin',
    attendees: '800',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074',
    description: 'Welcome spring with stripped back techno and minimal vibes.',
    organizer: 'Berlin Underground',
    organizerId: 'berlin-underground',
    lineup: [
      { name: 'Sonja Moonear', startTime: '03:00', endTime: '06:00' },
      { name: 'Zip', startTime: '00:00', endTime: '03:00' },
      { name: 'Margaret Dygas', startTime: '23:00', endTime: '00:00' }
    ],
    tags: ['Minimal', 'Techno', 'Microhouse']
  },
  {
    id: '7',
    name: 'Future Vision',
    genre: 'EDM',
    date: '2025-03-05',
    time: '21:00',
    location: 'Tokyo',
    attendees: '4000',
    image: 'https://images.unsplash.com/photo-1574434312346-9e410d0b2c46?q=80&w=2074',
    description: 'Experience the future of electronic music in a futuristic setting.',
    organizer: 'Dreamscape Events',
    organizerId: 'dreamscape',
    lineup: [
      { name: 'Porter Robinson', startTime: '00:00', endTime: '01:30' },
      { name: 'Madeon', startTime: '22:30', endTime: '00:00' },
      { name: 'San Holo', startTime: '21:00', endTime: '22:30' }
    ],
    tags: ['EDM', 'Future Bass', 'Electronic']
  },
  {
    id: '8',
    name: 'Hard Spring',
    genre: 'Hardstyle',
    date: '2025-03-08',
    time: '22:00',
    location: 'Amsterdam',
    attendees: '2500',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070',
    description: 'The hardest styles unite for a spring celebration.',
    organizer: 'Trance Family',
    organizerId: 'trance-family',
    lineup: [
      { name: 'Angerfist', startTime: '02:00', endTime: '04:00' },
      { name: 'Miss K8', startTime: '00:00', endTime: '02:00' },
      { name: 'Radical Redemption', startTime: '22:00', endTime: '00:00' }
    ],
    tags: ['Hardstyle', 'Raw', 'Hardcore']
  },
  {
    id: '9',
    name: 'Tech House Spring',
    genre: 'Tech House',
    date: '2025-03-12',
    time: '20:00',
    location: 'Barcelona',
    attendees: '1500',
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d4c11?q=80&w=2070',
    description: 'Spring tech house vibes in the heart of Catalunya.',
    organizer: 'Dreamscape Events',
    organizerId: 'dreamscape',
    lineup: [
      { name: 'Hot Since 82', startTime: '00:00', endTime: '02:00' },
      { name: 'Patrick Topping', startTime: '22:00', endTime: '00:00' },
      { name: 'Green Velvet', startTime: '20:00', endTime: '22:00' }
    ],
    tags: ['Tech House', 'House', 'Groove']
  },
  {
    id: '10',
    name: 'Jungle Spring',
    genre: 'Drum & Bass',
    date: '2025-03-15',
    time: '22:00',
    location: 'London',
    attendees: '2000',
    image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2076',
    description: 'Spring drum & bass gathering featuring the scenes finest.',
    organizer: 'Dreamscape Events',
    organizerId: 'dreamscape',
    lineup: [
      { name: 'Goldie', startTime: '02:00', endTime: '04:00' },
      { name: 'LTJ Bukem', startTime: '00:00', endTime: '02:00' },
      { name: 'Roni Size', startTime: '22:00', endTime: '00:00' }
    ],
    tags: ['DnB', 'Jungle', 'Liquid']
  }
];