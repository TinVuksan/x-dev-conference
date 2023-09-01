import { Card, Container } from "react-bootstrap";
import axiosConfig from "../../API/axiosConfig";
import { useState, useEffect } from "react";
import SpeakerImage from "./SpeakerImage";
import styles from "./speakersgrid.module.css";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const SpeakersGrid = () => {
  const [speakers, setSpeakers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  console.log(auth);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log("GetSpeakers prije requesta auth: ", auth);
    const getSpeakers = async () => {
      try {
        const response = await axiosPrivate.get("/speakers/get", {
          signal: controller.signal,
        });
        console.log(response.data);
        console.log("GetSpeakers auth objekt nakon requesta: ", auth);
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
  }, [auth]);
  return (
    <Container fluid="md" role="presentation" className={styles.cardsContainer}>
      {speakers.map((speaker) => (
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/speakers/${speaker.id}`}
          key={speaker.id}
        >
          <Card key={speaker.id} className={styles.card}>
            <SpeakerImage imageData={speaker.image} />
            <Card.Body className={styles.speakerBody}>
              <Card.Title className={styles.speakerTitle}>
                {speaker.name}
              </Card.Title>
              <Card.Text className={styles.speakerText}>
                {speaker.position}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default SpeakersGrid;
