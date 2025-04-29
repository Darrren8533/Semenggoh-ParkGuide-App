import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import * as ort from 'onnxruntime-react-native';

// 预处理图像为模型输入格式
export const preprocessImage = async (imageUri: string): Promise<{
  tensor: Float32Array,
  width: number,
  height: number
}> => {
  try {
    // 将图像调整为模型所需尺寸 (224x224)
    const resizedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 224, height: 224 } }],
      { format: ImageManipulator.SaveFormat.JPEG }
    );

    // 读取图像数据为base64
    const base64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // 将base64转换为用于模型输入的张量数据
    // 这里需要实现图像数据的预处理，例如：
    // 1. 将图像数据归一化到0-1范围
    // 2. 标准化图像数据（减去均值，除以标准差）
    // 简单示例如下：
    
    // 创建空的输入张量
    const tensor = new Float32Array(3 * 224 * 224); // 3通道，224x224尺寸
    
    // 此处应填充实际的预处理代码，将图像转换为适当的张量
    // 由于具体的预处理步骤取决于模型的训练方式，这里只提供框架
    
    return {
      tensor,
      width: 224,
      height: 224
    };
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
};

// 运行模型推理
export const runInference = async (
  session: ort.InferenceSession,
  inputTensor: Float32Array,
  width: number,
  height: number
): Promise<number> => {
  try {
    // 创建模型输入
    const inputTensors = {
      // 具体输入名称和形状取决于模型
      'input': new ort.Tensor('float32', inputTensor, [1, 3, height, width])
    };
    
    // 运行模型
    const outputMap = await session.run(inputTensors);
    
    // 处理模型输出
    // 以分类模型为例，找出概率最高的类别
    const output = outputMap['output'].data as Float32Array;
    
    // 找到概率最高的索引
    let maxIndex = 0;
    let maxProb = output[0];
    
    for (let i = 1; i < output.length; i++) {
      if (output[i] > maxProb) {
        maxProb = output[i];
        maxIndex = i;
      }
    }
    
    return maxIndex;
  } catch (error) {
    console.error('Error running inference:', error);
    throw error;
  }
};

// 辅助函数：将blob转换为张量
export const blobToTensor = async (blob: Blob): Promise<Float32Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(buffer);
      const tensor = new Float32Array(bytes.length / 4);
      
      // 将字节数据转换为浮点数据
      for (let i = 0; i < tensor.length; i++) {
        const byte = i * 4;
        tensor[i] = (
          (bytes[byte] << 0) |
          (bytes[byte + 1] << 8) |
          (bytes[byte + 2] << 16) |
          (bytes[byte + 3] << 24)
        );
      }
      
      resolve(tensor);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}; 