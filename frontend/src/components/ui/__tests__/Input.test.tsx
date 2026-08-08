import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../Input";

describe("Input Component", () => {
  it("renders label and associates with input field", () => {
    render(<Input label="Project Name" placeholder="Enter name" />);

    expect(screen.getByLabelText("Project Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("renders error message when error prop is provided", () => {
    render(<Input label="Email" error="Invalid email address" />);

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  it("handles input value changes", () => {
    const handleChange = vi.fn();
    render(<Input label="Name" onChange={handleChange} />);

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalled();
  });
});
