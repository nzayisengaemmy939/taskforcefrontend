
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteModal = ({ open, onClose, onDelete }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
