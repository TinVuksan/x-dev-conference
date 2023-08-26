import { Card } from "react-bootstrap";

const SpeakerImage = ({ imageData }) => {
  // Convert the BSON Binary data to a Base64-encoded string
  // const buffer = new Uint8Array(imageData.buffer.data);
  // const base64Image = `data:image/jpeg;base64,${btoa(
  //   String.fromCharCode.apply(null, buffer)
  // )}`;

  return <Card.Img src={`data:image/jpeg;base64,${imageData}`} alt="Speaker" />;
};

export default SpeakerImage;
