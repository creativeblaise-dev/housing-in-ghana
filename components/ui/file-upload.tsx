"use client";

import { useState, useRef, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, File } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { FileUploadProps } from "@/types";

const FileUpload = ({
  onUploadComplete,
  onUploadError,
  acceptedTypes = ["image/*"],
  maxSize = 10 * 1024 * 1024, // 10MB
  uploadType = "image",
  folder = "",
  className,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file.size > maxSize) {
      onUploadError?.(
        `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", uploadType);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      setUploadProgress(100);

      setTimeout(() => {
        onUploadComplete(result.data);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      onUploadError?.(error instanceof Error ? error.message : "Upload failed");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={cn("relative", className)}>
      <CardContent className="p-6">
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-gray-400",
            isUploading && "pointer-events-none opacity-60"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
        >
          <Input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center space-y-4">
            {uploadType === "image" ? (
              <Image
                className="w-10 h-auto text-gray-400"
                src="/images/uploader-icon.png"
                width={60}
                height={60}
                alt={"image upload"}
              />
            ) : (
              <File className="w-12 h-12 text-gray-400" />
            )}

            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragging
                  ? "Drop your file here"
                  : "Drag & drop your file here"}
              </p>
              <p className="text-sm text-gray-500">or click to browse files</p>
              <p className="text-xs text-gray-400">
                Max size: {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>

            {isUploading && (
              <div className="w-full max-w-xs space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-500">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
