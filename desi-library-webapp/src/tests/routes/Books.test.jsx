import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useData, makeRequest } from "../../data";
import Books from "../../routes/Books";

// Mock the useData and makeRequest functions
vi.mock("../../data", () => ({
  useData: vi.fn(),
  makeRequest: vi.fn(),
}));

describe("Books Component", () => {
  const initialBooksData = [
    { id: 1, name: "Book 1", author: "Author 1" },
    { id: 2, name: "Book 2", author: "Author 2" },
  ];

  const moreBookInfo = {
    language: "English",
    pages: 300,
    borrowed: false,
  };

  beforeEach(() => {
    useData.mockReturnValue([initialBooksData, vi.fn()]);

    makeRequest.mockResolvedValue(moreBookInfo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading indicator while fetching data", () => {
    useData.mockReturnValue([null, vi.fn()]); // Simulate loading state

    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders book tiles correctly", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Current Books")).toBeInTheDocument();
    });

    expect(
      screen.getAllByTestId("BookTileExpandable", { level: 3 })
    ).toHaveLength(initialBooksData.length);
    initialBooksData.forEach((book) => {
      expect(screen.getByText(book.name)).toBeInTheDocument();
    });
  });

  it("fetches more book info on button click and updates state", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Current Books")).toBeInTheDocument();
    });

    const firstBookMoreInfoButton = screen
      .getByTestId("book-tile-1")
      .closest("button");
    fireEvent.click(firstBookMoreInfoButton);

    expect(makeRequest).toHaveBeenCalledWith("/book/getbook/1", "GET");
  });

  it("renders the Borrow book button and links to /borrow", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Current Books")).toBeInTheDocument();
    });

    const borrowButton = screen.getByText("Borrow book");
    expect(borrowButton).toBeInTheDocument();
    expect(borrowButton.closest("a")).toHaveAttribute("href", "/borrow");
  });
});
