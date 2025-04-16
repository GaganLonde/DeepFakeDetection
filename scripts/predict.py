""" from tensorflow.keras.models import load_model
import cv2
import numpy as np

# Load the model
#model = load_model('models/mesonet_deepfake_detector_best.h5')
model = load_model('models/mesonet_deepfake_detector_final.h5')

def predict_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (128, 128))
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)
    pred = model.predict(img)[0][0]
    return "Fake" if pred > 0.5 else "Real"

# Example usage
print(predict_image("data/test/test_5.png"))
#print(model.summary()) """
import os
from tensorflow.keras.models import load_model
import cv2
import numpy as np

# Load the model
model = load_model('models/mesonet_deepfake_detector_final.h5')

def predict_image(img_path):
    # Verify image exists
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"Image not found at {img_path}")
    
    # Load and preprocess image
    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"Could not load image at {img_path}. Check if the file is a valid image.")
    
    img = cv2.resize(img, (128, 128))  # Resize to match model input
    img = img.astype('float32') / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    pred = model.predict(img)[0][0]  # Get prediction score
    label = "Fake" if pred > 0.5 else "Real"
    confidence = pred * 100 if pred > 0.5 else (1 - pred) * 100  # Convert to percentage
    return label, confidence

# Example usage
if __name__ == "__main__":
    image_path = r"data/test/test_5.png"
    try:
        label, confidence = predict_image(image_path)
        print(f"Prediction: {label} ({confidence:.2f}%)")
    except Exception as e:
        print(f"Error: {e}")