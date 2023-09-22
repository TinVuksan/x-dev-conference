import { useState, useEffect } from "react";
import axiosConfig from "../../API/axiosConfig";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Container, Typography } from "@mui/material";
import ScheduleAccordion from "../../Components/ScheduleAccordion/ScheduleAccordion";
const Schedule = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getEvents = async () => {
      try {
        const response = await axiosConfig.get("/events/get", {
          signal: controller.signal,
        });
        console.log(response.data);
        const data = response.data;
        const newData = data.reduce((acc, event) => {
          const dateFormatted = new Date(event.startDate);
          console.log(dateFormatted);
          const eventDate = dateFormatted.toISOString().split("T")[0];
          if (!acc[eventDate]) {
            acc[eventDate] = [];
          }
          acc[eventDate].push(event);
          return acc;
        }, {});
        isMounted && setEventData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    getEvents();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginRight: "50px",
          height: "fit-content",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "white",
            maxWidth: "40%",
            textAlign: "right",
            whiteSpace: "pre-line",
            fontSize: "24px",
          }}
        >
          Creating the ideal schedule for our developer conference, set from
          July 28th to August 1st, 2023, was a meticulous process driven by our
          commitment to maximizing value for attendees. <br /> We began by
          categorizing sessions into themes, ensuring a balanced mix of topics
          throughout each day.
          <br /> We considered attendee preferences through surveys and
          feedback, optimizing time slots for popular speakers and subjects. To
          enhance learning, we avoided overwhelming schedules, allowing ample
          breaks for networking and reflection. Our scheduling algorithm
          considered topic flow, avoiding clashes of closely related talks.
          <br /> We also accommodated different time zones, ensuring global
          participation. The result is a harmonious and dynamic schedule that
          promises an enriching experience, fostering knowledge exchange and
          community-building.
        </Typography>
        <ScheduleAccordion eventData={eventData} />
      </Container>
      <Footer />
    </>
  );
};

export default Schedule;
