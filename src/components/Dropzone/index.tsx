import React, { useState, useRef, useCallback } from 'react';
import { Paperclip, X, File, CheckCircle, AlertCircle, Trash } from 'lucide-react';
import cn from 'classnames';

export interface DropzoneProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  showFileList?: boolean;
  placeholder?: string;
}

export interface UploadedFile extends File {
  id: string;
  preview?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesChange,
  accept = "*/*",
  multiple = false,
  maxFiles = multiple ? 10 : 1,
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  className,
  children,
  showFileList = true,
  placeholder = "Click or drag files to this area to upload"
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }
    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
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
      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border border-solid border-gray-300 rounded-lg p-8 transition-all duration-200 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          {
            "bg-zinc-50": !isDragOver && !disabled,
            "bg-zinc-100": isDragOver && !disabled,
            "bg-gray-100 cursor-not-allowed": disabled,
            "bg-red-50": error
          }
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="invisible"
          aria-describedby={error ? "file-error" : undefined}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Paperclip 
            className={"h-10 w-10 mb-3 text-zinc-400"} 
          />
          
          {children || (
            <div>
              <p className={cn("text-base font-medium mb-2", {
                "text-zinc-950": !disabled,
                "text-zinc-500": disabled
              })}>
                {placeholder}
              </p>
              <p className={cn("text-sm", {
                "text-zinc-500": !disabled,
                "text-zinc-400": disabled
              })}>
                {accept !== "*/*" && `Support only ${accept} files and single or bulk upload`}
                {!accept || accept === "*/*" ? "Support only PDF files and single or bulk upload" : ""}
              </p>
              <p className={cn("text-xs mt-1", {
                "text-zinc-500": !disabled,
                "text-zinc-400": disabled
              })}>
                Max. {maxFiles} files ({formatFileSize(maxSize)} total)
              </p>
            </div>
          )}
        </div>
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
        <div className="mt-6 space-y-3">
          {files.map((file) => {
            const hasError = file.size > maxSize;
            return (
              <div
                key={file.id}
                className="flex items-start justify-between p-0"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
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
    </div>
  );
};

export default Dropzone; 