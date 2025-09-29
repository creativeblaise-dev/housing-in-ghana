import React, { useState } from "react";
import { ImagePreviewWithDeleteProps } from "@/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/OptimizedImage";

export function ImagePreviewWithDelete({
  src,
  alt,
  fileId,
  onRemove,
  onRemoveSuccess,
  onRemoveError,
  className,
  showDeleteConfirm = true,
}: ImagePreviewWithDeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = async () => {
    if (!fileId) {
      // If no fileId, just call onRemove (for preview-only images)
      onRemove?.(fileId);
      return;
    }

    setIsDeleting(true);

    try {
      console.log("🗑️ Deleting file:", fileId);

      const response = await fetch(`/api/upload/${fileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed");
      }

      const result = await response.json();
      console.log("✅ Delete successful:", result);

      // Success callback
      onRemoveSuccess?.();
      onRemove?.(fileId);

      toast.success("File record has been removed from database.");
    } catch (error) {
      console.error("❌ Delete failed!:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Delete failed!!!";
      onRemoveError?.(errorMessage);

      toast.error("Delete from spaces object failed!!!!");
    } finally {
      setIsDeleting(false);
      setShowDialog(false);
    }
  };

  const handleRemoveClick = () => {
    if (showDeleteConfirm && fileId) {
      setShowDialog(true);
    } else {
      handleDelete();
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={1000}
        height={10000}
        className="w-full h-50 object-cover rounded-lg"
      />

      {showDeleteConfirm && fileId ? (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={isDeleting}
              onClick={handleRemoveClick}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete File</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this file? This action will:
              </AlertDialogDescription>
              <div>
                <p className="text-sm mb-1 text-red-500">
                  Remove the file from storage
                </p>
                <p className="text-sm mb-1 text-red-500">
                  Delete the record from the database
                </p>
                <p className="text-sm mb-1 text-red-500">
                  Make the file permanently inaccessible
                </p>
              </div>
              <span className="text-sm text-slate-500">
                This action cannot be undone.
              </span>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete File
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={handleRemoveClick}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
}
