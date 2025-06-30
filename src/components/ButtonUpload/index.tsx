import React, { useState, useRef, useCallback } from 'react';
import { Upload, Paperclip, X, Trash } from 'lucide-react';
import cn from 'classnames';

export interface ButtonUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  showFileList?: boolean;
  buttonText?: string;
  description?: string;
}

export interface UploadedFile extends File {
  id: string;
}

export const ButtonUpload: React.FC<ButtonUploadProps> = ({
  onFilesChange,
  accept = "*/*",
  multiple = true,
  maxFiles = 3,
  maxSize = 25 * 1024 * 1024, // 25MB default to match reference
  disabled = false,
  className,
  buttonClassName,
  showFileList = true,
  buttonText = "Click to upload",
  description
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
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

  const getDefaultDescription = () => {
    const fileType = accept === "*/*" ? "any file type" : accept;
    return `Support ${fileType}. Max. ${maxFiles} files (${formatFileSize(maxSize)} total).`;
  };

  const processFiles = useCallback((fileList: FileList | File[]) => {
    const newFiles: UploadedFile[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (!multiple && files.length + newFiles.length >= 1) {
        errors.push("Only one file is allowed");
        return;
      }

      if (files.length + newFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Add file even if it has validation errors (like size) - we'll show them with error state
      const uploadedFile: UploadedFile = Object.assign(file, {
        id: generateFileId()
      });

      newFiles.push(uploadedFile);
    });

    if (errors.length > 0) {
      setError(errors[0]);
      return;
    }

    setError("");
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  }, [files, multiple, maxFiles, onFilesChange]);

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

  const hasFiles = files.length > 0;

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Button */}
      <div>
        <button
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md",
            "hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            buttonClassName
          )}
        >
          <Upload className="h-4 w-4 mr-2" />
          {buttonText}
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
          aria-describedby={error ? "file-error" : undefined}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div id="file-error" className="mt-2 text-sm text-red-600 flex items-center">
          <X className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}

      {/* File List */}
      {showFileList && hasFiles && (
        <div className="mt-4 space-y-3">
          {files.map((file) => {
            const hasError = file.size > maxSize;
            return (
              <div
                key={file.id}
                className="flex items-start justify-between"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <div className="flex-shrink-0">
                    <Paperclip 
                      className={cn("h-4 w-4", {
                        "text-sky-600": !hasError,
                        "text-red-500": hasError
                      })} 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                    <p className={cn("text-sm font-medium truncate", {
                      "text-sky-600": !hasError,
                      "text-red-600": hasError
                    })}>
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    </div>
                    {hasError && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        File is too large (max. {formatFileSize(maxSize)})
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => removeFile(file.id)}
                    disabled={disabled}
                    className="text-gray-400 hover:text-red-500 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
                    aria-label={`Remove ${file.name}`}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-500 mt-3">
      {description || getDefaultDescription()}
      </p>
    </div>
  );
};

export default ButtonUpload; 