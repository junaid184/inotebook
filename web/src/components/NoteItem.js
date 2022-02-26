import React, { useContext } from "react";
import NotesContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const { noteItem } = props;
  const context = useContext(NotesContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3 ">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{noteItem.title}</h5>
          <p className="card-text">Description: {noteItem.description}</p>
          <p className="card-text">tag: {noteItem.tag}</p>
          <div>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(noteItem._id);
              }}
            ></i>
            <i className="fa-solid fa-pen-to-square mx-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
