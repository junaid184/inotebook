import React, { useContext, useEffect, useRef } from "react";
import NotesContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddANote from "./AddANote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);
  const ref = useRef(null);
  const updateNote = (noteItem) => {
    ref.current.click();
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <AddANote />

      <div>
        <Button onClick={handleOpen} ref={ref}>
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Note
            </Typography>
            <form className="my-3">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  placeholder="Enter Title"
                  // onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  placeholder="Description"
                  // onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  placeholder="Tag"
                  // onChange={onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                // onClick={handleClick}
              >
                Update Note
              </button>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="row my-3">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your notes
        </Typography>

        {notes.map((note, index) => {
          return (
            <NoteItem key={index} updateNote={updateNote} noteItem={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
