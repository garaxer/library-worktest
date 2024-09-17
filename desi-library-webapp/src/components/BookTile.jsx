import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Button from "@mui/material/Button";

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

export default BookTile;
