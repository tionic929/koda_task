import React from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import type { Project } from "../../types/project.types";

interface DeleteProjectDialogProps {
  isOpen: boolean;
  project: Project | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  isOpen,
  project,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Project">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-900">
            "{project.projectName}"
          </span>{" "}
          for client{" "}
          <span className="font-semibold text-slate-900">
            "{project.clientName}"
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            Confirm Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
