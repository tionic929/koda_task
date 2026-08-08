import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthProvider, useAuth } from "../AuthContext";

const TestComponent = () => {
  const { user, token, login, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="user">{user ? user.email : "No User"}</div>
      <div data-testid="token">{token || "No Token"}</div>
      <button onClick={() => login({ id: "1", email: "admin@agency.com", name: "Admin", role: "ADMIN" }, "mock-jwt")}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthContext", () => {
  it("provides initial unauthenticated state when no token stored", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("No User");
    });
    expect(screen.getByTestId("token")).toHaveTextContent("No Token");
  });

  it("handles login action and stores token/user", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = await screen.findByRole("button", { name: "Login" });
    fireEvent.click(loginBtn);

    expect(screen.getByTestId("user")).toHaveTextContent("admin@agency.com");
    expect(screen.getByTestId("token")).toHaveTextContent("mock-jwt");
    expect(localStorage.getItem("token")).toBe("mock-jwt");
  });

  it("handles logout action and clears token/user", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = await screen.findByRole("button", { name: "Login" });
    fireEvent.click(loginBtn);
    expect(screen.getByTestId("user")).toHaveTextContent("admin@agency.com");

    const logoutBtn = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutBtn);
    expect(screen.getByTestId("user")).toHaveTextContent("No User");
    expect(localStorage.getItem("token")).toBeNull();
  });
});
