import { useData, makeRequest } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import BookTileExpandable from "../components/BookTileExpandable";
import { Link } from "react-router-dom";

function Books() {
  const [booksData, setBooksData] = useData("/book/getallbooks", "GET");

  const getBookInfo = async (bookId, setFetchingCallback) => {
    setFetchingCallback(true);

    const moreBookInfo = await makeRequest(`/book/getbook/${bookId}`, "GET");
    setBooksData((booksData) =>
      booksData.map((book) =>
        book.id === bookId ? { ...book, ...moreBookInfo } : book
      )
    );
    setFetchingCallback(false);
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
    </>
  );
}

export default Books;
