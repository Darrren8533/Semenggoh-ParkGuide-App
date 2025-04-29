import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, Linking } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Semenggoh Nature Reserve</Text>
      <Text style={styles.subtitle}>Wildlife Centre</Text>

      <View style={styles.aboutCard}>
        <Text style={styles.cardTitle}>About Us</Text>
        <Text style={styles.text}>
          Established in 1975, Semenggoh Nature Reserve cares for injured, orphaned, or previously illegally kept wildlife. Located 24km south of Kuching, Sarawak, our main objectives are:
        </Text>
        
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.text}>Rehabilitate injured or captive animals for release back into the wild</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.text}>Conduct wildlife research and breeding programs for endangered species</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.text}>Educate the public about conservation</Text>
        </View>
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <FontAwesome name="map-marker" size={18} color="#2c5e30" style={styles.icon} />
          <Text style={styles.contactText}>
            Lot 218, KCLD, Jalan Tapang, Kota Sentosa, 93250 Kuching, Sarawak, Malaysia
          </Text>
        </View>
        
        <View style={styles.contactItem}>
          <FontAwesome name="phone" size={18} color="#2c5e30" style={styles.icon} />
          <Text 
            style={[styles.contactText, styles.linkText]}
            onPress={() => Linking.openURL('tel:+6082610088')}
          >
            (+6) 082-610088
          </Text>
        </View>
        
        <View style={styles.contactItem}>
          <FontAwesome name="envelope" size={18} color="#2c5e30" style={styles.icon} />
          <Text 
            style={[styles.contactText, styles.linkText]}
            onPress={() => Linking.openURL('mailto:info@sarawakforestry.com')}
          >
            info@sarawakforestry.com
          </Text>
        </View>
      </View>

      <Text style={styles.copyright}>© 2023 Sarawak Forestry Corporation</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5e30',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  aboutCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  contactCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c5e30',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    color: '#333',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    paddingLeft: 5,
  },
  bulletDot: {
    fontSize: 14,
    marginRight: 5,
    color: '#2c5e30',
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
    marginTop: 2,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  linkText: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  copyright: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
});
