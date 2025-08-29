import { SiteNavigation } from "@/types";

export const FIELD_NAMES = {
  name: "Full Name",
  email: "Email",
  password: "Password",
  // businessCertificate: "Business Certificate",
};

export const FIELD_TYPES = {
  name: "text",
  email: "email",
  password: "password",
};

export const navigation: SiteNavigation[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Magazine", href: "/magazine" },
  { name: "Mileage", href: "/mileage" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact-us" },
  { name: "Advertise With Us", href: "/advertise-with-us" },
];
