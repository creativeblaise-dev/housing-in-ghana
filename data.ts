import { title } from "process";
import { Article } from "./types";
import { GalleryContent } from "./types";

export const blogContent: Article[] = [
  {
    title: "How to Avoid Land Scams When Buying Property in Ghana",
    content:
      "Buying land in Ghana can be a rewarding investment—but without the right due diligence, it could also lead to costly losses. Land litigation is still one of the biggest challenges in the Ghanaian real estate market.",
    published: true,
    featuredImageUrl:
      "https://housing-in-ghana.fra1.cdn.digitaloceanspaces.com/salman-saqib-QlrpgvmdOSU-unsplash.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "1",
    categoryId: 1,
    views: 150,
    likes: 25,
    commentsCount: 10,
    tags: ["Real Estate", "Housing"],
  },
  {
    title: "Can You Afford a Mortgage in Ghana? Here’s What You Should Know",
    content:
      "Many Ghanaians dream of owning a home, but few know what it takes to qualify for a mortgage. With more banks offering home loans today, is now the right time for you?",
    published: true,
    featuredImageUrl: "/images/di_an_h-g_8MrEZAvyE-unsplash.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "1",
    categoryId: 1,
    views: 150,
    likes: 25,
    commentsCount: 10,
    tags: ["Real Estate", "Housing"],
  },
  {
    title: "Why Sustainable Housing Is the Future of Real Estate in Ghana",
    content:
      "Ghana’s housing deficit continues to grow—but what if the answer isn’t just building more homes, but building better ones? Enter sustainable housing.",
    published: true,
    featuredImageUrl: "/images/kam-idris-_HqHX3LBN18-unsplash.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "1",
    categoryId: 1,
    views: 150,
    likes: 25,
    commentsCount: 10,
    tags: ["Real Estate", "Housing"],
  },
  {
    title: "Why Sustainable Housing Is the Future of Real Estate in Ghana",
    content:
      "Ghana’s housing deficit continues to grow—but what if the answer isn’t just building more homes, but building better ones? Enter sustainable housing.",
    published: true,
    featuredImageUrl: "/images/kam-idris-_HqHX3LBN18-unsplash.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "1",
    categoryId: 1,
    views: 150,
    likes: 25,
    commentsCount: 10,
    tags: ["Real Estate", "Housing"],
  },
];

export const galleryGroup: GalleryContent[] = [
  {
    galleryID: 1,
    galleryName: "Ridge Condos",
    coverPhoto: "/images/IMG_5615.jpg",
    link: "#",
    region: "Ashanti Region",
  },
  {
    galleryID: 2,
    galleryName: "Ridge Condos",
    coverPhoto: "/images/IMG_5615.jpg",
    link: "#",
    region: "Ashanti Region",
  },
];
