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

## Deploy

Deploy the FastAPI backend to Cloud Run and keep the Vite frontend on Vercel. This keeps TensorFlow in a container instead of a Vercel serverless bundle.

### Backend on Cloud Run

1. Authenticate, select your Google Cloud project, and enable Cloud Run and Cloud Build:

```powershell
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

2. Deploy the backend to Mumbai (`asia-south1`). Replace the CORS origin with your Vercel Production domain, without a trailing slash. Local Docker is not required; Cloud Run builds the image from `backend/Dockerfile`:

```powershell
gcloud run deploy deepfake-backend --source backend --region asia-south1 --allow-unauthenticated --memory 2Gi --cpu 1 --concurrency 1 --timeout 300 --min 0 --max 1 --set-env-vars "CORS_ORIGINS=https://YOUR-VERCEL-DOMAIN"
```

Copy the HTTPS service URL printed when deployment finishes.

Cloud Run's request-based free tier includes monthly CPU, memory, and request quotas; `asia-south1` is a Tier 1 region. Scale-to-zero helps avoid idle compute charges, but free usage is shared across projects on the billing account and is not a guarantee of a zero bill. Cloud Build, Artifact Registry storage, and network egress can have separate charges. Set a budget alert in Google Cloud Billing and monitor usage.

### Frontend on Vercel

1. Set the Vercel Framework Preset to **Vite**, with the repository root as the Root Directory.
2. Set the Build Command to `npm ci && npm run build` and the Output Directory to `dist`.
3. Add `VITE_API_BASE_URL` in the Production environment with the Cloud Run service URL, without a trailing slash.
4. Redeploy the frontend. The API endpoint is `<Cloud Run service URL>/predict`.

## Contact

Your Name - [@gagan_londe](https://x.com/gagan_londe?t=cbrm8mkuG2PL8IviyT3_IQ&s=08)

Project Link: [https://github.com/GaganLonde/DeepFakeDetection](https://github.com/GaganLonde/DeepFakeDetection)
