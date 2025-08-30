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

export type Article = {
  title: string;
  content: string;
  featuredImageUrl: string;
  initialFeaturedImage?: FeaturedImageData;
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
  authorId: string;
  categoryId?: number;
  tags?: string[];
  views: number;
  likes: number;
  commentsCount: number;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  isLoading?: boolean;
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
  className?: string;
};

export type ImagePreviewProps = {
  src: string;
  alt: string;
  onRemove?: () => void;
  className?: string;
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
