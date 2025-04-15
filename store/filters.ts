import { create } from 'zustand';
import { TimeFilter, DateRange } from '@/types/events';

interface FiltersState {
  selectedCity: string | null;
  selectedGenres: string[];
  timeFilter: TimeFilter;
  customDateRange: DateRange;
  setSelectedCity: (city: string | null) => void;
  setSelectedGenres: (genres: string[]) => void;
  setTimeFilter: (filter: TimeFilter) => void;
  setCustomDateRange: (range: DateRange) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  selectedCity: null,
  selectedGenres: [],
  timeFilter: 'all',
  customDateRange: { start: null, end: null },
  setSelectedCity: (city) => set({ selectedCity: city }),
  setSelectedGenres: (genres) => set({ selectedGenres: genres }),
  setTimeFilter: (filter) => set({ timeFilter: filter }),
  setCustomDateRange: (range) => set({ customDateRange: range }),
}));

export const getFilteredEvents = (events: any[], filters: FiltersState) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getWeekendDates = () => {
    const start = new Date(today);
    const daysUntilWeekend = 6 - today.getDay(); // Saturday is 6
    start.setDate(today.getDate() + daysUntilWeekend);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
  };

  const getWeekDates = () => {
    const start = new Date(today);
    const end = new Date(today);
    end.setDate(today.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  return events.filter(event => {
    const eventDate = new Date(event.date);
    const matchesCity = !filters.selectedCity || event.location === filters.selectedCity;
    const matchesGenres = filters.selectedGenres.length === 0 || 
      event.tags.some(tag => filters.selectedGenres.includes(tag));

    let matchesTimeFilter = true;
    switch (filters.timeFilter) {
      case 'today':
        matchesTimeFilter = eventDate.toDateString() === today.toDateString();
        break;
      case 'weekend':
        const weekend = getWeekendDates();
        matchesTimeFilter = eventDate >= weekend.start && eventDate <= weekend.end;
        break;
      case 'week':
        const week = getWeekDates();
        matchesTimeFilter = eventDate >= week.start && eventDate <= week.end;
        break;
      case 'custom':
        if (filters.customDateRange.start && filters.customDateRange.end) {
          matchesTimeFilter = eventDate >= filters.customDateRange.start && 
                            eventDate <= filters.customDateRange.end;
        }
        break;
      default: // 'all'
        matchesTimeFilter = true;
    }

    return matchesCity && matchesGenres && matchesTimeFilter;
  });
};