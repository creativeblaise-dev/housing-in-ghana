import { spacesClient } from "./spaces";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { UploadResult } from "@/types";
import {
  PutObjectCommand,
  ObjectCannedACL,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export async function uploadToSpaces(
  file: File,
  folder: string = "uploads"
): Promise<UploadResult> {
  const fileExtension = path.extname(file.name);
  const fileName = `${uuidv4()}${fileExtension}`;
  const key = `${folder}/${fileName}`;

  const buffer = await file.arrayBuffer();

  const uploadParams = {
    Bucket: process.env.DO_SPACES_BUCKET!,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
    ACL: ObjectCannedACL.public_read,
    CacheControl: "max-age=31536000", // 1 year cache
  };

  try {
    const result = await spacesClient.send(new PutObjectCommand(uploadParams));

    // Use CDN endpoint if available, otherwise use the direct URL
    const baseUrl =
      process.env.DO_SPACES_CDN_ENDPOINT ||
      `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com`;

    const url = `${baseUrl}/${key}`;

    return {
      url,
      key,
      originalName: file.name,
      size: file.size,
      mimeType: file.type,
    };
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Failed to upload file to DigitalOcean Spaces");
  }
}

export async function deleteFromSpaces(key: string): Promise<void> {
  const deleteParams = {
    Bucket: process.env.DO_SPACES_BUCKET!,
    Key: key,
  };

  try {
    await spacesClient.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error("Delete failed:", error);
    throw new Error("Failed to delete file from DigitalOcean Spaces");
  }
}

// Utility function to extract key from URL
export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    // Remove leading slash
    return pathname.startsWith("/") ? pathname.substring(1) : pathname;
  } catch {
    return null;
  }
}

// File validation utilities
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(
  file: File,
  allowedTypes: string[] = ALLOWED_IMAGE_TYPES
): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 10MB";
  }

  if (!allowedTypes.includes(file.type)) {
    return `File type ${file.type} is not allowed`;
  }

  return null;
}
