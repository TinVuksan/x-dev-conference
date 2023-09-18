import { Card } from "react-bootstrap";
import styles from "./speakersgrid.module.css";
const SpeakerImage = ({ imageData }) => {
  return (
    <Card.Img
      src={`data:image/jpeg;base64,${imageData}`}
      alt="Speaker"
      className={styles.speakerImage}
    />
  );
};

export default SpeakerImage;
