import cv2
import os
from mtcnn import MTCNN

def extract_faces(input_dir, output_dir):
    detector = MTCNN()
    os.makedirs(output_dir, exist_ok=True)
    
    for filename in os.listdir(input_dir):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            img_path = os.path.join(input_dir, filename)
            img = cv2.imread(img_path)
            faces = detector.detect_faces(img)
            for i, face in enumerate(faces):
                x, y, w, h = face['box']
                face_img = img[y:y+h, x:x+w]
                output_path = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}_face_{i}.jpg")
                cv2.imwrite(output_path, face_img)
                print(f"Saved face to {output_path}")

# Example usage
extract_faces('data/raw/real/', 'data/train/real/')
extract_faces('data/raw/fake/', 'data/train/fake/')
# Repeat for test data: extract_faces('data/raw/real/', 'data/test/real/'), etc.