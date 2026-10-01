# DeepFake Detection System

A modern web application for detecting deepfake images using machine learning. This project combines a React frontend with a Python backend to provide an intuitive interface for deepfake detection.

![Project Screenshot](public/screenshot.png)

## Features

- 🎨 Modern, responsive UI with smooth animations
- 📸 Easy image upload and preview
- 🤖 Machine learning-based deepfake detection
- 📊 Real-time analysis results with confidence scores
- 🔄 Seamless integration between frontend and backend
- 🎯 High accuracy in detecting manipulated images

## Tech Stack

### Frontend

- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- TanStack Query for data fetching

### Backend

- Python
- FastAPI
- TensorFlow for machine learning
- OpenCV for image processing

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/GaganLonde/deepfake-detection.git
cd deepfake-detection
```

2. Install frontend dependencies:

```bash
npm install
```

3. Set up Python virtual environment and install backend dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the Application

1. Start the backend server:

```bash
cd backend
python main.py
```

2. In a new terminal, start the frontend development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:8080`

## Usage

1. Navigate to the Detect page
2. Click "Choose Image" to select an image file
3. Preview the selected image
4. Click "Analyze Image" to process the image
5. View the results showing whether the image is a deepfake and the confidence level

## Project Structure

```
deepfake-detection/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── models/
├── src/
│   ├── pages/
│   │   ├── Landing.tsx
│   │   └── Detect.tsx
│   ├── components/
│   └── App.tsx
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Thanks to all contributors who have helped with this project
- Special thanks to the open-source community for the amazing tools and libraries

## Deploy on Vercel

The FastAPI backend and Vite frontend deploy together as one Vercel project. The Python function serves the API and the built frontend from the same origin, so no external API URL or production CORS configuration is needed.

1. Import this repository into Vercel with the repository root as the project root.
2. Select the **FastAPI** framework preset if Vercel does not detect it automatically.
3. Keep the Python version at 3.12 and set the build command to `npm ci && npm run build`.
4. Deploy. The frontend is available at `/`, and the API at `/predict`.

Vercel Hobby functions limit request bodies to 4.5 MB, so uploaded images must stay below that size. TensorFlow also makes the function bundle large; if the deployment reports a bundle-size error, enable Vercel's Large Functions support for the project or use a smaller inference runtime.

## Contact

Your Name - [@gagan_londe](https://x.com/gagan_londe?t=cbrm8mkuG2PL8IviyT3_IQ&s=08)

Project Link: [https://github.com/GaganLonde/DeepFakeDetection](https://github.com/GaganLonde/DeepFakeDetection)
