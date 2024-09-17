import { expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Borrow from "../../routes/Borrow";
import { useData, makeRequest } from "../../data";

// Mock the data fetching and request functions
vi.mock("../../data", () => ({
  useData: vi.fn(),
  makeRequest: vi.fn(),
}));

test("Renders Borrow route correctly", async () => {
  // Mock data for testing
  const mockBorrowableBooks = [
    {
      id: 1,
      name: "Book One",
      author: "Author A",
      language: "English",
      pages: 100,
      borrowed: false,
    },
    {
      id: 2,
      name: "Book Two",
      author: "Author B",
      language: "English",
      pages: 200,
      borrowed: false,
    },
  ];
  const mockUnBorrowableBooks = [
    {
      id: 3,
      name: "Book Three",
      author: "Author C",
      language: "English",
      pages: 300,
      borrowed: true,
    },
  ];

  useData.mockImplementation((url, method) => {
    if (url === "/book/borrowablebooks") return [mockBorrowableBooks, vi.fn()];
    if (url === "/book/unborrowablebooks")
      return [mockUnBorrowableBooks, vi.fn()];
  });

  makeRequest.mockResolvedValue({}); // Mock successful request

  render(
    <MemoryRouter>
      <Borrow />
    </MemoryRouter>
  );

  // Check for initial render
  expect(screen.getByText(/Borrow\/Return a Book/i)).toBeInTheDocument();

  // Check if books are rendered
  mockBorrowableBooks.forEach((book) => {
    expect(screen.getByText(book.name)).toBeInTheDocument();
  });
  mockUnBorrowableBooks.forEach((book) => {
    expect(screen.getByText(book.name)).toBeInTheDocument();
  });

  // Test clicking "Borrow" button
  const borrowButton = screen.getAllByText(/Borrow/i)[0];
  fireEvent.click(borrowButton);

  const returnButton = screen.getAllByText(/Return/i)[0];
  fireEvent.click(returnButton);
});

test("Displays loading spinner when data is being fetched", () => {
  useData.mockImplementation(() => [undefined, vi.fn()]);

  render(
    <MemoryRouter>
      <Borrow />
    </MemoryRouter>
  );

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});
