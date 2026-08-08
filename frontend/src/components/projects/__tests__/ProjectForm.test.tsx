import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProjectForm } from "../ProjectForm";

describe("ProjectForm Component", () => {
  it("renders form fields for creating a new project", () => {
    render(<ProjectForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByLabelText(/client name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Project" })).toBeInTheDocument();
  });

  it("submits form data when valid input is provided", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ProjectForm onSubmit={handleSubmit} onCancel={vi.fn()} />);

    const clientInput = screen.getByLabelText(/client name/i);
    const projectInput = screen.getByLabelText(/project name/i);

    fireEvent.change(clientInput, { target: { value: "Acme Corp" } });
    fireEvent.change(projectInput, { target: { value: "New App" } });

    const submitBtn = screen.getByRole("button", { name: "Create Project" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it("calls onCancel when Cancel button is clicked", () => {
    const handleCancel = vi.fn();
    render(<ProjectForm onSubmit={vi.fn()} onCancel={handleCancel} />);

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(handleCancel).toHaveBeenCalled();
  });
});
