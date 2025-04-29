import { StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function VisitScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image 
          source={{ uri: 'https://picsum.photos/800/300' }} 
          style={styles.headerImage}
          resizeMode="cover"
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Location & Transportation</Text>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={18} color="#2c5e30" />
            <Text style={styles.infoText}>Approximately 24km from Kuching city, about 15-20 minutes by car</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="car" size={18} color="#2c5e30" />
            <Text style={styles.infoText}>Taxis or GrabCar recommended, no regular bus service available</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="info-circle" size={18} color="#2c5e30" />
            <Text style={styles.infoText}>Visitor cars are not allowed inside the center</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Opening Information</Text>
          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={18} color="#2c5e30" />
            <Text style={styles.infoText}>Opening Hours: 8:00-10:00, 14:00-16:00 (Monday to Sunday)</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="cutlery" size={18} color="#2c5e30" />
            <Text style={styles.infoText}>Orangutan Feeding Times: 9:00-10:00, 15:00-16:00</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Park Trails</Text>
          <View style={styles.trailInfo}>
            <Text style={styles.infoText}>• Approximately 1.6km from entrance to feeding station</Text>
            <Text style={styles.infoText}>• 5-minute buggy ride available (tickets at entrance)</Text>
            <Text style={styles.infoText}>• Walking takes about 30 minutes</Text>
            <Text style={styles.infoText}>• Feeding trail is about 200 meters long</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={18} color="#2c5e30" />
            <Text 
              style={[styles.infoText, styles.linkText]}
              onPress={() => Linking.openURL('tel:+6082618325')}
            >
              082-618 325 / 082-618 324
            </Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={18} color="#2c5e30" />
            <Text 
              style={[styles.infoText, styles.linkText]}
              onPress={() => Linking.openURL('mailto:info@sarawakforestry.com')}
            >
              info@sarawakforestry.com
            </Text>
          </View>
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
    height: 180,
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
    marginBottom: 15,
    color: '#2c5e30',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  trailInfo: {
    marginLeft: 5,
  },
  linkText: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
}); 