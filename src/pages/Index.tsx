
import { useState } from 'react';
import { Shield, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';
import { DetectionResult } from '@/components/DetectionResult';
import { cn } from '@/lib/utils';

type DetectionResult = {
  isDeepfake: boolean;
  confidence: number;
  error?: string;
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setResult(null);

    // TODO: Replace with actual API call to your Python backend
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with actual API call
      setResult({
        isDeepfake: Math.random() > 0.5,
        confidence: 0.85 + Math.random() * 0.1,
      });
    } catch (error) {
      setResult({
        isDeepfake: false,
        confidence: 0,
        error: 'Failed to analyze image. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-deepfake-100 rounded-full">
            <Shield className="h-6 w-6 text-deepfake-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Deepfake Detection Tool</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image and our AI will analyze it for signs of manipulation or deepfake artifacts.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <FileUpload onFileSelect={handleFileSelect} />
            
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Important Note</p>
                  <p>While our tool is highly accurate, it should not be used as the sole means of verification. Always cross-reference with other sources.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <DetectionResult result={result} isLoading={isLoading} />

            {!isLoading && !result && (
              <div className="p-8 bg-gray-100 rounded-xl text-center">
                <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Upload an image to see the detection results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Fast Analysis",
              description: "Get results in seconds using our advanced AI model"
            },
            {
              title: "High Accuracy",
              description: "Built on state-of-the-art deep learning techniques"
            },
            {
              title: "Privacy First",
              description: "Your uploads are analyzed locally and never stored"
            }
          ].map((item) => (
            <div 
              key={item.title}
              className="p-6 bg-white rounded-xl shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
