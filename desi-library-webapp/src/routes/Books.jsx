import { useData, makeRequest } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import BookTileExpandable from "../components/BookTileExpandable";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

function Books() {
  const [booksData, _setter, _re, error] = useData("/book/getallbooks", "GET");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [bookData, setBookData] = useState(null);

  const getBookInfo = async (bookId, setIsFetchingCallback) => {
    setBookData(null);
    setIsDrawerOpen(true);
    setIsFetchingCallback(true);
    const moreBookData = await makeRequest(`/book/getbook/${bookId}`, "GET");
    setBookData(moreBookData);
    setIsFetchingCallback(false);
  };

  if (error) {
    return <h1>Unable to fetch books at this time, try refresing.</h1>;
  }

  if (!booksData) {
    return (
      <CircularProgress
        sx={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
      />
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom align="center" pb="20px">
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
          <BookTileExpandable
            key={book.id}
            book={book}
            getBookInfo={getBookInfo}
          />
        ))}
      </Box>

      <Link to="/borrow">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Borrow book
        </Button>
      </Link>

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(null)}
      >
        <Box sx={{ height: "360px", padding: "20px" }}>
          {bookData ? (
            <List>
              <ListItem>
                <ListItemText primary="Title" secondary={bookData.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Author" secondary={bookData.author} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Borrowed"
                  secondary={bookData.borrowed ? "Yes" : "No"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Language"
                  secondary={bookData.language}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Pages" secondary={bookData.pages} />
              </ListItem>
            </List>
          ) : (
            <CircularProgress
              sx={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
            />
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default Books;
