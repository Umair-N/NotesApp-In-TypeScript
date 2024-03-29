import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { createNote, updateNote } from "../utils/createNote";
import { NoteModel } from "../types/notes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA500",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface modalProps {
  noteToEdit: NoteModel | null;
  openModal: boolean;
}
const FormModal = ({ noteToEdit, openModal }: modalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    setOpen(openModal);
    setFormData({
      title: noteToEdit?.title || " ",
      description: noteToEdit?.description || "",
    });
  }, [openModal]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formDataCollector = () => {
    noteToEdit ? updateNote(noteToEdit?._id || "", formData) :  createNote(formData); 
    handleClose();
    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="secondary"
          endIcon={<AddIcon />}
        >
          ADD NOTE
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-end">
              <Button
                endIcon={<CloseIcon />}
                onClick={handleClose}
                color="error"
              />
            </div>
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              required
              className="title--field"
              style={{ marginTop: "1rem", width: "96%" }}
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={6}
              style={{ marginTop: "1rem", width: "96%" }}
              value={formData.description}
              onChange={handleInputChange}
            />
            <span className="flex justify-end mr-4">
              <Button
                variant="contained"
                color="success"
                style={{ marginTop: "1rem" }}
                onClick={formDataCollector}
              >
                SAVE
              </Button>
            </span>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};
export default FormModal;
