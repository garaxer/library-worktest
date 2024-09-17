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

function Borrow() {
  const [fetching, setFetching] = useState(false);
  const [borrowableBooksData, setBorrowableBooksData] = useData(
    "/book/borrowablebooks",
    "GET"
  );
  const [unBorrowableBooksData, setUnBorrowableBooksData] = useData(
    "/book/unborrowablebooks",
    "GET"
  );

  const setBookBorrowed = async (bookId) => {
    setFetching(true);
    await makeRequest(`/book/UpdateBookBorrowStatus/${bookId}`, "PUT");
    setUnBorrowableBooksData([
      ...unBorrowableBooksData,
      { ...borrowableBooksData.find((b) => b.id === bookId), borrowed: true },
    ]);
    setBorrowableBooksData(
      borrowableBooksData.filter((book) => book.id !== bookId)
    );

    setFetching(false);
  };

  const setBookReturned = async (bookId) => {
    setFetching(true);

    await makeRequest(`/book/UpdateBookBorrowStatus/${bookId}`, "PUT");
    setBorrowableBooksData([
      ...borrowableBooksData,
      {
        ...unBorrowableBooksData.find((b) => b.id === bookId),
        borrowed: false,
      },
    ]);
    setUnBorrowableBooksData(
      unBorrowableBooksData.filter((book) => book.id !== bookId)
    );

    setFetching(false);
  };

  if (!borrowableBooksData || !unBorrowableBooksData) {
    return (
      <CircularProgress
        sx={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
      />
    );
  }

  const bookTile = (book) => (
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
        onClick={() =>
          book.borrowed ? setBookReturned(book.id) : setBookBorrowed(book.id)
        }
      >
        {book.borrowed ? "Return" : "Borrow"}
      </Button>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom align="center" pb={"20px"}>
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
        <Typography gutterBottom align="center" p={"20px"} width={"100%"}>
          Burrow
        </Typography>
        {borrowableBooksData.map((book) => bookTile(book))}

        <Typography gutterBottom align="center" p={"20px"} width={"100%"}>
          Return
        </Typography>
        {unBorrowableBooksData.map((book) => bookTile(book))}
      </Box>
    </Box>
  );
}

export default Borrow;
