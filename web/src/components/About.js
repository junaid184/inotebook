import { Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";

const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
  }, []);

  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      This is about {a.state.name} and he is in class {a.state.class}
    </Typography>
  );
};

export default About;
