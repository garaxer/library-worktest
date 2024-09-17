import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // For testing Link component
import Home from "../../routes/Home";

test("Renders home route correctly", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText(/Welcome to the DESI Library/i)).toBeDefined();

  const booksButton = screen.getByRole("button", { name: /Books!/i });
  expect(booksButton).toBeDefined();

  expect(booksButton.closest("a")).toHaveAttribute("href", "/books");
});