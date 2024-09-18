import { useState } from "react";
import { useData, makeRequest } from "../data";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import BookTile from "../components/BookTile";

function Borrow() {
  const [showWarning, setShowWarning] = useState();
  const handleClose = () => {
    setShowWarning(null);
  };

  const [
    borrowableBooksData,
    setBorrowableBooksData,
    refetchBorrowable,
    borrowErr,
  ] = useData("/book/borrowablebooks", "GET");
  const [
    unBorrowableBooksData,
    setUnBorrowableBooksData,
    refetchUnBorrowable,
    error,
  ] = useData("/book/unborrowablebooks", "GET");

  const handleReturningFailure = (borrowed) => {
    setShowWarning(
      `There was an issue ${
        borrowed ? "return" : "borrow"
      }ing this book. Library reloaded.`
    );
    refetchBorrowable();
    refetchUnBorrowable();
    return;
  };

  const handleBookAction = async (bookId, borrowed, setFetching) => {
    setFetching(true);
    const bookToUpdate = await makeRequest(`/book/getbook/${bookId}`, "GET");
    // Prevent books from being borrowed until they are returned and their status updates in the backend.
    if (
      !bookToUpdate ||
      (!borrowed && bookToUpdate.borrowed) ||
      (borrowed && !bookToUpdate.borrowed)
    ) {
      handleReturningFailure(borrowed);
      return;
    }
    setFetching(false);

    // Optimistically update
    if (borrowed) {
      setUnBorrowableBooksData((prev) =>
        prev.filter((book) => book.id !== bookId)
      );
      setBorrowableBooksData((prev) => [
        ...prev,
        {
          ...unBorrowableBooksData.find((book) => book.id === bookId),
          borrowed: false,
        },
      ]);
    } else {
      setBorrowableBooksData((prev) =>
        prev.filter((book) => book.id !== bookId)
      );
      setUnBorrowableBooksData((prev) => [
        ...prev,
        {
          ...borrowableBooksData.find((book) => book.id === bookId),
          borrowed: true,
        },
      ]);
    }

    try {
      await makeRequest(`/book/UpdateBookBorrowStatus/${bookId}`, "PUT");
      // Confirm the changes went through
      const bookUpdated = await makeRequest(`/book/getbook/${bookId}`, "GET");
      if (bookUpdated.borrowed === borrowed) {
        handleReturningFailure(borrowed);
      }
    } catch (error) {
      handleReturningFailure(borrowed);
      return;
    }
  };

  if (error || borrowErr) {
    return <h1>Unable to fetch books at this time, try refresing.</h1>;
  }

  if (!borrowableBooksData || !unBorrowableBooksData) {
    return (
      <CircularProgress
        sx={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
      />
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom align="center" pb={2}>
        Borrow/Return a Book
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          data-testid="borrowable"
          sx={{
            gap: 2,
            display: "flex",
            flexDirection: "column",
            flexBasis: "calc(50% - 16px)",
            maxWidth: "calc(50% - 16px)",
            "@media (max-width: 1000px)": {
              flexBasis: "100%",
              maxWidth: "100%",
            },
          }}
        >
          {borrowableBooksData.length ? (
            <Typography gutterBottom align="center" pt={3} width="100%">
              Borrow
            </Typography>
          ) : (
            ""
          )}
          {borrowableBooksData.map((book) => (
            <BookTile
              key={book.id}
              book={book}
              onActionClick={(callback) =>
                handleBookAction(book.id, false, callback)
              }
            />
          ))}
        </Box>
        <Box
          data-testid="borrowed"
          sx={{
            gap: 2,
            display: "flex",
            flexDirection: "column",
            flexBasis: "calc(50% - 16px)",
            maxWidth: "calc(50% - 16px)",
            "@media (max-width: 1000px)": {
              flexBasis: "100%",
              maxWidth: "100%",
            },
          }}
        >
          {unBorrowableBooksData.length ? (
            <Typography gutterBottom align="center" pt={3} width="100%">
              Return
            </Typography>
          ) : (
            ""
          )}
          {unBorrowableBooksData.map((book) => (
            <BookTile
              key={book.id}
              book={book}
              onActionClick={(callback) =>
                handleBookAction(book.id, true, callback)
              }
            />
          ))}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "top" }}
        open={showWarning}
        onClose={handleClose}
        message={showWarning}
        autoHideDuration={10000}
        severity="warning"
      />
    </Box>
  );
}

export default Borrow;
