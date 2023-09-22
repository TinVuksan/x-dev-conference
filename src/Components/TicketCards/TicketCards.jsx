import { Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import TicketConfirmDialog from "./TicketConfirmDialog";
import axiosConfig from "../../API/axiosConfig";
import styles from "./tickets.module.css";
const TicketCards = ({ onSnackbarOpen, message, purchaseStatus }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTickets = async () => {
      try {
        const response = await axiosConfig.get("/tickets/get", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setTickets(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTickets();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Container className={styles.ticketCardsContainer} fluid>
      {tickets.map((ticket) => (
        <Card className={styles.ticketCard}>
          <Card.Header>
            <h1 className={styles.ticketTitle}>{ticket.type.toUpperCase()}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <ul className={styles.ticketText}>
                {ticket.type == "standard" && (
                  <>
                    <li>All days Conference Pass</li>
                    <li>Access to Multiple Stages</li>
                    <li>Access to Exhibition Area</li>
                    <li>Lunch & Refreshments</li>
                    <li>Access to Evening Social Events</li>
                  </>
                )}
                {ticket.type == "full" && (
                  <>
                    <li>All days Conference Pass</li>
                    <li>Access to Multiple Stages</li>
                    <li>Access to Exhibition Area</li>
                    <li>Lunch & Refreshments</li>
                    <li>Access to Evening Social Events</li>
                    <li>Masterclasses (Workshops)</li>
                    <li>Virtual Conference Pass</li>
                    <li>On-demand recordings</li>
                    <li>Virtual networking</li>
                  </>
                )}
                {ticket.type == "student" && (
                  <>
                    {" "}
                    <li>Virtual Conference Pass</li>
                    <li>On-demand recordings</li>
                    <li>Virtual networking</li>
                  </>
                )}
              </ul>
            </Card.Text>
          </Card.Body>
          <Card.Footer className={styles.ticketFooter}>
            <TicketConfirmDialog
              ticket={ticket}
              onSnackbarOpen={onSnackbarOpen}
              purchaseStatus={purchaseStatus}
            />
            <h2>{ticket.price > 0 ? ticket.price + "$" : "FREE"}</h2>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default TicketCards;
