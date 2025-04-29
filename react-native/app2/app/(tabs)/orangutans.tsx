import { StyleSheet, ScrollView, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function OrangutansScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image 
          source={{ uri: 'https://picsum.photos/id/433/800/400' }} 
          style={styles.headerImage}
          resizeMode="cover"
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About Orangutans</Text>
          <Text style={styles.text}>
            Orangutans (Scientific name: Pongo pygmaeus) are one of the world's largest primates and almost completely arboreal.
            "Orang" is Malay for "person", while "Utan" derives from "hutan" meaning "forest", literally translating to "person of the forest".
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>cm</Text>
            <Text style={styles.statDesc}>Adult Male Height</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>kg</Text>
            <Text style={styles.statDesc}>Adult Male Weight</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>years</Text>
            <Text style={styles.statDesc}>Lifespan in Captivity</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Living Habits</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>Primarily eat fruits, also consume leaves, insects, bark, flowers, eggs, and small lizards</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>Build new nests each night in the forest canopy for resting</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>Generally solitary due to food scarcity and lack of predators</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Conservation Status</Text>
          <Text style={styles.text}>
            Only 20,000-27,000 remain in the wild, endangered. Main threats include deforestation, habitat encroachment, hunting, and the live animal trade.
          </Text>
          <Text style={[styles.text, styles.additionalText]}>
            Semenggoh Centre is Sarawak's successful orangutan rehabilitation project, dedicated to researching these animals and providing a safe environment for semi-wild orangutans.
          </Text>
        </View>
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
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
  additionalText: {
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#2c5e30',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#e0e0e0',
    marginBottom: 5,
  },
  statDesc: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bulletDot: {
    fontSize: 14,
    marginRight: 5,
    color: '#2c5e30',
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    color: '#333',
  },
}); 