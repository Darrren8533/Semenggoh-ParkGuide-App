import { StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const imageSize = (width - 40) / 2;

export default function GalleryScreen() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Gallery data, in a real application these images should be replaced with actual park photos
  const galleryImages = [
    { id: 1, title: "Orangutan", category: "Wildlife", source: { uri: 'https://picsum.photos/id/433/300/300' } },
    { id: 2, title: "Park Trail", category: "Scenery", source: { uri: 'https://picsum.photos/id/16/300/300' } },
    { id: 3, title: "Feeding Session", category: "Activities", source: { uri: 'https://picsum.photos/id/237/300/300' } },
    { id: 4, title: "Forest View", category: "Scenery", source: { uri: 'https://picsum.photos/id/15/300/300' } },
    { id: 5, title: "Baby Orangutan", category: "Wildlife", source: { uri: 'https://picsum.photos/id/29/300/300' } },
    { id: 6, title: "Visitor Experience", category: "Activities", source: { uri: 'https://picsum.photos/id/26/300/300' } },
  ];

  const openImage = (id: number) => {
    setSelectedImage(id);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Park Gallery</Text>
        <Text style={styles.subtitle}>Explore the wonderful moments at Semenggoh Nature Reserve</Text>
        
        <View style={styles.galleryContainer}>
          {galleryImages.map((image) => (
            <TouchableOpacity 
              key={image.id} 
              style={styles.imageContainer}
              onPress={() => openImage(image.id)}
            >
              <Image source={image.source} style={styles.thumbnailImage} />
              <View style={styles.imageInfo}>
                <Text style={styles.imageTitle}>{image.title}</Text>
                <Text style={styles.imageCategory}>{image.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedImage !== null && (
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImage}>
            <FontAwesome name="close" size={24} color="white" />
          </TouchableOpacity>
          <Image 
            source={galleryImages.find(img => img.id === selectedImage)?.source} 
            style={styles.fullImage}
            resizeMode="contain"
          />
          <View style={styles.modalInfo}>
            <Text style={styles.modalTitle}>
              {galleryImages.find(img => img.id === selectedImage)?.title}
            </Text>
            <Text style={styles.modalCategory}>
              {galleryImages.find(img => img.id === selectedImage)?.category}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c5e30',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: imageSize,
    height: imageSize + 50,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  thumbnailImage: {
    width: imageSize,
    height: imageSize,
  },
  imageInfo: {
    padding: 8,
    backgroundColor: 'white',
  },
  imageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  imageCategory: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1001,
  },
  fullImage: {
    width: width,
    height: width,
  },
  modalInfo: {
    padding: 15,
    backgroundColor: 'transparent',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalCategory: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
  },
}); 