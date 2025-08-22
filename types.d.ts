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

export type Blog = {
  id: number;
  title: string;
  description: string;
  date: Date;
  image: string;
};

export type SiteNavigation = {
  name: string;
  href: string;
};

export type AuthCredentials = {
  fullName: string;
  email: string;
  password: string;
};
