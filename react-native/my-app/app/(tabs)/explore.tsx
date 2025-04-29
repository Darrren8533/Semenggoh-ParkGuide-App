import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import OrchidClassifier from '../../components/OrchidClassifier';
import OrchidDetails from '../../components/OrchidDetails';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OrchidInfo {
  description: string;
  habitat: string;
  care: string;
}

export default function ExploreScreen() {
  const [identifiedOrchid, setIdentifiedOrchid] = useState<string | null>(null);
  const [orchidInfo, setOrchidInfo] = useState<OrchidInfo | null>(null);
  const { width } = useWindowDimensions();
  
  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });
  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });
  
  const [showDetails, setShowDetails] = useState(false);
  const detailsAnimation = useRef(new Animated.Value(0)).current;
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const handleClassificationResult = (label: string, info: OrchidInfo) => {
    setIdentifiedOrchid(label);
    setOrchidInfo(info);
    
    // Animate details panel in
    setShowDetails(true);
    Animated.spring(detailsAnimation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };
  
  const closeDetails = () => {
    Animated.timing(detailsAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowDetails(false);
    });
  };
  
  const detailsTranslateY = detailsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });
  
  const cardScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.1, 1],
    extrapolate: 'clamp',
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#E0F7FA', '#B2EBF2', '#80DEEA']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View 
          style={[
            styles.header,
            { opacity: headerOpacity }
          ]}
        >
          <BlurView intensity={70} style={styles.headerBlur} tint="light">
            <Animated.Text 
              style={[
                styles.title,
                { transform: [{ scale: titleScale }] }
              ]}
            >
              Orchid Scanner
            </Animated.Text>
            <Text style={styles.subtitle}>
              Discover the beauty of orchids
            </Text>
          </BlurView>
        </Animated.View>
        
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.contentContainer}>
            <Animated.View 
              style={[
                styles.card,
                { transform: [{ scale: cardScale }] }
              ]}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
                style={styles.cardGradient}
              >
                <Text style={styles.cardTitle}>
                  Identify your orchid
                </Text>
                <Text style={styles.cardDescription}>
                  Take or select a photo of an orchid and let AI identify its species and provide detailed information.
                </Text>
                
                <OrchidClassifier onClassificationResult={handleClassificationResult} />
                
                <View style={styles.featuresContainer}>
                  <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                      <Ionicons name="scan-outline" size={24} color="#4CAF50" />
                    </View>
                    <Text style={styles.featureText}>AI-Powered Identification</Text>
                  </View>
                  
                  <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                      <Ionicons name="leaf-outline" size={24} color="#4CAF50" />
                    </View>
                    <Text style={styles.featureText}>52 Orchid Species</Text>
                  </View>
                  
                  <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                      <Ionicons name="information-circle-outline" size={24} color="#4CAF50" />
                    </View>
                    <Text style={styles.featureText}>Detailed Care Information</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
            
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Tips for better identification</Text>
              
              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>1</Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipText}>Good lighting - Take photos in natural light</Text>
                </View>
              </View>
              
              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>2</Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipText}>Close-up - Focus on the flower</Text>
                </View>
              </View>
              
              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>3</Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipText}>Clear view - Avoid obstructions</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.ScrollView>
        
        {showDetails && (
          <TouchableOpacity 
            style={styles.backdrop}
            activeOpacity={1}
            onPress={closeDetails}
          >
            <Animated.View 
              style={[
                styles.detailsContainer,
                { transform: [{ translateY: detailsTranslateY }] }
              ]}
            >
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeDetails}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.detailsTitle}>Identification Result</Text>
              
              {identifiedOrchid && orchidInfo && (
                <OrchidDetails 
                  orchidName={identifiedOrchid} 
                  orchidInfo={orchidInfo} 
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    width: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  headerBlur: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#006064',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#00838F',
    textAlign: 'center',
    marginTop: 5,
  },
  scrollContainer: {
    paddingTop: 130,
    paddingBottom: 40,
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  cardGradient: {
    padding: 25,
  },
  cardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#00796B',
    marginBottom: 10,
  },
  cardDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#00796B',
    marginBottom: 25,
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 137, 123, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  featureText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#00695C',
    flex: 1,
  },
  tipsContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  tipsTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#00796B',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tipNumberText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#00695C',
    lineHeight: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    zIndex: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 30,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  detailsTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#00796B',
    marginBottom: 20,
    textAlign: 'center',
  },
}); 