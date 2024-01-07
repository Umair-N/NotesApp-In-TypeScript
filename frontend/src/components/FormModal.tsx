import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="success">
        ADD NOTE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end ">
            <Button
              endIcon={<CloseIcon />}
              onClick={handleClose}
              color="error"
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            required
            style={{ marginTop: "1rem", width: "96%" }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={6}
            style={{ marginTop: "1rem", width: "96%" }}
          />
        </Box>
      </Modal>
    </div>
  );
}
