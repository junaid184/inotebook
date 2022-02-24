import React, { useContext } from "react";
import NotesContext from "../context/notes/noteContext";
import { Typography } from "@mui/material";
import NoteItem from "./NoteItem";
const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-3">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Your notes
      </Typography>

      {notes.map((note, index) => {
        return <NoteItem key={index} noteItem={note} />;
      })}
    </div>
  );
};

export default Notes;
