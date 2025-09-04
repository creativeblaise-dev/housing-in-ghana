"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { ImagePreviewProps } from "@/types";

export function ImagePreview({
  src,
  alt,
  fileId,
  onRemove,
  className,
}: ImagePreviewProps) {
  return (
    <div className={cn("relative group", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-60 object-cover rounded-lg"
      />
      {onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onRemove(fileId)}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
