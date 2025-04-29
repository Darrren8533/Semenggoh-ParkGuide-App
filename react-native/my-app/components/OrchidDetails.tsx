import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface OrchidInfo {
  description: string;
  habitat: string;
  care: string;
}

interface OrchidDetailsProps {
  orchidName: string;
  orchidInfo: OrchidInfo;
}

const OrchidDetails: React.FC<OrchidDetailsProps> = ({ orchidName, orchidInfo }) => {
  // Extract ID and scientific name from the orchid label
  const parts = orchidName.split('\t');
  const id = parts[0]?.trim() || '';
  const scientificName = parts[1]?.trim() || orchidName;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.title}>{scientificName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionContent}>{orchidInfo.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Natural Habitat</Text>
        <Text style={styles.sectionContent}>{orchidInfo.habitat}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Care Instructions</Text>
        <Text style={styles.sectionContent}>{orchidInfo.care}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingBottom: 15,
  },
  id: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default OrchidDetails; 