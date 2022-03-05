import React, { useContext, useEffect } from "react";
import NotesContext from "../context/notes/noteContext";
import { Typography } from "@mui/material";
import NoteItem from "./NoteItem";
import AddANote from "./AddANote";
const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <AddANote />

      <div className="row my-3">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your notes
        </Typography>

        {notes.map((note, index) => {
          return <NoteItem key={index} noteItem={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
