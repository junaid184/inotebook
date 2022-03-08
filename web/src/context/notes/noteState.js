import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:8000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all note
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/v1/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FqaWQiLCJlbWFpbCI6InNhamlkQGdtYWlsLmNvbSIsIl9pZCI6IjYyMjMyZDM4YzE1M2IxZjMxYTE2MTdhZSIsImlhdCI6MTY0NjQ3MjYzNX0.3EoFr18mczobuwVXD096xmUVQS6f_S8OacBMXXYAko0",
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/v1/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FqaWQiLCJlbWFpbCI6InNhamlkQGdtYWlsLmNvbSIsIl9pZCI6IjYyMjMyZDM4YzE1M2IxZjMxYTE2MTdhZSIsImlhdCI6MTY0NjQ3MjYzNX0.3EoFr18mczobuwVXD096xmUVQS6f_S8OacBMXXYAko0",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("adding a new note");
    let note = {
      _id: "61322f19553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FqaWQiLCJlbWFpbCI6InNhamlkQGdtYWlsLmNvbSIsIl9pZCI6IjYyMjMyZDM4YzE1M2IxZjMxYTE2MTdhZSIsImlhdCI6MTY0NjQ3MjYzNX0.3EoFr18mczobuwVXD096xmUVQS6f_S8OacBMXXYAko0",
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FqaWQiLCJlbWFpbCI6InNhamlkQGdtYWlsLmNvbSIsIl9pZCI6IjYyMjMyZDM4YzE1M2IxZjMxYTE2MTdhZSIsImlhdCI6MTY0NjQ3MjYzNX0.3EoFr18mczobuwVXD096xmUVQS6f_S8OacBMXXYAko0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
