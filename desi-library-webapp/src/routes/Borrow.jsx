import { useData, makeRequest } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useState } from "react";

const BookTile = ({ book, onActionClick }) => {
  const [fetching, setFetching] = useState(false);
  return (
    <Paper
      key={book.id}
      elevation={3}
      sx={{
        padding: 2,
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        flexBasis: "calc(33.33% - 16px)",
        maxWidth: "calc(33.33% - 16px)",
        minHeight: "200px", // Increased height to accommodate List
        "@media (max-width: 1000px)": {
          flexBasis: "100%",
          maxWidth: "100%",
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Title" secondary={book.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Author" secondary={book.author} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Language" secondary={book.language} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Pages" secondary={book.pages} />
        </ListItem>
      </List>
      <Button
        disabled={fetching}
        variant="contained"
        color={!book.borrowed ? "primary" : "secondary"}
        sx={{ width: "150px" }}
        onClick={() => onActionClick(setFetching)}
      >
        {book.borrowed ? "Return" : "Borrow"}
      </Button>
    </Paper>
  );
};

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
        <Typography gutterBottom align="center" p={2} width="100%">
          Borrow
        </Typography>
        {borrowableBooksData.map((book) => (
          <BookTile
            key={book.id}
            book={book}
            onActionClick={(setFetching) =>
              handleBookAction(book.id, false, setFetching)
            }
          />
        ))}

        <Typography gutterBottom align="center" p={2} width="100%">
          Return
        </Typography>
        {unBorrowableBooksData.map((book) => (
          <BookTile
            key={book.id}
            book={book}
            onActionClick={(setFetching) =>
              handleBookAction(book.id, true, setFetching)
            }
          />
        ))}
      </Box>
    </Box>
  );
}

export default Borrow;
