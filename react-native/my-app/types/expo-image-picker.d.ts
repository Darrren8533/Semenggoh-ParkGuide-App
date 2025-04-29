declare module 'expo-image-picker' {
  export enum MediaTypeOptions {
    All = 'All',
    Videos = 'Videos',
    Images = 'Images',
  }
  
  export interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type?: string;
    exif?: {
      [key: string]: any;
    };
    base64?: string;
  }
  
  export interface ImagePickerResult {
    cancelled: boolean;
    type?: string;
    uri?: string;
    width?: number;
    height?: number;
    exif?: {
      [key: string]: any;
    };
    base64?: string;
    assets?: Array<ImageInfo>;
    canceled: boolean;
  }
  
  export interface ImagePickerOptions {
    mediaTypes?: MediaTypeOptions;
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
    base64?: boolean;
    exif?: boolean;
  }
  
  export function requestMediaLibraryPermissionsAsync(): Promise<{
    status: 'granted' | 'denied';
    expires: 'never';
    canAskAgain: boolean;
  }>;
  
  export function requestCameraPermissionsAsync(): Promise<{
    status: 'granted' | 'denied';
    expires: 'never';
    canAskAgain: boolean;
  }>;
  
  export function launchImageLibraryAsync(options?: ImagePickerOptions): Promise<ImagePickerResult>;
  
  export function launchCameraAsync(options?: ImagePickerOptions): Promise<ImagePickerResult>;
} 