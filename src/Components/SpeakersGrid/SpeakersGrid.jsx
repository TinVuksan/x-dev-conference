import { useState, useEffect } from "react";
import SpeakerImage from "./SpeakerImage";
import styles from "./speakersgrid.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Container,
} from "@mui/material";
import SpeakerModal from "./SpeakerModal";

const SpeakersGrid = () => {
  const [speakers, setSpeakers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  console.log(auth);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getSpeakers = async () => {
      try {
        const response = await axiosPrivate.get("/speakers/get", {
          signal: controller.signal,
        });
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

  const handleCardClick = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };
  return (
    <Container fluid="md">
      <Grid container spacing={4} mt={1} className={styles.cardsContainer}>
        {speakers.map((speaker) => (
          <Grid item key={speaker.id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => handleCardClick(speaker)}
              className={styles.cardElement}
            >
              {/* Assuming SpeakerImage is a separate component */}
              <SpeakerImage
                imageData={speaker.image}
                className={styles.speakerImage}
              />
              <CardContent className={styles.speakerBody}>
                <Typography variant="h6" className={styles.speakerTitle}>
                  {speaker.name}
                </Typography>
                <Typography variant="body1" className={styles.speakerText}>
                  {speaker.position}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <SpeakerModal
        selectedSpeaker={selectedSpeaker}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default SpeakersGrid;
