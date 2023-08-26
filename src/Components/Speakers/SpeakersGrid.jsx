import { Card, Container } from "react-bootstrap";
import axiosConfig from "../../API/axiosConfig";
import { useState, useEffect } from "react";
import SpeakerImage from "./SpeakerImage";

const SpeakersGrid = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getSpeakers = async () => {
      try {
        const response = await axiosConfig.get("/speakers/get", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setSpeakers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getSpeakers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Container fluid="md" role="presentation" className="cards-container">
      {speakers.map((speaker) => (
        <Card style={{ width: `25rem` }} key={speaker.id}>
          <SpeakerImage imageData={speaker.image} />
          {/* variant="top"
             src={`data:image/jpeg;base64,${Buffer.from(
               speaker.image.buffer
            ).toString("base64")}`} */}

          <Card.Body>
            <Card.Title>{speaker.name}</Card.Title>
            <Card.Text>
              Listen to what this man has to say!
              <br /> Email: {speaker.email}
              <br />
              From: {speaker.country}
              <br />
              Position: {speaker.position}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default SpeakersGrid;
