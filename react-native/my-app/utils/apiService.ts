import { Platform } from 'react-native';

// API Configuration
const API_CONFIG = {
  // For Android emulator, use 10.0.2.2 to access the local host
  // For iOS emulator, use localhost
  // For real device testing, use the actual IP address or domain name
  baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000',
};

// Orchid Information Interface
export interface OrchidInfo {
  description: string;
  habitat: string;
  care: string;
}

// Orchid Identification Result Interface
export interface OrchidIdentificationResult {
  id: string;
  label: string;
  confidence: number;
  info: OrchidInfo;
}

// From base64 string to Blob object
function base64ToBlob(base64Data: string, contentType: string): Blob {
  // Extract actual base64 string from data URI
  const base64Content = base64Data.split(',')[1];
  // Decode base64 string
  const byteCharacters = atob(base64Content);
  // Convert string to byte array
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  // Create Blob object
  return new Blob(byteArrays, { type: contentType });
}

// Identify Orchid
export const identifyOrchid = async (imageUri: string): Promise<OrchidIdentificationResult> => {
  try {
    console.log('Uploading image:', imageUri.substring(0, 100) + '...');
    
    // Create FormData object for uploading images
    const formData = new FormData();
    
    // Check if it's a base64 format image
    if (imageUri.startsWith('data:image')) {
      // Handle base64 format image data
      const contentType = imageUri.split(';')[0].split(':')[1];
      const blob = base64ToBlob(imageUri, contentType);
      
      // Append Blob to FormData
      formData.append('image', blob, 'image.jpg');
      console.log('Appended base64 image as blob');
    } else {
      // Handle file URI format image
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      
      // Append image file to FormData - using the correct format
      formData.append('image', {
        uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);
      console.log('Appended file URI image');
    }
    
    // FormData is a special object in React Native, cannot directly view content
    console.log('FormData created (content details not visible in logs)');
    
    // Send POST request to backend API
    const response = await fetch(`${API_CONFIG.baseURL}/api/identify-orchid`, {
      method: 'POST',
      body: formData
    });
    
    // Parse response
    const data = await response.json();
    console.log('Response data:', data);
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to identify orchid');
    }
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to process the image');
    }
    
    return data.orchid;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default {
  identifyOrchid,
}; 