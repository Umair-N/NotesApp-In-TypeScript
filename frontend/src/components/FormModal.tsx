import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import createNote from "../utils/createNote"

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

export default function FormModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formDataCollector = () => {
    console.log(formData);
    createNote(formData)
    handleClose(); 
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="success"
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
    </div>
  );
}
