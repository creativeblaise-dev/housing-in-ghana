import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconAlertTriangle, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { UserType } from "../../types";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: UserType | null;
  isDeleting: boolean;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  isDeleting,
}) => {
  if (!user) return null;

  const articleCount = user._count?.articles || 0;
  const hasArticles = articleCount > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <IconAlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Delete User Account
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
            <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${user.name || user.email} avatar`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <IconUser className="w-6 h-6 text-gray-500" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {user.name || "No name"}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user.role}
                </Badge>
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this user account? This action
              cannot be undone.
            </p>

            {hasArticles && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <IconAlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Warning: User has content
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This user has{" "}
                      <span className="font-medium">{articleCount}</span>{" "}
                      {articleCount === 1 ? "article" : "articles"}. Deleting
                      this user may affect associated content.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-800">
                This will permanently:
              </p>
              <ul className="text-xs text-red-700 mt-1 space-y-1 ml-3">
                <li>• Delete the user account and profile</li>
                <li>• Remove access to all features</li>
                <li>• Cannot be reversed</li>
                {hasArticles && (
                  <li>
                    • May orphan {articleCount} article
                    {articleCount !== 1 ? "s" : ""}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="min-w-[100px]"
          >
            {isDeleting ? "Deleting..." : "Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
