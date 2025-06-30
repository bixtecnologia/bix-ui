import React, { useState, useRef, useCallback } from 'react';
import { Plus, AlertTriangle, X, Upload } from 'lucide-react';
import cn from 'classnames';

export interface ImageUploadProps {
  onFilesChange: (files: UploadedImageFile[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
  showUploadButton?: boolean;
}

export interface UploadedImageFile extends File {
  id: string;
  preview?: string;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFilesChange,
  accept = "image/*",
  multiple = true,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  className,
  showUploadButton = true
}) => {
  const [files, setFiles] = useState<UploadedImageFile[]>([]);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const processFiles = useCallback(async (fileList: FileList | File[]) => {
    const newFiles: UploadedImageFile[] = [];
    const errors: string[] = [];

    for (const file of Array.from(fileList)) {
      if (files.length + newFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        break;
      }

      if (file.size > maxSize) {
        const preview = await createImagePreview(file);
        const uploadedFile: UploadedImageFile = Object.assign(file, {
          id: generateFileId(),
          preview,
          status: 'error' as const,
          progress: 0
        });
        newFiles.push(uploadedFile);
      } else {
        const preview = await createImagePreview(file);
        const uploadedFile: UploadedImageFile = Object.assign(file, {
          id: generateFileId(),
          preview,
          status: 'idle' as const,
          progress: 0
        });
        newFiles.push(uploadedFile);
      }
    }

    if (errors.length > 0) {
      setError(errors[0]);
    } else {
      setError("");
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);

    // Simulate upload for demo purposes
    newFiles.forEach((file) => {
      if (file.status === 'idle') {
        simulateUpload(file.id);
      }
    });
  }, [files, maxFiles, maxSize, onFilesChange]);

  const simulateUpload = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, status: 'uploading' as const, progress: 0 } : file
    ));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(file => 
          file.id === fileId ? { ...file, status: 'success' as const, progress: 100 } : file
        ));
      } else {
        setFiles(prev => prev.map(file => 
          file.id === fileId ? { ...file, progress } : file
        ));
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
    setError("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const canAddMore = files.length < maxFiles;

    return (
      <div className={cn("w-full", className)}>
        <div className="flex flex-wrap gap-4">
          {/* Initial upload card - always shown when no files OR when files exist and multiple is true */}
          {(files.length === 0 || (canAddMore && showUploadButton && multiple)) && (
            <div
              onClick={handleClick}
              className={cn(
                "w-32 h-32 border border-solid border-zinc-300 rounded-lg cursor-pointer transition-all duration-200 bg-zinc-50 flex flex-col items-center justify-center",
                {
                  "opacity-50 cursor-not-allowed bg-zinc-100": disabled,
                  "hover:bg-zinc-100 hover:border-zinc-400": !disabled,
                }
              )}
            >
              <Plus className="h-6 w-6 text-zinc-900 mb-1" />
              <span className="text-xs text-zinc-900 font-medium">Upload</span>
            </div>
          )}

          {/* File previews */}
          {files.map((file) => (
            <div key={file.id} className="relative w-32 h-32 group">
              <div
                className={cn(
                  "w-full h-full rounded-lg border overflow-hidden relative",
                  {
                    "border-zinc-300": file.status === 'idle' || file.status === 'success' || file.status === 'uploading',
                    "border-red-300": file.status === 'error',
                  }
                )}
              >
                {/* Image preview */}
                {file.preview && (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Error overlay */}
                {file.status === 'error' && (
                  <div className="absolute inset-0 bg-red-50 bg-opacity-90 flex flex-col items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mb-1" />
                    <span className="text-xs text-red-600 text-center px-1 font-medium">
                      {file.name.length > 12 ? `${file.name.substring(0, 12)}...` : file.name}
                    </span>
                  </div>
                )}

                {/* Uploading overlay */}
                {file.status === 'uploading' && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center">
                    <span className="text-xs text-zinc-900 font-medium mb-1">Uploading</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        disabled={disabled}
        className="hidden"
        aria-describedby={error ? "image-error" : undefined}
      />

      {/* Error Message */}
      {error && (
        <div id="image-error" className="mt-3 text-sm text-red-600 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 