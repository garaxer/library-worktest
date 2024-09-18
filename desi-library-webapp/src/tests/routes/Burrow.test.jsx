import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useData, makeRequest } from "../../data";
import Borrow from "../../routes/Borrow";

vi.mock("../../data", () => ({
  useData: vi.fn(),
  makeRequest: vi.fn(),
}));

describe("Borrow Component", () => {
  const borrowableBooks = [
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
  const unBorrowableBooks = [
    {
      id: 3,
      name: "Book Three",
      author: "Author C",
      language: "English",
      pages: 300,
      borrowed: true,
    },
  ];

  beforeEach(() => {
    useData.mockImplementation((path) => {
      if (path === "/book/borrowablebooks") {
        return [borrowableBooks, vi.fn(), vi.fn()];
      } else if (path === "/book/unborrowablebooks") {
        return [unBorrowableBooks, vi.fn(), vi.fn()];
      }
    });

    makeRequest.mockResolvedValue();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading indicator while fetching data", () => {
    useData.mockReturnValue([null, vi.fn()]); // Simulate loading state

    render(<Borrow />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders book tiles correctly", async () => {
    render(<Borrow />);

    await waitFor(() => {
      expect(screen.getByText("Borrow/Return a Book")).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("booktile")).toHaveLength(
      borrowableBooks.length + unBorrowableBooks.length
    );

    expect(screen.getAllByText("Borrow")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Return")[0]).toBeInTheDocument();
  });

  it("handles borrow action correctly", async () => {
    render(<Borrow />);

    await waitFor(() => {
      expect(screen.getByText("Borrow/Return a Book")).toBeInTheDocument();
    });

    const borrowButton = screen
      .getAllByTestId("BorrowButton")[0]
      .closest("button");
    fireEvent.click(borrowButton);

    expect(makeRequest).toHaveBeenCalledWith(
      `/book/getbook/${borrowableBooks[0].id}`,
      "GET"
    );

    expect(screen.getAllByTestId("booktile")).toHaveLength(
      borrowableBooks.length + unBorrowableBooks.length
    );
  });

});
