import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DialogBox({ open, handleClose, text, handleConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText
          style={{ minWidth: 500, padding: "12px 8px" }}
          id="alert-dialog-description"
        >
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ยกเลิก</Button>
        <Button onClick={handleConfirm} autoFocus>
          ตกลง
        </Button>
      </DialogActions>
    </Dialog>
  );
}
