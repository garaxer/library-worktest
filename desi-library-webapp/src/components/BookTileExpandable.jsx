import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Button from "@mui/material/Button";

const BookTileExpandable = ({ book, getBookInfo }) => {
  const [fetching, setFetching] = useState(false);
  return (
    <Paper
      data-testid="BookTileExpandable"
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
          data-testid={`book-tile-${book.id}`}
          sx={{ width: "150px" }}
          onClick={() => getBookInfo(book.id, setFetching)}
        >
          More info
        </Button>
      )}
    </Paper>
  );
};

export default BookTileExpandable;
