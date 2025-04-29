const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const ort = require('onnxruntime-node');
const sharp = require('sharp');

const app = express();
const port = 3000;
const upload2 = multer({ dest: 'uploads/' });

// Allow cross-origin requests
app.use(cors());
app.use(express.json());

// Read orchid descriptions
const orchidDescriptions = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'models/orchid_descriptions.json'), 'utf8')
);

// Read orchid labels
const orchidLabels = fs.readFileSync(
  path.join(__dirname, 'models/orchids52_metadata-en.txt'), 'utf8'
).split('\n').filter(line => line.trim().length > 0);

// Preprocess image
async function preprocessImage(imagePath) {
  // Resize image to model input size (e.g. 224x224)
  const imageBuffer = await sharp(imagePath)
    .resize(224, 224)
    .toFormat('png')
    .toBuffer();
  
  // Convert to RGB (remove alpha channel) and normalize to [0,1]
  const { data, info } = await sharp(imageBuffer)
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  // Create Float32Array to store normalized pixel values
  const tensorData = new Float32Array(3 * info.width * info.height);
  
  // Normalize and convert to CHW format (required by onnxruntime)
  for (let c = 0; c < 3; c++) {
    for (let h = 0; h < info.height; h++) {
      for (let w = 0; w < info.width; w++) {
        const idx = c * info.height * info.width + h * info.width + w;
        const srcIdx = (h * info.width + w) * 3 + c;
        tensorData[idx] = data[srcIdx] / 255.0;
      }
    }
  }
  
  return tensorData;
}

// API - Identify orchid
app.post('/api/identify-orchid', (req, res, next) => {
  console.log('Received orchid identification request');
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  
  // Continue to multer middleware
  upload2.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'File upload error', message: err.message });
    }
    
    // Check if file was uploaded
    console.log('Request file:', req.file);
    
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    
    // Continue with processing
    processOrchidImage(req, res);
  });
});

// Process the orchid image
async function processOrchidImage(req, res) {
  try {
    console.log(`Processing uploaded image: ${req.file.path}`);
    
    // Preprocess image
    const inputTensor = await preprocessImage(req.file.path);
    
    // Load ONNX model
    const modelPath = path.join(__dirname, 'models/orchid_species_model.onnx');
    const session = await ort.InferenceSession.create(modelPath);
    
    // Prepare input data
    const inputDims = [1, 3, 224, 224]; // Batch size 1, 3 channels, 224x224 image
    const inputTensorOrt = new ort.Tensor('float32', inputTensor, inputDims);
    
    // Run inference
    const feeds = { input: inputTensorOrt };
    const results = await session.run(feeds);
    
    // Get output tensor
    const outputTensor = results.output;
    const outputData = outputTensor.data;
    
    // Find the class with the highest confidence
    let maxProb = -Infinity;
    let maxIdx = 0;
    for (let i = 0; i < outputData.length; i++) {
      if (outputData[i] > maxProb) {
        maxProb = outputData[i];
        maxIdx = i;
      }
    }
    
    // Get the identification result
    const orchidId = `n${maxIdx.toString().padStart(4, '0')}`;
    const orchidLabel = orchidLabels[maxIdx];
    const orchidInfo = orchidDescriptions[orchidId] || {
      description: 'No detailed information available.',
      habitat: 'Information not available.',
      care: 'Information not available.'
    };
    
    // Delete temporary file
    fs.unlinkSync(req.file.path);
    
    // Return the identification result
    res.json({
      success: true,
      orchid: {
        id: orchidId,
        label: orchidLabel,
        confidence: maxProb,
        info: orchidInfo
      }
    });
    
  } catch (error) {
    console.error('Error identifying orchid:', error);
    res.status(500).json({ error: 'Error processing image', message: error.message });
  }
}

// Test API
app.get('/', (req, res) => {
  res.send('Orchid Identification API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
