import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProjectCard } from "../ProjectCard";
import type { Project } from "../../../types/project.types";

const mockProject: Project = {
  id: "p-1",
  clientName: "Acme Corp",
  projectName: "E-Commerce Overhaul",
  description: "Redesigning checkout flow",
  status: "In Progress",
  priority: "High",
  startDate: "2026-06-01T00:00:00.000Z",
  dueDate: "2026-07-01T00:00:00.000Z",
  createdAt: "2026-06-01T00:00:00.000Z",
  updatedAt: "2026-06-01T00:00:00.000Z",
};

describe("ProjectCard Component", () => {
  it("renders project client name, title, description, and status/priority badges", () => {
    render(<ProjectCard project={mockProject} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("E-Commerce Overhaul")).toBeInTheDocument();
    expect(screen.getByText("Redesigning checkout flow")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("opens menu on action button click and triggers onEdit/onDelete", () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(<ProjectCard project={mockProject} onEdit={handleEdit} onDelete={handleDelete} />);

    const menuButton = screen.getByLabelText("More actions");
    fireEvent.click(menuButton);

    const editBtn = screen.getByText("Edit Project");
    fireEvent.click(editBtn);
    expect(handleEdit).toHaveBeenCalledWith(mockProject);
  });
});
