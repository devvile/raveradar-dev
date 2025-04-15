export interface DJSet {
  name: string;
  startTime: string;
  endTime: string;
}

export interface DJ {
  id: string;
  name: string;
  image: string;
  description: string;
  genres: string[];
  sets: {
    name: string;
    url: string;
  }[];
  social: {
    website?: string;
    instagram?: string;
    soundcloud?: string;
  };
}

export interface Event {
  id: string;
  name: string;
  genre: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  image: string;
  description: string;
  organizer: string;
  organizerId: string;
  lineup: DJSet[];
  tags: string[];
}

export interface Organizer {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  followers: string;
  established: string;
  social: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
}

export type TimeFilter = 'all' | 'today' | 'weekend' | 'week' | 'custom';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}