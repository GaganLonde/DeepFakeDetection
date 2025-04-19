
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FileUpload({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelect(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
        isDragActive ? "border-deepfake-500 bg-deepfake-50" : "border-gray-300 hover:border-deepfake-400",
        preview ? "border-deepfake-500" : ""
      )}
    >
      <input {...getInputProps()} />
      
      {preview ? (
        <div className="space-y-4">
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
          <p className="text-sm text-gray-500">Click or drag to change image</p>
        </div>
      ) : (
        <div className="space-y-4">
          {isDragActive ? (
            <Upload className="w-12 h-12 mx-auto text-deepfake-500" />
          ) : (
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
          )}
          <div>
            <p className="text-base font-medium text-gray-900">
              Drop your image here, or <span className="text-deepfake-500">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports JPEG, JPG, PNG, and GIF
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
