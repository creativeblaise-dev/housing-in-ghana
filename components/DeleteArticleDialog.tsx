"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { IconTrash, IconX } from "@tabler/icons-react";
import { ArticleType } from "@/types";

interface DeleteArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  article: ArticleType | null;
  isDeleting: boolean;
}

const DeleteArticleDialog = ({
  isOpen,
  onClose,
  onConfirm,
  article,
  isDeleting,
}: DeleteArticleDialogProps) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-600">
            <IconTrash className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Delete Article</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <IconX className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this article? This action cannot be
            undone.
          </p>

          {/* Article Preview */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              {article.featuredImageUrl && (
                <img
                  src={article.featuredImageUrl}
                  alt={article.title}
                  className="w-16 h-12 object-cover rounded flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate mb-1">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Created: {new Date(article.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      article.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="flex items-center gap-2"
          >
            <IconX className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            <IconTrash className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete Article"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteArticleDialog;
