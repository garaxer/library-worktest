import { useData, getData } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useState } from "react";

function Books() {
  const [booksData, setBooksData] = useData("/book/getallbooks", "GET");

  const [fetching, setFetching] = useState(false);
  const getBookInfo = async (bookId) => {
    setFetching(true);

    const moreBookInfo = await getData(`/book/getbook/${bookId}`, "GET");
    setBooksData(
      booksData.map((book) =>
        book.id === bookId ? { ...book, ...moreBookInfo } : book
      )
    );
    setFetching(false);
  };

  if (!booksData) {
    return (
      <CircularProgress
        sx={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
      />
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom align="center" pb={"20px"}>
        Current Books
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {booksData.map((book) => (
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
                <ListItemText
                  primary="Borrowed"
                  secondary={book.borrowed ? "Yes" : "No"}
                />
              </ListItem>
              {book.language && (
                <ListItem>
                  <ListItemText primary="Language" secondary={book.language} />
                </ListItem>
              )}
              {book.pages && (
                <ListItem>
                  <ListItemText primary="Pages" secondary={book.pages} />
                </ListItem>
              )}
            </List>
            {!book.language && (
              <Button
                disabled={fetching}
                variant="contained"
                color="primary"
                sx={{ width: "150px" }}
                onClick={() => getBookInfo(book.id)}
              >
                More info
              </Button>
            )}
          </Paper>
        ))}
      </Box>

      <Link to="/borrow">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Borrow book
        </Button>
      </Link>
    </>
  );
}

export default Books;
