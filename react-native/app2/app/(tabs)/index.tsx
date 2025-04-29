import { StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image 
          source={{ uri: 'https://picsum.photos/800/400' }} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>Semenggoh Nature Reserve</Text>
        <Text style={styles.subtitle}>Wildlife Centre</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About the Reserve</Text>
          <Text style={styles.text}>
            Established in 1975, located 24km south of Kuching, this sanctuary cares for injured, orphaned, or illegally kept wildlife. Famous for its successful orangutan rehabilitation program.
          </Text>
        </View>

        <View style={styles.quickInfoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Opening Hours</Text>
            <Text style={styles.infoText}>8:00-10:00, 14:00-16:00</Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Feeding Times</Text>
            <Text style={styles.infoText}>9:00-10:00, 15:00-16:00</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Plan Your Visit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c5e30',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius:
    10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: '100%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c5e30',
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  quickInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c5e30',
  },
  infoText: {
    fontSize: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#2c5e30',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
