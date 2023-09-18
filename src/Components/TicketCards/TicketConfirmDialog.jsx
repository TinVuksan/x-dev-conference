import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import axiosConfig from "../../API/axiosConfig";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SUCCESS_MESSAGE = "Ticket ordered successfully.";
const ERROR_MESSAGE = "Error when trying to order a ticket.";

const TICKET_BUY_URL = "/tickets/buy";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function TicketConfirmDialog({ ticket, onSnackbarOpen }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuyTicket = async () => {
    try {
      await axiosConfig.post(TICKET_BUY_URL, ticket, {
        withCredentials: true,
      });

      handleClose();

      onSnackbarOpen(SUCCESS_MESSAGE, "success");
    } catch (e) {
      console.error("Error buying tickets", e);
      handleClose();

      onSnackbarOpen(ERROR_MESSAGE, "error");
    }
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        ORDER NOW
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"CONFIRMATION NEEDED"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to order the "{ticket.type.toUpperCase()}"
            ticket?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleBuyTicket}>Order</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
