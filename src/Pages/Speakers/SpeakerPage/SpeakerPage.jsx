import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConfig, { axiosPrivate } from "../../../API/axiosConfig";
import styles from "./speakerpage.module.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
const SpeakerPage = ({ speaker }) => {
  //const [speaker, setSpeaker] = useState({});
  // const { id } = useParams();
  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();
  //   console.log(id);
  //   const getSpeaker = async () => {
  //     try {
  //       const response = await axiosPrivate.get(`/speakers/get/${id}`, {
  //         signal: controller.signal,
  //       });
  //       console.log(response.data);
  //       isMounted && setSpeaker(response.data);
  //     } catch (err) {
  //       console.log("Error fetching speaker details: ", err);
  //     }
  //   };

  //   getSpeaker();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        {speaker ? (
          <Card>
            <CardMedia
              sx={{ height: 500, width: 500 }}
              image={speaker.imageUrl}
              title={speaker.name}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {speaker.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {speaker.position}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {speaker.bio}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default SpeakerPage;
