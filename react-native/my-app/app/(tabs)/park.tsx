import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';

// Define types for attraction items
interface Attraction {
  id: string;
  name: string;
  description: string;
}

// Placeholder data for park attractions
const attractions: Attraction[] = [
  { id: '1', name: 'Kuching Regional Office', description: 'Main administrative building for the park' },
  { id: '2', name: 'Mixed Planting Garden', description: 'Beautiful garden with a variety of plant species' },
  { id: '3', name: 'Nepenthes Garden', description: 'Collection of pitcher plants native to the region' },
  { id: '4', name: 'Wild Orchids Garden', description: 'Showcase of exotic orchid species' },
  { id: '5', name: 'Arboretum', description: 'Large area with diverse tree species' },
  { id: '6', name: 'Ethnobotanical Garden', description: 'Plants used by local communities for medicine and crafts' },
  { id: '7', name: 'Ferns & Aroids Garden', description: 'Lush garden featuring ferns and aroids species' },
  { id: '8', name: 'Bamboo & Ficus Garden', description: 'Collection of bamboo varieties and fig trees' },
  { id: '9', name: 'Wild Fruits Garden', description: 'Featuring native fruit-bearing plants and trees' },
];

// Attraction item component
const AttractionItem = ({ item, onPress }: { item: Attraction, onPress: (item: Attraction) => void }) => (
  <TouchableOpacity style={styles.attractionItem} onPress={() => onPress(item)}>
    <View style={styles.attractionContent}>
      <Text style={styles.attractionName}>{item.name}</Text>
      <Text style={styles.attractionDescription}>{item.description}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
);

export default function ParkScreen() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  // Handle attraction selection
  const handleAttractionPress = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Park Map</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Interactive map will be available soon
          </Text>
        </View>
        <Text style={styles.mapNotice}>
          Tap on markers to explore park attractions
        </Text>
      </View>
      
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Park Attractions</Text>
        <FlatList
          data={attractions}
          renderItem={({ item }) => (
            <AttractionItem 
              item={item} 
              onPress={handleAttractionPress}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mapContainer: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mapPlaceholder: {
    width: '90%',
    height: '80%',
    backgroundColor: '#d0e6f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  mapNotice: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 5,
    fontSize: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  attractionItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  attractionContent: {
    flex: 1,
  },
  attractionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  attractionDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 