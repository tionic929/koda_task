import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "../Pagination";

describe("Pagination Component", () => {
  it("renders summary text and page buttons correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
        totalItems={15}
        itemsPerPage={6}
      />
    );

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
    expect(screen.getByText(/showing/i)).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
        totalItems={15}
        itemsPerPage={6}
      />
    );

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).not.toBeDisabled();
  });

  it("invokes onPageChange when clicking next button", () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
        totalItems={15}
        itemsPerPage={6}
      />
    );

    fireEvent.click(screen.getByLabelText("Next page"));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
