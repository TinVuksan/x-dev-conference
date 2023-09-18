import SpeakerImage from "./SpeakerImage";
import styles from "./speakersgrid.module.css";
import { Typography, Button, Dialog, DialogContent } from "@mui/material";

const SpeakerModal = ({ selectedSpeaker, isModalOpen, setIsModalOpen }) => {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <DialogContent>
        {selectedSpeaker && (
          <div>
            <SpeakerImage imageData={selectedSpeaker.image} />
            <Typography variant="h6" className={styles.speakerCardBody}>
              {selectedSpeaker.name} ({selectedSpeaker.country})
            </Typography>
            <Typography variant="body1" className={styles.speakerCardPosition}>
              {selectedSpeaker.position}
            </Typography>
            <Typography variant="body1" className={styles.speakerCardEmail}>
              Email: {selectedSpeaker.email}
            </Typography>
            <Typography variant="body1" className={styles.speakerCardBio}>
              {selectedSpeaker.bio}
            </Typography>
          </div>
        )}
        <Button
          onClick={() => setIsModalOpen(false)}
          variant="contained"
          color="primary"
          className={styles.speakerCardButton}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SpeakerModal;
