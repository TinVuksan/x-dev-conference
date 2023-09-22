import { Card } from "react-bootstrap";
import styles from "./speakersgrid.module.css";
const SpeakerImage = ({ imageData, className }) => {
  return (
    <Card.Img
      src={`data:image/jpeg;base64,${imageData}`}
      alt="Speaker"
      className={className}
    />
  );
};

export default SpeakerImage;
