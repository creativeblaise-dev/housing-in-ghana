"use client";
import { useState, useRef, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { MultiFileUploadProps } from "@/types";

const MultiFileUpload = ({
  onUploadComplete,
  onUploadError,
  maxFiles = 30,
  acceptedTypes = ["image/*"],
  className,
  folder = "",
  uploadType = "image",
}: MultiFileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, maxFiles));
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      const BATCH_SIZE = 5; // Upload 5 files at a time
      const allResults = [];
      const allErrors = [];
      const totalBatches = Math.ceil(selectedFiles.length / BATCH_SIZE);

      // Split files into batches
      for (let i = 0; i < selectedFiles.length; i += BATCH_SIZE) {
        const currentBatch = Math.floor(i / BATCH_SIZE) + 1;
        setUploadProgress({ current: currentBatch, total: totalBatches });
        const batch = selectedFiles.slice(i, i + BATCH_SIZE);

        try {
          const formData = new FormData();
          formData.append("type", uploadType);
          formData.append("folder", folder);

          batch.forEach((file) => {
            formData.append("files", file);
          });

          const response = await fetch("/api/upload/gallery", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            let errorMessage = "Upload failed";
            try {
              // Clone the response so we can read it multiple times if needed
              const responseClone = response.clone();
              const errorData = await responseClone.json();
              errorMessage = errorData.error || errorMessage;
            } catch (parseError) {
              // If JSON parsing fails, try to read as text from the original response
              try {
                const textResponse = await response.text();
                errorMessage = textResponse || `Server error (${response.status}): ${response.statusText}`;
              } catch (textError) {
                errorMessage = `Server error (${response.status}): ${response.statusText}`;
              }
            }
            throw new Error(errorMessage);
          }

          let result;
          try {
            result = await response.json();
          } catch (parseError) {
            throw new Error("Invalid response format from server");
          }

          if (result.data) {
            allResults.push(...result.data);
          }
          if (result.errors) {
            allErrors.push(...result.errors);
          }

          // Small delay between batches to prevent overwhelming the server
          if (i + BATCH_SIZE < selectedFiles.length) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }

        } catch (batchError) {
          // If a batch fails, add all files in that batch to errors
          batch.forEach(file => {
            allErrors.push({
              file: file.name,
              error: batchError instanceof Error ? batchError.message : "Upload failed"
            });
          });
        }
      }

      // Report results
      if (allResults.length > 0) {
        onUploadComplete(allResults);
      }

      if (allErrors.length > 0) {
        const errorMessage = `${allErrors.length} file(s) failed to upload. Check console for details.`;
        onUploadError?.(errorMessage);
      }

      setSelectedFiles([]);
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, maxFiles));
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center mb-4",
            isDragging ? "border-primary bg-primary/5" : "border-gray-300"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />

          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">
            Drop multiple files here or click to browse
          </p>
          <p className="text-sm text-gray-500">Maximum {maxFiles} files</p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="font-medium">Selected Files:</h4>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      className="w-10 h-10"
                      src={URL.createObjectURL(file)}
                      alt={index.toString()}
                      width={40}
                      height={40}
                    />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(file.size / 1024)}KB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading
              ? uploadProgress
                ? `Uploading batch ${uploadProgress.current} of ${uploadProgress.total}...`
                : "Uploading in batches..."
              : `Upload ${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""}`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MultiFileUpload;
