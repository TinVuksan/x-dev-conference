import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./accordion.module.css";
import { formatDate, formatDateNoTime } from "../global/utils";

const ScheduleAccordion = ({ eventData }) => {
  const [expanded, setExpanded] = useState([]);

  const handleAccordionChange = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.gridContainer}>
        {Object.keys(eventData).map((date, index) => (
          <Accordion
            key={date}
            expanded={expanded[index]}
            onChange={() => handleAccordionChange(index)}
            className={styles.accordion} // Apply Accordion styles
          >
            <AccordionSummary
              className={styles.summary}
              sx={{ backgroundColor: "#dcb3fd" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={styles.dateText}>
                {formatDateNoTime(date)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.details}>
              {" "}
              <div className={styles.eventCardContainer}>
                {eventData[date].map((event) => (
                  <Card
                    key={event.id}
                    className={styles.eventCard}
                    elevation={10}
                  >
                    <CardContent>
                      <Typography variant="h6" className={styles.eventTitle}>
                        {event.title}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                        {event.speaker}
                      </Typography>

                      {event.allDay ? (
                        <Typography variant="body2">
                          <span style={{ fontWeight: "bold" }}>All day</span>
                        </Typography>
                      ) : (
                        <>
                          <Typography>
                            <span style={{ fontWeight: "bold" }}>Start: </span>
                            {formatDate(event.startDate)}
                          </Typography>
                          <Typography>
                            <span style={{ fontWeight: "bold" }}>End: </span>
                            {formatDate(event.endDate)}
                          </Typography>
                        </>
                      )}

                      {/* Display other event details */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default ScheduleAccordion;
