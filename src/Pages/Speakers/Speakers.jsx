import Navbar from "../../Components/Navbar/Navbar";
import SpeakersGrid from "../../Components/SpeakersGrid/SpeakersGrid";
import Footer from "../../Components/Footer/Footer";
import styles from "./speaker.module.css";
import { Outlet } from "react-router-dom";
const Speakers = () => {
  return (
    <div className={styles.speakers}>
      <Navbar />
      <SpeakersGrid />
      <Footer />
    </div>
  );
};

export default Speakers;
