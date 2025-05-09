import { Link } from "react-router-dom";
import { Shield, Zap, BarChart2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Deepfake Defender
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Advanced AI-powered solution to detect and combat deepfake content
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/detect"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Start Detection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Detection</h3>
              <p className="text-gray-600">
                State-of-the-art AI algorithms for accurate deepfake detection
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Zap className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-gray-600">
                Quick and efficient processing of media content
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <BarChart2 className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-600">
                Comprehensive analysis and confidence scores
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <CheckCircle className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-friendly</h3>
              <p className="text-gray-600">
                Simple interface for easy content verification
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Training Results
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Accuracy Plot</h3>
              <img
                src="http://localhost:8000/models/accuracy_plot.png"
                alt="Accuracy Plot"
                className="w-full rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%236b7280' text-anchor='middle' dominant-baseline='middle'%3EPlot not available%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Loss Plot</h3>
              <img
                src="http://localhost:8000/models/loss_plot.png"
                alt="Loss Plot"
                className="w-full rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%236b7280' text-anchor='middle' dominant-baseline='middle'%3EPlot not available%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">82.5%</div>
              <p className="text-gray-600">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">0.023</div>
              <p className="text-gray-600">Loss</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <p className="text-gray-600">Samples Tested</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Detect Deepfakes?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start using our advanced detection system today to protect yourself
            from manipulated media
          </p>
          <Link
            to="/detect"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Deepfake Defender. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
