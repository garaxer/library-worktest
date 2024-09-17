import { useData } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

function Books() {
  const booksData = useData("/book/getallbooks", "GET");

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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexBasis: "calc(33.33% - 16px)", // 3 items per row with spacing
              maxWidth: "calc(33.33% - 16px)",
              minHeight: "100px",
              "@media (max-width: 1000px)": {
                flexBasis: "100%",
                maxWidth: "100%",
              },
            }}
          >
            <ListItem>
              <ListItemText primary={book.name} />
            </ListItem>
            <Link to={`/book/${book.id}`}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "150px" }}
              >
                Borrow book
              </Button>
            </Link>
          </Paper>
        ))}
      </Box>

      <Button variant="contained" color="primary" sx={{ mt: 2 }}></Button>
    </>
  );
}

export default Books;
