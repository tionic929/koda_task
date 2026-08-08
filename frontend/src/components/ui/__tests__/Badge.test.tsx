import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge, PriorityBadge } from "../Badge";

describe("Badge Components", () => {
  it("renders StatusBadge with status text", () => {
    render(<StatusBadge status="In Progress" />);
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders PriorityBadge with priority text", () => {
    render(<PriorityBadge priority="High" />);
    expect(screen.getByText("High")).toBeInTheDocument();
  });
});
