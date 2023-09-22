import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import TicketCards from "../../Components/TicketCards/TicketCards";
import { useState, forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import styles from "../../Components/TicketCards/tickets.module.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Pricing = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  const handleSnackbarOpen = (message, status) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setPurchaseStatus(status);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.pricingContainer}>
      <Navbar title="" />
      <TicketCards
        onSnackbarOpen={handleSnackbarOpen}
        message={snackbarMessage}
        purchaseStatus={purchaseStatus}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3700} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        key={"bottom" + "left"}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={purchaseStatus === "success" ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
};

export default Pricing;
