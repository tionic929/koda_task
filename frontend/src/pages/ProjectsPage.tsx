import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  getErrorMessage,
} from "../hooks/useProjects";
import { ProjectList } from "../components/projects/ProjectList";
import { ProjectForm } from "../components/projects/ProjectForm";
import { DeleteProjectDialog } from "../components/projects/DeleteProjectDialog";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import type { Project, CreateProjectInput } from "../types/project.types";
import logoImg from "../assets/clienttrackerlogo.png";

export const ProjectsPage: React.FC = () => {
  const { projects, isLoading, isFetching, isError, error, refetch } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  // Modal State Management
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Track component mount status to avoid state updates on unmounted components
  const isSubmittingRef = useRef(false);

  const handleOpenCreateModal = () => {
    setSelectedProject(null);
    setApiError(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setSelectedProject(project);
    setApiError(null);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedProject(null);
    setApiError(null);
  };

  const handleSaveProject = async (data: CreateProjectInput) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setApiError(null);

    try {
      if (selectedProject) {
        // Edit Mode
        await updateMutation.mutateAsync({
          id: selectedProject.id,
          data,
        });
      } else {
        // Create Mode
        await createMutation.mutateAsync(data);
      }
      handleCloseModals();
    } catch (err: unknown) {
      setApiError(getErrorMessage(err));
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProject || isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      await deleteMutation.mutateAsync(selectedProject.id);
      handleCloseModals();
    } catch (err: unknown) {
      alert(`Delete failed: ${getErrorMessage(err)}`);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-3">
              <img
                src={logoImg}
                alt="Client Project Tracker Logo"
                className="h-10 w-auto object-contain"
              />
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Client Project Tracker
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Monitor, organize, and manage client project progress and priorities.
            </p>
          </div>

          <Button variant="primary" onClick={handleOpenCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Global Error Banner */}
        {isError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
            <p className="text-sm text-rose-700 font-medium">
              Failed to load projects: {getErrorMessage(error)}
            </p>
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {/* Project List */}
        <ProjectList
          projects={projects}
          isLoading={isLoading}
          isFetching={isFetching}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteDialog}
        />

        {/* Create / Edit Project Modal */}
        <Modal
          isOpen={isFormModalOpen}
          onClose={handleCloseModals}
          title={selectedProject ? "Edit Project" : "Create New Project"}
        >
          <ProjectForm
            initialData={selectedProject}
            onSubmit={handleSaveProject}
            onCancel={handleCloseModals}
            isLoading={createMutation.isPending || updateMutation.isPending}
            apiError={apiError}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <DeleteProjectDialog
          isOpen={isDeleteModalOpen}
          project={selectedProject}
          onConfirm={handleDeleteProject}
          onCancel={handleCloseModals}
          isLoading={deleteMutation.isPending}
        />
      </div>
    </div>
  );
};
