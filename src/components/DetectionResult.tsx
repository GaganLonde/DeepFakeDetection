import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Result = {
  isDeepfake: boolean;
  confidence: number;
  error?: string;
};

export function DetectionResult({
  result,
  isLoading,
}: {
  result: Result | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deepfake-500 mx-auto" />
          <p className="text-gray-600 font-medium">Analyzing image...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  if (result.error) {
    return (
      <div className="p-8 bg-red-50 rounded-xl">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-600">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-8 rounded-xl",
        result.isDeepfake ? "bg-red-50" : "bg-green-50"
      )}
    >
      <div className="flex items-center space-x-3">
        {result.isDeepfake ? (
          <XCircle className="h-8 w-8 text-red-500" />
        ) : (
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        )}
        <div>
          <h3
            className={cn(
              "font-semibold",
              result.isDeepfake ? "text-red-900" : "text-green-900"
            )}
          >
            {result.isDeepfake ? "Deepfake Detected" : "Authentic Image"}
          </h3>
          <p
            className={cn(
              "text-sm",
              result.isDeepfake ? "text-red-600" : "text-green-600"
            )}
          >
            Confidence: {result.confidence.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
