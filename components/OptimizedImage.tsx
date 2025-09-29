import Image, { ImageProps } from "next/image";
import { type StaticImageData } from "next/image";
import { getImageUrl } from "@/lib/image-utils";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData;
}

export function OptimizedImage({ src, ...props }: OptimizedImageProps) {
  // Handle StaticImageData (imported images)
  if (typeof src === "object" && "src" in src) {
    return <Image src={src} {...props} />;
  }

  // Handle string paths
  const optimizedSrc = getImageUrl(src as string);

  return <Image src={optimizedSrc} {...props} />;
}
