import { JSONContent } from "@tiptap/react";

declare global {
  interface Window {
    noUiSlider: any; // Or specify a more precise type if available from noUiSlider's typings
  }
}

export type GalleryContent = {
  galleryID: number;
  galleryName: string;
  coverPhoto: string;
  link: string;
  region: string;
};

export type ArticleType = {
  id?: string;
  title: string;
  content: JSONContent[];
  slug: string;
  author: string;
  status: string;
  excerpt: string;
  featuredImageUrl: string;
  initialFeaturedImage?: FeaturedImageData;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  tags?: string[];
  magazineEditionAlias?: string;
};

export type MagazineEdition = {
  title: string;
  editionNumber: number;
  editionAlias: string;
  summary: string;
  backgroundImage: string;
  releasedAt: string;
  coverImage: string;
  editorialNote: string;
  readOnlineButtonLink: string;
};

export type MileageFormData = {
  region: string;
  placeName: string;
  description?: string;
};

export type MileagePost = {
  id: string;
  region: string;
  placeName: string;
  description?: string;
  photos: string[];
};

export type MagazineEditionCover = {
  id: string;
  url: string;
  originalName: string;
};

export type SingleGalleryProps = {
  id: MileagePost["id"];
};

export type SiteNavigation = {
  name: string;
  href: string;
};

export type AuthCredentials = {
  name: string;
  email: string;
  password: string;
};

export type UserRoles = {
  role: "subscriber" | "contributor" | "admin" | "super_admin";
};

export type UserStatus = {
  status: "active" | "inactive" | "suspended";
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: UserRoles["role"];
  status: UserStatus["status"];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  _count?: {
    articles: number;
  };
};

export type AdminSidebarMenuTypes = {
  group: string;
  items: {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }[];
};

export type UploadResult = {
  url: string;
  key: string;
  originalName: string;
  size: number;
  mimeType: string;
};

export type UploadedFile = {
  id: string;
  url: string;
  originalName: string;
  size: number;
  mimeType: string;
};

export type FileUploadProps = {
  onUploadComplete: (file: UploadedFile) => void;
  onUploadError?: (error: string) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  uploadType?: "image" | "document";
  folder?: string;
  className?: string;
};

export type MultiFileUploadProps = {
  onUploadComplete: (files: UploadedFile[]) => void;
  onUploadError?: (error: string) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  uploadType?: "image";
  folder?: string;
  className?: string;
};

export type ImagePreviewProps = {
  src: string;
  alt: string;
  onRemove?: (fileId?: string) => void;
  onRemoveError?: (error: string) => void;
  className?: string;
  fileId?: string; // Database ID for the uploaded file
};

export type ImagePreviewWithDeleteProps = {
  src: string;
  alt: string;
  fileId?: string; // Database ID for the uploaded file
  onRemove?: (fileId?: string) => void;
  onRemoveSuccess?: () => void;
  onRemoveError?: (error: string) => void;
  className?: string;
  showDeleteConfirm?: boolean; // Whether to show confirmation dialog
};

export type FeaturedImageData = {
  id: string;
  url: string;
  originalName: string;
};

export type LayoutImages = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};
