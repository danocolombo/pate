import React from "react";
import "./serve.styles.scss";
import { Typography, Button, Stack } from "@mui/material";
const ConfirmDeleteModal = ({
  isOpened = true,
  children,
  onClose,
  onConfirm,
}) => {
  if (!isOpened) {
    return null;
  }
  return (
    <div>
      <div className="modal-wrapper">
        <div className="modal__warning__banner">
          <Typography variant="h5">WARNING</Typography>
        </div>
        <Stack direction="row" align="center">
          <Typography variant="h6" style={{ margin: "10px" }}>
            Please confirm you want to delete this event.
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">{children}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{
              backgroundColor: "red",
              margin: 2,
              minWidth: "150px",
            }}
          >
            YES, Delete
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "grey",
              color: "white",
              margin: 2,
              minWidth: "150px",
            }}
          >
            No, Cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
