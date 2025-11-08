import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaSpinner, FaArrowLeft } from "react-icons/fa";

const Detect: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isDeepfake: boolean;
    confidence: number;
  } | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
      const apiUrl = `${apiBaseUrl}/predict`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json();
      if (data.error) {
        alert("Failed to analyze image: " + data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center text-blue-200 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 text-center">
            DeepFake Defender
          </h1>
          <p className="text-blue-200 text-center mb-8">
            Upload an image to check if it's a deepfake or real
          </p>

          <motion.div
            className="bg-white text-gray-800 rounded-xl p-8 shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <FaUpload />
                  <span>Choose Image</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {selectedFile && (
                  <p className="mt-2 text-gray-600">{selectedFile.name}</p>
                )}
              </div>

              {previewUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex justify-center"
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 rounded-lg shadow-lg"
                  />
                </motion.div>
              )}

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={!selectedFile || isLoading}
                  className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
                    !selectedFile || isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-500"
                  } transition-colors text-white`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </motion.button>
              </div>
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-lg bg-gray-50"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Analysis Result
                </h2>
                <div className="space-y-4">
                  <p className="text-xl text-gray-700">
                    This image is{" "}
                    <span
                      className={`font-bold ${
                        result.isDeepfake ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {result.isDeepfake ? "a DeepFake" : "Real"}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Confidence: {result.confidence.toFixed(2)}%
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-8 text-yellow-200 text-sm">
            <p className="font-semibold mb-2 text-center">
              ⚠️ Important Disclaimer:
            </p>
            <p>
              The accuracy of detection may vary based on image quality,
              lighting conditions, and the sophistication of the deepfake.
              Always use this tool as one of several methods for verification,
              not as a definitive proof.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Detect;
