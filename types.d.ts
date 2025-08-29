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
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
  authorId: string;
  categoryId?: number;
  tags?: string[];
  views: number;
  likes: number;
  commentsCount: number;
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
