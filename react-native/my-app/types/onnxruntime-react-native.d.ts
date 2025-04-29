declare module 'onnxruntime-react-native' {
  export class Tensor {
    constructor(type: string, data: ArrayBuffer | Float32Array | Float64Array | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array, dims: number[]);
    data: ArrayBuffer | Float32Array | Float64Array | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array;
    dims: number[];
    type: string;
  }
  
  export interface OnnxValueMapType {
    [key: string]: Tensor;
  }
  
  export class InferenceSession {
    static create(modelPath: string): Promise<InferenceSession>;
    
    run(feeds: OnnxValueMapType, outputNames?: string[]): Promise<OnnxValueMapType>;
    run(feeds: OnnxValueMapType, options?: InferenceSession.RunOptions): Promise<OnnxValueMapType>;
    
    static OnnxValueMapType: OnnxValueMapType;
  }
  
  export namespace InferenceSession {
    export interface RunOptions {
      logVerbosityLevel?: number;
      logSeverityLevel?: number;
      terminateFlag?: boolean;
      tag?: string;
      outputNames?: string[];
    }
  }
} 