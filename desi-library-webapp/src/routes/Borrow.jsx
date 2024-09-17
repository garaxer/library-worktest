import { useData, makeRequest } from "../data";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import BookTile from "../components/BookTile";

function Borrow() {
  const [borrowableBooksData, setBorrowableBooksData] = useData(
    "/book/borrowablebooks",
    "GET"
  );
  const [unBorrowableBooksData, setUnBorrowableBooksData] = useData(
    "/book/unborrowablebooks",
    "GET"
  );

  const handleBookAction = async (bookId, borrowed, setFetching) => {
    setFetching(true);
    // TODO implement react-query and do optimistic updates
    await makeRequest(`/book/UpdateBookBorrowStatus/${bookId}`, "PUT");
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

    setFetching(false);
  };

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
            <Typography
              gutterBottom
              align="center"
              pt={3}
              underline
              width="100%"
            >
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
    </Box>
  );
}

export default Borrow;
