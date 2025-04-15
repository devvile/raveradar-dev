import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, X } from 'lucide-react-native';
import { useFiltersStore } from '@/store/filters';

export default function DateRangePicker() {
  const [isVisible, setIsVisible] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end'>('start');
  
  const { customDateRange, setCustomDateRange, timeFilter, setTimeFilter } = useFiltersStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleOpen = () => {
    // Use existing dates or fallback to today
    const startDate = customDateRange.start || today;
    const endDate = customDateRange.end || new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Default to a week from today
    
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setCurrentPicker('start');
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleConfirm = () => {
    if (tempStartDate && tempEndDate) {
      // Ensure end date is not before start date
      const finalEndDate = tempEndDate < tempStartDate ? tempStartDate : tempEndDate;
      
      setCustomDateRange({ 
        start: tempStartDate, 
        end: finalEndDate 
      });
      setTimeFilter('custom');
    }
    handleClose();
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (!date) return;

    if (currentPicker === 'start') {
      // Ensure start date is not before today
      const validStartDate = date < today ? today : date;
      setTempStartDate(validStartDate);
      
      // If end date is before new start date, update it
      if (tempEndDate && tempEndDate < validStartDate) {
        setTempEndDate(validStartDate);
      }
      
      if (Platform.OS === 'android') {
        setCurrentPicker('end');
      }
    } else {
      // Ensure end date is not before start date
      const validEndDate = date < (tempStartDate || today) 
        ? tempStartDate || today 
        : date;
      setTempEndDate(validEndDate);
      
      if (Platform.OS === 'android') {
        handleConfirm();
      }
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Pressable
        style={[
          styles.dateButton,
          timeFilter === 'custom' && styles.dateButtonSelected,
        ]}
        onPress={handleOpen}
      >
        <Calendar size={16} color={timeFilter === 'custom' ? '#000' : '#fff'} />
        <Text
          style={[
            styles.dateButtonText,
            timeFilter === 'custom' && styles.dateButtonTextSelected,
          ]}
        >
          {timeFilter === 'custom' && customDateRange.start && customDateRange.end
            ? `${formatDate(customDateRange.start)} - ${formatDate(customDateRange.end)}`
            : 'Custom Range'}
        </Text>
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date Range</Text>
              <Pressable onPress={handleClose}>
                <X color="#fff" size={24} />
              </Pressable>
            </View>

            <View style={styles.datePickerContainer}>
              <View style={styles.dateSection}>
                <Text style={styles.dateLabel}>Start Date</Text>
                <DateTimePicker
                  value={tempStartDate || today}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={today}
                  themeVariant="dark"
                />
              </View>

              <View style={styles.dateSection}>
                <Text style={styles.dateLabel}>End Date</Text>
                <DateTimePicker
                  value={tempEndDate || today}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={tempStartDate || today}
                  themeVariant="dark"
                />
              </View>
            </View>

            {Platform.OS === 'ios' && (
              <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  dateButtonSelected: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  dateButtonTextSelected: {
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
  },
  datePickerContainer: {
    gap: 20,
  },
  dateSection: {
    gap: 8,
  },
  dateLabel: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#00ff88',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
});