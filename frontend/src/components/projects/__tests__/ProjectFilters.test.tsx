import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProjectFilters } from "../ProjectFilters";

describe("ProjectFilters Component", () => {
  it("renders search input and filter dropdowns with project count", () => {
    render(
      <ProjectFilters
        filters={{ search: "", status: "", priority: "" }}
        onFilterChange={vi.fn()}
        onResetFilters={vi.fn()}
        totalCount={12}
      />
    );

    expect(screen.getByPlaceholderText(/search by client or project name/i)).toBeInTheDocument();
    expect(screen.getByText(/12/)).toBeInTheDocument();
  });

  it("triggers onFilterChange when typing in search input", () => {
    const handleFilterChange = vi.fn();
    render(
      <ProjectFilters
        filters={{ search: "", status: "", priority: "" }}
        onFilterChange={handleFilterChange}
        onResetFilters={vi.fn()}
        totalCount={5}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search by client or project name/i);
    fireEvent.change(searchInput, { target: { value: "Acme" } });

    expect(handleFilterChange).toHaveBeenCalledWith({ search: "Acme", page: 1 });
  });

  it("shows Clear Filters button when filters are active and triggers onResetFilters", () => {
    const handleReset = vi.fn();
    render(
      <ProjectFilters
        filters={{ search: "Acme", status: "Planning", priority: "" }}
        onFilterChange={vi.fn()}
        onResetFilters={handleReset}
        totalCount={2}
      />
    );

    const clearButton = screen.getByText("Clear Filters");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleReset).toHaveBeenCalled();
  });
});
