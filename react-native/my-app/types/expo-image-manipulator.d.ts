declare module 'expo-image-manipulator' {
  export type ImageResult = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
  };
  
  export enum SaveFormat {
    JPEG = 'jpeg',
    PNG = 'png',
    WEBP = 'webp',
  }
  
  export type ImageManipulatorOptions = {
    compress?: number;
    format?: SaveFormat;
    base64?: boolean;
  };
  
  export type ImageManipulationAction =
    | { resize: { width?: number; height?: number } }
    | { rotate: number }
    | { flip: { vertical: boolean; horizontal: boolean } }
    | { crop: { originX: number; originY: number; width: number; height: number } };
  
  export function manipulateAsync(
    uri: string,
    actions: ImageManipulationAction[],
    options?: ImageManipulatorOptions
  ): Promise<ImageResult>;
} 