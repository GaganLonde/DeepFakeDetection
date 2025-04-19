from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import tempfile
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = load_model('models/mesonet_deepfake_detector_final.h5')

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        # Create a temporary file to save the uploaded image
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name

        # Load and preprocess image
        img = cv2.imread(temp_file_path)
        if img is None:
            raise ValueError("Could not load image. Check if the file is a valid image.")
        
        img = cv2.resize(img, (128, 128))  # Resize to match model input
        img = img.astype('float32') / 255.0  # Normalize
        img = np.expand_dims(img, axis=0)  # Add batch dimension
        
        # Make prediction
        pred = model.predict(img)[0][0]
        is_deepfake = pred > 0.5
        confidence = pred * 100 if is_deepfake else (1 - pred) * 100

        # Clean up temporary file
        os.unlink(temp_file_path)

        return {
            "isDeepfake": bool(is_deepfake),
            "confidence": float(confidence)
        }

    except Exception as e:
        return {"error": str(e)} 